const mysql = require('mysql2/promise');
const fs = require('fs');

const isDocker = fs.existsSync('/.dockerenv');
const dbHost = (process.env.DB_HOST === 'db' && !isDocker) ? '127.0.0.1' : process.env.DB_HOST;

const dbConfig = {
    host: dbHost,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

// Create a connection pool instead of single connection for better performance
const pool = mysql.createPool(dbConfig);

module.exports = pool;
