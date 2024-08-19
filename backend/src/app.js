const express = require('express');
const cors = require('cors');
const router = require('./routes');

const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://osar.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  }
}));

app.use(express.json());

app.use('/api', router);

module.exports = app;
