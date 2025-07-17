import React from 'react';
import { Link } from 'react-router-dom';

const Demo: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">¡Bienvenido a la Plataforma Bug Bounty!</h2>
        <p className="text-gray-600 mb-6">Explora las diferentes secciones usando el menú lateral. Aquí tienes accesos rápidos:</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">Dashboard</Link>
          <Link to="/profile" className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-200">Perfil</Link>
          <Link to="/chat" className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium hover:bg-green-200">Chat</Link>
          <Link to="/list" className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg font-medium hover:bg-yellow-200">Lista</Link>
          <Link to="/mvp" className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-medium hover:bg-purple-200">MVP</Link>
          <Link to="/settings" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200">Configuración</Link>
        </div>
      </div>
    </div>
  );
};

export default Demo; 