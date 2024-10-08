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
const { getUserByDocumento } = require('../controllers/getUserByDoc');
const { getAllTransferData, deleteTransferData, postTransferData, updateTransferData } = require('../controllers/datosTransferencia');

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/users/id/:id', getUserById);
router.get('/users/documento/:documento', getUserByDocumento);
router.get('/tickets', getAllTickets);
router.get('/datosTransferencia', getAllTransferData);

router.post('/users/create', postUser);
router.post('/tickets/create', postTicket);
router.post('/datosTransferencia/create', postTransferData);

router.delete('/users/:id', deleteUserById);
router.delete('/tickets/:id', deleteTicketById);
router.delete('/datosTransferencia/:id', deleteTransferData);

router.put('/users/:id', updateUserById);
router.put('/tickets/:id', updateTicketById);
router.put('/datosTransferencia/:id', updateTransferData);

module.exports = router;
