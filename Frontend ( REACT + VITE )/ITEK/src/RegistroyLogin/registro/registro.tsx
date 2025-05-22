  import { useState } from 'react';
  import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate

  import "./registro.css";

  const Registro = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [telefono, setTelefono] = useState('');
    const [nombre, setNombre] = useState('');  
    const [error, setError] = useState('');  
    const [isLoading] = useState(false);  

    const navigate = useNavigate(); 
    interface RegisterData {
      email: string;
      password: string;
      telefono?: string; 
      nombre: string;  
    }

    const handleRegister = async () => {
    try {
      const fechaRegistro = new Date().toISOString();
      const response = await fetch('http://192.168.68.100:8080/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, nombre, telefono, fechaRegistro }),
      });

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem('user', JSON.stringify({
          token: data.token,
          email: data.email,
          nombre: data.nombre
        }));

        navigate('/inicio');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error en el registro');
      }
    } catch (error) {
      console.error('Error de red:', error);
      setError('Error de red');
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
