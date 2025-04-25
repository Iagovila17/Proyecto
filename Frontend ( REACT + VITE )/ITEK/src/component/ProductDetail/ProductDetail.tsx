
import "./ProductDetail.css";

export default function ProductDetail() {
  return (
    <div>
      <div className="product-detail">
        <img  />
        <div className="info">
          <div className="product-detail-name"></div>
          <div className="product-detail-price">&nbsp; EUR</div>
          <div className="lineaproduct"></div>
          <div className="info-product">
            <p></p>
            <div className="referencia"></div>
            <div className="Button-añadir">
              <button id="Button-Añadir" >
                ADD
              </button>
            </div>
            <h3>COMPOSICIÓN</h3>
            <div className="composicion"></div>
            <h3>CUIDADOS</h3>
            <div className="cuidados"></div>
          </div>
        </div>
      </div>
      <div className="imagen-detalle-estilo">
        <img id="imagen-detalle" />
        <img id="imagen-detalle" />
      </div>
    </div>
  );
}

