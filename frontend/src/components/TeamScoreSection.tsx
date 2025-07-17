import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const teamsData = [
  { name: "Equipo A", score: 18 },
  { name: "Equipo B", score: 15 },
  { name: "Equipo C", score: 12 },
  { name: "Equipo D", score: 8 },
  { name: "Equipo E", score: 5 },
];

const usersData = [
  { name: "Ana", score: 20 },
  { name: "Luis", score: 17 },
  { name: "Sofía", score: 14 },
  { name: "Carlos", score: 10 },
  { name: "Marta", score: 7 },
];

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
              <YAxis domain={[0, 20]} tick={{ fill: '#cbd5e1', fontSize: 14 }} />
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
              <YAxis domain={[0, 20]} tick={{ fill: '#cbd5e1', fontSize: 14 }} />
              <Tooltip contentStyle={{ background: '#1e293b', border: 'none', color: '#fff' }} />
              <Bar dataKey="score" shape={<CustomBar />} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default TeamScoreSection; 