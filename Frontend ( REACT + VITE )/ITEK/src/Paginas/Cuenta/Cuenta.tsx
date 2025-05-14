import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cuenta.css';

interface Product {
  productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
  talla: string;
  totalPrice: number;
  productImage: string;
}

const Cuenta = () => {
  const [userData, setUserData] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailForReset, setEmailForReset] = useState('');
  const [isResetLinkSent, setIsResetLinkSent] = useState(false);
  const [orderHistory, setOrderHistory] = useState<any[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData(parsedUser);
      setToken(parsedUser.token);
      fetchOrderHistory(parsedUser.token);
    }
  }, []);

  const fetchOrderHistory = async (userToken: string) => {
    const response = await fetch('http://localhost:8080/api/history', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${userToken}`,
      },
    });

    if (response.ok) {
      const orders = await response.json();
      setOrderHistory(orders);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUserData(null);
    setToken(null);
    navigate('/');
  };

  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify({ ...userData, token }));
    setEditMode(false);
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    if (!token) {
      alert("Token no disponible. Vuelve a iniciar sesión.");
      return;
    }

    const response = await fetch('http://localhost:8080/auth/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ newPassword }),
    });

    if (response.ok) {
      alert('Contraseña cambiada con éxito.');
      setChangePasswordMode(false);
    } else {
      alert('Hubo un error al cambiar la contraseña.');
    }
  };

  return (
   <div className="cuenta-container">
  {userData ? (
   <>
    <div className="profile-card">
     <h2>Mi Cuenta</h2>

     <div className="profile-section">
      <h3>Datos Personales</h3>
      <label>
       Nombre:
       <input
        type="text"
        name="nombre"
        value={userData.nombre}
        onChange={handleInputChange}
        disabled={!editMode}
       />
      </label>
      <label>
       Email:
       <input
        type="email"
        name="email"
        value={userData.email}
        onChange={handleInputChange}
        disabled={!editMode}
       />
      </label>
     </div>

     {changePasswordMode ? (
      <div className="reset-password">
       <h3>Cambiar Contraseña</h3>
       <label>
        Nueva Contraseña:
        <input
         type="password"
         value={newPassword}
         onChange={(e) => setNewPassword(e.target.value)}
        />
       </label>
       <label>
        Confirmar Contraseña:
        <input
         type="password"
         value={confirmPassword}
         onChange={(e) => setConfirmPassword(e.target.value)}
        />
       </label>
       <button onClick={handleChangePassword}>Cambiar Contraseña</button>
       <button onClick={() => setChangePasswordMode(false)}>Cancelar</button>
      </div>
     ) : (
      <div className="buttons">
       <button onClick={() => setChangePasswordMode(true)}>Cambiar Contraseña</button>
       <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
     )}
    </div>

    <div className="profile-card order-history">
     <h3>Historial de Compras</h3>
     {orderHistory.length > 0 ? (
      <ul className="order-list">
       {orderHistory.map((order, index) => (
        <li key={order.id || index} className="order-item">
         <div className="order-info">
          <span className="order-date">{new Date(order.fecha).toLocaleDateString()}</span>
          <span className="order-status">{order.estado}</span>
          <span className="order-total">Total: {order.total.toFixed(2)} €</span>
         </div>
         <ul className="product-list">
        {order.products.map((product: Product, idx: number) => (
            <li key={idx} className="product-item">
            <img
             src={product.productImage || "/default-image.jpg"}
             alt={product.productName}
             className="product-image"
            />
            <div className="product-info">
             <p className="product-name">{product.productName}</p>
             <p className="product-details">
              Talla: {product.talla} | Cantidad: {product.quantity}
             </p>
             <p className="product-price">Total: {product.totalPrice.toFixed(2)} €</p>
            </div>
           </li>
          ))}
         </ul>
        </li>
       ))}
      </ul>
     ) : (
      <p>No has realizado ninguna compra aún.</p>
     )}
    </div>
   </>
  ) : (
   <p>Cargando...</p>
  )}
 </div>
  );
};

export default Cuenta;
