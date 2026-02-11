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
    console.log("wait 25 sec delay for database initialize docker")
    await new Promise(res => setTimeout(res, 25000));

    const connection = await mysql.createConnection(dbConfig);

    await connection.execute(ticketsTableQuery);

    await connection.execute(historyTableQuery);

    await connection.execute(employeesTableQuery);

    const insertEm01Query = `
        INSERT IGNORE INTO employees (mail, username, password)
        VALUES (?, ?, ?)
    `;
    await connection.execute(insertEm01Query, ['em01@gmail.com', 'em01', 'password']);

    await connection.end();
    console.log('Database ready\n');
}

module.exports = initDB;
