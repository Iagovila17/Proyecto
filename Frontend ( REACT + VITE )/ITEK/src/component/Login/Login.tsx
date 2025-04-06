import { useState } from 'react';
import { auth } from '../../firebase-config';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();


  const handleLogin = async () => {
    setErrorMessage(null); // Reseteamos el mensaje de error
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Usuario logueado exitosamente');
      navigate('/inicio');
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(getCustomErrorMessage(error.message));
      } else {
        setErrorMessage('Ocurrió un error desconocido');
      }
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage(null);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Usuario logueado con Google:', result.user);
      navigate('/inicio');
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(getCustomErrorMessage(error.message));
      } else {
        setErrorMessage('Ocurrió un error desconocido');
      }
    }
  };


  const getCustomErrorMessage = (firebaseError: string): string => {
    if (firebaseError.includes('auth/user-not-found')) {
      return 'El correo no está registrado. Verifica o regístrate.';
    }
    if (firebaseError.includes('auth/wrong-password')) {
      return 'Contraseña incorrecta. Inténtalo de nuevo.';
    }
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
            {errorMessage && <p>{errorMessage}</p>}

      <button id="botonGoogleRegistro" onClick={handleGoogleLogin}>
      <img src="/Imagenes/google.png" alt="Iniciar sesión con Google" />
      </button>

      <button id="Iniciarsesion" onClick={handleLogin} disabled={!email || !password}>INICIAR SESIÓN</button>

      
      <Link to="/registro"><button id="Registrar" type="button">
          REGISTRAR</button></Link>
      
  </div>
  <img id="imagenlateral" src="/Imagenes/Sesion.png" alt=''></img>
  </div>
  );
};

export default Login;
