import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from '../../admin/sidebar/Sidebar';
import './Usuarios.css';

const Usuarios = () => {
  interface Usuario {
    id: number;
    nombre: string;
    email: string;
    direccion: string;
    telefono: string;
    rol: string;
    fechaRegistro: string;
  }

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [paginaActual, setPaginaActual] = useState<number>(1);
  const usuariosPorPagina = 10;

  // Roles permitidos para cambiar
  const rolesDisponibles = ['USER', 'ADMIN'];

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = storedUser ? JSON.parse(storedUser).token : null;

    if (!token) {
      window.location.href = '/login';
      return;
    }

    axios.get('http://localhost:8080/User/list', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((response) => {
      setUsuarios(response.data);
    })
    .catch((error) => {
      console.error('Error al traer usuarios: ', error);
    });
  }, []);

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (confirmDelete) {
      const storedUser = localStorage.getItem('user');
      const token = storedUser ? JSON.parse(storedUser).token : null;

      if (!token) {
        alert('No se encontró el token de autenticación.');
        return;
      }

      axios.delete(`http://localhost:8080/User/delete/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(() => {
        const nuevosUsuarios = usuarios.filter((usuario) => usuario.id !== id);
        setUsuarios(nuevosUsuarios);

        const maxPag = Math.ceil(nuevosUsuarios.length / usuariosPorPagina);
        if (paginaActual > maxPag) {
          setPaginaActual(maxPag);
        }

        alert('Usuario eliminado exitosamente');
      })
      .catch((error) => {
        console.error('Error al eliminar el usuario:', error);
        alert('Hubo un error al eliminar el usuario.');
      });
    }
  };

  const handleChangeRole = (id: number, nuevoRol: string) => {
  const storedUser = localStorage.getItem('user');
  const token = storedUser ? JSON.parse(storedUser).token : null;

  if (!token) {
    alert('No se encontró el token de autenticación.');
    return;
  }

  axios.put(`http://localhost:8080/User/updateRole/${id}`, JSON.stringify(nuevoRol), {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  .then(() => {
    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((usuario) =>
        usuario.id === id ? { ...usuario, rol: nuevoRol } : usuario
      )
    );
    alert('Rol actualizado correctamente');
  })
  .catch((error) => {
    console.error('Error al actualizar el rol:', error);
    alert('Error al actualizar el rol');
  });
};


  const totalPaginas = Math.ceil(usuarios.length / usuariosPorPagina);
  const indiceInicio = (paginaActual - 1) * usuariosPorPagina;
  const usuariosVisibles = usuarios.slice(indiceInicio, indiceInicio + usuariosPorPagina);

  const siguientePagina = () => {
    if (paginaActual < totalPaginas) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const anteriorPagina = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  return (
    <div className="usuarios-container">
      <AdminSidebar />
      <div className="usuarios-main">
        <h1>Usuarios Registrados</h1>
        {usuariosVisibles.length > 0 ? (
          <>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Dirección</th>
                  <th>Teléfono</th>
                  <th>Rol</th>
                  <th>Fecha de Registro</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {usuariosVisibles.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.direccion}</td>
                    <td>{usuario.telefono}</td>
                    <td>
                      <select
                        value={usuario.rol}
                        onChange={(e) => handleChangeRole(usuario.id, e.target.value)}
                      >
                        {rolesDisponibles.map((rol) => (
                          <option key={rol} value={rol}>
                            {rol}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>{usuario.fechaRegistro}</td>
                    <td>
                      <button onClick={() => handleDelete(usuario.id)} className="eliminar">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="paginacion">
              <button onClick={anteriorPagina} disabled={paginaActual === 1}>Anterior</button>
              <span>Página {paginaActual} de {totalPaginas}</span>
              <button onClick={siguientePagina} disabled={paginaActual === totalPaginas}>Siguiente</button>
            </div>
          </>
        ) : (
          <p className="no-usuarios">No hay usuarios registrados.</p>
        )}
      </div>
    </div>
  );
};

export default Usuarios;
