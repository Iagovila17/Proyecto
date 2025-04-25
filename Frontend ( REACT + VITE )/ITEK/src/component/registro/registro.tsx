import { useState } from 'react';
import { Link } from 'react-router-dom';

import "./registro.css"

const Registro = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');


  return (
    <div className="Regis-Login">
      <div className="formulario">
      <h1>
        <Link to="/">I&TEK</Link>
      </h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Correo electrónico"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Repite la Contraseña"
      />
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Número de Teléfono (opcional)"
      />
      
      <button id="Registrar" disabled={!email || !password || !confirmPassword}>REGISTRARSE</button>
      
      <Link to="/Login"><button id="Iniciarsesion" type="button">
          INICIAR SESSIÓN</button></Link>
    </div>
      <img id="imagenlateral" src="/Imagenes/registro.png" alt='imagen de la session'></img>
    </div>
  );
};
export default Registro;