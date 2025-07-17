import React from 'react';

const gulagUsers = [
  { id: 1, name: 'Pedro Ramiro', reason: 'Spam', since: '2024-06-01' },
  { id: 2, name: 'María López', reason: 'Conducta inapropiada', since: '2024-06-03' },
];

const Gulag: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Usuarios en el Gulag</h2>
      <p className="mb-4 text-gray-600">Estos usuarios han sido enviados al Gulag por infringir las reglas de la plataforma.</p>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Motivo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Desde</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {gulagUsers.map(user => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.reason}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.since}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Gulag; 