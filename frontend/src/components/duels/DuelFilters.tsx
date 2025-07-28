import React from 'react';

interface DuelFiltersProps {
  filters: string[];
  selected: string;
  onSelect: (filter: string) => void;
}

const DuelFilters: React.FC<DuelFiltersProps> = ({ filters, selected, onSelect }) => {
  // Categorizar los filtros
  const getFilterCategory = (filter: string) => {
    if (['Críticas', 'Medias', 'Bajas'].includes(filter)) return 'vulnerability';
    if (['Individual', 'Equipo'].includes(filter)) return 'type';
    if (['Tiempo', 'Puntos'].includes(filter)) return 'objective';
    return 'general';
  };

  const getFilterIcon = (filter: string) => {
    switch (filter) {
      case 'Todos': return '🎯';
      case 'Individual': return '👤';
      case 'Equipo': return '👥';
      case 'Tiempo': return '⏱️';
      case 'Puntos': return '⭐';
      case 'Críticas': return '🔥';
      case 'Medias': return '⚡';
      case 'Bajas': return '🛡️';
      default: return '';
    }
  };

  const getFilterColor = (filter: string) => {
    switch (filter) {
      case 'Críticas': return 'border-red-500 text-red-400 hover:border-red-400 hover:text-red-300 bg-red-900/20';
      case 'Medias': return 'border-yellow-500 text-yellow-400 hover:border-yellow-400 hover:text-yellow-300 bg-yellow-900/20';
      case 'Bajas': return 'border-green-500 text-green-400 hover:border-green-400 hover:text-green-300 bg-green-900/20';
      default: return 'border-neon-green/70 text-neon-green hover:border-blue-400 hover:text-blue-400';
    }
  };

  return (
    <div className="bg-black/40 border border-neon-green/30 rounded-xl p-4 mb-4">
      <div className="space-y-4">
        {/* Filtro principal */}
        <div className="flex justify-center">
          <button
            onClick={() => onSelect('Todos')}
            className={`px-8 py-3 rounded-full border-4 font-bold text-lg shadow-lg transition-all duration-150
              ${selected === 'Todos'
                ? 'bg-gradient-to-r from-neon-green to-blue-500 text-black border-blue-400 scale-105'
                : 'bg-black/80 text-neon-green border-neon-green/70 hover:bg-neon-green/20 hover:text-blue-400 hover:border-blue-400'}
            `}
            style={{ textShadow: selected === 'Todos' ? '0 2px 8px #fff' : '0 2px 8px #000', color: selected === 'Todos' ? '#111' : '#39ff14' }}
          >
            🎯 Todos los Duelos
          </button>
        </div>

        {/* Filtros específicos */}
        <div className="grid grid-cols-2 gap-4">
        {/* Tipo de duelo */}
        <div className="space-y-2">
          <div className="text-xs text-gray-400 text-center font-semibold tracking-wider">TIPO DE DUELO</div>
          <div className="flex gap-1">
            {filters.filter(f => getFilterCategory(f) === 'type').map((filter) => (
              <button
                key={filter}
                onClick={() => onSelect(filter)}
                className={`flex-1 px-3 py-2 rounded-lg border-2 font-bold text-sm shadow-lg transition-all duration-150
                  ${selected === filter
                    ? 'bg-gradient-to-r from-neon-green to-blue-500 text-black border-blue-400 scale-105'
                    : 'bg-black/80 text-neon-green border-neon-green/70 hover:bg-neon-green/20 hover:text-blue-400 hover:border-blue-400'}
                `}
                style={{ textShadow: selected === filter ? '0 2px 8px #fff' : '0 2px 8px #000', color: selected === filter ? '#111' : '#39ff14' }}
              >
                {getFilterIcon(filter)} {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Nivel de vulnerabilidad */}
        <div className="space-y-2">
          <div className="text-xs text-gray-400 text-center font-semibold tracking-wider">NIVEL DE VULNERABILIDAD</div>
          <div className="flex gap-1">
            {filters.filter(f => getFilterCategory(f) === 'vulnerability').map((filter) => (
              <button
                key={filter}
                onClick={() => onSelect(filter)}
                className={`flex-1 px-2 py-2 rounded-lg border-2 font-bold text-xs shadow-lg transition-all duration-150
                  ${selected === filter
                    ? 'bg-gradient-to-r from-neon-green to-blue-500 text-black border-blue-400 scale-105'
                    : `border-2 hover:scale-105 ${getFilterColor(filter)}`}
                `}
                style={{ textShadow: selected === filter ? '0 2px 8px #fff' : '0 2px 8px #000', color: selected === filter ? '#111' : undefined }}
              >
                {getFilterIcon(filter)} {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Objetivos */}
      <div className="space-y-2">
        <div className="text-xs text-gray-400 text-center font-semibold tracking-wider">OBJETIVO</div>
        <div className="flex gap-2 justify-center">
          {filters.filter(f => getFilterCategory(f) === 'objective').map((filter) => (
            <button
              key={filter}
              onClick={() => onSelect(filter)}
              className={`px-4 py-2 rounded-lg border-2 font-bold text-sm shadow-lg transition-all duration-150
                ${selected === filter
                  ? 'bg-gradient-to-r from-neon-green to-blue-500 text-black border-blue-400 scale-105'
                  : 'bg-black/80 text-neon-green border-neon-green/70 hover:bg-neon-green/20 hover:text-blue-400 hover:border-blue-400'}
              `}
              style={{ textShadow: selected === filter ? '0 2px 8px #fff' : '0 2px 8px #000', color: selected === filter ? '#111' : '#39ff14' }}
            >
              {getFilterIcon(filter)} {filter}
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

export default DuelFilters; 