// Buscador.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Buscador.css";

const Buscador: React.FC = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleFocus = () => {
    navigate("/search");
  };

  return (
    <form className="buscador-web" onSubmit={(e) => e.preventDefault()}>
      <input type="text" value={query} placeholder="BUSCAR" onFocus={handleFocus} onChange={(e) => setQuery(e.target.value)}/>
    </form>
  );
};

export default Buscador;
