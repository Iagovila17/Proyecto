import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import EnviosPanel from "../EnviosPanel/EnviosPanel";
import axios from "axios";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const [producto, setProducto] = useState<any>(null);
  const [mostrarEnvios, setMostrarEnvios] = useState(false);
  const [mostrarTallas, setMostrarTallas] = useState(false);
  const [tallaSeleccionada, setTallaSeleccionada] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await axios.get(`http://192.168.68.100:8080/Product/${id}`);
        setProducto(res.data);
      } catch (error) {
        console.error("Error al obtener producto:", error);
      }
    };

    fetchProducto();
  }, [id]);

  const handleTallaClick = (talla: string) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      navigate("/login");
      return;
    }
  
    axios.post(
      `http://192.168.68.100:8080/Cart/add`,
      {
        productId: producto.id,
        talla: talla,
        cantidad: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(() => alert(`Producto talla ${talla} añadido a la cesta`))
    .catch((err) => console.error("Error al añadir a la cesta:", err));
  };
  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div>
      <div className="product-detail">
        <img src={producto.imagen} alt={producto.nombre} />
        <div className="info">
          <div className="product-detail-name">{producto.nombre}</div>
          <div className="product-detail-price">{producto.precio} EUR</div>
          <div className="lineaproduct"></div>
          <div className="info-product">
            <div className="referencia">Ref: {producto.referencia}</div>
            
          <div className="Button-añadir">
            <button id="Button-Añadir" onClick={() => setMostrarTallas(!mostrarTallas)}>ADD</button>
          </div>

            {mostrarTallas && (
              <div className="tallas-container">
                {producto.tamaño?.map((t: string) => (
                  <button
                    key={t}
                    className="talla-boton"
                    onClick={() => handleTallaClick(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}

            <p>{producto.descripcion}</p>
            <h3 className="h3-detalles">COMPOSICIÓN</h3>
            <div className="composicion">{producto.composicion}</div>
            <h3 className="h3-detalles">CUIDADOS</h3>
            <div className="cuidados">{producto.cuidados}</div>
            
            <AnimatePresence>
              {mostrarEnvios && (<EnviosPanel onClose={() => setMostrarEnvios(false)} />)}
              <h3 className="h3-detalles" onClick={() => setMostrarEnvios(!mostrarEnvios)}>ENVÍOS, CAMBIOS Y DEVOLUCIONES </h3>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="imagen-detalle-estilo">
        <img src={producto.imagen2} />
        <img src={producto.imagen3} />
      </div>
    </div>
  );
}
