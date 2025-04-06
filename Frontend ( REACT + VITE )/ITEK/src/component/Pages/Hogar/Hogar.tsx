import React from "react";
import "./Hogar.css"
import ProductGrid from "../../Product/Product";
import HogarProducts from "./HogarProducts";


const Hogar: React.FC = () => {
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
      <ProductGrid products={HogarProducts} />   
      </div>
    
      
  );
}

export default Hogar;