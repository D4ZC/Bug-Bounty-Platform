import React from 'react';

const MVPTeamCard: React.FC<{ team: string }> = ({ team }) => (
  <div className="col-span-1 flex flex-col items-center justify-center min-h-[200px] bg-gradient-to-br from-black to-[#0ff0fc] border-2 border-[#00fff7] rounded-2xl p-6 font-mono text-[#00fff7] mx-auto w-full max-w-md">
    <h2 className="text-2xl font-bold mb-2">MVP Team</h2>
    <div className="text-3xl font-bold mb-4">{team}</div>
    {/* Placeholder de pedestal */}
    <div className="w-24 h-12 bg-[#7a3a09] rounded-b-full shadow-inner" />
  </div>
);

export default MVPTeamCard; 