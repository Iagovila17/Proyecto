import { useEffect, useState } from 'react';

const Cesta = () => {
  const [tieneProductos, setTieneProductos] = useState<boolean | null>(null);
  const [error, setError] = useState<string>('');
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    fetchCesta();
  }, []);

  const fetchCesta = async () => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError('No estás autenticado. Redirigiendo al login...');
        window.location.href = "/login";
        return;
      }

      const response = await fetch('http://192.168.68.100:8080/cesta', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
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
      setTieneProductos(data.tieneProductos); // Asegúrate de que tu backend responde con esta propiedad
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
      ) : tieneProductos ? (
        <p>Tienes productos en tu cesta.</p>
      ) : (
        <p>No hay productos en la cesta.</p>
      )}
    </div>
  );
};

export default Cesta;
