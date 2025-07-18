import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeamsScoreCard from './components/TeamsScoreCard';
import MVPTeamCard from './components/MVPTeamCard';
import GulagCard from './components/GulagCard';
import UserScoreCard from './components/UserScoreCard';
import MVPUserCard from './components/MVPUserCard';
import UserProfileCard from './components/UserProfileCard';
import { Button } from '@carbon/react';
import { teams, users, getGulagUsers, getTopTeams, getTopUsers } from '@/data/usersData';

const Dashboard: React.FC = () => {
  // Datos dinámicos desde el módulo de datos
  const [teamsData] = useState(getTopTeams(3));
  const [usersData] = useState(getTopUsers(3));
  const [gulag] = useState(getGulagUsers());
  const [mvpUser] = useState(users[0]);
  const [mvpTeam] = useState(teams[0].name);

  const navigate = useNavigate();
  return (
    <div className="w-full max-w-7xl mx-auto px-2 md:px-6 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Primera fila */}
        <TeamsScoreCard teams={teamsData} />
        <MVPTeamCard team={mvpTeam} />
        <GulagCard gulag={gulag} />
        {/* Segunda fila */}
        <UserScoreCard users={usersData} />
        <MVPUserCard user={mvpUser} />
        <UserProfileCard user={mvpUser} />
      </div>
      {/* Botón de tienda */}
      <div className="flex justify-center items-center mt-10">
        <div
          className="w-full md:w-2/3 lg:w-1/2 bg-gray-50 border border-gray-200 rounded-xl shadow-sm flex justify-center py-12 cursor-pointer hover:bg-gray-100 transition"
          onClick={() => navigate('/shop')}
        >
          <Button kind="primary" size="lg" onClick={() => navigate('/shop')}>Visit Store</Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 