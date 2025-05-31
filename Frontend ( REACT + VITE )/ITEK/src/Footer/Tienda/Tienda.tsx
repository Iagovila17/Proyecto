 import './Tienda.css'; 

 const Tienda = () => {


  return (
   <div className="tienda-container">
    <section className="articulos-disponibles-seccion">
  <div className="articulos-info">
   <div className="tienda-info">
    <h1>I&TEK</h1>
    <p>CORUÑA <span className="punto-verde">•</span> Abierta de 10:00 a 22:00</p>
   </div>
   <div className="articulos-texto">
    <p className='disponible-tienda'>ARTÍCULOS DISPONIBLES EN ESTA TIENDA</p>
    <p>Aquí verás tus favoritos y los artículos que tengas guardados en tu cesta cuando estén disponibles en esta tienda.</p>
   </div>
  </div>
  <div className="articulos-imagen">
   <img src="\Imagenes\tienda.jpg" alt="Artículos Disponibles" />
  </div>
 </section>

    <section className="colecciones-disponibles">
     <h2>COLECCIONES DISPONIBLES</h2>
     <div className="colecciones-grid">
      <div className="coleccion-item"><a href="/productos/mujer/todos">
       <img src="public\Imagenes\mujer.jpg" alt="Mujer" />
       <p>MUJER</p></a>
      </div>
      <div className="coleccion-item"><a href="/productos/hombre/todos">
       <img src="public\Imagenes\hombre.jpg" alt="Hombre" />
       <p>HOMBRE</p></a>
      </div>
      <div className="coleccion-item"><a href="/productos/nina/todos">
       <img src="public\Imagenes\niños.jpg" alt="Niños" />
       <p>NIÑOS</p></a>
      </div>
     </div>
    </section>
   </div>
  );
 };

 export default Tienda;