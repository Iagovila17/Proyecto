import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./component/Header/Header";
import HeaderPaginas from "./component/HeaderPaginas/HeaderPaginas";
import Footer from "./component/footer/Footer";
import Inicio from "./component/Pages/Inicio/Inicio";
import Hombre from "./component/Pages/RopaHombre/RopaHombre";
import Mujer from "./component/Pages/RopaMujer/RopaMujer";
import Niño from "./component/Pages/RopaNiños/RopaNiños";
import Login from "./component/Login/Login";
import Registro from "./component/registro/registro";
import Ayuda from "./component/Pages/Ayuda/Ayuda";
import Cuenta from "./component/Pages/Cuenta/Cuenta";
import Cesta from "./component/Pages/Cesta/Cesta";


import AdminDashboard from './component/Pages/admin/Dashboard/AdminDashboard';
import AdminUsuarios from './component/Pages/admin/Usuarios/Usuarios';

const App: React.FC = () => {

  // Estado de autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    const userRole = localStorage.getItem("role");
    if (authStatus === 'true' && userRole) {
      setIsAuthenticated(true);
      setRole(userRole);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/inicio" replace />} />
        <Route path="/inicio" element={<><Header /> <Inicio /><Footer /></>} />
        <Route path="/hombre" element={<><HeaderPaginas /> <Hombre /> <Footer /></>} />
        <Route path="/mujer" element={<><HeaderPaginas /> <Mujer /> <Footer /></>} />
        <Route path="/niño" element={<><HeaderPaginas /> <Niño /> <Footer /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/ayuda" element={<><Ayuda /> <Footer /></>} />
        <Route path="/cuenta" element={<><HeaderPaginas /> <Cuenta /> <Footer /></>} />

        {/* Ruta de la cesta protegida */}
        <Route path="/cesta" element={<><HeaderPaginas /> <Cesta /> <Footer /></>} />

        
        {role === 'ADMIN' && (
          <>
            <Route path="/admin/dashboard" element={<><AdminDashboard /></>} />
            <Route path="/admin/usuarios" element={<><AdminUsuarios /></>} /> {/* Asegúrate de tener este componente */}
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
