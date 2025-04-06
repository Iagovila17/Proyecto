import { useState } from "react";
import { Link } from "react-router-dom";
import "./Product.css";

interface Product {
  id: number;
  name: string;
  showColorBox?: boolean;
  color?: string;
  price: number;
  image1?: string;
  image2?: string;
  image3?: string;
  descripcion?: string;
  referencia?: string;
  composicion?: string;
  cuidados?: string;
}

interface ProductGridProps {
  products: Product[];
}

export default function Product({ products }: ProductGridProps) {
  const [columns, setColumns] = useState(2); // Por defecto van a aparecer 2 productos
  const columnOptions = [4, 6, 8];

  return (
    <div>
      <div className="controls">
        {columnOptions.map((num) => (
          <button
            key={num}
            className={`view-button ${columns === num ? "active" : ""}`}
            onClick={() => setColumns(num)}
          >
            {num}
          </button>
        ))}
      </div>

      <div
        className={`grid ${columns === 6 ? "six-columns" : ""} ${columns === 8 ? "eight-columns" : ""}`}
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`, // Aplica el número de columnas dinámicamente
        }}
      >
        {products.map((product) => (
          <div key={product.id} className="product">
            <div className="carousel-wrapper">
              <Link to={`/product/${product.id}`} className="product-link">
                <img id="productoIMG" src={product.image1} alt={product.name} />
              </Link>
            </div>
            <div className="product-info">
              <div className="name-wrapper">
                {product.name}
                {product.color && (
                  <div className="color-box" style={{ backgroundColor: product.color }}></div>
                )}
              </div>
              <div className="product-price">{product.price} EUR</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
