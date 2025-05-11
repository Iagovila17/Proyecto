import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const [producto, setProducto] = useState<any>(null);
  const [mostrarEnvios, setMostrarEnvios] = useState(false);
  const [mostrarTallas, setMostrarTallas] = useState(false);
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null); // Estado para el token
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("Stored token desde localStorage:", storedToken);
    setToken(storedToken);
  
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
    const storedUser = localStorage.getItem("user");
    let token = null;
  
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      token = parsedUser.token;
    }
  
    if (!token) {
      alert("⚠️ No estás autenticado.");
      return;
    }
  
    try {
      const response = await axios.post(
        `http://192.168.68.100:8080/cesta/add/${producto.id}`,
        { talla, cantidad: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        alert(`✅ Producto talla ${talla} añadido a la cesta`);
      }
    } catch (error) {
      console.error("Error al añadir a la cesta", error);
      alert("❌ Hubo un error al añadir el producto.");
    }
  };

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div>
      {mensajeExito && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: "#4BB543",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            zIndex: 9999,
          }}
        >
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
              <button
                id="Button-Añadir"
                onClick={() => setMostrarTallas(!mostrarTallas)}
              >
                ADD
              </button>
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
          </div>
        </div>
      </div>
    </div>
  );
}
