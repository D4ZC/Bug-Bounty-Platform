import React from 'react';

interface DuelFiltersProps {
  filters: string[];
  selected: string;
  onSelect: (filter: string) => void;
}

const DuelFilters: React.FC<DuelFiltersProps> = ({ filters, selected, onSelect }) => {
  return (
    <div className="flex gap-2 mb-4">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onSelect(filter)}
          className={`px-5 py-2 rounded-full border-4 font-bold text-base shadow-lg transition-all duration-150
            ${selected === filter
              ? 'bg-gradient-to-r from-neon-green to-blue-500 text-black border-blue-400 scale-105'
              : 'bg-black/80 text-neon-green border-neon-green/70 hover:bg-neon-green/20 hover:text-blue-400 hover:border-blue-400'}
          `}
          style={{ textShadow: selected === filter ? '0 2px 8px #fff' : '0 2px 8px #000', color: selected === filter ? '#111' : '#39ff14' }}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default DuelFilters; 