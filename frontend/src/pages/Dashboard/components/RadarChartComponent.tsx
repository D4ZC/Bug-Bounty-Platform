import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface RadarChartComponentProps {
  data: { name: string; value: number }[];
}

const RadarChartComponent: React.FC<RadarChartComponentProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid stroke="#4fc3f7" strokeDasharray="3 3" />
        <PolarAngleAxis dataKey="name" tick={{ fill: '#bfcfff', fontSize: 12 }} />
        <PolarRadiusAxis angle={30} domain={[0, Math.max(...data.map(d => d.value), 10)]} tick={{ fill: '#4fc3f7', fontSize: 10 }} />
        <Radar name="Vulnerabilidades" dataKey="value" stroke="#4fc3f7" fill="#4fc3f7" fillOpacity={0.4} />
        <Tooltip contentStyle={{ background: '#181c24', border: '1px solid #23273a', color: '#fff' }} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default RadarChartComponent; 