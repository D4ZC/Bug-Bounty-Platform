import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const months = [
  { value: '2024-07', label: 'Julio 2024' },
  { value: '2024-06', label: 'Junio 2024' },
  { value: '2024-05', label: 'Mayo 2024' },
] as const;

type TeamRanking = { name: string; vulns: number; avatar: string };
type RankingData = { [key: string]: TeamRanking[] };

const mockRanking: RankingData = {
  '2024-07': [
    { name: 'P-TECH', vulns: 60, avatar: 'P' },
    { name: 'Data', vulns: 45, avatar: 'D' },
    { name: 'Apps', vulns: 40, avatar: 'A' },
  ],
  '2024-06': [
    { name: 'Data', vulns: 28, avatar: 'D' },
    { name: 'P-TECH', vulns: 22, avatar: 'P' },
    { name: 'Apps', vulns: 15, avatar: 'A' },
  ],
  '2024-05': [
    { name: 'Apps', vulns: 20, avatar: 'A' },
    { name: 'P-TECH', vulns: 18, avatar: 'P' },
    { name: 'Data', vulns: 17, avatar: 'D' },
  ],
};

const fadeIn = 'animate-fade-in';
const fadeInUp = 'animate-fade-in-up';

const RankingEquipos: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>(months[0].value);
  const ranking: TeamRanking[] = mockRanking[selectedMonth] || [];
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-12 bg-black">
      <div className="w-full max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold mb-2 text-[#00fff7] uppercase tracking-widest text-center drop-shadow-[0_0_24px_#00fff7] animate-glow">Clasificación {months.find(m => m.value === selectedMonth)?.label}</h2>
        <div className="text-xl mb-6 text-[#39ff14] font-bold text-center animate-fade-in">
          {ranking.reduce((acc: number, t: TeamRanking) => acc + t.vulns, 0)} <span className="text-[#39ff14] text-2xl">★</span> vulnerabilidades resueltas
        </div>
        <div className="mb-8 flex flex-col md:flex-row items-center justify-center gap-4 animate-fade-in-up">
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
        {/* Nueva tabla tipo ranking clásico */}
        <div className="flex justify-center mt-12 animate-fade-in-up">
          <table className="min-w-full border-separate border-spacing-2 bg-[#181c2b] border-2 border-[#00fff7] rounded-2xl shadow-[0_0_32px_#00fff7] text-center">
            <thead>
              <tr className="bg-[#101926] text-[#00fff7] text-lg">
                <th className="px-6 py-4 rounded-l-xl">Puesto</th>
                <th className="px-6 py-4">Equipo</th>
                <th className="px-6 py-4 rounded-r-xl text-right">Vulnerabilidades</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((team, idx) => (
                <tr key={team.name}>
                  <td className="px-6 py-4 text-2xl text-center align-middle">
                    {idx === 0 ? '🥇 1' : idx === 1 ? '🥈 2' : idx === 2 ? '🥉 3' : idx + 1}
                  </td>
                  <td className="px-6 py-4 flex items-center gap-3 align-middle">
                    <span className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-2xl bg-[#101926] border-2 border-[#00fff7]">{team.avatar}</span>
                    <span className="font-bold text-lg">{team.name}</span>
                  </td>
                  <td className="px-6 py-4 text-2xl font-bold flex items-center gap-2 justify-end text-right align-middle">
                    {team.vulns} <span className="text-[#39ff14] text-2xl">★</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Animaciones keyframes */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.8s both; }
        .animate-fade-in-up { animation: fade-in-up 0.8s both; }
        .animate-glow { text-shadow: 0 0 24px #00fff7, 0 0 48px #00fff7; }
      `}</style>
    </div>
  );
};

export default RankingEquipos; 