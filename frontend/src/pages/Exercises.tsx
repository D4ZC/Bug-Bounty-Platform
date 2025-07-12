import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { updateUser } from '../localDb';

// Ejercicios estáticos con rareza y puntos
const exercises = [
  {
    id: 1,
    title: 'Encuentra la XSS básica',
    description:
      'En el siguiente input, ¿qué payload podrías usar para mostrar una alerta en la página?',
    difficulty: 'Fácil',
    solution: '<script>alert(1)</script>',
    rarity: 'común',
    points: 25,
  },
  {
    id: 2,
    title: 'SQL Injection simple',
    description:
      '¿Qué valor podrías ingresar en un campo de login para saltar la autenticación si el backend es vulnerable?',
    difficulty: 'Fácil',
    solution: "' OR '1'='1",
    rarity: 'común',
    points: 30,
  },
  {
    id: 3,
    title: 'Bypass de autenticación avanzada',
    description:
      'Supón que tienes un JWT vulnerable a manipulación. ¿Qué parte modificarías para obtener acceso de admin?',
    difficulty: 'Media',
    solution: 'payload',
    rarity: 'raro',
    points: 75,
  },
  {
    id: 4,
    title: 'Path Traversal',
    description:
      '¿Qué cadena usarías para intentar leer /etc/passwd en un campo de nombre de archivo?',
    difficulty: 'Difícil',
    solution: '../../etc/passwd',
    rarity: 'épico',
    points: 150,
  },
  {
    id: 5,
    title: 'RCE en formulario',
    description:
      '¿Qué input podrías probar para ejecutar un comando en el servidor si el campo es vulnerable?',
    difficulty: 'Experto',
    solution: '$(id)',
    rarity: 'legendario',
    points: 300,
  },
  {
    id: 6,
    title: 'CSRF Token',
    description: '¿Qué técnica usarías para explotar un formulario vulnerable a CSRF?',
    difficulty: 'Media',
    solution: 'Enviar petición desde otro sitio',
    rarity: 'raro',
    points: 80,
  },
  {
    id: 7,
    title: 'Inyección de comandos',
    description: '¿Qué comando podrías usar para listar archivos si hay inyección en un campo de nombre?',
    difficulty: 'Difícil',
    solution: 'ls',
    rarity: 'épico',
    points: 120,
  },
  {
    id: 8,
    title: 'IDOR',
    description: '¿Qué parámetro modificarías para acceder a recursos de otros usuarios?',
    difficulty: 'Media',
    solution: 'userId',
    rarity: 'raro',
    points: 60,
  },
  {
    id: 9,
    title: 'XXE',
    description: '¿Qué entidad externa podrías usar para leer archivos en un XML mal configurado?',
    difficulty: 'Difícil',
    solution: '<!ENTITY',
    rarity: 'épico',
    points: 180,
  },
  {
    id: 10,
    title: 'Fuerza bruta',
    description: '¿Qué herramienta automatizada podrías usar para probar contraseñas?',
    difficulty: 'Fácil',
    solution: 'Hydra',
    rarity: 'común',
    points: 20,
  },
];

const Exercises: React.FC = () => {
  const { user, addXP } = useAuth();
  const { showToast } = useToast();
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [feedback, setFeedback] = useState<{ [key: number]: string }>({});
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [search, setSearch] = useState('');

  const handleChange = (id: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (id: number) => {
    const exercise = exercises.find((e) => e.id === id);
    if (!exercise) { return; }
    
    if (answers[id]?.trim() === exercise.solution) {
      // Ejercicio completado correctamente
      if (!completedExercises.includes(id)) {
        setCompletedExercises(prev => [...prev, id]);
        
        // Dar puntos al usuario usando el contexto
        addXP(exercise.points);
        
        showToast(`¡Correcto! +${exercise.points} puntos por completar ejercicio ${exercise.rarity}`, 'success');
      }
      
      setFeedback((prev) => ({ ...prev, [id]: `✅ ¡Correcto! +${exercise.points} puntos` }));
    } else {
      setFeedback((prev) => ({ ...prev, [id]: '❌ Intenta de nuevo.' }));
    }
  };

  // Filtrado reactivo de ejercicios
  const filteredExercises = exercises.filter(
    (exercise) =>
      exercise.title.toLowerCase().includes(search.toLowerCase()) ||
      exercise.description.toLowerCase().includes(search.toLowerCase())
  );

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'común': return 'text-gray-300';
      case 'raro': return 'text-blue-300';
      case 'épico': return 'text-purple-300';
      case 'legendario': return 'text-yellow-300';
      case 'mítico': return 'text-red-300';
      default: return 'text-gray-300';
    }
  };

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case 'común': return 'bg-gray-700 border-gray-400';
      case 'raro': return 'bg-blue-700 border-blue-400';
      case 'épico': return 'bg-purple-700 border-purple-400';
      case 'legendario': return 'bg-yellow-700 border-yellow-400';
      case 'mítico': return 'bg-red-700 border-red-400';
      default: return 'bg-gray-700 border-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0026] via-[#1a0033] to-[#0f0026] text-white py-10 px-4 relative overflow-x-hidden">
      {/* Fondo cyberpunk con partículas */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-60">
        <svg width="100%" height="100%">
          <defs>
            <radialGradient id="cyberpunk-glow-exercises" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor="#ff00ea" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0f0026" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="80%" cy="20%" r="300" fill="url(#cyberpunk-glow-exercises)" />
          <circle cx="20%" cy="80%" r="200" fill="url(#cyberpunk-glow-exercises)" />
        </svg>
      </div>
      <div className="max-w-3xl mx-auto relative z-10">
        <h1 className="text-5xl font-extrabold mb-10 text-center neon-text drop-shadow-cyber tracking-widest">EJERCICIOS DE CIBERSEGURIDAD</h1>
        
        {/* Estadísticas del usuario */}
        {user && (
          <div className="mb-8 bg-black/60 rounded-2xl border-2 border-cyan-400 neon-shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-cyan-300">{completedExercises.length}</div>
                <div className="text-sm text-cyan-100">Ejercicios Completados</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-300">
                  {completedExercises.reduce((total, id) => {
                    const exercise = exercises.find(e => e.id === id);
                    return total + (exercise?.points || 0);
                  }, 0)}
                </div>
                <div className="text-sm text-yellow-100">Puntos Ganados</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-300">{user.points || 0}</div>
                <div className="text-sm text-purple-100">Puntos Totales</div>
              </div>
            </div>
          </div>
        )}
        
        {/* Barra de búsqueda */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            className="w-full max-w-md px-4 py-3 rounded-lg bg-gray-900 border-2 border-cyan-400 neon-shadow text-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-lg font-mono"
            placeholder="Buscar ejercicio..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="space-y-10">
          {filteredExercises.length === 0 ? (
            <div className="text-center text-xl text-pink-400 font-bold">No se encontraron ejercicios.</div>
          ) : (
            filteredExercises.map((exercise) => (
              <div
                key={exercise.id}
                className="bg-black/70 border-2 border-cyan-400 neon-shadow rounded-2xl p-8 shadow-cyber relative overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl animate-bounce">🧩</span>
                  <h2 className="text-2xl font-bold neon-text drop-shadow-cyber">{exercise.title}</h2>
                  <div className="ml-auto flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold border-2 shadow-cyber ${getRarityBg(exercise.rarity)}`}>
                      <span className={`${getRarityColor(exercise.rarity)}`}>{exercise.rarity}</span>
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-bold bg-yellow-700 border-2 border-yellow-400 text-yellow-200 shadow-cyber">
                      +{exercise.points} pts
                    </span>
                    {completedExercises.includes(exercise.id) && (
                      <span className="px-3 py-1 rounded-full text-sm font-bold bg-green-700 border-2 border-green-400 text-green-200 shadow-cyber">
                        ✅ Completado
                      </span>
                    )}
                  </div>
                </div>
                <p className="mb-6 text-cyan-100 text-lg font-mono">{exercise.description}</p>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    className="flex-1 px-4 py-3 rounded-lg bg-gray-900 border-2 border-cyan-400 neon-shadow text-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-lg font-mono"
                    placeholder="Tu respuesta..."
                    value={answers[exercise.id] || ''}
                    onChange={(e) => handleChange(exercise.id, e.target.value)}
                  />
                  <button
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-cyan-500 border-2 border-pink-400 neon-shadow font-extrabold text-lg text-white hover:scale-105 hover:shadow-cyber transition-all"
                    onClick={() => handleSubmit(exercise.id)}
                  >
                    Enviar
                  </button>
                </div>
                {feedback[exercise.id] && (
                  <div className={`mt-4 text-xl font-extrabold ${feedback[exercise.id].includes('Correcto') ? 'text-green-400' : 'text-pink-400'} drop-shadow-cyber`}>
                    {feedback[exercise.id]}
                  </div>
                )}
                {/* Efecto de brillo cyberpunk */}
                <div className="absolute inset-0 pointer-events-none opacity-10">
                  <svg width="100%" height="100%">
                    <defs>
                      <radialGradient id="glow-exercise" cx="50%" cy="50%" r="80%">
                        <stop offset="0%" stopColor="#ff00ea" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#0f0026" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <circle cx="50%" cy="50%" r="120" fill="url(#glow-exercise)" />
                  </svg>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="text-center mt-14">
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
          color: #ff00ea;
          text-shadow: 0 0 8px #ff00ea, 0 0 16px #00fff7, 0 0 32px #00fff7;
        }
        .drop-shadow-cyber {
          filter: drop-shadow(0 0 8px #00fff7) drop-shadow(0 0 16px #a78bfa);
        }
        .shadow-cyber {
          box-shadow: 0 0 16px 2px #00fff7, 0 0 32px 4px #a78bfa;
        }
        .neon-shadow {
          box-shadow: 0 0 16px 2px #ff00ea, 0 0 32px 4px #00fff7, 0 0 8px #fff0;
        }
      `}</style>
    </div>
  );
};

export default Exercises;
 