import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminSidebar from '../../../admin/sidebar/Sidebar';
import './EditarProductos.css';

interface Producto {
  id: number;
  nombre: string;
  familia: string;
  referencia: string;
  composicion: string;
  descripcion: string;
  cuidados: string;
  precio: number | string;
  stock: number | string;
  imagen: string;
  imagen2?: string;
  imagen3?: string;
  color: string;
  categoria: string;
  tamaño: string[];
}

const EditarProductos: React.FC = () => {
  const { categoria, familia, id } = useParams<{ categoria: string; familia: string; id: string }>();
  const navigate = useNavigate();

  const [producto, setProducto] = useState<Producto>({
    id: 0,
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

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const token = storedUser ? JSON.parse(storedUser).token : null;
        if (!token) throw new Error('Token no encontrado');

        const response = await axios.get(`http://192.168.68.100:8080/Product/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data;

        setProducto({
          ...data,
          precio: data.precio?.toString() || '',
          stock: data.stock?.toString() || '',
          tamaño: Array.isArray(data.tamaño) ? data.tamaño : [],
          imagen2: data.imagen2 || '',
          imagen3: data.imagen3 || '',
        });
      } catch (err) {
        console.error(err);
        setError('Error al cargar el producto.');
      } finally {
        setCargando(false);
      }
    };

    fetchProducto();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setProducto((prev) => {
        const newTamaño = checked
          ? Array.from(new Set([...prev.tamaño, value]))
          : prev.tamaño.filter((t) => t !== value);
        return { ...prev, tamaño: newTamaño };
      });
    } else {
      setProducto({ ...producto, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const storedUser = localStorage.getItem('user');
      const token = storedUser ? JSON.parse(storedUser).token : null;
      if (!token) {
        alert('No se encontró el token de autenticación.');
        return;
      }

      const dataToSend = {
        ...producto,
        precio: parseFloat(producto.precio as string),
        stock: parseInt(producto.stock as string),
      };

      await axios.put(`http://192.168.68.100:8080/Product/${producto.id}`, dataToSend, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Producto actualizado exitosamente');
      navigate(`/admin/productos/${producto.categoria}/${producto.familia}/listado`);
    } catch (err: any) {
      console.error(err);
      const msg = err.response?.data?.message || 'Error al actualizar el producto';
      alert(msg);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`¿Estás seguro de eliminar el producto "${producto.nombre}"?`)) return;

    try {
      const storedUser = localStorage.getItem('user');
      const token = storedUser ? JSON.parse(storedUser).token : null;
      if (!token) {
        alert('No se encontró el token de autenticación.');
        return;
      }

      await axios.delete(`http://192.168.68.100:8080/Product/${producto.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Producto eliminado correctamente');
      navigate(`/admin/productos/${producto.categoria}/${producto.familia}/listado`);
    } catch (err: any) {
      console.error(err);
      const msg = err.response?.data?.message || 'Error al eliminar el producto';
      alert(msg);
    }
  };

  const allSizes = {
    XS: 'XS',
    S: 'S',
    M: 'M',
    L: 'L',
    XL: 'XL',
    XXL: 'XXL',
    T34: 'T34',
    T35: 'T35',
    T36: 'T36',
    T37: 'T37',
    T38: 'T38',
    T39: 'T39',
    T40: 'T40',
    T41: 'T41',
    T42: 'T42',
    T43: 'T43',
    T44: 'T44',
    EU36: 'EU36',
    EU37: 'EU37',
    EU38: 'EU38',
    EU39: 'EU39',
    EU40: 'EU40',
    EU41: 'EU41',
    EU42: 'EU42',
    EU43: 'EU43',
    EU44: 'EU44',
    EU45: 'EU45',
    DEFAULT: 'DEFAULT',
  };

  const sizeCategories = [
    { name: 'XS-XXL', sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
    {
      name: 'Tallas (T)',
      sizes: ['T34', 'T35', 'T36', 'T37', 'T38', 'T39', 'T40', 'T41', 'T42', 'T43', 'T44'],
    },
    {
      name: 'EU Tallas',
      sizes: ['EU36', 'EU37', 'EU38', 'EU39', 'EU40', 'EU41', 'EU42', 'EU43', 'EU44', 'EU45'],
    },
    { name: 'Default', sizes: ['DEFAULT'] },
  ];

  if (cargando)
    return (
      <div className="usuarios-container">
        <AdminSidebar />
        <div className="usuarios-main">
          <p>Cargando producto...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="usuarios-container">
        <AdminSidebar />
        <div className="usuarios-main">
          <p className="error">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="usuarios-container">
      <AdminSidebar />
      <div className="usuarios-main">
        <h2 className="titulo-agregar">
          Editar producto - {categoria?.toUpperCase()} / {familia?.toUpperCase()}
        </h2>
        <form onSubmit={handleSubmit} className="formulario-agregar">
          <input type="text" name="nombre" placeholder="Nombre" value={producto.nombre} onChange={handleChange} required />

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

          <input type="text" name="referencia" placeholder="Referencia" value={producto.referencia} onChange={handleChange} required />
          <input type="text" name="composicion" placeholder="Composición" value={producto.composicion} onChange={handleChange} required />
          <textarea name="descripcion" placeholder="Descripción" value={producto.descripcion} onChange={handleChange} required />
          <textarea name="cuidados" placeholder="Cuidados" value={producto.cuidados} onChange={handleChange} required />
          <input type="number" step="0.01" name="precio" placeholder="Precio" value={producto.precio} onChange={handleChange} required />
          <input type="number" name="stock" placeholder="Stock" value={producto.stock} onChange={handleChange} required />

          <div className="image-inputs-container">
            <div className="input-container">
              <label>Imagen Principal:</label>
              <input type="text" name="imagen" placeholder="URL imagen principal" value={producto.imagen} onChange={handleChange} required />
            </div>
            <div className="input-container">
              <label>Imagen 2 (Opcional):</label>
              <input type="text" name="imagen2" placeholder="URL imagen 2" value={producto.imagen2} onChange={handleChange} />
            </div>
            <div className="input-container">
              <label>Imagen 3 (Opcional):</label>
              <input type="text" name="imagen3" placeholder="URL imagen 3" value={producto.imagen3} onChange={handleChange} />
            </div>
          </div>

          <input type="text" name="color" placeholder="Color" value={producto.color} onChange={handleChange} required />

          <div className="tallas-container-admin">
            <label>Tallas disponibles:</label>
            <div className="size-selection-container">
              {sizeCategories.map((category) => (
                <div key={category.name} className="size-category-group">
                  <p className="size-category-name">{category.name}</p>
                  <div className="size-options">
                    {category.sizes.map((sizeKey) => {
                      const sizeLabel = allSizes[sizeKey as keyof typeof allSizes] || sizeKey;
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

          <button type="submit" className="btn-guardar">Guardar</button>
          <button type="button" onClick={handleDelete} className="btn-eliminar">Eliminar</button>

        </form>
      </div>
    </div>
  );
};

export default EditarProductos;
