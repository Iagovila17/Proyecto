 import "./Inicio.css";

 const Inicio = () => {
  
  return (
    <div className="wrapper">
    <div>
      <div className="botones">
        <img src="/Imagenes/Inicio/Botones.jpg" alt="botones" />
      </div>

      <div className="imagenes-pares">
        <img src="/Imagenes/Inicio/florEspacio.jpg" alt="florEspacioa" />
        <img src="/Imagenes/Inicio/florwhite.jpg" alt="florwhite" />
      </div>
      
      <div className="contenedor">
        <div className="circulo"></div>
        <div className="circulo"></div>
        <div className="circulo"></div>
        <div className="circulo"></div>
        <div className="circulo"></div>
        <div className="circulo"></div>
      </div>

      <div className="Bebedescripcion">
        <img src="/Imagenes/Inicio/bebeRopa.jpg" alt="bebeRopa" />
        <p className="text-beberopa">CONJUNTO camisa y braguita flores bordadas LIMITED EDITION. Detalle NIDO DE ABEJA y flores bordadas en CANESU. BRAGUITA con cinturilla elástica. bajo acabado en VOLANTES.</p>
      </div>

      <div className="bañador-hombre">
        <img src="/Imagenes/Inicio/003.svg" alt="florEspacioa" />
        <img src="/Imagenes/Inicio/bañadorhombre.jpg" alt="florwhite" />
      </div>
    

    

      <div className="text-container">
        Fight For It
      </div>
    </div>
    </div>
  );
 };

 export default Inicio;