import React from "react";
import ProductGrid from "../../Product/Product"; // Asegúrate de que la ruta sea correcta
import "./RopaHombre.css";
import ropaHombreProducts from "./RopaHombreProducts";

const RopaHombre: React.FC = () => {
  

  return (
    <main>
      <div className="contenedor-secciones">
        <div className="secciones">TODO</div>
        <div className="secciones">CHAQUETAS</div>
        <div className="secciones">SUDADERAS</div>
        <div className="secciones">VESTIDOS</div>
        <div className="secciones">SUDADERAS</div>
        <div className="secciones">PIJAMAS</div>
        <div className="secciones">BOLSOS</div>
        <div className="secciones">ZAPATOS</div>
        <div className="secciones">ACCESORIOS</div>
        
        </div>
      {/* Pasa los productos como propiedad a ProductGrid */}
      <ProductGrid products={ropaHombreProducts} />
    </main>
  );
};

export default RopaHombre;
