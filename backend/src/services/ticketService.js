const pool = require('../config/db');
const AppError = require('../utils/AppError');
const ticketRepository = require('../repository/ticketRepository');
const historyRepository = require('../repository/historyRepository');

const VALID_STATUSES = ['pending', 'accepted', 'resolved', 'rejected'];

const ticketService = {

    async createTicket(data) {
        const { name, email, subject, question } = data;

        if (!name || !email || !subject || !question) {
            throw new AppError('Name, Email, Subject, and Question are required.', 400);
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new AppError('Invalid email format.', 400);
        }

        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            const result = await ticketRepository.create(connection, data);
            const ticketId = result.insertId;

            await historyRepository.create(connection, ticketId, 'System', 'Ticket created');

            await connection.commit();

            return {
                message: 'Ticket created successfully',
                ticketId: ticketId,
                status: 'pending'
            };
        } catch (err) {
            await connection.rollback();
            throw err;
        } finally {
            connection.release();
        }
    },

    async getTickets(filters) {
        return await ticketRepository.findAll(filters);
    },

    async updateTicket(id, data) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            const currentTicket = await ticketRepository.findById(connection, id);
            if (!currentTicket) {
                throw new AppError('Ticket not found', 404);
            }

            const updates = [];
            const params = [];
            const changes = [];

            const checkChange = (field, newValue, oldValue) => {
                if (newValue !== undefined && newValue !== oldValue) {
                    updates.push(`${field} = ?`);
                    params.push(newValue);
                    changes.push(`${field}: ${oldValue || '(empty)'} -> ${newValue}`);
                }
            };

            checkChange('name', data.name, currentTicket.name);
            checkChange('phone', data.phone, currentTicket.phone);
            checkChange('email', data.email, currentTicket.email);
            checkChange('company', data.company, currentTicket.company);
            checkChange('subject', data.subject, currentTicket.subject);
            checkChange('question', data.question, currentTicket.question);
            checkChange('memo', data.memo, currentTicket.memo);
            checkChange('signature', data.signature, currentTicket.signature);

            if (data.status) {
                if (!VALID_STATUSES.includes(data.status)) {
                    throw new AppError('Invalid status', 400);
                }
                if (data.status !== currentTicket.status) {
                    updates.push('status = ?');
                    params.push(data.status);
                    changes.push(`${currentTicket.status} -> ${data.status}`);
                }
            }

            if (updates.length === 0) {
                return { message: 'No changes provided' };
            }

            await ticketRepository.update(connection, id, updates, params);

            const details = changes.join(', ');
            const actionBy = data.signature || 'System/Unknown';
            await historyRepository.create(connection, id, actionBy, details);

            await connection.commit();
            return { message: 'Ticket updated successfully' };
        } catch (err) {
            await connection.rollback();
            throw err;
        } finally {
            connection.release();
        }
    }
};

module.exports = ticketService;
