const express = require('express');
const { getAllUsers } = require('../controllers/getAllUsers');
const { getAllTickets } = require('../controllers/getAllTickets');
const { postUser } = require('../controllers/postUser');
const { postTicket } = require('../controllers/postTicket');

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/tickets', getAllTickets);
router.post('/user/create', postUser);
router.post('/ticket/create', postTicket);

module.exports = router;
