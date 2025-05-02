import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate

import "./registro.css";

const Registro = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [nombre, setNombre] = useState('');  // Estado para el nombre
  const [error, setError] = useState('');  // Para manejar errores
  const [isLoading] = useState(false);  // Para manejar el estado de carga

  const navigate = useNavigate(); // Instancia de useNavigate

  // Función para registrar al usuario
  interface RegisterData {
    email: string;
    password: string;
    telefono?: string; // Update to match the property name used in the object
    nombre: string;  // Añadir nombre al tipo de datos
  }

  const handleRegister = async () => {
    try {
      const response = await fetch('http://192.168.68.100:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          nombre,
          telefono
        }),
      });
  
      if (response.ok) {
        // Registro exitoso: ahora hacemos login automático
        const loginResponse = await fetch('http://localhost:8080/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password
          }),
        });
  
        if (loginResponse.ok) {
          const data = await loginResponse.json();
          localStorage.setItem('user', JSON.stringify({
            nombre: data.nombre,
            token: data.token,
          }));
          navigate('/');
        } else {
          setError("Error al iniciar sesión después del registro");
        }
  
      } else {
        const text = await response.text();
        setError(text);
      }
    } catch (error) {
      console.error(error);
      setError("Error del servidor");
    }
  };


  return (
    <div className="Regis-Login">
      <div className="formulario">
        <h1>
          <Link to="/">I&TEK</Link>
        </h1>

        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}  // Agregar el cambio del nombre
          placeholder="Nombre completo"
        />
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
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="Número de Teléfono (opcional)"
        />

        {/* Mostrar el error si hay uno */}
        {error && <div className="error">{error}</div>}

        <button 
          id="Registrar" 
          disabled={!email || !password || !confirmPassword || password !== confirmPassword || !nombre || isLoading}
          onClick={handleRegister}
        >
          {isLoading ? 'Registrando...' : 'REGISTRARSE'}
        </button>

        <Link to="/Login">
          <button id="Iniciarsesion" type="button">
            INICIAR SESIÓN
          </button>
        </Link>
      </div>
      <img id="imagenlateral" src="/Imagenes/registro.png" alt="Imagen de la sesión" />
    </div>
  );
};

export default Registro;
