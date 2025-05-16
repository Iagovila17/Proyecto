import React from "react";
import "./PoliticasPrivacidad.css";

const PoliticaPrivacidad: React.FC = () => (
<div className="politica-privacidad-container">
   <h1 className="politica-privacidad-title">Política de Privacidad de <span className="itek-rojo">ITEK</span></h1>

    <p className="politica-privacidad-last-updated">
      **Fecha de última actualización:** 15 de mayo de 2025
    </p>

    <p className="politica-privacidad-intro">
      En ITEK (en adelante, "ITEK", "nosotros", "nos" o "nuestra"), la privacidad de
      nuestros clientes y visitantes es de suma importancia. Esta Política de
      Privacidad describe cómo recopilamos, utilizamos, compartimos y protegemos tu
      información personal cuando visitas nuestro sitio web{" "}
      <a
        href="/inicio"
        target="_blank"
        rel="noopener noreferrer"
      >
        ITEK
      </a>{" "}
      (en adelante, el "Sitio") y utilizas nuestros servicios de compra de ropa
      online.
    </p>

    <p className="politica-privacidad-read-carefully">
      Te rogamos que leas atentamente esta Política de Privacidad para comprender
      nuestras prácticas con respecto a tu información personal. Al acceder o
      utilizar nuestro Sitio y nuestros servicios, aceptas los términos de esta
      Política de Privacidad.
    </p>

    <h2 className="politica-privacidad-section-title">1. Información que Recopilamos</h2>

    <p className="politica-privacidad-section-content">
      Podemos recopilar diferentes tipos de información personal sobre ti,
      incluyendo:
    </p>

    <h3 className="politica-privacidad-subsection-title">
      Información de Identificación Personal (PII):
    </h3>
    <ul className="politica-privacidad-list">
      <li>
        **Información de contacto:** Nombre, dirección de correo electrónico, número
        de teléfono, dirección de envío y facturación.
      </li>
      <li>
        **Información de la cuenta:** Nombre de usuario, contraseña (encriptada),
        historial de pedidos, preferencias de compra.
      </li>
      <li>
        **Información demográfica (opcional):** Edad, género, preferencias de
        estilo (si nos la proporcionas).
      </li>
    </ul>

    <h3 className="politica-privacidad-subsection-title">Información de Pago:</h3>
    <p className="politica-privacidad-section-content">
      Detalles de la tarjeta de crédito o débito, información de la cuenta de
      PayPal u otros métodos de pago que utilices para realizar compras. Esta
      información se procesa de forma segura por nuestros proveedores de servicios
      de pago y no se almacena directamente en nuestros servidores de forma
      completa.
    </p>

    <h3 className="politica-privacidad-subsection-title">
      Información de Uso del Sitio:
    </h3>
    <ul className="politica-privacidad-list">
      <li>
        **Datos de navegación:** Dirección IP, tipo de navegador, sistema operativo,
        páginas visitadas, tiempo de permanencia en el Sitio, enlaces en los que
        haces clic, sitio web de referencia.
      </li>
      <li>
        **Información del dispositivo:** Tipo de dispositivo, identificadores
        únicos del dispositivo.
      </li>
      <li>
        **Cookies y tecnologías similares:** Utilizamos cookies y otras tecnologías
        de seguimiento para mejorar la funcionalidad del Sitio, personalizar tu
        experiencia y recopilar información sobre cómo utilizas nuestro Sitio.
        Puedes gestionar tus preferencias de cookies a través de la configuración
        de tu navegador. Para más información, consulta nuestra{" "}
        <a href="/configuracion-cookies">
          configuracion-cookies
        </a>
        .
      </li>
    </ul>

    <h3 className="politica-privacidad-subsection-title">Comunicaciones:</h3>
    <p className="politica-privacidad-section-content">
      Registros de nuestras comunicaciones contigo (por ejemplo, correos
      electrónicos de atención al cliente).
    </p>

    <h3 className="politica-privacidad-subsection-title">
      Información de Redes Sociales (si interactúas con nosotros a través de
      ellas):
    </h3>
    <p className="politica-privacidad-section-content">
      Nombre de usuario, información básica de perfil (dependiendo de tu
      configuración de privacidad en la plataforma).
    </p>

    <h3 className="politica-privacidad-subsection-title">
      Información que nos proporcionas voluntariamente:
    </h3>
    <p className="politica-privacidad-section-content">
      Reseñas de productos, comentarios, respuestas a encuestas o concursos.
    </p>

    <h2 className="politica-privacidad-section-title">2. Cómo Utilizamos tu Información</h2>

    <p className="politica-privacidad-section-content">
      Utilizamos tu información personal para diversos fines, incluyendo:
    </p>

    <ul className="politica-privacidad-list">
      <li>
        **Procesar y gestionar tus pedidos:** Confirmar tu pedido, procesar el
        pago, enviar los productos, gestionar devoluciones y cambios.
      </li>
      <li>
        **Gestionar tu cuenta:** Crear y mantener tu cuenta de usuario, recordar
        tus preferencias y historial de pedidos.
      </li>
      <li>
        **Brindar atención al cliente:** Responder a tus preguntas, solucionar
        problemas y ofrecer soporte técnico.
      </li>
      <li>
        **Personalizar tu experiencia:** Mostrarte contenido y productos que
        creemos que podrían interesarte, basándonos en tu historial de compras y
        actividad en el Sitio.
      </li>
      <li>
        **Mejorar nuestro Sitio y servicios:** Analizar cómo utilizas nuestro
        Sitio para identificar áreas de mejora, optimizar el rendimiento y
        desarrollar nuevas funcionalidades.
      </li>
      <li>
        **Marketing y publicidad:** Enviarte correos electrónicos y
        comunicaciones sobre nuevos productos, promociones, ofertas especiales y
        otra información de marketing que pueda ser de tu interés, siempre y
        cuando hayas consentido recibir dichas comunicaciones o tengamos un interés
        legítimo para hacerlo. Puedes optar por no recibir estas comunicaciones en
        cualquier momento.
      </li>
      <li>
        **Seguridad y prevención de fraude:** Proteger nuestro Sitio y a nuestros
        clientes contra el fraude, el acceso no autorizado y otras actividades
        ilegales.
      </li>
      <li>
        **Cumplir con obligaciones legales:** Responder a solicitudes legales,
        cumplir con leyes y regulaciones aplicables.
      </li>
    </ul>
  </div>
);

export default PoliticaPrivacidad;