import React from "react";
import "./CondicionesCompra.css";

const CondicionesCompra: React.FC = () => (
  <div className="condiciones-compra-container">
    <h1 className="condiciones-compra-title">Condiciones de Compra de ITEK</h1>

    <p className="condiciones-compra-intro">
      Bienvenido a las Condiciones de Compra de ITEK. Al realizar un pedido en
      nuestro sitio web, aceptas los siguientes términos y condiciones. Te rogamos
      que los leas detenidamente antes de realizar tu compra. Si tienes alguna
      pregunta, no dudes en contactar con nuestro equipo de atención al cliente.
    </p>

    <section className="envio">
      <h2 className="seccion-titulo">ENVÍO</h2>
      <div className="opciones-envio">
        <div className="tipo-envio">
          <h3>
            <span className="free">ENVÍO A UNA TIENDA ITEK</span>
          </h3>
          <ul>
            <li>
              <span className="free">GRATUITO</span>
            </li>
            <li>Entrega en 2-3 días laborables.</li>
          </ul>
        </div>

        <div className="tipo-envio">
          <h3>ENVÍO A DOMICILIO</h3>
          <ul>
            <li>Entrega garantizada al día siguiente - <span className="precio">4,99 EUR</span></li>
            <li>Entrega en 2-3 días laborables - <span className="precio">0 EUR</span></li>
            <li className="important">
              El envío será <span className="free">GRATUITO</span> a partir de <span className="important">50 EUR</span> solo para artículos
              sin descuento.
            </li>
            <li>Entrega el mismo día de la compra - <span className="precio">4,99 EUR</span></li>
            <li>
              Entrega el mismo día en <span className="ubicacion">[ A CORUÑA, MADRID, BARCELONA ]</span> para todos los pedidos
              realizados de lunes a viernes antes de las <span className="hora">12 A.M</span>.
            </li>
          </ul>
        </div>

        <div className="tipo-envio">
          <h3>ENVÍO A PUNTO DE ENTREGA</h3>
          <ul>
            <li><span className="precio">30 EUR</span></li>
            <li className="important">
              El envío será <span className="free">GRATUITO</span> a partir de <span className="important">40 EUR</span> solo para artículos
              sin descuento.
            </li>
            <li>Entrega en 2-3 días laborables.</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="cambios-devoluciones">
      <h2 className="seccion-titulo">CAMBIOS Y DEVOLUCIONES</h2>
      <p>
        Dispones de <span className="important">15 días</span> desde la fecha de envío para devolver tu compra
        en <span className="nombre-tienda">ITEK</span>.
      </p>

      <div className="opciones-devolucion">
        <div className="tipo-devolucion">
          <h3>DEVOLUCIÓN EN UNA TIENDA ITEK</h3>
          <ul>
            <li>
              <span className="free">GRATUITO</span>
            </li>
          </ul>
        </div>

        <div className="tipo-devolucion">
          <h3>DEVOLUCIÓN EN UN PUNTO DE ENTREGA</h3>
          <ul>
            <li>
              <span className="free">GRATUITO</span>
            </li>
          </ul>
        </div>

        <div className="tipo-devolucion">
          <h3>RECOGIDA EN DOMICILIO</h3>
          <ul>
            <li><span className="precio">A partir de 50 EUR</span></li>
            <li className="important">
              El coste de la devolución aplica a cada solicitud y se descontará del
              importe reembolsado.
            </li>
          </ul>
        </div>
      </div>
    </section>

    <p className="informacion-adicional">
      Para más información, te sugerimos que visites la sección de{" "}
      <a href="/ayuda" target="_blank" rel="noopener noreferrer">
        Ayuda
      </a>{" "}
      de nuestro sitio web.
    </p>

    <p className="contacto">
      Si tienes alguna pregunta sobre estas Condiciones de Compra, por favor,
      contáctanos a través de <a href="mailto:[itek@gmail.com]">itek@gmail.com</a> o al <a href="tel:[881059322]">881059322</a>.
    </p>
  </div>
);

export default CondicionesCompra;