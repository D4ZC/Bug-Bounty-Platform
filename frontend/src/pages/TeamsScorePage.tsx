import React, { useState, useRef, useEffect } from 'react';
import TeamCard from '../components/TeamCard';
import { useNavigate, useLocation } from 'react-router-dom';
import TeamRankingTable from '../components/TeamRankingTable'; // Added import for TeamRankingTable
import TrophySection from '../components/TrophySection'; // Added import for TrophySection

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
  const navigate = useNavigate();
  const location = useLocation();

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
    <>
      {/* Botones agrupados tipo GULAG */}
      <div className="flex justify-center my-8">
        <div className="flex gap-2 bg-[#abebc6] rounded-lg p-2 shadow-sm">
          {[
            { key: '/users-score', label: 'USUARIOS' },
            { key: '/teams-score', label: 'EQUIPOS' }
          ].map(btn => (
            <button
              key={btn.key}
              onClick={() => navigate(btn.key)}
              className={`px-6 py-2 rounded-md font-semibold transition-all duration-200 shadow-sm
                ${location.pathname === btn.key
                  ? 'bg-green-400 text-white scale-105'
                  : 'bg-white text-gray-700 hover:bg-green-200'}
              `}
              style={{ minWidth: 120 }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
      {/* Sección de copas y estrellas */}
      <TrophySection />
      {/* Contenido principal */}
      <div className="max-w-4xl mx-auto py-8" ref={containerRef}>
        <div className="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Clasificación {getCurrentMonthName().charAt(0).toUpperCase() + getCurrentMonthName().slice(1)}
        </div>
        <div className="mb-2 text-lg font-bold text-gray-700">{totalVulns} vulnerabilidades resueltas</div>
        <div className="mb-4 text-base font-semibold text-gray-600">Equipos</div>
        {/* Tabla de equipos con el mismo estilo que UserRankingTable */}
        <TeamRankingTable teams={sortedTeams} />
      </div>
    </>
  );
};

export default TeamsScorePage; 