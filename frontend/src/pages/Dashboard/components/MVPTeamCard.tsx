import React from 'react';
import { Tile } from '@carbon/react';

const MVPTeamCard: React.FC<{ team: string }> = ({ team }) => (
  <Tile className="col-span-1 flex flex-col items-center justify-center min-h-[200px] bg-[#282828] border border-gray-700 rounded-xl shadow-lg">
    <h2 className="text-2xl font-bold text-purple-400 mb-2">MVP Team</h2>
    <div className="text-3xl font-bold text-yellow-400 mb-4">{team}</div>
    {/* Imagen del equipo */}
    <img 
      src="/src/assets/avatar4.png" 
      alt="MVP Team" 
      className="w-16 h-16 rounded-full border-2 border-yellow-400 shadow-lg"
    />
  </Tile>
);

export default MVPTeamCard; 