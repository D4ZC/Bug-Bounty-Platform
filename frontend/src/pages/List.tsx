import React, { useState } from 'react';

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

const bugStats = {
  total: exampleBugs.length,
  open: exampleBugs.filter(b => b.status === 'Abierto').length,
  critical: exampleBugs.filter(b => b.severity === 'Crítica').length,
  resolved: exampleBugs.filter(b => b.status === 'Resuelto').length,
};
const bugAchievements = [
  { icon: '🐞', label: '10+ bugs críticos reportados' },
  { icon: '🚀', label: '5 mejoras implementadas' },
  { icon: '🔒', label: '0 vulnerabilidades sin resolver' },
];
const recentCritical = exampleBugs.filter(b => b.severity === 'Crítica').slice(0, 3);
const allStatuses = Array.from(new Set(exampleBugs.map(b => b.status)));
const allSeverities = Array.from(new Set(exampleBugs.map(b => b.severity)));

const bugsBySeverity = [
  { label: 'Crítica', value: exampleBugs.filter(b => b.severity === 'Crítica').length, color: 'bg-red-400' },
  { label: 'Alta', value: exampleBugs.filter(b => b.severity === 'Alta').length, color: 'bg-orange-400' },
  { label: 'Media', value: exampleBugs.filter(b => b.severity === 'Media').length, color: 'bg-yellow-400' },
  { label: 'Baja', value: exampleBugs.filter(b => b.severity === 'Baja').length, color: 'bg-green-400' },
];
const topReporters = [
  { name: 'Ana Torres', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', bugs: 7 },
  { name: 'Carlos Pérez', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', bugs: 6 },
  { name: 'Lucía Gómez', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', bugs: 5 },
];
const featuredBugs = [
  { id: 2, title: 'SQL Injection en búsqueda', desc: 'Vulnerabilidad crítica detectada en el buscador principal.', icon: '🛡️' },
  { id: 11, title: 'Race condition en transferencias', desc: 'Condición de carrera que afecta la integridad de las transferencias.', icon: '⚡' },
];
const reportTips = [
  'Describe claramente el bug y los pasos para reproducirlo.',
  'Adjunta capturas o evidencia si es posible.',
  'Indica la severidad estimada y el impacto.',
  'Evita reportar duplicados revisando la lista antes.',
];

const List: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');
  const filteredBugs = exampleBugs.filter(b =>
    (!statusFilter || b.status === statusFilter) &&
    (!severityFilter || b.severity === severityFilter)
  );
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      {/* Banner motivacional */}
      <div className="mb-8 bg-gradient-to-r from-blue-200 via-green-100 to-yellow-100 rounded-lg shadow p-6 flex flex-col items-center animate-in fade-in duration-300">
        <span className="text-3xl mb-2">🐞</span>
        <span className="font-bold text-blue-900 text-xl mb-1">¡Tu reporte puede hacer la diferencia!</span>
        <span className="text-gray-700 text-sm text-center">Ayuda a mejorar la plataforma reportando bugs de forma clara y responsable.</span>
      </div>
      {/* Gráfico de barras de bugs por severidad */}
      <div className="mb-8 bg-white rounded-lg shadow p-6 animate-in fade-in duration-300">
        <h3 className="text-lg font-bold text-indigo-800 mb-3 flex items-center gap-2">📊 Bugs por severidad</h3>
        <ul className="flex flex-col gap-2">
          {bugsBySeverity.map((s, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="w-20 truncate text-xs font-semibold text-gray-700">{s.label}</span>
              <div className="flex-1 bg-gray-100 rounded h-3 relative">
                <div className={`${s.color} h-3 rounded transition-all duration-500`} style={{ width: `${(s.value / bugStats.total) * 100}%` }}></div>
              </div>
              <span className="text-xs font-bold text-blue-700 ml-2">{s.value}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Top reporteros */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {topReporters.map((u, i) => (
          <div key={i} className="bg-blue-50 rounded-lg p-4 flex flex-col items-center shadow animate-in fade-in duration-300">
            <img src={u.avatar} alt={u.name} className="w-14 h-14 rounded-full border-2 border-blue-300 mb-2" />
            <span className="font-bold text-blue-800 text-lg mb-1">{u.name}</span>
            <span className="text-blue-700 text-sm mb-1">{u.bugs} bugs reportados</span>
            <span className="text-xs text-gray-500">Top {i + 1}</span>
          </div>
        ))}
      </div>
      {/* Bugs destacados */}
      <div className="mb-8 bg-yellow-50 rounded-lg shadow p-6 animate-in fade-in duration-300">
        <h3 className="text-lg font-bold text-yellow-800 mb-3 flex items-center gap-2">⭐ Bugs destacados</h3>
        <ul className="flex flex-wrap gap-4">
          {featuredBugs.map(b => (
            <li key={b.id} className="flex flex-col items-center bg-white rounded-lg p-3 min-w-[180px] shadow">
              <span className="text-3xl mb-1">{b.icon}</span>
              <span className="font-bold text-yellow-900 text-sm mb-1">{b.title}</span>
              <span className="text-gray-700 text-xs text-center">{b.desc}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Tips de reporte */}
      <div className="mb-8 bg-green-50 rounded-lg shadow p-6 animate-in fade-in duration-300">
        <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center gap-2">💡 Tips para reportar bugs</h3>
        <ul className="list-disc ml-6 text-green-900 text-sm flex flex-col gap-1">
          {reportTips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </div>
      {/* Estadísticas y logros */}
      <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-2xl font-bold text-blue-700">{bugStats.total}</span>
          <span className="text-xs text-gray-600">Total reportes</span>
        </div>
        <div className="bg-red-50 rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-2xl font-bold text-red-700">{bugStats.critical}</span>
          <span className="text-xs text-gray-600">Críticos</span>
        </div>
        <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-2xl font-bold text-green-700">{bugStats.resolved}</span>
          <span className="text-xs text-gray-600">Resueltos</span>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-2xl font-bold text-yellow-700">{bugStats.open}</span>
          <span className="text-xs text-gray-600">Abiertos</span>
        </div>
      </div>
      {/* Badges de logros */}
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-center">
        {bugAchievements.map((a, i) => (
          <div key={i} className="flex items-center gap-2 bg-green-50 rounded-full px-4 py-2 shadow text-green-800 font-semibold text-sm">
            <span className="text-xl">{a.icon}</span> {a.label}
          </div>
        ))}
      </div>
      {/* Filtros */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <select className="border rounded px-3 py-1 text-sm" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">Todos los estados</option>
          {allStatuses.map(s => <option key={s}>{s}</option>)}
        </select>
        <select className="border rounded px-3 py-1 text-sm" value={severityFilter} onChange={e => setSeverityFilter(e.target.value)}>
          <option value="">Todas las severidades</option>
          {allSeverities.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      {/* Bugs críticos recientes */}
      <div className="mb-8 bg-red-50 rounded-lg shadow p-6 animate-in fade-in duration-300">
        <h3 className="text-lg font-bold text-red-800 mb-3 flex items-center gap-2">🔥 Bugs críticos recientes</h3>
        <ul className="flex flex-wrap gap-4">
          {recentCritical.map(b => (
            <li key={b.id} className="flex flex-col items-center bg-white rounded-lg p-3 min-w-[180px] shadow">
              <span className="font-bold text-red-700 text-sm mb-1">{b.title}</span>
              <span className={`text-xs rounded-full px-2 py-0.5 ${statusColors[b.status]}`}>{b.status}</span>
            </li>
          ))}
        </ul>
      </div>
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
          {filteredBugs.map((bug, idx) => (
            <tr key={bug.id} className="transition-all duration-200 hover:bg-blue-50">
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