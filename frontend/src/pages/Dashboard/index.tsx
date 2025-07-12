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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[15px] justify-items-center">
        {/* Card USUARIOS */}
        <div
          className="bg-white border border-gray-200 rounded-xl shadow-sm flex items-center justify-center w-[290px] h-[290px] cursor-pointer"
          onClick={() => navigate('/users-score')}
          tabIndex={0}
          role="button"
          aria-label="Ver ranking de usuarios"
        >
          <h2 className="text-xl font-bold text-gray-700 text-center">USUARIOS</h2>
        </div>
        {/* Card MVP */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex items-center justify-center w-[290px] h-[290px]">
          <h2 className="text-xl font-bold text-gray-700 text-center">MVP</h2>
        </div>
        {/* Card PERFIL (antes TIENDA, +30px altura) */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex items-center justify-center w-[290px] h-[370px] -mt-[30px] cursor-pointer" onClick={() => navigate('/profile')} tabIndex={0} role="button" aria-label="Ver perfil">
          <h2 className="text-xl font-bold text-gray-700 text-center">PERFIL</h2>
        </div>
        {/* Card GULAG (restar 15px de altura) */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex items-center justify-center w-[290px] h-[375px] -mt-[30px]">
          <h2 className="text-xl font-bold text-gray-700 text-center">GULAG</h2>
        </div>
        {/* Card TIENDA (antes PERFIL) */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex items-center justify-center w-[290px] h-[275px] cursor-pointer" onClick={() => navigate('/shop')} tabIndex={0} role="button" aria-label="Ver tienda">
          <h2 className="text-xl font-bold text-gray-700 text-center">TIENDA</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 