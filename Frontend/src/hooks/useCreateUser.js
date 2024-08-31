import { useState } from 'react';
import axios from 'axios';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import app from '../firebase/firebaseConfig';

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createUser = async ({ documento, email, nombreCompleto, fechaInscripcion }) => {
    setLoading(true);
    setError(null);

    try {
      // Obtener la instancia de auth (la inicialización debe estar hecha)
      const auth = getAuth(app);

      // Crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, documento);

      // Usuario creado exitosamente en Firebase
      const user = userCredential.user;

      // Crear el usuario en tu API
      const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/users/create`, {
        documento,
        email,
        nombreCompleto,
        fechaInscripcion,
        mesesDesubscripto: [],
        administrador: false,
      });

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
