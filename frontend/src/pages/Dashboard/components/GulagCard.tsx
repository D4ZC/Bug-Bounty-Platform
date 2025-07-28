import React, { useState } from 'react';
import { Tile } from '@carbon/react';
import { Warning, Fire, Information, Checkmark, UserAvatar } from '@carbon/icons-react';
import { RefObject, useRef } from 'react';

interface GulagUser {
  name: string;
  score: number;
}

const statConfig = [
  { key: 'criticas', label: 'Críticas', color: 'bg-red-100 text-red-600', icon: <Warning size={18} /> },
  { key: 'altas', label: 'Altas', color: 'bg-orange-100 text-orange-600', icon: <Fire size={18} /> },
  { key: 'medianas', label: 'Medianas', color: 'bg-yellow-100 text-yellow-600', icon: <Information size={18} /> },
  { key: 'bajas', label: 'Bajas', color: 'bg-blue-100 text-blue-600', icon: <Checkmark size={18} /> },
];

const userStats: Record<string, any> = {
  'Solaire of Astora': { img: '', stats: { criticas: 12, altas: 22, medianas: 35, bajas: 10, total: 79 } },
  'Siegmeyer of Catarina': { img: '', stats: { criticas: 8, altas: 15, medianas: 20, bajas: 5, total: 48 } },
  'Knight Lautrec': { img: '', stats: { criticas: 7, altas: 14, medianas: 18, bajas: 6, total: 45 } },
  'Big Hat Logan': { img: '', stats: { criticas: 6, altas: 12, medianas: 15, bajas: 7, total: 40 } },
  'Oscar of Astora': { img: '', stats: { criticas: 5, altas: 10, medianas: 12, bajas: 3, total: 30 } },
  'Patches': { img: '', stats: { criticas: 3, altas: 8, medianas: 10, bajas: 4, total: 25 } },
  'Gwynevere': { img: '', stats: { criticas: 2, altas: 7, medianas: 8, bajas: 3, total: 20 } },
  'Gwyndolin': { img: '', stats: { criticas: 2, altas: 6, medianas: 7, bajas: 2, total: 17 } },
  'Andre of Astora': { img: '', stats: { criticas: 1, altas: 5, medianas: 6, bajas: 3, total: 15 } },
  'Shiva of the East': { img: '', stats: { criticas: 1, altas: 4, medianas: 5, bajas: 2, total: 12 } },
  'Domhnall of Zena': { img: '', stats: { criticas: 1, altas: 3, medianas: 4, bajas: 2, total: 10 } },
  'Laurentius': { img: '', stats: { criticas: 0, altas: 2, medianas: 3, bajas: 2, total: 7 } },
  'Quelaag\'s Sister': { img: '', stats: { criticas: 0, altas: 1, medianas: 2, bajas: 2, total: 5 } },
  'Havel the Rock': { img: '', stats: { criticas: 0, altas: 1, medianas: 1, bajas: 1, total: 3 } },
  'Chester': { img: '', stats: { criticas: 2, altas: 4, medianas: 3, bajas: 1, total: 10 } },
  'Crestfallen Warrior': { img: '', stats: { criticas: 1, altas: 2, medianas: 4, bajas: 2, total: 9 } },
  'Vince of Thorolund': { img: '', stats: { criticas: 0, altas: 1, medianas: 2, bajas: 3, total: 6 } },
  'Griggs of Vinheim': { img: '', stats: { criticas: 0, altas: 0, medianas: 1, bajas: 2, total: 3 } },
};

const getCardPosition = (ref: RefObject<HTMLElement>, cardWidth = 280, cardHeight = 340) => {
  if (!ref?.current) return { left: '50%', top: 0 };
  const rect = ref.current.getBoundingClientRect();
  const padding = 16;
  let left = rect.right + 12 + window.scrollX; // por defecto a la derecha
  let top = rect.top + rect.height / 2 - cardHeight / 2 + window.scrollY;
  // Si no hay espacio a la derecha, mostrar a la izquierda
  if (rect.right + cardWidth + padding > window.innerWidth) {
    left = rect.left - cardWidth - 12 + window.scrollX;
    if (left < padding) left = padding;
  }
  // Ajustar top para no salir por arriba/abajo
  if (top < padding) top = padding;
  if (top + cardHeight > window.innerHeight - padding) top = window.innerHeight - cardHeight - padding;
  return { left, top };
};

const GulagCard: React.FC<{ gulag: GulagUser[] }> = ({ gulag }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const userCellRef = useRef<HTMLSpanElement>(null);

  return (
    <Tile className="col-span-1 flex flex-col gap-4 min-h-[200px] bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-2 border-purple-500 rounded-2xl shadow-2xl p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-2">
        <Warning className="text-red-500" size={28} />
        <span className="font-bold text-lg text-white">Gulag</span>
      </div>
      <ol className="flex flex-col gap-3 mt-2">
        {gulag.map((user, idx) => (
          <li key={user.name} className="flex items-center justify-between relative">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-lg text-sm font-bold bg-gradient-to-r from-red-600 to-red-700 text-white">{idx + 1}</span>
              <span
                className="font-semibold text-gray-300 cursor-pointer relative"
                ref={userCellRef}
                onMouseEnter={() => setHovered(user.name)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(user.name)}
                onBlur={() => setHovered(null)}
                tabIndex={0}
              >
                {user.name}
                {hovered === user.name && (
                  <div
                    className="fixed z-50 rounded-2xl shadow-2xl animate-fade-in overflow-hidden"
                    style={{
                      ...getCardPosition(userCellRef, 280, 340),
                      width: 280,
                      minHeight: 340,
                      maxHeight: 340,
                      backgroundImage: user.name === 'Solaire of Astora' 
                        ? "url('/assets/dark_souls2.jpg')" 
                        : "url('/assets/cyberpunk.jpg')",
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    {/* Overlay oscuro */}
                    <div className="absolute inset-0 bg-black bg-opacity-85 z-0 rounded-2xl" />
                    
                    {/* Contenido del perfil */}
                    <div className="relative z-10 p-4 flex flex-col items-center justify-center gap-3 h-full">
                      {/* Avatar con marco Challenger solo para Solaire */}
                      {user.name === 'Solaire of Astora' ? (
                        <div className="relative flex items-center justify-center mb-2" style={{width: 80, height: 80}}>
                          <img src="/assets/chalenger.png" alt="Marco Challenger" className="absolute" style={{top:'63%', left:'50%', width:80, height:80, transform:'translate(-50%,-50%)', pointerEvents:'none', zIndex:30}} />
                          <div className="flex items-center justify-center" style={{width: 64, height: 64, zIndex: 20, background: 'transparent'}}>
                            <UserAvatar size={56} className="text-yellow-200 bg-gray-900 rounded-full p-1 border-2 border-yellow-400" style={{zIndex: 20}} />
                          </div>
                        </div>
                      ) : (
                        <UserAvatar size={56} className="text-gray-300 bg-gray-100 rounded-full p-1 border-2 border-gray-400 mb-2" />
                      )}
                      
                      {/* Nombre del usuario */}
                      <div 
                        className="font-bold text-center mb-2"
                        style={{
                          color: user.name === 'Solaire of Astora' ? '#ffe066' : '#ffffff',
                          textShadow: user.name === 'Solaire of Astora' ? '0 2px 12px #000, 0 0px 2px #000' : '0 2px 8px #000',
                          fontWeight: 900,
                          fontSize: user.name === 'Solaire of Astora' ? '1.2rem' : '1rem',
                          letterSpacing: '0.5px',
                        }}
                      >
                        {user.name}
                      </div>
                      
                      {/* Estadísticas */}
                      <div className="grid grid-cols-2 gap-1 w-full mb-2">
                        {statConfig.map((stat, i) => (
                          <div 
                            key={stat.key} 
                            className="flex flex-col items-center justify-center rounded-lg px-1 py-1 font-semibold text-center min-w-[60px]" 
                            style={{
                              backgroundColor: user.name === 'Solaire of Astora' 
                                ? i === 0 ? 'rgba(127, 29, 29, 0.8)' :    // Rojo oscuro para críticas
                                   i === 1 ? 'rgba(146, 64, 14, 0.8)' :    // Naranja oscuro para altas
                                   i === 2 ? 'rgba(146, 64, 14, 0.8)' :    // Naranja oscuro para medianas
                                   'rgba(30, 58, 138, 0.8)'                 // Azul oscuro para bajas
                                : i === 0 ? 'rgba(59, 130, 246, 0.8)' :    // Azul neón para críticas
                                   i === 1 ? 'rgba(147, 51, 234, 0.8)' :   // Púrpura neón para altas
                                   i === 2 ? 'rgba(16, 185, 129, 0.8)' :   // Verde neón para medianas
                                   'rgba(236, 72, 153, 0.8)',              // Rosa neón para bajas
                              color: user.name === 'Solaire of Astora' 
                                ? i === 0 ? '#fecaca' :    // Rojo claro para Dark Souls
                                   i === 1 ? '#fef3c7' :   // Amarillo claro
                                   i === 2 ? '#fef3c7' :   // Amarillo claro
                                   '#bfdbfe'                // Azul claro
                                : '#ffffff',               // Blanco para cyberpunk
                              boxShadow: '0 2px 8px #000'
                            }}
                          >
                            <div className="flex items-center justify-center gap-1">
                              <span className="text-sm font-bold leading-tight">{userStats[user.name]?.stats?.[stat.key] ?? '-'}</span>
                              {stat.icon}
                            </div>
                            <span 
                              className="text-xs mt-0.5 font-semibold" 
                              style={{
                                color: user.name === 'Solaire of Astora' 
                                  ? '#fbbf24' // Amarillo dorado para Dark Souls
                                  : '#60a5fa', // Azul claro para cyberpunk
                                fontWeight: 600
                              }}
                            >
                              {stat.label}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Total */}
                      <div 
                        className="flex items-center gap-2 rounded-lg px-3 py-1 font-semibold text-sm"
                        style={{
                          backgroundColor: user.name === 'Solaire of Astora' 
                            ? 'rgba(146, 64, 14, 0.8)'  // Naranja oscuro para Dark Souls
                            : 'rgba(59, 130, 246, 0.8)', // Azul neón para cyberpunk
                          color: user.name === 'Solaire of Astora' 
                            ? '#fef3c7'  // Amarillo claro para Dark Souls
                            : '#ffffff', // Blanco para cyberpunk
                          boxShadow: '0 2px 8px #000'
                        }}
                      >
                        <Checkmark size={16} className="text-green-400" />
                        <span style={{color: user.name === 'Solaire of Astora' ? '#fbbf24' : '#60a5fa'}}>
                          Total: {userStats[user.name]?.stats?.total ?? user.score}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </span>
            </div>
            <span className="font-mono text-purple-400">{user.score} pts</span>
          </li>
        ))}
      </ol>
    </Tile>
  );
};

export default GulagCard; 