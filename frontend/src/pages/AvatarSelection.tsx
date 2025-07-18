import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Checkmark } from '@carbon/icons-react';
import apiService from '@/services/api';
import { useTranslation } from 'react-i18next';

interface Avatar {
  id: string;
  name: string;
  imageUrl: string;
  unlocked: boolean;
  category: 'default' | 'premium' | 'special';
}

const AvatarSelection: React.FC = () => {
  const { t } = useTranslation();
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null);
  const [titleInput, setTitleInput] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [selectedBackground, setSelectedBackground] = useState('');
  const [activeTab, setActiveTab] = useState<'avatar' | 'frame' | 'title' | 'background'>('avatar');

  useEffect(() => {
    // Simular carga de avatares
    const mockAvatars: Avatar[] = [
      // Avatares por defecto (desbloqueados)
      { id: 'Hacker_Básico', name: 'Hacker Clásico', imageUrl: '/avatars/Hacker_Básico.png', unlocked: true, category: 'default' },
      { id: 'Ciberseguridad', name: 'Ciberseguridad', imageUrl: '/avatars/Ciberseguridad.png', unlocked: true, category: 'default' },
      { id: 'Programador', name: 'Programador', imageUrl: '/avatars/Programador.png', unlocked: true, category: 'default' },
      { id: 'Analista', name: 'Analista', imageUrl: '/avatars/Analista.png', unlocked: true, category: 'default' },
      { id: 'Pantester', name: 'Pentester', imageUrl: '/avatars/Pantester.png', unlocked: true, category: 'default' },
      // Avatares premium (bloqueados)
      { id: 'Ghost_Hacker', name: 'Ghost Hacker', imageUrl: '/avatars/Ghost_Hacker.png', unlocked: false, category: 'premium' },
      { id: 'Cyber_Ninja', name: 'Cyber Ninja', imageUrl: '/avatars/Cyber_Ninja.png', unlocked: false, category: 'premium' },
      { id: 'Digital_Phantom', name: 'Digital Phantom', imageUrl: '/avatars/Digital_Phantom.png', unlocked: false, category: 'premium' },
      { id: 'Stealth_Master', name: 'Stealth Master', imageUrl: '/avatars/Stealth_Master.png', unlocked: false, category: 'premium' },
      // Avatares especiales (bloqueados)
      { id: 'Legendary_Hacker', name: 'Legendary Hacker', imageUrl: '/avatars/Legendary_Hacker.png', unlocked: false, category: 'special' },
      { id: 'Cyber_God', name: 'Cyber God', imageUrl: '/avatars/Cyber_God.png', unlocked: false, category: 'special' },
      { id: 'Digital_Overlord', name: 'Digital Overlord', imageUrl: '/avatars/Digital_Overlord.png', unlocked: false, category: 'special' },
    ];

    setAvatars(mockAvatars);
    setLoading(false);
  }, []);

  const handleAvatarSelect = (avatarId: string) => {
    const avatar = avatars.find(a => a.id === avatarId);
    if (avatar && avatar.unlocked) {
      setSelectedAvatar(avatarId);
    }
  };

  const handleSaveAvatar = async () => {
    if (!selectedAvatar) return;
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('profile_custom_avatar', selectedAvatar);
      navigate('/profile-customization');
    } catch (error) {
      console.error('Error al guardar avatar:', error);
    } finally {
      setSaving(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'default': return 'from-green-500 to-green-600';
      case 'premium': return 'from-blue-500 to-purple-600';
      case 'special': return 'from-yellow-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'default': return t('Por Defecto');
      case 'premium': return t('Premium');
      case 'special': return t('Especial');
      default: return t('Otros');
    }
  };

  const predefinedTitles = [
    { label: 'Maestro de la Seguridad', color: 'from-blue-700 to-cyan-400', icon: '🛡️' },
    { label: 'Cazador de Vulnerabilidades', color: 'from-green-700 to-green-400', icon: '🐞' },
    { label: 'Leyenda Digital', color: 'from-purple-700 to-pink-400', icon: '🌟' },
    { label: 'El MVP', color: 'from-yellow-600 to-yellow-300', icon: '🏆' },
    { label: 'Capitán del Equipo', color: 'from-indigo-700 to-indigo-400', icon: '👑' },
    { label: 'Héroe Anónimo', color: 'from-gray-700 to-gray-400', icon: '🦸' },
    { label: 'Analista Supremo', color: 'from-cyan-700 to-cyan-300', icon: '📊' },
    { label: 'Pentester Pro', color: 'from-red-700 to-pink-400', icon: '💻' },
    { label: 'Ciberdefensor', color: 'from-blue-900 to-blue-400', icon: '🛡️' },
    { label: 'Shadow Walker', color: 'from-black to-gray-700', icon: '👤' },
    { label: 'Overlord del Código', color: 'from-yellow-800 to-yellow-400', icon: '🤖' },
    { label: 'Phantom Debugger', color: 'from-pink-700 to-pink-300', icon: '👻' },
    { label: 'Blue Team Leader', color: 'from-blue-800 to-blue-300', icon: '🔵' },
    { label: 'Red Team Specialist', color: 'from-red-800 to-red-400', icon: '🔴' },
    { label: 'Bug Slayer', color: 'from-green-800 to-green-300', icon: '🗡️' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-app text-app flex items-center justify-center">
        <div className="text-xl animate-pulse">{t('Cargando avatares...')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app text-app p-8 font-mono relative overflow-hidden">
      {/* Navbar/tab bar */}
      <div className="w-full max-w-3xl mx-auto mb-8 flex justify-center gap-2">
        <button onClick={() => setActiveTab('avatar')} className={`px-6 py-3 rounded-t-lg font-bold text-base border-b-4 ${activeTab === 'avatar' ? 'bg-cyan-800 text-cyan-100 border-cyan-400' : 'bg-gray-800 text-gray-400 border-transparent hover:bg-cyan-900/40'}`}>{t('Avatar')}</button>
        <button onClick={() => setActiveTab('frame')} className={`px-6 py-3 rounded-t-lg font-bold text-base border-b-4 ${activeTab === 'frame' ? 'bg-cyan-800 text-cyan-100 border-cyan-400' : 'bg-gray-800 text-gray-400 border-transparent hover:bg-cyan-900/40'}`}>{t('Marco')}</button>
        <button onClick={() => setActiveTab('title')} className={`px-6 py-3 rounded-t-lg font-bold text-base border-b-4 ${activeTab === 'title' ? 'bg-cyan-800 text-cyan-100 border-cyan-400' : 'bg-gray-800 text-gray-400 border-transparent hover:bg-cyan-900/40'}`}>{t('Título')}</button>
        <button onClick={() => setActiveTab('background')} className={`px-6 py-3 rounded-t-lg font-bold text-base border-b-4 ${activeTab === 'background' ? 'bg-cyan-800 text-cyan-100 border-cyan-400' : 'bg-gray-800 text-gray-400 border-transparent hover:bg-cyan-900/40'}`}>{t('Tarjeta de Vista')}</button>
      </div>

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
      {/* Eliminar showConfetti y animaciones */}
      {/* Agregar sección para elegir marco debajo de la selección de avatar */}

      {/* Sección Avatar */}
      {activeTab === 'avatar' && (
        <div className="w-full max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate('/profile-customization')}
              className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg glass-effect border-2 border-green-400/40"
            >
              <ArrowLeft size={20} />
              <span>{t('Volver')}</span>
            </button>
            <h1 className="text-4xl font-extrabold text-gradient drop-shadow-lg animate-pulse tracking-widest">
              {t('Seleccionar Avatar')}
            </h1>
            {selectedAvatar && (
              <button
                onClick={handleSaveAvatar}
                disabled={saving}
                className="flex items-center space-x-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed animate-pop-in glass-effect border-2 border-cyan-400/40"
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
          {/* Categorías de avatares */}
          {['default', 'premium', 'special'].map(category => {
            const categoryAvatars = avatars.filter(avatar => avatar.category === category);
            return (
              <div key={category} className="mb-8">
                <div className="flex items-center mb-4">
                  <div className={`w-4 h-4 bg-gradient-to-r ${getCategoryColor(category)} rounded-full mr-3 animate-pulse`}></div>
                  <h2 className="text-2xl font-bold text-gradient drop-shadow-lg tracking-wide">
                    {getCategoryName(category)}
                  </h2>
                  <span className="ml-4 text-sm text-gray-400">
                    ({categoryAvatars.filter(a => a.unlocked).length}/{categoryAvatars.length} {t('desbloqueados')})
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {categoryAvatars.map((avatar, index) => (
                    <div
                      key={avatar.id}
                      className={`relative p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-110 cursor-pointer glass-effect shadow-lg ${
                        avatar.unlocked
                          ? selectedAvatar === avatar.id
                            ? 'bg-gradient-to-br from-green-600/60 via-cyan-600/60 to-blue-600/60 border-yellow-400 shadow-2xl shadow-green-500/50 scale-105'
                            : 'bg-gradient-to-br from-gray-800/60 via-blue-900/60 to-gray-900/60 border-green-500/30 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/25'
                          : 'bg-gradient-to-br from-gray-800/30 via-gray-700/30 to-gray-900/30 border-gray-600/50 opacity-50 cursor-not-allowed'
                      }`}
                      onClick={() => avatar.unlocked && handleAvatarSelect(avatar.id)}
                      title={avatar.unlocked ? t('Selecciona este avatar') : t('Desbloquea este avatar para usarlo')}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex justify-center mb-3">
                        <div className={`w-24 h-24 rounded-2xl border-4 flex items-center justify-center ${
                          avatar.unlocked
                            ? selectedAvatar === avatar.id
                              ? 'border-yellow-400 bg-gradient-to-br from-green-600 to-blue-600 scale-110'
                              : 'border-green-400 bg-gradient-to-br from-green-600 to-blue-600'
                            : 'border-gray-600 bg-gradient-to-br from-gray-700 to-gray-800'
                        }`}>
                          <img src={avatar.imageUrl} alt={avatar.name} className="w-20 h-20 object-cover rounded-xl shadow-lg" style={{ filter: avatar.unlocked ? 'none' : 'grayscale(1) blur(1px)' }} />
                          {!avatar.unlocked && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-3xl text-gray-400">🔒</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-center flex flex-col items-center">
                        <h3 className={`text-base font-bold ${avatar.unlocked ? 'text-green-200' : 'text-gray-400'} text-shadow-lg`}>{avatar.name}</h3>
                        {avatar.category === 'premium' && <span className="badge badge-warning mt-1">Premium</span>}
                        {avatar.category === 'special' && <span className="badge badge-primary mt-1">Special</span>}
                      </div>
                      {selectedAvatar === avatar.id && avatar.unlocked && (
                        <div className="absolute top-2 right-2 w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                          <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M4 8l3 3 5-5" stroke="#fff" strokeWidth="2"/></svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Información adicional */}
          <div className="mt-8 p-6 bg-card border-2 border-card rounded-xl backdrop-blur-sm">
            <h3 className="text-xl font-bold text-green-300 mb-4">{t('¿Cómo desbloquear más avatares?')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-200">{t('Avatares Premium: Compra en la tienda')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-blue-200">{t('Avatares Especiales: Logros especiales')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-yellow-200">{t('Eventos temporales y competiciones')}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Sección Marco */}
      {activeTab === 'frame' && (
        <div className="w-full max-w-6xl mx-auto relative z-10">
          <h2 className="text-xl font-bold text-cyan-200 mb-4">{t('Selecciona tu Marco')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-center">
            {/* mockFrames is not defined in the original file, assuming it's a placeholder for a list of frames */}
            {/* For the purpose of this edit, we'll just show a placeholder for the frame selection */}
            <div
              key="frame1"
              className={`relative p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-110 cursor-pointer glass-effect shadow-lg ${
                selectedFrame === 'frame1'
                  ? 'bg-gradient-to-br from-green-600/60 via-cyan-600/60 to-blue-600/60 border-yellow-400 shadow-2xl scale-105'
                  : 'bg-gradient-to-br from-gray-800/60 via-blue-900/60 to-gray-900/60 border-cyan-700 hover:border-green-400 hover:shadow-lg'
              }`}
              onClick={() => setSelectedFrame('frame1')}
              title="Frame 1"
            >
              <div className="flex justify-center mb-3">
                <div className={`w-24 h-24 rounded-2xl border-4 flex items-center justify-center ${
                  selectedFrame === 'frame1'
                    ? 'border-yellow-400 bg-gradient-to-br from-green-600 to-blue-600 scale-110'
                    : 'border-cyan-400 bg-gradient-to-br from-green-600 to-blue-600'
                }`}>
                  <img src="/frames/frame1.png" alt="Frame 1" className="w-20 h-20 object-contain rounded-xl shadow-lg" />
                </div>
              </div>
              <div className="text-center flex flex-col items-center">
                <h3 className={`text-base font-bold ${selectedFrame === 'frame1' ? 'text-yellow-200' : 'text-cyan-200'} text-shadow-lg`}>Frame 1</h3>
              </div>
              {selectedFrame === 'frame1' && (
                <div className="absolute top-2 right-2 w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                  <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M4 8l3 3 5-5" stroke="#fff" strokeWidth="2"/></svg>
                </div>
              )}
            </div>
            <div
              key="frame2"
              className={`relative p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-110 cursor-pointer glass-effect shadow-lg ${
                selectedFrame === 'frame2'
                  ? 'bg-gradient-to-br from-green-600/60 via-cyan-600/60 to-blue-600/60 border-yellow-400 shadow-2xl scale-105'
                  : 'bg-gradient-to-br from-gray-800/60 via-blue-900/60 to-gray-900/60 border-cyan-700 hover:border-green-400 hover:shadow-lg'
              }`}
              onClick={() => setSelectedFrame('frame2')}
              title="Frame 2"
            >
              <div className="flex justify-center mb-3">
                <div className={`w-24 h-24 rounded-2xl border-4 flex items-center justify-center ${
                  selectedFrame === 'frame2'
                    ? 'border-yellow-400 bg-gradient-to-br from-green-600 to-blue-600 scale-110'
                    : 'border-cyan-400 bg-gradient-to-br from-green-600 to-blue-600'
                }`}>
                  <img src="/frames/frame2.png" alt="Frame 2" className="w-20 h-20 object-contain rounded-xl shadow-lg" />
                </div>
              </div>
              <div className="text-center flex flex-col items-center">
                <h3 className={`text-base font-bold ${selectedFrame === 'frame2' ? 'text-yellow-200' : 'text-cyan-200'} text-shadow-lg`}>Frame 2</h3>
              </div>
              {selectedFrame === 'frame2' && (
                <div className="absolute top-2 right-2 w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                  <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M4 8l3 3 5-5" stroke="#fff" strokeWidth="2"/></svg>
                </div>
              )}
            </div>
            <div
              key="frame3"
              className={`relative p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-110 cursor-pointer glass-effect shadow-lg ${
                selectedFrame === 'frame3'
                  ? 'bg-gradient-to-br from-green-600/60 via-cyan-600/60 to-blue-600/60 border-yellow-400 shadow-2xl scale-105'
                  : 'bg-gradient-to-br from-gray-800/60 via-blue-900/60 to-gray-900/60 border-cyan-700 hover:border-green-400 hover:shadow-lg'
              }`}
              onClick={() => setSelectedFrame('frame3')}
              title="Frame 3"
            >
              <div className="flex justify-center mb-3">
                <div className={`w-24 h-24 rounded-2xl border-4 flex items-center justify-center ${
                  selectedFrame === 'frame3'
                    ? 'border-yellow-400 bg-gradient-to-br from-green-600 to-blue-600 scale-110'
                    : 'border-cyan-400 bg-gradient-to-br from-green-600 to-blue-600'
                }`}>
                  <img src="/frames/frame3.png" alt="Frame 3" className="w-20 h-20 object-contain rounded-xl shadow-lg" />
                </div>
              </div>
              <div className="text-center flex flex-col items-center">
                <h3 className={`text-base font-bold ${selectedFrame === 'frame3' ? 'text-yellow-200' : 'text-cyan-200'} text-shadow-lg`}>Frame 3</h3>
              </div>
              {selectedFrame === 'frame3' && (
                <div className="absolute top-2 right-2 w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                  <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M4 8l3 3 5-5" stroke="#fff" strokeWidth="2"/></svg>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Sección Título */}
      {activeTab === 'title' && (
        <div className="w-full max-w-2xl mx-auto relative z-10">
          <h2 className="text-xl font-bold text-cyan-200 mb-6 text-center">{t('Selecciona tu Título')}</h2>
          <div className="flex flex-col gap-6 max-h-[60vh] overflow-y-auto pb-4">
            {predefinedTitles.map(title => (
              <div
                key={title.label}
                className={`relative flex items-center justify-between px-6 py-3 rounded-full border-4 shadow-xl cursor-pointer transition-all duration-200 select-none mx-auto w-full max-w-2xl
                  bg-gradient-to-r ${title.color} text-white
                  ${customTitle === title.label ? 'border-yellow-400 ring-4 ring-yellow-200 scale-105' : 'border-cyan-700 hover:border-yellow-400 hover:scale-102'}
                `}
                style={{ minHeight: '64px', maxWidth: '100%' }}
                onClick={() => {
                  setCustomTitle(title.label);
                  setTitleInput(title.label);
                }}
                title={title.label}
              >
                {/* Icono decorativo a la izquierda */}
                <span className="text-3xl drop-shadow-lg mr-4 flex-shrink-0">{title.icon}</span>
                {/* Texto grande y centrado */}
                <span className="flex-1 text-center font-extrabold text-lg uppercase tracking-widest drop-shadow-lg"
                  style={{
                    WebkitTextStroke: '1.5px #222',
                    textShadow: '0 2px 8px #000, 0 0 16px #fff8',
                    fontSize: '1.35em',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {title.label}
                </span>
                {/* Brillo superior */}
                <span className="absolute left-0 top-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-full pointer-events-none" />
                {/* Indicador de selección */}
                {customTitle === title.label && (
                  <span className="absolute -right-6 top-1/2 -translate-y-1/2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                    <svg width="18" height="18" fill="none" viewBox="0 0 16 16"><path d="M4 8l3 3 5-5" stroke="#fff" strokeWidth="2"/></svg>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Sección Tarjeta de Vista (background) */}
      {activeTab === 'background' && (
        <div className="w-full max-w-6xl mx-auto relative z-10">
          <h2 className="text-xl font-bold text-cyan-200 mb-4">{t('Selecciona tu Tarjeta de Vista')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-center">
            {/* mockBackgrounds is not defined in the original file, assuming it's a placeholder for a list of backgrounds */}
            {/* For the purpose of this edit, we'll just show a placeholder for the background selection */}
            <div
              key="background1"
              className={`relative p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-110 cursor-pointer glass-effect shadow-lg ${
                selectedBackground === 'background1'
                  ? 'bg-gradient-to-br from-green-600/60 via-cyan-600/60 to-blue-600/60 border-yellow-400 shadow-2xl scale-105'
                  : 'bg-gradient-to-br from-gray-800/60 via-blue-900/60 to-gray-900/60 border-cyan-700 hover:border-green-400 hover:shadow-lg'
              }`}
              onClick={() => setSelectedBackground('background1')}
              title="Background 1"
            >
              <div className="flex justify-center mb-3">
                <div className={`w-24 h-24 rounded-2xl border-4 flex items-center justify-center ${
                  selectedBackground === 'background1'
                    ? 'border-yellow-400 bg-gradient-to-br from-green-600 to-blue-600 scale-110'
                    : 'border-cyan-400 bg-gradient-to-br from-green-600 to-blue-600'
                }`}>
                  <img src="/backgrounds/background1.png" alt="Background 1" className="w-20 h-20 object-cover rounded-xl shadow-lg" />
                </div>
              </div>
              <div className="text-center flex flex-col items-center">
                <h3 className={`text-base font-bold ${selectedBackground === 'background1' ? 'text-yellow-200' : 'text-cyan-200'} text-shadow-lg`}>Background 1</h3>
              </div>
              {selectedBackground === 'background1' && (
                <div className="absolute top-2 right-2 w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                  <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M4 8l3 3 5-5" stroke="#fff" strokeWidth="2"/></svg>
                </div>
              )}
            </div>
            <div
              key="background2"
              className={`relative p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-110 cursor-pointer glass-effect shadow-lg ${
                selectedBackground === 'background2'
                  ? 'bg-gradient-to-br from-green-600/60 via-cyan-600/60 to-blue-600/60 border-yellow-400 shadow-2xl scale-105'
                  : 'bg-gradient-to-br from-gray-800/60 via-blue-900/60 to-gray-900/60 border-cyan-700 hover:border-green-400 hover:shadow-lg'
              }`}
              onClick={() => setSelectedBackground('background2')}
              title="Background 2"
            >
              <div className="flex justify-center mb-3">
                <div className={`w-24 h-24 rounded-2xl border-4 flex items-center justify-center ${
                  selectedBackground === 'background2'
                    ? 'border-yellow-400 bg-gradient-to-br from-green-600 to-blue-600 scale-110'
                    : 'border-cyan-400 bg-gradient-to-br from-green-600 to-blue-600'
                }`}>
                  <img src="/backgrounds/background2.png" alt="Background 2" className="w-20 h-20 object-cover rounded-xl shadow-lg" />
                </div>
              </div>
              <div className="text-center flex flex-col items-center">
                <h3 className={`text-base font-bold ${selectedBackground === 'background2' ? 'text-yellow-200' : 'text-cyan-200'} text-shadow-lg`}>Background 2</h3>
              </div>
              {selectedBackground === 'background2' && (
                <div className="absolute top-2 right-2 w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                  <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M4 8l3 3 5-5" stroke="#fff" strokeWidth="2"/></svg>
                </div>
              )}
            </div>
            <div
              key="background3"
              className={`relative p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-110 cursor-pointer glass-effect shadow-lg ${
                selectedBackground === 'background3'
                  ? 'bg-gradient-to-br from-green-600/60 via-cyan-600/60 to-blue-600/60 border-yellow-400 shadow-2xl scale-105'
                  : 'bg-gradient-to-br from-gray-800/60 via-blue-900/60 to-gray-900/60 border-cyan-700 hover:border-green-400 hover:shadow-lg'
              }`}
              onClick={() => setSelectedBackground('background3')}
              title="Background 3"
            >
              <div className="flex justify-center mb-3">
                <div className={`w-24 h-24 rounded-2xl border-4 flex items-center justify-center ${
                  selectedBackground === 'background3'
                    ? 'border-yellow-400 bg-gradient-to-br from-green-600 to-blue-600 scale-110'
                    : 'border-cyan-400 bg-gradient-to-br from-green-600 to-blue-600'
                }`}>
                  <img src="/backgrounds/background3.png" alt="Background 3" className="w-20 h-20 object-cover rounded-xl shadow-lg" />
                </div>
              </div>
              <div className="text-center flex flex-col items-center">
                <h3 className={`text-base font-bold ${selectedBackground === 'background3' ? 'text-yellow-200' : 'text-cyan-200'} text-shadow-lg`}>Background 3</h3>
              </div>
              {selectedBackground === 'background3' && (
                <div className="absolute top-2 right-2 w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                  <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M4 8l3 3 5-5" stroke="#fff" strokeWidth="2"/></svg>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="w-full flex justify-center mt-12">
        <button
          onClick={() => {
            if (selectedAvatar) localStorage.setItem('profile_custom_avatar', selectedAvatar);
            if (selectedFrame) localStorage.setItem('profile_custom_frame', selectedFrame);
            if (customTitle) localStorage.setItem('profile_custom_title', customTitle);
            if (selectedBackground) localStorage.setItem('profile_custom_background', selectedBackground);
            navigate('/profile-customization');
          }}
          className="px-8 py-4 bg-cyan-700 text-white rounded-xl text-lg font-bold border-2 border-cyan-400 hover:bg-cyan-800 transition disabled:opacity-60"
          disabled={!(selectedAvatar && selectedFrame && customTitle && selectedBackground)}
        >
          {t('Guardar Cambios')}
        </button>
      </div>
    </div>
  );
};

export default AvatarSelection; 