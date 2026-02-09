const mysql = require('mysql2/promise');
const path = require('path');

// Load .env from parent directory if variables aren't set
if (!process.env.DB_HOST) {
    require('dotenv').config({ path: path.join(__dirname, '../.env') });
}

// Helper to get connection config, handling "db" host for local vs docker
const getDbConfig = () => {
    let host = process.env.DB_HOST;

    // Quick Hack: If we are running on host machine (dev), 'db' hostname usually doesn't exist.
    // We can try to assume if we are running this script directly, we might be on localhost.
    // But 'index.js' also runs on host.
    // The issue: .env has DB_HOST=db (for docker).
    // When running locally: `npm start` -> `node index.js` -> DB_HOST=db -> Fails to resolve.
    // We should fallback to 127.0.0.1 if we fail to connect to 'db' or if we just want to force it for local dev.

    // For this specific request: User wants to target docker port 3306.
    // Mapping 3306:3306 allows localhost connection.
    if (host === 'db') {
        // If we are running this inside the container, 'db' is fine.
        // If we are outside, we probably need '127.0.0.1'.
        // We will try the configured host first, if it fails, we handle it in initDB.
    }
    return {
        host: host,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: 3306
    };
};

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS tickets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        email VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        subject VARCHAR(255) NOT NULL,
        question TEXT NOT NULL,
        status ENUM('pending', 'accepted', 'resolved', 'rejected') DEFAULT 'pending',
        memo TEXT,
        signature VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`;

async function initDB() {
    let config = getDbConfig();
    console.log(`Attempting Init DB connection to ${config.host}...`);

    try {
        let connection;
        try {
            connection = await mysql.createConnection(config);
        } catch (err) {
            if (config.host === 'db') {
                console.log("Connection to 'db' failed, trying '127.0.0.1' (assuming local dev against docker)...");
                config.host = '127.0.0.1';
                connection = await mysql.createConnection(config);
            } else {
                throw err;
            }
        }

        console.log('Successfully connected to database for initialization.');

        // Create tickets table with all columns
        await connection.execute(createTableQuery);
        console.log('Database table "tickets" check/creation successful.');

        // Create history table with all columns
        const createHistoryTableQuery = `
            CREATE TABLE IF NOT EXISTS history (
                id INT AUTO_INCREMENT PRIMARY KEY,
                ticket_id INT NOT NULL,
                signature VARCHAR(255),
                details TEXT,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE
            )
        `;
        await connection.execute(createHistoryTableQuery);
        console.log('Database table "history" check/creation successful.');

        // Create employees table
        const createEmployeesTableQuery = `
            CREATE TABLE IF NOT EXISTS employees (
                id INT AUTO_INCREMENT PRIMARY KEY,
                mail VARCHAR(255) NOT NULL UNIQUE,
                username VARCHAR(50) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        await connection.execute(createEmployeesTableQuery);
        console.log('Database table "employees" check/creation successful.');

        // Check if employees table is empty, if so, insert default admin
        const [rows] = await connection.execute('SELECT COUNT(*) as count FROM employees');
        if (rows[0].count === 0) {
            console.log('Employees table is empty. Inserting default admin user.');
            const insertAdminQuery = `
                INSERT INTO employees (mail, username, password)
                VALUES (?, ?, ?)
            `;
            await connection.execute(insertAdminQuery, ['admin@nipa.cloud', 'admin', 'password123']);
            console.log('Default admin user created: admin / password123');
        }

        await connection.end();
    } catch (error) {
        console.error('Error initializing database:', error.message);
    }
}

module.exports = { initDB };

if (require.main === module) {
    initDB();
}