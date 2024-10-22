import React, { useState, useEffect } from 'react';
import AdminNavbar from '../AdminNavbar/AdminNavbar.jsx';
import { crearProducto, actualizarProducto, obtenerProductos, eliminarProducto } from '../../api/ProductApi.jsx';
import { updateImagen } from '../../api/ImageApi.jsx';
import { useNavigate } from 'react-router-dom';
import { obtenerRolUsuario, setAuthToken } from '../../api/UserApi.jsx';
import './ProductsAdmin.css';
import { FaTrashAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

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
  const [token, setToken] = useState(null);
  const [productos, setProductos] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      setToken(token);
      const fetchRole = async () => {
        const rol = await obtenerRolUsuario();
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

  useEffect(() => {
    const fetchProductos = async () => {
      if (isAdmin) {
        try {
          const productosObtenidos = await obtenerProductos(token);
          setProductos(productosObtenidos);
        } catch (error) {
          alert(`Error: ${error.message}`);
        }
      }
    };
    fetchProductos();
  }, [isAdmin, token]);

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
      // Restablecer archivo e input de imagen después de crear
      setProductoData((prevData) => ({
        ...prevData,
        archivo: null,
      }));
      setNombreArchivo('');
      const productosObtenidos = await obtenerProductos(token);
      setProductos(productosObtenidos);
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
      if (productoData.archivo) {
        await updateImagen(productoData.productoId, productoData.archivo, nombreArchivo, token);
      }
      alert('Producto actualizado con éxito');
      setEditMode(null);
      setProductoData({
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
      setNombreArchivo('');
      const productosObtenidos = await obtenerProductos(token);
      setProductos(productosObtenidos);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleEditProducto = (producto) => {
    setEditMode(producto.id);
    setProductoData({ ...producto, productoId: producto.id });
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setProductoData({
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
    setNombreArchivo('');
  };

  const handleEliminarProducto = async (productoId) => {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmacion) {
      try {
        await eliminarProducto(productoId, token);
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

      {showCreateForm && (
        <div className="ProductsAdmin__form-container visible">
          <form className="ProductsAdmin__form" onSubmit={handleSubmitCreate}>
            <label>
              Nombre:
              <input className="ProductsAdmin__input" type="text" name="nombre" onChange={handleChange} />
            </label>
            <label>
              Descripción:
              <input className="ProductsAdmin__input" type="text" name="descripcion" onChange={handleChange} />
            </label>
            <label>
              Marca:
              <input className="ProductsAdmin__input" type="text" name="marca" onChange={handleChange} />
            </label>
            <label>
              Precio:
              <input className="ProductsAdmin__input" type="text" name="precio" onChange={handleChange} />
            </label>
            <label>
              Stock:
              <input className="ProductsAdmin__input" type="text" name="stock" onChange={handleChange} />
            </label>
            <label>
              Categoría:
              <input className="ProductsAdmin__input" type="text" name="categoria" onChange={handleChange} />
            </label>
            <label>
              Modelo:
              <input className="ProductsAdmin__input" type="text" name="modelo" onChange={handleChange} />
            </label>
            <label>
              Descuento:
              <input className="ProductsAdmin__input" type="text" name="descuento" onChange={handleChange} />
            </label>
            <label>
              Catálogo:
              <input className="ProductsAdmin__input" type="text" name="catalogoId" onChange={handleChange} />
            </label>
            <label>
              Subir Archivo:
              <input type="file" name="archivo" id="archivo" onChange={handleFileChange} />
            </label>

            <button className="ProductsAdmin__button" type="submit">Crear Producto</button>
          </form>
        </div>
      )}

      <div className="ProductsAdmin__product-list">
        <h2>Lista de Productos</h2>
        {productos.length > 0 ? (
          <div className="ProductsAdmin__product-cards">
            {productos.map((producto) => (
              <div key={producto.id} className="ProductsAdmin__product-card">
                <div className="ProductsAdmin__product-image-container">
                  <img
                    src={`data:image/jpeg;base64,${producto.imagen}`}
                    alt={producto.nombre}
                    className="ProductsAdmin__product-image"
                  />
                </div>
                <div className="ProductsAdmin__product-info">
                  {editMode === producto.id ? (
                    <>
                      <label>
                        Nombre:
                        <input
                          className="ProductsAdmin__input"
                          type="text"
                          name="nombre"
                          value={productoData.nombre}
                          onChange={handleChange}
                        />
                      </label>
                      <label>
                        Descripción:
                        <input
                          className="ProductsAdmin__input"
                          type="text"
                          name="descripcion"
                          value={productoData.descripcion}
                          onChange={handleChange}
                        />
                      </label>
                      <label>
                        Marca:
                        <input
                          className="ProductsAdmin__input"
                          type="text"
                          name="marca"
                          value={productoData.marca}
                          onChange={handleChange}
                        />
                      </label>
                      <label>
                        Precio:
                        <input
                          className="ProductsAdmin__input"
                          type="text"
                          name="precioUnitario"
                          value={productoData.precioUnitario}
                          onChange={handleChange}
                        />
                      </label>
                      <label>
                        Stock:
                        <input
                          className="ProductsAdmin__input"
                          type="text"
                          name="stock"
                          value={productoData.stock}
                          onChange={handleChange}
                        />
                      </label>
                      <label>
                        Categoría:
                        <input
                          className="ProductsAdmin__input"
                          type="text"
                          name="categoria"
                          value={productoData.categoriaId}
                          onChange={handleChange}
                        />
                      </label>
                      <label>
                        Modelo:
                        <input
                          className="ProductsAdmin__input"
                          type="text"
                          name="modelo"
                          value={productoData.modelo}
                          onChange={handleChange}
                        />
                      </label>
                      <label>
                        Descuento:
                        <input
                          className="ProductsAdmin__input"
                          type="text"
                          name="descuento"
                          value={productoData.descuento}
                          onChange={handleChange}
                        />
                      </label>
                      <label>
                        Catálogo:
                        <input
                          className="ProductsAdmin__input"
                          type="text"
                          name="catalogoId"
                          value={productoData.catalogoId}
                          onChange={handleChange}
                        />
                      </label>
                      <input type="file" name="archivo" id="archivoUpdate" onChange={handleFileChange} />
                      <div className="ProductsAdmin__action-buttons">
                        <button className="ProductsAdmin__save-button" onClick={handleSubmitUpdate}>
                          <FaSave /> Guardar
                        </button>
                        <button className="ProductsAdmin__cancel-button" onClick={handleCancelEdit}>
                          <FaTimes /> Cancelar
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
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
                      <div className="ProductsAdmin__action-buttons">
                        <button className="ProductsAdmin__edit-button" onClick={() => handleEditProducto(producto)}>
                          <FaEdit />
                        </button>
                        <button className="ProductsAdmin__delete-button" onClick={() => handleEliminarProducto(producto.id)}>
                          <FaTrashAlt />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsAdmin;
