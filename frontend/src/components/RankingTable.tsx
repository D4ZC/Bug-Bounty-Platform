import React from 'react';

// Tipos de datos para la tabla
export type RankingRow = {
  position: number;
  name: string;
  icon?: string; // emoji o url
  resolved: number;
  resolvedGoal?: number; // para barra de progreso
  points: number;
  weeklyChange: number; // positivo, negativo o cero
  effectiveness: number; // porcentaje
  effectivenessIcon?: string; // emoji
  remaining: number;
  remainingGoal?: number; // para barra de progreso
  lastUpdate: string; // texto amigable
};

interface RankingTableProps {
  title: string;
  data: RankingRow[];
  type: 'team' | 'user';
}

const medalIcons = ['🥇', '🥈', '🥉'];

const RankingTable: React.FC<RankingTableProps> = ({ title, data, type }) => {
  return (
    <div className="w-full max-w-5xl mx-auto bg-[#23263a] rounded-2xl shadow-2xl p-6 mb-10">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        {title}
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-[#181A20] text-blue-200">
              <th className="py-2 px-3">Posición</th>
              <th className="py-2 px-3">{type === 'team' ? 'Equipo' : 'Usuario'}</th>
              <th className="py-2 px-3">Vuln. Resueltas</th>
              <th className="py-2 px-3">Puntos</th>
              <th className="py-2 px-3">Progreso Semanal</th>
              <th className="py-2 px-3">Efectividad</th>
              <th className="py-2 px-3">Vuln. Restantes</th>
              <th className="py-2 px-3">Última Actualización</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={row.name} className={`border-b border-[#2d3147] ${idx === 0 ? 'bg-gradient-to-r from-yellow-900/30 to-transparent' : ''}`}>
                {/* Posición y medalla */}
                <td className="py-2 px-3 font-bold text-lg text-center">
                  {row.position <= 3 ? (
                    <span className="text-2xl">{medalIcons[row.position - 1]}</span>
                  ) : (
                    <span>{row.position}</span>
                  )}
                </td>
                {/* Nombre + icono */}
                <td className="py-2 px-3 font-semibold">
                  <span>{row.name}</span>
                </td>
                {/* Vuln. Resueltas + barra */}
                <td className="py-2 px-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{row.resolved}</span>
                    {row.resolvedGoal && (
                      <div className="w-24 h-2 bg-gray-700 rounded">
                        <div
                          className="h-2 bg-blue-400 rounded"
                          style={{ width: `${Math.min(100, (row.resolved / row.resolvedGoal) * 100)}%` }}
                        />
                      </div>
                    )}
                  </div>
                </td>
                {/* Puntos */}
                <td className="py-2 px-3">
                  <span className="text-lg font-extrabold text-green-400 drop-shadow">{row.points}</span>
                </td>
                {/* Progreso semanal */}
                <td className="py-2 px-3">
                  {row.weeklyChange > 0 && (
                    <span className="text-green-400 font-bold">↑ {row.weeklyChange}</span>
                  )}
                  {row.weeklyChange < 0 && (
                    <span className="text-red-400 font-bold">↓ {Math.abs(row.weeklyChange)}</span>
                  )}
                  {row.weeklyChange === 0 && (
                    <span className="text-gray-400 font-bold">-</span>
                  )}
                </td>
                {/* Efectividad */}
                <td className="py-2 px-3">
                  <span className="text-yellow-300 font-bold flex items-center gap-1">
                    {row.effectivenessIcon || '🌟'} {row.effectiveness}%
                  </span>
                </td>
                {/* Vuln. Restantes + barra */}
                <td className="py-2 px-3">
                  <div className="flex items-center gap-2">
                    <span>{row.remaining}</span>
                    {row.remainingGoal && (
                      <div className="w-20 h-2 bg-gray-700 rounded">
                        <div
                          className="h-2 bg-pink-400 rounded"
                          style={{ width: `${Math.min(100, (row.remainingGoal - row.remaining) / row.remainingGoal * 100)}%` }}
                        />
                      </div>
                    )}
                  </div>
                </td>
                {/* Última actualización */}
                <td className="py-2 px-3 text-blue-200 text-xs">{row.lastUpdate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RankingTable; 