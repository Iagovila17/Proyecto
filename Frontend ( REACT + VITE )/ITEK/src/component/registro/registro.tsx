import { useState } from 'react';
import { auth } from '../../firebase-config';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import "./registro.css"

const Registro = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setErrorMessage(null); // Limpiar errores previos
    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }

    try {
      // Crea el usuario con email y contraseña
      await createUserWithEmailAndPassword(auth, email, password);
      // Puedes almacenar el número de teléfono en Firestore si lo deseas
      console.log('Usuario registrado exitosamente');
      setSuccessMessage('Registro exitoso');
      // Guardar el número de teléfono en Firestore si es necesario
      // await savePhoneNumber(userCredential.user.uid, phone);
      navigate('/inicio'); // Redirigir tras el registro exitoso
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(getCustomErrorMessage(error.message));
      } else {
        setErrorMessage('Ocurrió un error desconocido');
      }
    }
  };

  const getCustomErrorMessage = (firebaseError: string): string => {
    if (firebaseError.includes('auth/email-already-in-use')) {
      return 'Este correo ya está registrado.';
    }
    if (firebaseError.includes('auth/weak-password')) {
      return 'La contraseña es demasiado débil. Usa al menos 6 caracteres.';
    }
    if (firebaseError.includes('auth/invalid-email')) {
      return 'El formato del correo es inválido.';
    }
    return 'Ocurrió un error inesperado. Inténtalo más tarde.';
  };

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
      {errorMessage && <p style={{ color: 'red', fontWeight: 'bold' }}>{errorMessage}</p>}

      
      <button id="Registrar" onClick={handleRegister} disabled={!email || !password || !confirmPassword}>REGISTRARSE</button>
      
      <Link to="/Login"><button id="Iniciarsesion" type="button">
          INICIAR SESSIÓN</button></Link>
    </div>
      <img id="imagenlateral" src="/Imagenes/registro.png" alt='imagen de la session'></img>
    </div>
  );
};
export default Registro;