import { useState } from 'react';
import { Link } from 'react-router-dom';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  return (
    <div className="Regis-Login">
    <div className="formulario">
      <h1 id="loginform">
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
           

      <button id="botonGoogleRegistro" >
      <img src="/Imagenes/google.png" alt="Iniciar sesión con Google" />
      </button>

      <button id="Iniciarsesion"  disabled={!email || !password}>INICIAR SESIÓN</button>

      
      <Link to="/registro"><button id="Registrar" type="button">
          REGISTRAR</button></Link>
      
  </div>
  <img id="imagenlateral" src="/Imagenes/Sesion.png" alt=''></img>
  </div>
  );
};

export default Login;
