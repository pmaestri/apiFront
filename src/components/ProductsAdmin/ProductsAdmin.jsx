import React, { useState, useEffect } from 'react';
import AdminNavbar from '../AdminNavbar/AdminNavbar.jsx';
import { crearProducto, actualizarProducto, obtenerProductos, eliminarProducto } from '../../api/ProductApi.jsx';
import { updateImagen } from '../../api/ImageApi.jsx';
import { fetchCategorias } from '../../api/CategorySlice.jsx';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './ProductsAdmin.css';
import { FaTrashAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const ProductsAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productoData, setProductoData] = useState({
    descripcion: '',
    marca: '',
    nombre: '',
    precioUnitario: '',
    stock: '',
    categoria: '',
    modelo: '',
    descuento: '',
    catalogoId: '',
    archivo: null,
    productoId: '',
  });
  const [nombreArchivo, setNombreArchivo] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [productos, setProductos] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  useDispatch(fetchCategorias());

  // Obtener token y rol desde Redux store
  const token = useSelector((state) => state.auth.token);
  const rol = useSelector((state) => state.usuarios.rol);
  const categorias = useSelector((state) => state.categorias.categorias);

  useEffect(() => {
    if (token) {
      if (rol !== 'ADMIN') {
        navigate('/');
      } else {
        setIsAdmin(true);
      }
    } else {
      navigate('/login');
    }
  }, [navigate, token, rol, dispatch]);

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

    Object.entries(productoData).forEach(([key, value]) => {
      if (key !== 'productoId' && value) {
        updatedData[key] = value;
      }
    });
    console.log('Datos a actualizar:', updatedData);
    try {
      await actualizarProducto(productoData.productoId, updatedData, token);
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
        categoria: '',
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
      categoria: '',
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
              <input className="ProductsAdmin__input" type="number" name="precioUnitario" onChange={handleChange} />
            </label>
            <label>
              Stock:
              <input className="ProductsAdmin__input" type="number" name="stock" onChange={handleChange} />
            </label>
            <div className="ProductsAdmin__select-container">
            <label>
            Categoría:
            <select
              name="categoria" // Almacena el ID
              onChange={handleChange}
              value={productoData.categoria} // Muestra el ID seleccionado
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre} {/* Muestra el nombre */}
                </option>
              ))}
            </select>
          </label>
          </div>

            <label>
              Modelo:
              <input className="ProductsAdmin__input" type="text" name="modelo" onChange={handleChange} />
            </label>
            <label>
              Descuento:
              <input className="ProductsAdmin__input" type="number" name="descuento" onChange={handleChange} />
            </label>
            <label>
              Catálogo:
              <input className="ProductsAdmin__input" type="number" name="catalogo" onChange={handleChange} />
            </label>
            <div className="ProductsAdmin__file-container">
            <label className="ProductsAdmin__input_imagen">Imágen:</label>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <input 
                className="ProductsAdmin__input ProductsAdmin__input-file" 
                type="file" 
                name="archivo" 
                id="archivo" 
                onChange={handleFileChange} 
                accept="image/*" 
                style={{ display: 'none' }} // Oculta el input file
              />
              <label 
                className="ProductsAdmin__file-label" 
                htmlFor="archivo" 
                style={{ cursor: 'pointer', textAlign: 'center' }} // Cambia el cursor al pasar por encima
              >
                {nombreArchivo ? nombreArchivo : 'Subir imagen'}
              </label>
            </div>
          </div>

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
                    <h3 className="ProductsAdmin__product-name"></h3>
                    <div className="ProductsAdmin__columns">
                      <div className="ProductsAdmin__column">
                        <p><strong>Nombre:</strong></p>
                        <input
                          type="text"
                          name="nombre"
                          value={productoData.nombre}
                          onChange={handleChange}
                          className="ProductsAdmin__input-edit-inline"
                        />

                        <p><strong>Descripción:</strong></p>
                        <input
                          type="text"
                          name="descripcion"
                          value={productoData.descripcion}
                          onChange={handleChange}
                          className="ProductsAdmin__input-edit-inline"
                        />

                        <p><strong>Marca:</strong></p>
                        <input
                          type="text"
                          name="marca"
                          value={productoData.marca}
                          onChange={handleChange}
                          className="ProductsAdmin__input-edit-inline"
                        />

                        <p><strong>Precio:</strong></p>
                        <input
                          type="number"
                          name="precioUnitario"
                          defaultValue={producto.precio}
                          onChange={handleChange}
                          className="ProductsAdmin__input-edit-inline"
                        />

                        <p><strong>Stock:</strong></p>
                        <input
                          type="number"
                          name="stock"
                          value={productoData.stock}
                          onChange={handleChange}
                          className="ProductsAdmin__input-edit-inline"
                        />
                      </div>

                      <div className="ProductsAdmin__column">
                        <p><strong>Modelo:</strong></p>
                        <input
                          type="text"
                          name="modelo"
                          value={productoData.modelo || "-"}
                          onChange={handleChange}
                          className="ProductsAdmin__input-edit-inline"
                        />

                        <p><strong>Descuento:</strong></p>
                        <input
                          type="number"
                          name="descuento"
                          value={productoData.descuento}
                          onChange={handleChange}
                          className="ProductsAdmin__input-edit-inline"
                        />

                        <p><strong>Catálogo:</strong></p>
                        <input
                          type="text"
                          name="catalogoId"
                          value={productoData.catalogoId}
                          onChange={handleChange}
                          className="ProductsAdmin__input-edit-inline"
                        />
                          <p><strong>Categoría:</strong></p>
                          <select
                            name="categoria"
                            onChange={handleChange}
                            value={productoData.categoria || ''} // Asegúrate de que el valor actual sea el ID de la categoría
                          >
                            <option value="" disabled>{producto.nombreCategoria}</option> 
                            {categorias.map((categoria) => (
                              <option key={categoria.id} value={categoria.id}>
                                {categoria.nombre}
                              </option>
                            ))}
                          </select>

                        <p><strong>Subir archivo:</strong></p>
                        <input type="file" name="archivo" id="archivoUpdate" onChange={handleFileChange} style={{ display: 'none' }} />
                        <input
                          className="ProductsAdmin__input"
                          type="text"
                          placeholder="Cambiar Imágen"
                          value={nombreArchivo}
                          readOnly
                          onClick={() => document.getElementById('archivoUpdate').click()}
                        />
                      </div>
                    </div>

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
                      <h3 className="ProductsAdmin__product-name">{producto.nombre}</h3>
                      <p><strong>ID producto:</strong> <span className="ProductsAdmin__value">{producto.id}</span></p>
                      <p><strong>Descripción:</strong> <span className="ProductsAdmin__value">{producto.descripcion}</span></p>
                      <p><strong>Marca:</strong> <span className="ProductsAdmin__value">{producto.marca}</span></p>
                      <p><strong>Precio:</strong> <span className="ProductsAdmin__value">${producto.precio}</span></p>
                      <p><strong>Stock:</strong> <span className="ProductsAdmin__value">{producto.stock}</span></p>
                      <p><strong>Modelo:</strong> <span className="ProductsAdmin__value">{producto.modelo || "-"}</span></p>
                      <p><strong>Descuento:</strong> <span className="ProductsAdmin__value">{producto.descuento}%</span></p>
                      <p><strong>Categoría:</strong> <span className="ProductsAdmin__value">{producto.nombreCategoria}</span></p>
                  
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