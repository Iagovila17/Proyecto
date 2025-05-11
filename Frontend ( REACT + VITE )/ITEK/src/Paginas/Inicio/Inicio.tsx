import "./Inicio.css";

const Inicio: React.FC = () => {
  return (
    <div>
      <div className="Chevrolet-cola">
        <img src="/Imagenes/chevroletcha.webp" alt="chevroletcha" />
        <img id="Centro" src="/Imagenes/chevroletgap.webp" alt="chevroletgap" />
        <img src="/Imagenes/chevrolet.webp" alt="chevrolet" />
      </div> 

      <video autoPlay loop muted playsInline>
        <source src="/Videos/ejemplo.mp4" type="video/mp4" />
        Tu navegador no soporta la reproducción de video.
      </video>

      <div className="imagenes-pares">
        <img src="/Imagenes/sillaoscura.png" alt="Silla Oscura" />
        <img src="/Imagenes/hombrecajonmadera.jpg" alt="Hombre con cajón de madera" />
      </div>

      <div className="imagen-ninos-inicio">
        <img src="/Imagenes/niñosRopa.png" alt="Imagen de niños pequeños" />
      </div>

      <div className="text-container">
        Fight For It
      </div>
    </div>
  );
};

export default Inicio;
