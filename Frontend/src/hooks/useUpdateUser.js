import { useState } from 'react';
import axios from 'axios';

export const useEditUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const editUser = async (id, { documento, oldEmail, newEmail, nombreCompleto, fechaInscripcion, administrador, mesesDesubscripto }) => {
    setLoading(true);
    setError(null);

    try {
      // Actualizar el usuario en tu API
      const response = await axios.put(`${import.meta.env.VITE_URL_BACKEND}/users/${id}`, {
        documento,
        oldEmail,
        newEmail,
        nombreCompleto,
        fechaInscripcion,
        mesesDesubscripto: mesesDesubscripto || [],
        administrador: administrador ?? false,
      });
      
      return response.data;
    } catch (err) {
      console.error('Error actualizando el usuario:', err);
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { editUser, loading, error };
};
