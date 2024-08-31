const { Usuario } = require('../models');
const admin = require('firebase-admin');

const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { documento, nombreCompleto, fechaInscripcion, mesesDesubscripto, administrador, oldEmail, newEmail } = req.body;

  try {
    const user = await Usuario.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verificar si el documento ha cambiado
    const documentoChanged = documento && documento !== user.documento;

    // Si el email ha cambiado, actualizarlo en Firebase Authentication
    if (oldEmail && newEmail && oldEmail !== newEmail) {
      try {
        // Obtener el usuario por el correo electrónico anterior
        const firebaseUser = await admin.auth().getUserByEmail(oldEmail);

        // Actualizar el correo electrónico en Firebase
        await admin.auth().updateUser(firebaseUser.uid, { email: newEmail });

        console.log(`Correo electrónico actualizado de ${oldEmail} a ${newEmail}`);
      } catch (firebaseError) {
        console.error('Error actualizando el correo en Firebase:', firebaseError);
        return res.status(500).json({ message: 'Error updating email in Firebase', error: firebaseError.toString() });
      }
    }

    // Si el documento ha cambiado, actualizar la contraseña en Firebase Authentication
    if (documentoChanged) {
      try {
        // Obtener el usuario por el correo electrónico actual (oldEmail)
        const firebaseUser = await admin.auth().getUserByEmail(newEmail || oldEmail);

        // Actualizar la contraseña en Firebase (la nueva contraseña será el nuevo documento)
        await admin.auth().updateUser(firebaseUser.uid, { password: documento });

        console.log(`Contraseña actualizada para el usuario ${newEmail || oldEmail} con el nuevo documento ${documento}`);
      } catch (firebaseError) {
        console.error('Error actualizando la contraseña en Firebase:', firebaseError);
        return res.status(500).json({ message: 'Error updating password in Firebase', error: firebaseError.toString() });
      }
    }

    // Actualizar los datos del usuario en la base de datos
    user.documento = documento !== undefined ? documento : user.documento;
    user.email = newEmail !== undefined ? newEmail : user.email;
    user.nombreCompleto = nombreCompleto !== undefined ? nombreCompleto : user.nombreCompleto;
    user.fechaInscripcion = fechaInscripcion !== undefined ? fechaInscripcion : user.fechaInscripcion;
    user.mesesDesubscripto = mesesDesubscripto !== undefined ? mesesDesubscripto : user.mesesDesubscripto;
    user.administrador = administrador !== undefined ? administrador : user.administrador;

    await user.save();
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error actualizando el usuario:', error);
    res.status(500).json({ message: 'Error updating user', error: error.toString() });
  }
};

module.exports = { updateUserById };

