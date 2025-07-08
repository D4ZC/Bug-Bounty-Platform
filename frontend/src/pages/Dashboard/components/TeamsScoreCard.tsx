import React from 'react';
import { Tile } from '@carbon/react';

interface Team {
  name: string;
  score: number;
}

const TeamsScoreCard: React.FC<{ teams: Team[] }> = ({ teams }) => (
  <Tile className="col-span-1 flex flex-col gap-2 min-h-[200px] bg-white border border-gray-200 rounded-xl shadow-sm">
    <h2 className="text-2xl font-bold text-primary-700">Teams Score</h2>
    <div className="font-bold text-primary-500">Top 3 Teams</div>
    <ol className="mt-2">
      {teams.map((team, idx) => (
        <li key={team.name} className="flex justify-between text-gray-700">
          <span>{idx + 1}. {team.name}</span>
          <span className="font-semibold">{team.score} pts</span>
        </li>
      ))}
    </ol>
  </Tile>
);

export default TeamsScoreCard; 