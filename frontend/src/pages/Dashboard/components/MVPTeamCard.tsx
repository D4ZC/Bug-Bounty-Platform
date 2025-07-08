import React from 'react';
import { Tile } from '@carbon/react';

const MVPTeamCard: React.FC<{ team: string }> = ({ team }) => (
  <Tile className="col-span-1 flex flex-col items-center justify-center min-h-[200px] bg-white border border-gray-200 rounded-xl shadow-sm">
    <h2 className="text-2xl font-bold text-primary-700 mb-2">MVP Team</h2>
    <div className="text-3xl font-bold text-primary-600 mb-4">{team}</div>
    {/* Placeholder de pedestal */}
    <div className="w-24 h-12 bg-yellow-300 rounded-b-full shadow-inner" />
  </Tile>
);

export default MVPTeamCard; 