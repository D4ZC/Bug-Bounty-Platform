import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

interface UserProfile {
  name: string;
  img: string;
  stats: {
    criticas: number;
    altas: number;
    medianas: number;
    bajas: number;
    total: number;
    points?: number;
    duelsWon?: number;
    effectiveness?: number;
  };
}

const maxValues = {
  'Críticas': 20,
  'Altas': 30,
  'Medianas': 30,
  'Bajas': 20,
};

const CustomRadarTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0].payload;
    return (
      <div className="bg-gray-900/90 text-white rounded-lg px-4 py-2 shadow-lg border border-blue-700">
        <div className="font-bold text-blue-400 text-sm mb-1">{name}</div>
        <div className="text-base font-semibold">{name}: <span className="text-blue-300">{value}</span></div>
      </div>
    );
  }
  return null;
};

const UserProfileCard: React.FC<{ user: UserProfile }> = ({ user }) => {
  // Datos mock actualizados
  const stats = {
    criticas: 5,
    altas: 10,
    medianas: 50,
    bajas: 8,
  };
  const total = stats.criticas + stats.altas + stats.medianas + stats.bajas;
  const data = [
    { name: 'Críticas', value: stats.criticas },
    { name: 'Altas', value: stats.altas },
    { name: 'Medianas', value: stats.medianas },
    { name: 'Bajas', value: stats.bajas },
  ];
  const normalizedData = data.map(d => ({ ...d, norm: Math.min(d.value / (maxValues[d.name] || 1), 1) }));
  return (
    <div className="flex flex-col items-start min-h-[200px] p-4 bg-[#181c24] border border-[#23273a] rounded-xl shadow-lg">
      <h2 className="text-2xl font-extrabold text-[#4fc3f7] mb-2">Juan Pérez</h2>
      <div className="text-sm mb-2 text-[#bfcfff]">
        Vulnerabilidades solucionadas: {total}<br />
        -Críticas: {stats.criticas}<br />
        -Altas: {stats.altas}<br />
        -Medianas: {stats.medianas}<br />
        -Bajas: {stats.bajas}
      </div>
      <div className="w-40 h-40 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={normalizedData}>
            <PolarGrid stroke="#4fc3f7" strokeDasharray="3 3" />
            <PolarAngleAxis dataKey="name" tick={{ fill: '#bfcfff', fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 1]} tick={false} stroke="#64748b" />
            <Radar name="Vulnerabilidades" dataKey="norm" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.5} />
            <RechartsTooltip content={CustomRadarTooltip} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserProfileCard; 