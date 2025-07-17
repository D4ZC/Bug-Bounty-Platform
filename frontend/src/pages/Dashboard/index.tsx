import React, { useState } from 'react';
import MVPTeamCard from './components/MVPTeamCard';
import GulagCard from './components/GulagCard';
import MVPUserCard from './components/MVPUserCard';
import UserProfileCard from './components/UserProfileCard';
import { Button } from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import Podium from '../../components/Podium';
import ShopCard from '../../components/ShopCard';

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
        {/* Columna 1: USUARIOS y GULAG */}
        <div className="flex flex-col gap-4 h-full">
          <div
            className="bg-white border border-gray-200 rounded-xl shadow-sm flex items-center justify-center w-full h-[220px] cursor-pointer"
            onClick={() => navigate('/users-score')}
            tabIndex={0}
            role="button"
            aria-label="Ver ranking de usuarios"
          >
            <h2 className="text-xl font-bold text-gray-700 text-center">USUARIOS</h2>
          </div>
          <div
            className="bg-white border border-gray-200 rounded-xl shadow-sm flex items-center justify-center w-full h-[220px] cursor-pointer"
            onClick={() => navigate('/gulag')}
            tabIndex={0}
            role="button"
            aria-label="Ver GULAG"
          >
            <h2 className="text-xl font-bold text-gray-700 text-center">GULAG</h2>
          </div>
        </div>
        {/* Columna 2: MVP y TIENDA */}
        <div className="flex flex-col gap-4 h-full">
          <div
            className="bg-white border border-gray-200 rounded-xl shadow-sm flex items-center justify-center w-full h-[220px] cursor-pointer"
            onClick={() => navigate('/mvp')}
            tabIndex={0}
            role="button"
            aria-label="Ver MVP"
          >
            <h2 className="text-xl font-bold text-gray-700 text-center">MVP</h2>
          </div>
          <div className="w-full h-[220px] flex items-center justify-center">
            <ShopCard />
          </div>
        </div>
        {/* Columna 3: PERFIL */}
        <div className="flex flex-col h-full">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex items-center justify-center w-full h-[460px] md:h-full cursor-pointer"
            onClick={() => navigate('/profile')}
            tabIndex={0}
            role="button"
            aria-label="Ver perfil"
          >
            <h2 className="text-xl font-bold text-gray-700 text-center">PERFIL</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 