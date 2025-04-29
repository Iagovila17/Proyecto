import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cuenta.css'; // Añadir la hoja de estilos personalizada

const Cuenta = () => {
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUserData(null);
    navigate('/');  // Redirige al inicio
  };

  return (
    <div className="cuenta-container">
    {userData ? (
      <div className="profile-card">
        <h2 className="profile-title">Mi Cuenta</h2>
        <div className="profile-info">
          <div className="profile-item">
            <strong>Nombre:</strong> {userData.nombre}
          </div>
          <div className="profile-item">
            <strong>Dirección:</strong> {userData.direccion || 'No disponible'}
          </div>
          <div className="profile-item">
            <strong>Email:</strong> {userData.email}
          </div>
          <div className="profile-item">
            <strong>Teléfono:</strong> {userData.telefono || 'No disponible'}
          </div>
          <div className="profile-item">
            <strong>Contraseña:</strong> **********
          </div>
        </div>
        <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
      </div>
    ) : (
      <p>Cargando...</p>
    )}
  </div>
  );
};

export default Cuenta;
