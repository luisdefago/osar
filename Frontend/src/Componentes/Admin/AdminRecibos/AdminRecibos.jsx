import { useEffect, useState } from 'react';
import styles from './AdminRecibos.module.css';
import { format } from 'date-fns';
import { useCreateTicket } from '../../../hooks/useCreateTicket';
import { useUpdateTicket } from '../../../hooks/useUpdateTicket';
import { useStore } from '../../../store/store';
import { useParams } from 'react-router-dom';

const AdminRecibos = () => {
  // Llamada a hooks en la parte superior
  const { users } = useStore((state) => state);
  const { userId } = useParams();
  
  // Inicialización de estados
  const [user, setUser] = useState(null);
  const [selectedComprobante, setSelectedComprobante] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newComprobante, setNewComprobante] = useState({
    numeroRecibo: '',
    mes: new Date().getMonth() + 1,
    año: new Date().getFullYear(),
    fechaPago: format(new Date(), 'yyyy-MM-dd'),
    monto: 0,
    usuarioId: user?.id || 0, // Asegúrate de que usuarioId esté correctamente inicializado
  });

  const { createTicket } = useCreateTicket();
  const { updateTicket } = useUpdateTicket();

  useEffect(() => {
    // Encuentra al usuario solo si users y userId están definidos
    if (users && userId) {
      const findUser = users.find((u) => u.id === parseInt(userId, 10));
      setUser(findUser || null);
    }
  }, [users, userId]);

  // Asegúrate de que user esté definido antes de usarlo
  if (!user) {
    return <div>Cargando...</div>;
  }

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
    setSelectedComprobante(prev => prev === comprobante ? null : comprobante);
  };

  const handleAddClick = (month, year) => {
    setIsAdding(true);
    setNewComprobante({
      numeroRecibo: '',
      mes: month,
      año: year,
      fechaPago: format(new Date(), 'yyyy-MM-dd'),
      monto: 0,
      usuarioId: user.id,
    });
  };

  const handleSave = async () => {
    try {
      if (selectedComprobante) {
        await updateTicket(selectedComprobante.id, newComprobante);
      } else {
        await createTicket(newComprobante);
      }
      setSelectedComprobante(null);
      setIsAdding(false);
    } catch (error) {
      console.error('Error saving comprobante:', error);
    }
  };

  const generateRows = () => {
    const rows = [];
    for (let year = yearInscripcion; year <= currentYear; year++) {
      const cells = meses.map((_, index) => {
        const monthNumber = index + 1;

        if (year === yearInscripcion && monthNumber < fechaInscripcion.getMonth() + 1) {
          return <td key={monthNumber}></td>;
        }

        if (year === currentYear && monthNumber > currentMonth) {
          return <td key={monthNumber}></td>;
        }

        const comprobante = comprobantesMap[year]?.[monthNumber];
        return (
          <td
            key={monthNumber}
            className={comprobante ? styles.comprobante : styles.noComprobante}
            onClick={() => comprobante && handleCellClick(comprobante)}
          >
            {comprobante ? `RECIBO ${comprobante.numeroRecibo}` : <button onClick={() => handleAddClick(monthNumber, year)}>Agregar</button>}
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
        <h1 className={styles.title}>Gestión de Comprobantes</h1>
        <h2 className={styles.name}>{user.nombreCompleto}</h2>
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
        {(selectedComprobante || isAdding) && (
          <div className={styles.comprobanteDetails}>
            <h3>{selectedComprobante ? 'Editar Recibo' : 'Agregar Recibo'}</h3>
            <form>
              <label>
                Numero de Recibo:
                <input
                  type="text"
                  value={newComprobante.numeroRecibo}
                  onChange={(e) => setNewComprobante({ ...newComprobante, numeroRecibo: e.target.value })}
                />
              </label>
              <label>
                Mes:
                <input
                  type="number"
                  value={newComprobante.mes}
                  onChange={(e) => setNewComprobante({ ...newComprobante, mes: parseInt(e.target.value, 10) })}
                />
              </label>
              <label>
                Año:
                <input
                  type="number"
                  value={newComprobante.año}
                  onChange={(e) => setNewComprobante({ ...newComprobante, año: parseInt(e.target.value, 10) })}
                />
              </label>
              <label>
                Fecha de Pago:
                <input
                  type="date"
                  value={newComprobante.fechaPago}
                  onChange={(e) => setNewComprobante({ ...newComprobante, fechaPago: e.target.value })}
                />
              </label>
              <label>
                Monto:
                <input
                  type="number"
                  value={newComprobante.monto}
                  onChange={(e) => setNewComprobante({ ...newComprobante, monto: parseFloat(e.target.value) })}
                />
              </label>
              <button type="button" onClick={handleSave}>
                {selectedComprobante ? 'Guardar Cambios' : 'Agregar Recibo'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRecibos;
