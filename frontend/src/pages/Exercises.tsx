import React, { useState } from 'react';

const mockExercises = [
  {
    id: 1,
    title: 'Encuentra la XSS básica',
    description:
      'En el siguiente input, ¿qué payload podrías usar para mostrar una alerta en la página?',
    difficulty: 'Fácil',
    solution: '<script>alert(1)</script>',
  },
  {
    id: 2,
    title: 'SQL Injection simple',
    description:
      '¿Qué valor podrías ingresar en un campo de login para saltar la autenticación si el backend es vulnerable?',
    difficulty: 'Fácil',
    solution: "' OR '1'='1",
  },
  {
    id: 3,
    title: 'Bypass de autenticación avanzada',
    description:
      'Supón que tienes un JWT vulnerable a manipulación. ¿Qué parte modificarías para obtener acceso de admin?',
    difficulty: 'Media',
    solution: 'payload',
  },
  {
    id: 4,
    title: 'Path Traversal',
    description:
      '¿Qué cadena usarías para intentar leer /etc/passwd en un campo de nombre de archivo?',
    difficulty: 'Difícil',
    solution: '../../etc/passwd',
  },
  {
    id: 5,
    title: 'RCE en formulario',
    description:
      '¿Qué input podrías probar para ejecutar un comando en el servidor si el campo es vulnerable?',
    difficulty: 'Experto',
    solution: '$(id)',
  },
];

const Exercises: React.FC = () => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [feedback, setFeedback] = useState<{ [key: number]: string }>({});

  const handleChange = (id: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (id: number) => {
    const exercise = mockExercises.find((e) => e.id === id);
    if (!exercise) { return; }
    if (answers[id]?.trim() === exercise.solution) {
      setFeedback((prev) => ({ ...prev, [id]: '✅ ¡Correcto!' }));
    } else {
      setFeedback((prev) => ({ ...prev, [id]: '❌ Intenta de nuevo.' }));
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
        <div className="space-y-10">
          {mockExercises.map((exercise) => (
            <div
              key={exercise.id}
              className="bg-black/70 border-2 border-cyan-400 neon-shadow rounded-2xl p-8 shadow-cyber relative overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl animate-bounce">🧩</span>
                <h2 className="text-2xl font-bold neon-text drop-shadow-cyber">{exercise.title}</h2>
                <span className={`ml-auto px-4 py-1 rounded-full text-base font-extrabold tracking-wider border-2 shadow-cyber ${exercise.difficulty === 'Fácil' ? 'bg-green-700 border-green-400 text-green-200' : exercise.difficulty === 'Media' ? 'bg-yellow-700 border-yellow-400 text-yellow-200' : exercise.difficulty === 'Difícil' ? 'bg-pink-700 border-pink-400 text-pink-200' : 'bg-purple-700 border-purple-400 text-purple-200'}`}>{exercise.difficulty}</span>
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
          ))}
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
