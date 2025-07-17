import React, { useState } from 'react';

const bloques = [
  {
    titulo: 'Personalización',
    icono: '🎮',
    items: [
      'Cambiar avatar',
      'Seleccionar fondo de perfil',
      'Tema visual (Claro / Oscuro / Ciberpunk)',
    ],
    color: 'bg-carbon-light',
    accent: 'border-cyber-blue',
  },
  {
    titulo: 'Cuenta',
    icono: '👤',
    items: [
      'Cambiar nombre de usuario',
      'Cambiar email o contraseña',
      'Cerrar sesión (Salir de la partida)',
    ],
    color: 'bg-carbon-light',
    accent: 'border-cyber-blue',
  },
  {
    titulo: 'Notificaciones',
    icono: '🔔',
    items: [
      'Notificaciones ON / OFF',
      'Sonido de alertas',
    ],
    color: 'bg-carbon-light',
    accent: 'border-cyber-blue',
  },
  {
    titulo: 'Idioma',
    icono: '🌐',
    items: [
      'Seleccionar idioma de la interfaz',
    ],
    color: 'bg-carbon-light',
    accent: 'border-cyber-blue',
  },
];

const Ajustes: React.FC = () => {
  const [showSecret, setShowSecret] = useState(false);
  return (
    <div className="min-h-screen w-full bg-carbon-gray flex flex-col items-center py-8 px-2 animate-fade-in">
      <h1 className="font-gamer-title text-3xl md:text-5xl text-cyber-blue mb-8 drop-shadow-lg text-center">Panel de Ajustes</h1>
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {bloques.map((bloque, idx) => (
          <div
            key={bloque.titulo}
            className={`rounded-[10px] border-2 ${bloque.accent} shadow-xl p-6 flex flex-col gap-3 pixel-border ${bloque.color} hover:scale-[1.03] transition-transform duration-300`}
            style={{ boxShadow: '0 0 8px #00f0ff33, 0 0 2px #fff' }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl md:text-4xl drop-shadow-lg">{bloque.icono}</span>
              <span className="font-gamer-title text-xl md:text-2xl text-cyber-blue drop-shadow">{bloque.titulo}</span>
            </div>
            <ul className="font-carbon-base text-base md:text-lg text-carbon-dark pl-2 list-disc list-inside">
              {bloque.items.map(item => (
                <li key={item} className="mb-1 font-gamer-body">{item}</li>
              ))}
            </ul>
          </div>
        ))}
        {/* Zona secreta */}
        <div className="rounded-[10px] border-2 border-cyber-blue shadow-xl p-6 flex flex-col gap-3 pixel-border bg-carbon-light hover:scale-[1.03] transition-transform duration-300 cursor-pointer" style={{ boxShadow: '0 0 8px #00f0ff33, 0 0 2px #fff' }} onClick={() => setShowSecret(v => !v)}>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl md:text-4xl drop-shadow-lg">🕵️‍♂️</span>
            <span className="font-gamer-title text-xl md:text-2xl text-cyber-blue drop-shadow">Zona secreta</span>
          </div>
          {showSecret ? (
            <ul className="font-carbon-base text-base md:text-lg text-carbon-dark pl-2 list-disc list-inside animate-fade-in">
              <li className="font-gamer-body">Ingresar código promocional</li>
              <li className="font-gamer-body">Resetear progreso (con advertencia)</li>
              <li className="font-gamer-body">Easter egg: modo desarrollador oculto</li>
            </ul>
          ) : (
            <div className="font-gamer-body text-cyber-blue/80 italic">Haz clic para descubrir...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ajustes; 