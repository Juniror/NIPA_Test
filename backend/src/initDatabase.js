const mysql = require('mysql2/promise');
const path = require('path');
const ticketsTableQuery = require('./dbtable/tickets');
const historyTableQuery = require('./dbtable/history');
const employeesTableQuery = require('./dbtable/employees');


if (!process.env.DB_HOST) {
    require('dotenv').config({ path: path.join(__dirname, '../.env') });
}


const getDbConfig = () => {
    let host = process.env.DB_HOST;

    if (host === 'db') {
    }
    return {
        host: host,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: 3306
    };
};



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

        // db table tickets
        await connection.execute(ticketsTableQuery);
        console.log('Database table "tickets" check/creation successful.');

        // db table history
        await connection.execute(historyTableQuery);
        console.log('Database table "history" check/creation successful.');

        // db table employees
        await connection.execute(employeesTableQuery);
        console.log('Database table "employees" check/creation successful.');

        // dashboard default user
        const insertEm01Query = `
            INSERT IGNORE INTO employees (mail, username, password)
            VALUES (?, ?, ?)
        `;

        await connection.execute(insertEm01Query, ['em01@gmail.com', 'em01', 'password']);
        console.log('Checked/Created default user: em01 / password');

        await connection.end();
    } catch (error) {
        console.error('Error initializing database:', error.message);
    }
}

module.exports = { initDB };

if (require.main === module) {
    initDB();
}