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
  const yearInscripcion = fechaInscripcion.getFullYear();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const meses = ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

  const comprobantesMap = user.comprobantes.reduce((map, comp) => {
    const { año, mes } = comp;
    if (!map[año]) {
      map[año] = {};
    }
    map[año][mes] = comp;
    return map;
  }, {});

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

  const generateRows = () => {
    const rows = [];
    for (let year = yearInscripcion; year <= currentYear; year++) {
      const cells = meses.map((_, index) => {
        const monthNumber = index + 1;

        if (year === yearInscripcion && monthNumber < fechaInscripcion.getMonth() + 1) {
          return <td key={index}></td>;
        }

        if (year === currentYear && monthNumber > currentMonth) {
          return <td key={index}></td>;
        }

        const comprobante = comprobantesMap[year]?.[monthNumber];
        return (
          <td
            key={index}
            className={comprobante ? styles.comprobante : styles.noComprobante}
            onClick={() => comprobante ? handleCellClick(comprobante) : handleTransferenciaClick()} // Lógica para transferencia
          >
            {comprobante ? `RECIBO ${comprobante.numeroRecibo}` : `A PAGAR ${monthNumber}-${year}`}
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
              {meses.map((mes, index) => (
                <th key={index}>{mes}</th>
              ))}
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
