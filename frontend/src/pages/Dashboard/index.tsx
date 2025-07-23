import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { FaUsers, FaUser, FaStore, FaSkull } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// @ts-ignore
import img1 from '../../assets/imagen1.png';
// @ts-ignore
import img2 from '../../assets/imagen2.png';
// @ts-ignore
import img3 from '../../assets/imagen3.png';

const ACCENT = '#00BFFF';
const DARK_BG = '#181A20';
const CARD_BG = '#23263a';

// Carrusel principal (slides de ejemplo)
const carouselSlides = [
  {
    image: img1,
    title: '¡Compite y Gana!',
    desc: 'Participa en duelos y demuestra tus habilidades en ciberseguridad.',
    button: 'Ver Duelos',
    action: '/gulag',
  },
  {
    image: img2,
    title: 'Ranking en Tiempo Real',
    desc: 'Consulta el leaderboard y escala posiciones con tu equipo.',
    button: 'Ver Ranking',
    action: '/team-score',
  },
  {
    image: img3,
    title: 'Personaliza tu Perfil',
    desc: 'Desbloquea avatares, fondos y más en la tienda.',
    button: 'Ir a la Tienda',
    action: '/shop',
  },
];

// Datos mock para MVP TEAM y MVP USER
const mvpTeams = [
  {
    avatar: img1,
    name: 'Equipo Alpha',
    stats: { criticas: 5, medias: 2, bajas: 8 },
  },
  {
    avatar: img2,
    name: 'Equipo Beta',
    stats: { criticas: 2, medias: 4, bajas: 6 },
  },
  {
    avatar: '',
    name: 'Equipo Gamma',
    stats: { criticas: 1, medias: null, bajas: 3 },
  },
];

const mvpUsers = [
  {
    avatar: img3,
    name: 'UsuarioX',
    stats: { criticas: 3, medias: 7, bajas: 10 },
  },
  {
    avatar: '',
    name: 'H4ck3r',
    stats: { criticas: 4, medias: 2, bajas: null },
  },
  {
    avatar: img2,
    name: 'CyberQueen',
    stats: { criticas: null, medias: 5, bajas: 2 },
  },
];

const cards = [
  {
    title: 'Ranking',
    icon: <FaUsers size={32} />, 
    color: 'from-blue-500 to-blue-700',
    action: '/team-score',
  },
  {
    title: 'STORE',
    icon: <FaStore size={32} />, 
    color: 'from-green-500 to-green-700',
    action: '/shop',
  },
  {
    title: 'Gulag',
    icon: <FaSkull size={32} />, 
    color: 'from-red-500 to-red-700',
    action: '/gulag',
  },
  {
    title: 'Perfil',
    icon: <FaUser size={32} />, 
    color: 'from-cyan-500 to-cyan-700',
    action: '/profile',
  },
];

const mvpCardStyle = {
  background: CARD_BG,
  borderRadius: 32,
  boxShadow: '0 4px 32px rgba(0,191,255,0.10)',
  minHeight: 520,
  minWidth: 220,
  maxWidth: 260,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const avatarStyle = {
  width: 100,
  height: 100,
  borderRadius: '50%',
  objectFit: 'cover' as const,
  border: `4px solid ${ACCENT}`,
  background: '#222',
  margin: '0 auto 24px auto',
  display: 'block',
};

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
};

const mainSliderSettings = {
  dots: true,
  infinite: true,
  speed: 700,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 3500,
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: DARK_BG, minHeight: '100vh' }} className="w-full px-0 py-0">
      {/* Carrusel principal */}
      <div className="w-full flex justify-center items-center py-6">
        <div className="relative w-full max-w-4xl h-64 rounded-3xl overflow-hidden shadow-2xl" style={{ background: '#23263a' }}>
          <Slider {...mainSliderSettings} className="w-full h-full">
            {carouselSlides.map((slide, _) => (
              <div key={slide.title} className="w-full h-64 relative flex items-stretch" style={{ borderRadius: 24 }}>
                {/* Imagen de fondo */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ borderRadius: 24, zIndex: 1 }}
                />
                {/* Overlay oscuro */}
                <div className="absolute inset-0 bg-black bg-opacity-60" style={{ borderRadius: 24, zIndex: 2 }} />
                {/* Contenido */}
                <div className="relative z-10 w-full h-full flex flex-col justify-center items-start px-12" style={{ borderRadius: 24 }}>
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
          </Slider>
        </div>
      </div>
      {/* Grid de cards y carruseles MVP */}
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-12 py-10 px-4">
        {/* Grid de cards 2x2 */}
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="grid grid-cols-2 gap-6" style={{width: 'max-content'}}>
            {cards.map((card) => (
              <div
                key={card.title}
                onClick={() => navigate(card.action)}
                className={`cursor-pointer flex flex-col items-center justify-center rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br ${card.color} group`}
                style={{ minHeight: 240, minWidth: 240, maxWidth: 320, maxHeight: 320, aspectRatio: '1/1', fontSize: '1.5rem' }}
              >
                <div className="mb-2 text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-200">{card.icon}</div>
                <div className="text-3xl font-bold text-white mb-1 drop-shadow-lg">{card.title}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Columna derecha: Carruseles MVP en fila */}
        <div className="flex flex-col w-full flex-[2] mt-8 lg:mt-0">
          <div className="flex flex-row gap-4 w-full justify-center items-start">
            {/* Carrusel MVP TEAM */}
            <div style={{...mvpCardStyle, width: '100%', maxWidth: 260}} className="p-8 flex flex-col items-center justify-center flex-1">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">MVP TEAM</h2>
              <Slider {...sliderSettings} className="w-full">
                {mvpTeams.map((team, _) => (
                  <div key={team.name} className="flex flex-col items-center justify-center text-center h-full">
                    <img
                      src={team.avatar || 'https://via.placeholder.com/100x100/23263a/00BFFF?text=TEAM'}
                      alt={team.name}
                      style={avatarStyle}
                    />
                    <div className="text-xl font-bold text-white mb-2 mt-2 w-full">{team.name}</div>
                    <div className="flex gap-6 justify-center text-center text-base w-full">
                      <div>
                        <div className="text-gray-400">Críticas</div>
                        <div className="text-blue-400 font-bold">{team.stats.criticas ?? 'N/A'}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Medias</div>
                        <div className="text-blue-400 font-bold">{team.stats.medias ?? 'N/A'}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Bajas</div>
                        <div className="text-blue-400 font-bold">{team.stats.bajas ?? 'N/A'}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
            {/* Carrusel MVP USER */}
            <div style={{...mvpCardStyle, width: '100%', maxWidth: 260}} className="p-8 flex flex-col items-center justify-center flex-1">
              <h2 className="text-2xl font-bold text-pink-400 mb-4 text-center">MVP USER</h2>
              <Slider {...sliderSettings} className="w-full">
                {mvpUsers.map((user, _) => (
                  <div key={user.name} className="flex flex-col items-center justify-center text-center h-full">
                    <img
                      src={user.avatar || 'https://via.placeholder.com/100x100/23263a/00BFFF?text=USER'}
                      alt={user.name}
                      style={avatarStyle}
                    />
                    <div className="text-xl font-bold text-white mb-2 mt-2 w-full">{user.name}</div>
                    <div className="flex gap-6 justify-center text-center text-base w-full">
                      <div>
                        <div className="text-gray-400">Críticas</div>
                        <div className="text-blue-400 font-bold">{user.stats.criticas ?? 'N/A'}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Medias</div>
                        <div className="text-blue-400 font-bold">{user.stats.medias ?? 'N/A'}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Bajas</div>
                        <div className="text-blue-400 font-bold">{user.stats.bajas ?? 'N/A'}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 