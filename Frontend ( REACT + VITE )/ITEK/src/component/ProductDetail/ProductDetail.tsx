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
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);
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

  const handleTallaClick = async (talla: string) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      navigate("/login");
      return;
    }
  
    try {
      const response = await axios.post(`http://192.168.68.100:8080/Cart/add`,
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
  
      if (response.status === 200 || response.status === 201) {
        alert(`✅ Producto talla ${talla} añadido a la cesta`);
      } else {
        alert(`⚠️ No se pudo añadir el producto (código ${response.status})`);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        alert("⚠️ Tu sesión ha expirado. Vuelve a iniciar sesión.");
        navigate("/login");
      } else {
        console.error("Error al añadir a la cesta:", error);
        alert("❌ Hubo un error al añadir a la cesta.");
      }
    }
  };

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div>
      {/* Mensaje de éxito */}
      {mensajeExito && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#4BB543',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          zIndex: 9999,
        }}>
          {mensajeExito}
        </div>
      )}

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
              {mostrarEnvios && (
                <EnviosPanel onClose={() => setMostrarEnvios(false)} />
              )}
              <h3 className="h3-detalles" onClick={() => setMostrarEnvios(!mostrarEnvios)}>
                ENVÍOS, CAMBIOS Y DEVOLUCIONES
              </h3>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="imagen-detalle-estilo">
        <img src={producto.imagen2} alt="Detalle 1" />
        <img src={producto.imagen3} alt="Detalle 2" />
      </div>
    </div>
  );
}
