import React, { useState } from 'react';
import TeamsScoreCard from './Dashboard/components/TeamsScoreCard';
import MVPTeamCard from './Dashboard/components/MVPTeamCard';
import GulagCard from './Dashboard/components/GulagCard';
import UserScoreCard from './Dashboard/components/UserScoreCard';
import MVPUserCard from './Dashboard/components/MVPUserCard';
import UserProfileCard from './Dashboard/components/UserProfileCard';
import { Button } from '@carbon/react';
import { useNavigate } from 'react-router-dom';

const Eventos: React.FC = () => {
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
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-5xl mx-auto px-2 md:px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Eventos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <TeamsScoreCard teams={teams} />
        <MVPTeamCard team={mvpTeam} />
        <GulagCard gulag={gulag} />
        <UserScoreCard users={users} />
        <MVPUserCard user={mvpUser} />
        <UserProfileCard user={mvpUser} />
      </div>
      <div className="flex justify-center items-center mt-12">
        <div className="w-full md:w-2/3 lg:w-1/2 flex justify-center gap-4">
          <Button kind="primary" size="lg" onClick={() => navigate('/shop')}>Visit Store</Button>
          <Button kind="secondary" size="lg" onClick={() => navigate('/resolved-vulnerabilities')}>Vulnerabilidades Resueltas</Button>
          <Button kind="ghost" size="lg" onClick={() => navigate('/contributions')}>Contribuciones</Button>
        </div>
      </div>
    </div>
  );
};

export default Eventos; 