import React, { useState, useRef } from 'react';
import TeamsScoreCard from './components/TeamsScoreCard';
import MVPTeamCard from './components/MVPTeamCard';
import GulagCard from './components/GulagCard';
import UserScoreCard from './components/UserScoreCard';
import MVPUserCard from './components/MVPUserCard';
import UserProfileCard from './components/UserProfileCard';
import { Image, BorderFull, PaintBrush } from '@carbon/icons-react';

const rewardsPreview = [
  {
    icon: <Image size={32} className="text-blue-400" />,
    title: 'Banner',
    bg: 'bg-blue-100',
  },
  {
    icon: <BorderFull size={32} className="text-green-400" />,
    title: 'Marco',
    bg: 'bg-green-100',
  },
  {
    icon: <PaintBrush size={32} className="text-purple-400" />,
    title: 'Fondo',
    bg: 'bg-purple-100',
  },
];

const teams = [
  { name: 'Warriors of Sunlight', score: 2000 },
  { name: 'Darkwraiths', score: 1900 },
  { name: 'Blades of the Darkmoon', score: 1500 },
  { name: 'Way of Blue', score: 1400 },
  { name: 'Blue Sentinels', score: 1300 },
  { name: 'Aldrich Faithful', score: 1200 },
  { name: 'Watchdogs of Farron', score: 1100 },
  { name: 'Rosaria’s Fingers', score: 1000 },
];
const users = [
  { name: 'Solaire of Astora', score: 2100 },
  { name: 'Siegmeyer of Catarina', score: 1800 },
  { name: 'Knight Lautrec', score: 1700 },
  { name: 'Big Hat Logan', score: 1600 },
  { name: 'Oscar of Astora', score: 1500 },
  { name: 'Patches', score: 1400 },
  { name: 'Gwynevere', score: 1300 },
  { name: 'Gwyndolin', score: 1200 },
  { name: 'Andre of Astora', score: 1150 },
  { name: 'Shiva of the East', score: 1100 },
  { name: 'Domhnall of Zena', score: 1050 },
  { name: 'Laurentius', score: 1000 },
  { name: 'Quelaag’s Sister', score: 950 },
  { name: 'Havel the Rock', score: 900 },
  { name: 'Chester', score: 850 },
  { name: 'Crestfallen Warrior', score: 800 },
  { name: 'Vince of Thorolund', score: 750 },
  { name: 'Griggs of Vinheim', score: 700 },
];
const mvpTeam = 'Warriors of Sunlight';
const mvpUser = { name: 'Solaire of Astora', img: '', stats: { criticas: 12, altas: 22, medianas: 35, bajas: 10, total: 79 } };
const gulag = [
  { name: 'Chester', score: 850, img: '', stats: { criticas: 2, altas: 4, medianas: 3, bajas: 1, total: 10 } },
  { name: 'Crestfallen Warrior', score: 800, img: '', stats: { criticas: 1, altas: 2, medianas: 4, bajas: 2, total: 9 } },
  { name: 'Vince of Thorolund', score: 750, img: '', stats: { criticas: 0, altas: 1, medianas: 2, bajas: 3, total: 6 } },
];

const Dashboard: React.FC = () => {
  const [showRewards, setShowRewards] = useState(false);
  const timerRef = useRef<number | null>(null);

  const handleEnter = () => {
    timerRef.current = window.setTimeout(() => setShowRewards(true), 500);
  };
  const handleLeave = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setShowRewards(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 md:px-6 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Primera fila */}
        <TeamsScoreCard teams={teams.slice(0, 5)} />
        <MVPTeamCard team={mvpTeam} />
        <GulagCard gulag={gulag} />
        {/* Segunda fila */}
        <UserScoreCard users={users.slice(0, 5)} />
        <MVPUserCard user={mvpUser} />
        <UserProfileCard user={mvpUser} />
      </div>
      {/* Botón de tienda con popover de recompensas, igual a la imagen */}
      <div className="flex justify-center items-center mt-10">
        <div className="w-full md:w-2/3 lg:w-1/2 bg-gray-50 border border-gray-200 rounded-xl shadow-sm flex justify-center py-12 relative">
          <div
            className="relative"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            onFocus={handleEnter}
            onBlur={handleLeave}
            tabIndex={0}
          >
            <button
              className="text-lg font-semibold text-gray-800"
            >
              Visit Store
            </button>
            {showRewards && (
              <div className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-full z-20 flex gap-4 p-4 bg-white border border-gray-200 rounded-xl shadow-xl animate-fade-in min-w-[340px]">
                {rewardsPreview.map((reward, idx) => (
                  <div key={idx} className={`flex flex-col items-center justify-center rounded-xl shadow-sm p-4 w-[110px] h-[110px] ${reward.bg}`}>
                    {reward.icon}
                    <span className="mt-2 text-xs font-semibold text-gray-700 text-center">{reward.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 