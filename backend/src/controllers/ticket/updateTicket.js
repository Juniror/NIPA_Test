const pool = require('../../config/db');

const updateTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone, email, company, subject, question, status, memo, signature } = req.body;

        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            // Check if ticket exists and get current data
            const [rows] = await connection.execute(
                'SELECT id, name, phone, email, company, subject, question, status, memo, signature FROM tickets WHERE id = ?',
                [id]
            );
            if (rows.length === 0) {
                connection.release();
                return res.status(404).json({ error: 'Ticket not found' });
            }
            const currentTicket = rows[0];

            // Build dynamic update query
            const updates = [];
            const params = [];

            const changes = [];

            // Helper to check and record changes
            const checkChange = (field, newValue, oldValue) => {
                // strict equality check, but handle undefined/null
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
            // signature in tickets table usually refers to the creator or last editor, 
            // but here it seems we are updating the ticket's signature field itself?
            // If signature is passed in body as a field to update:
            checkChange('signature', signature, currentTicket.signature);

            // Status special handling (validation)
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

                // Record history
                const details = changes.join(', ');

                // For history signature, we use the signature provided in the request (the actor)
                // OR we might want to distinguish between "updating the signature field" vs "who is performing the action"
                // The current code used `signature` from body as the entries `signature`.
                // If `signature` is also a field being updated, it's ambiguous. 
                // However, usually `signature` in update request = "Who is doing this".
                // I will stick to using `signature` request param as the History Actor.

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
            // connection.release() is called in the if/else blocks or before return if needed, 
            // but here we used transaction so we MUST release. 
            // Ideally we structure it to always release in finally.
            // Releasing here if not already released (pool.getConnection() returns a connection that needs release)
            if (connection) connection.release();
        }

    } catch (error) {
        console.error('Error updating ticket:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = updateTicket;
