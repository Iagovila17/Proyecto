import { useState } from 'react';
import { Link } from 'react-router-dom';

import "./registro.css";

const baseUrl = import.meta.env.VITE_API_URL;

const Registro = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setError('');
    setMensaje('');
    setIsLoading(true);

    try {
      const fechaRegistro = new Date().toISOString();
      const response = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, nombre, telefono, fechaRegistro }),
      });

      if (response.ok) {
        setMensaje('Registro exitoso. Revisa tu correo para activar la cuenta.');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setTelefono('');
        setNombre('');
      } else {
        const errorData = await response.json();
        setError(errorData || 'Error en el registro');
      }
    } catch (error) {
      console.error('Error de red:', error);
      setError('Error de red, intenta más tarde.');
    } finally {
      setIsLoading(false);
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
          onChange={(e) => setNombre(e.target.value)}
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
        {error && <div className="error">{error}</div>}
        {mensaje && <div className="mensaje">{mensaje}</div>}

        <button
          id="Registrar"
          disabled={
            !email || !password || !confirmPassword || password !== confirmPassword || !nombre || isLoading
          }
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
