import React from 'react';
import { Tile } from '@carbon/react';

interface MVPUser {
  name: string;
  img: string;
  stats: any;
}

const MVPUserCard: React.FC<{ user: MVPUser }> = ({ user }) => (
  <Tile className="col-span-1 flex flex-col items-center justify-center min-h-[200px] bg-[#282828] border border-gray-700 rounded-xl shadow-lg">
    <h2 className="text-2xl font-bold text-purple-400 mb-2">MVP User</h2>
    <div className="mb-2 text-purple-300">Top 3 Teams</div>
    {/* Imagen de usuario */}
    <img 
      src="/src/assets/avatar6.png" 
      alt="MVP User" 
      className="w-16 h-16 rounded-full border-2 border-purple-400 shadow-lg mb-2"
    />
    {/* Placeholder de pedestal */}
    <div className="w-24 h-12 bg-yellow-500 rounded-b-full shadow-inner" />
  </Tile>
);

export default MVPUserCard; 