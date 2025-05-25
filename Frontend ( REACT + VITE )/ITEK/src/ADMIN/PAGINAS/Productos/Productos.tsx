import AdminSidebar from '../../admin/sidebar/Sidebar';
import './Productos.css';

const Productos = () => {
  const categorias = [
  {
    titulo: 'Hombre',
    familias: ['Lino', 'Polo', 'Camiseta', 'Pantalon', 'Zapato', 'Accesorio']
  },
  {
    titulo: 'Mujer',
    familias: ['chaqueta', 'Blusa', 'Falda', 'Vestido', 'Zapato', 'Accesorio']
  },
  {
    titulo: 'NINO',
    familias: ['niña', 'niño', 'bebe']
  }
];

  return (
    <div className="usuarios-container">
      <AdminSidebar />
      <div className="usuarios-main">
        <p className='Gestion-productos'>Gestión de Productos</p>

        {categorias.map((cat, index) => (
          <div key={index} className="categoria-section">
            <h2>{cat.titulo}</h2>
            <table className="tabla-productos">
              <thead>
                <tr>
                  <th>Familia</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cat.familias.map((familia, i) => (
                  <tr key={i}>
                    <td>{familia}</td>
                    <td>
                      <a href={`/admin/productos/${cat.titulo.toLowerCase()}/${familia.toLowerCase()}/listado`}>Ver productos</a>
                      {" | "}
                      <a href={`/admin/productos/${cat.titulo.toLowerCase()}/${familia.toLowerCase()}/nuevo`}>Agregar nuevo</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;
