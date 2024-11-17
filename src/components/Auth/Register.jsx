import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../api/AuthSlice'; // Asegúrate de ajustar la ruta de importación
import './Register.css';

const Registration = () => {
  const dispatch = useDispatch();
  
  // Estado local para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Obtener el estado de Redux
  const { loading, error, token } = useSelector((state) => state.auth);

  // Validación del email
  const handleEmailInvalid = (e) => {
    if (!e.target.value) {
      e.target.setCustomValidity('Por favor, complete este campo.');
    } else if (!e.target.value.includes('@')) {
      e.target.setCustomValidity('Por favor, incluya un "@" en la dirección de correo electrónico.');
    } else {
      e.target.setCustomValidity('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones adicionales
    if (!email) {
      alert('Por favor, complete este campo.');
      return;
    } else if (!email.includes('@')) {
      alert('Por favor, incluya un "@" en la dirección de correo electrónico.');
      return;
    }

    // Enviar la acción de registro a Redux
    const request = {
      nombre,
      apellido,
      nombreUsuario,
      mail: email,
      contrasenia: password,
    };

    dispatch(register(request));
  };

  // Verificar si el registro fue exitoso
  if (token) {
    setTimeout(() => {
      // Redirigir o mostrar mensaje de éxito
      alert('Usuario registrado correctamente!');
    }, 1000);
  }

  return (
    <div className="registration">
      <h2>Registrar Usuario</h2>
      <div className="message-container">
        {error && <p className="error-message">{error}</p>}
        {loading && <p className="loading-message">Cargando...</p>}
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <div>
            <input 
              type="text" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              required 
            />
          </div>
        </div>
        <div>
          <label>Apellido:</label>
          <div>
            <input 
              type="text" 
              value={apellido} 
              onChange={(e) => setApellido(e.target.value)} 
              required 
            />
          </div>
        </div>
        <div>
          <label>Nombre de Usuario:</label>
          <div>
            <input 
              type="text" 
              value={nombreUsuario} 
              onChange={(e) => setNombreUsuario(e.target.value)} 
              required 
            />
          </div>
        </div>
        <div>
          <label>Email:</label>
          <div>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
              onInvalid={handleEmailInvalid}
            />
          </div>
        </div>
        <div>
          <label>Contraseña:</label>
          <div>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
        </div>
        <button type="submit" disabled={loading}>Registrar</button>
      </form>
    </div>
  );
};

export default Registration;
