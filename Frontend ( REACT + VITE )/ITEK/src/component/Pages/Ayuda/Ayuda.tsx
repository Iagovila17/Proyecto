import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Ayuda.css";

const Ayuda = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Recuperamos el usuario desde el localStorage
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

    // Escuchar cambios en el localStorage para actualizar el estado
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

    window.addEventListener("storage", handleStorageChange); // Escuchar cambios en el localStorage
    return () => window.removeEventListener("storage", handleStorageChange); // Limpiar el listener al desmontar el componente
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("user"); // Eliminar el usuario del localStorage
    setUserName(null);
    setIsAuthenticated(false); // Establecer como no autenticado
    window.location.reload(); // Forzar la recarga de la página
  };

    return(
    <div>
        <div className="header-ayuda">
        <div className="header-tools-ayuda">
        {isAuthenticated ? (
            <div>
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


