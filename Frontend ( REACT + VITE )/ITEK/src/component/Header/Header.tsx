import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Buscador from "../Buscador/Buscador";
import Nav from "../Nav/Nav";
import "./Header.css";

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
    <header id="header-principal">
      <div className="logo-buscador">
        <h1 id="Marca-Incio">
          <a href="/">I&TEK</a>
        </h1>
        <div className="header-tools">
          <div className="header-tools-buscador">
            <button id="buscador-Inicial" title="Buscar">
              <Buscador />
            </button>
          </div>

          {isAuthenticated ? (
            <div>
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
      </div>
      <nav>
        <Nav />
      </nav>
    </header>
  );
};

export default Header;
