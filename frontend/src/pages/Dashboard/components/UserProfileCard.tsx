import React from 'react';
import { Tile } from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import { User } from '@/data/usersData';
import { FaCrown, FaMedal, FaBug, FaTrophy, FaFileAlt, FaUsers } from 'react-icons/fa';

const UserProfileCard: React.FC<{ user: User }> = ({ user }) => {
  const navigate = useNavigate();
  // Mock insignias y stats para demo visual
  const badges = [
    { id: 1, name: 'Top 1', icon: <FaCrown size={20} className="text-yellow-400" /> },
    { id: 2, name: 'Hacker', icon: <FaMedal size={20} className="text-purple-400" /> },
    { id: 3, name: 'Veterano', icon: <FaMedal size={20} className="text-blue-400" /> },
  ];
  // Datos relacionales simulados (ajusta si tienes acceso a radar, duels, etc.)
  const radar = [
    { subject: 'Vulns', A: 55 },
    { subject: 'Docs', A: 20 },
    { subject: 'Reportes', A: 51 },
    { subject: 'Bugs', A: 30 },
    { subject: 'Duelos', A: 40 },
  ];
  // Duelos ganados (simulado)
  const duelsWon = 6; // Si tienes acceso a user.duels, usa: user.duels.filter(d => d.result === 'Ganado').length
  const vulns = radar.find(r => r.subject === 'Vulns')?.A || 0;
  const bugs = radar.find(r => r.subject === 'Bugs')?.A || 0;
  const docs = radar.find(r => r.subject === 'Docs')?.A || 0;
  const maxVulns = 100, maxDuels = 100, maxBugs = 100, maxDocs = 100;
  const effectiveness = Math.round(((vulns / maxVulns) + (duelsWon / maxDuels) + (bugs / maxBugs) + (docs / maxDocs)) / 4 * 100);
  const stats = [
    { label: 'Puntos', value: user.score, icon: <FaTrophy className="text-yellow-500" /> },
    { label: 'Ranking', value: `#${user.rank || 1}`, icon: <FaCrown className="text-yellow-400" /> },
    { label: 'Equipo', value: user.team || '-', icon: <FaUsers className="text-blue-500" /> },
    { label: 'Vulns', value: vulns, icon: <FaBug className="text-red-400" /> },
    { label: 'Reportes', value: radar.find(r => r.subject === 'Reportes')?.A || 0, icon: <FaFileAlt className="text-green-500" /> },
    { label: 'Duelos', value: duelsWon, icon: <FaTrophy className="text-purple-500" /> },
    { label: 'Efectividad', value: `${effectiveness}%`, icon: <FaMedal className="text-indigo-400" /> },
  ];
  return (
    <Tile
      className="col-span-1 flex flex-col items-center min-h-[280px] p-6 bg-white border border-gray-200 rounded-xl shadow-sm cursor-pointer hover:scale-[1.02] transition-transform"
      onClick={() => navigate('/profile')}
    >
      {/* Avatar grande */}
      <div className="w-24 h-24 rounded-full border-4 border-blue-400 shadow-lg flex items-center justify-center overflow-hidden mb-2 bg-white">
        {user.avatar && (user.avatar.startsWith('http') || user.avatar.startsWith('blob:')) ? (
          <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
        ) : (
          <span className="text-4xl font-bold text-blue-600">{user.avatar ? user.avatar : user.name[0]}</span>
        )}
      </div>
      {/* Nombre y equipo */}
      <div className="text-2xl font-extrabold text-blue-900 text-center mb-3">{user.name}</div>
      {/* Insignias */}
      <div className="flex gap-2 mb-3">
        {badges.map(badge => (
          <span key={badge.id} title={badge.name}>{badge.icon}</span>
        ))}
      </div>
      {/* Stats resumen visual */}
      <div className="grid grid-cols-2 gap-3 w-full mt-2">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex items-center gap-2 bg-white/80 rounded-lg px-3 py-2 shadow text-sm font-medium">
            {stat.icon}
            <span className="text-gray-700">{stat.label}:</span>
            <span className="font-bold text-blue-900">{stat.value}</span>
          </div>
        ))}
      </div>
    </Tile>
  );
}

export default UserProfileCard; 