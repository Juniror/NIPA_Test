const mysql = require('mysql2/promise');
const ticketsTableQuery = require('./dbtable/tickets');
const historyTableQuery = require('./dbtable/history');
const employeesTableQuery = require('./dbtable/employees');


const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: 3306
};

async function initDB() {
    console.log(`Attempting Init DB connection to ${dbConfig.host}...`);

    try {
        let connection;
        connection = await mysql.createConnection(dbConfig);

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

module.exports = initDB;