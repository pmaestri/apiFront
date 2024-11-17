import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate, logout } from '../../api/AuthSlice'; // Importa las acciones de la slice
import { setAuthToken } from '../../api/UserApi'; // Ajusta esta ruta según tu proyecto
import { fetchRolUsuario } from '../../api/UserSlice';
import './LogIn2.css';

const Login = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Obtener el token del estado global
  const { token, loading, error } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      // Despacha la acción de autenticación
      await dispatch(authenticate({ nombreUsuario, contrasenia })).unwrap();
      const response = await dispatch(fetchRolUsuario());
      console.log(response.payload); // Esto debería ser el rol del usuario

      // Redirigir según el rol
      if (response.payload === 'COMPRADOR') {
        navigate('/'); // Redirigir a la página principal del comprador
      } else if (response.payload === 'ADMIN') {
        navigate('/admin-home/usuarios'); // Redirigir al home del administrador
      } else {
        // Redirigir a una página por defecto en caso de rol desconocido
        console.log("ERROR") 
      }

    } catch (error) {
      setErrorMessage('Error al iniciar sesión. Verifica tus credenciales.');
      console.error('Error en la autenticación:', error);
    }
  };

  const handleLogout = () => {
    dispatch(logout()); // Despacha la acción de logout
    navigate('/login'); // Redirige a la página de login
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

        <div style={{ minHeight: '40px', textAlign: 'center' }}>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>

        {!token && !loading && (
          <>
            <button type="submit">Iniciar Sesión</button>
            <span onClick={handleRegister} className="register-button">Registrarse</span>
          </>
        )}
        
        {token && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
