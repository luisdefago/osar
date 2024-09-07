import { useState } from 'react';
import axios from 'axios';
import { useStore } from '../store/store';

export const useFetchDatosTransferencia = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { setDatosTransferencia } = useStore(); 

    const fetchDatosTransferencia = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/datosTransferencia`);
            const datos = response.data;

            setDatosTransferencia(datos);
        } catch (err) {
            console.error('Error fetching datosTransferencia:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { fetchDatosTransferencia, loading, error };
};

