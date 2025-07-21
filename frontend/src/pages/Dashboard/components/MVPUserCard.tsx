import React from 'react';
import { Tile } from '@carbon/react';
import { UserAvatar, Trophy } from '@carbon/icons-react';

interface MVPUser {
  name: string;
  img: string;
  stats: any;
}

const MVPUserCard: React.FC<{ user?: MVPUser }> = ({ user }) => (
  <Tile className="col-span-1 flex flex-col items-center justify-center gap-4 min-h-[200px] bg-white border border-yellow-300 rounded-2xl shadow-lg p-6 animate-fade-in">
    <div className="flex flex-col items-center gap-2">
      <Trophy size={48} className="text-yellow-400 drop-shadow" />
      <div className="flex flex-col items-center gap-1">
        <UserAvatar size={56} className="text-gray-400 bg-gray-100 rounded-full p-1 shadow" />
        <span className="text-2xl font-bold text-yellow-700 mt-2">{user && user.name ? user.name : <span className="text-gray-500 font-medium">Aún sin definir</span>}</span>
        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold text-sm mt-2">MVP User</span>
      </div>
    </div>
  </Tile>
);

export default MVPUserCard; 