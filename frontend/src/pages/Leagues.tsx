import React, { useEffect, useState } from 'react';
import LeagueUpModal from '../components/Leagues/LeagueUpModal';

const mockLeagues = [
  {
    name: 'Bronce',
    minPoints: 0,
    maxPoints: 499,
    color: 'bg-yellow-700',
    icon: '🥉',
    rewards: ['Insignia Bronce', 'Acceso a retos básicos'],
  },
  {
    name: 'Plata',
    minPoints: 500,
    maxPoints: 999,
    color: 'bg-gray-400',
    icon: '🥈',
    rewards: ['Insignia Plata', 'Acceso a retos intermedios'],
  },
  {
    name: 'Oro',
    minPoints: 1000,
    maxPoints: 1499,
    color: 'bg-yellow-400',
    icon: '🥇',
    rewards: ['Insignia Oro', 'Descuento en tienda'],
  },
  {
    name: 'Platino',
    minPoints: 1500,
    maxPoints: 1999,
    color: 'bg-blue-300',
    icon: '💎',
    rewards: ['Insignia Platino', 'Acceso a retos avanzados'],
  },
  {
    name: 'Diamante',
    minPoints: 2000,
    maxPoints: 2999,
    color: 'bg-blue-500',
    icon: '🔷',
    rewards: ['Insignia Diamante', 'Recompensa especial mensual'],
  },
  {
    name: 'Maestro',
    minPoints: 3000,
    maxPoints: 9999,
    color: 'bg-purple-700',
    icon: '🏆',
    rewards: ['Insignia Maestro', 'Acceso a torneos exclusivos'],
  },
];

const mockUser = {
  name: 'PlayerOne',
  points: 1250,
};

const getCurrentLeague = (points: number) => {
  return mockLeagues.find(
    (league) => points >= league.minPoints && points <= league.maxPoints,
  );
};

const Leagues: React.FC = () => {
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLeague, setNewLeague] = useState<string | null>(null);
  const [newLeagueImage, setNewLeagueImage] = useState<string | null>(null);

  const userLeague = getCurrentLeague(mockUser.points);
  const nextLeague = mockLeagues.find(
    (l) => l.minPoints > (userLeague?.minPoints || 0),
  );
  const progress
    = userLeague && nextLeague
      ? ((mockUser.points - userLeague.minPoints)
          / (nextLeague.minPoints - userLeague.minPoints))
        * 100
      : 100;

  // Simulación: si el usuario acaba de subir de liga, mostrar animación
  useEffect(() => {
    // Simula que el usuario acaba de subir a "Oro"
    if (mockUser.points === 1000) {
      setNewLeague('Oro');
      setNewLeagueImage('https://cdn-icons-png.flaticon.com/512/2583/2583346.png'); // ejemplo de medalla de oro
      setShowLevelUp(true);
    }
  }, []);

  // Botón de prueba para simular subida de liga
  const triggerLeagueUp = () => {
    setNewLeague('Platino');
    setNewLeagueImage('https://cdn-icons-png.flaticon.com/512/2583/2583351.png'); // ejemplo de medalla de platino
    setShowLevelUp(true);
  };

  const closeModal = () => setShowLevelUp(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0026] via-[#1a0033] to-[#0f0026] text-white py-10 px-4 relative overflow-x-hidden">
      {/* Fondo cyberpunk con partículas */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-60">
        <svg width="100%" height="100%">
          <defs>
            <radialGradient id="cyberpunk-glow-leagues" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor="#00fff7" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0f0026" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="80%" cy="20%" r="300" fill="url(#cyberpunk-glow-leagues)" />
          <circle cx="20%" cy="80%" r="200" fill="url(#cyberpunk-glow-leagues)" />
        </svg>
      </div>
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Modal de subida de liga */}
        <LeagueUpModal
          open={showLevelUp}
          leagueName={newLeague || ''}
          leagueImage={newLeagueImage || 'https://cdn-icons-png.flaticon.com/512/2583/2583346.png'}
          onClose={closeModal}
        />
        <h1 className="text-5xl font-extrabold mb-8 text-center neon-text drop-shadow-cyber tracking-widest">LIGAS DE COMPETENCIA</h1>
        <div className="flex flex-col items-center mb-10">
          <div
            className={`w-36 h-36 flex items-center justify-center rounded-full text-7xl shadow-cyber border-4 border-cyan-400 neon-shadow bg-black/60 animate-pulse`}
          >
            {userLeague?.icon}
          </div>
          <h2 className="text-3xl font-bold mt-4 text-cyan-200 drop-shadow-cyber">{userLeague?.name}</h2>
          <p className="text-lg mt-2 text-pink-200">
            Puntos: <span className="font-mono text-yellow-300 text-2xl">{mockUser.points}</span>
          </p>
          {nextLeague && (
            <div className="w-full mt-6">
              <div className="flex justify-between text-base mb-1 text-cyan-200">
                <span>{userLeague?.name}</span>
                <span>{nextLeague.name}</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-6 border-2 border-cyan-400 neon-shadow relative overflow-hidden">
                <div
                  className="bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 h-6 rounded-full neon-shadow animate-pulse"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-center mt-2 text-sm text-cyan-100">
                <span className="font-bold text-yellow-300">{nextLeague.minPoints - mockUser.points}</span> puntos para subir a <span className="font-bold text-pink-300">{nextLeague.name}</span>
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {mockLeagues.map((league) => (
            <div
              key={league.name}
              className={`rounded-2xl p-8 shadow-cyber border-2 border-cyan-400 neon-shadow flex flex-col items-center bg-black/60 hover:scale-105 transition-transform duration-300 relative overflow-hidden`}
            >
              <div className="text-5xl mb-2 animate-bounce drop-shadow-cyber">{league.icon}</div>
              <div className="text-2xl font-bold mb-1 text-cyan-200 drop-shadow-cyber tracking-wider">{league.name}</div>
              <div className="text-base mb-2 text-yellow-200 font-mono">
                {league.minPoints} - {league.maxPoints} pts
              </div>
              <ul className="text-sm text-center text-cyan-100">
                {league.rewards.map((reward) => (
                  <li key={reward} className="mb-1">• {reward}</li>
                ))}
              </ul>
              {/* Efecto de brillo cyberpunk */}
              <div className="absolute inset-0 pointer-events-none opacity-10">
                <svg width="100%" height="100%">
                  <defs>
                    <radialGradient id="glow-league" cx="50%" cy="50%" r="80%">
                      <stop offset="0%" stopColor="#00fff7" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#0f0026" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="50%" cy="50%" r="120" fill="url(#glow-league)" />
                </svg>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6 mb-10">
          <button
            onClick={triggerLeagueUp}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-pink-500 border-2 border-cyan-400 neon-shadow font-extrabold text-lg text-white hover:scale-105 hover:shadow-cyber transition-all"
          >
            Simular subida de liga
          </button>
        </div>
        <div className="text-center mt-12">
          <a
            href="/"
            className="inline-block bg-gradient-to-br from-gray-700 via-gray-900 to-black hover:bg-gray-700 text-white px-8 py-4 rounded-xl font-extrabold text-lg border-2 border-cyan-400 neon-shadow transition-colors tracking-widest drop-shadow-cyber"
          >
            ← Volver al Dashboard
          </a>
        </div>
      </div>
      {/* Estilos cyberpunk extra */}
      <style>{`
        .neon-text {
          color: #00fff7;
          text-shadow: 0 0 8px #00fff7, 0 0 16px #00fff7, 0 0 32px #00fff7;
        }
        .drop-shadow-cyber {
          filter: drop-shadow(0 0 8px #00fff7) drop-shadow(0 0 16px #a78bfa);
        }
        .shadow-cyber {
          box-shadow: 0 0 16px 2px #00fff7, 0 0 32px 4px #a78bfa;
        }
        .neon-shadow {
          box-shadow: 0 0 16px 2px #00fff7, 0 0 32px 4px #a78bfa, 0 0 8px #fff0;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease;
        }
        @keyframes pop-in {
          0% { transform: scale(0.7); opacity: 0; }
          80% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in {
          animation: pop-in 0.7s cubic-bezier(.68,-0.55,.27,1.55);
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Leagues;
