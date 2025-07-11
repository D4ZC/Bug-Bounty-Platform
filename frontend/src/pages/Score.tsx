import React, { useState } from 'react';
import { teams, users, getTopTeams, getTopUsers } from '@/data/usersData';

// Mock insignias
const mockBadges = [
  { id: 1, name: 'Top Hunter', icon: '🏆' },
  { id: 2, name: 'BluePoints', icon: '💎' },
  { id: 3, name: 'MVP', icon: '⭐' },
];

type ProfileType = 'user' | 'team';
interface ProfileHoverModalProps {
  profile: any;
  type: ProfileType;
  position: { top: number; left: number };
  onClose: () => void;
}

const ProfileHoverModal: React.FC<ProfileHoverModalProps> = ({ profile, type, position, onClose }) => {
  if (!profile) return null;
  return (
    <div
      className="absolute z-50 bg-white border border-gray-300 rounded-xl shadow-lg p-4 min-w-[220px] min-h-[120px] flex flex-col items-center"
      style={{ top: position.top, left: position.left }}
      onMouseLeave={onClose}
    >
      {/* Avatar con marco */}
      <div className="w-16 h-16 rounded-full border-4 border-blue-400 flex items-center justify-center mb-2 bg-gray-100 text-2xl font-bold">
        {profile.avatar || profile.name[0]}
      </div>
      {/* Insignias */}
      <div className="flex gap-2 mb-2">
        {mockBadges.map(badge => (
          <span key={badge.id} title={badge.name} className="text-xl">{badge.icon}</span>
        ))}
      </div>
      {/* Estadísticas */}
      <div className="text-xs text-gray-700 text-center">
        {type === 'user' ? (
          <>
            <div><b>Puntos:</b> {profile.score}</div>
            <div><b>Vulnerabilidades resueltas:</b> {profile.vulns || 12}</div>
            <div><b>Documentación enviada:</b> {profile.docs || 5}</div>
          </>
        ) : (
          <>
            <div><b>Puntos:</b> {profile.score}</div>
            <div><b>Miembros:</b> {profile.members}</div>
            <div><b>Ranking:</b> {profile.rank || 1}</div>
          </>
        )}
      </div>
    </div>
  );
};

const tableHeight = 'max-h-[500px]';

const Score: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'teams' | 'user'>('teams');
  const [hoveredProfile, setHoveredProfile] = useState<any>(null);
  const [hoverType, setHoverType] = useState<ProfileType | null>(null);
  const [modalPos, setModalPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [showModal, setShowModal] = useState(false);
  let leaveTimeout: NodeJS.Timeout;

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLSpanElement>,
    profile: any,
    type: ProfileType
  ) => {
    clearTimeout(leaveTimeout);
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const modalWidth = 240;
    const modalHeight = 160;
    let left = rect.right + window.scrollX + 8;
    let top = rect.top + window.scrollY - modalHeight - 8;
    // Si no cabe arriba, la pongo abajo
    if (top < 0) {
      top = rect.bottom + window.scrollY + 8;
    }
    // Si no cabe a la derecha, la pongo a la izquierda
    if (left + modalWidth > window.innerWidth) {
      left = rect.left + window.scrollX - modalWidth - 8;
    }
    // Si no cabe a la izquierda, la ajusto al borde izquierdo
    if (left < 0) left = 8;
    // Si no cabe abajo, la ajusto al borde inferior
    if (top + modalHeight > window.innerHeight) {
      top = window.innerHeight - modalHeight - 8;
    }
    setModalPos({ top, left });
    setHoveredProfile(profile);
    setHoverType(type);
    setShowModal(true);
  };
  const handleMouseLeave = () => {
    leaveTimeout = setTimeout(() => {
      setShowModal(false);
      setHoveredProfile(null);
      setHoverType(null);
    }, 100);
  };
  const handleModalEnter = () => {
    clearTimeout(leaveTimeout);
    setShowModal(true);
  };
  const handleModalLeave = () => {
    setShowModal(false);
    setHoveredProfile(null);
    setHoverType(null);
  };

  return (
    <div className="score-page w-full h-full relative">
      <div className="flex items-center gap-4 mb-6 mt-0 ml-0">
        <button
          onClick={() => setActiveTab('teams')}
          className={`text-2xl font-semibold focus:outline-none ${activeTab === 'teams' ? 'text-blue-700' : 'text-gray-400'}`}
        >
          Score Teams
        </button>
        <span className="text-2xl font-semibold text-gray-400">|</span>
        <button
          onClick={() => setActiveTab('user')}
          className={`text-2xl font-semibold focus:outline-none ${activeTab === 'user' ? 'text-blue-700' : 'text-gray-400'}`}
        >
          Score User
        </button>
      </div>
      <div className="w-full flex justify-center">
        {activeTab === 'teams' && (
          <div className="overflow-x-auto w-full max-w-7xl mx-auto rounded-xl">
            <div className={`overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 rounded-xl ${tableHeight}`}>
              <table className="w-full bg-white rounded-xl shadow">
                <thead>
                  <tr>
                    <th className="py-2 px-4 text-left">Posición</th>
                    <th className="py-2 px-4 text-left">Equipo</th>
                    <th className="py-2 px-4 text-right">Puntuación</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.slice(0, 5).map((team, idx) => (
                    <tr key={team.name} className="border-t">
                      <td className="py-2 px-4">{idx + 1}</td>
                      <td className="py-2 px-4">
                        <span
                          className="cursor-pointer hover:underline"
                          onMouseEnter={e => handleMouseEnter(e, team, 'team')}
                          onMouseLeave={handleMouseLeave}
                        >
                          {team.name}
                        </span>
                      </td>
                      <td className="py-2 px-4 text-right font-bold">{team.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeTab === 'user' && (
          <div className="overflow-x-auto w-full max-w-7xl mx-auto rounded-xl bg-white shadow">
            <table className="w-full rounded-xl">
              <thead className="bg-white sticky top-0 z-10">
                <tr>
                  <th className="py-2 px-4 text-left">Posición</th>
                  <th className="py-2 px-4 text-left">Usuario</th>
                  <th className="py-2 px-4 text-right">Puntuación</th>
                </tr>
              </thead>
            </table>
            <div className={`overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 rounded-b-xl ${tableHeight}`}>
              <table className="w-full">
                <tbody>
                  {users.map((user, idx) => (
                    <tr key={user.name} className="border-t">
                      <td className="py-2 px-4">{idx + 1}</td>
                      <td className="py-2 px-4">
                        <span
                          className="cursor-pointer hover:underline"
                          onMouseEnter={e => handleMouseEnter(e, user, 'user')}
                          onMouseLeave={handleMouseLeave}
                        >
                          {user.name}
                        </span>
                      </td>
                      <td className="py-2 px-4 text-right font-bold">{user.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* Modal de perfil resumido */}
        {hoveredProfile && showModal && (
          <div
            onMouseEnter={handleModalEnter}
            onMouseLeave={handleModalLeave}
          >
            <ProfileHoverModal
              profile={hoveredProfile}
              type={hoverType || 'user'}
              position={modalPos}
              onClose={handleModalLeave}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Score; 