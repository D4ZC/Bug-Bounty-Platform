import React, { useState, useEffect, useRef } from 'react';
import { FaCrown, FaSearch, FaUser, FaUsers } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { mockTeams } from '../mocks/teams';
import { mockUsers } from './UserProfile';

// Avatares locales para miembros de equipo - todos los disponibles
const localAvatars = [
  '/avatars/prueba.png',
  '/avatars/cat_avatar.webp',
  '/avatars/lucy_avatar.webp',
  '/avatars/rebecca_avatar.webp',
  '/avatars/poro_avatar.webp',
  '/avatars/teemo.webp',
  '/avatars/ado.webp',
  '/avatars/cat.gif',
  '/avatars/toga.gif',
  '/avatars/panda.gif',
  '/avatars/david_avatar.webp',
  '/avatars/david_avatar2.webp',
  '/avatars/poro_avatar2.webp',
  '/avatars/rebeca_avatar.webp',
  '/avatars/avatargif.gif',
  '/avatars/img_example.jpg',
];

// Mock de insignias para usuarios
const mockBadges = [
  '/badges/badge1.png',
  '/badges/badge2.png',
  '/badges/badge3.png',
  '/badges/badge4.png',
  '/badges/badge5.png',
];

// Mock de miembros para equipos usando avatares locales
const mockTeamMembers = (teamId: number) => Array.from({ length: 3 + (teamId % 4) }, (_, i) => ({
  id: i + 1,
  name: `Miembro ${i + 1}`,
  avatar: localAvatars[(teamId * 3 + i) % localAvatars.length],
}));

// Mock de insignias para equipos
const mockTeamBadges = [
  '/badges/badge1.png',
  '/badges/badge2.png',
  '/badges/badge3.png',
  '/badges/badge4.png',
  '/badges/badge5.png',
];

const Rankings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState<'users' | 'teams'>('users');
  const [userSearch, setUserSearch] = useState('');
  const [visibleUsers, setVisibleUsers] = useState(10); // Scroll infinito
  const [userModal, setUserModal] = useState<any | null>(null);
  const [teamModal, setTeamModal] = useState<any | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Al montar, lee la tab guardada en localStorage
  React.useEffect(() => {
    const savedTab = localStorage.getItem('rankingsTab');
    if (savedTab === 'teams') {
      setTab('teams');
      localStorage.removeItem('rankingsTab');
    }
  }, [location.key]);

  // Filtrado y scroll infinito
  const filteredUsers = mockUsers.filter(u => u.name.toLowerCase().includes(userSearch.toLowerCase()));
  const usersToShow = filteredUsers.slice(0, visibleUsers);

  // Mapa de id a posición real en el ranking global
  const userIdToGlobalPos = Object.fromEntries(mockUsers.map((u, idx) => [u.id, idx + 1]));
  const totalUsers = mockUsers.length;

  useEffect(() => {
    if (tab === 'users') {
      const handleScroll = () => {
        if (!listRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = listRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 10 && visibleUsers < filteredUsers.length) {
          setVisibleUsers(v => Math.min(v + 10, filteredUsers.length));
        }
      };
      const ref = listRef.current;
      ref?.addEventListener('scroll', handleScroll);
      return () => ref?.removeEventListener('scroll', handleScroll);
    }
  }, [tab, visibleUsers, filteredUsers.length]);

  useEffect(() => { setVisibleUsers(10); }, [userSearch, tab]);

  // Multi-idioma global: el cambio se hace desde el engranaje/configuración

  // Animación especial para modales
  const modalAnim = 'animate-[pop_0.3s_ease] shadow-2xl';

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start py-10 px-2 bg-gradient-to-br from-[#181c24] via-[#23273a] to-[#181c24]">
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#4fc3f7] mb-8 tracking-wide drop-shadow-lg text-center">{t('Rankings')}</h1>
      <div className="flex gap-4 mb-8">
        <button onClick={() => setTab('users')} className={`px-6 py-2 rounded-t-lg font-bold text-lg flex items-center gap-2 ${tab === 'users' ? 'bg-[#23273a] text-cyan-400 border-b-4 border-cyan-400' : 'bg-[#181c24] text-white hover:text-cyan-300'}`}><FaUser /> {t('Usuarios')}</button>
        <button onClick={() => setTab('teams')} className={`px-6 py-2 rounded-t-lg font-bold text-lg flex items-center gap-2 ${tab === 'teams' ? 'bg-[#23273a] text-yellow-400 border-b-4 border-yellow-400' : 'bg-[#181c24] text-white hover:text-yellow-300'}`}><FaUsers /> {t('Equipos')}</button>
      </div>
      <div className="w-full max-w-3xl bg-[#23273a] rounded-2xl shadow-xl p-6">
        {tab === 'users' && (
          <>
            <div className="flex items-center gap-2 mb-4">
              <FaSearch className="text-cyan-400" />
              <input
                type="text"
                placeholder={t('Buscar usuario...')}
                className="bg-[#181c24] text-white px-4 py-2 rounded w-full focus:outline-none"
                value={userSearch}
                onChange={e => setUserSearch(e.target.value)}
              />
            </div>
            <div ref={listRef} className="max-h-[420px] overflow-y-auto custom-scrollbar">
              <table className="w-full text-left border-separate border-spacing-y-2">
                <thead>
                  <tr className="text-cyan-300 text-lg">
                    <th className="pl-2">#</th>
                    <th>{t('Avatar')}</th>
                    <th>{t('Nombre')}</th>
                    <th>{t('Puntos')}</th>
                  </tr>
                </thead>
                <tbody>
                  {usersToShow.map((user) => {
                    const globalPos = userIdToGlobalPos[user.id];
                    const isTop1 = globalPos === 1;
                    const isLast5 = globalPos > totalUsers - 5;
                    return (
                      <tr key={user.id} className={`${isTop1 ? 'bg-blue-900/80 text-blue-300 font-bold' : isLast5 ? 'bg-black/80 text-white' : 'bg-[#181c24] text-white'} transition-all`}> 
                        <td className="pl-2 text-xl">
                          {isTop1 ? <span className="flex items-center gap-1"><FaCrown className="text-yellow-400 animate-bounce" />1</span> : globalPos}
                        </td>
                        <td className="relative w-14 h-14">
                          {user.selectedFrame && user.selectedFrame.startsWith('marco') && user.selectedFrame !== 'marco' ? (
                            <img src={`/marcos/${user.selectedFrame}.png`} alt="marco" className="absolute top-0 left-0 w-full h-full pointer-events-none select-none" style={{ zIndex: 2, objectFit: 'contain' }} />
                          ) : null}
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover z-10 absolute top-1/2 left-1/2"
                            style={{ transform: 'translate(-50%, -50%)', zIndex: 1 }}
                          />
                        </td>
                        <td>
                          <button className="font-bold hover:underline text-cyan-300" onClick={() => setUserModal(user)}>{user.name}</button>
                        </td>
                        <td className="font-mono text-lg">{user.points}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {usersToShow.length === 0 && <div className="text-center text-gray-400 py-8">{t('No se encontraron usuarios')}</div>}
            </div>
          </>
        )}
        {tab === 'teams' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr className="text-yellow-300 text-lg">
                  <th className="pl-2">#</th>
                  <th>{t('Logo')}</th>
                  <th>{t('Nombre')}</th>
                  <th>{t('Puntos')}</th>
                </tr>
              </thead>
              <tbody>
                {mockTeams.map((team, idx) => (
                  <tr key={team.id} className="bg-[#181c24] text-white transition-all">
                    <td className="pl-2 text-xl">{idx + 1}</td>
                    <td>
                      <img src={team.avatar} alt={team.name} className="w-10 h-10 rounded-full border-2 border-yellow-400 cursor-pointer hover:scale-110 transition" onClick={() => setTeamModal(team)} />
                    </td>
                    <td>
                      <button className="font-bold hover:underline text-yellow-300" onClick={() => setTeamModal(team)}>{team.name}</button>
                    </td>
                    <td className="font-mono text-lg">{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* Modal usuario */}
      {userModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setUserModal(null)}>
          <div className={`bg-[#181c24] border-2 border-cyan-400 rounded-2xl p-8 min-w-[320px] max-w-xs flex flex-col items-center gap-4 relative ${modalAnim}`} onClick={e => e.stopPropagation()} style={{ boxShadow: '0 0 40px 8px #00bcd4cc' }}>
            <div className="relative flex items-center justify-center w-24 h-24 mx-auto mb-2">
              {userModal.selectedFrame && userModal.selectedFrame.startsWith('marco') && userModal.selectedFrame !== 'marco' ? (
                <img src={`/marcos/${userModal.selectedFrame}.png`} alt="marco" className="absolute top-0 left-0 w-full h-full pointer-events-none select-none" style={{ zIndex: 2, objectFit: 'contain' }} />
              ) : null}
              <img
                src={userModal.avatar}
                alt={userModal.name}
                className="w-16 h-16 rounded-full object-cover z-10 absolute top-1/2 left-1/2"
                style={{ transform: 'translate(-50%, -50%)', zIndex: 1 }}
              />
            </div>
            <h3 className="text-2xl font-bold text-cyan-300 mb-1">{userModal.name}</h3>
            <div className="text-lg text-white font-mono mb-2">{t('Puntos')}: <span className="text-cyan-400 font-bold">{userModal.points}</span></div>
            {/* Insignias mock: cada usuario tiene de 1 a 3 insignias */}
            <div className="flex gap-2 mb-2">
              {mockBadges.slice(0, (userModal.id % 3) + 1).map((badge, i) => (
                <img key={i} src={badge} alt={`badge${i + 1}`} className="w-14 h-14 rounded bg-[#23273a] border-2 border-cyan-400 shadow" />
              ))}
            </div>
            <button className="mt-2 px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-bold shadow transition" onClick={() => navigate(`/profile/${userModal.id}`)}>{t('Ver perfil')}</button>
            <button className="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700" onClick={() => setUserModal(null)}>✕</button>
          </div>
        </div>
      )}
      {/* Modal equipo */}
      {teamModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setTeamModal(null)}>
          <div className={`bg-[#181c24] border-2 border-yellow-400 rounded-2xl p-8 min-w-[340px] max-w-xs flex flex-col items-center gap-4 relative ${modalAnim}`} onClick={e => e.stopPropagation()} style={{ boxShadow: '0 0 40px 8px #ffd600cc' }}>
            <img src={teamModal.avatar} alt={teamModal.name} className="w-24 h-24 rounded-full border-4 border-yellow-400 shadow-lg mb-2 animate-[pulse_1.2s_infinite]" />
            <h3 className="text-2xl font-bold text-yellow-300 mb-1">{teamModal.name}</h3>
            <div className="text-lg text-white font-mono mb-1">{t('Puntos')}: <span className="text-yellow-400 font-bold">{teamModal.points}</span></div>
            {/* Cantidad de miembros y avatares */}
            <div className="flex flex-col items-center mb-2">
              <span className="text-sm text-yellow-200 mb-1">{t('Miembros')}: {teamModal.members.length}</span>
              <div className="flex gap-1">
                {teamModal.members.map(m => (
                  <img key={m.id} src={m.avatar} alt={m.name} title={m.name} className="w-8 h-8 rounded-full border-2 border-yellow-400 shadow" />
                ))}
              </div>
            </div>
            {/* Insignias mock: cada equipo tiene de 1 a 3 insignias */}
            <div className="flex gap-2 mb-2">
              {teamModal.badges.map((badge, i) => (
                <div key={i} className="relative group">
                  <img src={badge.src} alt={badge.name} className="w-14 h-14 rounded bg-[#23273a] border-2 border-yellow-400 shadow" />
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 rounded bg-yellow-900 text-yellow-200 text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none z-10 whitespace-nowrap">
                    {badge.name}
                  </span>
                </div>
              ))}
            </div>
            <button className="mt-2 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-bold shadow transition" onClick={() => { setTeamModal(null); navigate(`/team/${teamModal.id}`); }}>Ver equipo</button>
            <button className="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700" onClick={() => setTeamModal(null)}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rankings; 