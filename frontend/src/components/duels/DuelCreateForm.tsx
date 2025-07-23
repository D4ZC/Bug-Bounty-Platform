import React, { useState } from 'react';
import { FaUser, FaUsers } from 'react-icons/fa';

const duelObjectives = [
  'Resolver X vulnerabilidades',
  'Mejor puntuación en Y tiempo',
  'Primero en 5 Vulnerabilidades',
];

interface DuelCreateFormProps {
  onCreate: (data: any) => void;
}

const DuelCreateForm: React.FC<DuelCreateFormProps> = ({ onCreate }) => {
  const [type, setType] = useState<'INDIVIDUAL' | 'EQUIPO'>('INDIVIDUAL');
  const [objective, setObjective] = useState(duelObjectives[0]);
  const [points, setPoints] = useState(10);
  const [opponent, setOpponent] = useState('');
  const [openDuel, setOpenDuel] = useState(false);

  return (
    <form
      className="bg-black/60 border border-neon-green rounded-xl p-4 flex flex-col gap-3"
      onSubmit={e => {
        e.preventDefault();
        onCreate({ type, objective, points, opponent: openDuel ? null : opponent, openDuel });
      }}
    >
      <div>
        <label className="block text-neon-green font-bold mb-1">Tipo de Duelo</label>
        <div className="flex gap-2">
          <button type="button" onClick={() => setType('INDIVIDUAL')} className={`flex items-center gap-1 px-4 py-2 rounded-lg border-4 font-extrabold text-base shadow-lg transition-all duration-150 ${type === 'INDIVIDUAL' ? 'bg-gradient-to-r from-neon-green to-blue-500 text-black border-blue-400 scale-105' : 'bg-black/80 text-neon-green border-neon-green/70 hover:bg-neon-green/20 hover:text-blue-400 hover:border-blue-400'}`} style={{ textShadow: type === 'INDIVIDUAL' ? '0 2px 8px #fff' : '0 2px 8px #000', color: type === 'INDIVIDUAL' ? '#111' : '#39ff14' }}>
            <FaUser /> INDIVIDUAL
          </button>
          <button type="button" onClick={() => setType('EQUIPO')} className={`flex items-center gap-1 px-4 py-2 rounded-lg border-4 font-extrabold text-base shadow-lg transition-all duration-150 ${type === 'EQUIPO' ? 'bg-gradient-to-r from-neon-green to-blue-500 text-black border-blue-400 scale-105' : 'bg-black/80 text-neon-green border-neon-green/70 hover:bg-neon-green/20 hover:text-blue-400 hover:border-blue-400'}`} style={{ textShadow: type === 'EQUIPO' ? '0 2px 8px #fff' : '0 2px 8px #000', color: type === 'EQUIPO' ? '#111' : '#39ff14' }}>
            <FaUsers /> EQUIPO
          </button>
        </div>
      </div>
      <div>
        <label className="block text-neon-green font-bold mb-1">Objetivo del Duelo</label>
        <select value={objective} onChange={e => setObjective(e.target.value)} className="w-full rounded-lg border border-neon-green bg-black/60 text-neon-green px-3 py-2">
          {duelObjectives.map(obj => <option key={obj} value={obj}>{obj}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-neon-green font-bold mb-1">Puntos de Apuesta</label>
        <input type="range" min={5} max={100} value={points} onChange={e => setPoints(Number(e.target.value))} className="w-full accent-neon-green" />
        <div className="text-neon-green text-xl font-bold mt-1">{points}</div>
      </div>
      <div>
        <label className="block text-neon-green font-bold mb-1">Invitar a Jugador/Equipo</label>
        <input type="text" value={opponent} onChange={e => setOpponent(e.target.value)} disabled={openDuel} placeholder="Nombre de usuario o equipo" className="w-full rounded-lg border border-neon-green bg-black/60 text-neon-green px-3 py-2" />
        <div className="flex items-center gap-2 mt-2">
          <input type="checkbox" checked={openDuel} onChange={e => setOpenDuel(e.target.checked)} id="openDuel" />
          <label htmlFor="openDuel" className="text-neon-green">Duelo Abierto</label>
        </div>
      </div>
      <button type="submit" className="mt-2 bg-gradient-to-r from-neon-green to-blue-500 text-black font-extrabold text-lg py-2 rounded-lg w-full transition-all shadow-lg hover:scale-105 hover:from-blue-500 hover:to-neon-green hover:text-white border-4 border-blue-400 drop-shadow-lg tracking-wide" style={{ textShadow: '0 2px 8px #fff', color: '#111' }}>
        ¡LANZAR DESAFÍO!
      </button>
    </form>
  );
};

export default DuelCreateForm; 