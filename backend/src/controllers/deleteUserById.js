const { Usuario, Comprobante } = require('../models');

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Usuario.findByPk(id, {
      include: [{ model: Comprobante, as: 'comprobantes' }]
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.comprobantes && user.comprobantes.length > 0) {
      await Comprobante.destroy({ where: { usuarioId: id } });
    }

    await user.destroy();
    res.status(200).json({ message: 'User and associated tickets deleted successfully' });
  } catch (error) {
    console.error('Error detallado:', error);
    res.status(500).json({ message: 'Error deleting user', error: error.toString() });
  }
};

module.exports = { deleteUserById };
