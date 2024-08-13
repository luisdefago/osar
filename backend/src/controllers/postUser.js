const { Usuario } = require('../models');
const postUser = async (req, res) => {
  try {
    const { documento, nombreCompleto, fechaInscripcion, mesesDesubscripto, administrador } = req.body;

    const newUser = await Usuario.create({
      documento,
      nombreCompleto,
      fechaInscripcion,
      mesesDesubscripto,
      administrador,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

module.exports = { postUser };
