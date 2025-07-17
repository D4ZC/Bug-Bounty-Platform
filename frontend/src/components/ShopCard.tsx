import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Imágenes ficticias relacionadas con tienda
const shopImages = [
  'https://images.unsplash.com/photo-144198630917-64674d600d8c?auto=format&fit=crop&w=400&q=80', // Tienda de ropa
  'https://images.unsplash.com/photo-1556742049-0c9c-4f5b-8c1a-0b5e5b9b2c5d?auto=format&fit=crop&w=400&q=80', // Tienda de tecnología
  'https://images.unsplash.com/photo-1441984904996-e0b6ba6874b1?auto=format&fit=crop&w=400&q=80', // Tienda de libros
  'https://images.unsplash.com/photo-1472851294608-624d29cc6e51?auto=format&fit=crop&w=400&q=80', // Tienda de juguetes
  'https://images.unsplash.com/photo-1564723542431-b33ff0c44443?auto=format&fit=crop&w=400&q=80', // Tienda de deportes
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