const { Comprobante } = require('../models');

const updateTicketById = async (req, res) => {
  const { id } = req.params;
  const { numeroRecibo, mes, año, fechaPago, monto } = req.body;

  try {
    const ticket = await Comprobante.findByPk(id);
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    ticket.numeroRecibo = numeroRecibo || ticket.numeroRecibo;
    ticket.mes = mes || ticket.mes;
    ticket.año = año || ticket.año;
    ticket.fechaPago = fechaPago || ticket.fechaPago;
    ticket.monto = monto || ticket.monto;

    await ticket.save();
    res.status(200).json({ message: 'Ticket updated successfully', ticket });
  } catch (error) {
    console.error('Error detallado:', error);
    res.status(500).json({ message: 'Error updating ticket', error: error.toString() });
  }
};

module.exports = { updateTicketById };
