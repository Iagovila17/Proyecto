import React, { useState } from "react";
import "./Buscador.css";

const Buscador: React.FC = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(`Buscando: ${query}`);
  };

  return (
    <form onSubmit={handleSearch} className="buscador-web">
      <input
        type="text"
        value={query}
        placeholder="BUSCAR"
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};

export default Buscador;