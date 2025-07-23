import React, { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Team, User, Vulnerability } from '@/types';
import apiService from '@/services/api';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import Bar3DChart from './Bar3DChart';
import { useBackground } from '../../contexts/BackgroundContext';

// Datos de ejemplo para OCAMPO
const d4zcProfile = {
  name: 'OCAMPO',
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
  const { backgroundUrl } = useBackground();

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
    <div className="min-h-screen w-full font-mono text-white" style={{ background: backgroundUrl ? `url(${backgroundUrl}) center/cover no-repeat` : 'linear-gradient(to bottom right, #0a183d, #1a0033, #2d003e)' }}>
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col gap-10">
        {/* Header */}
        <header className="flex flex-col items-center gap-2 mb-8">
          <h1 className="text-5xl font-extrabold text-[#00fff7] drop-shadow-[0_0_16px_#00fff7] tracking-wide mb-1">Bug Bounty Platform</h1>
          <p className="text-xl text-[#39ff14] font-mono tracking-wide">¡Bienvenido cazador! Explora, compite y gana recompensas.</p>
        </header>
        {/* Resumen rápido */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
          <div className="bg-[#181c2b]/80 border-2 border-[#00fff7] rounded-2xl p-6 flex flex-col items-center shadow-[0_0_24px_#00fff7]">
            <span className="text-3xl font-bold text-[#00fff7] mb-1">{users.length}</span>
            <span className="text-sm text-gray-300">Usuarios</span>
          </div>
          <div className="bg-[#181c2b]/80 border-2 border-[#a259ff] rounded-2xl p-6 flex flex-col items-center shadow-[0_0_24px_#a259ff]">
            <span className="text-3xl font-bold text-[#a259ff] mb-1">{teams.length}</span>
            <span className="text-sm text-gray-300">Equipos</span>
          </div>
          <div className="bg-[#181c2b]/80 border-2 border-[#39ff14] rounded-2xl p-6 flex flex-col items-center shadow-[0_0_24px_#39ff14]">
            <span className="text-3xl font-bold text-[#39ff14] mb-1">{vulns.length}</span>
            <span className="text-sm text-gray-300">Vulnerabilidades</span>
          </div>
        </div>
        {/* Tarjeta OCAMPO con radar chart funcional */}
        <div
          className="max-w-2xl w-full bg-[#181c2b]/80 border-2 border-[#00fff7] rounded-2xl p-8 text-[#00fff7] shadow-[0_0_32px_#00fff7] flex flex-col md:flex-row items-center gap-8 mx-auto cursor-pointer hover:scale-105 transition backdrop-blur-md"
          onClick={() => navigate('/profile')}
          role="button"
          tabIndex={0}
          onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') navigate('/profile'); }}
        >
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
                  <Radar name="OCAMPO" dataKey="value" stroke="#39ff14" fill="#00fff7" fillOpacity={0.5} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        {/* Rankings y MVPs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[#181c2b] to-[#232b36] border-2 border-[#00fff7] rounded-2xl p-6 shadow-[0_0_20px_#00fff7] transition-transform duration-200 hover:scale-105 focus-within:scale-105 cursor-pointer" onClick={() => navigate('/ranking-equipos')}>
            <h2 className="text-2xl font-bold text-[#00fff7] mb-4">Top Equipos</h2>
            <div className="w-full h-32 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topTeams} margin={{ top: 20, right: 20, left: 0, bottom: 0 }} barCategoryGap={30}>
                  <XAxis dataKey="name" stroke="#00fff7" tick={{ fill: '#00fff7', fontFamily: 'monospace', fontWeight: 'bold' }} />
                  <YAxis stroke="#00fff7" tick={{ fill: '#00fff7', fontFamily: 'monospace', fontWeight: 'bold' }} />
                  <Tooltip cursor={{ fill: '#00fff7', opacity: 0.08 }} contentStyle={{ background: '#181c2b', border: '1px solid #00fff7', color: '#00fff7', fontFamily: 'monospace' }} />
                  <Bar dataKey="points" radius={[0, 0, 0, 0]} isAnimationActive animationDuration={1200} animationEasing="ease-out" minPointSize={5} >
                    <LabelList dataKey="points" position="top" fill="#fff" fontWeight="bold" fontFamily="monospace" />
                    {topTeams.map((_, idx) => (
                      <Cell key={`cell-${idx}`} fill={
                        typeof (idx === 0 ? '#6f1e9c' : idx === 1 ? '#a259ff' : '#d1aaff') === 'string'
                          ? (idx === 0 ? '#6f1e9c' : idx === 1 ? '#a259ff' : '#d1aaff')
                          : undefined
                      } />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#181c2b] to-[#232b36] border-2 border-[#a259ff] rounded-2xl p-6 shadow-[0_0_20px_#a259ff] transition-transform duration-200 hover:scale-105 focus-within:scale-105 cursor-pointer" onClick={() => navigate('/ranking-usuarios')}>
            <h2 className="text-2xl font-bold text-[#a259ff] mb-4">Top Usuarios</h2>
            <div className="w-full h-32 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topUsers} margin={{ top: 20, right: 20, left: 0, bottom: 0 }} barCategoryGap={30}>
                  <XAxis dataKey="username" stroke="#a259ff" tick={{ fill: '#a259ff', fontFamily: 'monospace', fontWeight: 'bold' }} />
                  <YAxis stroke="#a259ff" tick={{ fill: '#a259ff', fontFamily: 'monospace', fontWeight: 'bold' }} />
                  <Tooltip cursor={{ fill: '#a259ff', opacity: 0.08 }} contentStyle={{ background: '#181c2b', border: '1px solid #a259ff', color: '#a259ff', fontFamily: 'monospace' }} />
                  <Bar dataKey="points" radius={[0, 0, 0, 0]} isAnimationActive animationDuration={1200} animationEasing="ease-out" minPointSize={5} >
                    <LabelList dataKey="points" position="top" fill="#fff" fontWeight="bold" fontFamily="monospace" />
                    {topUsers.map((_, idx) => (
                      <Cell key={`cell-user-${idx}`} fill={
                        typeof (idx === 0 ? '#6f1e9c' : idx === 1 ? '#a259ff' : '#d1aaff') === 'string'
                          ? (idx === 0 ? '#6f1e9c' : idx === 1 ? '#a259ff' : '#d1aaff')
                          : undefined
                      } />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        {/* MVP Equipo y Gulag en la misma fila */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center bg-[#181c2b]/80 border-2 border-[#00fff7] rounded-2xl p-6 text-[#00fff7] shadow-[0_0_20px_#00fff7] mx-auto w-full backdrop-blur-md transition-transform duration-200 hover:scale-105 focus-within:scale-105 cursor-pointer" onClick={() => navigate('/mvp')}>
            <h3 className="text-xl font-bold mb-2">MVP Equipo</h3>
            {mvpTeam ? (
              <div className="flex flex-col items-center">
                <span className="text-3xl font-extrabold mb-1">{mvpTeam.name}</span>
                <span className="text-lg">{mvpTeam.points} pts</span>
              </div>
            ) : <span className="text-[#ff3b3b]">Sin datos</span>}
          </div>
          <div className="flex flex-col items-center bg-[#181c2b]/80 border-2 border-[#00fff7] rounded-2xl p-6 text-[#00fff7] shadow-[0_0_20px_#00fff7] mx-auto w-full backdrop-blur-md transition-transform duration-200 hover:scale-105 focus-within:scale-105 cursor-pointer" onClick={() => navigate('/gulag')}>
            <h3 className="text-xl font-bold mb-2">Gulag</h3>
            <ul className="space-y-2 w-full">
              {vulns.slice(0, 5).map(vuln => (
                <li key={vuln._id} className="flex flex-col md:flex-row md:justify-between md:items-center border-b border-[#00fff7]/30 pb-2 w-full">
                  <span className="font-bold">{vuln.title}</span>
                  <span className="text-sm text-[#39ff14]">{vuln.severity}</span>
                  <span className="text-xs text-[#00fff7]">{new Date(vuln.createdAt).toLocaleDateString()}</span>
                </li>
              ))}
              {vulns.length === 0 && (
                <li className="w-full max-w-full flex flex-col items-center justify-center p-6">
                  <span className="text-5xl mb-4 animate-pulse">
                    <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
                      <path d="M24 4v8M24 36v8M8 24h8M32 24h8M12.2 12.2l5.6 5.6M30.2 30.2l5.6 5.6M12.2 35.8l5.6-5.6M30.2 17.8l5.6-5.6" stroke="#00fff7" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="24" cy="24" r="10" fill="#181c2b" stroke="#00fff7" strokeWidth="2"/>
                      <circle cx="20" cy="22" r="2" fill="#ff3b3b"/>
                      <circle cx="28" cy="22" r="2" fill="#ff3b3b"/>
                    </svg>
                  </span>
                  <h2 className="text-2xl font-extrabold text-[#00fff7] mb-2 drop-shadow-[0_0_8px_#00fff7] font-mono">Gulag</h2>
                  <p className="text-lg text-[#ff3b3b] font-mono animate-fade-in-up">¡Sin desafíos en el Gulag por ahora!</p>
                </li>
              )}
            </ul>
          </div>
        </div>
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
    </div>
  );
};

export default Dashboard; 