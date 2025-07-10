import React, { useState, useRef, useEffect } from 'react';
import TeamCard from '../components/TeamCard';

const mockTeams = [
  {
    id: 'T001',
    name: 'P-TECH',
    description: 'Equipo líder en ciberseguridad.',
    members: ['U001', 'U002', 'U003'],
    stats: { puntos: 2000, retos: 15, vulnerabilidades: 30 },
  },
  {
    id: 'T002',
    name: 'Data',
    description: 'Expertos en análisis de datos.',
    members: ['U004', 'U005'],
    stats: { puntos: 1900, retos: 12, vulnerabilidades: 25 },
  },
  {
    id: 'T003',
    name: 'Apps',
    description: 'Desarrolladores de aplicaciones.',
    members: ['U006'],
    stats: { puntos: 1500, retos: 10, vulnerabilidades: 14 },
  },
];

// Ordenar por vulnerabilidades resueltas (descendente)
const sortedTeams = [...mockTeams].sort((a, b) => b.stats.vulnerabilidades - a.stats.vulnerabilidades);
const totalVulns = sortedTeams.reduce((acc, t) => acc + t.stats.vulnerabilidades, 0);

function getCurrentMonthName() {
  return new Date().toLocaleString('es-ES', { month: 'long' });
}

const TeamsScorePage: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cerrar panel al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setExpanded(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8" ref={containerRef}>
      <div className="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        Clasificación {getCurrentMonthName().charAt(0).toUpperCase() + getCurrentMonthName().slice(1)}
      </div>
      <div className="mb-2 text-lg font-bold text-gray-700">{totalVulns} vulnerabilidades resueltas</div>
      <div className="mb-4 text-base font-semibold text-gray-600">Teams</div>
      <div className="grid gap-6">
        {sortedTeams.map((team, idx) => (
          <TeamCard
            key={team.id}
            team={team}
            expanded={expanded === team.id}
            onExpand={() => setExpanded(expanded === team.id ? null : team.id)}
            ranking={idx + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamsScorePage; 