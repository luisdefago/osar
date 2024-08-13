const { Usuario, Comprobante } = require('../models');

const getAllUsers = async (req, res) => {
  try {
    const users = await Usuario.findAll({
      include: [{
        model: Comprobante,
        as: 'comprobantes',
        attributes: ['id', 'numeroRecibo', 'mes', 'año', 'fechaPago', 'monto'] // Especifica los campos que quieres incluir
      }],
      attributes: ['id', 'documento', 'nombreCompleto', 'fechaInscripcion', 'administrador'] // Especifica los campos del usuario que quieres incluir
    });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error detallado:', error); // Añade esto para ver más detalles del error en la consola
    res.status(500).json({ message: 'Error fetching users', error: error.toString() });
  }
};

module.exports = { getAllUsers };