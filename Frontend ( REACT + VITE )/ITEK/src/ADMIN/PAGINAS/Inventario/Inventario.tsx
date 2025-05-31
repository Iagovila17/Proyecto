import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from '../../admin/sidebar/Sidebar';
import './Inventario.css';

const baseUrl = import.meta.env.VITE_API_URL;

interface Product {
  id: number;
  referencia: string;
  nombre: string;
  stock: number;
}

const Inventario: React.FC = () => {
  const [productos, setProductos] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);
  const [filtroReferencia, setFiltroReferencia] = useState<string>('');
  const [paginaActual, setPaginaActual] = useState<number>(1);

  const productosPorPagina = 12;

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = storedUser ? JSON.parse(storedUser).token : null;

    if (!token) {
      setError('No hay token de autenticación. Por favor inicia sesión.');
      setCargando(false);
      return;
    }

    axios.get(`${baseUrl}/Product/stock`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setProductos(res.data);
        setCargando(false);
      })
      .catch(() => {
        setError('Error al cargar los productos.');
        setCargando(false);
      });
  }, []);

  const actualizarStock = (id: number, nuevoStock: number) => {
    if (nuevoStock < 0) {
      alert('El stock no puede ser negativo.');
      return;
    }

    const storedUser = localStorage.getItem('user');
    const token = storedUser ? JSON.parse(storedUser).token : null;
    if (!token) {
      alert('No hay token de autenticación.');
      return;
    }

    axios.put(`${baseUrl}/Product/stock/${id}`, { stock: nuevoStock }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        setProductos(prev =>
          prev.map(p => p.id === id ? { ...p, stock: res.data.stock } : p)
        );
        alert('Stock actualizado correctamente');
      })
      .catch(() => {
        alert('Error al actualizar el stock');
      });
  };

  const productosFiltrados = productos.filter(producto =>
    producto.referencia.toLowerCase().includes(filtroReferencia.toLowerCase())
  );

  const indexInicio = (paginaActual - 1) * productosPorPagina;
  const indexFin = indexInicio + productosPorPagina;
  const productosPaginados = productosFiltrados.slice(indexInicio, indexFin);
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  const cambiarPagina = (nuevaPagina: number) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  if (cargando) return <p className="contenido-principal">Cargando productos...</p>;
  if (error) return <p className="contenido-principal text-danger">{error}</p>;

  return (
    <div className="stock-admin-container">
      <AdminSidebar />
      <div className="contenido-principal">
        <h2>Gestión de Stock de Productos</h2>

        <input
          type="text"
          placeholder="Buscar por referencia..."
          value={filtroReferencia}
          onChange={(e) => {
            setFiltroReferencia(e.target.value);
            setPaginaActual(1); // Reiniciar a página 1 al filtrar
          }}
          className="input-busqueda"
        />

        <table className='tabla-productos-stock'>
          <thead>
            <tr>
              <th>Referencia</th>
              <th>Nombre</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosPaginados.map(producto => (
              <tr key={producto.id}>
                <td>{producto.referencia}</td>
                <td>{producto.nombre}</td>
                <td>
                  <input
                    type="number"
                    min={0}
                    value={producto.stock}
                    onChange={e => {
                      const nuevoStock = Number(e.target.value);
                      setProductos(prev =>
                        prev.map(p =>
                          p.id === producto.id ? { ...p, stock: nuevoStock } : p
                        )
                      );
                    }}
                  />
                </td>
                <td>
                  <button onClick={() => actualizarStock(producto.id, producto.stock)}>
                    Guardar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="paginacion">
          <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
            Anterior
          </button>
          {Array.from({ length: totalPaginas }, (_, i) => (
            <button
              key={i + 1}
              className={paginaActual === i + 1 ? 'pagina-activa' : ''}
              onClick={() => cambiarPagina(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inventario;
