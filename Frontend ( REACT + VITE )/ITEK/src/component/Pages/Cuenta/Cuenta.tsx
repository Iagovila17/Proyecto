import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    <div>
      <h1>
        <Link to="/">I&TEK</Link>
      </h1>
      {userData ? (
        <div>
          <p>Bienvenido, {userData.nombre}</p>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};


export default Cuenta;
