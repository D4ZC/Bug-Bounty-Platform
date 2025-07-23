import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useBackground } from '../contexts/BackgroundContext';

const ACCENT = '#00f7fa';

const TABS = [
  { label: 'TODOS', value: 'todos' },
  { label: 'ACTIVOS', value: 'activos' },
  { label: 'COMPLETADOS', value: 'completados' },
  { label: 'ESPERANDO', value: 'esperando' },
  { label: 'FALLIDOS', value: 'fallidos' },
];

const mockChallenges = [
  {
    id: 1,
    title: 'Desafío SQL Injection',
    points: 50,
    status: 'EN_GULAG',
    timeLeft: 150,
  },
  {
    id: 2,
    title: 'XSS Básico',
    points: 25,
    status: 'EN_GULAG',
    timeLeft: 105,
  },
  {
    id: 3,
    title: 'Desafío de Autenticación',
    points: 20,
    status: 'ESPERANDO',
    timeLeft: 320,
  },
  {
    id: 4,
    title: 'Reto de LFI',
    points: 20,
    status: 'COMPLETADO',
    timeLeft: 0,
  },
  {
    id: 5,
    title: 'Desafío de CSRF',
    points: 10,
    status: 'FALLIDO',
    timeLeft: 0,
  },
];

function getStatusProps(status: string) {
  switch (status) {
    case 'EN_GULAG':
      return { text: 'EN GULAG', color: 'text-red-500', dot: 'bg-red-500', btn: `bg-[${ACCENT}] text-black hover:bg-cyan-400`, btnText: 'VER DESAFÍO' };
    case 'COMPLETADO':
      return { text: 'COMPLETADO', color: 'text-green-400', dot: 'bg-green-400', btn: 'bg-green-500 text-white hover:bg-green-600', btnText: 'VER RESULTADO' };
    case 'ESPERANDO':
      return { text: 'ESPERANDO', color: 'text-yellow-400', dot: 'bg-yellow-400', btn: 'bg-yellow-400 text-black hover:bg-yellow-300', btnText: 'INICIAR DESAFÍO' };
    case 'FALLIDO':
      return { text: 'FALLIDO', color: 'text-gray-400', dot: 'bg-gray-400', btn: 'bg-gray-700 text-white cursor-not-allowed', btnText: 'FALLIDO' };
    default:
      return { text: status, color: 'text-gray-400', dot: 'bg-gray-400', btn: 'bg-gray-700 text-white', btnText: '...' };
  }
}

function formatTime(minutes: number) {
  if (minutes <= 0) return '0h 0m';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h${m > 0 ? m : ''}`;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'EN_GULAG': return '⏳';
    case 'COMPLETADO': return '✅';
    case 'ESPERANDO': return '⏱️';
    case 'FALLIDO': return '❌';
    default: return '❔';
  }
};

// Tabs component
const ChallengeTabs = ({ tab, setTab }: { tab: string; setTab: (t: string) => void }) => (
  <div className="flex flex-wrap gap-2 mb-8 justify-center" role="tablist" aria-label="Filtrar desafíos por estado">
    {TABS.map(t => (
      <button
        key={t.value}
        className={`px-6 py-2 rounded-lg font-bold font-mono text-base transition border-2
          ${tab === t.value
            ? 'bg-[#00f7fa] text-black border-[#00f7fa]'
            : 'bg-transparent text-[#00f7fa] border-[#00f7fa] hover:bg-[#00f7fa] hover:text-black'}
          focus:outline-none focus:ring-2 focus:ring-[#00f7fa] focus:z-10`}
        onClick={() => setTab(t.value)}
        aria-selected={tab === t.value}
        role="tab"
        tabIndex={0}
      >
        {t.label}
      </button>
    ))}
  </div>
);

// Card component
const ChallengeCard = ({ ch, onAction }: { ch: any; onAction: () => void }) => {
  const status = getStatusProps(ch.status);
  const { isDark } = useTheme();
  return (
    <div
      className={`rounded-2xl p-6 flex flex-col gap-2 border-2 w-full max-w-md transition-transform duration-200 hover:scale-[1.03] focus-within:scale-[1.03] outline-none border-cyan-300/80 backdrop-blur-md shadow-[0_0_12px_#00fff7]
        ${isDark ? 'bg-black/40' : 'bg-white/70'}`}
      role="region"
      aria-label={`Desafío: ${ch.title}`}
      tabIndex={0}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-xl text-gray-700 uppercase">
          {ch.title[0]}
        </div>
        <div className="flex-1">
          <div className="font-bold text-lg text-white">{ch.title}</div>
          <div className="text-sm" style={{ color: ACCENT }}>Puntuación: {ch.points}</div>
        </div>
        <span className={`ml-auto w-3 h-3 rounded-full ${status.dot} flex items-center justify-center`} aria-label={status.text}>
          <span className="text-lg" aria-hidden="true">{getStatusIcon(ch.status)}</span>
        </span>
      </div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm text-white">Estado:</span>
        <span className={`px-2 py-1 rounded text-xs font-bold ${status.color}`}>{status.text}</span>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm text-white">Tiempo restante:</span>
        <span className="font-mono text-base text-white">{formatTime(ch.timeLeft)}</span>
      </div>
      <div className="w-full h-2 rounded bg-gray-700 mb-3">
        <div
          className={`h-2 rounded ${status.dot}`}
          style={{ width: `${Math.min(100, Math.round((ch.timeLeft / 200) * 100))}%` }}
        ></div>
      </div>
      <button
        className={`w-full py-2 rounded-lg font-bold text-lg transition ${status.btn} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[${ACCENT}]`}
        onClick={onAction}
        disabled={ch.status !== 'EN_GULAG'}
        aria-label={status.btnText + ' ' + ch.title}
        tabIndex={0}
      >
        {status.btnText}
      </button>
    </div>
  );
};

const Gulag: React.FC = () => {
  const { isDark } = useTheme();
  const { backgroundUrl } = useBackground();
  const navigate = useNavigate();
  const [tab, setTab] = useState('todos');

  const filtered = mockChallenges.filter(ch => {
    if (tab === 'todos') return true;
    if (tab === 'activos') return ch.status === 'EN_GULAG';
    if (tab === 'completados') return ch.status === 'COMPLETADO';
    if (tab === 'esperando') return ch.status === 'ESPERANDO';
    if (tab === 'fallidos') return ch.status === 'FALLIDO';
    return true;
  });

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-10 px-2 transition-colors duration-500 font-mono" style={{ background: backgroundUrl ? `url(${backgroundUrl}) center/cover no-repeat` : 'linear-gradient(to bottom right, #0a183d, #1a0033, #2d003e)' }} aria-label="Zona de desafíos y pruebas especiales">
      <h1 className="text-4xl font-extrabold font-mono text-center mb-2 drop-shadow-[0_0_16px_#00fff7]" style={{ color: ACCENT }}>GULAG</h1>
      <p className="text-center text-lg font-mono mb-8 text-[#39ff14]">Zona de desafíos y pruebas especiales</p>
      <ChallengeTabs tab={tab} setTab={setTab} />
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto justify-items-center">
        {filtered.map(ch => (
          <ChallengeCard
            key={ch.id}
            ch={ch}
            onAction={() => {
              if (ch.status === 'EN_GULAG') navigate(`/gulag/${ch.id}`);
            }}
          />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full w-full max-w-3xl mx-auto bg-[#181c2b]/90 border-2 border-[#00fff7] rounded-3xl shadow-[0_0_48px_#00fff7] p-10 flex flex-col items-center justify-center animate-fade-in-up">
            <div className="flex flex-col items-center">
              <span className="text-5xl mb-4 animate-pulse">
                {/* Ícono SVG gamer/futurista */}
                <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
                  <path d="M24 4v8M24 36v8M8 24h8M32 24h8M12.2 12.2l5.6 5.6M30.2 30.2l5.6 5.6M12.2 35.8l5.6-5.6M30.2 17.8l5.6-5.6" stroke="#00fff7" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="24" cy="24" r="10" fill="#181c2b" stroke="#00fff7" strokeWidth="2"/>
                  <circle cx="20" cy="22" r="2" fill="#ff3b3b"/>
                  <circle cx="28" cy="22" r="2" fill="#ff3b3b"/>
                </svg>
              </span>
              <h2 className="text-3xl font-extrabold text-[#00fff7] mb-2 drop-shadow-[0_0_8px_#00fff7] font-mono">Gulag</h2>
              <p className="text-xl text-[#ff3b3b] font-mono animate-fade-in-up">¡Sin desafíos en el Gulag por ahora!</p>
              {/* <button className="mt-6 px-6 py-2 bg-[#00fff7] text-black font-bold rounded-xl shadow-lg hover:bg-[#39ff14] transition animate-glow">Ver historial</button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gulag; 