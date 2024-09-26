import { useState, useEffect } from 'react';
import styles from './login.module.css';
import { useLoginUser } from '../../hooks/useLoginUser';
import { useNavigate } from 'react-router-dom';
import { useFetchDatosTransferencia } from '../../hooks/useFetchDatosTransferencia'; // Importa el hook
import logo from '../../assets/logo-osar.jpeg';


function Login() {
  const [documento, setDocumento] = useState('');
  const [password, setPassword] = useState('');
  const [errorDocumento, setErrorDocumento] = useState('');
  const { loginUser, loading, error } = useLoginUser();
  const { fetchDatosTransferencia } = useFetchDatosTransferencia(); // Usa la función aquí
  const navigate = useNavigate();

  const [existingUser, setExistingUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if (storedUser) {
      setExistingUser(storedUser);
    }
  }, []);

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
      await fetchDatosTransferencia(); // Ejecuta el hook después del login
      result.administrador ? navigate('/Admin') : navigate('/Info-user');
    }
  };

  const handleContinue = async () => {
    if (existingUser) {
      const result = await loginUser({
        documento: existingUser.documento,
        password: existingUser.documento,
      });

      if (result) {
        await fetchDatosTransferencia(); // Ejecuta el hook aquí también
        result.administrador ? navigate('/Admin') : navigate('/Info-user');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    setExistingUser(null);
    window.location.reload();
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginContainer}>
        <div className={styles.titleContainer}>
          <img src={logo} alt="Logo" className={styles.logo} />
          <h1 className={styles.title}>Inicia sesión</h1>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>
        <p className={styles.subtitle}>{existingUser ? `Con ${existingUser.email}`: 'Con tu número de documento y contraseña'}</p>

        {existingUser && (
          <div className={styles.existingUserMessage}>
            <p>¿Quieres continuar con la cuenta asociada al email {existingUser.email}?</p>
            <button onClick={handleContinue} className={styles.continueButton}>
              Continuar
            </button>
            <button onClick={handleLogout} className={`${styles.continueButton} ${styles.logoutButton}`}>
              Cerrar sesión
            </button>
          </div>
        )}

        {!existingUser && (
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
            {error && <p className={styles.errorMessage}>A ocurrido un error con tus credenciales. Vuelve a intentarlo.</p>}
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
