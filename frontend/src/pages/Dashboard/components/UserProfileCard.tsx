import React from 'react';
import { Tile } from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import { User } from '@/data/usersData';

const UserProfileCard: React.FC<{ user: User }> = ({ user }) => {
  const navigate = useNavigate();
  return (
    <Tile className="col-span-1 flex flex-col items-start min-h-[200px] p-4 bg-white border border-gray-200 rounded-xl shadow-sm cursor-pointer"
      onClick={() => navigate('/profile')}
    >
      <h2 className="text-2xl font-bold text-primary-700 mb-2">{user.name}</h2>
      <div className="text-sm mb-2 text-primary-600">
        Puntuación: {user.score}<br />
        Equipo: {user.team}
      </div>
      {/* Nuevo container para avatar */}
      <div className="flex items-center justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-gray-200 border-2 border-blue-400 flex items-center justify-center overflow-hidden">
          {user.avatar && (user.avatar.startsWith('http') || user.avatar.startsWith('blob:')) ? (
            <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl font-bold text-gray-600">{user.avatar ? user.avatar : user.name[0]}</span>
          )}
        </div>
      </div>
    </Tile>
  );
}

export default UserProfileCard; 