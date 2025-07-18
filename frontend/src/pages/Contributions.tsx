import React from 'react';

const contributions = [
  { id: 1, user: 'Ana Torres', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', type: 'Bug report', date: '2024-06-01', description: 'Reporte de XSS en login.', likes: 5, status: 'Aceptado', comments: ['¡Buen hallazgo!', 'Reproducido con éxito.'] },
  { id: 2, user: 'Carlos Pérez', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', type: 'Feature', date: '2024-06-02', description: 'Sugerencia de nueva funcionalidad de notificaciones.', likes: 2, status: 'Pendiente', comments: ['Buena idea.', '¿Cómo lo implementarías?'] },
  { id: 3, user: 'Lucía Gómez', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', type: 'Bug fix', date: '2024-06-03', description: 'Corrección de error en el dashboard.', likes: 4, status: 'Aceptado', comments: ['Gracias por el fix.', 'Ya está en producción.'] },
  { id: 4, user: 'Pedro Ramiro', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', type: 'Bug report', date: '2024-06-04', description: 'Reporte de CSRF en perfil.', likes: 1, status: 'Rechazado', comments: ['No se pudo reproducir.'] },
  { id: 5, user: 'Sofía Martínez', avatar: 'https://randomuser.me/api/portraits/women/12.jpg', type: 'Feature', date: '2024-06-05', description: 'Propuesta de dashboard personalizable.', likes: 3, status: 'Pendiente', comments: ['Interesante propuesta.'] },
  { id: 6, user: 'Miguel Ángel', avatar: 'https://randomuser.me/api/portraits/men/21.jpg', type: 'Bug fix', date: '2024-06-06', description: 'Solución a bug de notificaciones duplicadas.', likes: 2, status: 'Aceptado', comments: ['¡Funciona perfecto!'] },
];

const typeColors: Record<string, string> = {
  'Bug report': 'bg-red-100 text-red-800',
  'Feature': 'bg-blue-100 text-blue-800',
  'Bug fix': 'bg-green-100 text-green-800',
};

const statusColors: Record<string, string> = {
  'Aceptado': 'bg-green-200 text-green-900',
  'Pendiente': 'bg-yellow-200 text-yellow-900',
  'Rechazado': 'bg-red-200 text-red-900',
};

const Contributions: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Contribuciones Recientes</h2>
      <ul className="space-y-4">
        {contributions.map(contrib => (
          <li key={contrib.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-3">
                <img src={contrib.avatar} alt={contrib.user} className="w-8 h-8 rounded-full" />
                <span className="font-semibold text-blue-700">{contrib.user}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ml-2 ${typeColors[contrib.type]}`}>{contrib.type}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ml-2 ${statusColors[contrib.status]}`}>{contrib.status}</span>
              </div>
              <span className="text-xs text-gray-500">{contrib.date}</span>
            </div>
            <div className="text-sm text-gray-800 mb-2">{contrib.description}</div>
            <div className="flex items-center gap-4 text-xs text-gray-500 mb-1">
              <span>👍 {contrib.likes} likes</span>
              {contrib.comments && contrib.comments.length > 0 && (
                <span>💬 {contrib.comments.length} comentario{contrib.comments.length > 1 ? 's' : ''}</span>
              )}
            </div>
            {contrib.comments && contrib.comments.length > 0 && (
              <ul className="ml-4 mt-1 text-xs text-gray-600 list-disc">
                {contrib.comments.slice(0,2).map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contributions; 