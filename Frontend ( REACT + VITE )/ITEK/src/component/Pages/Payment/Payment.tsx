import React, { useState, useEffect } from 'react';
import './Payment.css';

const Payment = () => {
  const [productosDelCarrito, setProductosDelCarrito] = useState<any[]>([]);
  const [direccionEnvio, setDireccionEnvio] = useState<any | null>(null);
  const [metodoSeleccionado, setMetodoSeleccionado] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  useEffect(() => {
    const productosGuardados = localStorage.getItem('productosCarrito');
    if (productosGuardados) {
      setProductosDelCarrito(JSON.parse(productosGuardados));
    }

    const direccionGuardada = localStorage.getItem('direccionEnvio');
    if (direccionGuardada) {
      setDireccionEnvio(JSON.parse(direccionGuardada));
    }
  }, []);

  const calcularTotal = () => {
    return productosDelCarrito.reduce((total, prod) => {
      const precio = Number(prod.precio);
      const cantidad = Number(prod.cantidad);
      return (!isNaN(precio) && !isNaN(cantidad)) ? total + precio * cantidad : total;
    }, 0);
  };

  const handleMetodoCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMetodoSeleccionado(e.target.value);
    setAceptaTerminos(false);
  };

  return (
    <div className="payment-container">
      {/* Sección izquierda: Dirección y método de pago */}
      <div className="metodo-pago-container">
        {direccionEnvio && (
          <div className="direccion-envio">
            <h3>Dirección de Envío</h3>
            <p><strong>Nombre:</strong> {direccionEnvio.nombre}</p>
            <p><strong>Dirección:</strong> {direccionEnvio.direccion}</p>
            <p><strong>Ciudad:</strong> {direccionEnvio.ciudad}</p>
            <p><strong>Código Postal:</strong> {direccionEnvio.codigo_postal}</p>
            <p><strong>Teléfono:</strong> {direccionEnvio.telefono}</p>
          </div>
        )}

        <div className="metodo-pago-form">
          <h3>Elige tu Método de Pago</h3>
          <form>
            {/* Tarjeta */}
            <div className="payment-option">
              <label className="payment-label">
                <input
                  type="radio"
                  name="pago"
                  value="tarjeta"
                  checked={metodoSeleccionado === 'tarjeta'}
                  onChange={handleMetodoCambio}
                  className="payment-radio"
                />
                Tarjeta de crédito
              </label>
              <div className="credit-card-logos">
                <img src="/Imagenes/MetodoPago/mastercard.png" alt="MasterCard" />
                <img src="/Imagenes/MetodoPago/visa.png" alt="Visa" />
              </div>
            </div>

            {/* Klarna */}
            <div className="payment-option">
              <label className="payment-label">
                <input
                  type="radio"
                  name="pago"
                  value="klarna"
                  checked={metodoSeleccionado === 'klarna'}
                  onChange={handleMetodoCambio}
                  className="payment-radio"
                />
                Pago en 3 cuotas sin intereses
              </label>
              <img src="/Imagenes/MetodoPago/Klarna.png" alt="Klarna" />
            </div>

            {/* PayPal */}
            <div className="payment-option">
              <label className="payment-label">
                <input
                  type="radio"
                  name="pago"
                  value="paypal"
                  checked={metodoSeleccionado === 'paypal'}
                  onChange={handleMetodoCambio}
                  className="payment-radio"
                />
                PayPal
              </label>
              <img src="/Imagenes/MetodoPago/paypal.png" alt="PayPal" width={100} />

              {metodoSeleccionado === 'paypal' && (
                <div className="paypal-desplegable">
                  <label className="terminos-label">
                    <input
                      type="checkbox"
                      checked={aceptaTerminos}
                      onChange={() => setAceptaTerminos(!aceptaTerminos)}
                    />
                    Acepto los términos y condiciones
                  </label>
                  <button
                    className="paypal-boton"
                    disabled={!aceptaTerminos}
                    onClick={() => alert('Redirigiendo a PayPal...')}
                  >
                    Pagar con PayPal
                  </button>
                </div>
              )}
            </div>

            {/* Apple Pay */}
            <div className="payment-option">
              <label className="payment-label">
                <input
                  type="radio"
                  name="pago"
                  value="ApplePay"
                  checked={metodoSeleccionado === 'ApplePay'}
                  onChange={handleMetodoCambio}
                  className="payment-radio"
                />
                Apple Pay
              </label>
              <img src="/Imagenes/MetodoPago/Pay.png" alt="ApplePay" />
            </div>
          </form>
        </div>
      </div>

      {/* Sección derecha: Resumen de la cesta */}
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

export default Payment;
