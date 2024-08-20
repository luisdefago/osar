import { useState } from 'react';
import axios from 'axios';

export const useUpdateTicket = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateTicket = async (id, updatedData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(`${import.meta.env.VITE_URL_BACKEND}/tickets/${id}`, updatedData);

      console.log('Recibo actualizado en la API:', response.data);

      return response.data;
    } catch (err) {
      console.error('Error actualizando el recibo:', err);
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateTicket, loading, error };
};
