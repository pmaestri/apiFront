import React from 'react';
import AdminNavbar from '../AdminNavbar/AdminNavbar.jsx'; // Asegúrate de importar el Navbar
import './AdminHome.css'

const AdminHome = () => {
  return (
    <div>
      <AdminNavbar /> {/* Incluye el AdminNavbar aquí */}
      <h1 className="admin-home__title">Página de administración Top Cases</h1>
      {/* Aquí puedes agregar más contenido para la página de administración */}
    </div>
  );
};

export default AdminHome;
