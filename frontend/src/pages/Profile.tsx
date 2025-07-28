import React, { useState } from 'react';
import UserProfileCard from '../pages/Dashboard/components/UserProfileCard';
import { useAuth } from '../contexts/AuthContext';
import { Tile } from '@carbon/react';

const darkSoulsBg = '/assets/dark_souls2.jpg';
const cyberpunkBg = '/assets/cyberpunk.jpg';
const featuredArt = '/assets/dark_souls.jpeg';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showFrameModal, setShowFrameModal] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('dark-souls');
  const [selectedFrame, setSelectedFrame] = useState('challenger');

  // Datos de ejemplo para stats
  const stats = {
    criticas: 12,
    altas: 22,
    medianas: 35,
    bajas: 10,
    total: 79,
  };

  // Datos de ejemplo para insignias
  const badges = [
    { name: 'Pentester', icon: '💻' },
    { name: 'Bug Hunter', icon: '🔎' },
    { name: 'Firewall Master', icon: '🧱' },
    { name: 'Crypto Expert', icon: '🔐' },
  ];

  // Opciones de marcos disponibles
  const frames = [
    {
      id: 'none',
      name: 'Ninguno',
      description: 'Sin marco, avatar limpio',
      icon: '🖼️',
      image: null
    },
    {
      id: 'challenger',
      name: 'Challenger',
      description: 'Marco dorado con estilo de campeón',
      icon: '🏆',
      image: '/assets/chalenger.png'
    }
  ];

  const themes = [
    {
      id: 'default',
      name: 'Predeterminado',
      description: 'Tema que viene por defecto en la aplicación',
      icon: '🎨',
      bgColor: 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900',
      textColor: 'text-white',
      backgroundImage: null,
      overlayColor: 'bg-black',
      cardBg: 'bg-gradient-to-br from-gray-800/80 to-gray-900/80',
      cardBorder: 'border-2 border-purple-500',
      textColorClass: 'text-white',
      buttonBg: 'bg-gradient-to-r from-purple-600 to-blue-600',
      buttonHover: 'hover:from-purple-700 hover:to-blue-700',
      vulnerabilityColors: {
        criticas: 'bg-red-800/90 text-white',
        altas: 'bg-orange-700/90 text-white',
        medianas: 'bg-yellow-700/90 text-white',
        bajas: 'bg-blue-800/90 text-white',
        total: 'bg-yellow-700/90 text-white'
      },
      nameColor: '#ffffff',
      radarColors: {
        grid: '#6b7280',
        text: '#ffffff',
        fill: '#8b5cf6',
        stroke: '#8b5cf6'
      }
    },
    {
      id: 'dark-souls',
      name: 'Dark Souls',
      description: 'Inspirado en la saga de caballeros y fuego',
      icon: '⚔️',
      bgColor: 'bg-yellow-900',
      textColor: 'text-yellow-200',
      backgroundImage: darkSoulsBg,
      overlayColor: 'bg-black',
      cardBg: 'bg-gradient-to-b from-yellow-900/80 to-black/90',
      cardBorder: 'border-yellow-900',
      textColorClass: 'text-yellow-200',
      buttonBg: 'bg-yellow-800',
      buttonHover: 'hover:bg-yellow-700',
      vulnerabilityColors: {
        criticas: 'bg-red-900/80 text-red-200',
        altas: 'bg-yellow-900/80 text-yellow-200',
        medianas: 'bg-yellow-800/80 text-yellow-100',
        bajas: 'bg-blue-900/80 text-blue-200',
        total: 'bg-yellow-900/80 text-yellow-200'
      },
      nameColor: '#ffe066',
      radarColors: {
        grid: '#facc15',
        text: '#ffe066',
        fill: '#facc15',
        stroke: '#facc15'
      }
    },
    {
      id: 'cyberpunk',
      name: 'Cyberpunk',
      description: 'Colores neón y estilo futurista',
      icon: '🌃',
      bgColor: 'bg-fuchsia-900',
      textColor: 'text-fuchsia-200',
      backgroundImage: cyberpunkBg,
      overlayColor: 'bg-black',
      cardBg: 'bg-gradient-to-b from-fuchsia-900/80 to-black/90',
      cardBorder: 'border-fuchsia-500',
      textColorClass: 'text-fuchsia-200',
      buttonBg: 'bg-fuchsia-800',
      buttonHover: 'hover:bg-fuchsia-700',
      vulnerabilityColors: {
        criticas: 'bg-red-500/80 text-white',
        altas: 'bg-fuchsia-500/80 text-white',
        medianas: 'bg-purple-500/80 text-white',
        bajas: 'bg-cyan-500/80 text-white',
        total: 'bg-fuchsia-700/80 text-white'
      },
      nameColor: '#e879f9',
      radarColors: {
        grid: '#e879f9',
        text: '#f0abfc',
        fill: '#e879f9',
        stroke: '#e879f9'
      }
    }
  ];

  const currentTheme = themes.find(theme => theme.id === selectedTheme) || themes[1]; // Default to dark-souls

  const handleEditTheme = () => {
    setShowEditModal(false);
    setShowThemeModal(true);
  };

  const handleEditFrame = () => {
    setShowEditModal(false);
    setShowFrameModal(true);
  };

  const handleFrameSelect = (frameId: string) => {
    setSelectedFrame(frameId);
    console.log('Marco seleccionado:', frameId);
    setShowFrameModal(false);
  };

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    console.log('Tema seleccionado:', themeId);
    setShowThemeModal(false);
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-start bg-cover bg-center relative"
      style={{
        backgroundImage: currentTheme.backgroundImage ? `url('${currentTheme.backgroundImage}')` : undefined,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay oscuro para ambientación */}
      <div className={`absolute inset-0 ${currentTheme.overlayColor} bg-opacity-85 z-0`} />
      {/* Card grande superior: stats */}
      <div className="relative z-10 w-full max-w-4xl mx-auto mt-10 mb-12">
        <Tile className={`${currentTheme.cardBg} border-2 ${currentTheme.cardBorder} rounded-3xl shadow-2xl p-14 flex flex-col items-center animate-fade-in`}>
                     <UserProfileCard
             user={{
               name: user?.username || 'Solaire of Astora',
               img: user?.avatar || '',
               stats,
             }}
             bgClassName="bg-transparent"
             textClassName={currentTheme.textColorClass}
             borderClassName={currentTheme.cardBorder}
             vulnerabilityColors={currentTheme.vulnerabilityColors}
             nameColor={currentTheme.nameColor}
             radarColors={currentTheme.radarColors}
             isDefaultTheme={selectedTheme === 'default'}
             selectedFrame={selectedFrame}
           />
        </Tile>
      </div>
      {/* Panel inferior: arte destacado y acciones */}
      <div className="relative z-10 w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Insignias cuadrado */}
        <Tile className={`col-span-1 aspect-square ${currentTheme.cardBg} border-2 ${currentTheme.cardBorder} rounded-2xl shadow-2xl flex flex-col items-center justify-center p-6 overflow-hidden animate-fade-in`}>
          <div className={`${currentTheme.textColorClass} font-bold text-xl mb-4`}>Insignias</div>
          <div className="flex flex-wrap gap-4 justify-center items-center w-full h-full">
            {badges.map((badge, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                <div className={`w-16 h-16 rounded-full ${currentTheme.buttonBg} border-4 ${currentTheme.cardBorder.replace('border-2', 'border-4')} flex items-center justify-center text-3xl shadow-lg`}>
                  {badge.icon}
                </div>
                <span className={`${currentTheme.textColorClass} text-xs font-semibold mt-1 text-center`}>{badge.name}</span>
              </div>
            ))}
          </div>
        </Tile>
        {/* Acciones rectangular derecha */}
        <Tile className={`col-span-2 ${currentTheme.cardBg} border-2 ${currentTheme.cardBorder} rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-6 p-10 animate-fade-in`}>
          <button 
            className={`w-full py-4 rounded-xl ${currentTheme.buttonBg} ${currentTheme.textColorClass} font-bold text-xl ${currentTheme.buttonHover} transition`}
            onClick={() => setShowEditModal(true)}
          >
            Editar perfil
          </button>
          <button className="w-full py-4 rounded-xl bg-red-800 text-red-100 font-bold text-xl hover:bg-red-700 transition" onClick={logout}>Cerrar sesión</button>
        </Tile>
      </div>

      {/* Modal de edición de perfil */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 animate-fade-in">
          <div className={`${currentTheme.cardBg} border-2 ${currentTheme.cardBorder} rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center`}>
            <div className="text-6xl mb-4">⚙️</div>
            <h3 className={`text-xl font-bold mb-6 ${currentTheme.textColorClass}`}>Editar perfil</h3>
            <div className="flex flex-col gap-4">
              <button
                onClick={handleEditTheme}
                className={`px-6 py-4 ${currentTheme.buttonBg} ${currentTheme.textColorClass} rounded-xl ${currentTheme.buttonHover} transition font-semibold text-lg flex items-center justify-center gap-3`}
              >
                <span className="text-2xl">🎨</span>
                Editar tema
              </button>
              <button
                onClick={handleEditFrame}
                className={`px-6 py-4 ${currentTheme.buttonBg} ${currentTheme.textColorClass} rounded-xl ${currentTheme.buttonHover} transition font-semibold text-lg flex items-center justify-center gap-3`}
              >
                <span className="text-2xl">🖼️</span>
                Editar marco
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="px-6 py-3 bg-gray-700 text-gray-200 rounded-xl hover:bg-gray-600 transition font-semibold"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de selección de tema */}
      {showThemeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 animate-fade-in">
          <div className={`${currentTheme.cardBg} border-2 ${currentTheme.cardBorder} rounded-2xl shadow-2xl p-8 max-w-2xl mx-4 text-center`}>
            <div className="text-6xl mb-4">🎨</div>
            <h3 className={`text-xl font-bold mb-6 ${currentTheme.textColorClass}`}>Seleccionar tema</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeSelect(theme.id)}
                  className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                    selectedTheme === theme.id 
                      ? `${currentTheme.cardBorder} ${currentTheme.buttonBg}/50` 
                      : `${currentTheme.cardBorder} ${currentTheme.cardBg}/30 hover:${currentTheme.cardBorder.replace('border-', 'border-')}`
                  }`}
                >
                  <div className="text-4xl mb-3">{theme.icon}</div>
                  <h4 className={`font-bold ${currentTheme.textColorClass} mb-2`}>{theme.name}</h4>
                  <p className={`${currentTheme.textColorClass} text-sm`}>{theme.description}</p>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowThemeModal(false)}
              className="px-6 py-3 bg-gray-700 text-gray-200 rounded-xl hover:bg-gray-600 transition font-semibold"
            >
              Cancelar
            </button>
          </div>
                 </div>
       )}

       {/* Modal de selección de marco */}
       {showFrameModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 animate-fade-in">
           <div className={`${currentTheme.cardBg} border-2 ${currentTheme.cardBorder} rounded-2xl shadow-2xl p-8 max-w-2xl mx-4 text-center`}>
             <div className="text-6xl mb-4">🖼️</div>
             <h3 className={`text-xl font-bold mb-6 ${currentTheme.textColorClass}`}>Seleccionar marco</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
               {frames.map((frame) => (
                 <button
                   key={frame.id}
                   onClick={() => handleFrameSelect(frame.id)}
                   className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                     selectedFrame === frame.id 
                       ? `${currentTheme.cardBorder} ${currentTheme.buttonBg}/50` 
                       : `${currentTheme.cardBorder} ${currentTheme.cardBg}/30 hover:${currentTheme.cardBorder.replace('border-', 'border-')}`
                   }`}
                 >
                   <div className="text-4xl mb-3">{frame.icon}</div>
                   <h4 className={`font-bold ${currentTheme.textColorClass} mb-2`}>{frame.name}</h4>
                   <p className={`${currentTheme.textColorClass} text-sm`}>{frame.description}</p>
                 </button>
               ))}
             </div>
             <button
               onClick={() => setShowFrameModal(false)}
               className="px-6 py-3 bg-gray-700 text-gray-200 rounded-xl hover:bg-gray-600 transition font-semibold"
             >
               Cancelar
             </button>
           </div>
         </div>
       )}
     </div>
   );
 };

export default Profile; 