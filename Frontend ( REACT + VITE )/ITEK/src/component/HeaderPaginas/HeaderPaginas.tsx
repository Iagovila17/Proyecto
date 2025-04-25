import { Link } from "react-router-dom";
import { useState } from "react";


import Buscador from "../Buscador/Buscador";
import "./HeaderPaginas.css";

const Header = () => {
  const [user] = useState<any>(null); 


  return (
    <div className="header-paginas">
        <div className="header-tools-paginas">
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
       
        <div className="Titulo-paginas">
        <Link to="/">I&TEK</Link>
        </div>
        <div className="buscador-paginas">
        <button title="Buscar"><Buscador /></button>
        </div>
    </div>
  );
};

export default Header;