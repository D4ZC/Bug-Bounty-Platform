import React, { useState } from 'react';
import MVPTeamCard from './components/MVPTeamCard';
import GulagCard from './components/GulagCard';
import MVPUserCard from './components/MVPUserCard';
import UserProfileCard from './components/UserProfileCard';
import { Button } from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import Podium from '../../components/Podium';
import ShopCard from '../../components/ShopCard';
import Carousel from '../../components/Carousel';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
    <div className="w-full max-w-7xl mx-auto px-2 md:px-6 py-6 bg-[#f9f9f6]">
      <Carousel />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        {/* Columna 1: USUARIOS y GULAG */}
        <div className="flex flex-col gap-6 h-full">
          {/* USUARIOS Card - Pastel Blue, Blob */}
          <div
            className="relative bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl shadow-xl flex items-center justify-center w-full h-[220px] cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-2xl hover:scale-[1.03]"
            onClick={() => navigate('/users-score')}
            tabIndex={0}
            role="button"
            aria-label={t('dashboard.users_aria', 'Ver ranking de usuarios')}
          >
            {/* Blob decorativo */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-300 opacity-30 rounded-full blur-2xl z-0" />
            <h2 className="relative z-10 text-3xl font-extrabold text-blue-900 text-center">{t('dashboard.users', 'USUARIOS')}</h2>
          </div>
          {/* GULAG Card - Pastel Pink, Wave */}
          <div
            className="relative bg-gradient-to-br from-pink-100 to-pink-200 rounded-3xl shadow-xl flex items-center justify-center w-full h-[220px] cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-2xl hover:scale-[1.03]"
            onClick={() => navigate('/gulag')}
            tabIndex={0}
            role="button"
            aria-label={t('dashboard.gulag_aria', 'Ver GULAG')}
          >
            {/* Wave decorativa */}
            <svg className="absolute bottom-0 left-0 w-full h-16 z-0" viewBox="0 0 1440 320"><path fill="#fbcfe8" fillOpacity="0.5" d="M0,224L48,197.3C96,171,192,117,288,117.3C384,117,480,171,576,197.3C672,224,768,224,864,197.3C960,171,1056,117,1152,128C1248,139,1344,213,1392,250.7L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
            <h2 className="relative z-10 text-3xl font-extrabold text-pink-900 text-center">{t('dashboard.gulag', 'GULAG')}</h2>
          </div>
        </div>
        {/* Columna 2: MVP y TIENDA */}
        <div className="flex flex-col gap-6 h-full">
          {/* MVP Card - Pastel Purple, Flat */}
          <div
            className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl shadow-xl flex items-center justify-center w-full h-[220px] cursor-pointer transition-all duration-200 hover:shadow-2xl hover:scale-[1.03]"
            onClick={() => navigate('/mvp')}
            tabIndex={0}
            role="button"
            aria-label="Ver MVP"
          >
            <h2 className="text-3xl font-extrabold text-purple-900 text-center">MVP</h2>
          </div>
          {/* TIENDA Card - NO MODIFICAR */}
          <div className="w-full h-[220px] flex items-center justify-center">
            <ShopCard />
          </div>
        </div>
        {/* Columna 3: PERFIL */}
        <div className="flex flex-col h-full">
          {/* PERFIL Card - Pastel Green, Blob */}
          <div className="relative bg-gradient-to-br from-green-100 to-green-200 rounded-3xl shadow-xl flex items-center justify-center w-full h-[460px] md:h-full cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-2xl hover:scale-[1.03]"
            onClick={() => navigate('/profile')}
            tabIndex={0}
            role="button"
            aria-label="Ver perfil"
          >
            {/* Blob decorativo */}
            <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-green-300 opacity-30 rounded-full blur-2xl z-0" />
            <h2 className="relative z-10 text-3xl font-extrabold text-green-900 text-center">PERFIL</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 