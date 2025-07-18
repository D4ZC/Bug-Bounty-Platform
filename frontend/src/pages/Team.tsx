import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUsers, FaCrown, FaArrowLeft } from 'react-icons/fa';
import { mockTeams } from '../mocks/teams';

const Team: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const team = mockTeams.find(t => t.id === Number(id) || t.name.toLowerCase() === String(id).toLowerCase());
  const [badgeModal, setBadgeModal] = useState<null | { src: string; name: string; desc: string }>(null);

  if (!team) return <div className="text-center text-2xl text-red-400 mt-20">Equipo no encontrado</div>;

  const handleBack = () => {
    localStorage.setItem('rankingsTab', 'teams');
    navigate('/rankings');
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start py-10 px-2 bg-gradient-to-br from-[#181c24] via-[#23273a] to-[#181c24]">
      <div className="bg-[#23273a] border-2 border-yellow-400 rounded-2xl shadow-2xl p-8 w-full max-w-xl flex flex-col items-center gap-4">
        <button onClick={handleBack} className="self-start mb-2 flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-bold shadow transition">
          <FaArrowLeft /> Regresar
        </button>
        <img src={team.avatar} alt={team.name} className="w-28 h-28 rounded-full border-4 border-yellow-400 shadow-lg mb-2" />
        <h1 className="text-3xl font-extrabold text-yellow-300 mb-1 flex items-center gap-2">{team.name}</h1>
        <div className="text-lg text-white font-mono mb-1">Puntos: <span className="text-yellow-400 font-bold">{team.points}</span></div>
        <div className="flex flex-col items-center mb-2">
          <span className="text-sm text-yellow-200 mb-1 flex items-center gap-1"><FaUsers /> Miembros: {team.members.length}</span>
          <div className="flex gap-2 mt-1">
            {team.members.map(m => (
              <div key={m.id} className="relative group">
                <img src={m.avatar} alt={m.name} title={m.name} className={`w-12 h-12 rounded-full border-2 ${m.isLeader ? 'border-yellow-400' : 'border-gray-500'} shadow`} />
                {m.isLeader && <FaCrown className="absolute -top-2 -right-2 text-yellow-400 bg-[#23273a] rounded-full p-1 w-6 h-6 border-2 border-yellow-400" title="Líder" />}
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          {team.badges.map((badge, i) => (
            <button key={i} className="relative group" onClick={() => setBadgeModal(badge)}>
              <img src={badge.src} alt={badge.name} className="w-16 h-16 rounded bg-[#23273a] border-2 border-yellow-400 shadow-lg hover:scale-110 transition" />
            </button>
          ))}
        </div>
      </div>
      {/* Modal de insignia */}
      {badgeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setBadgeModal(null)}>
          <div className="bg-[#181c24] border-2 border-yellow-400 rounded-2xl p-8 min-w-[320px] max-w-xs flex flex-col items-center gap-4 relative animate-[pop_0.3s_ease] shadow-2xl" onClick={e => e.stopPropagation()}>
            <img src={badgeModal.src} alt={badgeModal.name} className="w-24 h-24 rounded bg-[#23273a] border-2 border-yellow-400 shadow mb-2" />
            <h3 className="text-xl font-bold text-yellow-300 mb-1">{badgeModal.name}</h3>
            <div className="text-white text-center mb-2">{badgeModal.desc}</div>
            <button className="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700" onClick={() => setBadgeModal(null)}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team; 