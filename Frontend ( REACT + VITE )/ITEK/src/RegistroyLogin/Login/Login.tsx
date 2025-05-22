import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
const handleLogin = async () => {
  console.log("Login → Email:", email);
  console.log("Login → Password:", password);
  try {
    const response = await fetch('http://192.168.68.100:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('user', JSON.stringify({
        nombre: data.nombre,
        email: data.email,  
        telefono: data.telefono,  
        direccion: data.direccion,
        role: data.role,
        token: data.token,
        isAuthenticated: true, 
      }));

      localStorage.setItem('role', data.role); 

      localStorage.setItem('isAuthenticated', 'true');  
      if (data.role === 'ADMIN') {
        navigate('/admin/dashboard'); 
      } else {
        navigate('/');  
      }
    } else {
      setError("Correo o contraseña incorrectos");
    }
  } catch (error) {
    console.error(error);
  }
};

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
        
        {error && <div style={{ color: 'red' }}>{error}</div>}

        <button 
          id="Iniciarsesion" 
          disabled={!email || !password} 
          onClick={handleLogin}
        >
          INICIAR SESIÓN
        </button>

        <Link to="/registro">
          <button id="Registrar" type="button">
            REGISTRAR
          </button>
        </Link>
      </div>
      <img 
        id="imagenlateral" 
        src="/Imagenes/Sesion.png" 
        alt="Imagen lateral" 
      />
    </div>
  );
};
export default Login;
