import React, { useState } from 'react';
import MVPTeamCard from './components/MVPTeamCard';
import GulagCard from './components/GulagCard';
import MVPUserCard from './components/MVPUserCard';
import UserProfileCard from './components/UserProfileCard';
import { Button } from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import Podium from '../../components/Podium';

// Datos reales para equipos y usuarios
const realTeams = [
  { name: 'P-TECH', score: 30 },
  { name: 'Data', score: 25 },
  { name: 'Apps', score: 14 },
];
const realUsers = [
  { name: 'Ana Torres', score: 18 },
  { name: 'Luis Pérez', score: 12 },
  { name: 'Marta López', score: 10 },
];

const Dashboard: React.FC = () => {
  const [teams] = useState(realTeams);
  const [users] = useState(realUsers);
  const [gulag] = useState([
    { name: 'deivid', score: 50 },
    { name: 'runrun', score: 25 },
    { name: 'excel', score: 20 },
    { name: 'kick ass', score: 20 },
    { name: 'pedrito sola', score: 10 },
  ]);
  const [mvpTeam] = useState('P-TECH');
  const [mvpUser] = useState({ name: 'D4ZC', img: '', stats: { criticas: 10, altas: 20, medianas: 30, bajas: 9, total: 69 } });

  const navigate = useNavigate();

  // Ordenar top 3 para podio
  const topTeams = [...teams].sort((a, b) => b.score - a.score).slice(0, 3);
  const topUsers = [...users].sort((a, b) => b.score - a.score).slice(0, 3);

  return (
    <div className="w-full max-w-7xl mx-auto px-2 md:px-6 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Primera fila */}
        <div
          className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col items-center justify-center min-h-[200px] cursor-pointer"
          onClick={() => navigate('/teams-score')}
          tabIndex={0}
          role="button"
          aria-label="Ver ranking de equipos"
        >
          <h2 className="text-xl font-bold text-gray-700 mb-2 text-center">EQUIPOS</h2>
          <Podium items={topTeams.map(t => ({ name: t.name }))} />
        </div>
        <MVPTeamCard team={mvpTeam} />
        <GulagCard gulag={gulag} />
        {/* Segunda fila */}
        <div
          className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col items-center justify-center min-h-[200px] cursor-pointer"
          onClick={() => navigate('/users-score')}
          tabIndex={0}
          role="button"
          aria-label="Ver ranking de usuarios"
        >
          <h2 className="text-xl font-bold text-gray-700 mb-2 text-center">USUARIOS</h2>
          <Podium items={topUsers.map(u => ({ name: u.name }))} />
        </div>
        <MVPUserCard user={mvpUser} />
        <UserProfileCard user={mvpUser} />
      </div>
      {/* Botón de tienda */}
      <div className="flex justify-center items-center mt-10">
        <div className="w-full md:w-2/3 lg:w-1/2 bg-gray-50 border border-gray-200 rounded-xl shadow-sm flex justify-center py-12">
          <Button kind="primary" size="lg">Visit Store</Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 