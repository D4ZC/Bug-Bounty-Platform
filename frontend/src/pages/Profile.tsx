import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { FaEdit, FaUserEdit, FaImage, FaMedal, FaPalette, FaFlag } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, TooltipProps } from 'recharts';
import { getProfile, updateProfile, uploadProfileImage } from '../services/api';
import { useProfile } from '../contexts/ProfileContext';
import { useAuth } from '@/contexts/AuthContext';

// Cargar avatares automáticamente detectando los archivos disponibles
const getAvailableAvatars = () => {
  const avatars = [
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
    '/avatars/AvatarMicas2.jpg'
  ];
  return avatars;
};

// Cargar banners automáticamente detectando los archivos disponibles
const getAvailableBanners = () => {
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
    '/banners/fondo.webp'
  ];
  return banners;
};

// Cargar fondos automáticamente detectando los archivos disponibles
const getAvailableBackgrounds = () => {
  const backgrounds = [
    '/fondos/Ado_ArtistImage.webp',
    '/fondos/2077.gif',
    '/fondos/moco.gif',
    '/fondos/fondo.webp'
  ];
  return backgrounds;
};

// Cargar marcos automáticamente detectando los archivos disponibles
const getAvailableFrames = () => {
  const frames = [
    '/marcos/marco1.png',
    '/marcos/marco2.png',
    '/marcos/marco3.png',
    '/marcos/marco4.png',
    '/marcos/marco5.png'
  ];
  return frames;
};

// Cargar badges automáticamente detectando los archivos disponibles
const getAvailableBadges = () => {
  const badges = [
    '/badges/badge1.png',
    '/badges/badge2.png',
    '/badges/badge3.png',
    '/badges/badge4.png'
  ];
  return badges;
};

// Definir tipos para los marcos
interface ColorFrame {
  name: string;
  style: string;
}

interface PngFrame {
  name: string;
  style: string;
  url: string;
}

type Frame = ColorFrame | PngFrame;

// Marcos de color simples
const colorFrames: ColorFrame[] = [
  { name: 'Azul', style: 'ring-4 ring-blue-500' },
  { name: 'Dorado', style: 'ring-4 ring-yellow-400' },
  { name: 'Rojo', style: 'ring-4 ring-red-500' },
  { name: 'Verde', style: 'ring-4 ring-green-500' },
];

// Combinar marcos de color con marcos PNG
const getAutoFrames = (): Frame[] => {
  const pngFrames: PngFrame[] = getAvailableFrames().map((url, index) => ({
    name: `Marco ${index + 1}`,
    style: `marco${index + 1}`,
    url
  }));
  
  return [...colorFrames, ...pngFrames];
};

const autoFrames = getAutoFrames();
const avatarFrames = autoFrames;

// Cargar insignias automáticamente
const getAutoBadges = () => {
  const badgeUrls = getAvailableBadges();
  const badgeNames = ['badge1', 'badge2', 'badge3', 'badge4'];
  const badgeLabels = ['Insignia Dorada', 'Insignia Plateada', 'Insignia de Bronce', 'Insignia Especial'];
  const badgeDescriptions = [
    'Insignia otorgada por logros excepcionales',
    'Insignia por participación destacada',
    'Insignia por contribuciones valiosas',
    'Insignia especial por logros únicos'
  ];
  
  return badgeUrls.map((src, index) => ({
    src,
    name: badgeNames[index],
    label: badgeLabels[index],
    description: badgeDescriptions[index]
  }));
};

const autoBadges = getAutoBadges();
const allBadges = getAutoBadges();

// Nuevos datos mock para mejoras
const userData = {
  name: 'Juan Pérez',
  role: 'Hunter',
  team: 'CyberWolves',
  avatar: 'https://i.pravatar.cc/150?img=3',
  background: '/banners/phoenix-bg.jpg', // Imagen por defecto (fénix)
  banner: '/banners/elite.png', // Banner mock
  badges: ['MVP', 'Season', 'Insignia'],
  stats: {
    reports: 42,
    vulnerabilities: 30,
    points: 1200,
    duelsWon: 8,
    effectiveness: 71,
    topIndividual: 3,
    topTeam: 1,
  },
  vulnerabilitiesHistory: [
    { id: 1, title: 'SQL Injection en login', date: '2024-06-01', points: 100 },
    { id: 2, title: 'XSS en comentarios', date: '2024-05-28', points: 80 },
    { id: 3, title: 'CSRF en pagos', date: '2024-05-20', points: 120 },
    { id: 4, title: 'IDOR en perfil', date: '2024-05-10', points: 90 },
  ],
};

// Normalizar los datos para la gráfica de araña y limitar a 1
const maxValues = {
  'Reportes': 100,
  'Vulnerab': 100,
  'Puntos': 1200,
  'Duelos Ganados': 50,
  'Efectividad (%)': 100,
};
const radarData = [
  { stat: 'Reportes', value: Math.min(userData.stats.reports / maxValues['Reportes'], 1), real: userData.stats.reports },
  { stat: 'Vulnerab', value: Math.min(userData.stats.vulnerabilities / maxValues['Vulnerab'], 1), real: userData.stats.vulnerabilities },
  { stat: 'Puntos', value: Math.min(userData.stats.points / maxValues['Puntos'], 1), real: userData.stats.points },
  { stat: 'Duelos Ganados', value: Math.min(userData.stats.duelsWon / maxValues['Duelos Ganados'], 1), real: userData.stats.duelsWon },
  { stat: 'Efectividad (%)', value: Math.min(userData.stats.effectiveness / maxValues['Efectividad (%)'], 1), real: userData.stats.effectiveness },
];

// Tooltip personalizado para la gráfica de araña
const CustomRadarTooltip = ({ active, payload }: TooltipProps<any, any>) => {
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

// Función para obtener el estilo del marco PNG como fondo
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

const Profile: React.FC = () => {
  const { profile, setProfile, updateProfileFields, loading, simulateProfileData } = useProfile();
  const { user } = useAuth();

  // Estados solo para UI/modales
  const [showFrameModal, setShowFrameModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [showBadgesModal, setShowBadgesModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [avatarHover, setAvatarHover] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [showBgModal, setShowBgModal] = useState(false);
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [showBlockBgModal, setShowBlockBgModal] = useState(false);
  const [showBannerSelectModal, setShowBannerSelectModal] = useState(false);
  const [customFramePreview, setCustomFramePreview] = useState<string | null>(null);

  // Estado para insignias personalizadas
  const [customBadges, setCustomBadges] = useState<{ src: string; name: string; label: string }[]>([]);

  // Estado para modal de detalle de insignia
  const [badgeDetail, setBadgeDetail] = useState<null | { src: string; name: string; label: string; description: string }>(null);

  // Estado para modal de duelos ganados
  const [showDuelsModal, setShowDuelsModal] = useState(false);

  // Diagnóstico: log de cambios de estado
  useEffect(() => {
    console.log('showDuelsModal:', showDuelsModal);
  }, [showDuelsModal]);
  // Datos mock de duelos ganados
  const duelsHistory = [
    { id: 1, title: 'Duelo vs CyberWolves', date: '2024-06-10', points: 100 },
    { id: 2, title: 'Duelo vs RedHats', date: '2024-05-28', points: 80 },
    { id: 3, title: 'Duelo vs BlueTeam', date: '2024-05-20', points: 120 },
  ];

  // Handlers que usan el contexto
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      updateProfileFields({ avatar: url });
    }
  };

  const handleFrameChange = (frame: string) => {
    updateProfileFields({ selectedFrame: frame });
  };

  const handleCustomFrameUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setCustomFramePreview(url);
    }
  };

  const applyCustomFrame = () => {
    if (customFramePreview) {
      updateProfileFields({ customFrame: customFramePreview, selectedFrame: 'custom-frame' });
      setCustomFramePreview(null);
    }
  };
  const cancelCustomFrame = () => {
    setCustomFramePreview(null);
  };

  const handleBlockBgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      updateProfileFields({ blockBg: url });
      setShowBlockBgModal(false);
    }
  };

  const handleBadgesChange = (badges: string[]) => {
    updateProfileFields({ badges });
  };

  const handleNameChange = (newName: string) => {
    updateProfileFields({ name: newName });
  };

  // Handler para subir insignia personalizada
  const handleCustomBadgeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      const name = file.name.replace(/\.[^/.]+$/, "");
      setCustomBadges(prev => [...prev, { src: url, name, label: name }]);
    }
  };

  // Cargar perfil al montar
  useEffect(() => {
    getProfile().then(res => {
      const user = res.data as any;
      setProfile(user); // Usar setProfile del contexto
      setCustomFramePreview(user.customFrame || null);
    });
  }, []);

  // Ejemplo: al cambiar marco
  const toggleBadge = (badge: string) => {
    if (profile.badges.includes(badge)) {
      updateProfileFields({ badges: profile.badges.filter((b) => b !== badge) });
    } else if (profile.badges.length < 3) {
      updateProfileFields({ badges: [...profile.badges, badge] });
    }
  };

  // Radar chart data dinámico según profile.stats
  const maxValues = {
    'Reportes': 100,
    'Vulnerab': 100,
    'Puntos': 1200,
    'Duelos Ganados': 50,
    'Efectividad (%)': 100,
  };
  const radarData = [
    { stat: 'Reportes', value: Math.min(profile.stats.reports / maxValues['Reportes'], 1), real: profile.stats.reports },
    { stat: 'Vulnerab', value: Math.min(profile.stats.vulnerabilities / maxValues['Vulnerab'], 1), real: profile.stats.vulnerabilities },
    { stat: 'Puntos', value: Math.min(profile.stats.points / maxValues['Puntos'], 1), real: profile.stats.points },
    { stat: 'Duelos Ganados', value: Math.min(profile.stats.duelsWon / maxValues['Duelos Ganados'], 1), real: profile.stats.duelsWon },
    { stat: 'Efectividad (%)', value: Math.min(profile.stats.effectiveness / maxValues['Efectividad (%)'], 1), real: profile.stats.effectiveness },
  ];

  // Avatar y marco por defecto
  const avatarUrl = profile.avatar || 'https://i.pravatar.cc/150?img=3';
  // Marco azul por defecto si no hay ninguno seleccionado
  const selectedFrame = profile.selectedFrame && profile.selectedFrame !== '' ? profile.selectedFrame : 'ring-4 ring-blue-500';

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center py-8 px-2 relative"
      style={{
        background: `url(${profile.background}) center/cover no-repeat, linear-gradient(135deg, #111827 60%, #1e293b 100%)`,
        minHeight: '100vh',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Banner superior */}
      <motion.div
        className="w-full max-w-4xl flex justify-center mb-4"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 80 }}
      >
        <div className="relative w-full flex justify-center">
          {/* Eliminar la variable y el estado banner */}
        </div>
      </motion.div>
      {/* Header perfil */}
      <motion.div
        className="w-full max-w-4xl bg-gray-800/90 rounded-2xl shadow-2xl p-8 flex flex-col md:flex-row items-center gap-8 mb-8 backdrop-blur-md border border-blue-900/40 relative"
        style={{
          background: `url(${profile.blockBg}) center/cover no-repeat, rgba(31,41,55,0.92)`
        }}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 80 }}
      >
        {/* Botón editar fondo del bloque */}
        <button
          className="absolute top-2 left-2 bg-blue-700/80 hover:bg-blue-800 text-white px-2 py-1 rounded text-xs shadow flex items-center gap-1 z-10"
          onClick={() => setShowBlockBgModal(true)}
          aria-label="Editar banner"
        >
          <FaImage className="inline-block mr-1" /> Editar banner
        </button>
        {/* Contenedor principal con fondo semitransparente grande */}
        <div className="w-full flex flex-row items-start rounded-xl bg-gray-900/60 p-6 shadow-lg mb-8">
          <motion.div
              className="relative group flex flex-col items-center"
              onMouseEnter={() => setAvatarHover(true)}
              onMouseLeave={() => setAvatarHover(false)}
            whileHover={{ scale: 1.05 }}
            >
            <div className="relative" style={{ width: 208, height: 208 }}> {/* w-52 h-52 */}
              {/* Marcos PNG aún más grandes */}
              {profile.selectedFrame === 'custom-frame' && profile.customFrame && (
                <img
                  src={profile.customFrame}
                  alt="Marco personalizado"
                  className="absolute top-1/2 left-1/2 w-52 h-52 pointer-events-none select-none"
                  style={{ zIndex: 2, objectFit: 'contain', transform: 'translate(-50%, -50%)' }}
                />
              )}
              {autoFrames.map(frame => profile.selectedFrame === frame.style && 'url' in frame && frame.url && (
                <img
                  key={frame.style}
                  src={frame.url}
                  alt={frame.name}
                  className="absolute top-1/2 left-1/2 w-52 h-52 pointer-events-none select-none"
                  style={{ zIndex: 2, objectFit: 'contain', transform: 'translate(-50%, -50%)' }}
                />
              ))}
              {/* Avatar centrado */}
              <img
                src={avatarUrl}
                alt="avatar"
                className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full object-cover"
                style={{ zIndex: 1, transform: 'translate(-50%, -50%)' }}
              />
              {/* Marcos de color perfectamente alineados */}
              {profile.selectedFrame !== 'custom-frame' && profile.selectedFrame !== 'custom' && !autoFrames.some(f => f.style === profile.selectedFrame) && (
                <div className={`w-32 h-32 rounded-full absolute top-1/2 left-1/2 pointer-events-none select-none ${profile.selectedFrame}`}
                  style={{ zIndex: 2, transform: 'translate(-50%, -50%)' }}
                />
              )}
              {/* Marco custom color */}
              {profile.selectedFrame === 'custom' && (
                <div
                  className="w-32 h-32 rounded-full absolute top-1/2 left-1/2 pointer-events-none select-none"
                  style={{ zIndex: 2, boxShadow: `0 0 0 4px ${profile.frameColor}`, transform: 'translate(-50%, -50%)' }}
                />
              )}
              {/* Marcos PNG como fondo */}
              {autoFrames.map(frame => profile.selectedFrame === frame.style && 'url' in frame && frame.url && (
                <div
                  key={frame.style}
                  style={getFrameStyle(frame.url)}
                />
              ))}
              {/* Overlay de edición */}
              {avatarHover && (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 rounded-full cursor-pointer transition-all z-20"
                  style={{ zIndex: 20 }}
                >
                  <button className="text-xs flex items-center gap-1 text-blue-400 hover:underline" onClick={() => setShowAvatarModal(true)}>
                    <FaUserEdit className="inline-block mr-1" />Seleccionar avatar
                  </button>
                  <button className="mt-2 text-blue-400 hover:underline flex items-center gap-1" onClick={() => setShowFrameModal(true)}>
                    <FaPalette className="inline-block mr-1" /> Editar marco
                  </button>
                  <button className="mt-2 text-blue-400 hover:underline flex items-center gap-1" onClick={() => setShowBgModal(true)}>
                    <FaImage className="inline-block mr-1" /> Editar fondo
                  </button>
                </div>
              )}
            </div>
            {/* Insignias debajo del avatar */}
            <div className="flex flex-row gap-4 items-end mt-3 mb-1 flex-wrap justify-center">
              {allBadges.filter(b => profile.badges.includes(b.name)).map((badge, i) => (
                <motion.div key={i} className="flex flex-col items-center min-w-[96px]" whileHover={{ scale: 1.15 }}>
                  <img src={badge.src} alt={badge.name} className="w-24 h-24 mb-0.5 cursor-pointer" onClick={() => setBadgeDetail(badge)} />
                </motion.div>
              ))}
            </div>
            <button
              className="text-blue-400 hover:underline text-base font-normal flex items-center gap-1 mb-2"
              onClick={() => setShowBadgesModal(true)}
              title="Editar insignias"
              style={{minWidth: '110px'}}>
              <FaMedal className="inline-block mr-1" /> Editar insignias
            </button>
          </motion.div>
          <div className="flex flex-col gap-1 min-w-0 w-full pl-8">
              {editingName ? (
                <input
                  className="text-xl md:text-2xl font-bold whitespace-nowrap overflow-hidden text-ellipsis max-w-full cursor-pointer bg-[#f8fafc] text-[#1e293b] border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={user?.username ?? ''}
                  onChange={e => handleNameChange(e.target.value)}
                  onBlur={() => setEditingName(false)}
                  onKeyDown={e => { if (e.key === 'Enter') setEditingName(false); }}
                  autoFocus
                  maxLength={32}
                />
              ) : (
                <h2
                className="text-xl md:text-2xl font-bold whitespace-nowrap overflow-hidden text-ellipsis max-w-full cursor-pointer"
                  onClick={() => setEditingName(true)}
                  title="Editar nombre"
                >
                {user?.username && user.username.length > 12 ? user.username.slice(0, 12) + '...' : (user?.username ?? '')}
                </h2>
              )}
            <div className="text-base mt-0.5 flex flex-row items-center gap-2">
              <span className="font-semibold text-blue-300">{profile.role}</span>
              <span className="text-gray-400 font-semibold">|</span>
              <span className="font-semibold text-blue-300">{profile.team}</span>
              </div>
            {/* Top ranking */}
            <div className="flex flex-row gap-4 mt-2 flex-wrap">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-3 py-1 rounded-full text-xs font-bold shadow">Top #{profile.stats.topIndividual} Individual</span>
              <span className="bg-gradient-to-r from-blue-400 to-blue-700 text-white px-3 py-1 rounded-full text-xs font-bold shadow">Top #{profile.stats.topTeam} Equipo</span>
            </div>
            {/* Botón para simular datos */}
            <button className="mt-4 mb-2 px-4 py-2 bg-purple-700 rounded text-white hover:bg-purple-800 w-fit" onClick={simulateProfileData}>
              Simular datos
            </button>
            {/* Radar chart alineada a la derecha */}
            <motion.div
              className="w-full md:w-80 h-64 flex items-center justify-center ml-4 md:ml-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 80 }}
            >
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#374151" />
                  {/* Ocultar nombres de los ejes */}
                  <PolarAngleAxis dataKey="stat" stroke="#cbd5e1" tick={false} />
                  {/* Ocultar los números de la escala radial */}
                  <PolarRadiusAxis angle={30} domain={[0, 1]} tick={false} stroke="#64748b" />
              <Radar
                name="Estadísticas"
                dataKey="value"
                stroke="#60a5fa"
                fill="#60a5fa"
                fillOpacity={0.5}
                    isAnimationActive={false}
              />
                  <Tooltip content={CustomRadarTooltip} />
            </RadarChart>
          </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </motion.div>
      {/* Estadísticas personales con fondo semitransparente fijo */}
      <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-5 gap-4 mb-8 bg-gray-900/80 rounded-xl p-4 shadow-lg">
        <motion.div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center shadow cursor-pointer" whileHover={{ scale: 1.05 }} onClick={() => setShowReportsModal(true)}>
          <span className="text-lg font-bold">{profile.stats.reports}</span>
          <span className="text-gray-400 text-xs">Reportes</span>
        </motion.div>
        <motion.div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center shadow" whileHover={{ scale: 1.05 }}>
          <span className="text-lg font-bold">{profile.stats.vulnerabilities}</span>
          <span className="text-gray-400 text-xs">Vulnerabilidades</span>
        </motion.div>
        <motion.div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center shadow" whileHover={{ scale: 1.05 }}>
          <span className="text-lg font-bold">{profile.stats.points}</span>
          <span className="text-gray-400 text-xs">Puntos</span>
        </motion.div>
        <motion.div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center shadow cursor-pointer" whileHover={{ scale: 1.05 }} onClick={() => {
          console.log('Abrir modal duelos');
          setShowDuelsModal(true);
        }}>
          <span className="text-lg font-bold">{profile.stats.duelsWon}</span>
          <span className="text-gray-400 text-xs">Duelos Ganados</span>
        </motion.div>
        <motion.div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center shadow" whileHover={{ scale: 1.05 }}>
          <span className="text-lg font-bold">{profile.stats.effectiveness}%</span>
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
          {profile.vulnerabilitiesHistory.map(r => (
            <li key={r.id} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0">
              <span className="text-blue-300 font-semibold cursor-pointer hover:underline">{r.title}</span>
              <span className="text-gray-400 text-xs">{r.date}</span>
              <span className="ml-4 text-blue-400 font-bold">+{r.points} pts</span>
            </li>
          ))}
        </ul>
      </motion.div>
      {/* Modal de edición de fondo */}
      {showBgModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={() => setShowBgModal(false)}>
          <div className="bg-[#181c24] rounded-xl p-6 w-full max-w-2xl shadow-2xl border-2 border-[#23273a] relative" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4 text-white">Editar Fondo</h3>
            {/* Fondos disponibles */}
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2 text-blue-300">Fondos Disponibles</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
                {getAvailableBackgrounds().map((bg, index) => (
                <div
                    key={index}
                    className="relative cursor-pointer rounded-lg overflow-hidden border-2 hover:border-blue-400 transition-all"
                    onClick={() => {
                      updateProfileFields({ background: bg });
                      setShowBgModal(false);
                    }}
                >
                    <img 
                      src={bg} 
                      alt={`Fondo ${index + 1}`} 
                      className="w-full h-20 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center">
                      <span className="text-white text-xs font-semibold opacity-0 hover:opacity-100">Seleccionar</span>
                    </div>
                </div>
              ))}
              </div>
            </div>
            <button className="mt-2 px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700" onClick={() => setShowBgModal(false)}>
              Cerrar
            </button>
          </div>
      </div>
      )}
      {/* Modal de marcos */}
      {showFrameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={() => setShowFrameModal(false)}>
          <div className="bg-[#181c24] rounded-xl p-6 w-full max-w-md shadow-2xl border-2 border-[#23273a] relative" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold mb-6 text-white">Editar Marco del Avatar</h3>
            {/* Scroll vertical, ítems centrados: solo opciones de marcos */}
            <div className="flex flex-col gap-6 mb-4 overflow-y-auto max-h-96 pr-2 items-center marcos-scrollbar bg-[#181c24] rounded-xl" style={{scrollbarWidth:'thin'}}>
              {avatarFrames.map((frame, idx) => (
                <div
                  key={frame.name}
                  className={`relative flex items-center justify-center w-28 h-28 cursor-pointer group ${selectedFrame === frame.style ? 'ring-4 ring-blue-400' : ''}`}
                  onClick={() => handleFrameChange(frame.style)}
                  style={{ flex: '0 0 auto' }}
                >
                  {/* Avatar base */}
                  <img src={avatarUrl} alt="avatar" className="w-20 h-20 object-cover rounded-full z-10 shadow-lg" />
                  {/* Overlay de marco PNG */}
                  {'url' in frame && frame.url && (
                    <img src={frame.url} alt={frame.name} className="absolute top-1/2 left-1/2 w-28 h-28 object-contain pointer-events-none select-none scale-110" style={{ zIndex: 20, transform: 'translate(-50%, -50%)' }} />
                  )}
                  {/* Overlay de marco de color */}
                  {'url' in frame || (
                    <div className={`absolute top-1/2 left-1/2 w-28 h-28 rounded-full pointer-events-none select-none ${frame.style}`} style={{ zIndex: 20, transform: 'translate(-50%, -50%)', borderWidth: 4, borderStyle: 'solid' }} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-row gap-4 justify-end mt-2">
              <button className="px-4 py-2 bg-gray-600 rounded text-white hover:bg-gray-700" onClick={() => setShowFrameModal(false)}>
              Cerrar
            </button>
              <button className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700" onClick={() => { setShowFrameModal(false); }}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal de insignias */}
      {showBadgesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={() => setShowBadgesModal(false)}>
          <div className="bg-[#181c24] rounded-xl p-6 w-full max-w-md shadow-2xl border-2 border-[#23273a] relative" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4 text-white">Editar Insignias (máx. 3)</h3>
            <div className="flex flex-wrap gap-4 mb-4">
              {allBadges.map((badge, idx) => (
                <div
                  key={badge.name}
                  className={`flex flex-col items-center cursor-pointer p-2 rounded-lg border-2 ${profile.badges.includes(badge.name) ? 'border-blue-400 bg-gray-700' : 'border-transparent'} ${profile.badges.length >= 3 && !profile.badges.includes(badge.name) ? 'opacity-50 pointer-events-none' : ''}`}
                  onClick={() => toggleBadge(badge.name)}
                >
                  <img src={badge.src} alt={badge.name} className="w-12 h-12" />
                  <span className="text-xs text-white mt-1">{badge.label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-row gap-4 justify-end mt-2">
              <button className="px-4 py-2 bg-gray-600 rounded text-white hover:bg-gray-700" onClick={() => setShowBadgesModal(false)}>
                Cancelar
              </button>
              <button className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700" onClick={() => setShowBadgesModal(false)}>
              Guardar
            </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal de reportes */}
      {showReportsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={() => setShowReportsModal(false)}>
          <div className="bg-[#181c24] rounded-xl p-6 w-full max-w-lg shadow-2xl border-2 border-[#23273a] relative" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4 text-white">Historial de Reportes</h3>
            <ul className="divide-y divide-gray-700">
              {profile.vulnerabilitiesHistory.map(r => (
                <li key={r.id} className="py-2 flex justify-between items-center">
                  <span className="text-white">{r.title}</span>
                  <span className="text-gray-400 text-xs">{r.date}</span>
                  <span className="ml-4 text-blue-400 font-bold">+{r.points} pts</span>
                </li>
              ))}
            </ul>
            <button className="mt-4 px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700" onClick={() => setShowReportsModal(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
      {/* Modal para cambiar fondo del bloque (banner) */}
      {showBlockBgModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={() => setShowBlockBgModal(false)}>
          <div className="bg-[#181c24] rounded-xl p-6 w-full max-w-2xl shadow-2xl border-2 border-[#23273a] relative" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4 text-white">Editar Banner</h3>
            {/* Banners disponibles */}
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2 text-blue-300">Banners Disponibles</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
                {getAvailableBanners().map((banner, index) => (
                  <div
                    key={index}
                    className="relative cursor-pointer rounded-lg overflow-hidden border-2 hover:border-blue-400 transition-all"
                    onClick={() => {
                      updateProfileFields({ blockBg: banner });
                      setShowBlockBgModal(false);
                    }}
                  >
                    <img 
                      src={banner} 
                      alt={`Banner ${index + 1}`} 
                      className="w-full h-20 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center">
                      <span className="text-white text-xs font-semibold opacity-0 hover:opacity-100">Seleccionar</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="mt-2 px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700" onClick={() => setShowBlockBgModal(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
      {/* Modal de selección de avatar */}
      {showAvatarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={() => setShowAvatarModal(false)}>
          <div className="bg-[#181c24] rounded-xl p-6 w-full max-w-2xl shadow-2xl border-2 border-[#23273a] relative" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4 text-white">Seleccionar Avatar</h3>
            
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
              {getAvailableAvatars().map((avatar, index) => (
                <div
                  key={index}
                  className="relative cursor-pointer rounded-lg overflow-hidden border-2 hover:border-blue-400 transition-all"
                  onClick={() => {
                    updateProfileFields({ avatar });
                    setShowAvatarModal(false);
                  }}
                >
                  <img 
                    src={avatar} 
                    alt={`Avatar ${index + 1}`} 
                    className="w-full h-24 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center">
                    <span className="text-white text-xs font-semibold opacity-0 hover:opacity-100">Seleccionar</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-4 px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700" onClick={() => setShowAvatarModal(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal de detalle de insignia */}
      {badgeDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={() => setBadgeDetail(null)}>
          <div className="bg-[#181c24] rounded-xl p-8 w-full max-w-xs shadow-2xl border-2 border-[#23273a] flex flex-col items-center relative" onClick={e => e.stopPropagation()}>
            <img src={badgeDetail.src} alt={badgeDetail.name} className="w-40 h-40 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">{badgeDetail.label}</h3>
            <p className="text-gray-300 text-center mb-4">{badgeDetail.description}</p>
            <button className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700" onClick={() => setBadgeDetail(null)}>
              Cerrar
            </button>
          </div>
    </div>
      )}
      {/* Modal de duelos ganados */}
      <AnimatePresence>
      {showDuelsModal && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              console.log('Cerrar modal duelos (overlay)');
              setShowDuelsModal(false);
            }}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
          >
            <div
              className="bg-[#181c24] rounded-xl p-6 w-full max-w-lg shadow-2xl border-2 border-[#23273a] relative"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4 text-white">Historial de Duelos Ganados</h3>
              <ul className="divide-y divide-gray-700">
                {duelsHistory.map(d => (
                  <li key={d.id} className="py-2 flex justify-between items-center">
                    <span className="text-white">{d.title}</span>
                    <span className="text-gray-400 text-xs">{d.date}</span>
                    <span className="ml-4 text-blue-400 font-bold">+{d.points} pts</span>
                  </li>
                ))}
              </ul>
              <button className="mt-4 px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700" onClick={() => {
                console.log('Cerrar modal duelos (botón)');
                setShowDuelsModal(false);
              }}>
                Cerrar
              </button>
            </div>
          </motion.div>
        </>
      )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Profile; 