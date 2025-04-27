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
import Product from "./component/Product/Product";
import ProductDetail from "./component/ProductDetail/ProductDetail";
import AdminDashboard from './component/Pages/admin/Dashboard/AdminDashboard';

interface Product {
  id: number;
  name: string;
  price: number;
  image1?: string;
}

const App: React.FC = () => {
  const savedCart = localStorage.getItem("cart");
  const initialCart = savedCart ? JSON.parse(savedCart) : [];
  const [cart, setCart] = useState<Product[]>(initialCart);

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

  const removeFromCart = (id: number) => {
    setCart(cart.filter(product => product.id !== id));
  };

  // Ruta protegida (si no está autenticado, redirige a login)
  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

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
        <Route path="/cuenta" element={<Cuenta />} />

        {/* Ruta de la cesta protegida */}
        <Route path="/cesta" element={<><HeaderPaginas /> <Cesta /> <Footer /></>} />

        
        {/* Ruta para admin */}
        {role === 'ADMIN' && (
          <Route path="/admin/dashboard" element={<><AdminDashboard /></>} />
        )}

        {/* Rutas de productos */}
        <Route path="/product/:id" element={<><HeaderPaginas /> <ProductDetail /> <Footer /></>} />
        <Route path="/products" element={<><HeaderPaginas /><Product /><Footer /></>} />
      </Routes>
    </Router>
  );
};

export default App;
