import React from "react";
import "./ConfiguracionCookies.css"

const ConfiguracionCookies: React.FC = () =>  (
  <div className="configuracion-cookies">
    <h1>Configuración de Cookies</h1>
    <p>
      En ITEK, nos comprometemos a garantizar la transparencia, seguridad y control sobre tus datos
      personales. Por ello, ponemos a tu disposición esta sección donde puedes gestionar el uso de
      cookies mientras navegas por nuestra tienda online.
    </p>

    <h2>¿Qué son las cookies?</h2>
    <p>
      Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas
      nuestro sitio web. Nos permiten recordar tus preferencias, mejorar tu experiencia de usuario y
      ofrecerte contenidos personalizados, así como recopilar información estadística anónima.
    </p>

    <h2>Tipos de cookies que utilizamos</h2>
    <ul>
      <li>
        <strong>Cookies técnicas:</strong> Son esenciales para el funcionamiento básico del sitio,
        como la navegación o el acceso a áreas seguras.
      </li>
      <li>
        <strong>Cookies de personalización:</strong> Permiten recordar tus preferencias como idioma,
        región o tipo de navegador.
      </li>
      <li>
        <strong>Cookies de análisis:</strong> Nos ayudan a entender cómo interactúan los usuarios con
        nuestro sitio, permitiéndonos mejorar constantemente nuestros servicios.
      </li>
      <li>
        <strong>Cookies publicitarias:</strong> Utilizadas para mostrarte anuncios relevantes y
        adaptados a tus intereses, tanto en nuestro sitio como en otros.
      </li>
    </ul>

    <h2>Gestión de cookies</h2>
    <p>
      Puedes aceptar o rechazar el uso de cookies según tus preferencias. En cualquier momento, tienes
      la posibilidad de modificar tu configuración de cookies accediendo a esta sección o a través de
      la configuración de tu navegador.
    </p>

    <p>
      Ten en cuenta que deshabilitar ciertas cookies podría afectar la funcionalidad y experiencia de
      uso de nuestro sitio web.
    </p>

    <h2>Consentimiento</h2>
    <p>
      Al continuar navegando por nuestro sitio web, aceptas el uso de cookies de acuerdo con la
      presente política, salvo que las hayas deshabilitado.
    </p>

    <p>
      Para más información, puedes consultar nuestra{" "}
      <a href="/politica-privacidad" style={{ color: "red" }}>
        Política de Privacidad
      </a>
      .
    </p>
  </div>
);

export default ConfiguracionCookies;