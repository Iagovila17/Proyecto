import React, { useState, useEffect } from 'react';
import './CestaEnvio.css'; 
import { useNavigate } from 'react-router-dom';

const CestaEnvio = () => {
  const [productosDelCarrito, setProductosDelCarrito] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    ciudad: '',
    codigo_postal: '',
    telefono: '',
    direccion_complementaria: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('direccionEnvio', JSON.stringify(formData));

    navigate('/Payment');
  };

  const handleConfirmarEnvioFueraFormulario = () => {
    handleSubmit({ preventDefault: () => {} } as React.FormEvent);
  };

  return (
    <div className="cesta-envio">
     
      <div className='title-envio'>
      <h2>Formulario de Envío</h2>
      </div>
      <div className="cesta-envio-container">
      
        {/* Formulario de envío */}
        <div className="envio-form">
         
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
              <label htmlFor="apellido">Apellido *</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleInputChange}
                placeholder="Apellido"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="direccion">Número y dirección de entrega *</label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
                placeholder="Número y dirección de entrega"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="direccion_complementaria">Dirección complementaria (pago, planta, edificio, etc.)</label>
              <input
                type="text"
                id="direccion_complementaria"
                name="direccion_complementaria"
                value={formData.direccion_complementaria}
                onChange={handleInputChange}
                placeholder="Dirección complementaria"
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
            {/* El botón se ha movido fuera del formulario */}
          </form>
        </div>


        {/* Resumen de la cesta */}
        <div className="resumen-cesta">
          <h2>Resumen de la Cesta</h2>
          <div className="productos">
            {productosDelCarrito.map((producto, index) => (
              <div key={index} className="producto-envio">
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
      <button type="button" className="submit-button" onClick={handleConfirmarEnvioFueraFormulario}>Confirmar Envío</button>

    </div>
  );
};

export default CestaEnvio;