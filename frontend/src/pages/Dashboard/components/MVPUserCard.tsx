import React from 'react';
import { Tile } from '@carbon/react';
import { User } from '@/data/usersData';

const MVPUserCard: React.FC<{ user: User }> = ({ user }) => (
  <Tile className="col-span-1 flex flex-col items-center justify-center min-h-[200px] bg-white border border-gray-200 rounded-xl shadow-sm">
    <h2 className="text-2xl font-bold text-primary-700 mb-2">MVP User</h2>
    <div className="mb-2 text-primary-500">{user.name}</div>
    {/* Avatar */}
    <div className="w-16 h-16 bg-gray-300 rounded-full mb-2 flex items-center justify-center text-2xl font-bold">
      {user.avatar ? user.avatar : user.name[0]}
    </div>
    {/* Placeholder de pedestal */}
    <div className="w-24 h-12 bg-yellow-300 rounded-b-full shadow-inner" />
  </Tile>
);

export default MVPUserCard; 