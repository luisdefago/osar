import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Componentes/Login/Login';
import Infouser from './Componentes/Infouser/Infouser';
import Admindashboard from './Componentes/Admin/Admindashboard/Admindashboard';
import Agregaruser from './Componentes/Admin/Agregaruser/Agregaruser';
import Editaruser from './Componentes/Admin/Editaruser/Editaruser';
import AdminRecibos from './Componentes/Admin/AdminRecibos/AdminRecibos';
import EditUser from './Componentes/Admin/Editaruser/Editaruser';
import EditDatosTransferencia from './Componentes/Admin/DatosTransferencia/DatosTransferencia';
import { useStore } from './store/store';

function App() {
  const {user} = useStore();

  return (
    <Routes>
      <Route path="/" element={user ? <Infouser /> : <Navigate to="/login" />} />
      <Route path="/Info-user" element={user ? <Infouser /> : <Navigate to="/login" />} />
      <Route path="/Admin" element={<Admindashboard /> } />
      <Route path="/Agregar-usuario" element={user ? <Agregaruser /> : <Navigate to="/Admin" />} />
      <Route path="/Datos-usuario" element={user ? <Editaruser /> : <Navigate to="/Admin" />} />
      <Route path="/admin/recibos/:userId" element={user ? <AdminRecibos /> : <Navigate to="/Admin" />} />
      <Route path="/admin/editar/:id" element={user ? <EditUser /> : <Navigate to="/Admin" />} />
      <Route path="/admin/datosTransferencia/:id" element={user ? <EditDatosTransferencia /> : <Navigate to="/Admin" />} />
      
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
