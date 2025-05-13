import { Link } from "react-router-dom";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer>
    <div className="linea"></div>
    <div className="footer-content">
      <div className="Pagina">
        <ul> 
          <li><Link to="/Inicio">INICIO</Link></li>
          <li><Link to="/Tienda">TIENDA</Link></li>
          <li><Link to="/Info">SOBRE I&TEK</Link></li>
          <li><Link to="/Contacto">CONTACTO Y ENVÍOS</Link></li>
        </ul>
      </div>
      <div className="Legal">
        <ul> 
          <li><Link to="/Inicio">BLOG</Link></li>
          <li><Link to="/Tienda">POLÍTICA DE PRIVACIDAD</Link></li>
          <li><Link to="/Info">CONFIGURACIÓN DE COOKIES</Link></li>
          <li><Link to="/Info">CONDICIONES DE COMPRA</Link></li>
        </ul>
      </div>
      <div className="Redes">
        <ul> 
          <li><a href="https://www.instagram.com/iagovila17/">INSTAGRAM</a></li>
          <li><Link to="https://x.com/byiago17">X</Link></li>
          <li><Link to="https://github.com/Iagovila17">GIT HUB</Link></li>
        </ul>
      </div>
    </div>
    </footer>
  );
};

export default Footer;


