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

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLSpanElement>,
    profile: any
  ) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setModalPos({ top: rect.top + window.scrollY - 10, left: rect.right + window.scrollX + 10 });
    setHoveredProfile(profile);
  };
  const handleMouseLeave = () => {
    setHoveredProfile(null);
  };

  return (
    <Tile className="col-span-1 flex flex-col gap-2 min-h-[200px] bg-white border border-gray-200 rounded-xl shadow-sm relative">
      <h2 className="text-2xl font-bold text-primary-700">User Score</h2>
      <div className="font-bold text-primary-500">Top 3 Users</div>
      <ol className="mt-2">
        {users.map((user, idx) => (
          <li key={user.name} className="flex justify-between text-gray-700">
            <span>
              {idx + 1}.{' '}
              <span
                className="cursor-pointer hover:underline"
                onMouseEnter={e => handleMouseEnter(e, user)}
                onMouseLeave={handleMouseLeave}
              >
                {user.name}
              </span>
            </span>
            <span className="font-semibold">{user.score} pts</span>
          </li>
        ))}
      </ol>
      {/* Modal de perfil resumido */}
      {hoveredProfile && (
        <ProfileHoverModal
          profile={hoveredProfile}
          type="user"
          position={modalPos}
          onClose={handleMouseLeave}
        />
      )}
    </Tile>
  );
};

export default UserScoreCard; 