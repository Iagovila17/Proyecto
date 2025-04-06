import {  useState, useEffect } from 'react';
import { auth } from '../../../firebase-config';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";


const Cuenta = () => {
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserData({
        email: currentUser.email,
        phone: 'Número de teléfono (si lo has guardado)', // Aquí puedes mostrar el teléfono si lo tienes almacenado en Firestore
      });
    } else {
      navigate('/login'); // Si no está logueado, redirige a login
    }
  }, [navigate]);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/inicio'); // Redirigir al inicio tras cerrar sesión
  };

  return (
    <div>
      <h1>
        <Link to="/">I&TEK</Link>
      </h1>
      {userData ? (
        <div>
          <p>Email: {userData.email}</p>
          <p>Teléfono: {userData.phone}</p>
          <button onClick={handleSignOut}>Cerrar sesión</button>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default Cuenta;
