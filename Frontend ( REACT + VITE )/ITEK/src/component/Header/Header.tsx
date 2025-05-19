import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Buscador from "../Buscador/Buscador";
import Nav from "../Nav/Nav";
import "./Header.css";

const Header = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollY = 0;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserName(null);
    setIsAuthenticated(false);
    window.location.reload();
  };

  return (
    <header id="header-principal" className={!isVisible ? 'hidden' : ''}>
      <div className="logo-buscador">
        <h1 id="Marca-Incio">
          <Link to="/">I&TEK</Link>
        </h1>
        <div className="header-tools">
          <div className="header-tools-buscador">
            <div id="buscador-Inicial" title="Buscar">
              <Buscador />
            </div>
          </div>
            <div className="header-tools-links">
            {isAuthenticated ? (
              <div className="header-tools-links-user">
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
      </div>
      <nav>
        <Nav />
      </nav>
    </header>
  );
};

export default Header;