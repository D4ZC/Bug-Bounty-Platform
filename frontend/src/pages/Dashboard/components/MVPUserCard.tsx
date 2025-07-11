import React from 'react';

interface MVPUser {
  name: string;
  img: string;
  stats: any;
}

const MVPUserCard: React.FC<{ user: MVPUser }> = ({ user }) => (
  <div className="bg-gradient-to-br from-orange-900 via-orange-800 to-orange-950 border border-orange-400 rounded-xl shadow-md p-6 flex flex-col justify-between cursor-pointer hover:scale-105 transition-transform duration-200">
    <h2 className="text-2xl font-bold text-orange-300 mb-2 text-center">MVP User</h2>
    <p className="text-orange-100 text-center mb-1">¡El jugador más valioso del momento!</p>
    <div className="flex justify-center mb-4">
      <span className="inline-block bg-orange-700/60 text-orange-200 px-4 py-2 rounded-lg font-mono text-lg font-semibold">JUGADOR MVP</span>
    </div>
    <div className="text-center">
      {/* Placeholder de imagen de usuario */}
      <div className="w-16 h-16 bg-orange-300 rounded-full mb-2 flex items-center justify-center mx-auto">
        {/* Aquí iría la imagen: <img src={user.img} ... /> */}
      </div>
      {/* Placeholder de pedestal */}
      <div className="w-24 h-12 bg-orange-300 rounded-b-full shadow-inner mx-auto" />
    </div>
  </div>
);

export default MVPUserCard; 