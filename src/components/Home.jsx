import React from 'react';
import './Home.css';
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
    "Explorá nuestras fundas exclusivas",
    "Descubre los auriculares más modernos",
    "Fundas premium para tu iPhone",
  ];

  const buttons = [
    { text: "Explorar Fundas", action: () => navigate('/categories/fundas/iphone/models') },
    { text: "Ver Auriculares", action: () => navigate('/categories/auriculares') },
    { text: "Ver Más", action: () => navigate('/categories/fundas/iphone') },
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
          <h3>Envío Gratis</h3>
          <p>Envío gratis a todo el país para compras a partir de $25.000</p>
        </div>
        <div className="service-item">
          <h3>Descuentos</h3>
          <p>10% de descuento con efectivo y transferencia</p>
        </div>
        <div className="service-item">
          <h3>Devoluciones</h3>
          <p>Devolución gratis dentro de los 30 días</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
