// src/components/Login.jsx
import React, { useState } from 'react';
import './Login.css'; // Importar el archivo CSS

const Login = () => {
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Evitar el envío del formulario

    // Validar si los campos están vacíos
    const username = event.target.username.value;
    const password = event.target.password.value;

    if (!username || !password) {
      setError('Por favor, complete todos los campos.'); // Mensaje en español
    } else {
      setError('');
      // Aquí puedes manejar el inicio de sesión (enviar los datos al servidor, etc.)
    }
  };

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Usuario:</label>
        <input 
          type="text" 
          id="username" 
          name="username" 
        />

        <label htmlFor="password">Contraseña:</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
        />

        {error && <p className="error-message">{error}</p>} {/* Mostrar mensaje de error */}

        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
