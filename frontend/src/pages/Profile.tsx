import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="w-full h-full">
      <h2 className="text-2xl font-semibold mb-6">Perfil de Usuario</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            U
          </div>
          <div>
            <h3 className="text-xl font-semibold">Usuario Demo</h3>
            <p className="text-gray-600">usuario@demo.com</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Información Personal</h4>
            <div className="space-y-2 text-gray-700">
              <p><span className="font-medium">Nombre:</span> Usuario Demo</p>
              <p><span className="font-medium">Email:</span> usuario@demo.com</p>
              <p><span className="font-medium">Equipo:</span> Equipo Demo</p>
              <p><span className="font-medium">Fecha de registro:</span> 2024-01-01</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Estadísticas</h4>
            <div className="space-y-2 text-gray-700">
              <p><span className="font-medium">Puntos totales:</span> 1,250</p>
              <p><span className="font-medium">Blue Points:</span> 45</p>
              <p><span className="font-medium">Vulnerabilidades resueltas:</span> 23</p>
              <p><span className="font-medium">Posición en ranking:</span> #15</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 