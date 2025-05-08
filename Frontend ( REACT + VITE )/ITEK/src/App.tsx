import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Importación de componentes públicos
import Header from "./component/Header/Header";
import HeaderPaginas from "./component/HeaderPaginas/HeaderPaginas";
import HeaderSearch from "./component/HeaderSearch/HeaderSearch";
import Footer from "./component/footer/Footer";
import Inicio from "./component/Pages/Inicio/Inicio";
import ListaProductosPorCategoria from "./component/Pages/ListarProductos/ListaProductosPorCategoria";
import ProductDetail from "./component/ProductDetail/ProductDetail";
import Login from "./component/Login/Login";
import Registro from "./component/registro/registro";
import Ayuda from "./component/Pages/Ayuda/Ayuda";
import Search from "./component/Search/Search";


// Importación de componentes Protegidos
import Cuenta from "./component/Pages/Cuenta/Cuenta";
import Cesta from "./component/Pages/Cesta/Cesta";
import CestaEnvio  from "./component/Pages/CestaEnvio/CestaEnvio";
import Payment  from "./component/Pages/Payment/Payment";

// Importación de componentes de administración
import AdminDashboard from './component/Pages/admin/Dashboard/AdminDashboard';
import AdminUsuarios from './component/Pages/admin/Usuarios/Usuarios';
import AdminProductos from './component/Pages/admin/Productos/Productos';
import AdminNewProduct from './component/Pages/admin/Productos/AgregarProductos/AdminNewProduct';

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
        {/* Ruta de la cesta pública */}
        <Route path="/" element={<Navigate to="/inicio" replace />} />
        <Route path="/inicio" element={<><Header /> <Inicio /><Footer /></>} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/ayuda" element={<><Ayuda /> <Footer /></>} />
        <Route path="/search" element={<><HeaderSearch /><Search /><Footer /></>} />
        <Route path="/productos/:categoria/:familia" element={<><HeaderPaginas /><ListaProductosPorCategoria /><Footer /></>} />
        <Route path="/:categoria/:familia/ProductDetail/:id" element={<><HeaderPaginas /> <ProductDetail /><Footer /></>} /> {/* Detalle del producto */}
        
        

        {/* Ruta de la cesta protegida */}
        <Route path="/cesta" element={<><HeaderPaginas /> <Cesta /> <Footer /></>} />
        <Route path="/CestaEnvio" element={<><HeaderPaginas /> <CestaEnvio /> <Footer /></>} />
        <Route path="/Payment" element={<><HeaderPaginas /> <Payment /> <Footer /></>} />
        <Route path="/cuenta" element={<><HeaderPaginas /> <Cuenta /> <Footer /></>} />

        
        {role === 'ADMIN' && (
          <>
            <Route path="/admin/dashboard" element={<><AdminDashboard /></>} />
            <Route path="/admin/usuarios" element={<><AdminUsuarios /></>} /> {/* Asegúrate de tener este componente */}
            <Route path="/admin/productos" element={<><AdminProductos /></>} />
            <Route path="/admin/productos/:categoria/:familia/nuevo" element={<AdminNewProduct />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
