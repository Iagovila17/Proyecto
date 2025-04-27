import { useEffect, useState } from 'react';

const Cesta = () => {
  const [tieneProductos, setTieneProductos] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCesta();
  }, []);

  const fetchCesta = async () => {
    try {
      // Obtener el token desde localStorage
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        setError('No estás autenticado. Redirigiendo al login...');
        window.location.href = "/login";  // Redirige al login si no hay usuario en localStorage
        return;
      }

      const token = JSON.parse(storedUser).token; // Obtener el token del usuario almacenado
      const response = await fetch('http://localhost:8080/cesta', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Token en los headers
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        // Si la respuesta no es exitosa
        console.log('Error en la solicitud', response);
        setError("No se pudo obtener la cesta");
        return;
      }

      // Procesar la respuesta exitosa
      const data = await response.json();
      setTieneProductos(data.tieneProductos);  // Aquí asumimos que la respuesta contiene la propiedad 'tieneProductos'
      
    } catch (error) {
      console.error(error);
      setError('Error de conexión');
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {tieneProductos === null ? (
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
