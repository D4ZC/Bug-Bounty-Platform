import React from 'react';
import { useNavigate } from 'react-router-dom';

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

const UserProfileCard: React.FC<{ user: UserProfile }> = ({ user }) => {
  const navigate = useNavigate();
  // Datos para el radar chart
  const data = [user.stats.criticas, user.stats.altas, user.stats.medianas, user.stats.bajas];
  const max = Math.max(10, ...data);
  // Coordenadas polares para el radar chart (4 ejes)
  const getPoint = (value: number, i: number) => {
    const angle = (Math.PI / 2) + (i * (2 * Math.PI / 4));
    const r = 60 * (value / max);
    const cx = 70, cy = 70;
    return [cx + r * Math.cos(angle), cy - r * Math.sin(angle)];
  };
  const points = data.map(getPoint);
  const polygon = points.map(p => p.join(",")).join(" ");

  return (
    <div
      className="col-span-1 flex flex-row items-stretch min-h-[220px] bg-[#1A1A1A] border border-gray-700 rounded-xl shadow-lg cursor-pointer hover:shadow-2xl hover:border-purple-500 transition-all duration-200 group"
      onClick={() => navigate('/profile')}
    >
      {/* Datos a la izquierda */}
      <div className="flex-1 flex flex-col justify-center p-6">
        <h2 className="text-3xl font-bold text-white mb-2">{user.name}</h2>
        <div className="text-base text-gray-200 mb-2">
          Vulnerabilidades solucionadas: <span className="text-yellow-400 font-bold">{user.stats.total}</span><br />
          <span className="block">- Críticas: <span className="text-red-400 font-semibold">{user.stats.criticas}</span></span>
          <span className="block">- Altas: <span className="text-orange-400 font-semibold">{user.stats.altas}</span></span>
          <span className="block">- Medianas: <span className="text-yellow-400 font-semibold">{user.stats.medianas}</span></span>
          <span className="block">- Bajas: <span className="text-green-400 font-semibold">{user.stats.bajas}</span></span>
        </div>
      </div>
      {/* Radar chart a la derecha */}
      <div className="flex items-center justify-center p-6">
        <div className="bg-[#222] rounded-2xl p-2">
          <svg width="140" height="140" viewBox="0 0 140 140">
            {/* Ejes */}
            {[0,1,2,3].map(i => {
              const [x, y] = getPoint(max, i);
              return <line key={i} x1="70" y1="70" x2={x} y2={y} stroke="#666" strokeWidth="1" />;
            })}
            {/* Círculos de fondo */}
            {[1,2,3,4,5].map(lvl => (
              <circle key={lvl} cx="70" cy="70" r={12*lvl} fill="none" stroke="#444" strokeWidth="1" />
            ))}
            {/* Polígono de datos */}
            <polygon points={polygon} fill="#f87171" fillOpacity="0.5" stroke="#f87171" strokeWidth="2" />
            {/* Puntos */}
            {points.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="4" fill="#f87171" />
            ))}
          </svg>
        </div>
      </div>
      {/* Flecha indicadora */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#282828] rounded-full p-2 shadow-lg group-hover:bg-purple-600 transition-colors">
        <svg width="28" height="28" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

export default UserProfileCard; 