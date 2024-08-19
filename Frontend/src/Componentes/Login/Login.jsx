import { useState } from 'react';
import styles from './login.module.css';

function Login() {
  const [documento, setDocumento] = useState('');
  const [password, setPassword] = useState('');
  const [errorDocumento, setErrorDocumento] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isNaN(documento)) {
      setErrorDocumento('El número de documento debe ser un número.');
      return;
    } else {
      setErrorDocumento('');
    }

    console.log('Login attempted with:', documento, password);
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
          <button type="submit" className={styles.submitButton}>Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
