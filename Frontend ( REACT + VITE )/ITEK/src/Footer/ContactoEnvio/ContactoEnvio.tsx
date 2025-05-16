import React from "react";
import "./ContactoEnvio.css"

const ContactoEnvio: React.FC = () => (
    <div className="contacto-envio-container">
    <h1 className="contacto-envio-title">Contacto y Envío - ITEK</h1>

    <section className="contacto">
      <h2 className="seccion-titulo">Contacto</h2>
      <p className="contacto-intro">
        ¿Tienes alguna pregunta, comentario o necesitas ayuda? No dudes en ponerte
        en contacto con nuestro equipo de atención al cliente.
      </p>
      <ul className="contacto-lista">
        <li>
          <strong>Correo Electrónico:</strong>{" "}
          <a href="mailto:[itek@gmail.com]">
            itek@gmail.com
          </a>
        </li>
        <li>
          <strong>Teléfono:</strong>{" "}
          <a href="tel:[881059322]">
            881059322
          </a>
        </li>
        <li>
          <strong>Formulario de Contacto:</strong>{" "}
          <a href="[Enlace al formulario de contacto]" target="_blank" rel="noopener noreferrer">
            [Enlace al formulario de contacto]
          </a>
        </li>
        <li>
          <strong>Dirección (Oficinas Centrales - No para devoluciones):</strong>{" "}
          [Rua Boa Vista Nª4]
        </li>
        <li>
          <strong>Horario de Atención al Cliente:</strong> Lunes a Viernes, [9.00 AM] - [6.00 PM] (CEST)
        </li>
      </ul>
    </section>

    <section className="envio">
      <h2 className="seccion-titulo">Información de Envío</h2>
      <p className="envio-intro">
        Aquí encontrarás detalles sobre nuestras opciones de envío, costos y
        plazos de entrega.
      </p>

      <div className="opciones-envio">
        <div className="tipo-envio">
          <h3>Envío a Tienda ITEK</h3>
          <ul>
            <li>
              <span className="free">GRATUITO</span>
            </li>
            <li>Plazo de entrega: 2-3 días laborables.</li>
          </ul>
        </div>

        <div className="tipo-envio">
          <h3>Envío a Domicilio</h3>
          <ul>
            <li>Entrega Estándar: 0 EUR - Plazo de entrega: 2-3 días laborables.</li>
            <li>Entrega Urgente: 4,99 EUR EUR - Plazo de entrega: 1 día laborable (pedidos antes de 12.00 AM).</li>
            <li className="important">
              Envío <span className="free">GRATUITO</span> en pedidos superiores a 50 EUR (solo artículos sin descuento).
            </li>
          </ul>
        </div>

        <div className="tipo-envio">
          <h3>Envío a Punto de Entrega</h3>
          <ul>
            <li> 0 EUR - Plazo de entrega: 2-4 días laborables.</li>
            <li className="important">
              Envío <span className="free">GRATUITO</span> en pedidos superiores a 40 EUR (solo artículos sin descuento).
            </li>
          </ul>
        </div>
      </div>

      <p className="informacion-adicional">
        Los plazos de entrega son estimados y pueden variar según la ubicación y
        la disponibilidad del producto. Recibirás un correo electrónico con la
        información de seguimiento una vez que tu pedido haya sido enviado.
      </p>
    </section>
  </div>
);

export default ContactoEnvio;