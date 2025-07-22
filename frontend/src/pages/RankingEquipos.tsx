import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Bar3DChart from './Dashboard/Bar3DChart';

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

  // Contador animado
  const totalVulns = ranking.reduce((acc: number, t: TeamRanking) => acc + t.vulns, 0);
  const [animatedCount, setAnimatedCount] = useState(0);
  useEffect(() => {
    setAnimatedCount(0);
    if (totalVulns > 0) {
      let start = 0;
      const step = Math.ceil(totalVulns / 40);
      const interval = setInterval(() => {
        start += step;
        if (start >= totalVulns) {
          setAnimatedCount(totalVulns);
          clearInterval(interval);
        } else {
          setAnimatedCount(start);
        }
      }, 20);
      return () => clearInterval(interval);
    } else {
      setAnimatedCount(0);
    }
  }, [totalVulns, selectedMonth]);

  // Colores vibrantes para la gráfica 3D
  const colorList = ['#6f1e9c', '#00fff7', '#39ff14', '#a259ff', '#00bcd4', '#b983ff', '#d1aaff'];

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-12 bg-gradient-to-br from-[#0a183d] via-[#1a0033] to-[#2d003e] font-mono relative overflow-hidden">
      {/* Fondo animado de partículas */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg width="100%" height="100%" className="w-full h-full" style={{ position: 'absolute', top: 0, left: 0 }}>
          {Array.from({ length: 50 }).map((_, i) => (
            <circle key={i} cx={Math.random() * 1920} cy={Math.random() * 1080} r={Math.random() * 2.5 + 1.5} fill="#00fff7" opacity={Math.random() * 0.3 + 0.2}>
              <animate attributeName="cy" values={`0;${1080};0`} dur={`${Math.random() * 8 + 6}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </svg>
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2,
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(0,0,0,0.7) 100%)'
        }} />
      </div>
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold mb-2 text-[#00fff7] uppercase tracking-widest text-center drop-shadow-[0_0_24px_#00fff7] animate-glow font-mono">Clasificación {months.find(m => m.value === selectedMonth)?.label}</h2>
        <div className="text-xl mb-6 text-[#39ff14] font-bold text-center animate-fade-in font-mono">
          <span style={{ fontSize: 28, fontWeight: 'bold', color: '#39ff14', textShadow: '0 0 16px #39ff14' }}>{animatedCount}</span> <span className="text-[#39ff14] text-2xl">★</span> vulnerabilidades resueltas
        </div>
        <div className="mb-8 flex flex-col md:flex-row items-center justify-center gap-4 animate-fade-in-up">
          <label className="text-[#00fff7] font-bold font-mono">Mes:</label>
          <select
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
            className="bg-[#232b36] border-2 border-[#00fff7] rounded-lg px-4 py-2 text-[#00fff7] font-mono focus:outline-none focus:ring-2 focus:ring-[#00fff7] transition-all duration-300 shadow-[0_0_8px_#00fff7] hover:shadow-[0_0_16px_#00fff7] focus:scale-105"
          >
            {months.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>
        {/* Nueva tabla tipo ranking clásico */}
        <div className="flex justify-center mt-12 animate-fade-in-up">
          <table className="min-w-full max-w-xl mx-auto border-separate border-spacing-y-4 bg-[#181c2b]/90 border-2 border-[#00fff7] rounded-2xl shadow-[0_0_24px_#00fff7] text-center overflow-hidden text-base font-mono backdrop-blur-md">
            <thead>
              <tr className="bg-[#101926] text-[#00fff7] text-base uppercase">
                <th className="px-3 py-3 rounded-tl-2xl font-extrabold tracking-wider font-mono">Puesto</th>
                <th className="px-3 py-3 font-extrabold tracking-wider font-mono">Equipo</th>
                <th className="px-3 py-3 rounded-tr-2xl font-extrabold tracking-wider font-mono">Vulnerabilidades</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((team, idx) => {
                // Medalla emoji con glow animado
                let medal = null;
                let medalGlow = '';
                if (idx === 0) {
                  medal = '🥇';
                  medalGlow = 'animate-medal-glow';
                } else if (idx === 1) {
                  medal = '🥈';
                  medalGlow = 'animate-medal-glow';
                } else if (idx === 2) {
                  medal = '🥉';
                  medalGlow = 'animate-medal-glow';
                }
                // Barra de progreso
                const maxVulns = ranking[0]?.vulns || 1;
                const percent = Math.round((team.vulns / maxVulns) * 100);
                return (
                  <tr key={team.name} className="group transition-all duration-200 hover:bg-[#232b36]/60 hover:shadow-lg">
                    {/* Puesto con medalla emoji y glow animado */}
                    <td className="align-middle">
                      <span className={`inline-flex items-center justify-center w-10 h-10 text-2xl font-extrabold rounded-full border-2 border-white shadow-lg ${medalGlow} font-mono`}>{medal ? medal : idx + 1}</span>
                    </td>
                    {/* Avatar y nombre de equipo con glow animado */}
                    <td className="align-middle">
                      <div className="flex items-center justify-end gap-3 min-h-[48px]">
                        <span className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg bg-[#101926] border-2 border-[#00fff7] shadow-[0_0_8px_#00fff7] transition-all duration-300 group-hover:shadow-[0_0_16px_#00fff7,0_0_32px_#00fff7] group-hover:border-[#39ff14] animate-avatar-glow font-mono">{team.avatar}</span>
                        <span className="font-bold text-base min-w-[60px] text-left font-mono">{team.name}</span>
                      </div>
                    </td>
                    {/* Vulnerabilidades: número, estrella, barra */}
                    <td className="align-middle">
                      <div className="flex flex-col items-center gap-1">
                        <span className="flex items-center gap-1 font-mono">
                          <span style={{ fontSize: 20, color: '#fff', fontWeight: 900 }}>{team.vulns}</span>
                          <span style={{ color: '#39ff14', fontSize: 16, fontWeight: 900 }}>★</span>
                        </span>
                        <div className="w-16 h-1.5 rounded-full bg-[#232733]">
                          <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: `${percent}%`, background: 'linear-gradient(90deg, #00fff7, #6f1e9c)' }} />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
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
        @keyframes medal-glow {
          0%, 100% { box-shadow: 0 0 2px 1px #fff7, 0 0 4px 2px #fff3; }
          50% { box-shadow: 0 0 5px 2px #fff9, 0 0 8px 3px #fff6; }
        }
        .animate-medal-glow { animation: medal-glow 2s infinite alternate; }
        @keyframes avatar-glow {
          0%, 100% { box-shadow: 0 0 2px 1px #00fff7, 0 0 4px 1px #00fff7; }
          50% { box-shadow: 0 0 5px 2px #39ff14, 0 0 7px 3px #00fff7; }
        }
        .animate-avatar-glow { animation: avatar-glow 2.5s infinite alternate; }
      `}</style>
    </div>
  );
};

export default RankingEquipos; 