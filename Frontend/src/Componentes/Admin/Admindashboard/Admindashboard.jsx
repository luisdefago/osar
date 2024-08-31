import { useEffect } from 'react';
import UserList from '../../userList/UserList';
import styles from './admindashboard.module.css';
import { useFetchUsers } from '../../../hooks/useFetchUsers';
import { useStore } from '../../../store/store';
import { useNavigate } from 'react-router-dom';

function Admindashboard() {
  const { user, setUser } = useStore();
  const { loading, error } = useFetchUsers();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      const loggedUser = localStorage.getItem('loggedUser');

      if (loggedUser) {
        const parsedUser = JSON.parse(loggedUser);

        if (parsedUser.administrador) {
          setUser(parsedUser);
        }
      } else {
        navigate('/');
      }
    }
  }, [user, setUser, navigate]);

  if (!user?.administrador) {
    return (
      <div className={styles.deniedAccessWrapper}>
        <div className={styles.deniedAccessContainer}>
          <h2 className={styles.deniedTitle}>Acceso Denegado</h2>
          <p className={styles.deniedMessage}>No tienes permiso para acceder a esta página.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.dashboardContainer}>
        <h1 className={styles.title}>Administración de Usuarios</h1>
        {loading && (
          <div className={styles.loaderWrapper}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingMessage}>Cargando usuarios...</p>
          </div>
        )}
        {error && <p className={styles.errorMessage}>Error al cargar usuarios: {error.message}</p>}
        {!loading && !error && <UserList />}
        <div className={styles.navigateAddUserContainer}>
          <button className={styles.navigateAddUserBtn} onClick={() => navigate('/Agregar-usuario')}>
            Agregar usuario
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admindashboard;
