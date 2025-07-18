import React, { useState } from 'react';
import TeamsScoreCard from './components/TeamsScoreCard';
import MVPTeamCard from './components/MVPTeamCard';
import GulagCard from './components/GulagCard';
import UserScoreCard from './components/UserScoreCard';
import MVPUserCard from './components/MVPUserCard';
import UserProfileCard from './components/UserProfileCard';
import { Button } from '@carbon/react';
import { mockUsers } from '../UserProfile';
import { mockTeams } from '../../mocks/teams';

const Dashboard: React.FC = () => {
  // Datos mockeados para la lógica dinámica
  const gulag = mockUsers.slice(-5).map(u => ({ name: u.name, points: u.points, avatar: u.avatar, selectedFrame: u.selectedFrame }));
  // Determinar el equipo y usuario MVP según el ranking
  const mvpUser = mockUsers[0];
  const mvpTeam = mockTeams[0];

  return (
    <div className="w-full min-h-screen max-w-7xl mx-auto px-2 md:px-6 py-10 flex flex-col items-center justify-center bg-gradient-to-br from-[#10131a] via-[#181c24] to-[#10131a] relative overflow-x-hidden">
      {/* Glow decorativo fondo */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyan-400/10 blur-3xl z-0 animate-pulse" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-yellow-400/10 blur-3xl z-0 animate-pulse" />
      {/* GRID PRINCIPAL */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full z-10">
        {/* Columna izquierda */}
        <div className="flex flex-col gap-8">
          <TeamsScoreCard teams={mockTeams} />
          <UserScoreCard users={mockUsers} />
        </div>
        {/* Columna central: MVP grandes */}
        <div className="flex flex-col gap-8 items-center justify-center">
          <MVPTeamCard team={mvpTeam} />
          <MVPUserCard user={mvpUser} />
        </div>
        {/* Columna derecha: Gulag y perfil */}
        <div className="flex flex-col gap-8">
          {/* Fondo glitch animado para Gulag */}
          <div className="relative">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-red-900/40 via-red-700/10 to-red-900/40 rounded-xl blur-[2px] animate-glitch z-0" />
            <GulagCard gulag={gulag} />
          </div>
          <UserProfileCard user={mvpUser} />
        </div>
      </div>
      {/* Animación glitch para Gulag */}
      <style>{`
        @keyframes glitch {
          0% { filter: hue-rotate(0deg) blur(0.5px); }
          20% { filter: hue-rotate(10deg) blur(1.5px); }
          40% { filter: hue-rotate(-10deg) blur(0.5px); }
          60% { filter: hue-rotate(5deg) blur(1.2px); }
          80% { filter: hue-rotate(-5deg) blur(0.8px); }
          100% { filter: hue-rotate(0deg) blur(0.5px); }
        }
        .animate-glitch { animation: glitch 2.5s infinite alternate; }
      `}</style>
    </div>
  );
};

export default Dashboard; 