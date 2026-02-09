const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// Create a new ticket
router.post('/', ticketController.createTicket);

// Get all tickets
router.get('/', ticketController.getTickets);

// Get history
router.get('/history', ticketController.getHistory);

// Update a ticket
router.put('/:id', ticketController.updateTicket);

module.exports = router;
