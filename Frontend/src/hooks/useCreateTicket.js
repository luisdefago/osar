import { useState } from 'react';
import axios from 'axios';

export const useCreateTicket = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createTicket = async (ticketData) => {
    setLoading(true);
    setError(null);

    try {
      // Realizar la solicitud POST a la API para crear el recibo
      const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/tickets/create`, ticketData);

      return response.data;
    } catch (err) {
      console.error('Error creando el recibo:', err);
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createTicket, loading, error };
};
