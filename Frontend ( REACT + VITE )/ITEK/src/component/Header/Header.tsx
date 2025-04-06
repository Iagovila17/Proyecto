import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../../firebase-config";

import Buscador from "../Buscador/Buscador";
import Nav from "../Nav/Nav";
import "./Header.css";

const Header = () => {
  const [user, setUser] = useState<any>(null); // Asegúrate de definir correctamente el tipo del user
 
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); // Se actualiza el estado cuando el usuario cambia
    });

    return () => unsubscribe(); // Limpiar el listener al desmontar el componente
  }, []);


  return (
    <header id="header-principal">
      <div className="logo-buscador">
      
        
        <h1 id="Marca-Incio">
          <a href="/">I&TEK</a>
        </h1>
        <div className="header-tools">
          <div className="header-tools-buscador">
            <button id="buscador-Inicial" title="Buscar"><Buscador /></button>
          </div>
          
          {/* Mostrar enlaces dependiendo del estado de autenticación */}
          {user ? (
            <>
                <Link to="/Cuenta">MI CUENTA</Link>
            </>
          ) : (
            <Link to="/login">INICIAR SESIÓN</Link>
          )}
          
          <Link to="/Ayuda">AYUDA</Link>
          <Link to="/Cesta">CESTA</Link>
        </div>
        
      </div>
      <nav>
        <Nav />
      </nav>
    </header>
  );
};

export default Header;
