import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Si ya está autenticado, redirige a la página correcta
  const checkAuth = () => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    }
  };

  // Verifica si el usuario está autenticado al cargar el componente
  React.useEffect(() => {
    checkAuth();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
  
        // Guarda toda la información en un solo objeto en localStorage
        localStorage.setItem('user', JSON.stringify({
          nombre: data.nombre,
          email: data.email,  // Asegúrate de que el backend envíe el email
          telefono: data.telefono,  // Asegúrate de que el backend envíe el teléfono
          direccion: data.direccion,
          role: data.role,
          token: data.token,
          isAuthenticated: true,  // Marcamos que el usuario está autenticado
        }));
  
        // Redirigir según el rol
        if (data.role === 'ADMIN') {
          navigate('/admin/dashboard');  // Redirige a admin si es un administrador
        } else {
          navigate('/');  // Redirige a inicio si es un usuario común
        }
      } else {
        setError("Correo o contraseña incorrectos");
      }
    } catch (error) {
      console.error(error);
      setError("Error en la solicitud. Intenta nuevamente.");
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
