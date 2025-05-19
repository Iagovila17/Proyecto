import React from 'react';
import AdminSidebar from '../../admin/sidebar/Sidebar';

const TerminosCondiciones: React.FC = () => {
  return (
  <div className="promociones-container">
      <AdminSidebar />
      <div className="contenido-principal">
        <img
          src="/public\pagina-contruccion.png"
          alt="Página en construcción"
          className="imagen-construccion"
        />
      </div>
    </div>
  );
};

export default TerminosCondiciones;
