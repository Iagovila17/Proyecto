import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

const ConfirmEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState("Confirmando cuenta...");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Token de confirmación no proporcionado.");
      setMessage("");
      return;
    }

    // Redirigir el navegador a la URL backend para confirmar cuenta
    window.location.href = `http://92.168.68.100:8080/auth/confirm?token=${token}`;
  }, [token]);

  return (
    <div className="confirm-email-container">
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      {/* Solo mostrar botón si hay error */}
      {error && (
        <Link to="/login">
          <button>Ir a Iniciar Sesión</button>
        </Link>
      )}
    </div>
  );
};

export default ConfirmEmail;
