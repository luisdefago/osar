const { Usuario, Comprobante } = require('../models');

const getAllUsers = async (req, res) => {
  try {
    const users = await Usuario.findAll({
      include: [{
        model: Comprobante,
        as: 'comprobantes',
        }]
    });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error detallado:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.toString() });
  }
};

module.exports = { getAllUsers };