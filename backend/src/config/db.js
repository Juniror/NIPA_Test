import mysql from 'mysql2/promise';
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE
};

const pool = mysql.createPool(dbConfig);

export default pool;
