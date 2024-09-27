import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './InfoUserMobile.module.css';

const InfoUserMobile = ({ user, setUser, datosTransferencia }) => {
    const [selectedComprobante, setSelectedComprobante] = useState(null);
    const [selectedTransferencia, setSelectedTransferencia] = useState(null);
    const [showOwedMonths, setShowOwedMonths] = useState(false);
    const navigate = useNavigate();

    const meses = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
    ];

    useEffect(() => {
        if (!user) {
        navigate('/');
        }
    }, [user, navigate]);

    if (!user) {
        return null;
    }

    const handleLogout = () => {
        localStorage.removeItem('loggedUser');
        setUser(null);
        navigate('/');
    };

    const handleComprobanteClick = (comprobante) => {
        setSelectedComprobante(comprobante === selectedComprobante ? null : comprobante);
        setSelectedTransferencia(null);
        setShowOwedMonths(false);
    };

    const handleTransferenciaClick = () => {
        setSelectedTransferencia(datosTransferencia[0]);
        setSelectedComprobante(null);
        setShowOwedMonths(false);
    };

    const toggleOwedMonths = () => {
        setShowOwedMonths(!showOwedMonths);
        setSelectedComprobante(null);
        setSelectedTransferencia(null);
    };

    const getOwedMonths = () => {
        const startDate = new Date(user.fechaInscripcion);
        const currentDate = new Date();
        const owedMonths = [];
        const paidMonths = user.comprobantes.map(c => `${c.mes}-${c.año}`);

        for (let d = new Date(startDate); d <= currentDate; d.setMonth(d.getMonth() + 1)) {
        const monthYear = `${d.getMonth() + 1}-${d.getFullYear()}`;
        if (!paidMonths.includes(monthYear)) {
            owedMonths.push({ mes: d.getMonth() + 1, año: d.getFullYear() });
        }
        }

        return owedMonths;
    };

    return (
        <div className={styles.container}>
        <div className={styles.header}>
            <h1 className={styles.title}>Historial de Comprobantes</h1>
            <h2 className={styles.name}>{user.nombreCompleto}</h2>
            <button className={styles.logoutButton} onClick={handleLogout}>
            Cerrar Sesión
            </button>
        </div>

        <button className={styles.toggleButton} onClick={toggleOwedMonths}>
            {showOwedMonths ? 'Ocultar meses adeudados' : 'Ver meses adeudados'}
        </button>

        {showOwedMonths ? (
            <div className={styles.comprobantesList}>
            {getOwedMonths().map((month, index) => (
                <div
                key={index}
                className={styles.comprobanteItemDeuda}
                onClick={handleTransferenciaClick}
                >
                <span>{`Adeuda: ${meses[month.mes-1]}/${month.año}`}</span>
                </div>
            ))}
            </div>
        ) : (
            <div className={styles.comprobantesList}>
            {user.comprobantes.map((comprobante, index) => (
                <div
                key={index}
                className={styles.comprobanteItem}
                onClick={() => handleComprobanteClick(comprobante)}
                >
                <span>Recibo {comprobante.numeroRecibo}</span>
                <span>{`${meses[comprobante.mes-1]}/${comprobante.año}`}</span>
                </div>
            ))}
            <div className={styles.comprobanteItem} onClick={handleTransferenciaClick}>
                <span>Ver datos de transferencia</span>
            </div>
            </div>
        )}

        {selectedComprobante && (
            <div className={styles.detailsCard}>
            <h3>Detalles del Recibo</h3>
            <p><strong>Numero de Recibo:</strong> {selectedComprobante.numeroRecibo}</p>
            <p><strong>Año:</strong> {selectedComprobante.año}</p>
            <p><strong>Mes:</strong> {selectedComprobante.mes}</p>
            <p><strong>Fecha de Pago:</strong> {new Date(selectedComprobante.fechaPago).toLocaleDateString()}</p>
            <p><strong>Monto:</strong> ${selectedComprobante.monto.toFixed(2)}</p>
            </div>
        )}

        {selectedTransferencia && (
            <div className={styles.detailsCard}>
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
    );
};

export default InfoUserMobile;