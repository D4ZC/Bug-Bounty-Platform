import React from 'react';
import UserRankingTable from '../components/UserRankingTable';
import { useNavigate, useLocation } from 'react-router-dom';

const mockUsers = [
  {
    id: 'U001',
    name: 'Ana Torres',
    role: 'Pentester',
    team: 'P-TECH',
    stats: { puntos: 1200, vulnerabilidades: 18, retos: 7 },
    badges: ['Top Performer', 'Bug Hunter'],
  },
  {
    id: 'U002',
    name: 'Luis Pérez',
    role: 'Analista',
    team: 'Data',
    stats: { puntos: 950, vulnerabilidades: 12, retos: 5 },
    badges: ['Fast Solver'],
  },
  {
    id: 'U003',
    name: 'Marta López',
    role: 'Red Team',
    team: 'P-TECH',
    stats: { puntos: 800, vulnerabilidades: 10, retos: 3 },
    badges: ['Team Player'],
  },
];

// Ordenar por vulnerabilidades resueltas (descendente)
const sortedUsers = [...mockUsers].sort((a, b) => b.stats.vulnerabilidades - a.stats.vulnerabilidades);
const totalVulns = sortedUsers.reduce((acc, u) => acc + u.stats.vulnerabilidades, 0);

function getCurrentMonthName() {
  return new Date().toLocaleString('es-ES', { month: 'long' });
}

const UsersScorePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      {/* Submenú barra secundaria */}
      <div className="bg-transparent h-[30px] flex items-center w-screen">
        <div
          className={`mr-6 cursor-pointer font-semibold text-blue-600 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] rounded-lg shadow-[0_2px_8px_0_rgba(0,0,0,0.7)] px-3 py-1" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }} ${location.pathname === '/users-score' ? 'text-green-500' : ''}`}
          onClick={() => navigate('/users-score')}
        >
          USUARIOS
        </div>
        <div
          className={`cursor-pointer font-semibold text-blue-600 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] rounded-lg shadow-[0_2px_8px_0_rgba(0,0,0,0.7)] px-3 py-1" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }} ${location.pathname === '/teams-score' ? 'text-green-500' : ''}`}
          onClick={() => navigate('/teams-score')}
        >
          EQUIPOS
        </div>
      </div>
      {/* Contenido principal */}
      <div className="max-w-4xl mx-auto py-8">
        <div className="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Clasificación {getCurrentMonthName().charAt(0).toUpperCase() + getCurrentMonthName().slice(1)}
        </div>
        <div className="mb-2 text-lg font-bold text-gray-700">{totalVulns} vulnerabilidades resueltas</div>
        <div className="mb-4 text-base font-semibold text-gray-600">Usuarios</div>
        <UserRankingTable users={sortedUsers} />
      </div>
    </>
  );
};

export default UsersScorePage; 