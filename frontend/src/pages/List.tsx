import React from 'react';

const exampleBugs = [
  { id: 1, title: 'XSS en formulario de login', status: 'Abierto', severity: 'Alta' },
  { id: 2, title: 'SQL Injection en búsqueda', status: 'Resuelto', severity: 'Crítica' },
  { id: 3, title: 'CSRF en perfil', status: 'En revisión', severity: 'Media' },
];

const List: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6">Lista de Bugs Reportados</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severidad</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {exampleBugs.map(bug => (
            <tr key={bug.id}>
              <td className="px-6 py-4 whitespace-nowrap">{bug.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{bug.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">{bug.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">{bug.severity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List; 