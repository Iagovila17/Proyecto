import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import './Estadistica.css';
import AdminSidebar from '../../../ADMIN/admin/sidebar/Sidebar';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  direccion?: string;
  telefono?: string;
  rol: string;
  fechaRegistro: string; // ISO date string
}

const Estadisticas = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carga datos del backend
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const token = storedUser ? JSON.parse(storedUser).token : null;
        if (!token) {
          window.location.href = '/login';
          return;
        }

        const response = await axios.get<Usuario[]>('http://localhost:8080/User/list', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsuarios(response.data);
        setLoading(false);
      } catch (e) {
        console.error('Error cargando usuarios', e);
        setError('Error al cargar datos de usuarios.');
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  // --- Estadísticas ---

  // Usuarios por rol
  const rolesCount = usuarios.reduce<Record<string, number>>((acc, user) => {
    acc[user.rol] = (acc[user.rol] ?? 0) + 1;
    return acc;
  }, {});

  const rolesData = {
    labels: Object.keys(rolesCount),
    datasets: [
      {
        label: 'Usuarios por rol',
        data: Object.values(rolesCount),
        backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e'],
      },
    ],
  };

 const hoy = new Date();
const mesActual = hoy.getMonth();    // 0 = enero
const añoActual = hoy.getFullYear();

// Obtener días en el mes actual
const diasEnMes = new Date(añoActual, mesActual + 1, 0).getDate();

// Crear etiquetas del día 1 al último día del mes
const diasLabels = Array.from({ length: diasEnMes }, (_, i) => {
  const d = new Date(añoActual, mesActual, i + 1);
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
});

// Inicializar el array de registros diarios
const registrosPorDia = Array(diasEnMes).fill(0);

// Contar registros por día del mes actual
usuarios.forEach((u) => {
  const fecha = new Date(u.fechaRegistro);
  if (fecha.getMonth() === mesActual && fecha.getFullYear() === añoActual) {
    registrosPorDia[fecha.getDate() - 1]++;
  }
});

const registrosDiaData = {
  labels: diasLabels,
  datasets: [
    {
      label: `Nuevos registros en ${diasLabels[0].split(' ')[1]} ${añoActual}`,
      data: registrosPorDia,
      borderColor: '#4e73df',
      backgroundColor: 'rgba(78, 115, 223, 0.2)',
      fill: true,
      tension: 0.3,
    },
  ],
};

  // Usuarios por dominio de email (top 5 + otros)
  const dominiosCount: Record<string, number> = {};
  usuarios.forEach(({ email }) => {
    const dominio = email.split('@')[1]?.toLowerCase() || 'Desconocido';
    dominiosCount[dominio] = (dominiosCount[dominio] ?? 0) + 1;
  });

  const sortedDominios = Object.entries(dominiosCount)
    .sort((a, b) => b[1] - a[1]);

  const topDominios = sortedDominios.slice(0, 5);
  const otrosCount = sortedDominios.slice(5).reduce((acc, [, count]) => acc + count, 0);

  const dominiosLabels = topDominios.map(([dominio]) => dominio).concat(otrosCount > 0 ? ['Otros'] : []);
  const dominiosDataValues = topDominios.map(([, count]) => count).concat(otrosCount > 0 ? [otrosCount] : []);

  const dominiosData = {
    labels: dominiosLabels,
    datasets: [
      {
        label: 'Usuarios por dominio de email',
        data: dominiosDataValues,
        backgroundColor: ['#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796', '#6c757d'],
        hoverOffset: 30,
      },
    ],
  };

  // Totales para tarjetas
  const totalUsuarios = usuarios.length;
  const totalAdmins = rolesCount['ADMIN'] ?? 0;

  if (loading) return <p>Cargando estadísticas...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="page-container">
  <AdminSidebar />
  <div className="estadisticas-container">
      <h1>Estadísticas de Usuarios</h1>

      <div className="estadisticas-totales">
        <div className="tarjeta-total total-usuarios">
          <h3>Total Usuarios</h3>
          <p>{totalUsuarios}</p>
        </div>
        <div className="tarjeta-total total-admins">
          <h3>Total Administradores</h3>
          <p>{totalAdmins}</p>
        </div>
      </div>

      <div className="graficos-container">
        <div className="grafico-item">
          <Bar data={rolesData} options={{
            responsive: true,
            plugins: { legend: { position: 'top' }, title: { display: true, text: 'Usuarios por Rol' } },
          }} />
        </div>

        <div className="grafico-item">
          <Line data={registrosDiaData} options={{
            responsive: true,
            plugins: { legend: { position: 'top' }, title: { display: true, text: 'Nuevos registros por día' } },
          }} />
        </div>

        <div className="grafico-item">
          <Pie data={dominiosData} options={{
            responsive: true,
            plugins: { legend: { position: 'right' }, title: { display: true, text: 'Usuarios por Dominio de Email' } },
          }} />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Estadisticas;
