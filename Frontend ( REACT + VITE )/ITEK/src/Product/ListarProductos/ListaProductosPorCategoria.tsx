import { useParams, Link } from 'react-router-dom';
 import { useEffect, useState } from 'react';
 import axios from 'axios';
 import Navsecundario from '../../component/Navsecundario/Navsecundario';
 import './ListaProductosPorCategoria.css'; // Asegúrate de tener este archivo CSS para estilos

 const ListaProductosPorCategoria = () => {
  const { categoria, familia } = useParams();
  const [productos, setProductos] = useState([]);
  const [columnas, setColumnas] = useState(2); // valor por defecto: 2 columnas

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await axios.get(`http://192.168.68.100:8080/Product/byCategoriaFamilia`, {
          params: {
            categoria: categoria?.toUpperCase(),
            familia: familia?.toUpperCase()
          }
        });
        setProductos(res.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProductos();
  }, [categoria, familia]);

  const getWidth = () => {
    switch (columnas) {
      case 2: return '48%';
      case 4: return '23%';
      case 6: return '15%';
      default: return '48%'; // fallback
    }
  };

  return (
    <div>
      <Navsecundario/>
      <div className="selector-columnas">
        <div className='text-vista'>VISTA :</div>
        {[2, 4, 6].map((num) => (
          <button
            key={num}
            onClick={() => setColumnas(num)}
            className={`btn-columna ${columnas === num ? 'activo' : ''}`}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Lista de productos */}
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
      </div>
    </div>
  );
};

export default ListaProductosPorCategoria;