import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

const baseUrl = import.meta.env.VITE_API_URL;

const Payment = () => {
  const navigate = useNavigate();
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
      return !isNaN(precio) && !isNaN(cantidad) ? total + precio * cantidad : total;
    }, 0);
  };


  const handleMetodoCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMetodoSeleccionado(e.target.value);
    setAceptaTerminos(false);
  };

const realizarCheckout = async () => {
  const userItem = localStorage.getItem('user');
  const userData = userItem ? JSON.parse(userItem) : null;
  const token = userData?.token;

  if (!token) {
    console.error('Token no encontrado');
    return;
  }

  // Crear los datos para el checkout
const checkoutData = {
  direccionEnvio: direccionEnvio.direccion,
  metodoPago: "paypal",
  total: calcularTotal(),
  fecha: new Date().toISOString(),
};

console.log('Datos de checkout:', checkoutData);

try {
  const response = await fetch(`${baseUrl}/cesta/checkout`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(checkoutData),
  });

  const responseData = await response.json(); 

  if (!response.ok) {
    throw new Error(responseData.error || "Error desconocido");
  }

  alert("¡Pedido realizado con éxito!");
  console.log("Orden:", responseData);
  navigate('/inicio'); 

} catch (error: any) {
  console.error("Error al realizar el checkout:", error);
  alert(error.message || "Hubo un error");
}
};

  useEffect(() => {
    if (metodoSeleccionado === 'paypal' && aceptaTerminos && (window as any).paypal) {
      const container = document.getElementById('paypal-button-container');
      if (container) {
        container.innerHTML = '';
      }

      (window as any).paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'paypal',
        },
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: calcularTotal().toFixed(2),
                  currency_code: 'EUR',
                },
              },
            ],
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            alert('Pago completado por ' + details.payer.name.given_name);
            realizarCheckout(); // Llamada real al backend
          });
        },
      }).render('#paypal-button-container');
    }
  }, [metodoSeleccionado, aceptaTerminos, productosDelCarrito]);

  return (
    <div>
      <div className="payment-container">
      <div className="metodo-pago-container">
        <h3>Dirección de Envío</h3>
        {direccionEnvio && (
          <div className="direccion-envio">
            <div className="direccion-detalles">
              <p><strong>Nombre:</strong> {direccionEnvio.nombre}</p>
              <p><strong>Dirección:</strong> {direccionEnvio.direccion}</p>
              <p><strong>Ciudad:</strong> {direccionEnvio.ciudad}</p>
              <p><strong>Código Postal:</strong> {direccionEnvio.codigo_postal}</p>
              <p><strong>Teléfono:</strong> {direccionEnvio.telefono}</p>
            </div>
            <div className="direccion-modificar">
              <a href="/CestaEnvio">Modificar datos</a>
            </div>
          </div>
        )}
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

            <div className={`paypal-desplegable ${metodoSeleccionado === 'paypal' ? 'activo' : ''}`}>
              <label className="terminos-label">
                <input
                  className="paypal-personalizado"
                  type="checkbox"
                  checked={aceptaTerminos}
                  onChange={() => setAceptaTerminos(!aceptaTerminos)}
                />
                <span>
                  Mediante la validación de mi pedido, acepto y confirmo que he leído todas las{" "}
                  <a href="/condiciones" target="_blank" rel="noopener noreferrer">condiciones generales de venta</a>
                </span>
              </label>

              {/* Botón de PayPal solo se muestra si acepta los términos */}
              {aceptaTerminos && (
                <div id="paypal-button-container"></div>
              )}
            </div>
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
            <img src="/Imagenes/MetodoPago/Pay.png" alt="Apple Pay" />
          </div>
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
    </div>
  );
};

export default Payment;

