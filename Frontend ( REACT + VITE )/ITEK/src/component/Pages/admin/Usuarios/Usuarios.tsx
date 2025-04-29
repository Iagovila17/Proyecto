import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from '../sidebar/Sidebar'; // Asegúrate de que la ruta sea correcta
import './Usuarios.css'; // Importa el archivo CSS

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
      console.log('Usuarios recibidos:', response.data);
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
        setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
        alert('Usuario eliminado exitosamente');
      })
      .catch((error) => {
        console.error('Error al eliminar el usuario:', error);
        alert('Hubo un error al eliminar el usuario.');
      });
    }
  };

  return (
    <div className="usuarios-container">
      <AdminSidebar />
      <div className="usuarios-main">
        <h1>Usuarios Registrados</h1>
        {usuarios.length > 0 ? (
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
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.direccion}</td>
                  <td>{usuario.telefono}</td>
                  <td>{usuario.rol}</td>
                  <td>{usuario.fechaRegistro}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(usuario.id)}
                      className="eliminar"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-usuarios">No hay usuarios registrados.</p>
        )}
      </div>
    </div>
  );
};

export default Usuarios;
