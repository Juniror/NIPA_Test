const pool = require('./config/db');
const ticketsTableQuery = require('./dbtable/tickets');
const historyTableQuery = require('./dbtable/history');
const employeesTableQuery = require('./dbtable/employees');
const addedDefaultUserQuery = require('./dbtable/addedDefaultUser');

async function initDB() {
    console.log("wait 25 sec delay for database initialize docker")
    await new Promise(res => setTimeout(res, 25000));

    const connection = await pool.getConnection();

    try {
        await connection.execute(ticketsTableQuery);
        await connection.execute(historyTableQuery);
        await connection.execute(employeesTableQuery);
        await connection.execute(addedDefaultUserQuery);

        console.log('Database ready\n');
    } finally {
        connection.release();
    }
}

module.exports = initDB;
