import { useState } from 'react';
import styles from './login.module.css';
import { useSendResetPasswordEmail } from '../../hooks/useSendResetPasswordEmail';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const { sendResetPasswordEmail, loading, error, success } = useSendResetPasswordEmail();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendResetPasswordEmail(email);
    };

    return (
        <div className={styles.loginWrapper}>
        <div className={styles.loginContainer}>
            <h2 className={styles.title}>Restablecer Contraseña</h2>
            <p className={styles.subtitle}>Ingresa tu correo electrónico para recibir un enlace de restablecimiento</p>

            <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
                <label htmlFor="email">Correo Electrónico</label>
                <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>
            <button type="submit" className={styles.submitButton} disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar Correo de Restablecimiento'}
            </button>
            </form>

            {error && <p className={styles.errorMessage}>{error}</p>}
            {success && <p className={styles.successMessage}>{success}</p>}
        </div>
        </div>
    );
};

export default ResetPassword;