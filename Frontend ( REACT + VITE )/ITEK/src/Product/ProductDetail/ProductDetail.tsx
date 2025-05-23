import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css";
import ResumenCesta from '../../component/ProducCart/ProductoCarrito';
import { FaBookmark } from "react-icons/fa";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  imagen2?: string;
  imagen3?: string;
  color?: string;
  referencia?: string;
  descripcion?: string;
  composicion?: string;
  cuidados?: string;
  tamaño?: string[];
  cantidad?: number;
  talla?: string;
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [mostrarTallas, setMostrarTallas] = useState(false);
  const [mostrarPanelCesta, setMostrarPanelCesta] = useState(false);
  const [carrito, setCarrito] = useState<Producto[]>([]);
  const [favoritos, setFavoritos] = useState<Producto[]>(() => {
    const storedFavs = localStorage.getItem('favoritos');
    return storedFavs ? JSON.parse(storedFavs) : [];
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await axios.get<Producto>(`http://192.168.68.100:8080/Product/${id}`);
        setProducto(res.data);
      } catch (error) {
        console.error("Error al obtener producto:", error);
      }
    };

    fetchProducto();

    const storedCart = localStorage.getItem('productosCarrito');
    if (storedCart) setCarrito(JSON.parse(storedCart));
  }, [id]);

  const handleTallaClick = async (talla: string) => {
    if (!producto) return;

    const storedUser = localStorage.getItem("user");
    let tokenLocal = null;

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      tokenLocal = parsedUser.token;
    }

    if (!tokenLocal) {
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post(
        `http://192.168.68.100:8080/cesta/add/${producto.id}`,
        { talla, cantidad: 1 },
        { headers: { Authorization: `Bearer ${tokenLocal}` } }
      );

      if (response.status === 200) {
        setMostrarPanelCesta(true);
        const nuevoProducto = { ...producto, talla, cantidad: 1 };

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

  const handleToggleFavorite = async (producto: Producto) => {
    const storedUser = localStorage.getItem("user");
    let tokenLocal = null;

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      tokenLocal = parsedUser.token;
    }

    if (!tokenLocal) {
      alert("Debes iniciar sesión para gestionar favoritos.");
      navigate('/login');
      return;
    }

    const yaExiste = favoritos.some(fav => fav.id === producto.id);

    try {
      if (yaExiste) {
        // Eliminar favorito
        const response = await axios.delete(
          `http://192.168.68.100:8080/favoritos/${producto.id}`,
          { headers: { Authorization: `Bearer ${tokenLocal}` } }
        );

        if (response.status === 200) {
          const nuevosFavoritos = favoritos.filter(fav => fav.id !== producto.id);
          setFavoritos(nuevosFavoritos);
          localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
          console.log("Eliminado de favoritos:", producto);
        }
      } else {
        // Añadir favorito
        const response = await axios.post(
          `http://192.168.68.100:8080/favoritos/${producto.id}`,
          {},
          { headers: { Authorization: `Bearer ${tokenLocal}` } }
        );

        if (response.status === 200) {
          const nuevosFavoritos = [...favoritos, producto];
          setFavoritos(nuevosFavoritos);
          localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
          console.log("Añadido a favoritos:", producto);
        }
      }
    } catch (error) {
      console.error("Error al gestionar favoritos", error);
      alert("No se pudo actualizar favoritos. Intenta más tarde.");
    }
  };

  if (!producto) return <p>Cargando producto...</p>;

  const estaEnFavoritos = favoritos.some(fav => fav.id === producto.id);

  return (
    <div style={{ position: 'relative' }}>
      <div className="product-detail">
        <img src={producto.imagen} alt={producto.nombre} />
        <div className="info">
          <div className="product-detail-header" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div className="product-detail-name">{producto.nombre}</div>
            <FaBookmark
              className="add-to-favorites-icon"
              onClick={() => handleToggleFavorite(producto)}
              title={estaEnFavoritos ? "Quitar de favoritos" : "Añadir a favoritos"}
              style={{ color: estaEnFavoritos ? '#e63946' : '#999', cursor: 'pointer', fontSize: '20px', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
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
                {producto.tamaño?.map((t) => (
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
          {producto.imagen2 && <img src={producto.imagen2} alt={producto.nombre} style={{ maxWidth: '50%', height: 'auto' }} />}
          {producto.imagen3 && <img src={producto.imagen3} alt={producto.nombre} style={{ maxWidth: '50%', height: 'auto' }} />}
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
