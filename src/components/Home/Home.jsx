import React, { useState, useEffect } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShippingFast, faTag, faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import imagen1 from '../../assets/images/imagen1.png';
import imagen2 from '../../assets/images/imagen2.png';
import imagen3 from '../../assets/images/imagen3.png';
//import { obtenerProductosDisponiblesConDetalles } from '../../api/ProductCatalogApi';
import { useDispatch, useSelector } from 'react-redux';
//import { fetchProductosDisponiblesConDetalles } from '../../api/ProductCatalogSlice';
import { fetchUsuarioVisualDto } from '../../api/UserSlice';
import { setAuthToken } from '../../api/UserApi';


const Home = () => {
  const navigate = useNavigate();
  const sliderRef = React.useRef(null);
  const dispatch = useDispatch();
  const [nombre, setNombre] = useState(null);
  
  const [featuredProducts, setFeaturedProducts] = useState([]);

  //const { productosDisponibles, loading } = useSelector((state) => state.productosDisponibles);
  const token = useSelector((state) => state.auth.token);
  const nombreUsuario = useSelector((state) => state.usuarios.usuarioDTO);
  console.log(nombreUsuario)
  console.log(token);
  

  useEffect(() => {
    if (token && !nombreUsuario) {
      setAuthToken(token);
      dispatch(fetchUsuarioVisualDto());
      
    }
    if (nombreUsuario){
      setNombre(nombreUsuario.nombreUsuario);
    }
  }, [dispatch, nombreUsuario]);

 /* useEffect(() => {
    const storedNombreUsuario = localStorage.getItem('nombreUsuario');
    if (storedNombreUsuario) {
      setNombreUsuario(storedNombreUsuario);
    }
  }, []);*/

  // useEffect(() => {
  //   // Despachar la acción para obtener los productos si aún no están cargados
  //   if (!loading && productosDisponibles.length === 0) {
  //     dispatch(fetchProductosDisponiblesConDetalles());
  //   }
  // }, [dispatch, loading, productosDisponibles.length]);

  // useEffect(() => {
  //   // Este efecto se ejecuta solo cuando los productos disponibles están cargados
  //   if (productosDisponibles.length > 0) {
  //     const randomProducts = productosDisponibles.sort(() => 0.5 - Math.random()).slice(0, 5);
  //     setFeaturedProducts(randomProducts);
  //   }
  // }, [productosDisponibles]);


  const images = [imagen1, imagen2, imagen3];
  const imageDescriptions = [
    "Explorá nuestras fundas exclusivas",
    "Descubre los auriculares más modernos",
    "Fundas premium para tu iPhone",
  ];

  const buttons = [
    { text: "Ver Más", action: () => navigate('/ProductCatalog') },
    { text: "Ver Más", action: () => navigate('/ProductCatalog') },
    { text: "Ver Más", action: () => navigate('/ProductCatalog') },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="home">
      <div className="Bienvenido-message-home">
        <h2>
          {nombre === 'topCases' 
            ? '¡Bienvenido Admin a Top Cases!' 
            : `¡Bienvenido${nombre? ` ${nombre}` : ''} a Top Cases!`}
        </h2>
      </div>

      <div className="intro-text">
        <p>Accesorios para celulares con estilo y protección</p>
      </div>

      <Slider {...settings} ref={sliderRef} className="slider-container">
        {images.map((image, index) => (
          <div key={index} className="image-container">
            <img src={image} alt={`Slide ${index + 1}`} className="slider-image" />
            <div className="overlay">
              <h2>{imageDescriptions[index]}</h2>
              <button onClick={buttons[index].action}>
                {buttons[index].text}
              </button>
            </div>
          </div>
        ))}
      </Slider>

      <div className="services">
        <div className="service-item">
          <FontAwesomeIcon icon={faShippingFast} size="2x" style={{ marginBottom: '10px' }} />
          <h3>Envío Gratis</h3>
          <p>Envío gratis a todo el país para compras a partir de $25.000</p>
        </div>
        <div className="service-item">
          <FontAwesomeIcon icon={faTag} size="2x" style={{ marginBottom: '10px' }} />
          <h3>Descuentos</h3>
          <p>10% de descuento con efectivo y transferencias</p>
        </div>
        <div className="service-item">
          <FontAwesomeIcon icon={faUndoAlt} size="2x" style={{ marginBottom: '10px' }} />
          <h3>Devoluciones</h3>
          <p>Devolución gratis dentro de los 30 días</p>
        </div>
      </div>

      <div className="featured-products">
        <h2>Productos Destacados</h2>
        <div className="product-grid">
          {featuredProducts.length === 0 ? (
            <p>Cargando productos...</p>
          ) : (
            featuredProducts.map((product) => {
              const precioFinal = product.descuento > 0
                ? product.precio - (product.precio * product.descuento) / 100
                : product.precio;

              return (
                <div key={product.id} className="product-card">
                  <img src={`data:image/jpeg;base64,${product.imagen}`} alt={product.nombre} className="Product-image-home" />
                  <h3>{product.nombre}</h3> 
                  <p>{product.descripcion}</p> 
                  <div className="product-price-home">
                    {product.descuento > 0 && (
                      <div className="price-row">
                        <strong><span className="product-discount">-{product.descuento}%</span></strong>
                        <strong><span className="original-prices">${product.precio.toFixed(2)}</span></strong>
                      </div>
                    )}
                    <p className="final-price-home"><strong>${precioFinal.toFixed(2)}</strong></p>
                  </div>
                  <button className="btn-comprar-home" onClick={() => navigate('/ProductCatalog')}>Ver Más</button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;