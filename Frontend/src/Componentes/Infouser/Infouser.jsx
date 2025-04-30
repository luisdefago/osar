import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './InfoUser.module.css';
import { useStore } from '../../store/store';
import InfoUserMobile from './InfoUserMobile';

const InfoUser = () => {
  const { user, setUser, datosTransferencia } = useStore();
  const [selectedComprobante, setSelectedComprobante] = useState(null);
  const [selectedTransferencia, setSelectedTransferencia] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1150);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  if (isMobile) {
    return <InfoUserMobile user={user} setUser={setUser} datosTransferencia={datosTransferencia} />;
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    setUser(null);
    navigate('/');
  };

  const fechaInscripcion = new Date(user.fechaInscripcion);

  const handleCellClick = (comprobante) => {
    if (selectedComprobante === comprobante) {
      setSelectedComprobante(null);
    } else {
      setSelectedComprobante(comprobante);
      setSelectedTransferencia(null);
    }
  };

  const handleTransferenciaClick = () => {
    setSelectedTransferencia(datosTransferencia[0]);
    setSelectedComprobante(null);
  };

  const startYear = fechaInscripcion.getFullYear();
  const startMonth = fechaInscripcion.getMonth() + 1;
  // 1. Calculamos fecha final: hoy + 18 meses
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 18);
  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth() + 1;

  const meses = ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

  const comprobantesMap = user.comprobantes.reduce((map, comp) => {
    if (!map[comp.año]) map[comp.año] = {};
    map[comp.año][comp.mes] = comp;
    return map;
  }, {});  

  const generateRows = () => {
    const rows = [];
    // 2. Iteramos desde el año de inscripción hasta el año final
    for (let year = startYear; year <= endYear; year++) {
      const cells = meses.map((_, idx) => {
        const month = idx + 1;

        // 3a. Antes de la inscripción: celda vacía
        if (year === startYear && month < startMonth) {
          return <td key={month}></td>;
        }
        // 3b. Después de 18 meses: celda vacía
        if (year === endYear && month > endMonth) {
          return <td key={month}></td>;
        }

        const comprobante = comprobantesMap[year]?.[month];
        // 3c. Si hay comprobante, mostramos el recibo
        if (comprobante) {
          return (
            <td
              key={month}
              className={styles.comprobante}
              onClick={() => handleCellClick(comprobante)}
            >
              RECIBO {comprobante.numeroRecibo}
            </td>
          );
        }
        // 3d. Si no, mostramos "A PAGAR" (hacia adelante incluye hasta +18 meses)
        return (
          <td
            key={month}
            className={styles.noComprobante}
            onClick={handleTransferenciaClick}
          >
            A PAGAR {month}-{year}
          </td>
        );
      });

      rows.push(
        <tr key={year}>
          <td className={styles.yearCell}>{year}</td>
          {cells}
        </tr>
      );
    }
    return rows;
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.tableContainer}>
        <div className={styles.header}>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Cerrar Sesión
          </button>

          <div className={styles.containerTitle}>
            <h1 className={styles.title}>Historial de Comprobantes</h1>
            <h2 className={styles.name}>{user.nombreCompleto}</h2>
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Año</th>
              {meses.map((m, i) => <th key={i}>{m}</th>)}
            </tr>
          </thead>
          <tbody>{generateRows()}</tbody>
        </table>

        {selectedComprobante && (
          <div className={styles.comprobanteDetails}>
            <h3>Detalles del Recibo</h3>
            <p><strong>Numero de Recibo:</strong> {selectedComprobante.numeroRecibo}</p>
            <p><strong>Año:</strong> {selectedComprobante.año}</p>
            <p><strong>Mes:</strong> {selectedComprobante.mes}</p>
            <p><strong>Fecha de Pago:</strong> {new Date(selectedComprobante.fechaPago).toLocaleDateString()}</p>
            <p><strong>Monto:</strong> ${selectedComprobante.monto.toFixed(2)}</p>
          </div>
        )}

        {selectedTransferencia && (
          <div className={styles.transferenciaDetails}>
            <h3>Detalles de la Transferencia</h3>
            <p><strong>Precio de la Cuota:</strong> ${selectedTransferencia.precioCuota.toFixed(2)}</p>
            <p><strong>Tipo de Cuenta:</strong> {selectedTransferencia.tipo}</p>
            <p><strong>Número de Cuenta:</strong> {selectedTransferencia.nroCuenta}</p>
            <p><strong>Nombre Completo:</strong> {selectedTransferencia.nombreCompleto}</p>
            <p><strong>CUIT:</strong> {selectedTransferencia.cuit}</p>
            <p><strong>CBU:</strong> {selectedTransferencia.cbu}</p>
            <p><strong>Alias:</strong> {selectedTransferencia.alias}</p>
            <p><strong>Enviar comprobante a:</strong> {selectedTransferencia.telefonoContacto.join(' / ')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoUser;
