import React from 'react';
import { Edit } from '@carbon/icons-react';

const user = {
  name: 'Sofia Reynolds',
  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  background: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
};

const PerfilDeUsuario: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-black">
      {/* Fondo superior */}
      <div className="w-full h-40 md:h-56 relative">
        <img
          src={user.background}
          alt="background"
          className="w-full h-full object-cover"
        />
        {/* Botón editar fondo (opcional) */}
        <button className="absolute top-3 right-3 bg-white/80 rounded-full p-1 hover:bg-white transition-colors">
          <Edit size={20} className="text-gray-700" />
        </button>
        {/* Avatar grande centrado */}
        <div className="absolute left-1/2 -bottom-16 transform -translate-x-1/2 flex flex-col items-center">
          <div className="relative">
            <img
              src={user.avatar}
              alt="avatar"
              className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
            />
            {/* Botón editar avatar */}
            <button className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-200 transition-colors">
              <Edit size={20} className="text-gray-700" />
            </button>
          </div>
        </div>
      </div>
      {/* Espacio para info adicional */}
      <div className="mt-20 w-full max-w-2xl px-4 text-white">
        <h2 className="text-2xl font-bold text-center mb-2">{user.name}</h2>
        {/* Aquí puedes agregar más información del usuario */}
      </div>
    </div>
  );
};

export default PerfilDeUsuario; 