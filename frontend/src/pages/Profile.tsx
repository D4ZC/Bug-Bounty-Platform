import React, { useEffect, useState } from 'react';
import { UserAvatarFilledAlt } from '@carbon/icons-react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// Mock de usuario
const MOCK_USER = {
  name: 'user_1',
  team: 'TEAM',
  avatar: '', // Si quieres usar una imagen, pon la URL aquí
};

const FILES_KEY = 'files';
const BUGPOINTS_KEY = 'bugpoints';
const UNLOCKED_KEY = 'unlocked_files';

const initLocalStorage = () => {
  if (!localStorage.getItem(BUGPOINTS_KEY)) localStorage.setItem(BUGPOINTS_KEY, '5000');
  if (!localStorage.getItem(UNLOCKED_KEY)) localStorage.setItem(UNLOCKED_KEY, '[]');
};

const getStats = () => {
  const bugpoints = parseInt(localStorage.getItem(BUGPOINTS_KEY) || '0', 10);
  const unlocked = JSON.parse(localStorage.getItem(UNLOCKED_KEY) || '[]');
  const files = JSON.parse(localStorage.getItem(FILES_KEY) || '[]');
  return {
    bugpoints,
    unlockedCount: unlocked.length,
    totalFiles: files.length,
    spent: 5000 - bugpoints,
  };
};

const radarData = {
  labels: ['SQLi', 'XSS', 'CSRF', 'RCE', 'IDOR', 'Open Redirect'],
  datasets: [
    {
      label: 'Skill Level',
      data: [80, 65, 70, 60, 75, 50],
      backgroundColor: 'rgba(234, 179, 8, 0.2)',
      borderColor: 'rgba(234, 179, 8, 1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(234, 179, 8, 1)',
    },
  ],
};

const radarOptions = {
  scales: {
    r: {
      angleLines: { display: false },
      suggestedMin: 0,
      suggestedMax: 100,
      pointLabels: { color: '#eab308', font: { size: 14 }, backdropColor: 'transparent', display: true },
      grid: { color: '#eab30833' },
      ticks: { color: '#eab308', stepSize: 20 },
    },
  },
  plugins: {
    legend: { display: false },
  },
};

// Lista de insignias
const INSIGNIAS = [
  {
    src: '/img/helper-removebg-preview.png',
    alt: 'Helper Badge',
    tooltip: 'Badge awarded to the user who has helped other teams the most',
  },
  {
    src: '/img/hacker-removebg-preview.png',
    alt: 'Hacker Badge',
    tooltip: 'Badge awarded to the user who has solved every difficulty type',
  },
  {
    src: '/img/free-removebg-preview.png',
    alt: 'Free Badge',
    tooltip: 'Badge awarded to the team that has achieved zero vulnerabilities in 3 projects',
  },
];

const Profile: React.FC = () => {
  const [stats, setStats] = useState(getStats());

  useEffect(() => {
    initLocalStorage();
    setStats(getStats());
    // Escuchar cambios en bugpoints/unlocked_files
    const onStorage = () => setStats(getStats());
    window.addEventListener('storage', onStorage);
    window.addEventListener('bugpoints-updated', onStorage);
    window.addEventListener('unlocked-updated', onStorage);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('bugpoints-updated', onStorage);
      window.removeEventListener('unlocked-updated', onStorage);
    };
  }, []);

  return (
    <div className="flex justify-center items-start min-h-[60vh] pt-16 pb-20 bg-gradient-to-b from-transparent to-white/30 dark:to-gray-900/30">
      <div className="relative w-full max-w-4xl flex flex-row items-start bg-white/60 dark:bg-gray-900/60 rounded-3xl shadow-2xl border border-yellow-100 dark:border-yellow-900 px-0 py-0">
        {/* Avatar a la izquierda, centrado verticalmente */}
        <div className="flex flex-col items-center justify-center min-w-[180px] max-w-[200px] h-full py-10 pl-8 pr-4">
          <div className="w-40 h-40 rounded-full border-4 border-yellow-500 overflow-hidden flex items-center justify-center bg-gray-900 shadow-lg">
            {MOCK_USER.avatar ? (
              <img src={MOCK_USER.avatar} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <UserAvatarFilledAlt size={110} className="text-yellow-400" />
            )}
          </div>
          <div className="mt-6 text-center">
            <div className="font-bold text-xl text-yellow-300 mb-1">{MOCK_USER.name}</div>
            <div className="text-gray-200 text-base">{MOCK_USER.team}</div>
          </div>
        </div>
        {/* Stats y insignias */}
        <div className="flex-1 flex flex-col justify-start gap-4 pt-10 pb-10 pl-2 pr-8">
          {/* Stats horizontal */}
          <div className="flex flex-row items-center justify-between gap-8 bg-transparent">
            <div className="flex flex-col items-center min-w-[120px]">
              <span className="text-yellow-500 font-bold text-2xl">{stats.bugpoints}</span>
              <span className="text-gray-200 text-sm">BugPoints</span>
            </div>
            <div className="flex flex-col items-center min-w-[120px]">
              <span className="text-blue-400 font-bold text-2xl">{stats.unlockedCount}</span>
              <span className="text-gray-200 text-sm">Archivos desbloqueados</span>
            </div>
            <div className="flex flex-col items-center min-w-[120px]">
              <span className="text-green-400 font-bold text-2xl">{stats.spent}</span>
              <span className="text-gray-200 text-sm">BugPoints gastados</span>
            </div>
            <div className="flex flex-col items-center min-w-[120px]">
              <span className="text-gray-200 font-bold text-2xl">{stats.totalFiles}</span>
              <span className="text-gray-200 text-sm">Archivos totales</span>
            </div>
          </div>
          {/* Insignias (INSIGNS) y Radar en la misma fila */}
          <div className="mt-6 mb-2 w-full flex flex-row items-center gap-8">
            {/* Insignias */}
            <div className="rounded-md px-6 py-4 min-h-[60px] max-w-[420px] bg-transparent">
              <div className="flex flex-row gap-6 items-center justify-start flex-wrap">
                {INSIGNIAS.map((insignia, idx) => {
                  const [showTooltip, setShowTooltip] = useState(false);
                  return (
                    <div
                      key={insignia.src}
                      className="relative flex items-center"
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      <img
                        src={insignia.src}
                        alt={insignia.alt}
                        className="w-20 h-20 object-contain rounded"
                        draggable={false}
                        style={{ background: 'transparent', border: 'none' }}
                      />
                      {showTooltip && (
                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-4 py-2 bg-gray-900 text-white text-sm rounded shadow-lg z-20 whitespace-nowrap pointer-events-none animate-fade-in">
                          {insignia.tooltip}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Radar poligonal perfectamente circular */}
            <div className="flex flex-col items-center justify-center">
              <div className="aspect-square w-64 flex items-center justify-center bg-gray-900 rounded-xl shadow-lg">
                <Radar data={radarData} options={radarOptions} />
              </div>
            </div>
          </div>
    </div>
    </div>
  </div>
);
};

export default Profile; 