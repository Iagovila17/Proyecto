import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css";
import ResumenCesta from '../../component/ProducCart/ProductoCarrito'; // Ajusta la ruta si es necesario

export default function ProductDetail() {
  const { id } = useParams();
  const [producto, setProducto] = useState<any>(null);
  const [mostrarEnvios, setMostrarEnvios] = useState(false);
  const [mostrarTallas, setMostrarTallas] = useState(false);
  const [mostrarPanelCesta, setMostrarPanelCesta] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [carrito, setCarrito] = useState<any[]>([]); // Estado local simulando el carrito
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

    // Simulación de carga del carrito (reemplaza con tu lógica real)
    const storedCart = localStorage.getItem('productosCarrito');
    if (storedCart) {
      setCarrito(JSON.parse(storedCart));
    }
  }, [id]);

  const handleTallaClick = async (talla: string) => {
    const storedUser = localStorage.getItem("user");
    let token = null;

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      token = parsedUser.token;
    }

    if (!token) {
      navigate('/login');
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
        setMostrarPanelCesta(true);
        const nuevoProducto = { ...producto, talla, cantidad: 1 };
        // Lógica para añadir al carrito (simulación con estado local y localStorage)
        const productoExistente = carrito.find(
          (item) => item.id === nuevoProducto.id && item.talla === nuevoProducto.talla
        );

        if (productoExistente) {
          const nuevaCesta = carrito.map((item) =>
            item.id === nuevoProducto.id && item.talla === nuevoProducto.talla
              ? { ...item, cantidad: (item.cantidad || 0) + 1 }
              : item
          );
          setCarrito(nuevaCesta);
          localStorage.setItem('productosCarrito', JSON.stringify(nuevaCesta));
        } else {
          const nuevaCesta = [...carrito, nuevoProducto];
          setCarrito(nuevaCesta);
          localStorage.setItem('productosCarrito', JSON.stringify(nuevaCesta));
        }
      }
    } catch (error) {
      console.error("Error al añadir a la cesta", error);
    }
  };

  const irACesta = () => {
    navigate('/cesta');
    setMostrarPanelCesta(false);
  };

  const seguirComprando = () => {
    setMostrarPanelCesta(false);
  };

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div style={{ position: 'relative' }}>
      <div className="product-detail">
        <img src={producto.imagen} alt={producto.nombre} />
        <div className="info">
          <div className="product-detail-name">{producto.nombre}</div>
          <div className="product-detail-price">{producto.precio} EUR</div>
          <div className="lineaproduct"></div>

          <div className="info-product">
            <div className="product-detail-referencia">
            <div className="color">{producto.color}</div>
            <div className="color">|</div>
            <div className="referencia"> Ref: {producto.referencia}</div>
            </div>
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
      <div>
        <div className="imagenes-adicionales">
          <img src={producto.imagen2} alt={producto.nombre} style={{ maxWidth: '50%', height: 'auto' }} />
          <img src={producto.imagen3} alt={producto.nombre} style={{ maxWidth: '50%', height: 'auto' }} />
        </div>
      </div>

      {mostrarPanelCesta && (
        <div className="panel-cesta activo">
          {carrito.length > 0 ? (
            <ResumenCesta />
          ) : (
            <p>La cesta está vacía.</p>
          )}
          <div className="botones-cesta">
            <button className="ircesta" onClick={irACesta}>Ir a la cesta</button>
            <button className="seguircompra" onClick={seguirComprando}>Seguir comprando</button>
          </div>
        </div>
      )}
    </div>
  );
}