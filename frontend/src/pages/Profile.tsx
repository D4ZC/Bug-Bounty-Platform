import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCoins, FaUserEdit, FaCrown } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ACCENT_PURPLE = '#a259f7';
const DARK_BG = '#1A1A1A';
const PANEL_BG = '#23263a';
const FONT = 'Inter, Roboto, Arial, sans-serif';

// Simulación de datos de usuario
const initialUser = {
  username: 'NicoleHunt',
  avatar: '/src/assets/Ninja2.png',
  role: 'Bug Hunter Pro',
  points: 1420,
};

// Simulación de inventario del usuario
const userInventory = [
  { id: 'bg1', name: 'Galaxia', type: 'backgrounds', image: 'https://via.placeholder.com/240x140/23263a/a259f7?text=Galaxy' },
  { id: 'mp1', name: 'Mini Hacker', type: 'miniprofiles', image: 'https://via.placeholder.com/120x120/23263a/a259f7?text=Mini' },
  { id: 'fr1', name: 'Marco Dorado', type: 'frames', image: 'https://via.placeholder.com/120x120/FFD700/23263a?text=Gold' },
  { id: 'an1', name: 'Avatar Ninja', type: 'animated', image: 'https://via.placeholder.com/120x120/a259f7/23263a?text=Ninja' },
  { id: 'bd1', name: 'Insignia Hacker', type: 'badges', image: 'https://via.placeholder.com/100x100/a259f7/23263a?text=H' },
  { id: 'ss1', name: 'Perfil Invierno', type: 'season', image: 'https://via.placeholder.com/120x120/a259f7/23263a?text=Winter' },
  { id: 'pl1', name: 'Placa Pro', type: 'plates', image: 'https://via.placeholder.com/120x60/a259f7/23263a?text=Pro' },
];

// Simulación de vulnerabilidades resueltas
const resolvedVulns = [
  { id: 'v1', name: 'SQL Injection', criticity: 'Alta', date: '2024-06-01', status: 'Resuelta' },
  { id: 'v2', name: 'XSS Reflected', criticity: 'Media', date: '2024-06-03', status: 'Cerrada' },
  { id: 'v3', name: 'CSRF', criticity: 'Crítica', date: '2024-06-05', status: 'Resuelta' },
];

// Simulación de documentaciones publicadas
const publishedDocs = [
  { id: 'd1', title: 'Mitigación de SQL Injection', vuln: 'SQL Injection', date: '2024-06-02', points: 50 },
  { id: 'd2', title: 'Prevención de XSS', vuln: 'XSS Reflected', date: '2024-06-04', points: 30 },
];

const avatarOptions = [
  '/src/assets/Ninja2.png',
  '/src/assets/Robot2.png',
  '/src/assets/Samurai.png',
  '/src/assets/Vampiro.png',
  '/src/assets/Mago.png',
  '/src/assets/Pirata.png',
  '/src/assets/Ciberespacio.png',
  '/src/assets/Ciudad.png',
  '/src/assets/Galaxia.png',
  '/src/assets/Monta1as.png',
];

const getUserPoints = () => {
  const points = localStorage.getItem('userPoints');
  return points ? parseInt(points, 10) : 0;
};

// Datos mock para la gráfica de tendencias
const vulnTrends = [
  { mes: 'Ene', resueltas: 1 },
  { mes: 'Feb', resueltas: 2 },
  { mes: 'Mar', resueltas: 1 },
  { mes: 'Abr', resueltas: 3 },
  { mes: 'May', resueltas: 2 },
  { mes: 'Jun', resueltas: 4 },
];
// Mock de trofeos/insignias ganadas
const userTrophies = [
  { id: 't1', name: 'Primer Reporte Crítico', icon: '🏅' },
  { id: 't2', name: 'Top 3 Gulag', icon: '🥈' },
  { id: 't3', name: 'Evento X', icon: '🎉' },
];
// Mock de feed de actividad reciente
const activityFeed = [
  { id: 1, text: 'Resolvió vulnerabilidad SQL Injection', date: '2024-06-01' },
  { id: 2, text: 'Publicó documentación sobre XSS', date: '2024-06-04' },
  { id: 3, text: 'Ganó 100 puntos', date: '2024-06-05' },
  { id: 4, text: 'Compró avatar Ninja', date: '2024-06-06' },
];

// Mock de equipo del usuario
const userTeam = {
  name: 'Equipo Alpha',
  icon: '👥',
  admin: 'NicoleHunt',
  members: [
    { name: 'NicoleHunt', avatar: '/src/assets/Ninja2.png' },
    { name: 'CyberQueen', avatar: '/src/assets/Robot2.png' },
    { name: 'H4ck3r', avatar: '/src/assets/Samurai.png' },
  ],
};

const Profile: React.FC = () => {
  const [userData, setUserData] = useState(initialUser);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUsername, setEditUsername] = useState(userData.username);
  const [editAvatar, setEditAvatar] = useState(userData.avatar);
  const [activeItems, setActiveItems] = React.useState<{ [type: string]: string }>({ backgrounds: 'bg1', miniprofiles: '', frames: '', animated: '', badges: '', season: '', plates: '' });
  const [userPoints, setUserPoints] = useState(getUserPoints());
  // Estado y datos para modal avanzado de perfil
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [bio, setBio] = useState('Cazador de bugs apasionado por la ciberseguridad.');
  const [editingBio, setEditingBio] = useState(false);
  const userBadges = [
    { id: 'badge1', name: 'Primer Bug', icon: '🐞' },
    { id: 'badge2', name: '5 Docs', icon: '📄' },
    { id: 'badge3', name: 'Top 10%', icon: '🏆' },
  ];
  const userXP = 320;
  const userLevel = 5;
  const xpToNextLevel = 500;
  const openProfileModal = () => setShowProfileModal(true);
  const closeProfileModal = () => setShowProfileModal(false);

  // Tipos de inventario para filtros
  const inventoryTypes = [
    { key: 'all', label: 'Todos' },
    { key: 'backgrounds', label: 'Avatares/Fondos' },
    { key: 'badges', label: 'Insignias' },
    { key: 'miniprofiles', label: 'Mini-perfiles' },
    { key: 'frames', label: 'Marcos' },
    { key: 'animated', label: 'Animados' },
    { key: 'season', label: 'Temporada' },
    { key: 'plates', label: 'Placas' },
  ];
  const [activeInventoryType, setActiveInventoryType] = useState('all');

  // Estado para modal de documentación publicada
  const [showDocModal, setShowDocModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setUserPoints(getUserPoints());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleActivate = (item: any) => {
    setActiveItems((prev) => ({ ...prev, [item.type]: prev[item.type] === item.id ? '' : item.id }));
  };

  const openEditModal = () => {
    setEditUsername(userData.username);
    setEditAvatar(userData.avatar);
    setShowEditModal(true);
  };

  const handleSaveProfile = () => {
    setUserData({ ...userData, username: editUsername, avatar: editAvatar });
    setShowEditModal(false);
  };

  // Función para abrir el modal de documentación
  const openDocModal = (doc: any) => {
    setSelectedDoc(doc);
    setShowDocModal(true);
  };
  const closeDocModal = () => setShowDocModal(false);

  // Función placeholder para ver detalles de equipo o miembro
  const handleTeamClick = () => alert(`Detalles del equipo: ${userTeam.name}`);
  const handleMemberClick = (memberName: string) => alert(`Detalles del miembro: ${memberName}`);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-br from-[#0f1021] via-[#23263a] to-[#1a1333]" style={{ fontFamily: FONT }}>
      {/* Modal de edición de perfil */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80" style={{backdropFilter: 'blur(2px)'}}>
          <div className="relative w-full max-w-md p-8 rounded-3xl shadow-2xl border-4 border-purple-500 animate-fade-in"
            style={{
              background: 'linear-gradient(135deg, #1a1333 0%, #3a1c71 50%, #f5af19 100%)',
              boxShadow: '0 0 40px 8px #a259f7, 0 0 0 4px #23263a',
            }}
          >
            {/* Halo animado */}
            <div className="absolute -inset-2 rounded-3xl pointer-events-none animate-pulse"
              style={{background: 'radial-gradient(circle at 70% 30%, rgba(162,89,247,0.15) 0, transparent 70%)', zIndex: 0}} />
            <button
              className="absolute top-3 right-3 text-gray-300 hover:text-yellow-400 text-3xl font-bold z-10"
              onClick={() => setShowEditModal(false)}
              aria-label="Cerrar"
              style={{textShadow: '0 0 8px #a259f7'}}
            >
              &times;
            </button>
            <h2 className="text-2xl font-extrabold text-yellow-400 mb-4 text-center tracking-widest drop-shadow-lg z-10">Editar Perfil</h2>
            <form onSubmit={e => { e.preventDefault(); handleSaveProfile(); }} className="z-10 relative">
              <label className="block mb-3 font-semibold text-purple-200">Nombre de usuario</label>
              <input
                className="input mb-5 bg-[#23263a] border-2 border-purple-500 text-yellow-200 font-bold text-lg rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 shadow-lg"
                value={editUsername}
                onChange={e => setEditUsername(e.target.value)}
                maxLength={20}
                required
              />
              <label className="block mb-2 font-semibold text-purple-200">Selecciona un avatar</label>
              <div className="flex flex-wrap gap-3 mb-5 justify-center">
                {avatarOptions.map((avatar) => (
                  <img
                    key={avatar}
                    src={avatar}
                    alt="avatar"
                    className={`w-16 h-16 rounded-full border-4 cursor-pointer transition-all duration-200 shadow-lg ${editAvatar === avatar ? 'border-yellow-400 scale-110 ring-4 ring-purple-500' : 'border-gray-500 hover:border-yellow-400'}`}
                    style={{background: '#181A1A'}}
                    onClick={() => setEditAvatar(avatar)}
                  />
                ))}
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-extrabold text-lg tracking-widest bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white shadow-xl hover:from-yellow-300 hover:to-purple-500 transition-all border-2 border-purple-500"
                style={{textShadow: '0 0 8px #a259f7'}}
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Modal avanzado de perfil */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80" style={{backdropFilter: 'blur(2px)'}}>
          <div className="relative w-full max-w-lg p-8 rounded-3xl shadow-2xl border-4 border-cyan-400 animate-fade-in bg-[#23263a]">
            <button
              className="absolute top-3 right-3 text-gray-300 hover:text-yellow-400 text-3xl font-bold z-10"
              onClick={closeProfileModal}
              aria-label="Cerrar"
              style={{textShadow: '0 0 8px #00fff7'}}>
              &times;
            </button>
            <div className="flex flex-col items-center gap-4">
              <img src={userData.avatar} alt="Avatar" className="w-28 h-28 rounded-full border-4 border-cyan-400 shadow-2xl object-cover" />
              <div className="text-2xl font-extrabold text-cyan-200 drop-shadow-lg tracking-widest">{userData.username}</div>
              <div className="flex items-center gap-2 text-purple-300 font-semibold text-lg"><FaCrown color={ACCENT_PURPLE} size={22} /> {userData.role}</div>
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-xl"><FaCoins color="#00fff7" size={22} /> <span>{userPoints}</span></div>
              {/* Badges/Logros */}
              <div className="flex gap-2 mt-2">
                {userBadges.map(badge => (
                  <span key={badge.id} title={badge.name} className="text-2xl" style={{filter: 'drop-shadow(0 0 4px #00fff7)'}}>{badge.icon}</span>
                ))}
              </div>
              {/* Nivel y barra de progreso */}
              <div className="w-full mt-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-cyan-200 font-bold">Nivel {userLevel}</span>
                  <span className="text-cyan-400 font-semibold">{userXP} XP / {xpToNextLevel} XP</span>
                </div>
                <div className="w-full h-4 bg-cyan-900 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-500" style={{width: `${(userXP/xpToNextLevel)*100}%`}} />
                </div>
              </div>
              {/* Bio editable */}
              <div className="w-full mt-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-cyan-200 font-bold">Bio</span>
                  {!editingBio ? (
                    <button className="text-cyan-400 underline text-sm" onClick={()=>setEditingBio(true)}>Editar</button>
                  ) : (
                    <button className="text-yellow-400 underline text-sm" onClick={()=>setEditingBio(false)}>Cancelar</button>
                  )}
                </div>
                {!editingBio ? (
                  <div className="text-cyan-100 min-h-[40px]">{bio}</div>
                ) : (
                  <textarea
                    className="w-full p-2 rounded-lg bg-[#181A1A] border-2 border-cyan-400 text-cyan-100"
                    value={bio}
                    onChange={e=>setBio(e.target.value)}
                    maxLength={180}
                    rows={3}
                    autoFocus
                  />
                )}
              </div>
              {/* Equipo al que pertenece */}
              <div className="flex flex-col items-center w-full mt-2">
                <div className="flex items-center gap-2 text-cyan-300 font-semibold text-base">
                  <span className="text-2xl">{userTeam.icon}</span>
                  {userTeam.name ? (
                    <span
                      className="underline cursor-pointer hover:text-cyan-400 transition"
                      onClick={handleTeamClick}
                    >
                      Miembro de: {userTeam.name}
                    </span>
                  ) : (
                    <span>Sin equipo</span>
                  )}
                </div>
                {userTeam.name && (
                  <div className="flex flex-col items-center w-full mt-2">
                    <span className="text-cyan-200 text-sm font-bold mb-1">Miembros del equipo:</span>
                    <div className="flex gap-3 flex-wrap justify-center">
                      {userTeam.members.map(member => (
                        <div key={member.name} className="flex flex-col items-center">
                          <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full border-2 border-cyan-400 shadow" />
                          <span
                            className="text-xs text-cyan-100 mt-1 font-semibold underline cursor-pointer hover:text-cyan-400 transition"
                            onClick={() => handleMemberClick(member.name)}
                          >
                            {member.name}
                          </span>
                          {member.name === userTeam.admin && (
                            <span className="text-yellow-400 text-[10px] font-bold">Admin</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Encabezado de usuario */}
      <section className="w-full flex flex-col items-center justify-center py-10 mb-10 rounded-b-3xl shadow-2xl relative overflow-hidden" style={{background: 'linear-gradient(135deg, #0ff0fc 0%, #23263a 60%, #a259f7 100%)', borderBottom: '6px solid #00fff7'}}>
        {/* Halo animado */}
        <div className="absolute -inset-2 pointer-events-none animate-pulse" style={{background: 'radial-gradient(circle at 70% 30%, rgba(0,255,255,0.10) 0, transparent 70%)', zIndex: 0}} />
        <div className="flex flex-col items-center gap-3 z-10">
          <div className="relative mb-2 cursor-pointer" onClick={openProfileModal}>
            <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-600 to-purple-700 blur-2xl opacity-60 animate-pulse" />
            <img src={userData.avatar} alt="Avatar" className="w-36 h-36 rounded-full border-4 border-cyan-400 shadow-2xl object-cover relative z-10" />
          </div>
          <div className="text-3xl font-extrabold mt-2 text-cyan-200 drop-shadow-lg tracking-widest cursor-pointer" onClick={openProfileModal}>{userData.username}</div>
          <div className="flex items-center gap-2 text-purple-300 font-semibold text-lg cursor-pointer" onClick={openProfileModal}><FaCrown color={ACCENT_PURPLE} size={26} /> {userData.role}</div>
          <div className="flex items-center gap-2 text-cyan-300 font-bold text-2xl mt-1 cursor-pointer" onClick={openProfileModal}>
            <FaCoins color="#00fff7" size={26} />
            <span>{userPoints}</span>
          </div>
          <button
            className="mt-2 flex items-center gap-2 px-6 py-2 rounded-xl font-extrabold text-lg tracking-widest bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-700 text-white shadow-xl hover:from-cyan-300 hover:to-purple-500 transition-all border-2 border-cyan-400"
            onClick={openEditModal}
            style={{textShadow: '0 0 8px #00fff7'}}
          >
            <FaUserEdit color="#fff" size={20} /> Editar Perfil
          </button>
        </div>
      </section>
      {/* Paneles principales organizados */}
      <main className="w-full max-w-7xl flex flex-col lg:flex-row gap-12 px-2 md:px-0">
        {/* Panel Izquierdo: Inventario */}
        <section className="flex-1 rounded-3xl p-8 mb-8 lg:mb-0 shadow-2xl border-4 border-cyan-400 relative overflow-hidden bg-gradient-to-br from-[#181a20] via-[#23263a] to-[#0ff0fc]">
          <div className="absolute -inset-2 pointer-events-none animate-pulse" style={{background: 'radial-gradient(circle at 70% 30%, rgba(0,255,255,0.10) 0, transparent 70%)', zIndex: 0}} />
          <h2 className="text-2xl font-extrabold mb-6 text-cyan-300 tracking-widest drop-shadow-lg z-10 text-center uppercase">Mi Inventario</h2>
          {/* Filtros de inventario */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {inventoryTypes.map(type => (
              <button
                key={type.key}
                className={`px-4 py-1.5 rounded-full font-bold text-sm transition-all border-2 ${activeInventoryType === type.key ? 'bg-cyan-400 text-white border-cyan-400 shadow-lg' : 'bg-[#23263a] text-cyan-200 border-cyan-800 hover:bg-cyan-800/80'}`}
                onClick={() => setActiveInventoryType(type.key)}
              >
                {type.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 z-10 relative">
            {userInventory
              .filter(item => activeInventoryType === 'all' ? true : item.type === activeInventoryType)
              .map((item) => {
                const isActive = activeItems[item.type] === item.id;
                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl flex flex-col items-center p-4 transition-transform hover:scale-105 shadow-xl border-2 ${isActive ? 'border-cyan-400 bg-gradient-to-br from-blue-900/60 to-cyan-400/10' : 'border-cyan-800 bg-[#23263a]/80'} backdrop-blur-md`}
                    style={{ minHeight: 180 }}
                  >
                    <img src={item.image} alt={item.name} className="w-20 h-16 object-cover rounded-lg mb-2 border-2 border-cyan-400 shadow-md" />
                    <div className="font-bold text-base mb-1 text-center text-cyan-200 drop-shadow">{item.name}</div>
                    {/* Botón de previsualización para fondos/temas */}
                    {(item.type === 'backgrounds' || item.type === 'themes') && (
                      <button className="mb-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-700 text-white hover:bg-cyan-500 transition">Previsualizar</button>
                    )}
                    <button
                      className={`w-full py-1.5 rounded-lg font-extrabold transition-all duration-200 mt-auto tracking-widest text-lg ${isActive ? 'bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-700 text-white shadow-lg border-2 border-cyan-400' : 'bg-[#181A1A] text-cyan-200 border-2 border-cyan-800 hover:bg-cyan-800/80'}`}
                      style={{ letterSpacing: 1 }}
                      onClick={() => handleActivate(item)}
                    >
                      {isActive ? 'Desactivar' : 'Activar'}
                    </button>
                  </div>
                );
              })}
          </div>
        </section>
        {/* Panel Derecho: Actividad */}
        <section className="flex-1 rounded-3xl p-8 shadow-2xl border-4 border-purple-700 relative overflow-hidden bg-gradient-to-br from-[#181a20] via-[#23263a] to-[#a259f7]">
          <div className="absolute -inset-2 pointer-events-none animate-pulse" style={{background: 'radial-gradient(circle at 30% 70%, rgba(162,89,247,0.10) 0, transparent 70%)', zIndex: 0}} />
          <h2 className="text-2xl font-extrabold mb-6 text-purple-300 tracking-widest drop-shadow-lg z-10 text-center uppercase">Mi Actividad</h2>
          {/* Gráfica de tendencias de vulnerabilidades */}
          <div className="mb-8 z-10 relative">
            <h3 className="text-lg font-bold mb-2 text-pink-300 tracking-wide uppercase">Tendencia de Vulnerabilidades Resueltas</h3>
            <div className="w-full h-48 bg-[#23263a] rounded-xl p-2 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={vulnTrends} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#a259f7" />
                  <XAxis dataKey="mes" stroke="#a259f7" />
                  <YAxis stroke="#a259f7" allowDecimals={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="resueltas" stroke="#ff6ac1" strokeWidth={3} dot={{ r: 5, fill: '#a259f7' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* Trofeos/insignias ganadas */}
          <div className="mb-8 z-10 relative">
            <h3 className="text-lg font-bold mb-2 text-yellow-300 tracking-wide uppercase">Trofeos y Reconocimientos</h3>
            <div className="flex gap-3 flex-wrap">
              {userTrophies.map(trophy => (
                <div key={trophy.id} className="flex flex-col items-center p-2 bg-[#23263a] rounded-xl shadow border-2 border-yellow-400 min-w-[80px]">
                  <span className="text-3xl mb-1" style={{filter: 'drop-shadow(0 0 4px #ffec99)'}}>{trophy.icon}</span>
                  <span className="text-xs text-yellow-200 text-center font-bold">{trophy.name}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Feed de actividad reciente */}
          <div className="mb-4 z-10 relative">
            <h3 className="text-lg font-bold mb-2 text-cyan-300 tracking-wide uppercase">Actividad Reciente</h3>
            <ul className="space-y-2">
              {activityFeed.map(item => (
                <li key={item.id} className="flex items-center gap-2 text-cyan-100 bg-[#23263a] rounded-lg px-3 py-2 shadow border-l-4 border-cyan-400">
                  <span className="text-xs text-cyan-400 font-bold w-20">{item.date}</span>
                  <span className="text-sm">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Vulnerabilidades Resueltas */}
          <div className="mb-8 z-10 relative">
            <h3 className="text-lg font-bold mb-2 text-cyan-300 tracking-wide uppercase">Vulnerabilidades Resueltas</h3>
            <div className="overflow-x-auto rounded-xl shadow-lg">
              <table className="min-w-full text-base text-center rounded-xl overflow-hidden" style={{background: 'rgba(30,30,40,0.85)'}}>
                <thead>
                  <tr className="bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-700 text-white">
                    <th className="py-2 px-3">Nombre</th>
                    <th className="py-2 px-3">Criticidad</th>
                    <th className="py-2 px-3">Fecha</th>
                    <th className="py-2 px-3">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {resolvedVulns.map(v => (
                    <tr key={v.id} className="border-b border-cyan-800 hover:bg-cyan-900/40 transition">
                      <td className="py-2 px-3 font-bold text-cyan-200">{v.name}</td>
                      <td className={`py-2 px-3 font-bold ${v.criticity === 'Crítica' ? 'text-pink-400' : v.criticity === 'Alta' ? 'text-yellow-400' : v.criticity === 'Media' ? 'text-blue-400' : 'text-green-400'}`}>{v.criticity}</td>
                      <td className="py-2 px-3 text-cyan-100">{v.date}</td>
                      <td className="py-2 px-3 text-cyan-100">{v.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Documentaciones Publicadas */}
          <div className="z-10 relative">
            <h3 className="text-lg font-bold mb-2 text-cyan-300 tracking-wide uppercase">Documentaciones Publicadas</h3>
            <div className="overflow-x-auto rounded-xl shadow-lg">
              <table className="min-w-full text-base text-center rounded-xl overflow-hidden" style={{background: 'rgba(30,30,40,0.85)'}}>
                <thead>
                  <tr className="bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-700 text-white">
                    <th className="py-2 px-3">Título</th>
                    <th className="py-2 px-3">Vulnerabilidad</th>
                    <th className="py-2 px-3">Fecha</th>
                    <th className="py-2 px-3">Puntos</th>
                    <th className="py-2 px-3">Ver</th>
                  </tr>
                </thead>
                <tbody>
                  {publishedDocs.map(d => (
                    <tr key={d.id} className="border-b border-purple-700 hover:bg-purple-900/40 transition">
                      <td className="py-2 px-3 font-bold text-cyan-200">{d.title}</td>
                      <td className="py-2 px-3 text-blue-400">{d.vuln}</td>
                      <td className="py-2 px-3 text-cyan-100">{d.date}</td>
                      <td className="py-2 px-3 text-yellow-400 font-bold">+{d.points}</td>
                      <td className="py-2 px-3">
                        <button
                          className="text-cyan-400 underline font-bold hover:text-yellow-400 transition"
                          onClick={() => openDocModal(d)}
                        >
                          Ver
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Modal de documentación publicada */}
            {showDocModal && selectedDoc && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80" style={{backdropFilter: 'blur(2px)'}}>
                <div className="relative w-full max-w-2xl p-8 rounded-3xl shadow-2xl border-4 border-cyan-400 animate-fade-in bg-[#23263a]">
                  <button
                    className="absolute top-3 right-3 text-gray-300 hover:text-yellow-400 text-3xl font-bold z-10"
                    onClick={closeDocModal}
                    aria-label="Cerrar"
                    style={{textShadow: '0 0 8px #00fff7'}}>
                    &times;
                  </button>
                  <h2 className="text-2xl font-extrabold text-cyan-200 mb-2">{selectedDoc.title}</h2>
                  <div className="text-blue-400 font-bold mb-2">Vulnerabilidad: {selectedDoc.vuln}</div>
                  <div className="text-cyan-100 mb-4">Fecha: {selectedDoc.date}</div>
                  <div className="text-yellow-400 font-bold mb-4">Puntos: +{selectedDoc.points}</div>
                  <div className="bg-[#181A1A] rounded-xl p-4 text-cyan-100 min-h-[120px] max-h-96 overflow-y-auto">
                    {/* Placeholder de contenido */}
                    <p>Lorem ipsum dolor sit amet, esta es la documentación publicada por el usuario. Aquí se mostraría el contenido completo de la explicación o guía.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile; 