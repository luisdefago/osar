import { useState } from 'react';
import axios from 'axios';

export const useUpdateDatosTransferencia = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateDatosTransferencia = async (id, updatedData) => {
        setLoading(true);
        setError(null);

        try {
        const response = await axios.put(`${import.meta.env.VITE_URL_BACKEND}/datosTransferencia/${id}`, updatedData);

        return response.data;
        } catch (err) {
        console.error('Error actualizando los datos de transferencia:', err);
        setError(err);
        return null;
        } finally {
        setLoading(false);
        }
    };

    return { updateDatosTransferencia, loading, error };
};
