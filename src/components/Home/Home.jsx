import React, { useState } from 'react'; // 
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

const Home = () => {
  const navigate = useNavigate();
  const sliderRef = React.useRef(null);

  const images = [imagen1, imagen2, imagen3];
  const imageDescriptions = [
    "Explorá nuestras fundas exclusivas",
    "Descubre los auriculares más modernos",
    "Fundas premium para tu iPhone",
  ];

  const buttons = [
    { text: "Explorar Fundas", action: () => navigate('/categories/fundas/vertodo') },
    { text: "Ver Auriculares", action: () => navigate('/categories/auriculares/vertodo') },
    { text: "Ver Más", action: () => navigate('/categories/fundas/iphone/modelos') },
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

  const [featuredProducts] = useState([
    {
      id: 1,
      name: "Funda de Silicona para Samsung",
      description: "Protección suave y flexible para tu Samsung.",
      price: "$5.000",
      img: "https://via.placeholder.com/600x400",
    },
    {
      id: 2,
      name: "Cargador Inalámbrico Universal",
      description: "Carga rápida y segura para cualquier dispositivo.",
      price: "$9.500",
      img: "https://via.placeholder.com/600x400",
    },
    {
      id: 3,
      name: "Funda Antigolpes para iPhone",
      description: "Resistencia máxima a golpes y caídas.",
      price: "$6.000",
      discount: "-15% OFF",
      originalPrice: "$7.000",
      img: "https://via.placeholder.com/600x400",
    },
    {
      id: 4,
      name: "Auriculares Bluetooth Inalámbricos",
      description: "Conectividad Bluetooth y diseño ergonómico.",
      price: "$12.000",
      img: "https://via.placeholder.com/600x400",
    },
    {
      id: 5,
      name: "Protector de Pantalla 3D",
      description: "Protección total para la pantalla curva de tu móvil.",
      price: "$3.900",
      img: "https://via.placeholder.com/600x400",
    },
  ]);

  return (
    <div className="home">
      <div className="intro-text">
        <h1>¡Bienvenido a Top Cases!</h1>
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

      {/* Servicios destacados */}
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

      {/* Productos Destacados */} {/* --- SECCIÓN AGREGADA */}
      <div className="featured-products">
        <h2>Productos Destacados</h2>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.img} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="product-price">
                {product.discount && <span className="product-discount">{product.discount}</span>}
                {product.price}
                {product.originalPrice && (
                  <span className="original-price">{product.originalPrice}</span>
                )}
              </p>
              <button>Comprar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
