import { registerUser } from "../../api/AuthApi";
import { useState } from 'react';
import './Register.css';

const Registration = () => {
  const [nombre, setNombre] = useState(''); 
  const [apellido, setApellido] = useState(''); 
  const [nombreUsuario, setNombreUsuario] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Validación del email
  const handleEmailInvalid = (e) => {
    if (!e.target.value) {
      e.target.setCustomValidity('Por favor, complete este campo.');
    } else if (!e.target.value.includes('@')) {
      e.target.setCustomValidity('Por favor, incluya un "@" en la dirección de correo electrónico.');
    } else {
      e.target.setCustomValidity(''); // Limpia el mensaje si no hay error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validaciones adicionales
    if (!email) {
      setError('Por favor, complete este campo.');
      return;
    } else if (!email.includes('@')) {
      setError('Por favor, incluya un "@" en la dirección de correo electrónico.');
      return;
    }

    try {
      const request = { 
        nombre, 
        apellido, 
        nombreUsuario, 
        mail: email, 
        contrasenia: password 
      };
      await registerUser(request);
      setSuccess('Usuario registrado correctamente!'); // Mensaje de éxito
      
      // Limpia los campos después del registro
      setNombre('');
      setApellido('');
      setNombreUsuario('');
      setEmail('');
      setPassword('');

      // Temporizador para ocultar el mensaje de éxito después de 3 segundos
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="registration"> 
      <h2>Registrar Usuario</h2>
      <div className="message-container">
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
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
              onInvalid={(e) => e.target.setCustomValidity('Por favor, complete este campo.')}
              onInput={(e) => e.target.setCustomValidity('')} // Limpia el mensaje al modificar el campo
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
              onInvalid={(e) => e.target.setCustomValidity('Por favor, complete este campo.')}
              onInput={(e) => e.target.setCustomValidity('')} // Limpia el mensaje al modificar el campo
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
              onInvalid={(e) => e.target.setCustomValidity('Por favor, complete este campo.')}
              onInput={(e) => e.target.setCustomValidity('')} // Limpia el mensaje al modificar el campo
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
              onInvalid={(e) => e.target.setCustomValidity('Por favor, complete este campo.')}
              onInput={(e) => e.target.setCustomValidity('')} // Limpia el mensaje al modificar el campo
            />
          </div>
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Registration;
