import { motion } from "framer-motion";
import "./EnviosPanel.css";

interface EnviosPanelProps {
  onClose: () => void;
}

export default function EnviosPanel({ onClose }: EnviosPanelProps) {
  return (
    <div className="envios-panel-container">
    <motion.div
      className="envios-panel"
      initial={{ x: 300 }}
      animate={{ x: 0 }}
      exit={{ x: 300 }}
      transition={{ duration: 0.3 }}
    >
      <button className="envios-panel-close" onClick={onClose}>
        ✖
      </button>
      <ul className="envios-panel-header">
        <li><span className="free">ENVÍO</span></li>
        <li><span className="free">ENVÍO A UNA TIENDA ZARA</span></li>
    </ul>
     
    <ul>
        <li><span className="free">GRATUITO</span></li>
        <li>Entrega en 2-3 días laborables.</li>
    </ul>

    <h3>ENVÍO A DOMICILIO</h3>
    <ul>
        <li>Entrega garantizada al día siguiente - 4,95 EUR</li>
        <li>Entrega en 2-3 días laborables - 3,95 EUR</li>
        <li className="important">El envío será gratuito a partir de 30 EUR solo para artículos sin descuento.</li>
        <li>Entrega el mismo día de la compra - 5,95 EUR</li>
        <li>Entrega en el mismo día en Madrid para todos los pedidos realizados de lunes a viernes antes de las 14h.</li>
    </ul>

    <h3>ENVÍO A PUNTO DE ENTREGA</h3>
    <ul>
        <li>3,95 EUR</li>
        <li className="important">El envío será gratuito a partir de 30 EUR solo para artículos sin descuento.</li>
        <li>Entrega en 2-3 días laborables.</li>
    </ul>

    <h2>CAMBIOS Y DEVOLUCIONES</h2>
    <p>Dispones de 30 días desde la fecha de envío para devolver tu compra en Zara.com.</p>

    <h3>DEVOLUCIÓN EN UNA TIENDA ZARA</h3>
    <ul>
        <li><span className="free">GRATUITO</span></li>
    </ul>

    <h3>DEVOLUCIÓN EN UN PUNTO DE ENTREGA</h3>
    <ul>
        <li><span className="free">GRATUITO</span></li>
    </ul>

    <h3>RECOGIDA EN DOMICILIO</h3>
    <ul>
        <li>1,95 EUR</li>
        <li className="important">El coste de la devolución aplica a cada solicitud y se descontará del importe reembolsado.</li>
    </ul>

    Para más información, te sugerimos que visites la sección Ayuda.
    </motion.div>
    </div>
  );
}
