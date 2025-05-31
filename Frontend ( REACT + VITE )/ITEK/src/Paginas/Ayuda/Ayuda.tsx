import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Ayuda.css";

const Ayuda = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("Stored user from localStorage:", storedUser);

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserName(parsedUser.nombre);
      setIsAuthenticated(true);
    } else {
      setUserName(null);
      setIsAuthenticated(false);
    }

    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserName(parsedUser.nombre);
        setIsAuthenticated(true);
      } else {
        setUserName(null);
        setIsAuthenticated(false);
      }
    };

    window.addEventListener("storage", handleStorageChange); 
    return () => window.removeEventListener("storage", handleStorageChange); 
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    setUserName(null);
    setIsAuthenticated(false); 
    window.location.reload(); 
  };

    return(
    <div>
        <div className="header-ayuda">
        <div className="header-tools-ayuda">
        {isAuthenticated ? (
            <div className="user-info">
              <Link to="/Cuenta">
                <h4>{userName}</h4>
              </Link>
              
            </div>
          ) : (
            <Link to="/login">INICIAR SESIÓN</Link>
          )}
          <a href="/Ayuda">AYUDA</a>
          <a href="/Cesta">CESTA</a>
        </div>
       
        <div className="Titulo-ayuda">
        <Link to="/">I&TEK</Link>
        </div>
        
        </div>
        <p id="preguntas-ayuda">PREGUNTAS FRECUENTES</p>
        
        <div className="Consultas-container">
        <div className="consultas">CÓMO DEVOLVER</div>
        <div className="consultas">MI TICKET DE TIENDA</div>
        <div className="consultas">REEMBOLSO</div>
        <div className="consultas">DISPONIBILIDAD DE UN ARTICULO</div>
        <div className="consultas">ESTADO DE MI PEDIDO</div>
        </div>

        <p id="preguntas-ayuda">OTRAS PREGUNTAS RELEVANTES</p>
        <div className="Consultasvarias-container">
        <div className="consulta-item">CÓMO DEVOLVER</div>
        <div className="consulta-item">MI TICKET DE TIENDA</div>
        <div className="consulta-item">REEMBOLSO</div>
        <div className="consulta-item">DISPONIBILIDAD DE UN ARTICULO</div>
        <div className="consulta-item">ESTADO DE MI PEDIDO</div>
        <div className="consulta-item">REEMBOLSO</div>
        <div className="consulta-item">DISPONIBILIDAD DE UN ARTICULO</div>
        <div className="consulta-item">ESTADO DE MI PEDIDO</div>
      </div>
  </div>

    );
};


export default Ayuda; 


