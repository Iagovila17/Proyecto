import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../../firebase-config";

import Buscador from "../Buscador/Buscador";
import "./HeaderPaginas.css";

const Header = () => {
  const [user, setUser] = useState<any>(null); // Asegúrate de definir correctamente el tipo del user

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); // Se actualiza el estado cuando el usuario cambia
    });

    return () => unsubscribe(); // Limpiar el listener al desmontar el componente
  }, []);


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