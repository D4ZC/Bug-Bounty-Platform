import React from 'react';
import { Tile } from '@carbon/react';

interface GulagUser {
  name: string;
  score: number;
}

const GulagCard: React.FC<{ gulag: GulagUser[] }> = ({ gulag }) => (
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col items-center justify-center min-h-[250px]">
    <h2 className="text-xl font-bold text-gray-700 text-center">PERFIL</h2>
  </div>
);

export default GulagCard; 