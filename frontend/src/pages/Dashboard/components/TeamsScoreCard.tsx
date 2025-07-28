import React from 'react';
import { Tile } from '@carbon/react';

interface Team {
  name: string;
  score: number;
}

const TeamsScoreCard: React.FC<{ teams: Team[] }> = ({ teams }) => {
  const teamAvatars = ['/src/assets/avatar11.png', '/src/assets/avatar12.png', '/src/assets/avatar13.png'];
  
  return (
    <Tile className="col-span-1 flex flex-col gap-2 min-h-[200px] bg-[#282828] border border-gray-700 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-purple-400">Teams Score</h2>
      <div className="font-bold text-purple-300">Top 3 Teams</div>
      <ol className="mt-2">
        {teams.map((team, idx) => (
          <li key={team.name} className="flex items-center justify-between text-gray-200 mb-2">
            <div className="flex items-center gap-2">
              <img 
                src={teamAvatars[idx] || '/src/assets/avatar1.png'} 
                alt={team.name} 
                className="w-8 h-8 rounded-full border border-purple-400"
              />
              <span>{idx + 1}. {team.name}</span>
            </div>
            <span className="font-semibold text-yellow-400">{team.score} pts</span>
          </li>
        ))}
      </ol>
    </Tile>
  );
};

export default TeamsScoreCard; 