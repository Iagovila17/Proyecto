import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../component/Buscador/Buscador.css";
import Buscador from "../Buscador/Buscador";
import "./HeaderPaginas.css";

const Header = () => {
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

  return (
    <div className="header-paginas">
        <div className="header-tools-paginas">
        {/* Condicional para mostrar el nombre del usuario o el botón de iniciar sesión */}
        {isAuthenticated ? (
            <div className="nombre-cuenta">
              <Link to="/Cuenta">
                <h4>{userName}</h4>
              </Link>
              
            </div>
          ) : (
            <Link to="/login">INICIAR SESIÓN</Link>
          )}
          <Link to="/Ayuda">AYUDA</Link>
          <Link to="/Cesta">CESTA</Link>
        </div>
       
        <div className="Titulo-paginas">
        <Link to="/">I&TEK</Link>
        </div>
            <div id="buscador-paginas" title="Buscar">
              <Buscador />
            </div>
    </div>
  );
};

export default Header;