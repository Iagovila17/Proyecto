import { Link, useLocation } from "react-router-dom";
import "./Navsecundario.css";



const Navsecundario: React.FC = () => {
  const location = useLocation();
  const pathParts = location.pathname.split("/");

  const categoriaActual = pathParts[2]?.toLowerCase();
  const familiaActual = pathParts[3]?.toLowerCase(); // Añadido
 

  return (
    <nav className="menu-familia">
      <ul className="menu-personalizado">

        {categoriaActual === "hombre" && (
          <div className="zona-familias">
            {["todos", "lino", "polo", "camiseta", "pantalon", "zapato", "accesorio"].map((familia) => (
              <li
                key={familia}
                className={`lista-familias ${familiaActual === familia ? "activa" : ""}`}
              >
                <Link to={`/productos/hombre/${familia}`}>{familia.toUpperCase()}</Link>
              </li>
            ))}
          </div>
        )}

        {categoriaActual === "mujer" && (
          <div className="zona-familias">
            {["todos", "chaqueta", "blusa", "falda", "vestido", "zapato", "accesorio"].map((familia) => (
              <li
                key={familia}
                className={`lista-familias ${familiaActual === familia ? "activa" : ""}`}
              >
                <Link to={`/productos/mujer/${familia}`}>{familia.toUpperCase()}</Link>
              </li>
            ))}
          </div>
        )}
        {categoriaActual === "nino" && (
          <div className="zona-familias">
            {["nina", "nino", "bebe"].map((familia) => (
            <li
                key={familia}
                className={`lista-familias ${familiaActual === familia ? "activa" : ""}`}
              >
            <Link to={`/productos/nino/${familia}`}>{familia.toUpperCase()}</Link>
      </li>
    ))}
  </div>
)}
  
      </ul> 
    </nav>
  );
};

export default Navsecundario;
