import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ConfirmEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const error = params.get("error");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/login", { replace: true });
    } else if (error) {
      alert("Error al confirmar cuenta: " + error);
      navigate("/login", { replace: true });
    } else {
      alert("Token no proporcionado");
      navigate("/login", { replace: true });
    }
  }, [location, navigate]);

  return (
    <div>
      <p>Confirmando cuenta...</p>
    </div>
  );
};

export default ConfirmEmail;
