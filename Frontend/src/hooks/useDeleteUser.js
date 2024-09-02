import { useState } from 'react';
import axios from 'axios';
import { useStore } from '../store/store';

export const useDeleteUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { users, setUsers } = useStore();

    const deleteUser = async (id) => {
        setLoading(true);
        setError(null);

        try {
        await axios.delete(`${import.meta.env.VITE_URL_BACKEND}/users/${id}`);

        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);

        return true;
        } catch (err) {
        console.error('Error eliminando el usuario:', err);
        setError(err);
        return null;
        } finally {
        setLoading(false);
        }
    };

    return { deleteUser, loading, error };
};
