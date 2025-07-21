import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileCustomization: React.FC = () => {
  // Datos simulados para demo
  const user = {
    username: 'Zucaritas',
    uid: 'USER123456',
    level: 150,
    clan: 'Shadow Ops',
    clanLevel: 5,
    stats: {
      kd: 2.35,
      wins: 120,
      games: 350,
      battlePass: 60,
    },
    achievements: [
      { icon: 'fas fa-medal', color: 'text-yellow-400', title: 'MVP de la Temporada', date: 'Hace 2 días' },
      { icon: 'fas fa-trophy', color: 'text-cyan-400', title: 'Top 1 Ranking', date: 'Hace 1 semana' },
    ],
  };

  // Avatar dinámico desde localStorage
  const [avatar, setAvatar] = useState('/ruta/avatar.png');
  const navigate = useNavigate();

  useEffect(() => {
    // Puedes mapear los ids a rutas reales de avatares
    const map: Record<string, string> = {
      Analista: '/avatars/Analista.png',
      Ciberseguridad: '/avatars/Ciberseguridad.png',
      Cyber_God: '/avatars/Cyber_God.png',
      Cyber_Ninja: '/avatars/Cyber_Ninja.png',
      Digital_Overlord: '/avatars/Digital_Overlord.png',
      Digital_Phantom: '/avatars/Digital_Phantom.png',
      Ghost_Hacker: '/avatars/Ghost_Hacker.png',
      Hacker_Básico: '/avatars/Hacker_Básico.png',
      Legendary_Hacker: '/avatars/Legendary_Hacker.png',
      Pantester: '/avatars/Pantester.png',
      Programador: '/avatars/Programador.png',
      Stealth_Master: '/avatars/Stealth_Master.png',
    };
    const stored = localStorage.getItem('profile_custom_avatar');
    if (stored && map[stored]) setAvatar(map[stored]);
    else setAvatar('/ruta/avatar.png');
  }, []);

  const handleAvatarEdit = () => {
    navigate('/avatar-selection');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181a20] to-black font-sans">
      {/* Encabezado Principal */}
      <header className="relative w-full h-44 bg-gradient-to-r from-gray-900 via-gray-800 to-black flex items-center px-12 shadow-lg border-b-2 border-gray-700"
        style={{ backgroundImage: 'url(/ruta/patron.png), linear-gradient(90deg, #23272f 0%, #111 100%)', backgroundBlendMode: 'overlay' }}>
        {/* Foto de perfil */}
        <div className="flex-shrink-0">
          <div
            className="w-28 h-28 rounded-full border-4 border-cyan-400 shadow-lg flex items-center justify-center bg-black/60 relative cursor-pointer"
            style={{ boxShadow: '0 0 24px #00fff7, 0 0 48px #00fff7' }}
            onClick={handleAvatarEdit}
            title="Cambiar avatar"
          >
            <img src={avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover" />
          </div>
        </div>
        {/* Info central */}
        <div className="flex-1 flex flex-col items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-extrabold text-white tracking-widest font-mono">{user.username}</span>
            <button className="ml-2 p-1 rounded-full bg-gray-800 hover:bg-cyan-700 transition">
              <i className="fas fa-pen text-gray-300 text-lg" />
            </button>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-yellow-400 bg-yellow-900/80 px-3 py-1 rounded font-bold text-sm shadow border border-yellow-400">PRO</span>
            <span className="bg-gray-800/80 text-cyan-200 px-3 py-1 rounded text-xs border border-cyan-500/30 shadow">UID: {user.uid}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-cyan-400 text-xl"><i className="fas fa-star" /></span>
            <span className="text-2xl font-bold text-white">{user.level}</span>
            <span className="text-cyan-400 text-sm ml-2">LVL</span>
          </div>
        </div>
        {/* Elementos decorativos derecha */}
        <div className="flex flex-col items-end gap-3 absolute right-8 top-6">
          <button className="p-2 rounded-full bg-gray-800 hover:bg-cyan-700 transition">
            <i className="fas fa-user-friends text-gray-300 text-xl" />
          </button>
          <button className="p-2 rounded-full bg-gray-800 hover:bg-cyan-700 transition">
            <i className="fas fa-bars text-gray-300 text-xl" />
          </button>
        </div>
      </header>

      {/* Banner de Clan */}
      <div className="w-full h-12 bg-gradient-to-r from-gray-700 to-gray-800 border-b border-cyan-700 flex items-center justify-between px-12">
        <span className="text-white font-bold text-lg">{user.clan}</span>
        <span className="flex items-center gap-2 text-cyan-300 font-bold">
          <i className="fas fa-shield-alt text-cyan-400" /> Nivel {user.clanLevel}
        </span>
      </div>

      {/* Layout principal */}
      <div className="flex w-full min-h-[calc(100vh-11rem)]">
        {/* Sidebar */}
        <nav className="w-24 bg-gradient-to-b from-gray-900 to-black flex flex-col items-center py-8 gap-6 border-r-2 border-gray-800">
          {['Perfil', 'Estadísticas', 'Logros', 'Títulos', 'Emblemas'].map((item, idx) => (
            <button key={item} className={`w-16 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xs mb-2
              ${idx === 0 ? 'bg-cyan-700 border-l-4 border-cyan-400 shadow-lg' : 'bg-gray-800 hover:bg-cyan-900/40'}`}>
              {item}
            </button>
          ))}
        </nav>
        {/* Área central */}
        <main className="flex-1 flex flex-row items-start justify-center bg-[url('/ruta/carbono.png')] bg-repeat bg-opacity-10 p-12">
          {/* Panel de logros/estadísticas */}
          <section className="w-full max-w-2xl ml-12 flex flex-col gap-8">
            {/* Logros */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-cyan-700 p-6 shadow-lg">
              <h2 className="text-xl font-bold text-cyan-300 mb-4">Logros Recientes</h2>
              <ul className="flex flex-col gap-3">
                {user.achievements.map((ach, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className={`${ach.color} text-2xl`}><i className={ach.icon} /></span>
                    <span className="text-white font-bold">{ach.title}</span>
                    <span className="text-gray-400 text-xs ml-auto">{ach.date}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Estadísticas */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-cyan-700 p-6 shadow-lg">
              <h2 className="text-xl font-bold text-cyan-300 mb-4">Estadísticas</h2>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">K/D Ratio</span>
                  <span className="text-white font-bold">{user.stats.kd}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Victorias</span>
                  <span className="text-white font-bold">{user.stats.wins}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Partidas Jugadas</span>
                  <span className="text-white font-bold">{user.stats.games}</span>
                </div>
                {/* Barras de progreso */}
                <div className="mt-4">
                  <span className="text-gray-400 text-xs">Pase de Batalla</span>
                  <div className="w-full h-3 bg-gray-700 rounded-full mt-1">
                    <div className="h-3 bg-cyan-400 rounded-full" style={{ width: `${user.stats.battlePass}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProfileCustomization; 