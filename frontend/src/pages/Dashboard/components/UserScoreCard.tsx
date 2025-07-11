import React, { useState } from 'react';
import { Tile } from '@carbon/react';

// Mock insignias
const mockBadges = [
  { id: 1, name: 'Top Hunter', icon: '🏆' },
  { id: 2, name: 'BluePoints', icon: '💎' },
  { id: 3, name: 'MVP', icon: '⭐' },
];

type ProfileType = 'user';
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
      className="fixed z-50 bg-white border border-gray-300 rounded-xl shadow-lg p-4 min-w-[220px] min-h-[120px] flex flex-col items-center"
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
        <div><b>Puntos:</b> {profile.score}</div>
        <div><b>Vulnerabilidades resueltas:</b> {profile.vulns || 12}</div>
        <div><b>Documentación enviada:</b> {profile.docs || 5}</div>
      </div>
    </div>
  );
};

const UserScoreCard: React.FC<{ users: any[] }> = ({ users }) => {
  const [hoveredProfile, setHoveredProfile] = useState<any>(null);
  const [modalPos, setModalPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [showModal, setShowModal] = useState(false);
  let leaveTimeout: NodeJS.Timeout;

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLSpanElement>,
    profile: any
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
    setShowModal(true);
  };
  const handleMouseLeave = () => {
    leaveTimeout = setTimeout(() => setShowModal(false), 100);
  };
  const handleModalEnter = () => {
    clearTimeout(leaveTimeout);
    setShowModal(true);
  };
  const handleModalLeave = () => {
    setShowModal(false);
  };

  return (
    <Tile className="col-span-1 flex flex-col gap-2 min-h-[200px] bg-white border border-gray-200 rounded-xl shadow-sm relative">
      <h2 className="text-2xl font-bold text-primary-700 pt-4 pl-4">User Score</h2>
      <div className="font-bold text-primary-500 pl-4 pb-2">Top 3 Users</div>
      <div className="overflow-x-auto w-full rounded-xl">
        <table className="w-full bg-white rounded-xl shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">Posición</th>
              <th className="py-2 px-4 text-left">Usuario</th>
              <th className="py-2 px-4 text-right">Puntuación</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.name} className="border-t">
                <td className="py-2 px-4">{idx + 1}</td>
                <td className="py-2 px-4">
                  <span
                    className="cursor-pointer hover:underline"
                    onMouseEnter={e => handleMouseEnter(e, user)}
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
      {/* Modal de perfil resumido */}
      {hoveredProfile && showModal && (
        <div
          onMouseEnter={handleModalEnter}
          onMouseLeave={handleModalLeave}
        >
          <ProfileHoverModal
            profile={hoveredProfile}
            type="user"
            position={modalPos}
            onClose={handleModalLeave}
          />
        </div>
      )}
    </Tile>
  );
};

export default UserScoreCard; 