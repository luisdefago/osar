import { useState } from 'react';
import styles from './crearUsuario.module.css';

import {
  validarEmail,
  validarDocumento,
  validarNombreCompleto,
  validarFechaInscripcion,
  formatearFecha
} from './validaciones';
import { useCreateUser } from '../../../hooks/useCreateUser';


function CrearUsuario() {
  const [email, setEmail] = useState('');
  const [documento, setDocumento] = useState('');
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [fechaInscripcion, setFechaInscripcion] = useState('');
  const [errors, setErrors] = useState({});
  const { createUser, loading, error } = useCreateUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!validarEmail(email)) newErrors.email = 'El email debe ser válido.';
    if (!validarDocumento(documento)) newErrors.documento = 'El número de documento debe ser un número de 8 digitos.';
    if (!validarNombreCompleto(nombreCompleto)) newErrors.nombreCompleto = 'El nombre completo es obligatorio.';
    if (!validarFechaInscripcion(fechaInscripcion)) newErrors.fechaInscripcion = 'La fecha debe ser dd/mm/aa.';

    if (Object.keys(newErrors).length === 0) {
      const result = await createUser({ documento, email, nombreCompleto, fechaInscripcion });

      if (result) {
        console.log('Usuario creado exitosamente:', result);
      }
    }

    setErrors(newErrors);
  };

  const handleFechaInscripcionChange = (e) => {
    const formattedFecha = formatearFecha(e.target.value);
    setFechaInscripcion(formattedFecha);
  };

  return (
    <div className={styles.formWrapper}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Crear Usuario</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setDocumento(e.target.value)}
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
              onChange={(e) => setNombreCompleto(e.target.value)}
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
            {loading ? 'Creando...' : 'Crear Usuario'}
          </button>

          {error && <p className={styles.errorMessage}>Error: {error.message}</p>}
        </form>
      </div>
    </div>
  );
}

export default CrearUsuario;
