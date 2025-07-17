import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaUser, FaTrophy, FaMedal, FaStore, FaSkull, FaCrown } from 'react-icons/fa';
import TeamScoreSection from '../../components/TeamScoreSection';
// import img1 from '../../assets/carrusel1.jpg';
// import img2 from '../../assets/carrusel2.jpg';
// import img3 from '../../assets/carrusel3.jpg';

const ACCENT = '#00BFFF';
const DARK_BG = '#181A20';
const CARD_BG = '#23263a';

const carouselSlides = [
  {
    image: '/src/assets/imagen1.png',
    title: '¡Compite y Gana!',
    desc: 'Participa en duelos y demuestra tus habilidades en ciberseguridad.',
    button: 'Ver Duelos',
    action: '/gulag',
  },
  {
    image: '/src/assets/imagen2.png',
    title: 'Ranking en Tiempo Real',
    desc: 'Consulta el leaderboard y escala posiciones con tu equipo.',
    button: 'Ver Ranking',
    action: '/dashboard',
  },
  {
    image: '/src/assets/imagen3.png',
    title: 'Personaliza tu Perfil',
    desc: 'Desbloquea avatares, fondos y más en la tienda.',
    button: 'Ir a la Tienda',
    action: '/shop',
  },
];

const cards = [
  {
    title: 'Team Score',
    icon: <FaUsers size={32} />, 
    color: 'from-blue-500 to-blue-700',
    action: '/dashboard',
    size: 'large',
    desc: 'Ranking de equipos en tiempo real.'
  },
  {
    title: 'User Score',
    icon: <FaUser size={32} />, 
    color: 'from-purple-500 to-purple-700',
    action: '/dashboard',
    size: 'large',
    desc: 'Ranking de usuarios destacados.'
  },
  {
    title: 'MVP Team',
    icon: <FaCrown size={32} />, 
    color: 'from-yellow-400 to-yellow-600',
    action: '/dashboard',
    size: 'medium',
    desc: 'Equipo más valioso de la semana.'
  },
  {
    title: 'MVP User',
    icon: <FaMedal size={32} />, 
    color: 'from-pink-500 to-pink-700',
    action: '/dashboard',
    size: 'medium',
    desc: 'Usuario más valioso de la semana.'
  },
  {
    title: 'Gulag',
    icon: <FaSkull size={32} />, 
    color: 'from-red-500 to-red-700',
    action: '/gulag',
    size: 'medium',
    desc: 'Zona de duelos y retos extremos.'
  },
  {
    title: 'D4ZC',
    icon: <FaUser size={32} />, 
    color: 'from-cyan-500 to-cyan-700',
    action: '/profile',
    size: 'medium',
    desc: 'Tu perfil y estadísticas.'
  },
  {
    title: 'Store',
    icon: <FaStore size={32} />, 
    color: 'from-green-500 to-green-700',
    action: '/shop',
    size: 'large',
    desc: 'Personaliza tu experiencia.'
  },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  // Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ background: DARK_BG, minHeight: '100vh' }} className="w-full px-0 py-0">
      {/* Carrusel */}
      <div className="w-full flex justify-center items-center py-6">
        <div className="relative w-full max-w-4xl h-64 rounded-3xl overflow-hidden shadow-2xl" style={{ background: '#23263a' }}>
          {carouselSlides.map((slide, idx) => (
            <div
              key={slide.title}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              style={{ background: `url('${slide.image}') center/cover no-repeat`, borderRadius: 24 }}
            >
              <div className="w-full h-full flex flex-col justify-center items-start px-12 bg-black bg-opacity-40" style={{ borderRadius: 24 }}>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-white drop-shadow-lg">{slide.title}</h2>
                <p className="text-lg md:text-xl text-blue-200 mb-4 drop-shadow">{slide.desc}</p>
                <button
                  className="px-6 py-2 rounded-full font-bold text-white bg-blue-500 hover:bg-blue-400 shadow-lg transition-all duration-200 text-lg"
                  onClick={() => navigate(slide.action)}
                >
                  {slide.button}
                </button>
              </div>
            </div>
          ))}
          {/* Flechas manuales opcionales */}
          <div className="absolute bottom-4 right-6 flex gap-2 z-20">
            {carouselSlides.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full ${idx === current ? 'bg-blue-400' : 'bg-gray-400'} transition-all duration-200`}
                onClick={() => setCurrent(idx)}
                aria-label={`Ir a slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-10 justify-items-center">
        {cards.map((card, idx) => {
          if (card.title === 'Team Score') {
            return (
              <div
                key={card.title}
                onClick={() => navigate('/team-score')}
                className={`cursor-pointer flex flex-col items-center justify-center rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br ${card.color} group`}
                style={{ width: 250, height: 170, minWidth: 230, minHeight: 160 }}
              >
                <div className="mb-2 text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-200">{card.icon}</div>
                <div className="text-xl font-bold text-white mb-1 drop-shadow-lg">{card.title}</div>
                <div className="text-sm text-blue-100 text-center px-2">{card.desc}</div>
              </div>
            );
          }
          return (
            <div
              key={card.title}
              onClick={() => navigate(card.action)}
              className={`cursor-pointer flex flex-col items-center justify-center rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br ${card.color} group`}
              style={{ width: 250, height: 170, minWidth: 230, minHeight: 160 }}
            >
              <div className="mb-2 text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-200">{card.icon}</div>
              <div className="text-xl font-bold text-white mb-1 drop-shadow-lg">{card.title}</div>
              <div className="text-sm text-blue-100 text-center px-2">{card.desc}</div>
            </div>
          );
        })}
      </div>
      {/* Sección de gráficas de clasificación */}
    </div>
  );
};

export default Dashboard; 