const { Usuario } = require('../models');

const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { documento, nombreCompleto, fechaInscripcion, mesesDesubscripto, administrador } = req.body;

  try {
    const user = await Usuario.findByPk(id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.documento = documento || user.documento;
    user.nombreCompleto = nombreCompleto || user.nombreCompleto;
    user.fechaInscripcion = fechaInscripcion || user.fechaInscripcion;
    user.mesesDesubscripto = mesesDesubscripto || user.mesesDesubscripto;
    user.administrador = administrador || user.administrador;

    await user.save();
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error detallado:', error);
    res.status(500).json({ message: 'Error updating user', error: error.toString() });
  }
};

module.exports = { updateUserById };
