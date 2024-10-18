import React, { useState, useEffect } from 'react';
import AdminNavbar from '../AdminNavbar/AdminNavbar.jsx';
import { crearProducto, actualizarProducto, obtenerProductos, eliminarProducto } from '../../api/ProductApi.jsx';
import { updateImagen } from '../../api/ImageApi.jsx';
import { useNavigate } from 'react-router-dom';
import { obtenerRolUsuario, setAuthToken } from '../../api/UserApi.jsx';
import './ProductsAdmin.css';
import { FaTrashAlt } from 'react-icons/fa';


const ProductsAdmin = () => {
  const navigate = useNavigate();
  const [productoData, setProductoData] = useState({
    descripcion: '',
    marca: '',
    nombre: '',
    precioUnitario: '',
    stock: '',
    categoriaId: '',
    modelo: '',
    descuento: '',
    catalogoId: '',
    archivo: null,
    productoId: '',
  });
  const [nombreArchivo, setNombreArchivo] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [rolUsuario, setRolUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [productos, setProductos] = useState([]); // Estado para los productos
  const [showProductos, setShowProductos] = useState(false); // Estado para controlar la visualización de productos

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      setToken(token);
      const fetchRole = async () => {
        const rol = await obtenerRolUsuario();
        setRolUsuario(rol);
        if (rol !== 'ADMIN') {
          navigate('/');
        } else {
          setIsAdmin(true);
        }
      };
      fetchRole();
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const archivo = e.target.files[0];
    setProductoData((prevData) => ({
      ...prevData,
      archivo,
    }));
    setNombreArchivo(archivo ? archivo.name : '');
  };

  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(productoData).forEach(([key, value]) => {
      if (value) formData.append(key, value); // Solo agregar campos que tienen valor
    });

    try {
      await crearProducto(formData, token);
      alert('Producto creado con éxito');
      setShowCreateForm(false);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    const updatedData = {};

    // Solo agregar campos que han sido cambiados
    Object.entries(productoData).forEach(([key, value]) => {
      if (key !== 'productoId' && value) {
        updatedData[key] = value;
      }
    });

    try {
      await actualizarProducto(productoData.productoId, updatedData, token); // Enviar solo los campos actualizados
       // Si se ha proporcionado un archivo, llamar a updateImagen
       if (productoData.archivo) {
        await updateImagen(productoData.productoId, productoData.archivo, nombreArchivo,token);
      }

      alert('Producto actualizado con éxito');
      setShowUpdateForm(false);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleMostrarProductos = async () => {
    if (!showProductos) {
      // Solo obtener productos si no están ya mostrados
      try {
        const productosObtenidos = await obtenerProductos(token);
        setProductos(productosObtenidos);
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    }
    // Alternar entre mostrar y ocultar productos
    setShowProductos(!showProductos);
  };
  const handleEliminarProducto = async (productoId) => {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmacion) {
      const token = localStorage.getItem('token'); // Obtén el token desde localStorage
      try {
        await eliminarProducto(productoId, token);
        // Actualizar la lista de productos después de eliminar
        const productosActualizados = productos.filter((producto) => producto.id !== productoId);
        setProductos(productosActualizados);
        alert('Producto eliminado con éxito');
      } catch (error) {
        alert(`Error al eliminar el producto: ${error.message}`);
      }
    }
  };
  
  
  if (!isAdmin) return null;

  return (
    <div className="ProductsAdmin">
      <AdminNavbar />
      <h1 className="ProductsAdmin__title">Administración de Productos</h1>
      
      <button className="ProductsAdmin__toggle-button" onClick={() => setShowCreateForm(!showCreateForm)}>
        {showCreateForm ? 'Ocultar Formulario de Creación' : 'Crear Producto'}
      </button>
      
      <button className="ProductsAdmin__toggle-button" onClick={() => setShowUpdateForm(!showUpdateForm)}>
        {showUpdateForm ? 'Ocultar Formulario de Actualización' : 'Actualizar Producto'}
      </button>

      <button className="ProductsAdmin__toggle-button" onClick={handleMostrarProductos}>
        {showProductos ? 'Ocultar Productos' : 'Mostrar Todos los Productos'}
      </button>



      {/* Formulario para crear producto */}
      <div className={`ProductsAdmin__form-container ${showCreateForm ? 'visible' : 'hidden'}`}>
        {showCreateForm && (
          <form className="ProductsAdmin__form" onSubmit={handleSubmitCreate}>
            <input className="ProductsAdmin__input" type="text" name="descripcion" placeholder="Descripción" onChange={handleChange} />
            <input className="ProductsAdmin__input" type="text" name="marca" placeholder="Marca" onChange={handleChange} />
            <input className="ProductsAdmin__input" type="text" name="nombre" placeholder="Nombre" onChange={handleChange} />
            <input className="ProductsAdmin__input" type="number" name="precioUnitario" placeholder="Precio Unitario" onChange={handleChange} />
            <input className="ProductsAdmin__input" type="number" name="stock" placeholder="Stock" onChange={handleChange} />
            <input className="ProductsAdmin__input" type="number" name="categoria" placeholder="Categoría ID" onChange={handleChange} />
            <input className="ProductsAdmin__input" type="text" name="modelo" placeholder="Modelo" onChange={handleChange} />
            <input className="ProductsAdmin__input" type="number" name="descuento" placeholder="Descuento" onChange={handleChange} />
            <input className="ProductsAdmin__input" type="number" name="catalogo" placeholder="Catálogo ID" onChange={handleChange} />

            <input type="file" name="archivo" id="archivo" onChange={handleFileChange} style={{ display: 'none' }} />
            <input
              className="ProductsAdmin__input"
              type="text"
              placeholder="Subir Archivo"
              value={nombreArchivo}
              readOnly
              onClick={() => document.getElementById('archivo').click()}
            />

            <button className="ProductsAdmin__button" type="submit">Crear Producto</button>
          </form>
        )}
      </div>

      {/* Formulario para actualizar producto */}
      <div className={`ProductsAdmin__form-container ${showUpdateForm ? 'visible' : 'hidden'}`}>
        {showUpdateForm && (
          <form className="ProductsAdmin__form" onSubmit={handleSubmitUpdate}>
            <input className="ProductsAdmin__input" type="text" name="productoId" placeholder="Producto ID" onChange={handleChange} required />
            <input className="ProductsAdmin__input" type="text" name="descripcion" placeholder="Descripción" onChange={handleChange} />
            <input className="ProductsAdmin__input" type="text" name="marca" placeholder="Marca" onChange={handleChange} />
            <input className="ProductsAdmin__input" type="text" name="nombre" placeholder="Nombre" onChange={handleChange} />
            <input className="ProductsAdmin__input" type="number" name="precioUnitario" placeholder="Precio Unitario" onChange={handleChange} />
            <input className="ProductsAdmin__input" type="number" name="stock" placeholder="Stock" onChange={handleChange} />
            <input className="ProductsAdmin__input" type="number" name="categoria" placeholder="Categoría ID" onChange={handleChange} />
            <input className="ProductsAdmin__input" type="text" name="modelo" placeholder="Modelo" onChange={handleChange} />
            <input className="ProductsAdmin__input" type="number" name="descuento" placeholder="Descuento" onChange={handleChange} />
            <input className="ProductsAdmin__input" type="number" name="catalogo" placeholder="Catálogo ID" onChange={handleChange} />
            <input type="file" name="archivo" id="archivoUpdate" onChange={handleFileChange} style={{ display: 'none' }} />
            <input
              className="ProductsAdmin__input"
              type="text"
              placeholder="Subir Archivo"
              value={nombreArchivo}
              readOnly
              onClick={() => document.getElementById('archivoUpdate').click()}
            />
            <button className="ProductsAdmin__button" type="submit">Actualizar Producto</button>
          </form>
        )}
      </div>

      {showProductos && (
        <div className="ProductsAdmin__product-list">
          <h2>Lista de Productos</h2>
          {productos.length > 0 ? (
            <div className="ProductsAdmin__product-cards">
              {productos.map((producto) => (
                <div key={producto.id} className="ProductsAdmin__product-card">
                  <img
                    src={`data:image/jpeg;base64,${producto.imagen}`}
                    alt={producto.nombre}
                    className="ProductsAdmin__product-image"
                  />
                  <div className="ProductsAdmin__product-info">
                    <h3>{producto.nombre}</h3>
                    <p>ID producto: {producto.id}</p>
                    <p>Descripción: {producto.descripcion}</p>
                    <p>Marca: {producto.marca}</p>
                    <p>Precio: ${producto.precio}</p>
                    <p>Stock: {producto.stock}</p>
                    <p>Modelo: {producto.modelo}</p>
                    <p>Descuento: {producto.descuento}%</p>
                    <p>Categoría: {producto.nombreCategoria}</p>
                    <p>{producto.disponible ? 'Disponible' : 'No Disponible'}</p>
                    <button
                      className="ProductsAdmin__delete-button"
                      onClick={() => handleEliminarProducto(producto.id)}
                    >
                      <FaTrashAlt /> Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No hay productos disponibles.</p>
          )}
        </div>
      )}
      
    </div>
  );
};

export default ProductsAdmin;
