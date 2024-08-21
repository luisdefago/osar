import { useEffect } from 'react';
import UserList from '../../userList/UserList';
import styles from './admindashboard.module.css';
import { useFetchUsers } from '../../../hooks/useFetchUsers';
import { useStore } from '../../../store/store';

function Admindashboard() {
  const { user } = useStore();
  const { loading, error } = useFetchUsers();

  useEffect(() => {
    if (!user?.administrador) {
      console.warn('Acceso denegado: solo administradores');
      return;
    }
  }, [user]);

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
      </div>
    </div>
  );
}

export default Admindashboard;
