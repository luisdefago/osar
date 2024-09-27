import { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import app from '../firebase/firebaseConfig';

export const useSendResetPasswordEmail = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const sendResetPasswordEmail = async (email) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
        const auth = getAuth(app);
        await sendPasswordResetEmail(auth, email);

        // Si el correo se envía con éxito
        setSuccess(`Correo de restablecimiento enviado a ${email}`);
        console.log(success);
        
        } catch (err) {
        console.error('Error al enviar el correo de restablecimiento:', err);
        setError('Error al enviar el correo de restablecimiento. Verifica si el correo es correcto.');
        } finally {
        setLoading(false);
        }
    };

    return { sendResetPasswordEmail, loading, error, success };
};
