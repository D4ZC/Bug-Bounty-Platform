import React, { useState } from 'react';
import TeamsScoreCard from './Dashboard/components/TeamsScoreCard';
import MVPTeamCard from './Dashboard/components/MVPTeamCard';
import GulagCard from './Dashboard/components/GulagCard';
import UserScoreCard from './Dashboard/components/UserScoreCard';
import MVPUserCard from './Dashboard/components/MVPUserCard';
import UserProfileCard from './Dashboard/components/UserProfileCard';
import MainLayout from '../components/layouts/MainLayout';

// Datos de ejemplo
const users = [
  { name: 'Rees Josh', score: 600, rank: 1 },
  { name: 'Steve Wah', score: 580, rank: 2 },
  { name: 'Travis Head', score: 530, rank: 3 },
  { name: 'Josh Inglis', score: 470, rank: 4 },
  { name: 'Tim David', score: 410, rank: 5 },
  { name: 'Alice Smith', score: 390, rank: 6 },
  { name: 'Bob Lee', score: 370, rank: 7 },
  { name: 'Charlie Brown', score: 350, rank: 8 },
  { name: 'Diana Prince', score: 340, rank: 9 },
  { name: 'Eve Adams', score: 320, rank: 10 },
  { name: 'Frank Castle', score: 310, rank: 11 },
  { name: 'Grace Hopper', score: 300, rank: 12 },
  { name: 'Hank Pym', score: 290, rank: 13 },
  { name: 'Ivy Lane', score: 280, rank: 14 },
  { name: 'Jack Black', score: 270, rank: 15 },
  { name: 'Karen Page', score: 260, rank: 16 },
  { name: 'Leo Messi', score: 250, rank: 17 },
  { name: 'Mona Lisa', score: 240, rank: 18 },
  { name: 'Nina Simone', score: 230, rank: 19 },
  { name: 'Oscar Wilde', score: 220, rank: 20 },
  { name: 'Paul Allen', score: 210, rank: 21 },
  { name: 'Quinn Fabray', score: 200, rank: 22 },
  { name: 'Rick Grimes', score: 190, rank: 23 },
  { name: 'Sam Fisher', score: 180, rank: 24 },
  { name: 'Tina Fey', score: 170, rank: 25 },
  { name: 'Uma Thurman', score: 160, rank: 26 },
  { name: 'Victor Stone', score: 150, rank: 27 },
  { name: 'Wade Wilson', score: 140, rank: 28 },
  { name: 'Xena Warrior', score: 130, rank: 29 },
  { name: 'Yara Greyjoy', score: 120, rank: 30 },
  { name: 'Zane Malik', score: 110, rank: 31 },
];

const teams = [
  { name: 'Piteritos I', score: 2000 },
  { name: 'Piteritos II', score: 1900 },
  { name: 'Piteritos III', score: 1500 },
  { name: 'CyberGuardians', score: 1200 },
  { name: 'BugHunters', score: 1100 },
  { name: 'VulnSquad', score: 900 },
  { name: 'RedTeamers', score: 800 },
  { name: 'BlueDefenders', score: 700 },
  { name: 'WhiteHats', score: 600 },
  { name: 'DarkOps', score: 500 },
];

const gulag = [
  { name: 'deivid', score: 50 },
  { name: 'runrun', score: 25 },
  { name: 'excel', score: 20 },
  { name: 'kick ass', score: 20 },
  { name: 'pedrito sola', score: 10 },
];

const mvpTeam = 'Piteritos I';
const mvpUser = { name: 'D4ZC', img: '', stats: { criticas: 10, altas: 20, medianas: 30, bajas: 9, total: 69 } };

const sortedUsers = [...users].sort((a, b) => b.score - a.score);
const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

const starRow = (rank: number) => {
  if (rank === 1) return <><span className="text-yellow-400 text-xl mr-1">★</span><span className="text-yellow-400 text-xl mr-1">★</span><span className="text-yellow-400 text-xl">★</span></>;
  if (rank === 2) return <><span className="text-yellow-400 text-xl mr-1">★</span><span className="text-yellow-400 text-xl">★</span><span className="text-gray-300 text-xl">★</span></>;
  if (rank === 3) return <><span className="text-yellow-400 text-xl">★</span><span className="text-gray-300 text-xl mr-1">★</span><span className="text-gray-300 text-xl">★</span></>;
  return <><span className="text-gray-300 text-xl">★</span><span className="text-gray-300 text-xl">★</span><span className="text-gray-300 text-xl">★</span></>;
};

const Leaderboard = ({ title, data, isTeam }: { title: string, data: any[], isTeam?: boolean }) => (
  <div className="flex flex-col w-full bg-white rounded-xl shadow-md p-6 mb-8 max-h-[420px] overflow-y-auto">
    <h3 className="text-2xl font-bold text-blue-700 mb-6">{title}</h3>
    <div className="flex flex-row w-full gap-8">
      {/* Destacado primer lugar */}
      <div className="flex flex-col items-center bg-blue-50 rounded-xl p-6 shadow-md w-1/3 min-w-[220px]">
        <div className="bg-white rounded-full border-4 border-blue-400 w-24 h-24 flex items-center justify-center mb-4">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="#e5e7eb"/><rect x="4" y="16" width="16" height="6" rx="3" fill="#e5e7eb"/></svg>
        </div>
        <div className="text-blue-600 font-bold text-lg mb-1">1st Rank</div>
        <div className="flex items-center mb-2">{starRow(1)}</div>
        <div className="font-bold text-black text-lg mb-1">{data[0]?.name}</div>
        <div className="text-blue-700 text-2xl font-extrabold mb-1">{data[0]?.score}</div>
        <div className="text-gray-500">Points</div>
      </div>
      {/* Lista de los siguientes lugares */}
      <div className="flex-1 flex flex-col gap-4 max-h-[320px] overflow-y-auto bg-gray-50 rounded-xl p-4">
        {data.slice(1).map((item, idx) => (
          <div key={item.name} className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="#e5e7eb"/><rect x="4" y="16" width="16" height="6" rx="3" fill="#e5e7eb"/></svg>
              </div>
              <div>
                <div className="font-bold text-black">{item.name}</div>
                <div className="text-xs text-gray-500">{isTeam ? `Equipo` : `${item.rank}º`}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-700 font-bold text-lg">{item.score}</span>
              <span className="text-gray-400 text-xs">Score</span>
              <span className="ml-2">{starRow(isTeam ? 0 : item.rank)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Eventos: React.FC = () => (
  <MainLayout>
    <div className="w-full max-w-7xl mx-auto px-2 md:px-4 py-8 min-h-screen bg-white">
      <h1 className="text-3xl font-bold mb-8">Eventos</h1>
      {/* Recuadros de puntuación y MVPs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <TeamsScoreCard teams={teams} />
        <MVPTeamCard team={mvpTeam} />
        <GulagCard gulag={gulag} />
        <UserScoreCard users={users} />
        <MVPUserCard user={mvpUser} />
        <UserProfileCard user={mvpUser} />
      </div>
      {/* Leaderboards */}
      <Leaderboard title="Leaderboard de Usuarios" data={sortedUsers} />
      <Leaderboard title="Leaderboard de Equipos" data={sortedTeams} isTeam />
    </div>
  </MainLayout>
);

export default Eventos; 