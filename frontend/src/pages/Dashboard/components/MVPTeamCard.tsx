import React from 'react';
import { Tile } from '@carbon/react';

const MVPTeamCard: React.FC<{ team: string }> = ({ team }) => (
  <Tile className="col-span-1 flex flex-col items-center justify-center min-h-[200px] bg-[#282828] border border-gray-700 rounded-xl shadow-lg">
    <h2 className="text-2xl font-bold text-purple-400 mb-2">MVP Team</h2>
    <div className="text-3xl font-bold text-yellow-400 mb-4">{team}</div>
    {/* Placeholder de pedestal */}
    <div className="w-24 h-12 bg-yellow-500 rounded-b-full shadow-inner" />
  </Tile>
);

export default MVPTeamCard; 