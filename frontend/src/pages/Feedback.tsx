import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useBackground } from '../contexts/BackgroundContext';

const satisfactionOptions = [
  'Selecciona una opción',
  'Muy satisfecho',
  'Satisfecho',
  'Neutral',
  'Insatisfecho',
];

const Feedback: React.FC = () => {
  const { isDark } = useTheme();
  const { backgroundUrl } = useBackground();
  const [satisfaction, setSatisfaction] = useState('Selecciona una opción');
  const [suggestion, setSuggestion] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 font-mono" style={{ background: backgroundUrl ? `url(${backgroundUrl}) center/cover no-repeat` : 'linear-gradient(to bottom right, #0a183d, #1a0033, #2d003e)' }}>
      <div
        className="bg-[#101926]/90 border-2 border-[#00fff7] rounded-2xl p-6 w-full max-w-md font-mono text-[#00fff7] flex flex-col items-center shadow-[0_0_32px_#00fff7,0_0_0_4px_rgba(0,255,247,0.3)] backdrop-blur-md animate-fade-in-up"
        style={{ fontFamily: 'Orbitron, monospace' }}
      >
        <h1 className="text-2xl md:text-3xl font-extrabold mb-6 text-center drop-shadow-[0_0_12px_#00fff7] uppercase tracking-wide font-mono">Retroalimentación Mensual</h1>
        {submitted ? (
          <div className="text-center text-[#39ff14] font-semibold text-xl font-mono">¡Gracias por tu retroalimentación!</div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
            <div>
              <label className="block text-lg font-bold mb-2 text-[#00fff7] uppercase tracking-wide font-mono">
                ¿Qué tan satisfecho estás con la plataforma?
              </label>
              <select
                className="w-full bg-[#101926] border-2 border-[#00fff7] rounded-lg px-4 py-2 text-[#00fff7] text-base font-mono focus:outline-none focus:ring-2 focus:ring-[#00fff7] placeholder-[#00fff7] transition-colors duration-500 backdrop-blur-md"
                value={satisfaction}
                onChange={e => setSatisfaction(e.target.value)}
                required
              >
                {satisfactionOptions.map(option => (
                  <option key={option} value={option} disabled={option === 'Selecciona una opción'} className="text-black dark:text-white dark:bg-gray-800 font-mono">
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-lg font-bold mb-2 text-[#00fff7] uppercase tracking-wide font-mono">Propuesta o sugerencia constructiva</label>
              <textarea
                className="w-full bg-[#101926] border-2 border-[#00fff7] rounded-lg px-4 py-2 min-h-[80px] text-[#00fff7] text-base font-mono focus:outline-none focus:ring-2 focus:ring-[#00fff7] placeholder-[#00fff7] transition-colors duration-500 backdrop-blur-md"
                placeholder="Comparte una idea clara y útil..."
                value={suggestion}
                onChange={e => setSuggestion(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#00fff7] hover:bg-[#00e6e6] text-black font-extrabold text-lg py-3 rounded-xl mt-2 shadow-[0_0_16px_#00fff7] transition tracking-wide uppercase font-mono animate-glow"
              style={{ fontFamily: 'Orbitron, monospace' }}
            >
              Enviar retroalimentación
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Feedback; 