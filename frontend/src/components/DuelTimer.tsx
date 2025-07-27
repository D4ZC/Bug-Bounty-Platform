import React from 'react';
import { useDuel } from '../contexts/DuelContext';

const DuelTimer: React.FC = () => {
  const { showDuelTimer, duelTimer } = useDuel();

  if (!showDuelTimer) return null;

                return (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white text-black px-4 py-2 rounded-lg shadow-lg border border-gray-300">
                  <div className="text-center">
                    <div className="text-sm font-bold">Duelo en Progreso</div>
                    <div className="text-xs">
                      {Math.floor(duelTimer / 3600)}h {Math.floor((duelTimer % 3600) / 60)}m {duelTimer % 60}s
                    </div>
                  </div>
                </div>
              );
};

export default DuelTimer; 