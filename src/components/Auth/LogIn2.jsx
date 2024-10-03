import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../../api/AuthApi'; 
import './LogIn2.css';

const Login = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const authData = { nombreUsuario, contrasenia }; 
      const response = await authenticateUser(authData);
      localStorage.setItem('token', response.access_token);
      console.log('Autenticación exitosa:', response);
      navigate('/');
    } catch (error) {
      setErrorMessage('Error al iniciar sesión. Verifica tus credenciales.');
      console.error('Error en la autenticación:', error);
    }
  };

  const handleRegister = () => {
    navigate('/register'); // Asegúrate de que la ruta '/register' esté configurada
  };

  return (
    <div className="alternative-login">
      <h3>Iniciar Sesión</h3>
      <form onSubmit={handleLogin}>
        <div>
          <label>Nombre de Usuario:</label>
          <input
            type="text"
            value={nombreUsuario} 
            onChange={(e) => setNombreUsuario(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
            required
          />
        </div>
        
        {/* Contenedor para el mensaje de error con un mínimo de altura */}
        <div style={{ minHeight: '40px', textAlign: 'center' }}>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>

        <button type="submit">Iniciar Sesión</button>
        <span onClick={handleRegister} className="register-button">Registrarse</span>
      </form>
    </div>
  );
};

export default Login;
