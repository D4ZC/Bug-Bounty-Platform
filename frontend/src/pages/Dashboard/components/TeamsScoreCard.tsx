import React from 'react';
import { Tile } from '@carbon/react';
import { Trophy } from '@carbon/icons-react';

interface Team {
  name: string;
  score: number;
}

const medalColors = [
  'bg-yellow-300 text-yellow-900', // Oro
  'bg-gray-300 text-gray-700',    // Plata
  'bg-orange-400 text-white',     // Bronce
];
const medalEmojis = ['🥇', '🥈', '🥉'];

const TeamsScoreCard: React.FC<{ teams: Team[] }> = ({ teams }) => (
  <Tile className="col-span-1 flex flex-col gap-2 min-h-[200px] bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-2 border-purple-500 rounded-2xl shadow-2xl p-5 animate-fade-in">
    <div className="flex items-center gap-2 mb-0.5">
      <Trophy className="text-yellow-400" size={24} />
      <span className="font-bold text-lg text-white">Teams Score</span>
    </div>
    <ol className="flex flex-col gap-2 mt-0.5">
      {teams.map((team, idx) => (
        <li key={team.name} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-lg text-sm font-bold ${medalColors[idx] || 'bg-gray-100 text-gray-500'}`}>{medalEmojis[idx] || idx + 1}</span>
            <span className="font-semibold text-gray-300">{team.name}</span>
          </div>
          <span className="font-mono text-purple-400">{team.score} pts</span>
        </li>
      ))}
    </ol>
  </Tile>
);

export default TeamsScoreCard; 