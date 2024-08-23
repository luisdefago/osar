import { useEffect, useState } from 'react';
import styles from './AdminRecibos.module.css';
import { format } from 'date-fns';
import { useCreateTicket } from '../../../hooks/useCreateTicket';
import { useUpdateTicket } from '../../../hooks/useUpdateTicket';
import { useStore } from '../../../store/store';
import { useParams } from 'react-router-dom';
import ComprobanteForm from './comprobanteForm/ComprobanteForm';
import ComprobanteTable from './comprobanteTable/ComprobanteTable';

const AdminRecibos = () => {
  const { users } = useStore((state) => state);
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [selectedComprobante, setSelectedComprobante] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newComprobante, setNewComprobante] = useState({
    numeroRecibo: '',
    mes: new Date().getMonth() + 1,
    año: new Date().getFullYear(),
    fechaPago: format(new Date(), 'yyyy-MM-dd'),
    monto: 0,
    usuarioId: user?.id || 0,
  });

  const { createTicket } = useCreateTicket();
  const { updateTicket } = useUpdateTicket();


  useEffect(() => {
    console.log(selectedComprobante);
  },[selectedComprobante])

  useEffect(() => {
    if (users && userId) {
      const findUser = users.find((u) => u.id === parseInt(userId, 10));
      setUser(findUser || null);
    }
  }, [users, userId]);

  if (!user) {
    return <div>Cargando...</div>;
  }

  const meses = ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const comprobantesMap = user.comprobantes.reduce((map, comp) => {
    const { año, mes } = comp;
    if (!map[año]) map[año] = {};
    map[año][mes] = comp;
    return map;
  }, {});

  const handleCellClick = (comprobante) => {
    if(comprobante){
      setNewComprobante({
        numeroRecibo: comprobante.numeroRecibo,
        mes: comprobante.mes,
        año: comprobante.año,
        fechaPago: format(comprobante.fechaPago, 'yyyy-MM-dd'),
        monto: comprobante.monto,
        usuarioId: user.id,
      });
    }
    if (selectedComprobante !== comprobante) {
      setSelectedComprobante(comprobante);
      setIsAdding(false);
    }
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
    setSelectedComprobante(null);
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

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.tableContainer}>
        <h1 className={styles.title}>Gestión de Comprobantes</h1>
        <h2 className={styles.name}>{user.nombreCompleto}</h2>
        <ComprobanteTable
          user={user}
          comprobantesMap={comprobantesMap}
          handleCellClick={handleCellClick}
          handleAddClick={handleAddClick}
          meses={meses}
          currentYear={currentYear}
          currentMonth={currentMonth}
        />
        {(selectedComprobante || isAdding) && (
          <ComprobanteForm
            newComprobante={newComprobante}
            setNewComprobante={setNewComprobante}
            handleSave={handleSave}
            selectedComprobante={selectedComprobante}
          />
        )}
      </div>
    </div>
  );
};

export default AdminRecibos;
