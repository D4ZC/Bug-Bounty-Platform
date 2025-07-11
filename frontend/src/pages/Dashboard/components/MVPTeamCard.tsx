import React from 'react';

const MVPTeamCard: React.FC<{ team: string }> = ({ team }) => (
  <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950 border border-purple-400 rounded-xl shadow-md p-6 flex flex-col justify-between cursor-pointer hover:scale-105 transition-transform duration-200">
    <h2 className="text-2xl font-bold text-purple-300 mb-2 text-center">MVP Team</h2>
    <p className="text-purple-100 text-center mb-1">¡El equipo más valioso del momento!</p>
    <div className="flex justify-center mb-4">
      <span className="inline-block bg-purple-700/60 text-purple-200 px-4 py-2 rounded-lg font-mono text-lg font-semibold">EQUIPO MVP</span>
    </div>
    <div className="text-center">
      <div className="text-3xl font-bold text-purple-300 mb-4">{team}</div>
      {/* Placeholder de pedestal */}
      <div className="w-24 h-12 bg-purple-300 rounded-b-full shadow-inner mx-auto" />
    </div>
  </div>
);

export default MVPTeamCard; 