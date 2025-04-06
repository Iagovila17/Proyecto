import { Link } from "react-router-dom";
import "./Ayuda.css";

const Ayuda: React.FC = () => {
    return(
    <div>
        <div className="header-ayuda">
        <div className="header-tools-ayuda">
          <a href="/Login">INICIAR SESIÓN</a>
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


