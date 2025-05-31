import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from '../../../admin/sidebar/Sidebar';
import './ListaProductos.css';

const baseUrl = import.meta.env.VITE_API_URL;

interface Producto {
  id: number;
  nombre: string;
  referencia: string;
  precio: number;
  stock: number;
  color: string;
  categoria: string;
  familia: string;
  imagen: string;
}

const ListadoProductos = () => {
  const { categoria, familia } = useParams();
  const navigate = useNavigate();

  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState('');

  const obtenerToken = (): string | null => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser).token : null;
  };

  useEffect(() => {
    const fetchProductos = async () => {
      setCargando(true);
      setError(null);
      try {
        const token = obtenerToken();
        if (!token) throw new Error('Token no encontrado');

        const response = await axios.get(`${baseUrl}/Product/listar`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const productosFiltrados = response.data.filter((p: Producto) =>
          p.categoria === categoria?.toUpperCase() && p.familia === familia?.toUpperCase()
        );

        setProductos(productosFiltrados);
      } catch (err: any) {
        console.error('Error al obtener productos:', err);
        setError('No se pudieron cargar los productos.');
      } finally {
        setCargando(false);
      }
    };

    fetchProductos();
  }, [categoria, familia]);

  const productosFiltrados = productos.filter((producto) =>
    producto.referencia.toLowerCase().includes(busqueda.toLowerCase())
  );

  const renderContenido = () => {
    if (cargando) return <p>Cargando productos...</p>;
    if (error) return <p className="error">{error}</p>;
    if (productosFiltrados.length === 0) return <p>No hay productos que coincidan.</p>;

    return (
      <table className="tabla-productos">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre / Referencia</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.map((producto) => (
            <tr key={producto.id}>
              <td>
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }}
                />
              </td>
              <td>
                <strong>{producto.nombre}</strong>
                <br />
                <small style={{ color: '#666' }}>Ref: {producto.referencia}</small>
              </td>
              <td>{producto.precio} €</td>
              <td>{producto.stock}</td>
              <td>
                <button onClick={() => navigate(`/admin/productos/${producto.categoria}/${producto.familia}/editar/${producto.id}`)}>
  Editar
</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="usuarios-container">
      <AdminSidebar />
      <div className="usuarios-main">
        <h2 className="titulo-agregar">
          Productos - {categoria?.toUpperCase()} / {familia?.toUpperCase()}
        </h2>

        <div className="buscador">
          <input
            type="text"
            placeholder="Buscar por referencia..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        {renderContenido()}
      </div>
    </div>
  );
};

export default ListadoProductos;
