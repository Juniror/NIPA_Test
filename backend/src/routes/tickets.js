const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.post('/', ticketController.createTicket);

router.get('/', ticketController.getTickets);

router.get('/history', ticketController.getHistory);

router.put('/:id', ticketController.updateTicket);

module.exports = router;
