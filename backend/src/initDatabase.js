import pool from './config/db.js';
import ticketsTableQuery from './dbtable/tickets.js';
import historyTableQuery from './dbtable/history.js';
import employeesTableQuery from './dbtable/employees.js';
import addedDefaultUserQuery from './dbtable/addedDefaultUser.js';

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

export default initDB;
