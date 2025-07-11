import React from 'react';
import { useTranslation } from 'react-i18next';

// Simulación de datos de ranking mensual
const mockRanking = Array.from({ length: 50 }, (_, i) => ({
  name: `Player${i + 1}`,
  score: Math.floor(Math.random() * 10000),
})).sort((a, b) => b.score - a.score);

function getRankTier(index: number) {
  if (index < 5) return { label: 'DIAMANTE', color: 'text-cyan-300', bg: 'bg-cyan-900/40' };
  if (index < 15) return { label: 'ORO', color: 'text-yellow-300', bg: 'bg-yellow-900/30' };
  if (index < 30) return { label: 'PLATA', color: 'text-gray-200', bg: 'bg-gray-700/40' };
  return { label: 'BRONCE', color: 'text-orange-400', bg: 'bg-orange-900/30' };
}

const MensualRanking: React.FC = () => {
  const { t } = useTranslation();
  // Filtrar solo los jugadores Diamante (top 5)
  const diamondPlayers = mockRanking.slice(0, 5);

  return (
    <div className="min-h-screen bg-app text-app p-8 font-mono flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-10 text-cyan-400 text-center tracking-widest">{t('Ranking Mensual')}</h1>
      <div className="w-full max-w-2xl mt-4 border border-cyan-700 rounded-xl p-6 bg-card">
        <h2 className="text-cyan-400 text-lg font-bold mb-4 tracking-wide">{t('TOP 5 DEL MES')}</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-cyan-100">
            <thead>
              <tr className="border-b border-cyan-700">
                <th className="py-2 px-4 text-cyan-400 font-semibold tracking-wider">#</th>
                <th className="py-2 px-4 text-cyan-400 font-semibold tracking-wider">{t('PLAYER')}</th>
                <th className="py-2 px-4 text-cyan-400 font-semibold tracking-wider">{t('SCORE')}</th>
                <th className="py-2 px-4 text-cyan-400 font-semibold tracking-wider">{t('RANK')}</th>
              </tr>
            </thead>
            <tbody>
              {diamondPlayers.map((player, i) => {
                const tier = getRankTier(i);
                return (
                  <tr key={player.name} className={`border-b border-cyan-800 ${tier.bg} hover:bg-cyan-900/20 transition`}>
                    <td className="py-2 px-4 font-bold text-cyan-300">{i + 1}</td>
                    <td className="py-2 px-4 font-bold">{player.name}</td>
                    <td className="py-2 px-4">{player.score}</td>
                    <td className={`py-2 px-4 font-bold uppercase ${tier.color}`}>{t(tier.label)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MensualRanking;
