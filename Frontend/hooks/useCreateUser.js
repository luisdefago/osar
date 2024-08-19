import { useState } from 'react';
import axios from 'axios';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Asegúrate de haber inicializado Firebase

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createUser = async ({ documento, email, nombreCompleto, fechaInscripcion }) => {
    setLoading(true);
    setError(null);

    try {
      // Crear usuario en Firebase Authentication
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, documento);

      // Usuario creado exitosamente en Firebase
      const user = userCredential.user;

      // Crear el usuario en tu API
      const response = await axios.post('https://osar.vercel.app/api/users/create', {
        documento,
        email,
        nombreCompleto,
        fechaInscripcion,
        mesesDesubscripto: [],
        administrador: false,
      });

      console.log('Usuario creado en la API:', response.data);

      return response.data;
    } catch (err) {
      console.error('Error creando el usuario:', err);
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createUser, loading, error };
};
