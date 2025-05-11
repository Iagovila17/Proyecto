
import "./PasoCompra.css"; // Asegúrate de tener este archivo .css en tu proyecto
const PasoCompra = () => {
    return (
      <div className="pasos-container">
        <div className="paso activo">
          <div className="circulo">1</div>
          <span>Carrito</span>
          <div className="linea"></div>
        </div>
        <div className="paso">
          <div className="circulo">2</div>
          <span>Envío</span>
          <div className="linea"></div>
        </div>
        <div className="paso">
          <div className="circulo">3</div>
          <span>Pago</span>
        </div>
      </div>
    );
  };
  
  export default PasoCompra;
  