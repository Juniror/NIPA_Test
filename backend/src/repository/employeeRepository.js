import pool from '../config/db.js';

const employeeRepository = {

    async findByUsername(username) {
        const [rows] = await pool.execute(
            'SELECT * FROM employees WHERE username = ?',
            [username]
        );
        return rows[0] || null;
    }
};

export default employeeRepository;
