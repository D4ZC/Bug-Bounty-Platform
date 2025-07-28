import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { FaUsers, FaUser, FaStore, FaSkull, FaTrophy, FaFire, FaRocket } from 'react-icons/fa';
import { GiCrossedSwords, GiArena, GiCrown } from 'react-icons/gi';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// @ts-ignore
import img1 from '../../assets/imagen1.png';
// @ts-ignore
import img2 from '../../assets/imagen2.png';
// @ts-ignore
import img3 from '../../assets/imagen3.png';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PacmanBackground from '../../components/ui/PacmanBackground';
import { useBackground } from '../../contexts/BackgroundContext';
import '../../styles/pacman.css';

// Paleta de colores gamer/futurista
const COLORS = {
  primary: '#00D4FF',      // Cyan brillante
  secondary: '#FF0080',     // Magenta
  accent: '#FFD700',        // Dorado
  success: '#00FF88',       // Verde neón
  warning: '#FF6B35',       // Naranja
  danger: '#FF0040',        // Rojo neón
  dark: '#0A0A0F',          // Negro profundo
  darker: '#1A1A2E',        // Azul oscuro
  card: '#16213E',          // Azul card
  cardHover: '#1E3A8A',     // Azul hover
  text: '#E2E8F0',          // Texto claro
  textMuted: '#94A3B8',     // Texto muted
};

// Carrusel principal mejorado
const carouselSlides = [
  {
    image: img1,
    title: 'ARENA DE BATALLA',
    subtitle: '¡Demuestra tu dominio!',
    desc: 'Enfréntate a los mejores hackers en duelos épicos de ciberseguridad.',
    button: 'ENTRAR A LA ARENA',
    action: '/gulag',
    icon: <GiCrossedSwords className="text-4xl" />,
    gradient: 'from-cyan-500 via-blue-500 to-purple-600',
  },
  {
    image: img2,
    title: 'HALL OF FAME',
    subtitle: 'Los legendarios',
    desc: 'Consulta el ranking de los guerreros más poderosos del ciberespacio.',
    button: 'VER RANKING',
    action: '/team-score',
    icon: <GiCrown className="text-4xl" />,
    gradient: 'from-yellow-400 via-orange-500 to-red-500',
  },
  {
    image: img3,
    title: 'ARSENAL DIGITAL',
    subtitle: 'Personaliza tu poder',
    desc: 'Desbloquea avatares épicos, skins legendarias y equipamiento único.',
    button: 'EXPLORAR TIENDA',
    action: '/shop',
    icon: <FaStore className="text-4xl" />,
    gradient: 'from-green-400 via-emerald-500 to-teal-600',
  },
];

// Datos mock mejorados para MVP
const mvpTeams = [
  {
    avatar: '/src/assets/avatar1.png',
    name: 'PHANTOM HUNTERS',
    title: 'Guardianes del Ciberespacio',
    stats: { criticas: 15, medias: 8, bajas: 23 },
    rank: 1,
    points: 2840,
    effectiveness: 96,
  },
  {
    avatar: '/src/assets/avatar4.png',
    name: 'CYBER WOLVES',
    title: 'Cazadores Nocturnos',
    stats: { criticas: 12, medias: 11, bajas: 19 },
    rank: 2,
    points: 2650,
    effectiveness: 94,
  },
  {
    avatar: '/src/assets/avatar6.png',
    name: 'NEON STRIKERS',
    title: 'Especialistas Elite',
    stats: { criticas: 9, medias: 14, bajas: 17 },
    rank: 3,
    points: 2480,
    effectiveness: 92,
  },
];

const mvpUsers = [
  {
    avatar: '/src/assets/avatar7.png',
    name: 'CYBERPHANTOM',
    title: 'Maestro del Código',
    stats: { criticas: 8, medias: 12, bajas: 15 },
    rank: 1,
    points: 1890,
    effectiveness: 98,
  },
  {
    avatar: '/src/assets/avatar8.png',
    name: 'NEONSTRIKE',
    title: 'Hacker Elite',
    stats: { criticas: 7, medias: 9, bajas: 13 },
    rank: 2,
    points: 1720,
    effectiveness: 95,
  },
  {
    avatar: '/src/assets/avatar9.png',
    name: 'QUANTUMHACK',
    title: 'Especialista Táctico',
    stats: { criticas: 6, medias: 11, bajas: 12 },
    rank: 3,
    points: 1650,
    effectiveness: 93,
  },
];

// Cards de navegación mejoradas
const navigationCards = [
  {
    title: 'GULAG',
    subtitle: 'Sona de Castigos',
    icon: <FaSkull className="text-3xl" />,
    gradient: 'from-red-500 via-pink-500 to-purple-600',
    action: '/gulag',
    description: 'Enfréntate en batallas de ciberseguridad',
  },
  {
    title: 'RANKING',
    subtitle: 'Hall of Fame',
    icon: <FaTrophy className="text-3xl" />,
    gradient: 'from-yellow-400 via-orange-500 to-red-500',
    action: '/team-score',
    description: 'Los mejores guerreros del ciberespacio',
  },
  {
    title: 'ARSENAL',
    subtitle: 'Tienda Digital',
    icon: <FaStore className="text-3xl" />,
    gradient: 'from-green-400 via-emerald-500 to-teal-600',
    action: '/shop',
    description: 'Personaliza tu identidad digital',
  },
  {
    title: 'PERFIL',
    subtitle: 'Tu Legado',
    icon: <FaUser className="text-3xl" />,
    gradient: 'from-blue-500 via-cyan-500 to-indigo-600',
    action: '/profile',
    description: 'Gestiona tu identidad de hacker',
  },
];

// Configuración de sliders
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 4000,
};

const mainSliderSettings = {
  dots: true,
  infinite: true,
  speed: 700,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 5000,
};

// Componente Modal mejorado
const Modal = ({ open, onClose, children }: { open: boolean, onClose: () => void, children: React.ReactNode }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 min-w-[400px] max-w-[90vw] max-h-[90vh] overflow-y-auto border border-cyan-500/30 shadow-2xl">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-6 text-2xl text-gray-400 hover:text-white transition-colors"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

// Estilos para avatares con efectos gamer
const avatar3DStyle = {
  width: 120,
  height: 120,
  borderRadius: '50%',
  objectFit: 'cover' as const,
  border: '4px solid #00D4FF',
  background: '#16213E',
  margin: '0 auto 20px auto',
  display: 'block',
  animation: 'spin3d 3s linear infinite',
  boxShadow: '0 0 30px 0 #00D4FF55, inset 0 0 20px 0 #00D4FF22',
};

const keyframes = `
@keyframes spin3d {
  0% { transform: rotateY(0deg) rotateX(0deg); }
  50% { transform: rotateY(180deg) rotateX(10deg); }
  100% { transform: rotateY(360deg) rotateX(0deg); }
}

@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 20px 0 #00D4FF55; }
  50% { box-shadow: 0 0 40px 0 #00D4FF88; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
`;

// Mock de logros
const mockAchievements = [
  { id: 'a1', name: 'Campeón del Mes', icon: '🏆', color: '#FFD700' },
  { id: 'a2', name: 'Cazador de Críticas', icon: '🔥', color: '#FF6B35' },
  { id: 'a3', name: 'Participación Élite', icon: '⭐', color: '#00D4FF' },
];

// Función para generar datos de gráfica
const getBarChartData = (stats: any) => [
  { tipo: 'Críticas', cantidad: stats.criticas ?? 0, color: '#FF0040' },
  { tipo: 'Medias', cantidad: stats.medias ?? 0, color: '#FF6B35' },
  { tipo: 'Bajas', cantidad: stats.bajas ?? 0, color: '#00FF88' },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any>(null);
  const [modalType, setModalType] = useState<'user' | 'team' | null>(null);
  const { backgroundEnabled } = useBackground();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative">
      {/* Fondo interactivo Pac-Man */}
      {backgroundEnabled && <PacmanBackground />}
      

      
      {/* Estilos globales */}
      <style>{keyframes}</style>
      


      {/* Carrusel principal mejorado */}
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-cyan-500/30">
          <Slider {...mainSliderSettings}>
            {carouselSlides.map((slide, index) => (
              <div key={index} className="relative h-80">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                
                <div className="relative z-10 h-full flex flex-col justify-center items-start p-12">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-full bg-gradient-to-r ${slide.gradient} shadow-lg`}>
                      {slide.icon}
                    </div>
                    <div>
                      <h2 className="text-4xl md:text-5xl font-black text-white mb-2">
                        {slide.title}
                      </h2>
                      <p className="text-xl text-cyan-300 font-semibold">
                        {slide.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="text-lg text-gray-200 mb-6 max-w-md">
                    {slide.desc}
                  </p>
                  <button
                    className={`px-8 py-4 rounded-full font-bold text-lg bg-gradient-to-r ${slide.gradient} text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-white/20`}
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

      {/* Grid principal */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Columna izquierda: Cards de navegación */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-black text-white mb-6 text-center">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                NAVEGACIÓN
              </span>
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {navigationCards.map((card, index) => (
                <div
                  key={card.title}
                  onClick={() => navigate(card.action)}
                  className={`group cursor-pointer rounded-2xl p-6 bg-gradient-to-br ${card.gradient} shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20`}
                >
                  <div className="text-white mb-3 group-hover:scale-110 transition-transform duration-300">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-black text-white mb-1">{card.title}</h3>
                  <p className="text-sm text-white/80 font-medium">{card.subtitle}</p>
                  <p className="text-xs text-white/60 mt-2">{card.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Columna derecha: Carruseles MVP */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black text-white mb-6 text-center">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                LEGENDARIOS
              </span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* MVP TEAM */}
              <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 rounded-2xl p-6 border border-cyan-500/30 shadow-xl">
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                    MVP TEAM
                  </h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
                </div>
                
                <Slider {...sliderSettings} className="mvp-slider">
                  {mvpTeams.map((team, index) => (
                    <div key={team.name} className="text-center">
                      <div className="relative mb-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                        <img
                          src={team.avatar || 'https://via.placeholder.com/120x120/16213E/00D4FF?text=TEAM'}
                          alt={team.name}
                          style={avatar3DStyle}
                          onClick={() => { setModalData(team); setModalType('team'); setModalOpen(true); }}
                          className="cursor-pointer relative z-10"
                        />
                      </div>
                      
                      <h4 className="text-xl font-black text-white mb-1">{team.name}</h4>
                      <p className="text-sm text-cyan-300 font-medium mb-4">{team.title}</p>
                      
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-xs text-gray-400 font-medium">CRÍTICAS</div>
                          <div className="text-lg font-black text-red-400">{team.stats.criticas}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-400 font-medium">MEDIAS</div>
                          <div className="text-lg font-black text-orange-400">{team.stats.medias}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-400 font-medium">BAJAS</div>
                          <div className="text-lg font-black text-green-400">{team.stats.bajas}</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-center gap-4 text-xs">
                        <div className="flex items-center gap-1">
                          <FaTrophy className="text-yellow-400" />
                          <span className="text-white">#{team.rank}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaFire className="text-orange-400" />
                          <span className="text-white">{team.points}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaRocket className="text-cyan-400" />
                          <span className="text-white">{team.effectiveness}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>

              {/* MVP USER */}
              <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 rounded-2xl p-6 border border-purple-500/30 shadow-xl">
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
                    MVP USER
                  </h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto rounded-full"></div>
                </div>
                
                <Slider {...sliderSettings} className="mvp-slider">
                  {mvpUsers.map((user, index) => (
                    <div key={user.name} className="text-center">
                      <div className="relative mb-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                        <img
                          src={user.avatar || 'https://via.placeholder.com/120x120/16213E/00D4FF?text=USER'}
                          alt={user.name}
                          style={avatar3DStyle}
                          onClick={() => { setModalData(user); setModalType('user'); setModalOpen(true); }}
                          className="cursor-pointer relative z-10"
                        />
                      </div>
                      
                      <h4 className="text-xl font-black text-white mb-1">{user.name}</h4>
                      <p className="text-sm text-purple-300 font-medium mb-4">{user.title}</p>
                      
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-xs text-gray-400 font-medium">CRÍTICAS</div>
                          <div className="text-lg font-black text-red-400">{user.stats.criticas}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-400 font-medium">MEDIAS</div>
                          <div className="text-lg font-black text-orange-400">{user.stats.medias}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-400 font-medium">BAJAS</div>
                          <div className="text-lg font-black text-green-400">{user.stats.bajas}</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-center gap-4 text-xs">
                        <div className="flex items-center gap-1">
                          <FaTrophy className="text-yellow-400" />
                          <span className="text-white">#{user.rank}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaFire className="text-orange-400" />
                          <span className="text-white">{user.points}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaRocket className="text-cyan-400" />
                          <span className="text-white">{user.effectiveness}%</span>
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

      {/* Modal de información MVP mejorado */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        {modalData && (
          <div className="text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <img
                src={modalData.avatar || (modalType === 'team' ? 'https://via.placeholder.com/120x120/16213E/00D4FF?text=TEAM' : 'https://via.placeholder.com/120x120/16213E/00D4FF?text=USER')}
                alt={modalData.name}
                style={{ ...avatar3DStyle, width: 140, height: 140, marginBottom: 0 }}
                className="relative z-10"
              />
            </div>
            
            <h2 className="text-3xl font-black text-white mb-2">{modalData.name}</h2>
            <p className="text-lg text-cyan-300 font-medium mb-6">{modalData.title}</p>
            
            {/* Estadísticas principales */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-sm text-gray-400 font-medium">RANKING</div>
                <div className="text-2xl font-black text-yellow-400">#{modalData.rank}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-400 font-medium">PUNTOS</div>
                <div className="text-2xl font-black text-cyan-400">{modalData.points}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-400 font-medium">EFECTIVIDAD</div>
                <div className="text-2xl font-black text-green-400">{modalData.effectiveness}%</div>
              </div>
            </div>
            
            {/* Gráfica de barras */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">Estadísticas de Vulnerabilidades</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={getBarChartData(modalData.stats)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="tipo" tick={{ fill: '#E2E8F0', fontSize: 12 }} />
                    <YAxis allowDecimals={false} tick={{ fill: '#E2E8F0', fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ 
                        background: '#1A1A2E', 
                        border: '1px solid #00D4FF',
                        borderRadius: '8px',
                        color: '#E2E8F0'
                      }} 
                    />
                    <Bar dataKey="cantidad" fill="#00D4FF" radius={[4,4,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Logros */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">Logros del Mes</h3>
              <div className="flex justify-center gap-4">
                {mockAchievements.map(ach => (
                  <div key={ach.id} className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-3 border border-cyan-500/30 shadow-lg">
                    <div className="text-2xl mb-1">{ach.icon}</div>
                    <div className="text-xs font-bold text-white">{ach.name}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Estadísticas detalladas */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-sm text-gray-400 font-medium">CRÍTICAS</div>
                <div className="text-xl font-black text-red-400">{modalData.stats.criticas}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-400 font-medium">MEDIAS</div>
                <div className="text-xl font-black text-orange-400">{modalData.stats.medias}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-400 font-medium">BAJAS</div>
                <div className="text-xl font-black text-green-400">{modalData.stats.bajas}</div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard; 