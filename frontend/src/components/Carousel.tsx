import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import carrusel from '../assets/images/otros/Carrussel.png';
import carrusel1 from '../assets/images/otros/Carrussel1.png';
import carrusel2 from '../assets/images/otros/Carrussel2.png';
import carrusel3 from '../assets/images/otros/Carrussel3.png';

const images = [
  carrusel,
  carrusel1,
  carrusel2,
  carrusel3,
];

const Carousel: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        className="rounded-2xl shadow-lg"
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={src}
              alt={`Slide ${idx + 1}`}
              className="w-full h-64 object-cover rounded-2xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel; 