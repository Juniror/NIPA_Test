import express from 'express';
const router = express.Router();
import ticketController from '../controllers/ticketController.js';

router.post('/', ticketController.createTicket);

router.get('/', ticketController.getTickets);

router.get('/history', ticketController.getHistory);

router.put('/:id', ticketController.updateTicket);

export default router;
