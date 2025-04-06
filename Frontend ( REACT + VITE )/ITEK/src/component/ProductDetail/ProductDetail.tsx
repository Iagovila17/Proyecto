import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import ProductsHombreProducts from "../../component/Pages/RopaHombre/RopaHombreProducts";
import HogarProducts from "../Pages/Hogar/HogarProducts";
import RopaMujerProduct from "../Pages/RopaMujer/RopaMujerProduct";
import RopaNiñosProduct from "../Pages/RopaNiños/RopaNiñosProduct";


// Definir la interfaz para el producto
interface Product {
  id: number;
  name: string;
  price: number;
  image1: string;
  image2: string;
  image3: string;
  descripcion: string;
  referencia: string;
  composicion: string;
  cuidados: string;
}

interface ProductDetailProps {
  addToCart: (product: Product) => void; // Prop para la función addToCart
}

export default function ProductDetail({ addToCart }: ProductDetailProps) {
  const { id } = useParams(); // Obtiene el ID de la URL
  const allProducts = [...ProductsHombreProducts, ...RopaMujerProduct, ...HogarProducts, ...RopaNiñosProduct]; // Lista de productos
  const product = allProducts.find((p) => p.id === Number(id)); // Encuentra el producto por ID

  if (!product) {
    return <h2>Producto no encontrado</h2>; // Si no se encuentra el producto, muestra un mensaje
  }

  return (
    <div>
      <div className="product-detail">
        <img src={product.image1} alt={product.name} />
        <div className="info">
          <div className="product-detail-name">{product.name}</div>
          <div className="product-detail-price">{product.price}&nbsp; EUR</div>
          <div className="lineaproduct"></div>
          <div className="info-product">
            <p>{product.descripcion}</p>
            <div className="referencia">{product.referencia}</div>
            <div className="Button-añadir">
              <button 
                id="Button-Añadir" 
                onClick={() => addToCart(product)} // Llamada a la función addToCart
              >
                ADD
              </button>
            </div>
            <h3>COMPOSICIÓN</h3>
            <div className="composicion">{product.composicion}</div>
            <h3>CUIDADOS</h3>
            <div className="cuidados">{product.cuidados}</div>
          </div>
        </div>
      </div>
      <div className="imagen-detalle-estilo">
        <img id="imagen-detalle" src={product.image2} alt={product.name} />
        <img id="imagen-detalle" src={product.image3} alt={product.name} />
      </div>
    </div>
  );
}

