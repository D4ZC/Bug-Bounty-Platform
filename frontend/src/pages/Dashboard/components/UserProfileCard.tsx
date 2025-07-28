import React from 'react';
import { Tile } from '@carbon/react';
import { UserAvatar, Warning, Fire, Information, Checkmark } from '@carbon/icons-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface UserProfile {
  name: string;
  img: string;
  stats: {
    criticas: number;
    altas: number;
    medianas: number;
    bajas: number;
    total: number;
  };
}

interface UserProfileCardProps {
  user: UserProfile;
  bgClassName?: string;
  textClassName?: string;
  borderClassName?: string;
  darkSoulsStyle?: boolean;
  showRadarChart?: boolean;
  vulnerabilityColors?: {
    criticas: string;
    altas: string;
    medianas: string;
    bajas: string;
    total: string;
  };
  nameColor?: string;
  radarColors?: {
    grid: string;
    text: string;
    fill: string;
    stroke: string;
  };
  isDefaultTheme?: boolean;
  selectedFrame?: string;
}

const statConfig = [
  { key: 'criticas', label: 'Críticas', icon: <Warning size={20} /> },
  { key: 'altas', label: 'Altas', icon: <Fire size={20} /> },
  { key: 'medianas', label: 'Medianas', icon: <Information size={20} /> },
  { key: 'bajas', label: 'Bajas', icon: <Checkmark size={20} /> },
];

const UserProfileCard: React.FC<UserProfileCardProps> = ({ 
  user, 
  bgClassName = '', 
  textClassName = '', 
  borderClassName = '', 
  darkSoulsStyle = false, 
  showRadarChart = true,
  vulnerabilityColors,
  nameColor,
  radarColors,
  isDefaultTheme = false,
  selectedFrame = 'challenger'
}) => {
  const radarData = [
    { stat: 'Críticas', value: user.stats.criticas },
    { stat: 'Altas', value: user.stats.altas },
    { stat: 'Medianas', value: user.stats.medianas },
    { stat: 'Bajas', value: user.stats.bajas },
  ];

  // Estilos Dark Souls
  const dsBg = darkSoulsStyle ? "bg-[url('/assets/dark_souls2.jpg')] bg-cover bg-center relative" : '';
  const dsOverlay = darkSoulsStyle ? 'absolute inset-0 bg-black bg-opacity-85 z-0 rounded-2xl' : '';
  const dsText = darkSoulsStyle ? 'text-yellow-200' : textClassName;
  const dsBorder = darkSoulsStyle ? 'border-4 border-yellow-900' : borderClassName;
  const dsAvatarBorder = darkSoulsStyle ? 'border-yellow-400' : 'border-yellow-700';
  const dsName = darkSoulsStyle ? 'text-yellow-200 font-bold text-2xl drop-shadow-lg' : '';

  // Colores de vulnerabilidades basados en el tema
  const getVulnerabilityColors = () => {
    if (vulnerabilityColors) {
      return [
        vulnerabilityColors.criticas,
        vulnerabilityColors.altas,
        vulnerabilityColors.medianas,
        vulnerabilityColors.bajas,
      ];
    }
    
    // Colores por defecto
    return (darkSoulsStyle || isDefaultTheme)
      ? [
          'bg-red-900/80 text-red-200',
          'bg-yellow-900/80 text-yellow-200',
          'bg-yellow-800/80 text-yellow-100',
          'bg-blue-900/80 text-blue-200',
        ]
      : [
          'bg-red-600/80 text-white',
          'bg-orange-600/80 text-white',
          'bg-yellow-600/80 text-white',
          'bg-blue-600/80 text-white',
        ];
  };

  const vulnerabilityColorClasses = getVulnerabilityColors();

  // Determinar si usar sombras basado en el tema
  const shouldUseShadows = darkSoulsStyle || isDefaultTheme;

  return (
    <Tile className={`col-span-1 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 min-h-[260px] ${bgClassName} ${dsBg} ${dsBorder} rounded-2xl shadow-lg p-8 animate-fade-in`} style={darkSoulsStyle ? {position:'relative', overflow:'hidden'} : {}}>
      {darkSoulsStyle && <div className={dsOverlay} />}
      {/* Bloque compacto: avatar, nombre, stats, total */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 z-10">
                 <div className="flex flex-col items-center gap-2 relative">
           {/* Avatar con marco según selección */}
           <div className="relative flex items-center justify-center" style={{width: 124, height: 124}}>
             {/* Marco Challenger encima del avatar si está seleccionado */}
             {selectedFrame === 'challenger' && (
               <img src="/assets/chalenger.png" alt="Marco Challenger" className="absolute" style={{top:'63%', left:'50%', width:124, height:124, transform:'translate(-50%,-50%)', pointerEvents:'none', zIndex:30}} />
             )}
             <div className="flex items-center justify-center" style={{width: 104, height: 104, zIndex: 20, background: 'transparent'}}>
               {user.img ? (
                 <img src={user.img} alt={user.name} className={`w-24 h-24 rounded-full object-cover border-4 ${dsAvatarBorder}`} style={{zIndex: 20}} />
               ) : (
                 <UserAvatar size={96} className="text-yellow-200 bg-gray-900 rounded-full p-2 border-4 border-yellow-400" style={{zIndex: 20}} />
               )}
             </div>
           </div>
          <h2
            className={`mt-2 mb-1 ${dsName}`}
            style={{
              color: nameColor || '#ffe066',
              textShadow: isDefaultTheme ? 'none' : '0 2px 12px #000, 0 0px 2px #000',
              fontWeight: isDefaultTheme ? 700 : 900,
              fontSize: '2.1rem',
              letterSpacing: isDefaultTheme ? '0px' : '0.5px',
              maxWidth: '100%',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {user.name}
          </h2>
        </div>
        <div className="flex flex-col gap-2 w-full mt-2 items-center">
          <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
            {statConfig.map((stat, i) => (
              <div
                key={stat.key}
                className={`flex flex-col items-center justify-center rounded-lg px-3 py-2 ${vulnerabilityColorClasses[i]} font-semibold text-center min-w-[90px]`}
                style={shouldUseShadows ? {boxShadow: '0 2px 8px #000'} : {}}
              >
                <div className="flex items-center justify-center gap-1">
                  <span className="text-lg font-bold leading-tight">{(user.stats as any)[stat.key]}</span>
                  {stat.icon}
                </div>
                <span className="text-xs mt-0.5" style={shouldUseShadows ? {color:'#fbbf24', fontWeight:600} : {}}>{stat.label}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2 w-full">
            <div 
              className={`flex items-center gap-2 rounded-lg px-4 py-2 font-semibold ${vulnerabilityColors?.total || 'bg-yellow-900/80 text-yellow-200'}`}
              style={shouldUseShadows ? {boxShadow: '0 2px 8px #000'} : {}}
            >
              <Checkmark size={20} className="text-green-400" />
              <span style={shouldUseShadows ? {color:'#fbbf24'} : {}}>Total: {user.stats.total}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Radar chart a la derecha */}
      {showRadarChart && (
        <div className="flex-1 min-w-[420px] max-w-[800px] h-[420px] flex items-center justify-center z-10" style={{overflow: 'visible'}}>
          <ResponsiveContainer width="100%" height="100%" style={{padding: 40, overflow: 'visible'}}>
            <RadarChart cx="50%" cy="50%" outerRadius="55%" data={radarData}>
              <PolarGrid stroke={radarColors?.grid || "#facc15"} strokeOpacity={0.7} />
              <PolarAngleAxis 
                dataKey="stat" 
                stroke={radarColors?.grid || "#facc15"} 
                fontSize={18} 
                tick={{
                  fontSize: 18, 
                  fill: radarColors?.text || '#ffe066', 
                  fontWeight: 700, 
                  dy: 10
                }} 
              />
              <PolarRadiusAxis angle={30} domain={[0, Math.max(...radarData.map(d => d.value), 10)]} tick={false} axisLine={false} />
              <Radar 
                name="Stats" 
                dataKey="value" 
                stroke={radarColors?.stroke || "#facc15"} 
                fill={radarColors?.fill || "#facc15"} 
                fillOpacity={0.3} 
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Tile>
  );
};

export default UserProfileCard; 