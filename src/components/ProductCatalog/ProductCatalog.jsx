import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ProductCatalog.css';
import { fetchProductosDisponiblesConDetalles, filterProductos, fetchDetalleProducto } from '../../api/ProductCatalogSlice';
import { FaTimes, FaShoppingCart } from 'react-icons/fa';
import { setAuthToken } from '../../api/CartApi';
import { agregarAlCarrito } from '../../api/CartSilce';
import { fetchCategorias } from '../../api/CategorySlice';
import { useDispatch, useSelector } from 'react-redux';

const ProductCatalog = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const [filtros, setFiltros] = useState({ nombre: '', categoriaId: '', precioMinimo: '', precioMaximo: '', marca: '', modelo: '' });
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [message, setMessage] = useState(null);
    const [modelos, setModelos] = useState([]);
    const location = useLocation();
    const Dispatch = useDispatch();
    const categorias = useSelector((state) => state.categorias.categorias);
    const token = useSelector((state)=>state.auth.token);
    const productos = useSelector((state) => state.catalogo.productosDisponibles);
    const loading1 = useSelector((state) => state.catalogo.loading);
    const error1 = useSelector((state) => state.catalogo.error);
    const marcas = ['IPHONE', 'SAMSUNG', 'MOTOROLA', 'GENERICO'];
    const modelosPorMarca = {
        IPHONE: ['IPHONE_15_PRO_MAX', 'IPHONE_15_PRO', 'IPHONE_15_PLUS', 'IPHONE_15', 'IPHONE_14_PRO_MAX', 'IPHONE_14_PRO', 'IPHONE_14_PLUS', 'IPHONE_14', 'IPHONE_13_PRO_MAX', 'IPHONE_13_PRO', 'IPHONE_13_MINI', 'IPHONE_13'],
        SAMSUNG: ['GALAXY_S23_ULTRA', 'GALAXY_S23_PLUS', 'GALAXY_S23', 'GALAXY_Z_FOLD_5', 'GALAXY_Z_FLIP_5', 'GALAXY_S22_ULTRA', 'GALAXY_S22_PLUS', 'GALAXY_S22', 'GALAXY_A54_5G', 'GALAXY_A34_5G', 'GALAXY_A14_5G', 'GALAXY_A04S'],
        MOTOROLA: ['MOTOROLA_EDGE_40_PRO', 'MOTOROLA_EDGE_40', 'MOTOROLA_EDGE_30_ULTRA', 'MOTOROLA_EDGE_30_FUSION', 'MOTO_G73_5G', 'MOTO_G53_5G', 'MOTO_G23', 'MOTO_G13', 'MOTO_E22', 'MOTO_E32'],
        GENERICO: []
    };
    useEffect(() => {
        const fetchData = async () => {
            Dispatch(fetchCategorias()); // Llamamos a la acción para obtener las categorías
        };
        fetchData();
    }, [Dispatch]);
    // Función para obtener el parámetro de la URL
    useEffect(() => {
        console.log("Cargando parámetros de URL...");
        const params = new URLSearchParams(location.search);
        const categoriaId = params.get('categoria');
        const searchQuery = params.get('search');  // Capturamos el valor de búsqueda
        const productoId = params.get('productoId'); // Capturamos el id del producto si existe

        if (categoriaId) {
            setFiltros((prevFiltros) => ({ ...prevFiltros, categoriaId }));
            console.log("Categoría filtrada:", categoriaId);
        }

        if (searchQuery) {
            setFiltros((prevFiltros) => ({ ...prevFiltros, nombre: searchQuery }));
            console.log("Búsqueda por nombre:", searchQuery);
            handleFiltrarProductos(searchQuery); // Llamamos a la función para filtrar por nombre
        }

        // Si existe un productoId en la URL, abrimos automáticamente el detalle del producto
        if (productoId) {
            console.log("Producto seleccionado por ID:", productoId);
            handleVerDetalleProducto(productoId);
        }
    }, [location]);

    useEffect(() => {
        const fetchProductos = async () => {
          Dispatch(fetchProductosDisponiblesConDetalles())
            .unwrap() // Maneja la resolución de la promesa
            .then((data) => {
              console.log("Productos obtenidos:", data);
            })
            .catch((error) => {
              console.error("Error al obtener productos:", error);
            });
        };
    
        fetchProductos();
      }, [Dispatch]); // Dependencia en dispatch, no es necesario agregar productos

    const handleMarcaChange = (e) => {
        const marcaSeleccionada = e.target.value;
        setFiltros({ ...filtros, marca: marcaSeleccionada, modelo: '' });
        setModelos(modelosPorMarca[marcaSeleccionada] || []);
        console.log("Marca seleccionada:", marcaSeleccionada);
    };

    const handleFiltrarProductos = async (nombreProducto = '') => {
        console.log("Filtrando productos por:", filtros);
    
        // Establecer el estado de carga en true
        setLoading(true);  
        setMessage(null);  // Restablece el mensaje
        try {
            // Prepara los filtros para enviar
            const filtrosAEnviar = {
                ...(nombreProducto && { nombre: nombreProducto }),  // Filtramos solo por nombre cuando se usa el botón de búsqueda
                ...(filtros.categoriaId && { categoriaId: filtros.categoriaId }),
                ...(filtros.precioMinimo && { precioMinimo: parseFloat(filtros.precioMinimo) }),
                ...(filtros.precioMaximo && { precioMaximo: parseFloat(filtros.precioMaximo) }),
                ...(filtros.marca && { marca: filtros.marca.toUpperCase() }),
                ...(filtros.modelo && { modelo: filtros.modelo.toUpperCase() })
            };
    
            // Despacha el thunk para filtrar productos
            const dataFiltrada = await Dispatch(filterProductos(filtrosAEnviar)).unwrap();
    
            console.log("Productos filtrados:", dataFiltrada);
    
            if (dataFiltrada.length === 0) {
                setMessage(`No se han encontrado productos para los criterios seleccionados.`);
            } else {
                setMessage(null);
            }
        } catch (error) {
            console.error("Error al filtrar productos:", error);
            setError(`Error al filtrar productos: ${error.message}`);
        } finally {
            setLoading(false);  // Se termina la carga
        }
    };

    const handleVerDetalleProducto = async (productoId) => {
        setLoading(true);  // Establece el estado de carga a true
        setError(null);  // Restablece el mensaje de error
    
        try {
            console.log("Obteniendo detalles del producto:", productoId);
    
            // Despacha el thunk para obtener el detalle del producto
            const detalle = await Dispatch(fetchDetalleProducto(productoId)).unwrap();
            
            console.log("Detalle del producto:", detalle);
            setProductoSeleccionado(detalle);  // Guarda el detalle del producto en el estado local
        } catch (error) {
            console.error("Error al obtener el detalle del producto:", error);
            setError(`Error al obtener el detalle del producto: ${error.message}`);
        } finally {
            setLoading(false);  // Termina el estado de carga
        }
    };

    const handleCloseDetail = () => {
        console.log("Cerrando detalle del producto.");
        setProductoSeleccionado(null);
        setCantidad(1); // Reiniciar cantidad
    };

    const increaseQuantity = () => {
        console.log(`Intentando aumentar cantidad. Actual: ${cantidad}`);
        if (cantidad < productoSeleccionado.stock) {
            setCantidad(cantidad + 1);
            console.log(`Cantidad aumentada a: ${cantidad + 1}`);
        } else {
            console.log(`No se puede aumentar, cantidad máxima alcanzada: ${productoSeleccionado.stock}`);
            setMessage(`No puedes agregar más de ${productoSeleccionado.stock} unidades.`);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const decreaseQuantity = () => {
        console.log(`Intentando disminuir cantidad. Actual: ${cantidad}`);
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
            console.log(`Cantidad disminuida a: ${cantidad - 1}`);
        } else {
            console.log("Cantidad mínima alcanzada, no se puede disminuir más.");
        }
    };
    const addToCart = async (productoId,cantidad) => {
        console.log("Intentando agregar al carrito...");
    
        if (!token) {
            alert("Por favor, inicia sesión para agregar productos al carrito.");
            return;
        }
    
        try {
            console.log(token);
            // Llama a la función que realiza la petición al backend para agregar el producto al carrito
            console.log(productoId, cantidad);
            setAuthToken(token);
            Dispatch(agregarAlCarrito({productoId: productoId,cantidad: cantidad,token: token}));
            
    
            // Muestra un mensaje de éxito temporal
            setShowSuccessMessage(true);
            console.log("Producto agregado al carrito.");
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
    
        } catch (error) {
            console.error(error.message);
            alert(error.message);
        }
    };
    
    return (
        <div className="product-catalog">
            <div className="catalog-layout">
                <div className="filter-sidebar">
                    <form className="filter-form" onSubmit={(e) => {
                        e.preventDefault();
                        handleFiltrarProductos(filtros.nombre);
                    }}>
                        <input
                            type="text"
                            placeholder="Nombre del Producto"
                            value={filtros.nombre}
                            onChange={(e) => setFiltros({ ...filtros, nombre: e.target.value })}
                        />
                        <select
                            value={filtros.categoriaId}
                            onChange={(e) => setFiltros({ ...filtros, categoriaId: e.target.value })}
                            >
                            <option value="">Selecciona una categoría</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                {categoria.nombre} {/* Asegúrate de que el nombre de la propiedad coincide con el de la API */}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            placeholder="Precio Mínimo"
                            value={filtros.precioMinimo}
                            onChange={(e) => setFiltros({ ...filtros, precioMinimo: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Precio Máximo"
                            value={filtros.precioMaximo}
                            onChange={(e) => setFiltros({ ...filtros, precioMaximo: e.target.value })}
                        />
                        <select
                            value={filtros.marca}
                            onChange={handleMarcaChange}
                        >
                            <option value="">Selecciona una marca</option>
                            {marcas.map((marca) => (
                                <option key={marca} value={marca}>
                                    {marca}
                                </option>
                            ))}
                        </select>
                        <select
                            value={filtros.modelo}
                            onChange={(e) => setFiltros({ ...filtros, modelo: e.target.value })}
                            disabled={!filtros.marca || filtros.marca === 'GENERICO'}
                        >
                            <option value="">Selecciona un modelo</option>
                            {modelos.map((modelo) => (
                                <option key={modelo} value={modelo}>
                                    {modelo.replace(/_/g, ' ')}
                                </option>
                            ))}
                        </select>
                        <button type="submit">Filtrar</button>
                    </form>
                </div>

                <div className="product-list">
                    {loading1 ? (
                        <p>Cargando productos...</p>
                    ) : error1 ? (
                        <p>Error: {error}</p>
                    ) : (
                        productos.length > 0 ? (
                            productos.map((producto) => (
                                <div key={producto.id} className="product-item">
                                    <img
                                        src={`data:image/jpeg;base64,${producto.imagen}`}
                                        alt={producto.nombre}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'path/to/placeholder/image.jpg';
                                        }}
                                    />
                                    <h3>{producto.nombre}</h3>
                                    <p>{producto.descripcion}</p>

                                    {producto.descuento > 0 ? (
                                        <>
                                            <p className="product-price">
                                                <span style={{ color: 'gray', textDecoration: 'line-through' }}>
                                                    ${producto.precio}
                                                </span>{' '}
                                                - {producto.descuento}% OFF
                                            </p>
                                            <p className="discounted-price">
                                                ${((producto.precio * (100 - producto.descuento)) / 100).toFixed(2)}
                                            </p>
                                        </>
                                    ) : (
                                        <p className="product-price">${producto.precio}</p>
                                    )}

                                    <div className="button-container">
                                        <button onClick={() => handleVerDetalleProducto(producto.id)}>Comprar</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="no-products-message-PD">No se encontraron productos que coincidan con tu búsqueda.</p>
                        )
                    )}
                </div>
            </div>

            {productoSeleccionado && (
                <div className="product-detail-overlay">
                    <div className="product-detail-container">
                        <button className="close-icon" onClick={handleCloseDetail} aria-label="Cerrar detalle">
                            <FaTimes />
                        </button>

                        <div className="product-detail-content">
                            <div className="product-image">
                                <img
                                    src={`data:image/jpeg;base64,${productoSeleccionado.imagen}`}
                                    alt={productoSeleccionado.nombre}
                                />
                            </div>
                            <div className="product-info">
                                <h2>{productoSeleccionado.nombre}</h2>
                                <p className="product-price">Precio: ${productoSeleccionado.precio}</p>

                                {productoSeleccionado.descuento > 0 && (
                                    <p className="discounted-price">
                                        Precio con Descuento: $
                                        {((productoSeleccionado.precio * (100 - productoSeleccionado.descuento)) / 100).toFixed(2)}
                                    </p>
                                )}
                                <p><strong>Descripción:</strong> {productoSeleccionado.descripcion}</p>

                                <p><strong>Estado:</strong> {productoSeleccionado.disponible ? 'Disponible' : 'No disponible'}</p>
                                <p><strong>Categoría:</strong> {productoSeleccionado.nombreCategoria}</p>
                                <p><strong>Marca:</strong> {productoSeleccionado.marca}</p>
                                {productoSeleccionado.modelo && (
                                    <p><strong>Modelo:</strong> {productoSeleccionado.modelo}</p>
                                )}

                                <div className="quantity-selector">
                                    <button onClick={decreaseQuantity}>-</button>
                                    <span>{cantidad}</span>
                                    <button onClick={increaseQuantity}>+</button>
                                </div>

                                <button
                                    className="add-to-cart-btn"
                                    onClick={() => {
                                        console.log("Agregando al carrito desde el detalle...");
                                        if (cantidad > productoSeleccionado.stock) {
                                            setMessage(`No hay suficiente stock disponible. Stock actual: ${productoSeleccionado.stock}`);
                                            console.log("No hay suficiente stock disponible.");
                                            setTimeout(() => setMessage(''), 3000);
                                        } else {
                                            console.log(productoSeleccionado.id);
                                            addToCart(productoSeleccionado.id, cantidad);
                                            setError(null);
                                            console.log("Producto agregado al carrito correctamente.");
                                        }
                                    }}
                                >
                                    <FaShoppingCart className="cart-icon" />
                                    <span>Agregar al Carrito</span>
                                </button>

                                <div style={{ height: '50px' }}>
                                    {showSuccessMessage && (
                                        <p className="success-message">¡Producto agregado con éxito!</p>
                                    )}

                                    {message && (
                                        <p className="info-message">
                                            {message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductCatalog;
