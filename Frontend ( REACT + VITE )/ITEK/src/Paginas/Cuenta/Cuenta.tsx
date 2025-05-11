import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cuenta.css';

const Cuenta = () => {
  const [userData, setUserData] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailForReset, setEmailForReset] = useState('');
  const [isResetLinkSent, setIsResetLinkSent] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData(parsedUser);
      setToken(parsedUser.token); // ✅ Guardamos token por separado
    }
  }, []);

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

  const handleResetPasswordRequest = async () => {
    if (!token) {
      alert("Token no disponible. Vuelve a iniciar sesión.");
      return;
    }

    const response = await fetch('http://localhost:8080/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ email: emailForReset }),
    });

    if (response.ok) {
      setIsResetLinkSent(true);
      alert('Se ha enviado un enlace para restablecer la contraseña a tu correo electrónico.');
    } else {
      alert('Hubo un error al enviar el enlace. Verifica tu correo electrónico.');
    }
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
        <div className="profile-card">
          <h2>Mi Cuenta</h2>

          <div className="profile-section">
            <h3>Datos Personales</h3>
            <label>Nombre:
              <input
                type="text"
                name="nombre"
                value={userData.nombre}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </label>
            <label>Email:
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
              <label>Nueva Contraseña:
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </label>
              <label>Confirmar Contraseña:
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

          {isResetLinkSent && <p>Revisa tu correo para restablecer la contraseña.</p>}

        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default Cuenta;
