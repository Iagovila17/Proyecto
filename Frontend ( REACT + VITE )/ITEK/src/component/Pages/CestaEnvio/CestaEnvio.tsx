import React, { useState, useEffect } from 'react';
import './CestaEnvio.css'; // Asegúrate de crear este archivo CSS con los estilos necesarios.
import { useNavigate } from 'react-router-dom'; // Usamos `useNavigate` para redirigir a otra página

const CestaEnvio = () => {
  const [productosDelCarrito, setProductosDelCarrito] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    ciudad: '',
    codigo_postal: '',
    telefono: '',
  });
  const navigate = useNavigate(); // Para redirigir al usuario

  useEffect(() => {
    // Recuperar los productos de la cesta del localStorage
    const productosGuardados = localStorage.getItem('productosCarrito');
    if (productosGuardados) {
      setProductosDelCarrito(JSON.parse(productosGuardados));
    }
  }, []);

  const calcularTotal = () => {
    return productosDelCarrito.reduce((total, prod) => {
      const precio = Number(prod.precio);
      const cantidad = Number(prod.cantidad);
      if (!isNaN(precio) && !isNaN(cantidad)) {
        return total + precio * cantidad;
      }
      return total;
    }, 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Guardar la información del formulario en localStorage
    localStorage.setItem('direccionEnvio', JSON.stringify(formData));

    // Redirigir al usuario al método de pago
    navigate('/Payment');
  };

  return (
    <div className="cesta-envio-container">
      {/* Formulario de envío */}
      <div className="envio-form">
        <h2>Formulario de Envío</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="Nombre"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="direccion">Dirección *</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
              placeholder="Dirección de envío"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="ciudad">Ciudad *</label>
            <input
              type="text"
              id="ciudad"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleInputChange}
              placeholder="Ciudad"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="codigo_postal">Código Postal *</label>
            <input
              type="text"
              id="codigo_postal"
              name="codigo_postal"
              value={formData.codigo_postal}
              onChange={handleInputChange}
              placeholder="Código Postal"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefono">Teléfono *</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              placeholder="Teléfono"
              required
            />
          </div>
          <button type="submit" className="submit-button">Confirmar Envío</button>
        </form>
      </div>

      {/* Resumen de la cesta */}
      <div className="resumen-cesta">
        <h2>Resumen de la Cesta</h2>
        <div className="productos">
          {productosDelCarrito.map((producto, index) => (
            <div key={index} className="producto">
              <img src={producto.imagen || "/default-image.jpg"} alt={producto.nombre} className="producto-img" />
              <div className="producto-info">
                <p className="producto-nombre">{producto.nombre}</p>
                <p className="producto-detalle">Color: {producto.color}</p>
                <p className="producto-detalle">Talla: {producto.talla}</p>
                <div className="producto-footer">
                  <span className="producto-precio">{producto.precio} EUR</span>
                  <span className="producto-cantidad">Cantidad: {producto.cantidad}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
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
      </div>
    </div>
  );
};

export default CestaEnvio;
