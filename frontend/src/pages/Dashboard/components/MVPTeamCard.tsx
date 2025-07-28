import React from 'react';
import { Tile } from '@carbon/react';
import { Trophy } from '@carbon/icons-react';

const MVPTeamCard: React.FC<{ team: string }> = ({ team }) => (
  <Tile className="col-span-1 flex flex-col items-center justify-center gap-4 min-h-[200px] bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-2 border-purple-500 rounded-2xl shadow-2xl p-6 animate-fade-in">
    <div className="flex flex-col items-center gap-2">
      <Trophy size={48} className="text-yellow-400 drop-shadow" />
      <span className="text-2xl font-bold text-white">{team}</span>
      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-sm mt-2">MVP Team</span>
    </div>
  </Tile>
);

export default MVPTeamCard; 