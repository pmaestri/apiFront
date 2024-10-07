import React, { useEffect, useState } from 'react';
import './ProductCatalog.css';
import {
    obtenerProductosDisponiblesConDetalles,
    obtenerDetalleProducto,
    filtrarProductos
} from '../../api/ProductCatalogApi';
import { FaTimes, FaShoppingCart, FaFilter } from 'react-icons/fa';

const ProductCatalog = () => {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const [mostrarFiltro, setMostrarFiltro] = useState(false);
    const [filtros, setFiltros] = useState({ nombre: '', categoriaId: '', precioMinimo: '', precioMaximo: '', marca: '', modelo: '' });
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Estado para el mensaje de éxito
    const [message, setMessage] = useState(null); // Nuevo estado para manejar los mensajes informativos

    useEffect(() => {
        const fetchProductos = async () => {
            setLoading(true);
            try {
                const data = await obtenerProductosDisponiblesConDetalles();
                setProductos(data);
            } catch (error) {
                setError(`Error al obtener productos: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, []);

    const handleVerDetalleProducto = async (productoId) => {
        setLoading(true);
        try {
            const detalle = await obtenerDetalleProducto(productoId);
            setProductoSeleccionado(detalle);
        } catch (error) {
            setError(`Error al obtener el detalle del producto: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseDetail = () => {
        setProductoSeleccionado(null);
    };

    const increaseQuantity = () => {
        setCantidad(cantidad + 1);
    };

    const decreaseQuantity = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    };

    const handleFiltrarProductos = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const filtrosAEnviar = {
                ...(filtros.nombre && { nombre: filtros.nombre }), 
                ...(filtros.categoriaId && { categoriaId: filtros.categoriaId }),
                ...(filtros.precioMinimo && { precioMinimo: parseFloat(filtros.precioMinimo) }),
                ...(filtros.precioMaximo && { precioMaximo: parseFloat(filtros.precioMaximo) }),
                ...(filtros.marca && { marca: filtros.marca }),
                ...(filtros.modelo && { modelo: filtros.modelo }),
            };

            const dataFiltrada = await filtrarProductos(filtrosAEnviar);
            setProductos(dataFiltrada);
        } catch (error) {
            setError(`Error al filtrar productos: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Función para agregar productos al carrito
    const addToCart = (product, quantity) => {
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        const productInCart = currentCart.find(item => item.id === product.id);

        if (productInCart) {
            // Si ya está en el carrito, aumenta la cantidad
            productInCart.quantity += quantity;
        } else {
            // Agrega el producto al carrito con toda la información necesaria
            currentCart.push({ 
                id: product.id,
                name: product.nombre,
                price: product.precio,
                image: `data:image/jpeg;base64,${product.imagen}`,  // Usa la imagen del producto
                quantity: quantity
            });
        }

        // Guarda en el localStorage
        localStorage.setItem('cart', JSON.stringify(currentCart));
        console.log("Producto agregado al carrito:", currentCart);  // Para depurar

        // Mostrar mensaje de éxito
        setShowSuccessMessage(true);
        setTimeout(() => {
            setShowSuccessMessage(false);  // Oculta el mensaje después de 3 segundos
        }, 3000);
    };

    return (
        <div className="product-catalog">
            <div className="header-container">
                <h2>Catálogo de Productos</h2>
                <div className="filter-icon" onClick={() => setMostrarFiltro(!mostrarFiltro)}>
                    <FaFilter />
                    <span className="filter-text">Filtrar Productos</span>
                </div>
            </div>

            {mostrarFiltro && (
                <form className="filter-form" onSubmit={handleFiltrarProductos}>
                    <input
                        type="text"
                        placeholder="Nombre del Producto"
                        value={filtros.nombre}
                        onChange={(e) => setFiltros({ ...filtros, nombre: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Categoría"
                        value={filtros.categoriaId}
                        onChange={(e) => setFiltros({ ...filtros, categoriaId: e.target.value })}
                    />
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
                    <input
                        type="text"
                        placeholder="Marca"
                        value={filtros.marca}
                        onChange={(e) => setFiltros({ ...filtros, marca: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Modelo"
                        value={filtros.modelo}
                        onChange={(e) => setFiltros({ ...filtros, modelo: e.target.value })}
                    />
                    <button type="submit">Filtrar</button>
                </form>
            )}

            {loading ? (
                <p>Cargando productos...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <div className="product-list">
                    {productos.length > 0 ? (
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
                        <p>No se encontraron productos que coincidan con tu búsqueda.</p>
                    )}
                </div>
            )}

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
                                <p className="product-price">${productoSeleccionado.precio}</p>

                                {productoSeleccionado.descuento > 0 && (
                                    <p className="discounted-price">
                                        Precio con Descuento: $
                                        {((productoSeleccionado.precio * (100 - productoSeleccionado.descuento)) / 100).toFixed(2)}
                                    </p>
                                )}
                                <p>{productoSeleccionado.descripcion}</p>

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
                                        if (cantidad > productoSeleccionado.stock) {
                                            setMessage(`No hay suficiente stock disponible. Stock actual: ${productoSeleccionado.stock}`);
                                            setTimeout(() => setMessage(''), 3000);
                                        } else {
                                            addToCart(productoSeleccionado, cantidad);
                                            setError(null);
                                            setShowSuccessMessage(true);
                                            setTimeout(() => setShowSuccessMessage(false), 3000);
                                        }
                                    }}
                                >
                                    <FaShoppingCart className="cart-icon" />
                                    <span>Agregar al Carrito</span>
                                </button>

                                
                                <div style={{ height: '50px' }}>
                                    {/* Mensaje de éxito cuando se agrega correctamente */}
                                    {showSuccessMessage && (
                                        <p className="success-message">¡Producto agregado con éxito!</p>
                                    )}

                                    {/* Mostrar mensaje informativo de stock insuficiente */}
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
