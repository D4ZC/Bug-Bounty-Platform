import React, { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Team, User, Vulnerability } from '@/types';
import apiService from '@/services/api';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import Bar3DChart from './Bar3DChart';

// Datos de ejemplo para D4ZC
const d4zcProfile = {
  name: 'D4ZC',
  stats: { criticas: 10, altas: 20, medianas: 30, bajas: 9, total: 69 },
};
const radarData = [
  { subject: 'Críticas', value: d4zcProfile.stats.criticas, fullMark: 30 },
  { subject: 'Altas', value: d4zcProfile.stats.altas, fullMark: 30 },
  { subject: 'Medianas', value: d4zcProfile.stats.medianas, fullMark: 30 },
  { subject: 'Bajas', value: d4zcProfile.stats.bajas, fullMark: 30 },
];

// Agregar un componente Tooltip personalizado para la gráfica de Top Equipos
const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#181c2b', border: '1px solid #00fff7', color: '#fff', padding: 12, borderRadius: 8, fontFamily: 'monospace' }}>
        <div style={{ color: '#00fff7', fontWeight: 'bold', fontSize: 18, marginBottom: 4 }}>{label}</div>
        <div style={{ color: '#fff', fontSize: 16 }}><span style={{ color: '#fff', fontWeight: 'bold' }}>points</span> : <span style={{ color: '#fff', fontWeight: 'bold' }}>{payload[0].value}</span></div>
      </div>
    );
  }
  return null;
};

const Dashboard: React.FC = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  // Datos de ejemplo (puedes conectar a la API real si lo deseas)
  const [teams, setTeams] = useState<Team[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [vulns, setVulns] = useState<Vulnerability[]>([]);

  useEffect(() => {
    Promise.all([
      apiService.get<Team[]>('/teams'),
      apiService.get<User[]>('/users'),
      apiService.get<Vulnerability[]>('/vulnerabilities'),
    ]).then(([teamsRes, usersRes, vulnsRes]) => {
      setTeams(teamsRes.data || []);
      setUsers(usersRes.data || []);
      setVulns(vulnsRes.data || []);
    }).catch(() => {
      // setLoading(false); // This line was removed as per the edit hint
    });
  }, []);

  // Top 3 equipos y usuarios
  const topTeams = teams.length > 0 ? [...teams].sort((a, b) => b.points - a.points).slice(0, 3) : [
    { _id: '1', name: 'P-TECH', points: 60 },
    { _id: '2', name: 'Data', points: 45 },
    { _id: '3', name: 'Apps', points: 40 }
  ];
  const topUsers = users.length > 0 ? [...users].sort((a, b) => b.points - a.points).slice(0, 3) : [
    { _id: 'u1', username: 'alice', points: 32 },
    { _id: 'u2', username: 'bob', points: 28 },
    { _id: 'u3', username: 'carol', points: 25 }
  ];

  // MVPs
  const mvpTeam = topTeams[0];
  const mvpUser = topUsers[0];

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-white'}`}>
      {/* Header */}
      <header className="w-full max-w-6xl mx-auto mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold font-mono text-[#00fff7] drop-shadow mb-2">Bug Bounty Platform</h1>
        <p className="text-lg md:text-xl text-[#39ff14] font-mono">¡Bienvenido cazador! Explora, compite y gana recompensas.</p>
      </header>
      {/* Tarjeta D4ZC con radar chart funcional (ahora justo debajo del header) */}
      <div className="max-w-xl w-full bg-[#181c2b]/80 border-2 border-[#00fff7] rounded-2xl p-8 font-mono text-[#00fff7] shadow-[0_0_32px_#00fff7] flex flex-col md:flex-row items-center gap-8 mb-10 mx-auto cursor-pointer hover:scale-105 transition backdrop-blur-md">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">{d4zcProfile.name}</h2>
          <div className="text-lg mb-2">Vulnerabilidades solucionadas: <span className="text-[#39ff14] font-bold">{d4zcProfile.stats.total}</span></div>
          <ul className="text-base space-y-1">
            <li>- <span className="text-[#ff3b3b]">Críticas:</span> {d4zcProfile.stats.criticas}</li>
            <li>- <span className="text-[#ffb300]">Altas:</span> {d4zcProfile.stats.altas}</li>
            <li>- <span className="text-[#00fff7]">Medianas:</span> {d4zcProfile.stats.medianas}</li>
            <li>- <span className="text-[#39ff14]">Bajas:</span> {d4zcProfile.stats.bajas}</li>
          </ul>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-56 h-56 bg-[#232b36] rounded-full flex items-center justify-center border-2 border-[#00fff7]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#00fff7" strokeOpacity={0.3} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#00fff7', fontSize: 14 }} />
                <PolarRadiusAxis angle={30} domain={[0, 30]} tick={false} axisLine={false} />
                <Radar name="D4ZC" dataKey="value" stroke="#39ff14" fill="#00fff7" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Rankings y MVPs */}
      <section className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 justify-center">
        {/* Ranking Equipos (clickeable) */}
        <div
          className="bg-gradient-to-br from-black/70 to-[#0ff0fc]/30 border-2 border-[#00fff7] rounded-2xl p-6 font-mono text-[#00fff7] shadow-[0_0_20px_#00fff7] transition-transform duration-200 hover:scale-105 focus-within:scale-105 cursor-pointer mx-auto w-full backdrop-blur-md"
          onClick={() => navigate('/ranking-equipos')}
        >
          <h2 className="text-2xl font-bold mb-4">Top Equipos</h2>
          <div className="w-full h-48 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topTeams} margin={{ top: 10, right: 20, left: 0, bottom: 0 }} barCategoryGap={30}>
                <XAxis dataKey="name" stroke="#00fff7" tick={{ fill: '#00fff7', fontFamily: 'monospace', fontWeight: 'bold' }} />
                <YAxis stroke="#00fff7" tick={{ fill: '#00fff7', fontFamily: 'monospace', fontWeight: 'bold' }} />
                <Tooltip cursor={{ fill: '#00fff7', opacity: 0.08 }} contentStyle={{ background: '#181c2b', border: '1px solid #00fff7', color: '#00fff7', fontFamily: 'monospace' }} />
                <Bar dataKey="points" radius={[16, 16, 8, 8]} isAnimationActive animationDuration={1200} animationEasing="ease-out" minPointSize={5} >
                  <LabelList dataKey="points" position="top" fill="#fff" fontWeight="bold" fontFamily="monospace" />
                  {topTeams.map((_, idx) => (
                    <Cell key={`cell-${idx}`} fill={idx === 0 ? 'url(#gold-bar)' : idx === 1 ? 'url(#silver-bar)' : 'url(#bronze-bar)'} />
                  ))}
                </Bar>
                <defs>
                  <linearGradient id="gold-bar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fff700" />
                    <stop offset="100%" stopColor="#ffe066" />
                  </linearGradient>
                  <linearGradient id="silver-bar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00fff7" />
                    <stop offset="100%" stopColor="#39c5bb" />
                  </linearGradient>
                  <linearGradient id="bronze-bar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffb300" />
                    <stop offset="100%" stopColor="#ffda8a" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Ranking Usuarios */}
        <div className="bg-gradient-to-br from-black/70 to-[#0ff0fc]/30 border-2 border-[#00fff7] rounded-2xl p-6 font-mono text-[#00fff7] shadow-[0_0_20px_#00fff7] mx-auto w-full backdrop-blur-md transition-transform duration-200 hover:scale-105 focus-within:scale-105"
          onClick={() => navigate('/ranking-usuarios')}
          style={{ cursor: 'pointer' }}
        >
          <h2 className="text-2xl font-bold mb-4">Top Usuarios</h2>
          <div className="w-full h-48 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topUsers} margin={{ top: 10, right: 20, left: 0, bottom: 0 }} barCategoryGap={30}>
                <XAxis dataKey="username" stroke="#00fff7" tick={{ fill: '#00fff7', fontFamily: 'monospace', fontWeight: 'bold' }} />
                <YAxis stroke="#00fff7" tick={{ fill: '#00fff7', fontFamily: 'monospace', fontWeight: 'bold' }} />
                <Tooltip cursor={{ fill: '#00fff7', opacity: 0.08 }} contentStyle={{ background: '#181c2b', border: '1px solid #00fff7', color: '#00fff7', fontFamily: 'monospace' }} />
                <Bar dataKey="points" radius={[16, 16, 8, 8]} isAnimationActive animationDuration={1200} animationEasing="ease-out" minPointSize={5} >
                  <LabelList dataKey="points" position="top" fill="#fff" fontWeight="bold" fontFamily="monospace" />
                  {topUsers.map((_, idx) => (
                    <Cell key={`cell-user-${idx}`} fill={idx === 0 ? 'url(#gold-bar-u)' : idx === 1 ? 'url(#silver-bar-u)' : 'url(#bronze-bar-u)'} />
                  ))}
                </Bar>
                <defs>
                  <linearGradient id="gold-bar-u" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fff700" />
                    <stop offset="100%" stopColor="#ffe066" />
                  </linearGradient>
                  <linearGradient id="silver-bar-u" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00fff7" />
                    <stop offset="100%" stopColor="#39c5bb" />
                  </linearGradient>
                  <linearGradient id="bronze-bar-u" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffb300" />
                    <stop offset="100%" stopColor="#ffda8a" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* MVPs */}
      <section className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 justify-center">
        <div className="flex flex-col items-center bg-[#181c2b]/80 border-2 border-[#00fff7] rounded-2xl p-6 font-mono text-[#00fff7] shadow-[0_0_20px_#00fff7] mx-auto w-full backdrop-blur-md transition-transform duration-200 hover:scale-105 focus-within:scale-105">
          <h3 className="text-xl font-bold mb-2">MVP Equipo</h3>
          {mvpTeam ? (
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold mb-1">{mvpTeam.name}</span>
              <span className="text-lg">{mvpTeam.points} pts</span>
            </div>
          ) : <span className="text-[#ff3b3b]">Sin datos</span>}
        </div>
        <div className="flex flex-col items-center bg-[#181c2b]/80 border-2 border-[#00fff7] rounded-2xl p-6 font-mono text-[#00fff7] shadow-[0_0_20px_#00fff7] mx-auto w-full backdrop-blur-md transition-transform duration-200 hover:scale-105 focus-within:scale-105">
          <h3 className="text-xl font-bold mb-2">MVP Usuario</h3>
          {mvpUser ? (
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold mb-1">{mvpUser.username}</span>
              <span className="text-lg">{mvpUser.points} pts</span>
            </div>
          ) : <span className="text-[#ff3b3b]">Sin datos</span>}
        </div>
      </section>

      {/* Últimas vulnerabilidades */}
      <section className="w-full max-w-6xl mx-auto mb-10 flex justify-center">
        <div
          className="bg-gradient-to-br from-black/70 to-[#0ff0fc]/30 border-2 border-[#00fff7] rounded-2xl p-6 font-mono text-[#00fff7] shadow-lg cursor-pointer transition hover:scale-105 w-full mx-auto backdrop-blur-md"
          onClick={() => navigate('/gulag')}
        >
          <h2 className="text-2xl font-bold mb-4">Gulag</h2>
          <ul className="space-y-2">
            {vulns.slice(0, 5).map(vuln => (
              <li key={vuln._id} className="flex flex-col md:flex-row md:justify-between md:items-center border-b border-[#00fff7]/30 pb-2">
                <span className="font-bold">{vuln.title}</span>
                <span className="text-sm text-[#39ff14]">{vuln.severity}</span>
                <span className="text-xs text-[#00fff7]">{new Date(vuln.createdAt).toLocaleDateString()}</span>
              </li>
            ))}
            {vulns.length === 0 && <li className="text-[#ff3b3b]">No hay vulnerabilidades recientes.</li>}
          </ul>
        </div>
      </section>

      {/* Botón de tienda */}
      <div className="flex justify-center items-center mt-6 w-full">
        <div className="w-full md:w-2/3 lg:w-1/2 bg-black/80 border-2 border-[#00fff7] rounded-2xl flex justify-center py-8 font-mono text-[#00fff7] transition-transform duration-200 hover:scale-105 hover:shadow-[0_0_32px_#00fff7] mx-auto backdrop-blur-md">
          <button
            className="px-8 py-3 bg-black border-2 border-[#00fff7] rounded-xl text-[#00fff7] font-bold text-xl shadow-[0_0_8px_#00fff7] transition hover:bg-[#00fff7] hover:text-black"
            onClick={() => navigate('/store')}
          >
            Ir a la Tienda
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 