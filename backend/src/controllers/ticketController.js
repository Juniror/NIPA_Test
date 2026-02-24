import ticketService from '../services/ticketService.js';
import historyService from '../services/historyService.js';
import handleError from '../utils/handleError.js';

const ticketController = {

    async createTicket(req, res) {
        try {
            const result = await ticketService.createTicket(req.body);
            res.status(201).json(result);
        } catch (error) {
            handleError(res, error, 'creating ticket');
        }
    },

    async getTickets(req, res) {
        try {
            const tickets = await ticketService.getTickets(req.query);
            res.json(tickets);
        } catch (error) {
            handleError(res, error, 'fetching tickets');
        }
    },

    async getHistory(req, res) {
        try {
            const history = await historyService.getHistory();
            res.json(history);
        } catch (error) {
            handleError(res, error, 'fetching history');
        }
    },

    async updateTicket(req, res) {
        try {
            const result = await ticketService.updateTicket(req.params.id, req.body);
            res.json(result);
        } catch (error) {
            handleError(res, error, 'updating ticket');
        }
    }
};

export default ticketController;
