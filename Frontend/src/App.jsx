import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './Componentes/Login/Login'
import Infouser from './Componentes/Infouser/Infouser';
import Admindashboard from './Componentes/Admin/Admindashboard/Admindashboard';
import Agregaruser from './Componentes/Admin/Agregaruser/Agregaruser';
import Editaruser from './Componentes/Admin/Editaruser/Editaruser';
import AdminRecibos from './Componentes/Admin/AdminRecibos/AdminRecibos';
import EditUser from './Componentes/Admin/Editaruser/Editaruser';

function App() {
  return (
    <Routes>
            <Route path="/" exact>
                <Route path="/" element={<Login/>}/>
                <Route path="/Info-user" element={<Infouser/>}/>
                <Route path="/Admin" element={<Admindashboard/>}/>
                <Route path="/Agregar-usuario" element={<Agregaruser/>}/>
                <Route path="/Datos-usuario" element={<Editaruser/>}/>
                <Route path="/admin/recibos/:userId" element={<AdminRecibos />} />
                <Route path="/admin/editar/:id" element={<EditUser />} />
            </Route>
    </Routes>
  )
}

export default App
