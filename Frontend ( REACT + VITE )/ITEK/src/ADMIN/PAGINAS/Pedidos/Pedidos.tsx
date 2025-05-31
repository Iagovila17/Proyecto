import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from '../../admin/sidebar/Sidebar';
import './Pedidos.css';

const baseUrl = import.meta.env.VITE_API_URL;

interface Pedido {
  id: number;
  username: string;
  email: string;
  fecha: string;
  total: number;
  estado: string;
}

const estadosDisponibles = ['PENDIENTE', 'EN_PROCESO', 'ENVIADO', 'ENTREGADO', 'CANCELADO', 'DEVUELTO'];

const ITEMS_POR_PAGINA = 10;

const Pedido: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [busquedaID, setBusquedaID] = useState<string>('');
  const [paginaActual, setPaginaActual] = useState<number>(1);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = storedUser ? JSON.parse(storedUser).token : null;

    if (!token) {
      setError('No hay token de autenticación. Por favor inicia sesión.');
      setCargando(false);
      return;
    }

    axios.get(`${baseUrl}/order/admin/orders`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        setPedidos(response.data);
        setCargando(false);
      })
      .catch(error => {
        console.error('Error al obtener pedidos: ', error);
        setError('No se pudieron cargar los pedidos');
        setCargando(false);
      });
  }, []);

  const cambiarEstado = (id: number, nuevoEstado: string) => {
    const storedUser = localStorage.getItem('user');
    const token = storedUser ? JSON.parse(storedUser).token : null;

    if (!token) {
      alert('No se encontró el token de autenticación.');
      return;
    }

    axios.put(`${baseUrl}/order/admin/orders/${id}`, { estado: nuevoEstado }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        setPedidos(prev =>
          prev.map(p => (p.id === id ? { ...p, estado: nuevoEstado } : p))
        );
        alert('Estado actualizado correctamente');
      })
      .catch(error => {
        console.error('Error al cambiar estado:', error);
        alert('No se pudo cambiar el estado');
      });
  };

  const pedidosFiltrados = busquedaID
    ? pedidos.filter(p => p.id.toString().includes(busquedaID))
    : pedidos;

  const indexUltimo = paginaActual * ITEMS_POR_PAGINA;
  const indexPrimero = indexUltimo - ITEMS_POR_PAGINA;
  const pedidosPaginados = pedidosFiltrados.slice(indexPrimero, indexUltimo);

  const totalPaginas = Math.ceil(pedidosFiltrados.length / ITEMS_POR_PAGINA);

  const cambiarPagina = (numPagina: number) => {
    if (numPagina >= 1 && numPagina <= totalPaginas) {
      setPaginaActual(numPagina);
    }
  };

  if (cargando) return <p className="contenido-principal">Cargando pedidos...</p>;
  if (error) return <p className="contenido-principal text-danger">{error}</p>;

  return (
    <div className="pedido-confirmado-container">
      <AdminSidebar />
      <div className="contenido-principal-pedido">
        <h2 className="mb-4">Gestión de Pedidos</h2>

        <input
          type="text"
          placeholder="Buscar por ID"
          value={busquedaID}
          onChange={e => {
            setBusquedaID(e.target.value);
            setPaginaActual(1);
          }}
          className="input-busqueda-order"
        />

        <table className="table-pedidos">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Cambiar Estado</th>
            </tr>
          </thead>
          <tbody>
            {pedidosPaginados.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center' }}>
                  No se encontraron pedidos.
                </td>
              </tr>
            ) : (
              pedidosPaginados.map(pedido => (
                <tr key={pedido.id}>
                  <td>{pedido.id}</td>
                  <td>{pedido.username} ({pedido.email})</td>
                  <td>{new Date(pedido.fecha).toLocaleString()}</td>
                  <td>{pedido.total.toFixed(2)} €</td>
                  <td>{pedido.estado}</td>
                  <td>
                    <select
                      value={pedido.estado}
                      onChange={e => cambiarEstado(pedido.id, e.target.value)}
                      className="form-select"
                    >
                      {estadosDisponibles.map(estado => (
                        <option key={estado} value={estado}>
                          {estado}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {totalPaginas > 1 && (
          <div className="paginacion-order">
            <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
              Anterior
            </button>

            {[...Array(totalPaginas)].map((_, i) => {
              const num = i + 1;
              return (
                <button
                  key={num}
                  className={num === paginaActual ? 'pagina-activa' : ''}
                  onClick={() => cambiarPagina(num)}
                >
                  {num}
                </button>
              );
            })}

            <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pedido;
