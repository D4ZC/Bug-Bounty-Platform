import React from 'react';
import insignia1 from '../assets/images/Insignias/Insignia1.png';
import insignia2 from '../assets/images/Insignias/Insignia2.png';
import insignia3 from '../assets/images/Insignias/Insignia3.png';
import insignia4 from '../assets/images/Insignias/Insignia4.png';
import insignia5 from '../assets/images/Insignias/Insignia5.png';
import insignia6 from '../assets/images/Insignias/Insignia6.png';
import insignia7 from '../assets/images/Insignias/Insignia7.png';

interface User {
  id: string;
  name: string;
  team: string;
  stats: { puntos: number; vulnerabilidades: number; retos: number };
  badges: string[];
  puntosGulag?: number;
}

interface UserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

const ALL_BADGES = [
  { img: insignia1, name: 'Insignia 1' },
  { img: insignia2, name: 'Insignia 2' },
  { img: insignia3, name: 'Insignia 3' },
  { img: insignia4, name: 'Insignia 4' },
  { img: insignia5, name: 'Insignia 5' },
  { img: insignia6, name: 'Insignia 6' },
  { img: insignia7, name: 'Insignia 7' },
];

const UserModal: React.FC<UserModalProps> = ({ user, isOpen, onClose }) => {
  if (!isOpen || !user) return null;

  // Obtener insignias seleccionadas
  let selectedBadges: string[] = [];
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('selectedBadges');
    if (saved) selectedBadges = JSON.parse(saved);
  }
  if (!selectedBadges || selectedBadges.length !== 3) {
    selectedBadges = ALL_BADGES.slice(0, 3).map(b => b.img);
  }
  const userInsignias = selectedBadges.map(img => ALL_BADGES.find(b => b.img === img)).filter(Boolean) as {img: string, name: string}[];
  
  // Solo mostrar avatar y fondo personalizados si es el usuario autenticado (Alex Turner)
  const isCurrentUser = user.id === 'USR-001'; // Alex Turner
  let selectedAvatar = '';
  let portada = null;
  if (isCurrentUser && typeof window !== 'undefined') {
    selectedAvatar = localStorage.getItem('selectedAvatar') || '';
    portada = localStorage.getItem('selectedPortadaPerfil');
  }
  const bg = isCurrentUser && portada ? portada : 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        className="relative bg-white rounded-2xl shadow-2xl flex flex-col items-center p-8 w-[340px] max-w-[90vw]"
        style={{ backgroundImage: `url('${bg}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-4 bg-gray-200 flex items-center justify-center overflow-hidden">
          {isCurrentUser && selectedAvatar ? (
            <img src={selectedAvatar} alt="avatar" className="w-full h-full object-cover rounded-full" />
          ) : (
            <span className="text-4xl font-bold text-white bg-blue-500 w-full h-full flex items-center justify-center">{user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}</span>
          )}
        </div>
        <div className="text-2xl font-extrabold text-white drop-shadow mb-2 text-center">{user.name}</div>
        <div className="text-base font-semibold text-white drop-shadow mb-1">Equipo: <span className="font-bold">{user.team}</span></div>
        <div className="text-sm text-white/80 mb-1">ID: {user.id}</div>
        {/* Estadísticas */}
        <div className="grid grid-cols-2 gap-4 mb-6 w-full">
          <div className="text-center">
            <div className="text-xl font-bold text-white">{user.stats.puntos}</div>
            <div className="text-sm text-gray-300">Puntos</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-white">{user.puntosGulag || 0}</div>
            <div className="text-sm text-gray-300">Puntos Gulag</div>
          </div>
        </div>
        {/* Insignias seleccionadas en V */}
        <div className="flex flex-row gap-3 mt-4 mb-2 justify-center items-end" style={{ height: 70 }}>
          {userInsignias.map((ins, i) => (
            <div
              key={i}
              className="relative group"
              style={
                i === 1
                  ? { marginBottom: -12, zIndex: 2 }
                  : { marginBottom: 0, zIndex: 1 }
              }
            >
              <img src={ins.img} alt={ins.name} className="w-16 h-16 rounded-full border-2 border-yellow-500 shadow object-cover bg-white cursor-pointer" />
              <span className="absolute left-1/2 -translate-x-1/2 bottom-[-2.2rem] bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
                {ins.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserModal; 