import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import tienda from '../assets/images/otros/Tienda.png';
import tienda2 from '../assets/images/otros/Tienda2.png';
import tienda3 from '../assets/images/otros/Tienda3.png';
import tienda4 from '../assets/images/otros/Tienda4.png';
import tienda5 from '../assets/images/otros/Tienda5.png';

// Imágenes ficticias relacionadas con tienda
const shopImages = [
  tienda,
  tienda2,
  tienda3,
  tienda4,
  tienda5,
];

const ShopCard: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  // Auto-slide cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === shopImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCardClick = () => {
    navigate('/shop');
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-xl shadow-sm w-full h-full cursor-pointer overflow-hidden relative group"
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      aria-label="Ver tienda"
    >
      {/* Carrusel de imágenes */}
      <div className="w-full h-full relative">
        {shopImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Tienda ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            draggable={false}
          />
        ))}
        {/* Overlay con texto */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center pointer-events-none w-full h-full">
          <h2 className="text-xl font-bold text-white text-center drop-shadow-lg select-none">
            TIENDA
          </h2>
        </div>
        {/* Indicadores de carrusel */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {shopImages.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? 'bg-white scale-125'
                  : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
        {/* Efecto hover */}
        <div className="absolute inset-0 bg-blue-500 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center pointer-events-none w-full h-full" />
      </div>
    </div>
  );
};

export default ShopCard; 