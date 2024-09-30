import React from 'react';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faTag, faUndo } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import imagen1 from '../assets/images/imagen1.png';
import imagen2 from '../assets/images/imagen2.png';
import imagen3 from '../assets/images/imagen3.png';

const Home = () => {
  const navigate = useNavigate();
  const sliderRef = React.useRef(null);

  const images = [imagen1, imagen2, imagen3];
  const imageDescriptions = [
    "Descripción de la imagen 1",
    "Descripción de la imagen 2",
    "Descripción de la imagen 3",
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
      <h1>Bienvenido a Top Cases!</h1>
      <p>Explora nuestra selección de accesorios para celulares</p>

      
      {/* Componente Slider con configuraciones */}
      <Slider {...settings} ref={sliderRef} className="slider-container">
        {images.map((image, index) => (
          <div key={index} className="image-container">
            <img src={image} alt={`Slide ${index + 1}`} className="slider-image" />
          </div>
        ))}
      </Slider>

      {/* Íconos de servicios */}
      <div className="services">
        <div className="service-item">
          <FontAwesomeIcon icon={faTruck} size="2x" />
          <p>Envíos gratis a todo el país para compras de $25000 o más</p>
        </div>
        <div className="service-item">
          <FontAwesomeIcon icon={faTag} size="2x" />
          <p>10% de descuento con efectivo y transferencias</p>
        </div>
        <div className="service-item">
          <FontAwesomeIcon icon={faUndo} size="2x" />
          <p>Devoluciones gratis dentro de los 30 días</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
