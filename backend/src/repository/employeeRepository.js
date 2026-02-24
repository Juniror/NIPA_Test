const pool = require('../config/db');

const employeeRepository = {

    async findByUsername(username) {
        const [rows] = await pool.execute(
            'SELECT * FROM employees WHERE username = ?',
            [username]
        );
        return rows[0] || null;
    }
};

module.exports = employeeRepository;
