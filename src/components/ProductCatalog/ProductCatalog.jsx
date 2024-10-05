import React, { useEffect, useState } from 'react';
import './ProductCatalog.css';
import {
    obtenerProductosDisponiblesConDetalles,
    agregarProductoACatalogo,
    obtenerDetalleProducto
} from '../../api/ProductCatalogApi';
import { FaTimes, FaShoppingCart } from 'react-icons/fa'; // Importar los iconos

const ProductCatalog = () => {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null); // Estado para el detalle del producto
    const [cantidad, setCantidad] = useState(1); // Estado para la cantidad de productos

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

    // Manejar la obtención del detalle del producto
    const handleVerDetalleProducto = async (productoId) => {
        setLoading(true);
        try {
            const detalle = await obtenerDetalleProducto(productoId); // Llamar a la función de la API
            setProductoSeleccionado(detalle); // Almacenar el detalle del producto en el estado
        } catch (error) {
            setError(`Error al obtener el detalle del producto: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseDetail = () => {
        setProductoSeleccionado(null); // Cierra el detalle del producto
    };

    const increaseQuantity = () => {
        setCantidad(cantidad + 1);
    };

    const decreaseQuantity = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    };

    return (
        <div className="product-catalog">
            <h2>Catálogo de Productos</h2>
            {loading ? (
                <p>Cargando productos...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <div className="product-list">
                    {productos.map((producto) => (
                        <div key={producto.id} className="product-item">
                            <img
                                src={`data:image/jpeg;base64,${producto.imagen}`}
                                alt={producto.nombre}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'path/to/placeholder/image.jpg'; // Imagen de reserva
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

                            <button onClick={() => handleVerDetalleProducto(producto.id)}>Comprar</button>
                        </div>
                    ))}
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
          <p>{productoSeleccionado.descripcion}</p>
          <p className="product-price">${productoSeleccionado.precio}</p>

          {/* Mostrar el descuento si está disponible */}
          {productoSeleccionado.descuento > 0 && (
            <>
              <p className="discounted-price">
                Precio con Descuento: $
                {((productoSeleccionado.precio * (100 - productoSeleccionado.descuento)) / 100).toFixed(2)}
              </p>
            </>
          )}

          {/* Detalle de atributos adicionales */}
          <p><strong>Estado:</strong> {productoSeleccionado.disponible ? 'Disponible' : 'No disponible'}</p>
          <p><strong>Categoría:</strong> {productoSeleccionado.nombreCategoria}</p>
          <p><strong>Marca:</strong> {productoSeleccionado.marca}</p>
          <p><strong>Modelo:</strong> {productoSeleccionado.modelo}</p>

          {/* Contador de cantidad */}
          <div className="quantity-selector">
            <button onClick={decreaseQuantity}>-</button>
            <span>{cantidad}</span>
            <button onClick={increaseQuantity}>+</button>
          </div>

          {/* Botón para agregar al carrito */}
          <button className="add-to-cart-btn">
            <FaShoppingCart className="cart-icon" />
            <span>Agregar al Carrito</span>
          </button>
        </div>
      </div>
    </div>
  </div>
)}         
        </div>
    );
};

export default ProductCatalog;