const pool = require('../../config/db');

const createTicket = async (req, res) => {
    try {
        const { name, phone, email, company, subject, question, memo, signature } = req.body;

        // Validation
        if (!name || !email || !subject || !question) {
            return res.status(400).json({ error: 'Name, Email, Subject, and Question are required.' });
        }

        // Email regex validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format.' });
        }

        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            const [result] = await connection.execute(
                'INSERT INTO tickets (name, phone, email, company, subject, question, memo, signature) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [name, phone, email, company, subject, question, memo || null, signature || null]
            );

            const ticketId = result.insertId;

            // Record history
            await connection.execute(
                'INSERT INTO history (ticket_id, signature, details) VALUES (?, ?, ?)',
                [ticketId, 'System', 'Ticket created']
            );

            await connection.commit();

            res.status(201).json({
                message: 'Ticket created successfully',
                ticketId: ticketId,
                status: 'pending'
            });
        } catch (err) {
            await connection.rollback();
            throw err;
        } finally {
            connection.release();
        }

    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = createTicket;
