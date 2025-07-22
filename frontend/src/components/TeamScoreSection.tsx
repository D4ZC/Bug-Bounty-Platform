import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import RankingTable, { RankingRow } from './RankingTable';

// Datos mock para las tablas de ranking (equipos)
const teamsRanking: RankingRow[] = [
  {
    position: 1,
    name: 'CyberDragons',
    icon: '🐉',
    resolved: 120,
    resolvedGoal: 150,
    points: 3200,
    weeklyChange: 15,
    effectiveness: 98,
    effectivenessIcon: '🎯',
    remaining: 30,
    remainingGoal: 150,
    lastUpdate: 'Hace 10 min',
  },
  {
    position: 2,
    name: 'RocketSec',
    icon: '🚀',
    resolved: 110,
    resolvedGoal: 150,
    points: 2950,
    weeklyChange: 10,
    effectiveness: 92,
    effectivenessIcon: '🌟',
    remaining: 40,
    remainingGoal: 150,
    lastUpdate: 'Hace 12 min',
  },
  {
    position: 3,
    name: 'GearGuardians',
    icon: '⚙️',
    resolved: 100,
    resolvedGoal: 150,
    points: 2700,
    weeklyChange: -5,
    effectiveness: 89,
    effectivenessIcon: '💡',
    remaining: 50,
    remainingGoal: 150,
    lastUpdate: 'Hace 15 min',
  },
  {
    position: 4,
    name: 'Shielders',
    icon: '🛡️',
    resolved: 90,
    resolvedGoal: 150,
    points: 2200,
    weeklyChange: 0,
    effectiveness: 85,
    effectivenessIcon: '🌟',
    remaining: 60,
    remainingGoal: 150,
    lastUpdate: 'Hace 20 min',
  },
];

// Datos mock para las tablas de ranking (usuarios)
const usersRanking: RankingRow[] = [
  {
    position: 1,
    name: 'NinjaSec',
    icon: '🦸‍♂️',
    resolved: 80,
    resolvedGoal: 100,
    points: 2100,
    weeklyChange: 8,
    effectiveness: 99,
    effectivenessIcon: '🎯',
    remaining: 20,
    remainingGoal: 100,
    lastUpdate: 'Hace 5 min',
  },
  {
    position: 2,
    name: 'DragonGirl',
    icon: '🐉',
    resolved: 75,
    resolvedGoal: 100,
    points: 2000,
    weeklyChange: 5,
    effectiveness: 95,
    effectivenessIcon: '🌟',
    remaining: 25,
    remainingGoal: 100,
    lastUpdate: 'Hace 7 min',
  },
  {
    position: 3,
    name: 'CyberSamurai',
    icon: '🧑‍💻',
    resolved: 70,
    resolvedGoal: 100,
    points: 1850,
    weeklyChange: -2,
    effectiveness: 90,
    effectivenessIcon: '💡',
    remaining: 30,
    remainingGoal: 100,
    lastUpdate: 'Hace 9 min',
  },
  {
    position: 4,
    name: 'RocketMan',
    icon: '🚀',
    resolved: 65,
    resolvedGoal: 100,
    points: 1700,
    weeklyChange: 0,
    effectiveness: 88,
    effectivenessIcon: '🌟',
    remaining: 35,
    remainingGoal: 100,
    lastUpdate: 'Hace 11 min',
  },
];

// Adaptar los datos para las gráficas
const teamsData = teamsRanking.map(team => ({ name: team.name, score: team.resolved }));
const usersData = usersRanking.map(user => ({ name: user.name, score: user.resolved }));

const chartColors = ["#38bdf8", "#22d3ee", "#4ade80", "#a78bfa", "#f472b6"];

const CustomBar = (props: any) => {
  const { fill, x, y, width, height, index } = props;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={6}
        fill={chartColors[index % chartColors.length]}
      />
    </g>
  );
};

const TeamScoreSection = () => {
  return (
    <section id="team-score-section" className="w-full flex flex-col items-center py-10 px-2">
      {/* Encabezado principal */}
      <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-10 tracking-wide drop-shadow-lg">
        TABLAS DE CLASIFICACIÓN
      </h1>
      {/* Contenedor de gráficas */}
      <div className="w-full max-w-6xl bg-gray-900 rounded-2xl p-8 flex flex-col md:flex-row gap-8 shadow-lg">
        {/* Gráfica de equipos */}
        <div className="flex-1 bg-gray-800 rounded-xl p-6 flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-white mb-4">Gráfica de equipos</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={teamsData} margin={{ top: 20, right: 20, left: 20, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" tick={{ fill: '#cbd5e1', fontSize: 14 }} interval={0} angle={-15} dy={10} />
              <YAxis domain={[0, Math.max(...teamsData.map(t => t.score), 20)]} tick={{ fill: '#cbd5e1', fontSize: 14 }} />
              <Tooltip contentStyle={{ background: '#1e293b', border: 'none', color: '#fff' }} />
              <Bar dataKey="score" shape={<CustomBar />} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Gráfica de usuarios */}
        <div className="flex-1 bg-gray-800 rounded-xl p-6 flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-white mb-4">Gráfica de Usuarios</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={usersData} margin={{ top: 20, right: 20, left: 20, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" tick={{ fill: '#cbd5e1', fontSize: 14 }} interval={0} angle={-15} dy={10} />
              <YAxis domain={[0, Math.max(...usersData.map(u => u.score), 20)]} tick={{ fill: '#cbd5e1', fontSize: 14 }} />
              <Tooltip contentStyle={{ background: '#1e293b', border: 'none', color: '#fff' }} />
              <Bar dataKey="score" shape={<CustomBar />} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Tablas de ranking debajo de las gráficas */}
      <div className="w-full flex flex-col gap-8 items-center mt-8">
        <RankingTable
          title="Ranking de Equipos"
          type="team"
          data={teamsRanking}
        />
        <RankingTable
          title="Ranking de Usuarios"
          type="user"
          data={usersRanking}
        />
      </div>
    </section>
  );
};

export default TeamScoreSection; 