import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './sidebar.css'; // Asegúrate de que la ruta sea correcta

const Sidebar = () => {
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData(parsedUser);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        setUserData(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUserData(null);
    navigate('/'); // Redirige al inicio
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">
          <h2><a href="/admin/dashboard">I&TEK</a></h2>
        </div>
        {userData && userData.nombre && (
          <div className="user-info-centered">
            {userData.nombre}
          </div>
        )}
        <ul className="categories">
          <li><a href="/admin/usuarios">Usuarios</a></li>
          <li><a href="/admin/productos">Productos</a></li>
          <li><a href="/admin/pedidos">Pedidos</a></li>
          <li><a href="/admin/clientes">Clientes</a></li>
          <li><a href="/admin/inventario">Inventario</a></li>
          <li><a href="/admin/promociones">Promociones</a></li>
          <li><a href="/admin/configuracion">Configuración</a></li>
          <li><a href="/admin/estadisticas">Estadísticas</a></li>
          <li><a href="/admin/terminos">Términos y Condiciones</a></li>
          <li className="logout-item">
            <button className="logout-button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;