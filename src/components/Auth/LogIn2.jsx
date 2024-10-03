import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../../api/AuthApi'; // Ajusta la ruta según la ubicación de tu archivo
import './LogIn2.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  // Manejador del formulario de inicio de sesión con email y password
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const request = { email, password };
      const response = await authenticateUser(request);
      setSuccess('Login successful!');
      localStorage.setItem('token', response.token);
      console.log('Login successful:', response);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  // Manejador para la autenticación con username y password
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const authData = { nombreUsuario: username, contrasenia: password };
      const response = await authenticateUser(authData);
      localStorage.setItem('token', response.token);
      console.log('Autenticación exitosa:', response);
      navigate('/');
    } catch (error) {
      setErrorMessage('Error al iniciar sesión. Verifica tus credenciales.');
      console.error('Error en la autenticación:', error);
    }
  };

  return (

        <div className="alternative-login">
          <h3>Iniciar Sesión</h3>
          <form onSubmit={handleLogin}>
            <div>
              <label>Usuario:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Contraseña:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Iniciar Sesión</button>
          </form>
        </div>
  );
};

export default Login;
