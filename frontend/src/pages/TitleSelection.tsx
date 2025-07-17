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

  useEffect(() => {
    // Simular carga de títulos
    const mockTitles = [t('Cazador de Bugs'), t('Pentester'), t('MVP')];
    setTitles(mockTitles);
    setLoading(false);
  }, [t]);

  const handleTitleSelect = (title: string) => {
    setSelectedTitle(title);
  };

  const handleSaveTitle = async () => {
    if (!selectedTitle) return;
    setSaving(true);
    setShowConfetti(true);
    if (confettiTimeout.current) clearTimeout(confettiTimeout.current);
    confettiTimeout.current = setTimeout(() => setShowConfetti(false), 2000);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Aquí iría la llamada real a la API
      // await apiService.updateTitle(selectedTitle);
      navigate('/profile-customization');
    } catch (error) {
      console.error('Error al guardar título:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-app text-app flex items-center justify-center">
        <div className="text-xl animate-pulse">{t('Cargando títulos...')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app text-app p-8 font-mono relative overflow-hidden">
      {/* Partículas SVG animadas */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ opacity: 0.13 }}>
        <circle cx="120" cy="80" r="60" fill="#00fff7" opacity="0.12">
          <animate attributeName="r" values="60;80;60" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="600" cy="120" r="40" fill="#FFD700" opacity="0.10">
          <animate attributeName="r" values="40;60;40" dur="5s" repeatCount="indefinite" />
        </circle>
        <circle cx="400" cy="200" r="30" fill="#ff00cc" opacity="0.10">
          <animate attributeName="r" values="30;50;30" dur="6s" repeatCount="indefinite" />
        </circle>
      </svg>
      {/* Confeti animado al guardar */}
      {showConfetti && (
        <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
          <span className="text-6xl animate-bounce">🎉🎊✨</span>
        </div>
      )}
      <div className="w-full max-w-md mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/profile-customization')}
            className="flex items-center space-x-2 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <ArrowLeft size={20} />
            <span>{t('Volver')}</span>
          </button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
            {t('Seleccionar Título')}
          </h1>
          {selectedTitle && (
            <button
              onClick={handleSaveTitle}
              disabled={saving}
              className="flex items-center space-x-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed animate-pop-in"
            >
              {saving ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Checkmark size={20} />
              )}
              <span>{saving ? t('Guardando...') : t('Guardar')}</span>
            </button>
          )}
        </div>
        {/* Títulos */}
        <div className="flex flex-col gap-6">
          {titles.map((title, index) => (
            <div
              key={title}
              className={`relative p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 cursor-pointer animate-pop-in ${
                selectedTitle === title
                  ? 'bg-gradient-to-br from-cyan-600/50 via-cyan-600/50 to-blue-600/50 border-cyan-400 shadow-2xl shadow-cyan-500/50 animate-glow'
                  : 'bg-gradient-to-br from-gray-800/50 via-blue-900/50 to-gray-900/50 border-cyan-500/30 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25'
              }`}
              onClick={() => handleTitleSelect(title)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-center">
                <h3 className="text-base font-bold text-cyan-200">{title}</h3>
              </div>
              {selectedTitle === title && (
                <div className="absolute top-2 right-2 w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce border-2 border-white shadow-lg">
                  <Checkmark size={16} className="text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TitleSelection; 