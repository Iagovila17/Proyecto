import { Link } from "react-router-dom";
import { useState } from "react";

import Buscador from "../Buscador/Buscador";
import Nav from "../Nav/Nav";
import "./Header.css";

const Header = () => {
  const [user] = useState<any>(null); // Asegúrate de definir correctamente el tipo del user
 
  

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
