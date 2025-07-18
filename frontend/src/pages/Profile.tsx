import React from 'react';
import { FaMedal, FaTrophy, FaBug, FaFlagCheckered } from 'react-icons/fa';

const user = {
  avatar: 'https://i.pinimg.com/736x/23/8d/ad/238dad5a2186e67d9c11d47a50f5100d.jpg',
  nombre: 'Pedro Ramiro',
  nickname: 'bughunter',
  id: '157207692',
  guilda: 'AKA-SUKI',
  rango: 'Oro',
  puntos: 52450,
  ranking: 'Top 37%',
  porcentaje: 37,
  miembroDesde: '2023-01-15',
  insignias: [
    { icon: <FaMedal className="text-yellow-500" />, label: 'Oro' },
    { icon: <FaTrophy className="text-gray-400" />, label: 'Competidor' },
  ],
  marcasRecientes: [
    { icon: <FaBug className="text-green-600" />, label: '3 vulnerabilidades resueltas (últimos 7 días)' },
    { icon: <FaFlagCheckered className="text-blue-600" />, label: '2 desafíos completados (última semana)' },
    { icon: <FaTrophy className="text-yellow-600" />, label: 'Logro: "Primer Hallazgo"' },
  ],
};

const Profile: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md p-8 flex flex-col gap-6">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b pb-4">
          <div className="flex items-center gap-4">
            <img src={user.avatar} alt="avatar" className="w-16 h-16 rounded-full border-4 border-blue-200" />
            <div>
              <h2 className="text-2xl font-bold mb-1">{user.nombre}</h2>
              <span className="text-blue-600 font-semibold">{user.nickname}</span>
            </div>
          </div>
          <div className="flex flex-col md:items-end">
            <span className="text-gray-500 text-sm">ID: {user.id}</span>
            <span className="text-gray-500 text-sm">Nickname: {user.guilda}</span>
          </div>
        </div>

        {/* Rango y puntos */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">
              <FaMedal className="text-yellow-500 mr-1" />
              {user.rango}
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">{user.puntos} puntos</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">{user.ranking}</span>
            <span className="text-xs text-gray-400">({user.porcentaje} porciento)</span>
          </div>
        </div>

        {/* Insignias */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Insignias</h3>
          <div className="flex gap-4">
            {user.insignias.map((insignia, idx) => (
              <div key={idx} className="flex flex-col items-center">
                {insignia.icon}
                <span className="text-xs text-gray-500 mt-1">{insignia.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Marcas recientes */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Logros recientes</h3>
          <div className="flex flex-col gap-2">
            {user.marcasRecientes.map((marca, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-gray-50 rounded px-3 py-2">
                {marca.icon}
                <span className="text-sm text-gray-700">{marca.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Miembro desde */}
        <div className="text-sm text-gray-400 text-right">Miembro desde: {user.miembroDesde}</div>
      </div>
    </div>
  );
};

export default Profile; 