const { Usuario } = require('../models');
const moment = require('moment');

const postUser = async (req, res) => {
  try {
    // Extrae los datos del cuerpo de la solicitud
    const { documento, email, nombreCompleto, fechaInscripcion, mesesDesubscripto, administrador } = req.body;

    // Verifica que se proporcionen todos los campos requeridos
    if (!documento || !email || !nombreCompleto || !fechaInscripcion) {
      return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    // Convierte la fecha de inscripción al formato YYYY-MM-DD
    const formattedDate = moment(fechaInscripcion, 'DD/MM/YY').toDate();
    if (!formattedDate.getTime()) {
      return res.status(400).json({ message: 'Fecha de inscripción inválida' });
    }

    console.log(formattedDate);

    // Crea un nuevo usuario en la base de datos
    const newUser = await Usuario.create({
      documento,
      email,
      nombreCompleto,
      fechaInscripcion: formattedDate, // Usa la fecha en formato Date
      mesesDesubscripto,
      administrador,
    });

    // Responde con el nuevo usuario creado
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error al crear el usuario:', error); // Agrega detalles del error en el log
    res.status(500).json({ message: 'Error creando el usuario', error });
  }
};

module.exports = { postUser };
