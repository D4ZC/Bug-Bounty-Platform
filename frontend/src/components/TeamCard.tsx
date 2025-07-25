import React from 'react';

interface Team {
  id: string;
  name: string;
  description: string;
  members: string[];
  stats: { puntos: number; retos: number; vulnerabilidades: number };
}

interface TeamCardProps {
  team: Team;
  expanded: boolean;
  onExpand: () => void;
  ranking: number;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, expanded, onExpand, ranking }) => {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl shadow-sm p-6 transition-all duration-200 ${expanded ? 'shadow-lg' : ''} cursor-pointer`}
      onClick={onExpand}
      tabIndex={0}
      role="button"
      aria-expanded={expanded}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-gray-400">#{ranking}</span>
          <span className="text-xl font-bold text-gray-800">{team.name}</span>
        </div>
        {!expanded && (
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-2xl font-bold">...</span>
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-100">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </span>
          </div>
        )}
      </div>
      <div className="text-gray-500 text-sm mt-1">{team.description}</div>
      {expanded && (
        <div className="mt-4 border-t pt-4">
          <div className="mb-2">
            <span className="font-semibold text-gray-700">ID:</span> {team.id}
          </div>
          <div className="mb-2">
            <span className="font-semibold text-gray-700">Puntaje:</span> {team.stats.puntos}
          </div>
          <div className="mb-2">
            <span className="font-semibold text-gray-700">Retos completados:</span> {team.stats.retos}
          </div>
          <div className="mb-2">
            <span className="font-semibold text-gray-700">Integrantes:</span>
            <ul className="ml-4 list-disc text-gray-600">
              {team.members.map(id => (
                <li key={id}>{id}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamCard; 