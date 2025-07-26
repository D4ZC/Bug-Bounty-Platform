import React from 'react';
import { Tile } from '@carbon/react';
import { useNavigate } from 'react-router-dom';

const MVPTeamCard: React.FC<{ team: string }> = ({ team }) => {
  const navigate = useNavigate();
  return (
    <div className="col-span-1 flex flex-col items-center justify-center min-h-[160px] bg-white p-6 rounded-lg border-2 border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200" onClick={() => navigate('/team')}>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">MVP Team</h2>
      <div className="text-2xl font-bold text-primary-700">{team}</div>
    </div>
  );
};

export default MVPTeamCard; 