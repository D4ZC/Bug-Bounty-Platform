import React, { useState } from 'react';
import { users } from '@/data/usersData';

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

const tableHeight = 'max-h-[500px]';

const Gulag: React.FC = () => {
  const [hoveredProfile, setHoveredProfile] = useState<any>(null);
  const [modalPos, setModalPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  // Obtener los últimos 5 usuarios (menor puntaje) y ordenarlos de mayor a menor dentro de esos 5
  const gulagUsers = [...users]
    .sort((a, b) => a.score - b.score) // Menor a mayor
    .slice(0, 5) // Tomar los 5 con menor puntaje
    .sort((a, b) => b.score - a.score); // Ordenar esos 5 de mayor a menor

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
    <div className="gulag-page w-full h-full relative">
      <h2 className="text-2xl font-semibold mb-6">Gulag</h2>
      <div className="w-full flex justify-center">
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
                {gulagUsers.map((user, idx) => (
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
            {/* Modal de perfil resumido */}
            {hoveredProfile && (
              <ProfileHoverModal
                profile={hoveredProfile}
                type="user"
                position={modalPos}
                onClose={handleMouseLeave}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gulag; 