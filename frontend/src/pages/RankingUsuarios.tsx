import React, { useState, useEffect } from 'react';
import { useBackground } from '../contexts/BackgroundContext';

const months = [
  { value: '2024-07', label: 'Julio 2024' },
  { value: '2024-06', label: 'Junio 2024' },
  { value: '2024-05', label: 'Mayo 2024' },
] as const;

type UserRanking = { username: string; vulns: number; avatar: string };
type RankingData = { [key: string]: UserRanking[] };

const mockRanking: RankingData = {
  '2024-07': [
    { username: 'alice', vulns: 32, avatar: 'A' },
    { username: 'bob', vulns: 28, avatar: 'B' },
    { username: 'carol', vulns: 25, avatar: 'C' },
  ],
  '2024-06': [
    { username: 'bob', vulns: 30, avatar: 'B' },
    { username: 'carol', vulns: 27, avatar: 'C' },
    { username: 'alice', vulns: 22, avatar: 'A' },
  ],
  '2024-05': [
    { username: 'carol', vulns: 20, avatar: 'C' },
    { username: 'alice', vulns: 18, avatar: 'A' },
    { username: 'bob', vulns: 17, avatar: 'B' },
  ],
};

const mockVulns = [
  [
    { name: 'XSS en login', time: '2h 15m' },
    { name: 'SQLi en perfil', time: '1h 40m' },
    { name: 'CSRF en pagos', time: '3h 5m' },
  ],
  [
    { name: 'RCE en API', time: '4h 10m' },
    { name: 'IDOR en reportes', time: '2h 50m' },
  ],
  [
    { name: 'LFI en uploads', time: '1h 20m' },
    { name: 'Open Redirect', time: '50m' },
    { name: 'XXE en XML', time: '2h 30m' },
  ],
];

const RankingUsuarios: React.FC = () => {
  const { backgroundUrl } = useBackground();
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>(months[0].value);
  const ranking: UserRanking[] = mockRanking[selectedMonth] || [];

  // Contador animado
  const totalVulns = ranking.reduce((acc: number, t: UserRanking) => acc + t.vulns, 0);
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

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-12 font-mono relative overflow-hidden" style={{ background: backgroundUrl ? `url(${backgroundUrl}) center/cover no-repeat` : 'linear-gradient(to bottom right, #0a183d, #1a0033, #2d003e)' }}>
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
        <h2 className="text-4xl font-extrabold mb-2 text-[#00fff7] uppercase tracking-widest text-center drop-shadow-[0_0_24px_#00fff7] animate-glow font-mono">Ranking Usuarios {months.find(m => m.value === selectedMonth)?.label}</h2>
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
        <div className="flex justify-center mt-12 animate-fade-in-up">
          <table className="min-w-full max-w-xl mx-auto border-separate border-spacing-y-4 bg-[#181c2b]/90 border-2 border-[#00fff7] rounded-2xl shadow-[0_0_24px_#00fff7] text-center overflow-hidden text-base font-mono backdrop-blur-md">
            <thead>
              <tr className="bg-[#101926] text-[#00fff7] text-base uppercase">
                <th className="px-3 py-3 rounded-tl-2xl font-extrabold tracking-wider font-mono">Lugar</th>
                <th className="px-3 py-3 font-extrabold tracking-wider font-mono">Usuario</th>
                <th className="px-3 py-3 rounded-tr-2xl font-extrabold tracking-wider font-mono">Vulnerabilidades</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((user, idx) => {
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
                return (
                  <tr key={user.username} className="group transition-all duration-200 hover:bg-[#232b36]/60 hover:shadow-lg">
                    {/* Lugar con medalla emoji y glow animado */}
                    <td className="align-middle">
                      <span className={`inline-flex items-center justify-center w-10 h-10 text-2xl font-extrabold rounded-full border-2 border-white shadow-lg ${medalGlow} font-mono`}>{medal ? medal : idx + 1}</span>
                    </td>
                    {/* Avatar y nombre de usuario con glow animado, alineados a la derecha */}
                    <td className="align-middle">
                      <div className="flex items-center justify-end gap-3 min-h-[48px]">
                        <span className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg bg-[#101926] border-2 border-[#00fff7] shadow-[0_0_8px_#00fff7] transition-all duration-300 group-hover:shadow-[0_0_16px_#00fff7,0_0_32px_#00fff7] group-hover:border-[#39ff14] animate-avatar-glow font-mono">{user.avatar}</span>
                        <span className="font-bold text-base min-w-[60px] text-left font-mono">{user.username}</span>
                      </div>
                    </td>
                    {/* Vulnerabilidades: número, estrella, barra */}
                    <td className="align-middle">
                      <div className="flex flex-col items-center gap-1">
                        <span
                          className="flex items-center gap-1 cursor-pointer select-none hover:scale-110 transition-transform font-mono"
                          onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                          title="Ver vulnerabilidades resueltas"
                        >
                          <span style={{ fontSize: 20, color: '#fff', fontWeight: 900 }}>{user.vulns}</span>
                          <span style={{ color: '#39ff14', fontSize: 16, fontWeight: 900 }}>★</span>
                        </span>
                        <div className="w-16 h-1.5 rounded-full bg-[#232733]">
                          <div className="h-1.5 rounded-full" style={{ width: `${Math.round((user.vulns / (ranking[0]?.vulns || 1)) * 100)}%`, background: 'linear-gradient(90deg, #00fff7 0%, #6f1e9c 100%)' }} />
                        </div>
                        {/* Lista de vulnerabilidades resueltas */}
                        {expandedIdx === idx && (
                          <div className="mt-2 w-48 bg-[#232b36] rounded-lg shadow-lg border border-[#00fff7]/30 p-3 animate-fade-in-fast font-mono">
                            <div className="text-[#00fff7] font-bold mb-2 text-sm font-mono">Vulnerabilidades resueltas</div>
                            <ul className="text-xs text-gray-200 space-y-1 font-mono">
                              {mockVulns[idx % mockVulns.length].map((v, i) => (
                                <li key={i} className="flex justify-between items-center">
                                  <span>{v.name}</span>
                                  <span className="text-[#39ff14] font-mono ml-2">{v.time}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
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
        @keyframes fade-in-fast {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-fast { animation: fade-in-fast 0.3s both; }
      `}</style>
    </div>
  );
};

export default RankingUsuarios; 