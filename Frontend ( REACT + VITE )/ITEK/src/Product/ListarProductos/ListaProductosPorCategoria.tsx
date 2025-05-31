import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navsecundario from '../../component/Navsecundario/Navsecundario';
import './ListaProductosPorCategoria.css';

const baseUrl = import.meta.env.VITE_API_URL;

const ListaProductosPorCategoria = () => {
  const { categoria, familia } = useParams();
  const [productos, setProductos] = useState<any[]>([]);
  const [columnas, setColumnas] = useState(2);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await axios.get(`${baseUrl}/Product/byCategoriaFamilia`, {
          params: {
            categoria: categoria?.toUpperCase(),
            familia: familia?.toUpperCase()
          },
          headers: {
            'Accept': 'application/json'
          }
        });
        console.log("Datos recibidos:", res.data);
        if (Array.isArray(res.data)) {
          setProductos(res.data);
        } else if (Array.isArray(res.data.productos)) {
          setProductos(res.data.productos);
        } else {
          console.error("Formato inesperado de respuesta:", res.data);
          setProductos([]);
        }
      } catch (error) {
        console.error('Error al obtener productos:', error);
        setProductos([]);
      }
    };

    fetchProductos();
  }, [categoria, familia]);

  const getWidth = () => {
    switch (columnas) {
      case 1: return '98%';
      case 2: return '48%';
      case 4: return '23%';
      case 6: return '15%';
      default: return '48%';
    }
  };

  const opcionesColumnas = isMobile ? [1, 2] : [2, 4, 6];

  return (
    <div>
      <Navsecundario />
      <div className="selector-columnas">
        <div className='text-vista'>VISTA :</div>
        {opcionesColumnas.map((num) => (
          <button
            key={num}
            onClick={() => setColumnas(num)}
            className={`btn-columna ${columnas === num ? 'activo' : ''}`}
          >
            {num}
          </button>
        ))}
      </div>

      <div className={`lista-product columnas-${columnas}`}>
        {productos.map((producto: any) => (
          <div key={producto.id} className="producto-item" style={{ width: getWidth() }}>
            <Link to={`/${categoria}/${familia}/ProductDetail/${producto.id}`}>
              <img src={producto.imagen} alt={producto.nombre} style={{ width: '100%' }} />
            </Link>
            {columnas !== 6 && (
              <>
                <Link to={`/${categoria}/${familia}/ProductDetail/${producto.id}`}>
                  <h4>{producto.nombre}</h4>
                </Link>
                <p className='precio-item'>{producto.precio} EUR</p>
              </>
            )}
          </div>
        ))}
        {productos.length === 0 && <p style={{ padding: '1rem' }}>No hay productos disponibles.</p>}
      </div>
    </div>
  );
};

export default ListaProductosPorCategoria;
