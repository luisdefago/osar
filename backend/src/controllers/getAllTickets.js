const { Usuario, Comprobante } = require('../models');

const getAllTickets = async (req, res) => {
  try {
    const tickets = await Comprobante.findAll({
      include: [{
        model: Usuario,
        as: 'usuario'
      }]
    });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets', error });
  }
};

module.exports = { getAllTickets };
