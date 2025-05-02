import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import AdminSidebar from '../../sidebar/Sidebar';
import './AdminNewProduct.css';

const AgregarProducto = () => {
  const { categoria, familia } = useParams();

  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    referencia: '',
    precio: '',
    stock: '',
    imagen: '',
    imagen2: '',
    imagen3: '',
    tamaño: [] as string[],
    color: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;

    if (name === 'tamaño') {
      setProducto((prevProducto) => {
        const updatedTamaño = checked
          ? [...prevProducto.tamaño, value] // Si está marcado, agregarlo al array
          : prevProducto.tamaño.filter((size) => size !== value); // Si no está marcado, eliminarlo
        return { ...prevProducto, [name]: updatedTamaño };
      });
    } else {
      setProducto({ ...producto, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      ...producto,
      precio: parseFloat(producto.precio),
      stock: parseInt(producto.stock),
      categoria: categoria?.toUpperCase(), 
      familia: familia?.toUpperCase()
    };

    try {
      const storedUser = localStorage.getItem('user');
      const token = storedUser ? JSON.parse(storedUser).token : null;

      if (!token) {
        alert('No se encontró el token de autenticación.');
        return;
      }

      await axios.post('http://192.168.68.100:8080/Product/save', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      alert('Producto guardado exitosamente');

      // Limpiar el formulario después de guardar
      setProducto({
        nombre: '',
        descripcion: '',
        referencia: '',
        precio: '',
        stock: '',
        imagen: '',
        imagen2: '',
        imagen3: '',
        tamaño: [],
        color: ''
      });
    } catch (error) {
      console.error('Error al guardar el producto:', error);
      alert('Error al guardar el producto');
    }
  };

  return (
    <div className="usuarios-container">
      <AdminSidebar />
      <div className="usuarios-main">
        <h2 className="titulo-agregar">Agregar producto - {categoria} / {familia}</h2>
        <form onSubmit={handleSubmit} className="formulario-agregar">
          <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
          <textarea name="descripcion" placeholder="Descripción" onChange={handleChange} required />
          <input type="text" name="referencia" placeholder="Referencia" onChange={handleChange} required />
          <input type="number" step="0.01" name="precio" placeholder="Precio" onChange={handleChange} required />
          <input type="number" name="stock" placeholder="Stock" onChange={handleChange} required />
          
          {/* Campo de tallas con checkboxes */}
          <label>Selecciona tallas disponibles:</label>
          <div className="tallas-container">
  <label>Tallas disponibles:</label>

  <div className="fila-tallas">
    {['XXS','XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
      <div key={size} className="checkbox-item">
        <input
          type="checkbox"
          name="tamaño"
          value={size}
          checked={producto.tamaño.includes(size)}
          onChange={handleChange}
        />
        <label>{size}</label>
      </div>
    ))}
  </div>

  <div className="fila-tallas">
    {['36', '37', '38', '39', '40', '41','42', '43', '44'].map((size) => (
      <div key={size} className="checkbox-item">
        <input
          type="checkbox"
          name="tamaño"
          value={size}
          checked={producto.tamaño.includes(size)}
          onChange={handleChange}
        />
        <label>{size}</label>
      </div>
    ))}
  </div>
</div>


          <input type="text" name="color" placeholder="Color" onChange={handleChange} required />
          <input type="text" name="imagen" placeholder="URL imagen principal" onChange={handleChange} required />
          <input type="text" name="imagen2" placeholder="URL imagen 2 (opcional)" onChange={handleChange} />
          <input type="text" name="imagen3" placeholder="URL imagen 3 (opcional)" onChange={handleChange} />
          
          <button type="submit">Guardar</button>
        </form>
      </div>
    </div>
  );
};

export default AgregarProducto;
