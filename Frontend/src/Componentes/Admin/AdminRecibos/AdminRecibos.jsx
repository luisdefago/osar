import { useEffect, useState } from 'react';
import styles from './AdminRecibos.module.css';
import { format } from 'date-fns';
import { useCreateTicket } from '../../../hooks/useCreateTicket';
import { useUpdateTicket } from '../../../hooks/useUpdateTicket';
import { useStore } from '../../../store/store';
import { useNavigate, useParams } from 'react-router-dom';
import ComprobanteForm from './comprobanteForm/ComprobanteForm';
import ComprobanteTable from './comprobanteTable/ComprobanteTable';
import arrowIcon from '../../../assets/arrow.png';

const AdminRecibos = () => {
  const navigate = useNavigate();
  const { users } = useStore((state) => state);
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [selectedComprobante, setSelectedComprobante] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [comprobantesMap, setComprobantesMap] = useState({});
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

  const meses = ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  useEffect(() => {
    if (!users) {
      navigate('/Admin');
    }
    if (users && userId) {
      const findUser = users.find((u) => u.id === parseInt(userId, 10));
      setUser(findUser || null);
  
      if (findUser) {
        const initialComprobantesMap = findUser.comprobantes.reduce((map, comp) => {
          const { año, mes } = comp;
          if (!map[año]) map[año] = {};
          map[año][mes] = comp;
          return map;
        }, {});
        setComprobantesMap(initialComprobantesMap);
      }
    }
  }, [users, userId]);

  if (!user) {
    return <div>Cargando...</div>;
  }

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
      let updatedComprobante;
  
      if (selectedComprobante) {
        updatedComprobante = await updateTicket(selectedComprobante.id, newComprobante);
      } else {
        updatedComprobante = await createTicket(newComprobante);
      }

      const updatedUsers = users.map((u) => {
        if (u.id === user.id) {
          const updatedComprobantes = selectedComprobante
            ? u.comprobantes.map((comp) =>
                comp.id === updatedComprobante.id ? updatedComprobante : comp
              )
            : [...u.comprobantes, updatedComprobante];
  
          return { ...u, comprobantes: updatedComprobantes };
        }
        return u;
      });
  
      useStore.getState().setUsers(updatedUsers);

      const updatedUser = updatedUsers.find((u) => u.id === user.id);
      const updatedComprobantesMap = updatedUser.comprobantes.reduce((map, comp) => {
        const { año, mes } = comp;
        if (!map[año]) map[año] = {};
        map[año][mes] = comp;
        return map;
      }, {});
  
      setUser(updatedUser);
      setComprobantesMap(updatedComprobantesMap);
  
      setSelectedComprobante(null);
      setIsAdding(false);
    } catch (error) {
      console.error('Error saving comprobante:', error);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.tableContainer}>
        <div className={styles.header}>
          <button className={styles.backButton} onClick={() => navigate('/Admin')}>
            <img src={arrowIcon} alt="Volver" className={styles.arrowIcon} />
          </button>
          <h1 className={styles.title}>Gestión de Comprobantes</h1>
        </div>
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
