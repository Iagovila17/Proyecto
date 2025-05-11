import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetToken, setResetToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      setResetToken(token);
    } else {
      navigate('/login'); // Redirigir si no hay token
    }
  }, []);

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    const response = await fetch('http://localhost:8080/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: resetToken, newPassword }),
    });

    if (response.ok) {
      alert('Contraseña restablecida con éxito.');
      navigate('/login');
    } else {
      alert('Hubo un error al restablecer la contraseña.');
    }
  };

  return (
    <div>
      <h2>Restablecer Contraseña</h2>
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
      <button onClick={handleResetPassword}>Restablecer Contraseña</button>
    </div>
  );
};

export default ResetPasswordPage;
