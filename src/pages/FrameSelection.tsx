import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Checkmark } from '@carbon/icons-react';
import { useTranslation } from 'react-i18next';

interface Frame {
  id: string;
  name: string;
  image: string;
  unlocked: boolean;
}

const FrameSelection: React.FC = () => {
  const { t } = useTranslation();
  const [frames, setFrames] = useState<Frame[]>([]);
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiTimeout = useRef<NodeJS.Timeout | null>(null);

  // NUEVO: estados para búsqueda y filtro
  const [search, setSearch] = useState('');
  const [showOnlyUnlocked, setShowOnlyUnlocked] = useState(false);

  useEffect(() => {
    // Simular carga de marcos
    const mockFrames: Frame[] = [
      { id: 'frame1', name: t('Marco Verde'), image: '/frames/green.png', unlocked: true },
      { id: 'frame2', name: t('Marco Dorado'), image: '/frames/gold.png', unlocked: true },
      { id: 'frame3', name: t('Marco Platino'), image: '/frames/platinum.png', unlocked: false },
    ];
    setFrames(mockFrames);
    setLoading(false);
  }, [t]);

  // NUEVO: lógica de filtrado
  const filteredFrames = frames.filter(frame => {
    const matchesSearch = frame.name.toLowerCase().includes(search.toLowerCase());
    const matchesUnlocked = showOnlyUnlocked ? frame.unlocked : true;
    return matchesSearch && matchesUnlocked;
  });

  // Categorías de marcos
  const categories = [
    { key: 'default', label: t('Por Defecto'), color: 'from-cyan-500 to-cyan-700' },
    { key: 'premium', label: t('Premium'), color: 'from-yellow-500 to-yellow-700' },
    { key: 'special', label: t('Especial'), color: 'from-pink-500 to-pink-700' },
  ];
  const getCategory = (frame: Frame) => {
    if (frame.id === 'frame2') return 'premium';
    if (frame.id === 'frame3') return 'special';
    return 'default';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-app text-app flex items-center justify-center">
        <div className="text-xl animate-pulse">{t('Cargando marcos...')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app text-app p-8 font-mono relative overflow-hidden">
      {/* Barra de búsqueda y filtro */}
      <div className="w-full max-w-3xl mx-auto mb-8 flex flex-col md:flex-row items-center gap-4 z-20 relative">
        <input
          type="text"
          placeholder={t('Buscar marco...')}
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
      {/* Visualización por categorías */}
      {categories.map(cat => {
        const catFrames = filteredFrames.filter(f => getCategory(f) === cat.key);
        if (catFrames.length === 0) return null;
        return (
          <div key={cat.key} className="mb-8">
            <div className="flex items-center mb-4">
              <div className={`w-4 h-4 bg-gradient-to-r ${cat.color} rounded-full mr-3 animate-pulse`}></div>
              <h2 className="text-2xl font-bold text-gradient drop-shadow-lg tracking-wide">{cat.label}</h2>
              <span className="ml-4 text-sm text-gray-400">
                ({catFrames.filter(f => f.unlocked).length}/{catFrames.length} {t('desbloqueados')})
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {catFrames.map((frame, index) => (
                <div
                  key={frame.id}
                  className={`relative p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-110 cursor-pointer animate-pop-in glass-effect shadow-lg ${
                    frame.unlocked
                      ? selectedFrame === frame.id
                        ? 'bg-gradient-to-br from-cyan-600/60 via-cyan-600/60 to-blue-600/60 border-yellow-400 shadow-2xl shadow-cyan-500/50 animate-glow scale-105'
                        : 'bg-gradient-to-br from-gray-800/60 via-blue-900/60 to-gray-900/60 border-cyan-500/30 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25'
                      : 'bg-gradient-to-br from-gray-800/30 via-gray-700/30 to-gray-900/30 border-gray-600/50 opacity-50 cursor-not-allowed'
                  }`}
                  onClick={() => handleFrameSelect(frame.id)}
                  title={frame.unlocked ? t('Selecciona este marco') : t('Desbloquea este marco para usarlo')}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Frame Image */}
                  <div className="flex justify-center mb-3">
                    <div className={`w-24 h-24 rounded-2xl border-4 flex items-center justify-center transition-all duration-300 ${
                      frame.unlocked
                        ? selectedFrame === frame.id
                          ? 'border-yellow-400 bg-gradient-to-br from-cyan-600 to-blue-600 animate-glow scale-110'
                          : 'border-cyan-400 bg-gradient-to-br from-cyan-600 to-blue-600'
                        : 'border-gray-600 bg-gradient-to-br from-gray-700 to-gray-800'
                    }`}>
                      {frame.unlocked ? (
                        <img src={frame.image} alt={frame.name} className="w-20 h-20 object-contain rounded-xl shadow-lg" />
                      ) : (
                        <div className="text-3xl opacity-50">🔒</div>
                      )}
                    </div>
                  </div>
                  {/* Frame Name y Badge */}
                  <div className="text-center flex flex-col items-center">
                    <h3 className={`text-base font-bold ${frame.unlocked ? 'text-cyan-200' : 'text-gray-400'} text-shadow-lg`}>{frame.name}</h3>
                    {frame.id === 'frame2' && <span className="badge badge-warning mt-1 animate-float">Premium</span>}
                    {frame.id === 'frame3' && <span className="badge badge-primary mt-1 animate-float">Special</span>}
                  </div>
                  {/* Selection Indicator */}
                  {selectedFrame === frame.id && frame.unlocked && (
                    <div className="absolute top-2 right-2 w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce border-2 border-white shadow-lg">
                      <Checkmark size={16} className="text-white" />
                    </div>
                  )}
                  {/* Lock Icon for locked frames */}
                  {!frame.unlocked && (
                    <div className="absolute top-2 right-2 w-7 h-7 bg-gray-600 rounded-full flex items-center justify-center border-2 border-white shadow">
                      <div className="text-lg">🔒</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FrameSelection; 