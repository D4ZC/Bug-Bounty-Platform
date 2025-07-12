import React, { useEffect, useState } from 'react';
import { getUsers, getAchievementsByUser } from '../../localDb';
import Modal from '../ui/Modal';

interface RankingUser {
  name: string;
  avatar: string;
  points: number;
  rank: number;
}

const WeeklyRanking: React.FC = () => {
  const [ranking, setRanking] = useState<RankingUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    // Obtener ranking real de usuarios
    const users = getUsers();
    const sortedUsers = users
      .sort((a, b) => b.points - a.points)
      .slice(0, 5)
      .map((user, index) => ({
        id: user.id,
        name: user.username,
        avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.username}`,
        points: user.points,
        rank: index + 1,
      }));
    setRanking(sortedUsers);
  }, []);

  // Handler para mostrar modal de perfil
  const handleProfileClick = (user: any) => {
    const level = Math.floor(user.points / 1000) + 1;
    const achievements = getAchievementsByUser ? getAchievementsByUser(user.id) : [];
    setSelectedUser({
      ...user,
      level,
      bio: 'Sin biografía disponible',
      achievements,
    });
    setShowProfileModal(true);
  };
  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
    setSelectedUser(null);
  };

  const medalColors = [
    'from-yellow-400 to-yellow-200', // Oro
    'from-gray-400 to-gray-200',     // Plata
    'from-orange-500 to-yellow-300', // Bronce
  ];

  return (
    <div className="bg-black/60 rounded-3xl border-2 border-cyan-400 neon-shadow p-8 max-w-xl mx-auto shadow-cyber">
      <h2 className="text-3xl font-extrabold neon-text mb-6 text-center tracking-widest">Ranking Semanal</h2>
      <ol className="space-y-4">
        {ranking.map((user, idx) => (
          <li
            key={user.name}
            className={`flex items-center gap-4 p-4 rounded-2xl transition-transform ${
              idx < 3
                ? `bg-gradient-to-r ${medalColors[idx]} shadow-cyber scale-105 animate-pulse`
                : 'bg-gray-900/60'
            }`}
          >
            <span className={`text-3xl font-extrabold w-8 text-center ${idx === 0 ? 'text-yellow-300' : idx === 1 ? 'text-gray-300' : idx === 2 ? 'text-orange-300' : 'text-cyan-200'}`}>{user.rank}</span>
            <img
              src={user.avatar}
              alt={user.name}
              className={`w-14 h-14 rounded-full border-4 cursor-pointer hover:scale-110 transition-all duration-200 ${
                idx === 0
                  ? 'border-yellow-300'
                  : idx === 1
                  ? 'border-gray-300'
                  : idx === 2
                  ? 'border-orange-300'
                  : 'border-cyan-400'
              } shadow-cyber bg-black`}
              onClick={() => handleProfileClick(user)}
            />
            <span className="font-bold text-lg text-cyan-100 flex-1">{user.name}</span>
            <span className="font-mono text-xl text-pink-300">{user.points} pts</span>
            {idx < 3 && (
              <span className="ml-2 text-2xl animate-bounce">
                {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
              </span>
            )}
          </li>
        ))}
      </ol>
      {/* Modal de Perfil de Usuario */}
      <Modal
        isOpen={showProfileModal}
        onClose={handleCloseProfileModal}
        title={selectedUser ? `Perfil de ${selectedUser.name}` : ''}
      >
        {selectedUser && (
          <div className="flex flex-col items-center gap-4">
            <img src={selectedUser.avatar} alt={selectedUser.name} className="w-24 h-24 rounded-full border-4 border-cyan-400 neon-shadow mb-2" />
            <div className="text-2xl font-bold text-cyan-200">{selectedUser.name}</div>
            <div className="flex gap-4 text-lg">
              <span className="text-yellow-300">💎 {selectedUser.points} pts</span>
              <span className="text-cyan-300">🏅 Nivel {selectedUser.level}</span>
            </div>
            <div className="text-cyan-100 text-center italic text-base mb-2">{selectedUser.bio}</div>
            {/* Logros recientes si existen */}
            {selectedUser.achievements && selectedUser.achievements.length > 0 && (
              <div className="w-full">
                <div className="text-cyan-200 font-bold mb-2 text-center">Logros recientes</div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {selectedUser.achievements.slice(-5).map((ach: any) => (
                    <div key={ach.id} className="bg-cyan-900/60 border border-cyan-400 rounded-lg px-3 py-1 text-cyan-100 text-sm flex items-center gap-2">
                      <span className="text-lg">{ach.icon || '🏆'}</span> {ach.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button
              onClick={handleCloseProfileModal}
              className="mt-4 bg-cyan-600 text-white font-bold px-6 py-2 rounded-full hover:bg-cyan-700 transition"
            >
              Cerrar
            </button>
          </div>
        )}
      </Modal>
      <style>{`
        .neon-text {
          color: #ff00ea;
          text-shadow: 0 0 8px #ff00ea, 0 0 16px #00fff7, 0 0 32px #00fff7;
        }
        .shadow-cyber {
          box-shadow: 0 0 16px 2px #00fff7, 0 0 32px 4px #a78bfa;
        }
        .neon-shadow {
          box-shadow: 0 0 16px 2px #ff00ea, 0 0 32px 4px #00fff7, 0 0 8px #fff0;
        }
      `}</style>
    </div>
  );
};

export default WeeklyRanking; 