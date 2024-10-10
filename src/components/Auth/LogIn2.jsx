import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../../api/AuthApi'; 
import './LogIn2.css';

const Login = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario ha iniciado sesión
  const navigate = useNavigate();

  // Recuperar valores de localStorage al montar el componente
  useEffect(() => {
    const storedNombreUsuario = localStorage.getItem('nombreUsuario');
    const storedContrasenia = localStorage.getItem('contrasenia');
    const token = localStorage.getItem('token'); // Recupera el token

    if (storedNombreUsuario) setNombreUsuario(storedNombreUsuario);
    if (storedContrasenia) setContrasenia(storedContrasenia);
    if (token) setIsLoggedIn(true); // Si hay un token, el usuario está logueado
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
  
    try {
      const authData = { nombreUsuario, contrasenia }; 
      const response = await authenticateUser(authData);
      localStorage.setItem('token', response.access_token);
      console.log(response.access_token);
      
      // Guardar los valores en localStorage
      localStorage.setItem('nombreUsuario', nombreUsuario);
      localStorage.setItem('contrasenia', contrasenia);

      // Establece el estado isLoggedIn a true al iniciar sesión
      setIsLoggedIn(true); 
    } catch (error) {
      setErrorMessage('Error al iniciar sesión. Verifica tus credenciales.');
      console.error('Error en la autenticación:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('contrasenia');

    setIsLoggedIn(false); // Restablecer el estado de inicio de sesión
    setNombreUsuario(''); // Limpiar el campo de nombre de usuario
    setContrasenia(''); // Limpiar el campo de contraseña
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
          <div>
            <input
              type="text"
              value={nombreUsuario} 
              onChange={(e) => setNombreUsuario(e.target.value)} 
              required
              onInvalid={(e) => e.target.setCustomValidity('Por favor, complete este campo.')}
              onInput={(e) => e.target.setCustomValidity('')} // Limpia el mensaje al modificar el campo
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
              onInput={(e) => e.target.setCustomValidity('')} // Limpia el mensaje al modificar el campo
            />
          </div>
        </div>

        {/* Contenedor para el mensaje de error con un mínimo de altura */}
        <div style={{ minHeight: '40px', textAlign: 'center' }}>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>

        {/* Botones de inicio de sesión y registro solo si no está logueado */}
        {!isLoggedIn && (
          <>
            <button type="submit">Iniciar Sesión</button>
            <span onClick={handleRegister} className="register-button">Registrarse</span>
          </>
        )}
              {/* Botón de cerrar sesión visible solo si está logueado */}
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
