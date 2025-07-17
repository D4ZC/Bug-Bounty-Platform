import React from 'react';

interface Team {
  name: string;
  score: number;
}

const TeamsScoreCard: React.FC<{ teams: Team[] }> = ({ teams }) => (
  <div className="col-span-1 flex flex-col gap-2 min-h-[200px] bg-gradient-to-br from-black to-[#0ff0fc] border-2 border-[#00fff7] rounded-2xl p-6 font-mono text-[#00fff7] mx-auto w-full max-w-md">
    <h2 className="text-2xl font-bold mb-2">Teams Score</h2>
    <div className="font-bold mb-4">Top 3 Teams</div>
    <ol className="mt-2 space-y-1">
      {teams.map((team, idx) => (
        <li key={team.name} className="flex justify-between">
          <span>{idx + 1}. {team.name}</span>
          <span className="font-bold">{team.score} pts</span>
        </li>
      ))}
    </ol>
  </div>
);

export default TeamsScoreCard; 