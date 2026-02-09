const pool = require('../../config/db');

const getTickets = async (req, res) => {
    try {
        const { status, sort } = req.query;
        let query = 'SELECT * FROM tickets';
        const params = [];
        const conditions = [];

        // Filtering
        if (status) {
            conditions.push('status = ?');
            params.push(status);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        // Sorting
        if (sort === 'latest_update') {
            query += ' ORDER BY updated_at DESC';
        } else if (sort === 'created_at') {
            query += ' ORDER BY created_at DESC';
        } else if (sort === 'status') {
            query += ' ORDER BY status ASC, created_at DESC';
        } else if (sort === 'none') {
            query += ' ORDER BY id ASC';
        } else {
            query += ' ORDER BY created_at DESC'; // Default
        }

        const [rows] = await pool.execute(query, params);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = getTickets;
