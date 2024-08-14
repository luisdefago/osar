const express = require('express');
const { getAllUsers } = require('../controllers/getAllUsers');
const { getAllTickets } = require('../controllers/getAllTickets');
const { postUser } = require('../controllers/postUser');
const { postTicket } = require('../controllers/postTicket');
const { deleteUserById } = require('../controllers/deleteUserById');
const { deleteTicketById } = require('../controllers/deleteTicketById');
const { updateUserById } = require('../controllers/updateUserById');
const { updateTicketById } = require('../controllers/updateTicketById');
const { getUserById } = require('../controllers/getUserById');

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.get('/tickets', getAllTickets);

router.post('/users/create', postUser);
router.post('/tickets/create', postTicket);

router.delete('/users/:id', deleteUserById);
router.delete('/tickets/:id', deleteTicketById);

router.put('/users/:id', updateUserById);
router.put('/tickets/:id', updateTicketById);

module.exports = router;
