import { useState } from 'react';
import { registerUser } from "../../api/AuthApi";
import './Register.css';

const Registration = () => {
  const [nombre, setNombre] = useState(''); 
  const [apellido, setApellido] = useState(''); 
  const [nombreUsuario, setNombreUsuario] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const request = { 
        nombre, 
        apellido, 
        nombreUsuario, 
        mail: email, 
        contrasenia: password 
      };
      await registerUser(request);
      setSuccess('User registered successfully!');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="registration"> 
      <h2>Register User</h2>
      {/* Contenedor para los mensajes de error y éxito */}
      <div className="message-container">
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input 
            type="text" 
            value={apellido} 
            onChange={(e) => setApellido(e.target.value)} 
            required 
          />
        </div>
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
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
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
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Registration;
