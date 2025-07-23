import React from 'react';

interface Champion {
  position: number;
  avatar: string;
  name: string;
  wins: number;
  points: number;
}

interface ChampionsTableProps {
  champions: Champion[];
}

const getRowClass = (pos: number) => {
  if (pos === 1) return 'bg-yellow-400/20';
  if (pos === 2) return 'bg-gray-300/20';
  if (pos === 3) return 'bg-orange-400/20';
  return '';
};

const ChampionsTable: React.FC<ChampionsTableProps> = ({ champions }) => {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full text-left rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-black/70 text-neon-green">
            <th className="px-4 py-2">Posición</th>
            <th className="px-4 py-2">Avatar</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Victorias</th>
            <th className="px-4 py-2">Puntos</th>
          </tr>
        </thead>
        <tbody>
          {champions.map((champ) => (
            <tr key={champ.position} className={`border-b border-neon-green/20 ${getRowClass(champ.position)}`}>
              <td className="px-4 py-2 font-bold text-lg">{champ.position}</td>
              <td className="px-4 py-2"><img src={champ.avatar} alt={champ.name} className="w-8 h-8 rounded-full border-2 border-neon-green" /></td>
              <td className="px-4 py-2">{champ.name}</td>
              <td className="px-4 py-2">{champ.wins}</td>
              <td className="px-4 py-2 text-neon-green font-bold">{champ.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChampionsTable; 