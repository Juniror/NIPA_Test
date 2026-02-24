const pool = require('../config/db');

const historyRepository = {

    async create(connection, ticketId, signature, details) {
        const [result] = await connection.execute(
            'INSERT INTO history (ticket_id, signature, details) VALUES (?, ?, ?)',
            [ticketId, signature, details]
        );
        return result;
    },

    async findAll() {
        const query = `
            SELECT id, ticket_id, signature, details, timestamp
            FROM history
            ORDER BY timestamp DESC
        `;
        const [rows] = await pool.execute(query);
        return rows;
    }
};

module.exports = historyRepository;
