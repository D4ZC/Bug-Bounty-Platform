import React from 'react';

interface MVPUser {
  name: string;
  img: string;
  stats: any;
}

const MVPUserCard: React.FC<{ user: MVPUser }> = ({ user }) => (
  <div className="col-span-1 flex flex-col items-center justify-center min-h-[200px] bg-gradient-to-br from-black to-[#0ff0fc] border-2 border-[#00fff7] rounded-2xl p-6 font-mono text-[#00fff7] mx-auto w-full max-w-md">
    <h2 className="text-2xl font-bold mb-2">MVP User</h2>
    <div className="mb-2">Top 3 Teams</div>
    {/* Placeholder de imagen de usuario */}
    <div className="w-16 h-16 bg-[#232b36] rounded-full mb-2 flex items-center justify-center" />
    {/* Placeholder de pedestal */}
    <div className="w-24 h-12 bg-[#7a3a09] rounded-b-full shadow-inner" />
  </div>
);

export default MVPUserCard; 