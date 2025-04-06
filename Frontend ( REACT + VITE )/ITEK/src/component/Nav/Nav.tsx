import { Link } from "react-router-dom";
import "./Nav.css"; 

const Nav: React.FC = () => {
  return (
    <nav className="menu-container">
      <ul className="menu">
        <li className="menu-item">
          <p id="nombre-menu-nav">HOMBRE</p>
          <ul className="dropdown">
            <li><Link to="/Hombre">VER TODO</Link></li>
            <li><Link to="/Hombre">SUDADERAS</Link></li>
            <li><Link to="/Hombre">POLOS</Link></li>
            <li><Link to="/Hombre">CAMISETAS</Link></li>
            <li><Link to="/Hombre">CAMISAS</Link></li>
            <li><Link to="/Hombre">JEANS</Link></li>
            <li><Link to="/Hombre">ROPA INTERIOR</Link></li>
            <li><Link to="/Hombre">ZAPATOS</Link></li>
            <li><Link to="/Hombre">ACCESORIOS</Link></li>
          </ul>
        </li>
        <li className="menu-item">
        <p id="nombre-menu-nav">MUJER</p>
          <ul className="dropdown">
            <li><Link to="/Mujer">VER TODO</Link></li>
            <li><Link to="/Mujer">CHAQUETAS</Link></li>
            <li><Link to="/Mujer">SUDADERAS</Link></li>
            <li><Link to="/Mujer">VESTIDOS</Link></li>
            <li><Link to="/Mujer">SUDADERAS</Link></li>
            <li><Link to="/Mujer">PIJAMAS</Link></li>
            <li><Link to="/Mujer">BOLSOS</Link></li>
            <li><Link to="/Mujer">ZAPATOS</Link></li>
            <li><Link to="/Mujer">ACCESORIOS</Link></li>

          </ul>
        </li>
        <li className="menu-item">
        <p id="nombre-menu-nav">NIÑOS</p>
          <ul className="dropdown">
            <li><Link to="/Niño">VER TODO</Link></li>
            <li><Link to="/Niño">NIÑA</Link></li>
            <ul className="subfamilia">1½ - 6 AÑOS</ul>
            <ul className="subfamilia">6 - 14 AÑOS</ul>
            <li><Link to="/Niño">NIÑO</Link></li>
            <ul className="subfamilia">1½ - 6 AÑOS</ul>
            <ul className="subfamilia">6 - 14 AÑOS</ul>
            <li><Link to="/Niño">BEBÉ</Link></li>
            <ul className="subfamilia">0 - 8 MESES</ul>
            <ul className="subfamilia">8 - 15 MESES</ul>
          </ul>
        </li>
        <li className="menu-item">
        <p id="nombre-menu-nav">HOME</p>
          <ul className="dropdown">
            <li><Link to="/Home">VER TODO</Link></li>
            <li><Link to="/Home">DORMITORIO</Link></li>
            <li><Link to="/Home">SALÓN</Link></li>
            <li><Link to="/Home">COMEDOR</Link></li>
            <li><Link to="/Home">COCINA</Link></li>
            <li><Link to="/Home">BAÑO</Link></li>
            <li><Link to="/Home">RECIBIDOR</Link></li>
            <li><Link to="/Home">FRANGANCIA</Link></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};


export default Nav;