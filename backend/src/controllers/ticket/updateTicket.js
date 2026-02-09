const pool = require('../../config/db');

const updateTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone, email, company, subject, question, status, memo, signature } = req.body;

        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();


            const [rows] = await connection.execute(
                'SELECT id, name, phone, email, company, subject, question, status, memo, signature FROM tickets WHERE id = ?',
                [id]
            );
            if (rows.length === 0) {
                connection.release();
                return res.status(404).json({ error: 'Ticket not found' });
            }
            const currentTicket = rows[0];


            const updates = [];
            const params = [];

            const changes = [];


            const checkChange = (field, newValue, oldValue) => {
                if (newValue !== undefined && newValue !== oldValue) {
                    updates.push(`${field} = ?`);
                    params.push(newValue);
                    changes.push(`${field}: ${oldValue || '(empty)'} -> ${newValue}`);
                    return true;
                }
                return false;
            };

            // Check each field
            checkChange('name', name, currentTicket.name);
            checkChange('phone', phone, currentTicket.phone);
            checkChange('email', email, currentTicket.email);
            checkChange('company', company, currentTicket.company);
            checkChange('subject', subject, currentTicket.subject);
            checkChange('question', question, currentTicket.question);
            checkChange('memo', memo, currentTicket.memo);

            checkChange('signature', signature, currentTicket.signature);


            if (status) {
                const validStatuses = ['pending', 'accepted', 'resolved', 'rejected'];
                if (!validStatuses.includes(status)) {
                    connection.release();
                    return res.status(400).json({ error: 'Invalid status' });
                }
                if (status !== currentTicket.status) {
                    updates.push('status = ?');
                    params.push(status);
                    changes.push(`${currentTicket.status} -> ${status}`);
                }
            }

            if (updates.length > 0) {
                params.push(id);
                const query = `UPDATE tickets SET ${updates.join(', ')} WHERE id = ?`;
                await connection.execute(query, params);


                const details = changes.join(', ');

                const actionBy = req.body.signature || 'System/Unknown';
                await connection.execute(
                    'INSERT INTO history (ticket_id, signature, details) VALUES (?, ?, ?)',
                    [id, actionBy, details]
                );

                await connection.commit();
                res.json({ message: 'Ticket updated successfully' });
            } else {
                connection.release();
                res.json({ message: 'No changes provided' });
            }
        } catch (err) {
            await connection.rollback();
            throw err;
        } finally {
            if (connection) connection.release();
        }

    } catch (error) {
        console.error('Error updating ticket:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = updateTicket;
