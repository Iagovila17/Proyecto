import React, { useState, useEffect } from 'react';
import './ProductoCarrito.css';

const ResumenCesta = () => {
  const [productos, setProductos] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    const fetchCesta = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const token = user.token;

        const response = await fetch('http://192.168.68.100:8080/cesta', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
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
        setError('Error de conexión con el servidor.');
      } finally {
        setCargando(false);
      }
    };

    fetchCesta();

    // Escuchar actualizaciones del carrito
    const actualizarCesta = () => fetchCesta();
    window.addEventListener('actualizar-carrito', actualizarCesta);
    return () => window.removeEventListener('actualizar-carrito', actualizarCesta);
  }, []);

  const calcularTotal = () => {
    return productos.reduce((total, prod) => {
      const precio = Number(prod.precio);
      const cantidad = Number(prod.cantidad);
      return !isNaN(precio) && !isNaN(cantidad) ? total + precio * cantidad : total;
    }, 0);
  };

  return (
    <div className="resumen-cesta-container">
      <h2>Resumen de la Cesta</h2>
      {error && <p className="error">{error}</p>}
      {cargando ? (
        <p>Cargando...</p>
      ) : (
        <div className="productos">
          {productos.map((producto, index) => (
            <div key={index} className="producto-envio">
              <img src={producto.imagen || "/default-image.jpg"} alt={producto.nombre} className="producto-img" />
              <div className="producto-info">
                <p className="producto-nombre">{producto.nombre}</p>
                <p className="producto-detalle-">Color: {producto.color}</p>
                <p className="producto-detalle-">Talla: {producto.talla}</p>
                <p className="producto-detalle-">Cantidad: {producto.cantidad}</p>
                <p className="producto-precio">{producto.precio} EUR</p>
              </div>
            </div>
          ))}
          <div className="resumen-total">
            <span>Total:</span>
            <span>{calcularTotal().toFixed(2)} EUR</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumenCesta;
