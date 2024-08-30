import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './editUser.module.css';
import {
  validarEmail,
  validarDocumento,
  validarNombreCompleto,
  validarFechaInscripcion,
  formatearFecha,
} from '../Agregaruser/validaciones';
import { useEditUser } from '../../../hooks/useUpdateUser';
import { useStore } from '../../../store/store';

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, setUsers } = useStore();

  const { editUser, loading, error } = useEditUser();

  const [email, setEmail] = useState('');
  const [documento, setDocumento] = useState('');
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [fechaInscripcion, setFechaInscripcion] = useState('');
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const formatearFechaVista = (fechaISO) => {
    const fecha = new Date(fechaISO);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear().toString().slice(2); 
    return `${dia}/${mes}/${anio}`;
  };

  useEffect(() => {
    const foundUser = users.find((u) => u.id === parseInt(id));
    if (foundUser) {
      setUser(foundUser);
      setEmail(foundUser.email || '');
      setDocumento(foundUser.documento || '');
      setNombreCompleto(foundUser.nombreCompleto || '');
      setFechaInscripcion(formatearFechaVista(foundUser.fechaInscripcion || ''));
    } else {
      navigate('/Admin');
    }
  }, [id, users, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!validarEmail(email)) newErrors.email = 'El email debe ser válido.';
    if (!validarDocumento(documento)) newErrors.documento = 'El número de documento debe ser un número de 8 dígitos.';
    if (!validarNombreCompleto(nombreCompleto)) newErrors.nombreCompleto = 'El nombre completo es obligatorio.';
    if (!validarFechaInscripcion(fechaInscripcion)) newErrors.fechaInscripcion = 'La fecha debe ser dd/mm/aa.';

    if (Object.keys(newErrors).length === 0) {
      const updatedUser = await editUser(id, {
        documento,
        oldEmail: user.email, // Usar el email original como oldEmail
        newEmail: email, // Pasar el email actualizado como newEmail
        nombreCompleto,
        fechaInscripcion,
        mesesDesubscripto: user.mesesDesubscripto, // Mantener los meses de desuscripción actuales
        administrador: user.administrador // Mantener el estado de administrador actual
      });

      if (updatedUser) {
        setMessage('Usuario actualizado exitosamente.');

        // Actualizar el estado local de los usuarios
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u.id === parseInt(id) ? updatedUser : u))
        );

        // Redirigir después de la actualización exitosa
        navigate('/Admin');
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setMessage('');
  };

  const handleFechaInscripcionChange = (e) => {
    const formattedFecha = formatearFecha(e.target.value);
    setFechaInscripcion(formattedFecha);
    setMessage('');
  };

  // Render only when the user is loaded
  if (!user) return <p>Cargando...</p>;

  return (
    <div className={styles.formWrapper}>
      <div className={message ? styles.formContainerWithResult : styles.formContainer}>
        <h1 className={styles.title}>Editar Usuario</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleInputChange(setEmail)}
              required
            />
            {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="documento">Documento</label>
            <input
              type="text"
              id="documento"
              value={documento}
              onChange={handleInputChange(setDocumento)}
              required
            />
            {errors.documento && <p className={styles.errorMessage}>{errors.documento}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="nombreCompleto">Nombre Completo</label>
            <input
              type="text"
              id="nombreCompleto"
              value={nombreCompleto}
              onChange={handleInputChange(setNombreCompleto)}
              required
            />
            {errors.nombreCompleto && <p className={styles.errorMessage}>{errors.nombreCompleto}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="fechaInscripcion">Fecha de Inscripción (dd/mm/aa)</label>
            <input
              type="text"
              id="fechaInscripcion"
              value={fechaInscripcion}
              onChange={handleFechaInscripcionChange}
              maxLength={8} 
              required
            />
            {errors.fechaInscripcion && <p className={styles.errorMessage}>{errors.fechaInscripcion}</p>}
          </div>

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar cambios'}
          </button>

          {error && <p className={styles.errorMessage}>Error: {error.message}</p>}
          {message && <p className={styles.resultMessage}>{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default EditUser;
