import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { FaArrowLeft, FaCrown } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Avatares locales - todos los disponibles
const localAvatars = [
  '/avatars/prueba.png',
  '/avatars/cat.gif',
  '/avatars/cat_avatar.webp',
  '/avatars/lucy_avatar.webp',
  '/avatars/rebecca_avatar.webp',
  '/avatars/rebeca_avatar.webp',
  '/avatars/david_avatar2.webp',
  '/avatars/david_avatar.webp',
  '/avatars/poro_avatar2.webp',
  '/avatars/poro_avatar.webp',
  '/avatars/teemo.webp',
  '/avatars/toga.gif',
  '/avatars/ado.webp',
  '/avatars/avatargif.gif',
  '/avatars/panda.gif',
  '/avatars/img_example.jpg',
];

// Badges locales con descripciones
const localBadges = [
  { src: '/badges/badge1.png', name: 'badge1', label: 'Insignia Dorada', description: 'Insignia otorgada por logros excepcionales en la plataforma' },
  { src: '/badges/badge2.png', name: 'badge2', label: 'Insignia Plateada', description: 'Insignia por participación destacada en reportes' },
  { src: '/badges/badge3.png', name: 'badge3', label: 'Insignia de Bronce', description: 'Insignia por contribuciones valiosas a la comunidad' },
  { src: '/badges/badge4.png', name: 'badge4', label: 'Insignia Especial', description: 'Insignia especial por logros únicos y extraordinarios' },
];

// Fondos variados
const backgrounds = [
  '/fondos/Ado_ArtistImage.webp',
  '/fondos/2077.gif',
  '/fondos/moco.gif',
  '/fondos/fondo.webp',
];

// Banners variados
const banners = [
  '/banners/cat.gif',
  '/banners/cat_banner.gif',
  '/banners/banner_galaxy2.gif',
  '/banners/banner_galaxy.gif',
  '/banners/banner_jinx.gif',
  '/banners/banner_lol.gif',
  '/banners/temo_banner.webp',
  '/banners/2077.gif',
  '/banners/la.gif',
  '/banners/moco.gif',
  '/banners/fondo.webp',
];

// Marcos locales
const localFrames = [
  { name: 'Rojo', style: 'ring-4 ring-red-500' },
  { name: 'Azul', style: 'ring-4 ring-blue-500' },
  { name: 'Dorado', style: 'ring-4 ring-yellow-400' },
  { name: 'Verde', style: 'ring-4 ring-green-500' },
  { name: 'Marco 1', style: 'marco1', url: '/marcos/marco1.png' },
  { name: 'Marco 2', style: 'marco2', url: '/marcos/marco2.png' },
  { name: 'Marco 3', style: 'marco3', url: '/marcos/marco3.png' },
  { name: 'Marco 4', style: 'marco4', url: '/marcos/marco4.png' },
  { name: 'Marco 5', style: 'marco5', url: '/marcos/marco5.png' },
];

// Mock de usuarios con fondos y banners variados
const mockUsers = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: i === 0 ? 'Juan Pérez' :
        i === 1 ? 'María García' :
        i === 2 ? 'Carlos López' :
        i === 3 ? 'Ana Martínez' :
        i === 4 ? 'Luis Rodríguez' :
        i === 5 ? 'Sofia Torres' :
        i === 6 ? 'Diego Morales' :
        i === 7 ? 'Valentina Silva' :
        i === 8 ? 'Andrés Vargas' :
        i === 9 ? 'Camila Herrera' :
        i === 10 ? 'Sebastián Castro' :
        i === 11 ? 'Isabella Ruiz' :
        i === 12 ? 'Mateo Jiménez' :
        i === 13 ? 'Valeria Mendoza' :
        i === 14 ? 'Nicolás Ortega' :
        i === 15 ? 'Gabriela Rojas' :
        i === 16 ? 'Daniel Moreno' :
        i === 17 ? 'Lucía Paredes' :
        i === 18 ? 'Felipe Guzmán' :
        i === 19 ? 'Adriana Vega' :
        i === 20 ? 'Javier Salazar' :
        i === 21 ? 'Carolina Fuentes' :
        i === 22 ? 'Roberto Miranda' :
        i === 23 ? 'Natalia Soto' :
        i === 24 ? 'Fernando Reyes' :
        i === 25 ? 'Paula Valdez' :
        i === 26 ? 'Ricardo Campos' :
        i === 27 ? 'Mónica Espinoza' :
        i === 28 ? 'Hugo Medina' :
        i === 29 ? 'Elena Bravo' :
        `Usuario ${i + 1}`,
  avatar: localAvatars[i % localAvatars.length], // Usar solo avatares locales
  points: 1200 - i * 30,
  role: i % 3 === 0 ? 'Hunter' : i % 3 === 1 ? 'Spectator' : 'Helper',
  team: i % 4 === 0 ? 'CyberWolves' : i % 4 === 1 ? 'ShadowCats' : i % 4 === 2 ? 'DarkHackers' : 'EliteTeam',
  background: backgrounds[i % backgrounds.length],
  blockBg: banners[i % banners.length],
  // Asignar marcos especiales a usuarios en posiciones altas
  selectedFrame: (() => {
    // Todos los usuarios usan marcos de la carpeta marcos (índices 4-8)
    const marcoFrames = localFrames.slice(4); // Solo marcos de carpeta
    return marcoFrames[i % marcoFrames.length].style;
  })(),
  // Limitar insignias a máximo 3
  badges: localBadges.slice(0, Math.min((i % 3) + 1)).map(b => b.name),
  stats: {
    reports: 42 - i * 2,
    vulnerabilities: 30 - i,
    points: 1200 - i * 30,
    duelsWon: 8 - Math.floor(i / 3),
    effectiveness: 71 - i,
    topIndividual: i + 1,
    topTeam: Math.floor(i / 4) + 1,
  },
  vulnerabilitiesHistory: [
    { id: 1, title: 'SQL Injection en login', date: '2024-06-01', points: 100 },
    { id: 2, title: 'XSS en comentarios', date: '2024-05-28', points: 80 },
    { id: 3, title: 'CSRF en pagos', date: '2024-05-20', points: 120 },
    { id: 4, title: 'IDOR en perfil', date: '2024-05-10', points: 90 },
  ],
}));

// Exportar para usar en rankings
export { mockUsers };

const getFrameStyle = (url: string) => ({
  backgroundImage: `url(${url})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: '50%',
  position: 'absolute' as const,
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 2,
  pointerEvents: 'none' as const,
  boxSizing: 'border-box' as const,
});

const CustomRadarTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { stat, real } = payload[0].payload;
    return (
      <div className="bg-gray-900/90 text-white rounded-lg px-4 py-2 shadow-lg border border-blue-700">
        <div className="font-bold text-blue-400 text-sm mb-1">{stat}</div>
        <div className="text-base font-semibold">{stat}: <span className="text-blue-300">{real}</span></div>
      </div>
    );
  }
  return null;
};

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [badgeDetail, setBadgeDetail] = useState<any>(null);

  useEffect(() => {
    const userId = parseInt(id || '1');
    const foundUser = mockUsers.find(u => u.id === userId || u.name.toLowerCase() === String(id).toLowerCase());
    if (foundUser) {
      setUser(foundUser);
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [id, navigate]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#181c24] via-[#23273a] to-[#181c24]"><div className="text-white text-xl">Cargando perfil...</div></div>;
  }
  if (!user) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#181c24] via-[#23273a] to-[#181c24]"><div className="text-white text-xl">Usuario no encontrado</div></div>;
  }

  // Radar chart data
  const maxValues = {
    'Reportes': 100,
    'Vulnerab': 100,
    'Puntos': 1200,
    'Duelos Ganados': 50,
    'Efectividad (%)': 100,
  };
  const radarData = [
    { stat: 'Reportes', value: Math.min(user.stats.reports / maxValues['Reportes'], 1), real: user.stats.reports },
    { stat: 'Vulnerab', value: Math.min(user.stats.vulnerabilities / maxValues['Vulnerab'], 1), real: user.stats.vulnerabilities },
    { stat: 'Puntos', value: Math.min(user.stats.points / maxValues['Puntos'], 1), real: user.stats.points },
    { stat: 'Duelos Ganados', value: Math.min(user.stats.duelsWon / maxValues['Duelos Ganados'], 1), real: user.stats.duelsWon },
    { stat: 'Efectividad (%)', value: Math.min(user.stats.effectiveness / maxValues['Efectividad (%)'], 1), real: user.stats.effectiveness },
  ];

  // Frame
  const selectedFrame = localFrames.find(f => f.style === user.selectedFrame);

  // Obtener badges con descripción
  const userBadges = localBadges.filter(b => user.badges.includes(b.name));

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center py-8 px-2 relative"
      style={{
        background: `url(${user.background}) center/cover no-repeat, linear-gradient(135deg, #111827 60%, #1e293b 100%)`,
        minHeight: '100vh',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Botón de regreso */}
      <motion.button
        className="absolute top-4 left-4 z-50 bg-gray-800/80 hover:bg-gray-700/80 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
        onClick={() => {
          if (location.state && location.state.fromGulag) {
            navigate('/gulag');
          } else {
            navigate('/rankings');
          }
        }}
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <FaArrowLeft /> {location.state && location.state.fromGulag ? 'Volver a Gulag' : 'Volver a Rankings'}
      </motion.button>

      {/* Header perfil */}
      <motion.div
        className="w-full max-w-4xl bg-gray-800/90 rounded-2xl shadow-2xl p-8 flex flex-col md:flex-row items-center gap-8 mb-8 backdrop-blur-md border border-blue-900/40 relative"
        style={{ background: `url(${user.blockBg}) center/cover no-repeat, rgba(31,41,55,0.92)` }}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 80 }}
      >
        <div className="w-full flex flex-row items-start rounded-xl bg-gray-900/60 p-6 shadow-lg mb-8">
          <motion.div className="relative group flex flex-col items-center" whileHover={{ scale: 1.05 }}>
            <div className="relative" style={{ width: 208, height: 208 }}>
              {/* Marco PNG */}
              {selectedFrame && selectedFrame.url && (
                <img
                  src={selectedFrame.url}
                  alt={selectedFrame.name}
                  className="absolute top-1/2 left-1/2 w-52 h-52 pointer-events-none select-none"
                  style={{ zIndex: 2, objectFit: 'contain', transform: 'translate(-50%, -50%)' }}
                />
              )}
              {/* Avatar */}
              <img
                src={user.avatar}
                alt="avatar"
                className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full object-cover"
                style={{ zIndex: 1, transform: 'translate(-50%, -50%)' }}
              />
              {/* Marco de color */}
              {selectedFrame && !selectedFrame.url && (
                <div className={`w-32 h-32 rounded-full absolute top-1/2 left-1/2 pointer-events-none select-none ${selectedFrame.style}`}
                  style={{ zIndex: 2, transform: 'translate(-50%, -50%)' }}
                />
              )}
            </div>
            {/* Insignias debajo del avatar - máximo3 */}
            <div className="flex flex-row gap-4 items-end mt-3 mb-1 flex-wrap justify-center">
              {userBadges.slice(0,3).map((badge, i) => (
                <motion.div key={i} className="flex flex-col items-center min-w-[96px]" whileHover={{ scale: 1.15 }}>
                  <img 
                    src={badge.src} 
                    alt={badge.name} 
                    className="w-24 h-24 mb-0.5 cursor-pointer" 
                    onClick={() => setBadgeDetail(badge)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
          <div className="flex flex-col gap-1 min-w-0 w-full pl-8">
            <h2 className="text-xl md:text-2xl font-bold whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
              {user.name && user.name.length > 12 ? user.name.slice(0, 12) + '...' : user.name}
            </h2>
            <div className="text-base mt-0.5 flex flex-row items-center gap-2">
              <span className="font-semibold text-blue-300">{user.role}</span>
              <span className="text-gray-400 font-semibold">|</span>
              <span className="font-semibold text-blue-300">{user.team}</span>
            </div>
            {/* Top ranking */}
            <div className="flex flex-row gap-4 mt-2 flex-wrap">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-3 py-1 rounded-full text-xs font-bold shadow flex items-center gap-1">
                {user.stats.topIndividual === 1 && <FaCrown className="text-yellow-600" />}Top #{user.stats.topIndividual} Individual
              </span>
              <span className="bg-gradient-to-r from-blue-400 to-blue-700 text-white px-3 py-1 rounded-full text-xs font-bold shadow">Top #{user.stats.topTeam} Equipo</span>
            </div>
            {/* Radar chart */}
            <motion.div
              className="w-full md:w-80 h-64 flex items-center justify-center ml-4 md:ml-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 80 }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="stat" stroke="#cbd5e1" tick={false} />
                  <PolarRadiusAxis angle={30} domain={[0, 1]} tick={false} stroke="#64748b" />
                  <Radar
                    name="Estadísticas"
                    dataKey="value"
                    stroke="#60a5fa"
                    fill="#60a5fa"
                    fillOpacity={0.5}
                    isAnimationActive={false}
                  />
                  <RechartsTooltip content={CustomRadarTooltip} />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Estadísticas personales */}
      <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-5 gap-4 mb-8 bg-gray-900/80 rounded-xl p-4 shadow-lg">
        <motion.div 
          className="bg-gray-800 rounded-xl p-4 flex flex-col items-center shadow cursor-pointer" 
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowReportsModal(true)}
        >
          <span className="text-lg font-bold">{user.stats.reports}</span>
          <span className="text-gray-400 text-xs">Reportes</span>
        </motion.div>
        <motion.div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center shadow">
          <span className="text-lg font-bold">{user.stats.vulnerabilities}</span>
          <span className="text-gray-400 text-xs">Vulnerabilidades</span>
        </motion.div>
        <motion.div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center shadow">
          <span className="text-lg font-bold">{user.stats.points}</span>
          <span className="text-gray-400 text-xs">Puntos</span>
        </motion.div>
        <motion.div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center shadow">
          <span className="text-lg font-bold">{user.stats.duelsWon}</span>
          <span className="text-gray-400 text-xs">Duelos Ganados</span>
        </motion.div>
        <motion.div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center shadow">
          <span className="text-lg font-bold">{user.stats.effectiveness}%</span>
          <span className="text-gray-400 text-xs">Efectividad</span>
        </motion.div>
      </div>

      {/* Historial de vulnerabilidades resueltas */}
      <motion.div
        className="w-full max-w-4xl bg-gray-800/90 rounded-2xl shadow-lg p-6 mb-8 backdrop-blur-md border border-blue-900/40"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 80 }}
      >
        <h3 className="text-xl font-bold mb-4 text-white">Historial de Vulnerabilidades Resueltas</h3>
        <ul>
          {user.vulnerabilitiesHistory.map((r: any) => (
            <li key={r.id} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0">
              <span className="text-blue-300 font-semibold cursor-pointer hover:underline">{r.title}</span>
              <span className="text-gray-400 text-xs">{r.date}</span>
              <span className="ml-4 text-blue-400 font-bold">+{r.points} pts</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Modal de reportes */}
      {showReportsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setShowReportsModal(false)}>
          <div className="bg-[#181c24] border-2 border-cyan-400 rounded-2xl p-8 min-w-[320px] max-w-lg flex flex-col gap-4 relative" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-cyan-300 mb-4">Reportes de {user.name}</h3>
            <div className="max-h-96 overflow-y-auto">
              <ul className="divide-y divide-gray-700">
                {user.vulnerabilitiesHistory.map((r: any) => (
                  <li key={r.id} className="py-3 flex justify-between items-center">
                    <div className="flex-1">
                      <span className="text-white font-semibold">{r.title}</span>
                      <div className="text-gray-400 text-sm">{r.date}</div>
                    </div>
                    <span className="text-cyan-400 font-bold">+{r.points} pts</span>
                  </li>
                ))}
              </ul>
            </div>
            <button className="mt-4 px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-bold shadow transition" onClick={() => setShowReportsModal(false)}>
              Cerrar
            </button>
            <button className="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700" onClick={() => setShowReportsModal(false)}>✕</button>
          </div>
        </div>
      )}

      {/* Modal de detalle de insignia */}
      {badgeDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setBadgeDetail(null)}>
          <div className="bg-[#181c24] border-2 border-cyan-400 rounded-2xl p-8 min-w-[320px] max-w-xs flex flex-col items-center gap-4 relative" onClick={e => e.stopPropagation()}>
            <img src={badgeDetail.src} alt={badgeDetail.name} className="w-40 h-40 mb-4" />
            <h3 className="text-xl font-bold text-cyan-300 mb-2">{badgeDetail.label}</h3>
            <p className="text-gray-300 text-center mb-4">{badgeDetail.description}</p>
            <button className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-bold shadow transition" onClick={() => setBadgeDetail(null)}>
              Cerrar
            </button>
            <button className="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700" onClick={() => setBadgeDetail(null)}>✕</button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default UserProfile; 