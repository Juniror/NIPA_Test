const pool = require('../../config/db');

const getHistory = async (req, res) => {
    try {
        const query = `
            SELECT 
                h.id,
                h.ticket_id,
                h.signature,
                h.details,
                h.timestamp,
                t.subject
            FROM history h
            JOIN tickets t ON h.ticket_id = t.id
            ORDER BY h.timestamp DESC
            LIMIT 100
        `;
        const [rows] = await pool.execute(query);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching history:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = getHistory;
