import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCoins, FaUserEdit, FaCrown } from 'react-icons/fa';

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

const Profile: React.FC = () => {
  const [userData, setUserData] = useState(initialUser);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUsername, setEditUsername] = useState(userData.username);
  const [editAvatar, setEditAvatar] = useState(userData.avatar);
  const [activeItems, setActiveItems] = React.useState<{ [type: string]: string }>({ backgrounds: 'bg1', miniprofiles: '', frames: '', animated: '', badges: '', season: '', plates: '' });
  const [userPoints, setUserPoints] = useState(getUserPoints());

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
      {/* Encabezado de usuario */}
      <section className="w-full flex flex-col items-center justify-center py-10 mb-10 rounded-b-3xl shadow-2xl relative overflow-hidden" style={{background: 'linear-gradient(135deg, #0ff0fc 0%, #23263a 60%, #a259f7 100%)', borderBottom: '6px solid #00fff7'}}>
        {/* Halo animado */}
        <div className="absolute -inset-2 pointer-events-none animate-pulse" style={{background: 'radial-gradient(circle at 70% 30%, rgba(0,255,255,0.10) 0, transparent 70%)', zIndex: 0}} />
        <div className="flex flex-col items-center gap-3 z-10">
          <div className="relative mb-2">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-600 to-purple-700 blur-2xl opacity-60 animate-pulse" />
            <img src={userData.avatar} alt="Avatar" className="w-36 h-36 rounded-full border-4 border-cyan-400 shadow-2xl object-cover relative z-10" />
          </div>
          <div className="text-3xl font-extrabold mt-2 text-cyan-200 drop-shadow-lg tracking-widest">{userData.username}</div>
          <div className="flex items-center gap-2 text-purple-300 font-semibold text-lg"><FaCrown color={ACCENT_PURPLE} size={26} /> {userData.role}</div>
          <div className="flex items-center gap-2 text-cyan-300 font-bold text-2xl mt-1">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 z-10 relative">
            {userInventory.map((item) => {
              const isActive = activeItems[item.type] === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl flex flex-col items-center p-4 transition-transform hover:scale-105 shadow-xl border-2 ${isActive ? 'border-cyan-400 bg-gradient-to-br from-blue-900/60 to-cyan-400/10' : 'border-cyan-800 bg-[#23263a]/80'} backdrop-blur-md`}
                  style={{ minHeight: 180 }}
                >
                  <img src={item.image} alt={item.name} className="w-20 h-16 object-cover rounded-lg mb-2 border-2 border-cyan-400 shadow-md" />
                  <div className="font-bold text-base mb-1 text-center text-cyan-200 drop-shadow">{item.name}</div>
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
                        <a href="#" className="text-cyan-400 underline font-bold hover:text-yellow-400 transition">Ver</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile; 