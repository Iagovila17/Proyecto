import { useEffect, useState } from 'react';
import PasoCompra from '../PasoCompra/PasoCompra';
import './Cesta.css';

const Cesta = () => {
  const [productos, setProductos] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    fetchCesta();
  }, []);

  const fetchCesta = async () => {
    setCargando(true);
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const token = user.token;

      const response = await fetch('http://192.168.68.100:8080/cesta', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Respuesta completa de la API:", data); // Verifica toda la respuesta

      if (data && Array.isArray(data.productos)) {
        console.log("Productos originales:", data.productos);
        const productosProcesados = data.productos.map((p: any) => ({
          ...p,
          precio: parseFloat(p.precio ?? 0),
          cantidad: parseInt(p.cantidad ?? 1), // Establecer valor por defecto si no tiene cantidad
        }));

        console.log("Productos procesados:", productosProcesados);
        setProductos(productosProcesados);
      } else {
        console.error("La estructura de la respuesta es incorrecta");
      }

    } catch (err) {
      console.error('Error al obtener la cesta:', err);
      setError('Error de conexión con el servidor.');
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
    // Guardar la cesta en el localStorage
    localStorage.setItem('productosCarrito', JSON.stringify(productos));
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
    <div>
      <div className="indicador-container">
        <PasoCompra />
      </div>
      <div className="cesta-container">
        {error && <p className="error">{error}</p>}
        {cargando ? (
          <p>Cargando...</p>
        ) : (
          <div>
            <h2 className='Cesta-Cantidad'>Mi cesta | {productos.length} artículo(s)</h2>
            <div className="cesta-content">
              <div className="productos">
                {productos.map((producto, index) => (
                  <div key={index} className="producto">
                    <img
                      src={producto.imagen || "/default-image.jpg"}
                      alt={producto.nombre}
                      className="producto-img"
                    />
                    <div className="producto-info">
                      <p className="producto-nombre">{producto.nombre}</p>
                      <p className="producto-detalle">Color: {producto.color}</p>
                      <p className="producto-detalle">Talla: {producto.talla}</p>
                      <div className="producto-footer">
                        <select
                          value={producto.cantidad}
                          onChange={(e) => handleCantidadChange(index, parseInt(e.target.value))}
                        >
                          {[1, 2, 3, 4, 5].map(n => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                        <span className="producto-precio">{producto.precio} EUR</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Resumen de pedido */}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Cesta;
