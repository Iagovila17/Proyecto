import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Search.css";

const baseUrl = import.meta.env.VITE_API_URL;

export default function Search({ familia }: { familia: string }) {
  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState("MUJER");
  const [resultados, setResultados] = useState([]);
  

  const buscar = async () => {
    try {
      if (query.trim() === "") {
        setResultados([]);
        return;
      }
      const res = await axios.get(`${baseUrl}/Product/search`, {
        params: { query, categoria },
      });
      setResultados(res.data);
    } catch (err) {
      console.error("Error en búsqueda:", err);
      setResultados([]);
    }
  };

  const handleCategoriaClick = (nuevaCategoria: string) => {
    setCategoria(nuevaCategoria);
    if (query.trim() !== "") {
      buscarConParametros(query, nuevaCategoria);
    }
  };

  const buscarConParametros = async (q: string, cat: string) => {
    try {
      const res = await axios.get(`${baseUrl}/Product/search`, {
        params: { query: q, categoria: cat },
      });
      setResultados(res.data);
    } catch (err) {
      console.error("Error en búsqueda:", err);
      setResultados([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    buscar();
  };

  useEffect(() => {
    setResultados([]);
  }, []);

  return (
    <div>
      <div className="sidebar-busqueda">
        {["MUJER", "HOMBRE", "NIÑOS"].map((cat) => (
          <div
            key={cat}
            className={`sidebar-item ${categoria === cat ? "selected" : ""}`}
            onClick={() => handleCategoriaClick(cat)}
          >
            {cat}
          </div>
        ))}
      </div>

      <div className="search-page">
        <main className="contenido-busqueda">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Buscar productos..."
              autoComplete="off"
            />
          </form>
        </main>
      </div>

      <div className="resultados-busqueda">
        {resultados.length > 0 ? (
          resultados.map((producto: any) => (
            <div key={producto.id} className="producto-search">
              <Link to={`/${categoria}/${familia}/ProductDetail/${producto.id}`}>                <img src={producto.imagen} alt={producto.nombre} />
              </Link>
              <div>{producto.nombre}</div>
              <div>{producto.precio} EUR</div>
            </div>
          ))
        ) : (
          <div>No se encontraron productos</div>
        )}
      </div>
    </div>
  );
}
