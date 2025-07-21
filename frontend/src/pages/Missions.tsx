import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Misiones de ejemplo
const missions = [
  {
    id: 'm1',
    title: 'Resuelve tu primer reto de hacking',
    description: 'Completa cualquier reto de la plataforma para obtener tu recompensa.',
    reward: { type: 'bugcoin', amount: 100 },
    completed: false,
  },
  {
    id: 'm2',
    title: 'Reporta una vulnerabilidad',
    description: 'Envía un reporte válido de vulnerabilidad.',
    reward: { type: 'frame', name: 'Marco Exclusivo', id: 'frame_exclusive', image: '/frames/exclusive.png' },
    completed: false,
  },
  {
    id: 'm3',
    title: 'Participa en un evento especial',
    description: 'Únete a un evento de ciberseguridad y participa activamente.',
    reward: { type: 'avatar', name: 'Avatar Cyber Ninja', id: 'avatar_ninja', image: '/avatars/ninja.png' },
    completed: false,
  },
  {
    id: 'm4',
    title: 'Gana 500 bugcoins',
    description: 'Acumula al menos 500 bugcoins en tu cuenta.',
    reward: { type: 'bugcoin', amount: 200 },
    completed: false,
  },
  {
    id: 'm5',
    title: 'Desbloquea el título "Cazador de Bugs"',
    description: 'Consigue el título especial completando 5 retos diferentes.',
    reward: { type: 'title', name: 'Cazador de Bugs', id: 'title_bug_hunter' },
    completed: false,
  },
  {
    id: 'm6',
    title: 'Encuentra una vulnerabilidad crítica',
    description: 'Reporta una vulnerabilidad de severidad crítica.',
    reward: { type: 'bugcoin', amount: 500 },
    completed: false,
  },
];

const getInitialInventory = () => {
  try {
    const inv = localStorage.getItem('user_inventory');
    return inv ? JSON.parse(inv) : { frames: [], avatars: [], titles: [], backgrounds: [], bluepoints: 0 };
  } catch {
    return { frames: [], avatars: [], titles: [], backgrounds: [], bluepoints: 0 };
  }
};

const Missions: React.FC = () => {
  const { t } = useTranslation();
  const [userMissions, setUserMissions] = useState(missions);
  const [inventory, setInventory] = useState(getInitialInventory);
  const [bugcoins, setBugcoins] = useState(() => Number(localStorage.getItem('bugcoins')) || 1000);

  const updateInventory = (newInventory: any) => {
    setInventory(newInventory);
    localStorage.setItem('user_inventory', JSON.stringify(newInventory));
  };
  const updateBugcoins = (amount: number) => {
    setBugcoins(amount);
    localStorage.setItem('bugcoins', String(amount));
  };

  const handleComplete = (id: string) => {
    setUserMissions(prev => prev.map(m => m.id === id ? { ...m, completed: true } : m));
    const mission = userMissions.find(m => m.id === id);
    if (!mission) return;
    // Recompensa de bugcoin
    if (mission.reward.type === 'bugcoin' && typeof mission.reward.amount === 'number') {
      updateBugcoins(bugcoins + mission.reward.amount);
    }
    // Recompensa de frame/avatar/title
    if (['frame', 'avatar', 'title', 'background'].includes(mission.reward.type)) {
      const key = mission.reward.type + (mission.reward.type === 'background' ? 's' : 's');
      if (!inventory[key].includes(mission.reward.id)) {
        const newInventory = { ...inventory, [key]: [...inventory[key], mission.reward.id] };
        updateInventory(newInventory);
      }
    }
    alert(t('¡Misión completada! Recompensa obtenida.'));
  };

  return (
    <div className="min-h-screen bg-app text-app p-8 font-mono">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          {t('Misiones de Ciberseguridad')}
        </h1>
        <div className="grid grid-cols-1 gap-6">
          {userMissions.map(mission => (
            <div key={mission.id} className={`p-6 rounded-xl border-2 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 ${mission.completed ? 'bg-gradient-to-r from-green-400/30 to-blue-400/30 border-green-400' : 'bg-card border-cyan-400'}`}>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2 text-cyan-300">{t(mission.title)}</h2>
                <p className="text-cyan-100 mb-2">{t(mission.description)}</p>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-green-300">{t('Recompensa')}:</span>
                  {mission.reward.type === 'bugcoin' && (
                    <span className="flex items-center gap-1 text-yellow-300 font-bold">+{mission.reward.amount}</span>
                  )}
                  {mission.reward.type === 'frame' && (
                    <span className="flex items-center gap-1 text-green-300 font-bold">{t('Marco')}: <img src={mission.reward.image} alt={mission.reward.name} className="w-8 h-8 inline rounded-full border-2 border-green-400" /></span>
                  )}
                  {mission.reward.type === 'avatar' && (
                    <span className="flex items-center gap-1 text-blue-300 font-bold">{t('Avatar')}: <img src={mission.reward.image} alt={mission.reward.name} className="w-8 h-8 inline rounded-full border-2 border-blue-400" /></span>
                  )}
                  {mission.reward.type === 'title' && (
                    <span className="flex items-center gap-1 text-cyan-300 font-bold">{t('Título')}: {mission.reward.name}</span>
                  )}
                </div>
              </div>
              <div>
                {mission.completed ? (
                  <span className="px-4 py-2 rounded-lg bg-green-500 text-white font-bold">{t('Completada')}</span>
                ) : (
                  <button
                    onClick={() => handleComplete(mission.id)}
                    className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-bold transition-all duration-200"
                  >
                    {t('Completar')}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Missions; 