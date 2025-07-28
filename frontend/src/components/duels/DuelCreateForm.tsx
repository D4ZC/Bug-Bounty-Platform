import React, { useState, useEffect } from 'react';
import { FaUser, FaUsers } from 'react-icons/fa';

const getDuelObjectives = (vulnerabilityLevel: string) => [
  `Resolver X vulnerabilidades ${vulnerabilityLevel === 'crítica' ? 'críticas' : vulnerabilityLevel === 'media' ? 'medias' : 'bajas'}`,
  `Mejor puntuación en Y tiempo (${vulnerabilityLevel})`,
  `Primero en 5 Vulnerabilidades ${vulnerabilityLevel === 'crítica' ? 'críticas' : vulnerabilityLevel === 'media' ? 'medias' : 'bajas'}`,
];

const vulnerabilityLevels = [
  { value: 'crítica', label: 'Crítica', color: 'text-red-400', bgColor: 'bg-red-600' },
  { value: 'media', label: 'Media', color: 'text-yellow-400', bgColor: 'bg-yellow-600' },
  { value: 'baja', label: 'Baja', color: 'text-green-400', bgColor: 'bg-green-600' },
];

interface DuelCreateFormProps {
  onCreate: (data: any) => void;
}

const DuelCreateForm: React.FC<DuelCreateFormProps> = ({ onCreate }) => {
  const [type, setType] = useState<'INDIVIDUAL' | 'EQUIPO'>('INDIVIDUAL');
  const [objective, setObjective] = useState('');
  const [points, setPoints] = useState(10);
  const [opponent, setOpponent] = useState('');
  const [openDuel, setOpenDuel] = useState(false);
  const [team1Members, setTeam1Members] = useState(['', '', '', '', '']);
  const [myTeamName, setMyTeamName] = useState('');
  const [opponentTeamName, setOpponentTeamName] = useState('');
  const [vulnerabilityLevel, setVulnerabilityLevel] = useState<'crítica' | 'media' | 'baja'>('media');

  // Actualizar objetivo cuando cambie el nivel de vulnerabilidad
  useEffect(() => {
    const objectives = getDuelObjectives(vulnerabilityLevel);
    setObjective(objectives[0]);
  }, [vulnerabilityLevel]);

  return (
    <form
      className="bg-black/60 border border-neon-green rounded-xl p-4 flex flex-col gap-3"
      onSubmit={e => {
        e.preventDefault();
        if (type === 'EQUIPO') {
          onCreate({
            type: 'EQUIPO',
            objective,
            points,
            openDuel,
            vulnerabilityLevel,
            opponents: [
              { teamName: myTeamName || 'Mi equipo', members: team1Members.map(name => ({ avatar: '', name })) },
              { teamName: opponentTeamName || 'Por definir', members: [] },
            ],
          });
        } else {
          onCreate({ type, objective, points, opponent: openDuel ? null : opponent, openDuel, vulnerabilityLevel });
        }
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
      {type === 'EQUIPO' && (
        <div className="mb-4">
          <label className="block text-neon-green font-bold mb-1">Nombre de tu equipo</label>
          <input
            type="text"
            className="w-full mb-2 px-2 py-1 rounded bg-gray-800 text-white border border-neon-green/30"
            placeholder="Nombre de tu equipo"
            value={myTeamName}
            onChange={e => setMyTeamName(e.target.value)}
          />
          <label className="block text-neon-green font-bold mb-1">Integrantes de tu equipo</label>
          {team1Members.map((name, idx) => (
            <input
              key={idx}
              type="text"
              className="w-full mb-1 px-2 py-1 rounded bg-gray-800 text-white border border-neon-green/30"
              placeholder={`Miembro ${idx + 1}`}
              value={name}
              onChange={e => {
                const newMembers = [...team1Members];
                newMembers[idx] = e.target.value;
                setTeam1Members(newMembers);
              }}
            />
          ))}
          <label className="block text-neon-green font-bold mt-2 mb-1">Nombre del equipo oponente (opcional)</label>
          <input
            type="text"
            className="w-full mb-2 px-2 py-1 rounded bg-gray-800 text-white border border-neon-green/30"
            placeholder="Nombre del equipo oponente"
            value={opponentTeamName}
            onChange={e => setOpponentTeamName(e.target.value)}
          />
          
          {/* Selector de nivel de vulnerabilidad */}
          <div className="mt-4 p-3 bg-gray-900/50 rounded-lg border border-neon-green/30">
            <label className="block text-neon-green font-bold mb-3 text-center">🎯 TIPO DE VULNERABILIDAD</label>
            <div className="flex gap-2 mb-3">
              {vulnerabilityLevels.map((level) => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => setVulnerabilityLevel(level.value as 'crítica' | 'media' | 'baja')}
                  className={`flex-1 px-3 py-3 rounded-lg border-2 font-bold text-sm transition-all duration-200 ${
                    vulnerabilityLevel === level.value
                      ? `${level.bgColor} text-white border-white scale-105 shadow-lg`
                      : 'bg-black/60 text-gray-300 border-gray-600 hover:border-neon-green hover:text-neon-green'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-lg mb-1">
                      {level.value === 'crítica' ? '🔥' : level.value === 'media' ? '⚡' : '🛡️'}
                    </span>
                    <span>{level.label}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="text-xs text-gray-300 text-center p-2 bg-black/30 rounded">
              {vulnerabilityLevel === 'crítica' && '🔥 Vulnerabilidades críticas - Mayor puntuación y riesgo'}
              {vulnerabilityLevel === 'media' && '⚡ Vulnerabilidades medias - Puntuación moderada'}
              {vulnerabilityLevel === 'baja' && '🛡️ Vulnerabilidades bajas - Puntuación menor, menor riesgo'}
            </div>
          </div>
        </div>
      )}
      <div>
        <label className="block text-neon-green font-bold mb-1">Objetivo del Duelo</label>
        <select value={objective} onChange={e => setObjective(e.target.value)} className="w-full rounded-lg border border-neon-green bg-black/60 text-neon-green px-3 py-2">
          {getDuelObjectives(vulnerabilityLevel).map(obj => <option key={obj} value={obj}>{obj}</option>)}
        </select>
      </div>
      
      {/* Selector de vulnerabilidad para duelos individuales */}
      {type === 'INDIVIDUAL' && (
        <div>
          <label className="block text-neon-green font-bold mb-1">Nivel de Vulnerabilidad</label>
          <div className="flex gap-2">
            {vulnerabilityLevels.map((level) => (
              <button
                key={level.value}
                type="button"
                onClick={() => setVulnerabilityLevel(level.value as 'crítica' | 'media' | 'baja')}
                className={`flex-1 px-2 py-1 rounded border font-bold text-xs transition-all duration-200 ${
                  vulnerabilityLevel === level.value
                    ? `${level.bgColor} text-white border-white`
                    : 'bg-black/60 text-gray-300 border-gray-600 hover:border-neon-green hover:text-neon-green'
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>
      )}
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