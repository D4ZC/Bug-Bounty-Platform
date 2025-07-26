import React from 'react';
import { Tile } from '@carbon/react';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  name: string;
  img: string;
  stats: {
    criticas: number;
    altas: number;
    medianas: number;
    bajas: number;
    total: number;
  };
}

const UserProfileCard: React.FC<{ user: UserProfile }> = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="col-span-1 flex flex-col items-start min-h-[160px] p-6 bg-white rounded-lg border-2 border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200" onClick={() => navigate('/resolved-vulnerabilities')}>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">{user.name}</h2>
      <div className="text-sm mb-2 text-gray-700">
        Vulnerabilidades solucionadas: {user.stats.total}<br />
        Críticas: {user.stats.criticas} | Altas: {user.stats.altas} | Medianas: {user.stats.medianas} | Bajas: {user.stats.bajas}
      </div>
    </div>
  );
};

export default UserProfileCard; 