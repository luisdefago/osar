const { Usuario, Comprobante } = require('../models');

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Usuario.findByPk(id, {
      include: [{
        model: Comprobante,
        as: 'comprobantes',
      }],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error detallado:', error);
    res.status(500).json({ message: 'Error fetching user', error: error.toString() });
  }
};

module.exports = { getUserById };
