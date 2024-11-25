import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate, logout } from '../../api/AuthSlice'; 
// import { setAuthToken } from '../../api/UserApi'; 
import { fetchRolUsuario } from '../../api/UserSlice';
import { vaciarCarritoSlice } from '../../api/CartSilce';
import './LogIn2.css';

const Login = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Obtener el token del estado global
  const { loading, error } = useSelector((state) => state.auth);
  const token = useSelector((state) => state.auth.token);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      // Despacha la acción de autenticación
      console.log(token);
      const hola = await dispatch(authenticate({ nombreUsuario, contrasenia })).unwrap();
      //console.log(hola)
      // setAuthToken(hola);
      
      const response = await dispatch(fetchRolUsuario());
      //console.log(response.payload); // Esto debería ser el rol del usuario

      // Redirigir según el rol
      if (response.payload === 'COMPRADOR') {
        dispatch(vaciarCarritoSlice(token));
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
            onInvalid={(e) => e.target.setCustomValidity('Por favor, complete este campo.')}
            onInput={(e) => e.target.setCustomValidity('')}
            
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
            required
            onInvalid={(e) => e.target.setCustomValidity('Por favor, complete este campo.')}
            onInput={(e) => e.target.setCustomValidity('')}
            
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
