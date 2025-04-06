import React from "react";
import "./RopaMujer.css"
import ProductGrid from "../../Product/Product";
import RopaMujerProduct from "./RopaMujerProduct";

const RopaMujer: React.FC = () => {



   // Función para cambiar el número de columnas en orden 4 → 6 → 8 

  return (
    <div>
      <div className="contenedor-secciones">
        <div className="secciones">VER TODO</div>
        <div className="secciones">CHAQUETAS</div>
        <div className="secciones">SUDADERAS</div>
        <div className="secciones">VESTIDOS</div>
        <div className="secciones">SUDADERAS</div>
        <div className="secciones">PIJAMAS</div>
        <div className="secciones">BOLSOS</div>
        <div className="secciones">ZAPATOS</div>
        <div className="secciones">ACCESORIOS</div>
        </div>
      <ProductGrid products={RopaMujerProduct} />
      </div>
    
      
  );
}

export default RopaMujer;