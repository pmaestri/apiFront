import React from 'react';

const Welcome = () => {
    const nombreUsuario = localStorage.getItem('nombreUsuario'); // Obtener el nombre del usuario

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>¡Bienvenido, {nombreUsuario}!</h1>
            <button onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('nombreUsuario');
                window.location.reload(); // Recargar para volver al estado no autenticado
            }}>Cerrar Sesión</button>
        </div>
    );
};

export default Welcome;
