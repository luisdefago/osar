const { Comprobante } = require('../models');

const deleteTicketById = async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await Comprobante.findByPk(id);
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    await ticket.destroy();
    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error('Error detallado:', error);
    res.status(500).json({ message: 'Error deleting ticket', error: error.toString() });
  }
};

module.exports = { deleteTicketById };
