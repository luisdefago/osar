import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './login.module.css';
import { useLoginUser } from '../../hooks/useLoginUser';
import { useFetchDatosTransferencia } from '../../hooks/useFetchDatosTransferencia';
import logo from '../../assets/logo-osar.jpeg';
import { Eye, EyeOff } from 'lucide-react';

function Login() {
  const [documento, setDocumento] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorDocumento, setErrorDocumento] = useState('');
  const { loginUser, loading, error } = useLoginUser();
  const { fetchDatosTransferencia } = useFetchDatosTransferencia();
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
      await fetchDatosTransferencia();
      result.administrador ? navigate('/Admin') : navigate('/Info-user');
    }
  };

  const handleContinue = async () => {
    if (existingUser) {
      const result = await loginUser({
        documento: existingUser.documento,
        password: existingUser.password,
      });

      if (result) {
        await fetchDatosTransferencia();
        result.administrador ? navigate('/Admin') : navigate('/Info-user');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    setExistingUser(null);
    window.location.reload();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginContainer}>
        <div className={styles.titleContainer}>
          <img src={logo} alt="Logo" className={styles.logo} />
          <h1 className={styles.title}>Iniciar sesión</h1>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>
        <p className={styles.subtitle}>{existingUser ? `Con ${existingUser.email}` : 'Con tu número de documento y contraseña'}</p>

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
              <div className={styles.passwordInputWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={styles.togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
            {error && <p className={styles.errorMessage}>Ha ocurrido un error con tus credenciales. Vuelve a intentarlo.</p>}
          </form>
        )}
        
        <Link to="/Cambiar-Contraseña" className={styles.changePasswordLink}>
          Cambiar Contraseña
        </Link>
      </div>
    </div>
  );
}

export default Login;