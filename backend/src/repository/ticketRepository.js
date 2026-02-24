import pool from '../config/db.js';

const ticketRepository = {

    async create(connection, data) {
        const { name, phone, email, company, subject, question, memo, signature } = data;
        const [result] = await connection.execute(
            'INSERT INTO tickets (name, phone, email, company, subject, question, memo, signature) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [name, phone, email, company, subject, question, memo || null, signature || null]
        );
        return result;
    },

    async findAll(filters = {}) {
        let query = 'SELECT * FROM tickets';
        const params = [];
        const conditions = [];

        if (filters.status) {
            conditions.push('status = ?');
            params.push(filters.status);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const sort = filters.sort;
        if (sort === 'latest_update') {
            query += ' ORDER BY updated_at DESC';
        } else if (sort === 'created_at') {
            query += ' ORDER BY created_at DESC';
        } else if (sort === 'status') {
            query += ' ORDER BY status ASC, created_at DESC';
        } else if (sort === 'none') {
            query += ' ORDER BY id ASC';
        } else {
            query += ' ORDER BY created_at DESC';
        }

        const [rows] = await pool.execute(query, params);
        return rows;
    },

    async findById(connection, id) {
        const [rows] = await connection.execute(
            'SELECT id, name, phone, email, company, subject, question, status, memo, signature FROM tickets WHERE id = ?',
            [id]
        );
        return rows[0] || null;
    },

    async update(connection, id, setClauses, params) {
        const query = `UPDATE tickets SET ${setClauses.join(', ')} WHERE id = ?`;
        const allParams = [...params, id];
        const [result] = await connection.execute(query, allParams);
        return result;
    }
};

export default ticketRepository;
