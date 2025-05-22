import { Link } from "react-router-dom";
import "./Nav.css"; 

const Nav: React.FC = () => {
  return (
<nav className="menu-container">
  <ul className="menu">
    <li className="menu-item">
      <p id="nombre-menu-nav">HOMBRE</p>
      <ul className="dropdown">
        <li><Link to="/productos/hombre/todos">VER TODO</Link></li>
        <li className="oferta"><Link to="/productos/hombre/todos">OFERTAS</Link></li>
        <li><Link to="/productos/hombre/lino">LINO</Link></li>
        <li><Link to="/productos/hombre/polo">POLOS</Link></li>
        <li><Link to="/productos/hombre/camiseta">CAMISETAS</Link></li>
        <li><Link to="/productos/hombre/pantalon">PANTALONES</Link></li>
        <li><Link to="/productos/hombre/zapato">ZAPATOS</Link></li>
        <li><Link to="/productos/hombre/accesorio">ACCESORIOS</Link></li>
      </ul>
    </li>
    <li className="menu-item">
      <p id="nombre-menu-nav">MUJER</p>
      <ul className="dropdown">
        <li><Link to="/productos/mujer/todos">VER TODO</Link></li>
        <li className="oferta"><Link to="/productos/mujer/todos">OFERTAS</Link></li>
        <li><Link to="/productos/mujer/chaqueta">CHAQUETAS</Link></li>
        <li><Link to="/productos/mujer/blusa">BLUSAS</Link></li>
        <li><Link to="/productos/mujer/falda">FALDAS</Link></li>
        <li><Link to="/productos/mujer/vestido">VESTIDOS</Link></li>
        <li><Link to="/productos/mujer/zapato">ZAPATOS </Link></li>
        <li><Link to="/productos/mujer/accesorio">ACCESORIOS</Link></li>
      </ul>
    </li>
    <li className="menu-item">
  <p id="nombre-menu-nav">NIÑOS</p>
  <ul className="dropdown">
    <li><Link to="/productos/nino/nina">NIÑA</Link></li>
    <li><Link to="/productos/nino/nino">NIÑO</Link></li>
    <li><Link to="/productos/nino/bebe">BEBÉ</Link></li>
  </ul>
</li>

  </ul>
 </nav>
  );
};


export default Nav;