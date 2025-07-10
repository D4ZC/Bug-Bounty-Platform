import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface UserProfile {
  name: string;
  img: string;
  stats: {
    criticas: number;
    altas: number;
    medianas: number;
    bajas: number;
    total: number;
  };
}

const UserProfileCard: React.FC<{ user: UserProfile }> = ({ user }) => {
  const data = [
    { name: 'Críticas', value: user.stats.criticas },
    { name: 'Altas', value: user.stats.altas },
    { name: 'Medianas', value: user.stats.medianas },
    { name: 'Bajas', value: user.stats.bajas },
  ];
  return (
    <div className="flex flex-col items-start min-h-[200px] p-4 bg-[#181c24] border border-[#23273a] rounded-xl shadow-lg">
      <h2 className="text-2xl font-extrabold text-[#4fc3f7] mb-2">{user.name}</h2>
      <div className="text-sm mb-2 text-[#bfcfff]">
        Vulnerabilidades solucionadas: {user.stats.total}<br />
        -Críticas: {user.stats.criticas}<br />
        -Altas: {user.stats.altas}<br />
        -Medianas: {user.stats.medianas}<br />
        -Bajas: {user.stats.bajas}
      </div>
      <div className="w-40 h-40 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#4fc3f7" strokeDasharray="3 3" />
            <PolarAngleAxis dataKey="name" tick={{ fill: '#bfcfff', fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, Math.max(...data.map(d => d.value), 10)]} tick={{ fill: '#4fc3f7', fontSize: 10 }} />
            <Radar name="Vulnerabilidades" dataKey="value" stroke="#4fc3f7" fill="#4fc3f7" fillOpacity={0.4} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserProfileCard; 