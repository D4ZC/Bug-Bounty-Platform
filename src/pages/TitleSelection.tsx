import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Checkmark } from '@carbon/icons-react';
import { useTranslation } from 'react-i18next';

const TitleSelection: React.FC = () => {
  const { t } = useTranslation();
  const [titles, setTitles] = useState<string[]>([]);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiTimeout = useRef<NodeJS.Timeout | null>(null);

  // NUEVO: estados para búsqueda y filtro
  const [search, setSearch] = useState('');
  const [showOnlyUnlocked, setShowOnlyUnlocked] = useState(false);

  // Simular títulos desbloqueados
  const unlockedTitles = [t('Cazador de Bugs'), t('Pentester')];

  useEffect(() => {
    // Simular carga de títulos
    const mockTitles = [t('Cazador de Bugs'), t('Pentester'), t('MVP')];
    setTitles(mockTitles);
    setLoading(false);
  }, [t]);

  // NUEVO: lógica de filtrado
  const filteredTitles = titles.filter(title => {
    const matchesSearch = title.toLowerCase().includes(search.toLowerCase());
    const matchesUnlocked = showOnlyUnlocked ? unlockedTitles.includes(title) : true;
    return matchesSearch && matchesUnlocked;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-app text-app flex items-center justify-center">
        <div className="text-xl animate-pulse">{t('Cargando títulos...')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app text-app p-8 font-mono relative overflow-hidden">
      {/* Barra de búsqueda y filtro */}
      <div className="w-full max-w-md mx-auto mb-8 flex flex-col md:flex-row items-center gap-4 z-20 relative">
        <input
          type="text"
          placeholder={t('Buscar título...')}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg border-2 border-cyan-400 bg-gray-900 text-white focus:outline-none focus:border-yellow-400 w-full md:w-72 shadow"
        />
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showOnlyUnlocked}
            onChange={e => setShowOnlyUnlocked(e.target.checked)}
            className="accent-cyan-500"
          />
          <span className="text-cyan-200 text-sm">{t('Solo desbloqueados')}</span>
        </label>
      </div>
      {/* Títulos filtrados */}
      <div className="flex flex-col gap-6">
        {filteredTitles.map((title, index) => {
          const unlocked = unlockedTitles.includes(title);
          return (
            <div
              key={title}
              className={`relative p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 cursor-pointer animate-pop-in glass-effect shadow-lg ${
                unlocked
                  ? selectedTitle === title
                    ? 'bg-gradient-to-br from-cyan-600/60 via-cyan-600/60 to-blue-600/60 border-yellow-400 shadow-2xl shadow-cyan-500/50 animate-glow scale-105'
                    : 'bg-gradient-to-br from-gray-800/60 via-blue-900/60 to-gray-900/60 border-cyan-500/30 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25'
                  : 'bg-gradient-to-br from-gray-800/30 via-gray-700/30 to-gray-900/30 border-gray-600/50 opacity-50 cursor-not-allowed'
              }`}
              onClick={() => unlocked && setSelectedTitle(title)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-center flex flex-col items-center">
                <h3 className="text-base font-bold text-cyan-200 text-shadow-lg">{title}</h3>
                {title === t('MVP') && <span className="badge badge-warning mt-1 animate-float">MVP</span>}
                {title === t('Pentester') && <span className="badge badge-primary mt-1 animate-float">Pro</span>}
              </div>
              {selectedTitle === title && (
                <div className="absolute top-2 right-2 w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce border-2 border-white shadow-lg">
                  <Checkmark size={16} className="text-white" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TitleSelection; 