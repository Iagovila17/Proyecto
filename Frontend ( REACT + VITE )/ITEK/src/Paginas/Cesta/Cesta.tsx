import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Cesta.css';

const Cesta = () => {
  const [productos, setProductos] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const [cargando, setCargando] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user.token) {
      navigate('/login'); // Redirigir si no hay token
      return;
    }

    fetchCesta(user.token);
  }, []);

  const fetchCesta = async (token: string) => {
    setCargando(true);
    try {
      const response = await fetch('http://192.168.68.100:8080/cesta', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Respuesta completa de la API:", data);

      if (data && Array.isArray(data.items)) {
        const productosProcesados = data.items.map((item: any) => ({
          ...item.product,
          cantidad: item.cantidad,
          precio: parseFloat(item.product.precio ?? 0),
          talla: item.talla ?? 'DEFAULT',
        }));

        setProductos(productosProcesados);
      } else {
        console.error("La estructura de la respuesta es incorrecta");
      }

    } catch (err) {
      console.error('Error al obtener la cesta:', err);
      setError('Error al cargar la cesta');
    } finally {
      setCargando(false);
    }
  };

  const handleCantidadChange = (index: number, nuevaCantidad: number) => {
    const productosActualizados = [...productos];
    productosActualizados[index].cantidad = nuevaCantidad;
    setProductos(productosActualizados);
  };

  const handleValidarCarrito = () => {
    localStorage.setItem('productosCarrito', JSON.stringify(productos));
  };

  const handleEliminarProducto = async (index: number) => {
    const producto = productos[index];
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = user.token;

    try {
      const response = await fetch(`http://192.168.68.100:8080/cesta/delete/${producto.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setProductos((prevProductos) =>
          prevProductos.filter((_, i) => i !== index)
        );

        window.dispatchEvent(new Event('actualizar-carrito'));
        console.log("Producto eliminado correctamente");
      } else {
        console.error('Error al eliminar el producto de la base de datos');
      }
    } catch (error) {
      console.error('Error de conexión al eliminar el producto:', error);
    }
  };

  const calcularTotal = () => {
    return productos.reduce((total, prod) => {
      const precio = Number(prod.precio);
      const cantidad = Number(prod.cantidad);
      if (!isNaN(precio) && !isNaN(cantidad)) {
        return total + precio * cantidad;
      }
      return total;
    }, 0);
  };

  return (
    <div className="cesta">
      <div className="cesta-container">
        {error && <p className="error">{error}</p>}
        {cargando ? (
          <p>Cargando...</p>
        ) : (
          <div>
            <div className="Cesta-Favoritos">
                    <Link to="/cesta" className="Cesta-Enlace">
                        CESTA [{productos.length}]
                    </Link>
                    <Link to="/favoritos" className="Favoritos-Enlace">
                        FAVORITOS
                    </Link>
            </div>          
            <div className="cesta-content">
              <div className="productos">
                {productos.map((producto, index) => (
                  <div key={index} className="producto-cesta">
                    <img src={producto.imagen || "/default-image.jpg"} alt={producto.nombre} className="producto-img-cesta" />
                    <div className="producto-info">
                      <p className="producto-nombre">{producto.nombre}</p>
                      <p className="producto-descripcion">Color: {producto.color}</p>
                      <p className="producto-descripcion">Talla: {producto.talla}</p>
                      <div className="producto-footer">
                        <select className='select-cantidad'
                          value={producto.cantidad}
                          onChange={(e) => handleCantidadChange(index, parseInt(e.target.value))}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="producto-final">
                      <button className="eliminar-producto" onClick={() => handleEliminarProducto(index)}> × </button>
                      <span className="producto-precio">{producto.precio} EUR</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="resumen">
                <h3>Resumen del pedido</h3>
                <input type="text" placeholder="Cupón" className="input-cupon" />
                <div className="resumen-item">
                  <span>Subtotal</span>
                  <span>{calcularTotal().toFixed(2)} EUR</span>
                </div>
                <div className="resumen-item">
                  <span>Envío (4-6 días laborables)</span>
                  <span>Gratis</span>
                </div>
                <div className="resumen-total">
                  <span>Total</span>
                  <span>{calcularTotal().toFixed(2)} EUR</span>
                </div>
                <a href="../CestaEnvio">
                  <button className="boton-validar" onClick={handleValidarCarrito}>
                    VALIDAR MI CARRITO
                  </button>
                </a>
                <div className="pagos">
                  <p>Métodos de pago aceptados:</p>
                  <div className="logos-pago">
                    <img src="public/Imagenes/MetodoPago/visa.png" alt="Visa" />
                    <img src="public/Imagenes/MetodoPago/mastercard.png" alt="MasterCard" />
                    <img src="public/Imagenes/MetodoPago/Klarna.png" alt="Klarna" />
                    <img src="public/Imagenes/MetodoPago/paypal.png" alt="PayPal" />
                    <img src="public/Imagenes/MetodoPago/Pay.png" alt="Pay" />
                  </div>
                </div>
              </div>
            </div>

            <div className="info-container">
              <div className="info-item">
                <img src="public/Imagenes/info/pagoSeg.png" alt="Pago seguro" className="info-icon" />
                <span className="info-text">Pago seguro</span>
              </div>
              <div className="info-item">
                <img src="public/Imagenes/info/entrega.png" alt="Entrega gratuita" className="info-icon" />
                <div className="info-text-container">
                  <span className="info-text">Entrega gratuita a partir de 100€</span>
                  <span className="info-subtext">En 4-6 días laborables</span>
                </div>
              </div>
              <div className="info-item">
                <img src="public/Imagenes/info/devolucion.png" alt="Devoluciones gratuitas" className="info-icon" />
                <div className="info-text-container">
                  <span className="info-text">Devoluciones gratuitas</span>
                  <span className="info-subtext">Dentro de los 15 días</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cesta;
