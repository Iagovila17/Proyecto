import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AdminSidebar from '../../../admin/sidebar/Sidebar';
import './AdminNewProduct.css';

const AgregarProducto = () => {
  const { categoria, familia } = useParams<{ categoria: string; familia: string }>();

  const [producto, setProducto] = useState({
    nombre: '',
    familia: familia || '',
    referencia: '',
    composicion: '',
    descripcion: '',
    cuidados: '',
    precio: '',
    stock: '',
    imagen: '',
    imagen2: '',
    imagen3: '',
    color: '',
    categoria: categoria || '',
    tamaño: [] as string[],
  });

  useEffect(() => {
    if (categoria) {
      setProducto(prev => ({ ...prev, categoria: categoria.toUpperCase() }));
    }
    if (familia) {
      setProducto(prev => ({ ...prev, familia: familia.toUpperCase() }));
    }
  }, [categoria, familia]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setProducto((prevProducto) => {
        const updatedTamaño = checked
          ? [...prevProducto.tamaño, value]
          : prevProducto.tamaño.filter((size) => size !== value);
        return { ...prevProducto, tamaño: updatedTamaño };
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

      setProducto({
        nombre: '',
        familia: familia || '',
        referencia: '',
        composicion: '',
        descripcion: '',
        cuidados: '',
        precio: '',
        stock: '',
        imagen: '',
        imagen2: '',
        imagen3: '',
        color: '',
        categoria: categoria || '',
        tamaño: [],
      });
    } catch (error) {
      console.error('Error al guardar el producto:', error);
      alert('Error al guardar el producto');
    }
  };

  const allSizes = {
    XS: ['XS'],
    S: ['S'],
    M: ['M'],
    L: ['L'],
    XL: ['XL'],
    XXL: ['XXL'],
    T34: ['34'],
    T35: ['35'],
    T36: ['36'],
    T37: ['37'],
    T38: ['38'],
    T39: ['39'],
    T40: ['40'],
    T41: ['41'],
    T42: ['42'],
    T43: ['43'],
    T44: ['44'],
    EU36: ['36'],
    EU37: ['37'],
    EU38: ['38'],
    EU39: ['39'],
    EU40: ['40'],
    EU41: ['41'],
    EU42: ['42'],
    EU43: ['43'],
    EU44: ['44'],
    EU45: ['45'],
    DEFAULT: ['DEFAULT'],
  };

  const sizeCategories = [
    { name: 'XS-XXL', sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
    { name: 'Tallas (T)', sizes: ['T34', 'T35', 'T36', 'T37', 'T38', 'T39', 'T40', 'T41', 'T42', 'T43', 'T44'] },
    { name: 'EU Tallas', sizes: ['EU36', 'EU37', 'EU38', 'EU39', 'EU40', 'EU41', 'EU42', 'EU43', 'EU44', 'EU45'] },
    { name: 'Default', sizes: ['DEFAULT'] },
  ];

  return (
    <div className="usuarios-container">
      <AdminSidebar />
      <div className="usuarios-main">
        <h2 className="titulo-agregar">Agregar producto - {categoria} / {familia}</h2>
        <form onSubmit={handleSubmit} className="formulario-agregar">
          <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
          <div className="categoria-familia-container">
            <div className="input-container">
              <label>Categoría:</label>
              <input type="text" name="categoria" value={producto.categoria} readOnly />
            </div>
            <div className="input-container">
              <label>Familia:</label>
              <input type="text" name="familia" value={producto.familia} readOnly />
            </div>
          </div>
          <input type="text" name="referencia" placeholder="Referencia" onChange={handleChange} required />
          <input type="text" name="composicion" placeholder="Composición" onChange={handleChange} required />
          <textarea name="descripcion" placeholder="Descripción" onChange={handleChange} required />
          <textarea name="cuidados" placeholder="Cuidados" onChange={handleChange} required />
          <input type="number" step="0.01" name="precio" placeholder="Precio" onChange={handleChange} required />
          <input type="number" name="stock" placeholder="Stock" onChange={handleChange} required />
          <div className="image-inputs-container">
            <div className="input-container">
                <label>Imagen Principal:</label>
                <input type="text" name="imagen"  placeholder="URL imagen principal" onChange={handleChange} required  />
            </div>
            <div className="input-container">
                <label>Imagen 2 (Opcional):</label>
                <input type="text" name="imagen2"  placeholder="URL imagen 2 (opcional)" onChange={handleChange}  />
            </div>
            <div className="input-container">
                <label>Imagen 3 (Opcional):</label>
                <input type="text" name="imagen3"  placeholder="URL imagen 3 (opcional)" onChange={handleChange}  />
            </div>
          </div>
          <input type="text" name="color" placeholder="Color" onChange={handleChange} required />

          <div className="tallas-container">
            <label>Tallas disponibles:</label>
            <div className="size-selection-container">
              {sizeCategories.map((category) => (
                <div key={category.name} className="size-category-group">
                  <p className="size-category-name">{category.name}</p>
                  <div className="size-options">
                    {category.sizes.map((sizeKey) => {
                      const sizeLabel = allSizes[sizeKey as keyof typeof allSizes][0] || sizeKey;
                      return (
                        <div key={sizeKey} className="size-option">
                          <input
                            type="checkbox"
                            name="tamaño"
                            value={sizeLabel}
                            checked={producto.tamaño.includes(sizeLabel)}
                            onChange={handleChange}
                          />
                          <label>{sizeLabel}</label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button type="submit">Guardar</button>
        </form>
      </div>
    </div>
  );
};

export default AgregarProducto;
