import React from 'react';
import { Tile } from '@carbon/react';
import { UserAvatar, Trophy } from '@carbon/icons-react';

interface MVPUser {
  name: string;
  img: string;
  stats: any;
}

const MVPUserCard: React.FC<{ user?: MVPUser }> = ({ user }) => (
  <Tile className="col-span-1 flex flex-col items-center justify-center gap-4 min-h-[200px] bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-2 border-purple-500 rounded-2xl shadow-2xl p-6 animate-fade-in">
    <div className="flex flex-col items-center gap-2">
      <Trophy size={48} className="text-yellow-400 drop-shadow" />
      <div className="flex flex-col items-center gap-1">
        <UserAvatar size={56} className="text-gray-400 bg-gray-100 rounded-full p-1 shadow" />
        <span className="text-2xl font-bold text-white mt-2">{user && user.name ? user.name : <span className="text-gray-400 font-medium">Aún sin definir</span>}</span>
        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-sm mt-2">MVP User</span>
      </div>
    </div>
  </Tile>
);

export default MVPUserCard; 