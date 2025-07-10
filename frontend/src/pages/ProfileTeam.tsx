import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ProfileTeam: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isTeam = location.pathname === '/profile/team';

  return (
    <div className="max-w-4xl mx-auto mt-8 flex flex-col">
      {/* Tabs tipo recuadro pequeño, alineados a la izquierda con desplazamiento de 35px */}
      <div className="flex gap-4 mb-8 ml-[35px] -mt-2">
        <div
          className={`w-48 text-center py-3 rounded-lg cursor-pointer transition-colors duration-200 font-semibold text-base border-b-4 ${
            !isTeam
              ? 'bg-white text-blue-700 border-blue-700 shadow' 
              : 'bg-gray-100 text-gray-500 border-transparent hover:bg-gray-200'
          }`}
          onClick={() => navigate('/profile')}
        >
          Perfil de usuario
        </div>
        <div
          className={`w-48 text-center py-3 rounded-lg cursor-pointer transition-colors duration-200 font-semibold text-base border-b-4 ${
            isTeam
              ? 'bg-white text-blue-700 border-blue-700 shadow' 
              : 'bg-gray-100 text-gray-500 border-transparent hover:bg-gray-200'
          }`}
          onClick={() => navigate('/profile/team')}
        >
          Perfil de equipos
        </div>
      </div>
      {/* Aquí puedes agregar el contenido del perfil de equipos */}
    </div>
  );
};

export default ProfileTeam; 