import { useState, useEffect } from 'react';
import axios from 'axios';
import { useStore } from '../store/store';

export const useFetchUsers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUsers } = useStore(); // Destructura la función setUsers de la store

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        // Realiza la solicitud GET a la ruta /users
        const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/users`);
        const users = response.data;

        // Actualiza la store con el array de usuarios
        setUsers(users);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [setUsers]); // Dependencia de setUsers para evitar advertencias de dependencias

  return { loading, error };
};
