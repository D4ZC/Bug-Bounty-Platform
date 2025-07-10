import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeamsScoreCard from './components/TeamsScoreCard';
import MVPTeamCard from './components/MVPTeamCard';
import GulagCard from './components/GulagCard';
import UserScoreCard from './components/UserScoreCard';
import MVPUserCard from './components/MVPUserCard';
import UserProfileCard from './components/UserProfileCard';
import { Button } from '@carbon/react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  // Datos mockeados para la lógica dinámica
  const [teams] = useState([
    { name: 'Piteritos I', score: 2000 },
    { name: 'Piteritos II', score: 1900 },
    { name: 'Piteritos III', score: 1500 },
  ]);
  const [users] = useState([
    { name: 'Piteritos I', score: 2000 },
    { name: 'Piteritos II', score: 1900 },
    { name: 'Piteritos III', score: 1500 },
  ]);
  const [gulag] = useState([
    { name: 'deivid', score: 50 },
    { name: 'runrun', score: 25 },
    { name: 'excel', score: 20 },
    { name: 'kick ass', score: 20 },
    { name: 'pedrito sola', score: 10 },
  ]);
  const [mvpTeam] = useState('P-TECH');
  const [mvpUser] = useState({ name: 'D4ZC', img: '', stats: { criticas: 10, altas: 20, medianas: 30, bajas: 9, total: 69 } });

  const handleStoreClick = () => {
    navigate('/shop');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 md:px-6 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Primera fila */}
        <TeamsScoreCard teams={teams} />
        <MVPTeamCard team={mvpTeam} />
        <GulagCard gulag={gulag} />
        {/* Segunda fila */}
        <UserScoreCard users={users} />
        <MVPUserCard user={mvpUser} />
        <UserProfileCard user={mvpUser} />
      </div>
      {/* Botón de tienda interactivo */}
      <div className="flex justify-center items-center mt-10">
        <button
          onClick={handleStoreClick}
          className="relative w-64 h-32 bg-[#1A1A1A] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer overflow-hidden"
          style={{
            boxShadow: '0 4px 20px rgba(139, 92, 246, 0.3), inset 0 0 0 2px rgba(139, 92, 246, 0.2)',
          }}
        >
          {/* Resplandor púrpura en hover */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
               style={{
                 background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
                 boxShadow: 'inset 0 0 20px rgba(139, 92, 246, 0.4)',
               }}
          />
          
          {/* Contenido del botón */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-2">
            {/* Ícono del carrito */}
            <svg
              className="w-12 h-12 text-purple-400 group-hover:text-purple-300 transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            
            {/* Texto principal */}
            <div className="text-2xl font-semibold text-white group-hover:text-purple-100 transition-colors duration-300">
              Store
            </div>
            
            {/* Texto secundario */}
            <div className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
              Visit Shop
            </div>
          </div>
          
          {/* Efecto de brillo en hover */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-pulse"
               style={{
                 background: 'linear-gradient(45deg, transparent 30%, rgba(139, 92, 246, 0.1) 50%, transparent 70%)',
               }}
          />
        </button>
      </div>
    </div>
  );
};

export default Dashboard; 