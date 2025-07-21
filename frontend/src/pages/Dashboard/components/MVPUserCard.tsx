import React from 'react';
import { Tile } from '@carbon/react';
import { User } from '@/data/usersData';

const MVPUserCard: React.FC<{ user: User }> = ({ user }) => (
  <Tile className="col-span-1 flex flex-col items-center justify-center min-h-[200px] bg-white border border-gray-200 rounded-xl shadow-sm">
    <h2 className="text-4xl font-extrabold text-primary-700 mb-2">MVP User</h2>
    <div className="mb-2 text-primary-500">{user.name}</div>
    {/* Avatar con marco */}
    <div className="relative w-32 h-32 flex items-center justify-center mb-2">
      {/* Círculo azul */}
      <div className="absolute left-1/2 top-1/2 w-24 h-24 rounded-full border-4 border-blue-400 shadow-lg flex items-center justify-center overflow-hidden bg-white z-10 -translate-x-1/2 -translate-y-1/2">
        {user.avatar && typeof user.avatar === 'string' && (user.avatar.startsWith('http') || user.avatar.startsWith('blob:')) ? (
          <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
        ) : (
          <span className="text-4xl font-bold text-blue-600">{user.name ? user.name[0] : '?'}</span>
        )}
      </div>
      {/* Marco por encima y más grande */}
      {user.frame && (
        <img src={user.frame} alt="marco" className="absolute left-1/2 top-1/2 w-[120%] h-[120%] object-cover pointer-events-none z-30 -translate-x-1/2 -translate-y-1/2" />
      )}
    </div>
    {/* Placeholder de pedestal */}
    <div className="w-24 h-12 bg-yellow-300 rounded-b-full shadow-inner" />
  </Tile>
);

export default MVPUserCard; 