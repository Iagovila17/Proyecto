import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './Favoritos.css';

interface Producto {
  id?: number | string;
  imagen?: string;
  nombre: string;
  precio: number;
  categoria: string;
  familia: string;
}

const Favoritos: React.FC = () => {
  const { categoria, familia } = useParams<{ categoria: string; familia: string }>();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        let tokenLocal = null;
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          tokenLocal = parsedUser.token;
        }

        if (!tokenLocal) {
          setError('Debes iniciar sesión para ver tus favoritos.');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://192.168.68.100:8080/favoritos', {
          headers: {
            Authorization: `Bearer ${tokenLocal}`,
          },
        });

        setProductos(response.data);
      } catch (err) {
        console.error('Error al obtener favoritos:', err);
        setError('Error al cargar los favoritos. Intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritos();
  }, []);

  if (loading) return <p>Cargando favoritos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="favoritos-container">
      <div className="Cesta-Favoritos">
        <Link to="/cesta" className="Cesta-Enlace">
          CESTA [{productos.length}]
        </Link>
        <Link to="/favoritos" className="Favoritos-Enlace">
          FAVORITOS
        </Link>
      </div>
      {productos.length === 0 ? (
        <p>No tienes productos en favoritos.</p>
      ) : (
        <div className="favoritos-lista">
          {productos.map((producto) => {
            // Usa el categoria y familia del producto si están, si no el del URL params
            const cat = producto.categoria || categoria || '';
            const fam = producto.familia || familia || '';

            return (
              <div key={producto.id ?? producto.nombre} className="favorito-item">
                {producto.imagen && (
                  <Link to={`/${cat}/${fam}/ProductDetail/${producto.id}`}>
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="favorito-imagen"
                    />
                  </Link>
                )}
                <div className="favorito-info">
                  <h3 className="favorito-nombre">
                    <Link to={`/${cat}/${fam}/ProductDetail/${producto.id}`} className="favorito-nombre-link">
                      {producto.nombre}
                    </Link>
                  </h3>
                  <p>{producto.precio.toFixed(2)} EUR</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Favoritos;
