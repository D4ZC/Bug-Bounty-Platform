import React from 'react';

const gulagUsers = [
  { id: 1, name: 'Pedro Ramiro', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', reason: 'Spam', since: '2024-06-01', duration: '7 días', severity: 'Alta', repeat: 2 },
  { id: 2, name: 'María López', avatar: 'https://randomuser.me/api/portraits/women/65.jpg', reason: 'Conducta inapropiada', since: '2024-06-03', duration: '14 días', severity: 'Crítica', repeat: 1 },
  { id: 3, name: 'Juan García', avatar: 'https://randomuser.me/api/portraits/men/12.jpg', reason: 'Abuso de reportes', since: '2024-06-05', duration: '3 días', severity: 'Media', repeat: 3 },
  { id: 4, name: 'Sofía Martínez', avatar: 'https://randomuser.me/api/portraits/women/12.jpg', reason: 'Lenguaje ofensivo', since: '2024-06-06', duration: '5 días', severity: 'Alta', repeat: 1 },
  { id: 5, name: 'Carlos Pérez', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', reason: 'Intento de fraude', since: '2024-06-07', duration: '30 días', severity: 'Crítica', repeat: 2 },
  { id: 6, name: 'Lucía Gómez', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', reason: 'Spam', since: '2024-06-08', duration: '2 días', severity: 'Baja', repeat: 1 },
];

const severityColors: Record<string, string> = {
  'Crítica': 'bg-red-200 text-red-900',
  'Alta': 'bg-orange-200 text-orange-900',
  'Media': 'bg-yellow-200 text-yellow-900',
  'Baja': 'bg-green-200 text-green-900',
};

const repeatColors = [
  'bg-green-100 text-green-800', // 1 vez
  'bg-yellow-100 text-yellow-800', // 2 veces
  'bg-red-100 text-red-800', // 3+ veces
];

function getRepeatColor(repeat: number) {
  if (repeat === 1) return repeatColors[0];
  if (repeat === 2) return repeatColors[1];
  return repeatColors[2];
}

const Gulag: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Usuarios en el Gulag</h2>
      <p className="mb-4 text-gray-600">Estos usuarios han sido enviados al Gulag por infringir las reglas de la plataforma.</p>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Motivo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Desde</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duración</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severidad</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reincidencia</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {gulagUsers.map(user => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                <span>{user.name}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{user.reason}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.since}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.duration}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${severityColors[user.severity]}`}>{user.severity}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRepeatColor(user.repeat)}`}>{user.repeat} vez{user.repeat > 1 ? 'es' : ''}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Gulag; 