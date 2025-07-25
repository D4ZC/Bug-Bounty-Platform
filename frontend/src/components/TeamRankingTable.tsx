import React, { useState } from 'react';

interface Team {
  id: string;
  name: string;
  description: string;
  members: string[];
  stats: { puntos: number; retos: number; vulnerabilidades: number };
}

interface TeamRankingTableProps {
  teams: Team[];
}

function getAvatarProps(name: string) {
  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-gray-500', 'bg-indigo-500', 'bg-teal-500', 'bg-purple-500', 'bg-pink-500',
  ];
  const color = colors[name.charCodeAt(0) % colors.length];
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return { color, initials };
}

// Mock de equipos si no hay suficientes
const DEFAULT_TEAMS = [
  {
    id: 'TEAM-001',
    name: 'P-TECH',
    description: 'Equipo de tecnología y desarrollo.',
    members: ['Sophie Müller', 'Liam Smith', 'Emma Johnson', 'Noah Williams', 'Olivia Brown'],
    stats: { puntos: 3200, retos: 25, vulnerabilidades: 88 },
  },
  {
    id: 'TEAM-002',
    name: 'Data',
    description: 'Equipo de análisis de datos.',
    members: ['Elena García', 'Lucas Martin', 'Mia Lee', 'Ethan Kim', 'Ava Chen'],
    stats: { puntos: 2950, retos: 22, vulnerabilidades: 75 },
  },
  {
    id: 'TEAM-003',
    name: 'Apps',
    description: 'Equipo de desarrollo de aplicaciones.',
    members: ['Mateo Rossi', 'Isabella Silva', 'Leo Dubois', 'Chloe Laurent', 'Mason Clark'],
    stats: { puntos: 2780, retos: 20, vulnerabilidades: 68 },
  },
  {
    id: 'TEAM-004',
    name: 'Consulting',
    description: 'Equipo de consultoría y seguridad.',
    members: ['Alex Turner', 'Samus Aran', 'D4ZC', 'Zero Cool', 'Trinity', 'Neo', 'Ada Lovelace', 'Kevin Mitnick', 'Cyb3rW0lf', 'Rootkit'],
    stats: { puntos: 3500, retos: 30, vulnerabilidades: 99 },
  },
  {
    id: 'TEAM-005',
    name: 'CyberWolves',
    description: 'Equipo de ciberseguridad avanzada.',
    members: ['Scarlett Rivera', 'Isaac Evans', 'Penelope Murphy', 'Layla Baker', 'Owen Carter'],
    stats: { puntos: 2600, retos: 18, vulnerabilidades: 60 },
  },
];

const TeamRankingTable: React.FC<TeamRankingTableProps> = ({ teams }) => {
  // Usar los equipos recibidos o los mock si no hay suficientes
  const displayTeams = (teams && teams.length >= 5 ? teams : DEFAULT_TEAMS).slice(0, 5);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border-separate border-spacing-0 rounded-xl shadow-lg overflow-hidden" style={{ borderRadius: '16px' }}>
        <thead className="sticky top-0 z-10" style={{ backgroundColor: '#181A20' }}>
          <tr>
            <th className="px-4 py-3 text-left text-sm font-bold text-white uppercase">Puesto</th>
            <th className="px-4 py-3 text-left text-sm font-bold text-white uppercase">Equipo</th>
            <th className="px-4 py-3 text-center text-sm font-bold text-white uppercase">Vulnerabilidades</th>
            <th className="px-4 py-3 text-center"></th>
          </tr>
        </thead>
        <tbody>
          {displayTeams.map((team, idx) => {
            const color = ['bg-blue-500', 'bg-green-500', 'bg-gray-500', 'bg-indigo-500', 'bg-teal-500'][idx % 5];
            const initials = team.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
            const isExpanded = expandedId === team.id;
            return (
              <React.Fragment key={team.id}>
                <tr className={`${idx % 2 === 0 ? 'bg-white' : 'bg-[#F4F6FA]'} transition group`} style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <td className="px-4 py-3 font-semibold text-gray-900 text-center align-middle">{idx + 1}</td>
                  <td className="px-4 py-3 flex items-center gap-3 min-w-[160px] align-middle">
                    <span className={`inline-flex items-center justify-center w-9 h-9 rounded-full text-white font-bold text-base shrink-0 ${color}`}>{initials}</span>
                    <span className="truncate max-w-[120px] font-medium text-gray-800" title={team.name}>{team.name}</span>
                  </td>
                  <td className="px-4 py-3 text-center align-middle">
                    <span className="inline-flex items-center gap-1 text-lg font-extrabold text-green-600 drop-shadow-sm">
                      {team.stats.vulnerabilidades}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center align-middle cursor-pointer select-none" onClick={() => setExpandedId(isExpanded ? null : team.id)} aria-expanded={isExpanded}>
                    <div className="flex items-center justify-end gap-3">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-100">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </span>
                      <span className="inline-flex items-center justify-center w-5 h-5">
                        <svg
                          className={`w-[18px] h-[18px] text-blue-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </div>
                  </td>
                </tr>
                {isExpanded && (
                  <tr className="bg-[#F4F6FA]">
                    <td colSpan={4} className="px-6 pb-4 pt-2 rounded-b-xl">
                      <div className="text-sm text-gray-700 mb-2"><span className="font-semibold">Descripción:</span> {team.description}</div>
                      <div className="text-sm text-gray-700 mb-2"><span className="font-semibold">Puntos:</span> {team.stats.puntos}</div>
                      <div className="text-sm text-gray-700 mb-2"><span className="font-semibold">Retos completados:</span> {team.stats.retos}</div>
                      <div className="text-sm text-gray-700 mb-2"><span className="font-semibold">Miembros:</span> {team.members.join(', ')}</div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TeamRankingTable; 