import React from 'react';
import { X } from 'lucide-react';

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

const UserModal: React.FC<UserModalProps> = ({ user, isOpen, onClose }) => {
  if (!isOpen || !user) return null;

  // Generar iniciales del usuario
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Insignias mock (puedes personalizar según los datos reales)
  const userBadges = [
    { img: '/src/assets/images/Insignias/Insignia1.png', name: 'Top Performer' },
    { img: '/src/assets/images/Insignias/Insignia2.png', name: 'Bug Hunter' },
    { img: '/src/assets/images/Insignias/Insignia3.png', name: 'Fast Solver' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative w-[400px] h-[500px] rounded-2xl overflow-hidden shadow-2xl animate-fade-in">
        {/* Fondo de cielo estrellado */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-blue-900 via-purple-900 to-black"
          style={{
            backgroundImage: `
              radial-gradient(2px 2px at 20px 30px, #eee, transparent),
              radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
              radial-gradient(1px 1px at 90px 40px, #fff, transparent),
              radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
              radial-gradient(2px 2px at 160px 30px, #ddd, transparent),
              radial-gradient(2px 2px at 200px 70px, rgba(255,255,255,0.8), transparent),
              radial-gradient(1px 1px at 250px 40px, #fff, transparent),
              radial-gradient(1px 1px at 290px 80px, rgba(255,255,255,0.6), transparent),
              radial-gradient(2px 2px at 320px 30px, #ddd, transparent),
              radial-gradient(2px 2px at 360px 70px, rgba(255,255,255,0.8), transparent)
            `,
            backgroundSize: '400px 400px, 400px 400px, 400px 400px, 400px 400px, 400px 400px, 400px 400px, 400px 400px, 400px 400px, 400px 400px, 400px 400px',
            backgroundPosition: '0 0, 20px 20px, 40px 40px, 60px 60px, 80px 80px, 100px 100px, 120px 120px, 140px 140px, 160px 160px, 180px 180px'
          }}
        >
          {/* Siluetas de montañas en la parte inferior */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent">
            <svg className="w-full h-full" viewBox="0 0 400 80" fill="none">
              <path d="M0 80 L50 60 L100 70 L150 50 L200 65 L250 45 L300 55 L350 40 L400 50 L400 80 Z" fill="black" fillOpacity="0.3"/>
              <path d="M0 80 L30 65 L60 75 L90 60 L120 70 L150 55 L180 65 L210 50 L240 60 L270 45 L300 55 L330 40 L360 50 L390 35 L400 40 L400 80 Z" fill="black" fillOpacity="0.2"/>
            </svg>
          </div>
        </div>

        {/* Contenido de la modal */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-6">
          {/* Botón de cerrar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X size={24} />
          </button>

          {/* Avatar circular azul */}
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg mb-6">
            <span className="text-white text-2xl font-bold">{getInitials(user.name)}</span>
          </div>

          {/* Información del usuario */}
          <div className="text-center text-white mb-8">
            <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
            <p className="text-lg mb-1">Equipo: {user.team}</p>
            <p className="text-base opacity-90">ID: {user.id}</p>
          </div>

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

          {/* Insignias */}
          <div className="flex gap-3">
            {userBadges.map((badge, index) => (
              <div key={index} className="relative group">
                <div className="w-12 h-12 rounded-full border-2 border-yellow-500 bg-white flex items-center justify-center shadow-lg">
                  <img 
                    src={badge.img} 
                    alt={badge.name} 
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {badge.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal; 