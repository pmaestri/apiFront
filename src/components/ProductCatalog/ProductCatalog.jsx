import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ProductCatalog.css';
import {
    obtenerProductosDisponiblesConDetalles,
    obtenerDetalleProducto,
    filtrarProductos
} from '../../api/ProductCatalogApi';
import { FaTimes, FaShoppingCart } from 'react-icons/fa';

const ProductCatalog = () => {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const [filtros, setFiltros] = useState({ nombre: '', categoriaId: '', precioMinimo: '', precioMaximo: '', marca: '', modelo: '' });
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [message, setMessage] = useState(null);
    const [modelos, setModelos] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();

    const marcas = ['IPHONE', 'SAMSUNG', 'MOTOROLA', 'GENERICO'];
    const modelosPorMarca = {
        IPHONE: ['IPHONE_15_PRO_MAX', 'IPHONE_15_PRO', 'IPHONE_15_PLUS', 'IPHONE_15', 'IPHONE_14_PRO_MAX', 'IPHONE_14_PRO', 'IPHONE_14_PLUS', 'IPHONE_14', 'IPHONE_13_PRO_MAX', 'IPHONE_13_PRO', 'IPHONE_13_MINI', 'IPHONE_13'],
        SAMSUNG: ['GALAXY_S23_ULTRA', 'GALAXY_S23_PLUS', 'GALAXY_S23', 'GALAXY_Z_FOLD_5', 'GALAXY_Z_FLIP_5', 'GALAXY_S22_ULTRA', 'GALAXY_S22_PLUS', 'GALAXY_S22', 'GALAXY_A54_5G', 'GALAXY_A34_5G', 'GALAXY_A14_5G', 'GALAXY_A04S'],
        MOTOROLA: ['MOTOROLA_EDGE_40_PRO', 'MOTOROLA_EDGE_40', 'MOTOROLA_EDGE_30_ULTRA', 'MOTOROLA_EDGE_30_FUSION', 'MOTO_G73_5G', 'MOTO_G53_5G', 'MOTO_G23', 'MOTO_G13', 'MOTO_E22', 'MOTO_E32'],
        GENERICO: []
    };

    // Función para obtener el parámetro de la URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const categoriaId = params.get('categoria');
        const searchQuery = params.get('search');  // Capturamos el valor de búsqueda
        const productoId = params.get('productoId'); // Capturamos el id del producto si existe

        if (categoriaId) {
            setFiltros((prevFiltros) => ({ ...prevFiltros, categoriaId }));
        }

        if (searchQuery) {
            setFiltros((prevFiltros) => ({ ...prevFiltros, nombre: searchQuery }));
            handleFiltrarProductos(searchQuery); // Llamamos a la función para filtrar por nombre
        }

        // Si existe un productoId en la URL, abrimos automáticamente el detalle del producto
        if (productoId) {
            handleVerDetalleProducto(productoId);
        }
    }, [location]);

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

    const handleMarcaChange = (e) => {
        const marcaSeleccionada = e.target.value;
        setFiltros({ ...filtros, marca: marcaSeleccionada, modelo: '' });
        setModelos(modelosPorMarca[marcaSeleccionada] || []);
    };

    const handleFiltrarProductos = async (nombreProducto = '') => {
        setLoading(true);
        try {
            const filtrosAEnviar = {
                ...(nombreProducto && { nombre: nombreProducto }),  // Filtramos solo por nombre cuando se usa el botón de búsqueda
                ...(filtros.categoriaId && { categoriaId: filtros.categoriaId }),
                ...(filtros.precioMinimo && { precioMinimo: parseFloat(filtros.precioMinimo) }),
                ...(filtros.precioMaximo && { precioMaximo: parseFloat(filtros.precioMaximo) }),
                ...(filtros.marca && { marca: filtros.marca.toUpperCase() }),
                ...(filtros.modelo && { modelo: filtros.modelo.toUpperCase() })
            };

            const dataFiltrada = await filtrarProductos(filtrosAEnviar);
            setProductos(dataFiltrada);

            if (dataFiltrada.length === 0) {
                setMessage(`No se han encontrado productos para los criterios seleccionados.`);
            } else {
                setMessage(null);
            }
        } catch (error) {
            setError(`Error al filtrar productos: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

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

    const addToCart = (product, quantity) => {
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        const productInCart = currentCart.find(item => item.id === product.id);

        const finalPrice = product.descuento > 0 
          ? (product.precio * (1 - product.descuento / 100))  
          : product.precio;  

        if (productInCart) {
            const totalQuantity = productInCart.quantity + quantity;

            if (totalQuantity <= product.stock) {
                productInCart.quantity = totalQuantity; 
            } else {
                alert(`No puedes agregar más de ${product.stock} unidades en total para ${product.nombre}.`);
                return;
            }
        } else {
            currentCart.push({ 
                id: product.id,
                name: product.nombre, 
                price: finalPrice, 
                originalPrice: product.precio, 
                image: `data:image/jpeg;base64,${product.imagen}`, 
                discount: product.descuento, 
                quantity: quantity, 
                stock: product.stock 
              });
        }

        localStorage.setItem('cart', JSON.stringify(currentCart));

        setShowSuccessMessage(true);
        setTimeout(() => {
            setShowSuccessMessage(false);
        }, 3000);
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
                            <option value="1">Fundas</option>
                            <option value="2">Vidrios</option>
                            <option value="3">Cargadores</option>
                            <option value="4">Auriculares</option>
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
                    {loading ? (
                        <p>Cargando productos...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : message ? (
                        <p className="no-results-message">{message}</p>
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
                            <p>No se encontraron productos que coincidan con tu búsqueda.</p>
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
