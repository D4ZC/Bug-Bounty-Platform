import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Team } from '../types';

const months = [
  { value: '2024-06', label: 'Junio 2024' },
  { value: '2024-05', label: 'Mayo 2024' },
  { value: '2024-04', label: 'Abril 2024' },
  // Agrega más meses según sea necesario
];

const RankingEquiposGulag: React.FC = () => {
  const { isDark } = useTheme();
  const [selectedMonth, setSelectedMonth] = useState(months[0].value);
  const [ranking, setRanking] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Aquí deberías llamar a la API con el filtro de mes
    // Por ahora, simula datos
    setLoading(true);
    setTimeout(() => {
      setRanking([
        { _id: '1', name: 'P-TECH', points: 60, leader: 'Líder 1', members: ['A', 'B'], description: '', rank: 1, createdAt: new Date(), updatedAt: new Date() },
        { _id: '2', name: 'Data', points: 45, leader: 'Líder 2', members: ['C', 'D'], description: '', rank: 2, createdAt: new Date(), updatedAt: new Date() },
        { _id: '3', name: 'Apps', points: 30, leader: 'Líder 3', members: ['E', 'F'], description: '', rank: 3, createdAt: new Date(), updatedAt: new Date() },
      ]);
      setLoading(false);
    }, 500);
  }, [selectedMonth]);

  const placeMedal = (idx: number) => {
    if (idx === 0) return <span className="text-2xl">🥇</span>;
    if (idx === 1) return <span className="text-2xl">🥈</span>;
    if (idx === 2) return <span className="text-2xl">🥉</span>;
    return idx + 1;
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center py-10 px-2 transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold font-mono mb-8 text-center text-[#00fff7] drop-shadow">Top 3 Equipos - Vulnerabilidades Resueltas</h1>
        <div className="mb-8 flex flex-col md:flex-row items-center justify-center gap-4">
          <label className="text-[#00fff7] font-bold">Mes:</label>
          <select
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
            className="bg-[#232b36] border-2 border-[#00fff7] rounded-lg px-4 py-2 text-[#00fff7] font-mono focus:outline-none focus:ring-2 focus:ring-[#00fff7]"
          >
            {months.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-2 bg-[#181c2b] border-2 border-[#00fff7] rounded-2xl shadow-[0_0_32px_#00fff7] text-center">
            <thead>
              <tr className="bg-[#101926] text-[#00fff7] text-lg">
                <th className="px-6 py-4 rounded-l-xl">Lugar</th>
                <th className="px-6 py-4">Equipo</th>
                <th className="px-6 py-4 rounded-r-xl text-right">Vulnerabilidades</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={3} className="py-8 text-[#00fff7]">Cargando...</td></tr>
              ) : (
                ranking.slice(0, 3).map((team, idx) => (
                  <tr key={team._id} className="border-t border-[#00fff7] hover:bg-[#112233]/40 transition">
                    <td className="px-6 py-4 text-2xl text-center align-middle">{placeMedal(idx)}</td>
                    <td className="px-6 py-4 flex items-center gap-3 align-middle justify-center">
                      <span className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-2xl bg-[#101926] border-2 border-[#00fff7]">{team.name[0]}</span>
                      <span className="font-bold text-lg text-[#00fff7]">{team.name}</span>
                    </td>
                    <td className="px-6 py-4 text-2xl font-bold flex items-center gap-2 justify-end text-right align-middle">
                      {team.points} <span className="text-[#39ff14] text-2xl">★</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RankingEquiposGulag; 