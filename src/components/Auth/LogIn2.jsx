import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../../api/AuthApi';
import { obtenerRolUsuario, setAuthToken } from '../../api/UserApi'; // Importar setAuthToken
import './LogIn2.css';

const Login = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Recuperar valores de localStorage al montar el componente
  useEffect(() => {
    const storedNombreUsuario = localStorage.getItem('nombreUsuario');
   // const storedContrasenia = localStorage.getItem('contrasenia');
    const token = localStorage.getItem('token');

   if (storedNombreUsuario) setNombreUsuario(storedNombreUsuario);
   // if (storedContrasenia) setContrasenia(storedContrasenia);
    if (token) {
      setAuthToken(token); // Configurar el token para futuras solicitudes
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const authData = { nombreUsuario, contrasenia };
      const response = await authenticateUser(authData);

      const token = response.access_token;
      localStorage.setItem('token', token);
      setAuthToken(token); // Configurar el token en las cabeceras de axios
      console.log(token);

      localStorage.setItem('nombreUsuario', nombreUsuario);
      //localStorage.setItem('contrasenia', contrasenia);

      setIsLoggedIn(true);

      const rolUsuario = await obtenerRolUsuario();
      if (rolUsuario === 'ADMIN') {
        navigate('/admin-home/usuarios'); // Redirige a la vista de administrador
      } else {
        navigate('/'); // Redirige a la vista general para compradores
      }
    } catch (error) {
      setErrorMessage('Error al iniciar sesión. Verifica tus credenciales.');
      console.error('Error en la autenticación:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('contrasenia');

    setAuthToken(null); // Eliminar el token de las cabeceras de axios
    setIsLoggedIn(false);
    //setNombreUsuario('');
    //setContrasenia('');
  };

  const handleRegister = () => {
    navigate('/register'); 
  };

  return (
    <div className="alternative-login">
      <h3>Iniciar Sesión</h3>
      <form onSubmit={handleLogin}>
        <div>
          <label>Nombre de Usuario:</label>
          <div>
            <input
              type="text"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              required
              onInvalid={(e) => e.target.setCustomValidity('Por favor, complete este campo.')}
              onInput={(e) => e.target.setCustomValidity('')}
            />
          </div>
        </div>
        <div>
          <label>Contraseña:</label>
          <div>
            <input
              type="password"
              value={contrasenia}
              onChange={(e) => setContrasenia(e.target.value)}
              required
              onInvalid={(e) => e.target.setCustomValidity('Por favor, complete este campo.')}
              onInput={(e) => e.target.setCustomValidity('')}
            />
          </div>
        </div>

        <div style={{ minHeight: '40px', textAlign: 'center' }}>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          

        </div>

        {!isLoggedIn && (
          <>
            <button type="submit">Iniciar Sesión</button>
            <span onClick={handleRegister} className="register-button">Registrarse</span>
          </>
        )}
        
        {isLoggedIn && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
