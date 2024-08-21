import { useState } from 'react';
import styles from './login.module.css';
import { useLoginUser } from '../../hooks/useLoginUser';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [documento, setDocumento] = useState('');
  const [password, setPassword] = useState('');
  const [errorDocumento, setErrorDocumento] = useState('');
  const { loginUser, loading, error } = useLoginUser();
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isNaN(documento)) {
      setErrorDocumento('El número de documento debe ser un número.');
      return;
    } else {
      setErrorDocumento('');
    }

    const result = await loginUser({ documento, password });

    if (result) {
      console.log('Login successful:', result);
      result.administrador ? navigate('/Admin') : navigate('/Info-user');
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginContainer}>
        <h1 className={styles.title}>Inicia sesión</h1>
        <p className={styles.subtitle}>Con tu número de documento y contraseña</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="documento">Documento</label>
            <input
              type="text"
              id="documento"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              required
            />
            {errorDocumento && <p className={styles.errorMessage}>{errorDocumento}</p>}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
          {error && <p className={styles.errorMessage}>Error: {error.message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
