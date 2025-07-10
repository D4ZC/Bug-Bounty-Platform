import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { FaEdit } from 'react-icons/fa';
import { motion } from 'framer-motion';

const avatarFrames = [
  { name: 'Azul', style: 'ring-4 ring-blue-500' },
  { name: 'Dorado', style: 'ring-4 ring-yellow-400' },
  { name: 'Rojo', style: 'ring-4 ring-red-500' },
  { name: 'Verde', style: 'ring-4 ring-green-500' },
];

// Asegúrate de que estos archivos existan en public/badges/
const allBadges = [
  { src: '/badges/mvp.png', name: 'MVP', label: 'MVP' },
  { src: '/badges/season.png', name: 'Season', label: 'Season' },
  { src: '/badges/insignia.png', name: 'Insignia', label: 'Insignia' },
];

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

const radarData = [
  { stat: 'Reportes', value: userData.stats.reports },
  { stat: 'Vulnerab', value: userData.stats.vulnerabilities },
  { stat: 'Puntos', value: userData.stats.points },
  { stat: 'Duelos Ganados', value: userData.stats.duelsWon },
  { stat: 'Efectividad (%)', value: userData.stats.effectiveness },
];

const Profile: React.FC = () => {
  const [avatar, setAvatar] = useState(userData.avatar);
  const [showFrameModal, setShowFrameModal] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState(avatarFrames[0].style);
  const [frameColor, setFrameColor] = useState('#3b82f6');
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [selectedBadges, setSelectedBadges] = useState(userData.badges);
  const [showBadgesModal, setShowBadgesModal] = useState(false);
  const [avatarHover, setAvatarHover] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState(userData.name);
  const [background, setBackground] = useState(userData.background);
  const [banner, setBanner] = useState(userData.banner);
  const [showBgModal, setShowBgModal] = useState(false);
  const [showBannerModal, setShowBannerModal] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(URL.createObjectURL(e.target.files[0]));
    }
  };

  const toggleBadge = (badge: string) => {
    if (selectedBadges.includes(badge)) {
      setSelectedBadges(selectedBadges.filter((b) => b !== badge));
    } else if (selectedBadges.length < 3) {
      setSelectedBadges([...selectedBadges, badge]);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center py-8 px-2 relative"
      style={{
        background: `url(${background}) center/cover no-repeat, linear-gradient(135deg, #111827 60%, #1e293b 100%)`,
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
          <img src={banner} alt="Banner" className="h-24 md:h-32 object-contain drop-shadow-xl rounded-xl border-4 border-blue-700/60 bg-black/30" />
          <button
            className="absolute top-2 right-2 bg-blue-700/80 hover:bg-blue-800 text-white px-2 py-1 rounded text-xs shadow"
            onClick={() => setShowBannerModal(true)}
          >Editar banner</button>
        </div>
      </motion.div>
      {/* Header perfil */}
      <motion.div
        className="w-full max-w-4xl bg-gray-800/90 rounded-2xl shadow-2xl p-8 flex flex-col md:flex-row items-center gap-8 mb-8 backdrop-blur-md border border-blue-900/40"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 80 }}
      >
        {/* Avatar, info, insignias */}
        <div className="flex-1 flex flex-col items-start gap-2 min-w-[220px] max-w-[350px]">
          <div className="flex items-center gap-6 w-full">
            <motion.div
              className="relative group flex flex-col items-center"
              onMouseEnter={() => setAvatarHover(true)}
              onMouseLeave={() => setAvatarHover(false)}
              whileHover={{ scale: 1.05 }}
            >
              <div
                className={`w-32 h-32 rounded-full overflow-hidden flex items-center justify-center shadow-xl ${selectedFrame === 'custom' ? '' : selectedFrame}`}
                style={selectedFrame === 'custom' ? { boxShadow: `0 0 0 4px ${frameColor}` } : { }}
              >
                <img src={avatar} alt="avatar" className="w-32 h-32 object-cover" />
              </div>
              {/* Botones solo visibles en hover */}
              {avatarHover && (
                <motion.div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 rounded-full cursor-pointer transition-all"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <label className="flex flex-col items-center cursor-pointer">
                    <span className="text-xs">Editar avatar</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                  </label>
                  <button className="mt-2 text-blue-400 hover:underline flex items-center gap-1" onClick={() => setShowFrameModal(true)}>
                    <span className="w-6 h-6 inline-block"><img src="/badges/insignia.png" alt="marco" /></span> Editar marco
                  </button>
                  <button className="mt-2 text-blue-400 hover:underline flex items-center gap-1" onClick={() => setShowBgModal(true)}>
                    <span className="w-6 h-6 inline-block"><img src="/badges/season.png" alt="fondo" /></span> Editar fondo
                  </button>
                </motion.div>
              )}
            </motion.div>
            <div className="flex flex-col gap-1 min-w-0 w-full">
              {editingName ? (
                <input
                  className="text-2xl font-bold bg-gray-700 rounded px-2 py-1 text-white mb-1 outline-none"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onBlur={() => setEditingName(false)}
                  onKeyDown={e => { if (e.key === 'Enter') setEditingName(false); }}
                  autoFocus
                  maxLength={32}
                />
              ) : (
                <h2
                  className="text-2xl font-bold truncate max-w-[220px] cursor-pointer"
                  onClick={() => setEditingName(true)}
                  title="Editar nombre"
                >
                  {name}
                </h2>
              )}
              <div className="text-gray-400 text-base mt-0.5">
                <span className="font-semibold text-blue-300">{userData.role}</span> | Equipo:
                <span className="text-blue-400 font-bold underline underline-offset-2 hover:underline transition-all cursor-pointer ml-1 align-middle" style={{fontSize: '1.05rem'}}>{userData.team}</span>
              </div>
              <div className="flex flex-row items-end gap-4 mt-2 w-full">
                <div className="flex flex-row gap-4 items-end">
                  {allBadges.filter(b => selectedBadges.includes(b.name)).map((badge, i) => (
                    <motion.div key={i} className="flex flex-col items-center min-w-[48px]" whileHover={{ scale: 1.15 }}>
                      <img src={badge.src} alt={badge.name} className="w-8 h-8 mb-0.5" />
                      <span className="text-xs text-gray-300 leading-none">{badge.label}</span>
                    </motion.div>
                  ))}
                </div>
                <button
                  className="ml-auto text-blue-400 hover:underline text-base font-normal"
                  onClick={() => setShowBadgesModal(true)}
                  title="Editar insignias"
                  style={{minWidth: '110px'}}>
                  Editar insignias
                </button>
              </div>
              {/* Top ranking */}
              <div className="flex flex-row gap-4 mt-2">
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-3 py-1 rounded-full text-xs font-bold shadow">Top #{userData.stats.topIndividual} Individual</span>
                <span className="bg-gradient-to-r from-blue-400 to-blue-700 text-white px-3 py-1 rounded-full text-xs font-bold shadow">Top #{userData.stats.topTeam} Equipo</span>
              </div>
            </div>
          </div>
        </div>
        {/* Radar chart */}
        <motion.div
          className="w-full md:w-80 h-64 flex items-center justify-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 80 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="stat" stroke="#cbd5e1" />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 50]}
                tick={{ fontSize: 12 }}
                stroke="#64748b"
              />
              <Radar
                name="Estadísticas"
                dataKey="value"
                stroke="#60a5fa"
                fill="#60a5fa"
                fillOpacity={0.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>
      {/* Estadísticas personales */}
      <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <motion.div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center shadow cursor-pointer" whileHover={{ scale: 1.05 }} onClick={() => setShowReportsModal(true)}>
          <span className="text-lg font-bold">{userData.stats.reports}</span>
          <span className="text-gray-400 text-xs">Reportes</span>
        </motion.div>
        <motion.div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center shadow" whileHover={{ scale: 1.05 }}>
          <span className="text-lg font-bold">{userData.stats.vulnerabilities}</span>
          <span className="text-gray-400 text-xs">Vulnerabilidades</span>
        </motion.div>
        <motion.div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center shadow" whileHover={{ scale: 1.05 }}>
          <span className="text-lg font-bold">{userData.stats.points}</span>
          <span className="text-gray-400 text-xs">Puntos</span>
        </motion.div>
        <motion.div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center shadow" whileHover={{ scale: 1.05 }}>
          <span className="text-lg font-bold">{userData.stats.duelsWon}</span>
          <span className="text-gray-400 text-xs">Duelos Ganados</span>
        </motion.div>
        <motion.div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center shadow" whileHover={{ scale: 1.05 }}>
          <span className="text-lg font-bold">{userData.stats.effectiveness}%</span>
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
          {userData.vulnerabilitiesHistory.map(r => (
            <li key={r.id} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0">
              <span className="text-blue-300 font-semibold cursor-pointer hover:underline">{r.title}</span>
              <span className="text-gray-400 text-xs">{r.date}</span>
              <span className="ml-4 text-blue-400 font-bold">+{r.points} pts</span>
            </li>
          ))}
        </ul>
      </motion.div>
      {/* Modales de edición de fondo y banner */}
      {showBgModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-[#181c24] rounded-xl p-6 w-full max-w-md shadow-2xl border-2 border-[#23273a] relative">
            <h3 className="text-xl font-bold mb-4 text-white">Editar Fondo de Perfil</h3>
            <input type="file" accept="image/*" className="mb-4" onChange={e => {
              if (e.target.files && e.target.files[0]) {
                setBackground(URL.createObjectURL(e.target.files[0]));
                setShowBgModal(false);
              }
            }} />
            <button className="mt-2 px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700" onClick={() => setShowBgModal(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
      {showBannerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-[#181c24] rounded-xl p-6 w-full max-w-md shadow-2xl border-2 border-[#23273a] relative">
            <h3 className="text-xl font-bold mb-4 text-white">Editar Banner</h3>
            <input type="file" accept="image/*" className="mb-4" onChange={e => {
              if (e.target.files && e.target.files[0]) {
                setBanner(URL.createObjectURL(e.target.files[0]));
                setShowBannerModal(false);
              }
            }} />
            <button className="mt-2 px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700" onClick={() => setShowBannerModal(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
      {/* Modal de marcos */}
      {showFrameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-[#181c24] rounded-xl p-6 w-full max-w-md shadow-2xl border-2 border-[#23273a] relative">
            <h3 className="text-xl font-bold mb-4 text-white">Editar Marco del Avatar</h3>
            <div className="flex gap-4 mb-4">
              {avatarFrames.map((frame, idx) => (
                <div
                  key={frame.name}
                  className={`w-16 h-16 rounded-full overflow-hidden flex items-center justify-center cursor-pointer ${selectedFrame === frame.style ? 'ring-4 ring-blue-400' : ''} ${frame.style}`}
                  onClick={() => setSelectedFrame(frame.style)}
                >
                  <img src={avatar} alt="avatar" className="w-16 h-16 object-cover" />
                </div>
              ))}
              {/* Marco personalizado */}
              <div className="flex flex-col items-center justify-center">
                <div
                  className={`w-16 h-16 rounded-full overflow-hidden flex items-center justify-center cursor-pointer border-4 ${selectedFrame === 'custom' ? 'border-blue-400' : 'border-transparent'}`}
                  style={{ boxShadow: `0 0 0 4px ${frameColor}` }}
                  onClick={() => setSelectedFrame('custom')}
                >
                  <div className="w-12 h-12 rounded-full" style={{ background: frameColor }} />
                </div>
                <input
                  type="color"
                  value={frameColor}
                  onChange={e => { setFrameColor(e.target.value); setSelectedFrame('custom'); }}
                  className="mt-1 w-8 h-8 border-none bg-transparent cursor-pointer"
                />
                <span className="text-xs mt-1 text-white">Personalizado</span>
              </div>
            </div>
            <button className="mt-2 px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700" onClick={() => setShowFrameModal(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
      {/* Modal de insignias */}
      {showBadgesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-[#181c24] rounded-xl p-6 w-full max-w-md shadow-2xl border-2 border-[#23273a] relative">
            <h3 className="text-xl font-bold mb-4 text-white">Editar Insignias (máx. 3)</h3>
            <div className="flex flex-wrap gap-4 mb-4">
              {allBadges.map((badge, idx) => (
                <div
                  key={badge.name}
                  className={`flex flex-col items-center cursor-pointer p-2 rounded-lg border-2 ${selectedBadges.includes(badge.name) ? 'border-blue-400 bg-gray-700' : 'border-transparent'} ${selectedBadges.length >= 3 && !selectedBadges.includes(badge.name) ? 'opacity-50 pointer-events-none' : ''}`}
                  onClick={() => toggleBadge(badge.name)}
                >
                  <img src={badge.src} alt={badge.name} className="w-12 h-12" />
                  <span className="text-xs text-white mt-1">{badge.label}</span>
                </div>
              ))}
            </div>
            <button className="mt-2 px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700" onClick={() => setShowBadgesModal(false)}>
              Guardar
            </button>
          </div>
        </div>
      )}
      {/* Modal de reportes */}
      {showReportsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-[#181c24] rounded-xl p-6 w-full max-w-lg shadow-2xl border-2 border-[#23273a] relative">
            <h3 className="text-xl font-bold mb-4 text-white">Historial de Reportes</h3>
            <ul className="divide-y divide-gray-700">
              {userData.vulnerabilitiesHistory.map(r => (
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
    </motion.div>
  );
};

export default Profile; 