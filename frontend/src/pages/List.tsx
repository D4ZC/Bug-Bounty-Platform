import React from 'react';

const exampleBugs = [
  { id: 1, title: 'XSS en formulario de login', status: 'Abierto', severity: 'Alta' },
  { id: 2, title: 'SQL Injection en búsqueda', status: 'Resuelto', severity: 'Crítica' },
  { id: 3, title: 'CSRF en perfil', status: 'En revisión', severity: 'Media' },
  { id: 4, title: 'Error 500 al subir archivos', status: 'Abierto', severity: 'Alta' },
  { id: 5, title: 'Desbordamiento de búfer en módulo de chat', status: 'Rechazado', severity: 'Crítica' },
  { id: 6, title: 'Petición no autenticada permite acceso', status: 'Resuelto', severity: 'Alta' },
  { id: 7, title: 'Desincronización de datos en dashboard', status: 'En revisión', severity: 'Media' },
  { id: 8, title: 'Mejora: Filtro avanzado de reportes', status: 'Solicitado', severity: 'Baja' },
  { id: 9, title: 'Bug: No se puede eliminar usuario', status: 'Abierto', severity: 'Alta' },
  { id: 10, title: 'Nueva funcionalidad: Notificaciones push', status: 'Solicitado', severity: 'Baja' },
  { id: 11, title: 'Race condition en transferencias', status: 'Resuelto', severity: 'Crítica' },
  { id: 12, title: 'UI: Botón de guardar no responde', status: 'Abierto', severity: 'Media' },
  { id: 13, title: 'IDOR en historial de compras', status: 'En revisión', severity: 'Alta' },
  { id: 14, title: 'Actualización: Mejorar rendimiento de búsqueda', status: 'Solicitado', severity: 'Baja' },
  { id: 15, title: 'Bug: Mensajes duplicados en chat', status: 'Resuelto', severity: 'Media' },
];

const statusColors: Record<string, string> = {
  'Abierto': 'bg-blue-100 text-blue-800',
  'Resuelto': 'bg-green-100 text-green-800',
  'Rechazado': 'bg-red-100 text-red-800',
  'En revisión': 'bg-yellow-100 text-yellow-800',
  'Solicitado': 'bg-purple-100 text-purple-800',
};

const severityColors: Record<string, string> = {
  'Crítica': 'bg-red-200 text-red-900',
  'Alta': 'bg-orange-200 text-orange-900',
  'Media': 'bg-yellow-200 text-yellow-900',
  'Baja': 'bg-green-200 text-green-900',
};

function getPositionColor(index: number) {
  if (index === 0) return 'bg-yellow-300 text-yellow-900'; // 1er lugar - oro
  if (index === 1) return 'bg-gray-300 text-gray-900';    // 2do lugar - plata
  if (index === 2) return 'bg-orange-300 text-orange-900'; // 3er lugar - bronce
  if (index < 10) return 'bg-gray-200 text-gray-700';      // 4-10 - plateado claro
  return 'bg-orange-100 text-orange-800';                  // resto - bronce claro
}

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
          {exampleBugs.map((bug, idx) => (
            <tr key={bug.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPositionColor(idx)}`}>{bug.id}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{bug.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[bug.status] || 'bg-gray-100 text-gray-800'}`}>{bug.status}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${severityColors[bug.severity] || 'bg-gray-100 text-gray-800'}`}>{bug.severity}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List; 