import React from 'react';
import { Tile } from '@carbon/react';
import { Trophy } from '@carbon/icons-react';

const MVPTeamCard: React.FC<{ team: string }> = ({ team }) => (
  <Tile className="col-span-1 flex flex-col items-center justify-center gap-4 min-h-[200px] bg-white border border-yellow-300 rounded-2xl shadow-lg p-6 animate-fade-in">
    <div className="flex flex-col items-center gap-2">
      <Trophy size={48} className="text-yellow-400 drop-shadow" />
      <span className="text-2xl font-bold text-yellow-700">{team}</span>
      <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold text-sm mt-2">MVP Team</span>
    </div>
  </Tile>
);

export default MVPTeamCard; 