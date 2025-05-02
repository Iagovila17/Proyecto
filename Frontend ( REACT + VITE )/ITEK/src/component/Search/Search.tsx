import { useState } from "react";
import axios from "axios";
import "./Search.css";

export default function Search() {
  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState("MUJER");
  const [resultados, setResultados] = useState([]);

  const buscar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://192.168.68.100:8080/Product/search", {
        params: { query, categoria },
      });
      setResultados(res.data);
    } catch (err) {
      console.error("Error en búsqueda:", err);
    }
  };

  return (
    <div>
    <div className="sidebar-busqueda">
        {["MUJER", "HOMBRE", "NIÑOS"].map((cat) => (
        <div className="sidebar-item"key={cat} onClick={() => setCategoria(cat)}>{cat}</div>
        ))}
    </div>
    <div className="search-page">
      

      <main className="contenido-busqueda">
      <form onSubmit={buscar}>
        <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos..."
        />
        </form>
      </main>
    </div>
        <div className="resultados-busqueda">
          {resultados.map((producto: any) => (
            <div key={producto.id} className="producto">
              <img src={producto.imagen} alt={producto.nombre} />
              <div>{producto.nombre}</div>
              <div>{producto.precio} EUR</div>
            </div>
          ))}
        </div>
      
    
    </div>
  );
}
