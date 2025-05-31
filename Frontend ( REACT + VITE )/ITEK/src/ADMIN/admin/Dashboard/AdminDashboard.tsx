import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../sidebar/Sidebar'; 
import './AdminDashboard.css'; 
import {
  FaBoxOpen,
  FaChartBar,
  FaShoppingBag,
  FaUsers,
  FaMoneyBillWave,
} from 'react-icons/fa';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();
  const [estadisticas, setEstadisticas] = useState({
    productos: 150,
    pedidos: 75,
    nuevosClientes: 12,
    ingresosHoy: 580.50,
    visitasHoy: 320,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData(parsedUser);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        setUserData(null);
      }
    }

    const obtenerEstadisticas = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setEstadisticas({
        productos: 150,
        pedidos: 75,
        nuevosClientes: 12,
        ingresosHoy: 580.50,
        visitasHoy: 320,
      });
    };

    obtenerEstadisticas();
  }, []);

  const salesData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Ventas (€)',
        data: [120, 150, 90, 180, 110, 200, 160],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const salesOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const topProductsData = {
    labels: ['Camiseta', 'Pantalón', 'Zapatillas', 'Vestido', 'Sudadera'],
    datasets: [
      {
        label: 'Unidades Vendidas',
        data: [85, 60, 72, 50, 95],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const topProductsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const, 
  };

  return (
    <div className="dashboard-container">
      <AdminSidebar />
      <main className="main-content">
        <h1 className='title'>Panel de Administración</h1>
        <div className="dashboard-widgets">
          <div className="widget">
            <div className="widget-icon">
              <FaBoxOpen />
            </div>
            <div className="widget-info">
              <h3>{estadisticas.productos}</h3>
              <p>Productos Totales</p>
            </div>
          </div>

          <div className="widget">
            <div className="widget-icon">
              <FaShoppingBag />
            </div>
            <div className="widget-info">
              <h3>{estadisticas.pedidos}</h3>
              <p>Pedidos Hoy</p>
            </div>
          </div>

          <div className="widget">
            <div className="widget-icon">
              <FaUsers />
            </div>
            <div className="widget-info">
              <h3>{estadisticas.nuevosClientes}</h3>
              <p>Nuevos Clientes Hoy</p>
            </div>
          </div>

          <div className="widget">
            <div className="widget-icon">
              <FaMoneyBillWave />
            </div>
            <div className="widget-info">
              <h3>${estadisticas.ingresosHoy.toFixed(2)}</h3>
              <p>Ingresos Hoy</p>
            </div>
          </div>

          <div className="widget">
            <div className="widget-icon">
              <FaChartBar />
            </div>
            <div className="widget-info">
              <h3>{estadisticas.visitasHoy}</h3>
              <p>Visitas Hoy</p>
            </div>
          </div>
        </div>

        <div className="dashboard-charts">
          <div className="chart-container">
            <h2>Ventas de los Últimos 7 Días</h2>
            <div style={{ height: '200px' }}>
              <Line data={salesData} options={salesOptions} />
            </div>
          </div>

          <div className="chart-container">
            <h2>Productos Más Vendidos</h2>
            <div style={{ height: '250px' }}>
              <Bar data={topProductsData} options={topProductsOptions} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;