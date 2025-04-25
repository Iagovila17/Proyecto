import {  useState } from 'react';
import { Link } from 'react-router-dom';



const Cuenta = () => {
  const [userData] = useState<any>(null);


  return (
    <div>
      <h1>
        <Link to="/">I&TEK</Link>
      </h1>
      {userData ? (
        <div>
          <p>Email: {userData.email}</p>
          <p>Teléfono: {userData.phone}</p>
          <button >Cerrar sesión</button>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default Cuenta;
