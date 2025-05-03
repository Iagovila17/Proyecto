import { useEffect, useState } from 'react';

const Cesta = () => {
  const [productos, setProductos] = useState<any[]>([]);  // Para almacenar los productos de la cesta
  const [error, setError] = useState<string>('');
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    fetchCesta();
  }, []);
  
  const fetchCesta = async () => {
    setCargando(true);
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const token = user.token;
      console.log("Token que se enviará:", token);
  
      const response = await fetch('http://192.168.68.100:8080/cesta', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      });
  
      if (response.status === 403) {
        setError('Acceso denegado. No tienes permiso.');
        return;
      } else if (response.status === 401) {
        setError('Token inválido o expirado. Inicia sesión nuevamente.');
        window.location.href = "/login";
        return;
      } else if (!response.ok) {
        setError('Error desconocido al obtener la cesta.');
        return;
      }
  
      const data = await response.json();
      setProductos(data.productos || []);
    } catch (err) {
      console.error(err);
      setError('Error de conexión con el servidor.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {cargando ? (
        <p>Cargando...</p>
      ) : productos.length > 0 ? (
        <div>
          <h3>Artículos en tu cesta:</h3>
          <ul>
            {productos.map((producto: any, index: number) => (
              <li key={index}>
                <p><strong>{producto.nombre}</strong></p>
                <p>Cantidad: {producto.cantidad}</p>
                <p>Precio: ${producto.precio}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No hay productos en la cesta.</p>
      )}
    </div>
  );
};

export default Cesta;
