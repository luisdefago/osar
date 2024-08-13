const { Comprobante } = require('../models');

const postTicket = async (req, res) => {
  try {
    const { numeroRecibo, mes, año, fechaPago, monto, usuarioId } = req.body;

    const newTicket = await Comprobante.create({
      numeroRecibo,
      mes,
      año,
      fechaPago,
      monto,
      usuarioId,
    });

    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ message: 'Error creating ticket', error });
  }
};

module.exports = { postTicket };
