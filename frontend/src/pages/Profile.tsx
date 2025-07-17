import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCoins, FaUserEdit, FaCrown } from 'react-icons/fa';

const ACCENT_PURPLE = '#a259f7';
const DARK_BG = '#1A1A1A';
const PANEL_BG = '#23263a';
const FONT = 'Inter, Roboto, Arial, sans-serif';

// Simulación de datos de usuario
const user = {
  username: 'NicoleHunt',
  avatar: '/src/assets/Ninja.png',
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

const getUserPoints = () => {
  const points = localStorage.getItem('userPoints');
  return points ? parseInt(points, 10) : 0;
};

const Profile: React.FC = () => {
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

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start" style={{ fontFamily: FONT, background: DARK_BG }}>
      {/* Encabezado de usuario */}
      <section className="w-full flex flex-col items-center justify-center py-8 mb-8" style={{ background: PANEL_BG, borderRadius: '0 0 32px 32px', boxShadow: '0 2px 12px #a259f733' }}>
        <div className="flex flex-col items-center gap-3">
          <img src={user.avatar} alt="Avatar" className="w-32 h-32 rounded-full border-4 border-purple-400 shadow-lg object-cover" />
          <div className="text-2xl font-extrabold text-white mt-2">{user.username}</div>
          <div className="flex items-center gap-2 text-purple-300 font-semibold text-lg"><FaCrown color="#a259f7" size={22} /> {user.role}</div>
          <div className="flex items-center gap-2 text-yellow-300 font-bold text-xl mt-1">
            <FaCoins color="#FFD700" size={22} />
            <span>{userPoints}</span>
          </div>
          <button className="mt-2 px-6 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-bold shadow transition-all flex items-center gap-2">
            <FaUserEdit color="#fff" size={18} /> Editar Perfil
          </button>
        </div>
      </section>
      {/* Paneles principales */}
      <main className="w-full max-w-6xl flex flex-col md:flex-row gap-8 px-2 md:px-0">
        {/* Panel Izquierdo: Inventario */}
        <section className="flex-1 rounded-2xl p-6 mb-8 md:mb-0" style={{ background: PANEL_BG, boxShadow: '0 4px 24px #a259f722' }}>
          <h2 className="text-xl font-bold mb-4 text-purple-300">Mi Inventario</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {userInventory.map((item) => {
              const isActive = activeItems[item.type] === item.id;
              return (
                <div
                  key={item.id}
                  className={`bg-[#23263a] rounded-2xl shadow-lg border flex flex-col items-center p-4 transition-transform hover:scale-105 ${isActive ? 'border-purple-400' : 'border-[#23263a]'}`}
                  style={{ minHeight: 180 }}
                >
                  <img src={item.image} alt={item.name} className="w-20 h-16 object-cover rounded-lg mb-2 border-2 border-[#181A20]" />
                  <div className="font-bold text-base text-white mb-1 text-center">{item.name}</div>
                  <button
                    className={`w-full py-1.5 rounded-lg font-bold text-white transition-all duration-200 mt-auto ${isActive ? 'bg-purple-600 hover:bg-purple-500 shadow-lg' : 'bg-gray-700 hover:bg-purple-600 hover:shadow-lg'}`}
                    style={{ fontSize: 14, letterSpacing: 1 }}
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
        <section className="flex-1 rounded-2xl p-6" style={{ background: PANEL_BG, boxShadow: '0 4px 24px #a259f722' }}>
          <h2 className="text-xl font-bold mb-4 text-purple-300">Mi Actividad</h2>
          {/* Vulnerabilidades Resueltas */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">Vulnerabilidades Resueltas</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-300">
                <thead>
                  <tr className="bg-[#23263a] text-purple-200">
                    <th className="py-2 px-3">Nombre</th>
                    <th className="py-2 px-3">Criticidad</th>
                    <th className="py-2 px-3">Fecha</th>
                    <th className="py-2 px-3">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {resolvedVulns.map(v => (
                    <tr key={v.id} className="border-b border-[#23263a] hover:bg-[#2d2d3a]">
                      <td className="py-2 px-3 font-bold text-white">{v.name}</td>
                      <td className={`py-2 px-3 font-bold ${v.criticity === 'Crítica' ? 'text-red-400' : v.criticity === 'Alta' ? 'text-orange-400' : v.criticity === 'Media' ? 'text-yellow-300' : 'text-green-300'}`}>{v.criticity}</td>
                      <td className="py-2 px-3">{v.date}</td>
                      <td className="py-2 px-3">{v.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Documentaciones Publicadas */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Documentaciones Publicadas</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-300">
                <thead>
                  <tr className="bg-[#23263a] text-purple-200">
                    <th className="py-2 px-3">Título</th>
                    <th className="py-2 px-3">Vulnerabilidad</th>
                    <th className="py-2 px-3">Fecha</th>
                    <th className="py-2 px-3">Puntos</th>
                    <th className="py-2 px-3">Ver</th>
                  </tr>
                </thead>
                <tbody>
                  {publishedDocs.map(d => (
                    <tr key={d.id} className="border-b border-[#23263a] hover:bg-[#2d2d3a]">
                      <td className="py-2 px-3 font-bold text-white">{d.title}</td>
                      <td className="py-2 px-3">{d.vuln}</td>
                      <td className="py-2 px-3">{d.date}</td>
                      <td className="py-2 px-3 text-purple-300 font-bold">+{d.points}</td>
                      <td className="py-2 px-3">
                        <a href="#" className="text-purple-400 underline font-bold hover:text-purple-300 transition">Ver</a>
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