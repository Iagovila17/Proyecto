import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Importación de componentes públicos
import Header from "./component/Header/Header";
import HeaderPaginas from "./component/HeaderPaginas/HeaderPaginas";
import HeaderPaginasBasic from "./component/HeaderPaginasBasic/HeaderPaginasBasic";
import HeaderSearch from "./component/HeaderSearch/HeaderSearch";
import Footer from "./Footer/footer/Footer";
import Inicio from "./Paginas/Inicio/Inicio";
import ListaProductosPorCategoria from "./Product/ListarProductos/ListaProductosPorCategoria";
import ProductDetail from "./Product/ProductDetail/ProductDetail";
import Login from "./RegistroyLogin/Login/Login";
import Registro from "./RegistroyLogin/registro/registro";
import ConfirmEmail from "./RegistroyLogin/ConfirmarCuenta/ConfirmEmail";
import Ayuda from "./Paginas/Ayuda/Ayuda";
import Search from "./component/Search/Search";

// Importaciones de el Footer
import Bloq from "./Footer/Bloq/Bloq";
import CondicionesCompra from "./Footer/CondicioneCompra/CondicionesCompra";
import ConfiguracionCookies from "./Footer/ConfiguracionCookies/ConfiguracionCookies";
import ContactoEnvio from "./Footer/ContactoEnvio/ContactoEnvio";
import Itek from "./Footer/Itek/Itek";
import PoliticaPrivacidad from "./Footer/PoliticaPrivacidad/PoliticasPrivacidad";
import Tienda from "./Footer/Tienda/Tienda";


// Importación de componentes Protegidos
import Cuenta from "./Paginas/Cuenta/Cuenta";
import Cesta from "./Paginas/Cesta/Cesta";
import Favorito from "./Paginas/Favoritos/Favoritos";
import CestaEnvio  from "./Compra/CestaEnvio/CestaEnvio";
import Payment  from "./Compra/Payment/Payment";

// Importación de componentes de administración
import AdminDashboard from './ADMIN/admin/Dashboard/AdminDashboard';
import AdminUsuarios from './ADMIN/PAGINAS/Usuarios/Usuarios';
import AdminProductos from './ADMIN/PAGINAS/Productos/Productos';
import ListadoProductos from "./ADMIN/PAGINAS/Productos/ListaProductos/ListaProductos";
import Pedidos from './ADMIN/PAGINAS/Pedidos/Pedidos';
import Clientes from './ADMIN/PAGINAS/Clientes/Clientes';
import Estadistica from "./ADMIN/PAGINAS/Estadisticas/Estacistica";
import Promociones from "./ADMIN/PAGINAS/Promociones/Promociones";
import TerminosCondiciones from "./ADMIN/PAGINAS/TerminosCondiciones/TerminosCondiciones";
import Inventario from "./ADMIN/PAGINAS/Inventario/Inventario";
import Configuracion from "./ADMIN/PAGINAS/Configuracion/Configuracion";
import AdminNewProduct from './ADMIN/PAGINAS/Productos/AgregarProductos/AdminNewProduct';
import AdminUpdateProduct from './ADMIN/PAGINAS/Productos/EditarProductos/EditarProductos';


const App: React.FC = () => {

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
        <Route path="/confirmar-cuenta" element={<ConfirmEmail />} />
        <Route path="/ayuda" element={<><Ayuda /> <Footer /></>} />
        <Route path="/search" element={<><HeaderSearch /><Search /><Footer /></>} />
        <Route path="/productos/:categoria/:familia" element={<><HeaderPaginas /><ListaProductosPorCategoria /><Footer /></>} />
        <Route path="/:categoria/:familia/ProductDetail/:id" element={<><HeaderPaginas /> <ProductDetail /><Footer /></>} /> 

        {/* Ruta deL footer */}
        <Route path="/bloq" element={<><HeaderPaginasBasic /><Bloq /><Footer /></>} />
        <Route path="/condiciones-compra" element={<><HeaderPaginasBasic /><CondicionesCompra /><Footer /></>} />
        <Route path="/configuracion-cookies" element={<><HeaderPaginasBasic /><ConfiguracionCookies /><Footer /></>} />
        <Route path="/contacto-envio" element={<><HeaderPaginasBasic /><ContactoEnvio /><Footer /></>} />
        <Route path="/itek" element={<><HeaderPaginasBasic /><Itek /><Footer /></>} />
        <Route path="/politica-privacidad" element={<><HeaderPaginasBasic /><PoliticaPrivacidad /><Footer /></>} />
        <Route path="/tienda" element={<><HeaderPaginasBasic /><Tienda /><Footer /></>} />


        
        

        {/* Ruta de la cesta protegida */}
        <Route path="/cesta" element={<><HeaderPaginas /> <Cesta /> <Footer /></>} />
        <Route path="/CestaEnvio" element={<><HeaderPaginas /> <CestaEnvio /> <Footer /></>} />
        <Route path="/Payment" element={<><HeaderPaginas /> <Payment /> <Footer /></>} />
        <Route path="/cuenta" element={<><HeaderPaginas /> <Cuenta /> <Footer /></>} />
        <Route path="/favoritos" element={<><HeaderPaginas /> <Favorito productos={[]} /> <Footer /></>} />

        {/* Ruta protegida para usuarios autenticados */}

        
        {role === 'ADMIN' && (
          <>
            <Route path="/admin/dashboard" element={<><AdminDashboard /></>} />
            <Route path="/admin/usuarios" element={<><AdminUsuarios /></>} />
            <Route path="/admin/productos" element={<><AdminProductos /></>} />
            <Route path="/admin/productos/:categoria/:familia/listado" element={<ListadoProductos />} />
            <Route path="/admin/productos/:categoria/:subcategoria/editar/:id" element={<AdminUpdateProduct />} />
            <Route path="/admin/productos/:categoria/:familia/nuevo" element={<AdminNewProduct />} />
            <Route path="/admin/pedidos" element={<><Pedidos /></>} />
            <Route path="/admin/promociones" element={<><Promociones /></>} />
            <Route path="/admin/terminos-condiciones" element={<><TerminosCondiciones /></>} />
            <Route path="/admin/inventario" element={<><Inventario /></>} />
            <Route path="/admin/estadisticas" element={<><Estadistica /></>} />
            <Route path="/admin/configuracion" element={<><Configuracion /></>} />
            <Route path="/admin/clientes" element={<><Clientes /></>} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
