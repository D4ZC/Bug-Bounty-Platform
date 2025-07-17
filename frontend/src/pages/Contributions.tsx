import React from 'react';

const contributions = [
  { id: 1, user: 'Ana Torres', type: 'Bug report', date: '2024-06-01', description: 'Reporte de XSS en login.' },
  { id: 2, user: 'Carlos Pérez', type: 'Feature', date: '2024-06-02', description: 'Sugerencia de nueva funcionalidad de notificaciones.' },
  { id: 3, user: 'Lucía Gómez', type: 'Bug fix', date: '2024-06-03', description: 'Corrección de error en el dashboard.' },
];

const Contributions: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Contribuciones Recientes</h2>
      <ul className="space-y-4">
        {contributions.map(contrib => (
          <li key={contrib.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-blue-700">{contrib.user}</span>
              <span className="text-xs text-gray-500">{contrib.date}</span>
            </div>
            <div className="text-sm text-gray-800">{contrib.type}: {contrib.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contributions; 