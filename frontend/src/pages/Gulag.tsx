import React from 'react';
import Modal from '@/components/ui/Modal';

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

const gulagStats = {
  total: gulagUsers.length,
  reincidentes: gulagUsers.filter(u => u.repeat > 1).length,
  avgDuration: '8.5 días',
  criticos: gulagUsers.filter(u => u.severity === 'Crítica').length,
};
const gulagHistory = [
  { id: 101, name: 'Elena Ruiz', avatar: 'https://randomuser.me/api/portraits/women/65.jpg', reason: 'Flood', left: '2024-05-20', duration: '3 días' },
  { id: 102, name: 'Tomás Silva', avatar: 'https://randomuser.me/api/portraits/men/34.jpg', reason: 'Lenguaje ofensivo', left: '2024-05-15', duration: '5 días' },
];
const gulagRules = [
  { icon: '🚫', desc: 'No spam, flood ni abuso de reportes.' },
  { icon: '🤬', desc: 'Respeta a los demás, evita lenguaje ofensivo.' },
  { icon: '⚠️', desc: 'Fraudes y trampas serán sancionados.' },
  { icon: '🔁', desc: 'Reincidencia aumenta la severidad y duración.' },
];
const hallOfShame = gulagUsers.filter(u => u.repeat >= 3);

const reincidenceRanking = gulagUsers
  .filter(u => u.repeat > 1)
  .sort((a, b) => b.repeat - a.repeat)
  .map((u, i) => ({ ...u, rank: i + 1 }));
const frequentReasons = [
  { reason: 'Spam', count: 8 },
  { reason: 'Lenguaje ofensivo', count: 6 },
  { reason: 'Fraude', count: 4 },
  { reason: 'Abuso de reportes', count: 3 },
  { reason: 'Conducta inapropiada', count: 2 },
];
const gulagHistoricStats = {
  total: 42,
  maxDuration: '45 días',
  minDuration: '1 día',
  recordReincidence: 5,
};
const gulagTestimonials = [
  { id: 1, name: 'Elena Ruiz', avatar: 'https://randomuser.me/api/portraits/women/65.jpg', text: 'Aprendí la lección, ahora respeto las reglas.', date: '2024-05-21' },
  { id: 2, name: 'Tomás Silva', avatar: 'https://randomuser.me/api/portraits/men/34.jpg', text: 'El Gulag me hizo reflexionar sobre mi conducta.', date: '2024-05-16' },
  { id: 3, name: 'María López', avatar: 'https://randomuser.me/api/portraits/women/66.jpg', text: '¡No volveré a reincidir! Gracias por la segunda oportunidad.', date: '2024-04-30' },
  { id: 4, name: 'Juan García', avatar: 'https://randomuser.me/api/portraits/men/13.jpg', text: 'Al principio fue duro, pero aprendí mucho.', date: '2024-04-25' },
  { id: 5, name: 'Lucía Gómez', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', text: 'Ahora ayudo a otros a evitar el Gulag.', date: '2024-04-10' },
  { id: 6, name: 'Carlos Pérez', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', text: '¡El Gulag no es un juego! Mejor sigo las reglas.', date: '2024-03-28' },
];
const gulagFAQ = [
  { q: '¿Qué es el Gulag?', a: 'Es un sistema de sanciones temporales para usuarios que infringen las reglas.' },
  { q: '¿Cómo salgo del Gulag?', a: 'Solo debes esperar a que termine tu sanción. El tiempo depende de la gravedad y reincidencia.' },
  { q: '¿Qué pasa si reincido?', a: 'La duración y severidad de la sanción aumentan progresivamente.' },
  { q: '¿Puedo apelar una sanción?', a: 'Sí, contacta a un administrador si crees que fue un error.' },
];

const Gulag: React.FC = () => {
  const [abuseModal, setAbuseModal] = React.useState(false);
  const [faqOpen, setFaqOpen] = React.useState<number | null>(null);
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">⛓️ Usuarios en el Gulag</h2>
      {/* Estadísticas del Gulag */}
      <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-red-50 rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-2xl font-bold text-red-700">{gulagStats.total}</span>
          <span className="text-xs text-gray-600">Usuarios actuales</span>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-2xl font-bold text-yellow-700">{gulagStats.reincidentes}</span>
          <span className="text-xs text-gray-600">Reincidentes</span>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-2xl font-bold text-blue-700">{gulagStats.avgDuration}</span>
          <span className="text-xs text-gray-600">Duración promedio</span>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-2xl font-bold text-purple-700">{gulagStats.criticos}</span>
          <span className="text-xs text-gray-600">Casos críticos</span>
        </div>
      </div>
      {/* Estadísticas históricas */}
      <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-2xl font-bold text-gray-700">{gulagHistoricStats.total}</span>
          <span className="text-xs text-gray-600">Total sancionados</span>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-2xl font-bold text-yellow-700">{gulagHistoricStats.maxDuration}</span>
          <span className="text-xs text-gray-600">Duración máxima</span>
        </div>
        <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-2xl font-bold text-green-700">{gulagHistoricStats.minDuration}</span>
          <span className="text-xs text-gray-600">Duración mínima</span>
        </div>
        <div className="bg-red-50 rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-2xl font-bold text-red-700">{gulagHistoricStats.recordReincidence}</span>
          <span className="text-xs text-gray-600">Récord reincidencia</span>
        </div>
      </div>
      {/* Ranking de reincidentes */}
      {reincidenceRanking.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-bold text-orange-800 mb-3 flex items-center gap-2">🥇 Ranking de reincidentes</h3>
          <ul className="flex flex-wrap gap-4">
            {reincidenceRanking.map(u => (
              <li key={u.id} className="bg-orange-100 rounded-lg p-4 shadow flex flex-col items-center min-w-[140px]">
                <span className="text-2xl font-bold text-orange-700">#{u.rank}</span>
                <img src={u.avatar} alt={u.name} className="w-12 h-12 rounded-full border-2 border-orange-400 mb-2" />
                <span className="font-semibold text-orange-900">{u.name}</span>
                <span className="text-xs text-gray-700 mb-1">{u.reason}</span>
                <span className="text-xs bg-orange-200 text-orange-800 px-2 py-0.5 rounded-full mb-1">{u.repeat} reincidencias</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${severityColors[u.severity]}`}>{u.severity}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Motivos frecuentes */}
      <div className="mb-8 bg-white rounded-lg shadow p-6 animate-in fade-in duration-300">
        <h3 className="text-lg font-bold text-pink-800 mb-3 flex items-center gap-2">📊 Motivos más frecuentes</h3>
        <ul className="flex flex-wrap gap-4">
          {frequentReasons.map((r, i) => (
            <li key={i} className="flex flex-col items-center bg-pink-50 rounded-lg p-3 min-w-[120px]">
              <span className="font-semibold text-pink-900 text-sm">{r.reason}</span>
              <span className="text-xs text-gray-500">{r.count} casos</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Cards visuales para reincidentes */}
      {hallOfShame.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-bold text-red-800 mb-3 flex items-center gap-2">🔥 Hall of Shame (Reincidentes)</h3>
          <ul className="flex flex-wrap gap-4">
            {hallOfShame.map(u => (
              <li key={u.id} className="bg-red-100 rounded-lg p-4 shadow flex flex-col items-center min-w-[140px]">
                <img src={u.avatar} alt={u.name} className="w-12 h-12 rounded-full border-2 border-red-400 mb-2" />
                <span className="font-semibold text-red-900">{u.name}</span>
                <span className="text-xs text-gray-700 mb-1">{u.reason}</span>
                <span className="text-xs bg-red-200 text-red-800 px-2 py-0.5 rounded-full mb-1">{u.repeat} reincidencias</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${severityColors[u.severity]}`}>{u.severity}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Tabla principal */}
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
      {/* Historial de salidas */}
      <div className="mt-10 mb-8">
        <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center gap-2">🟢 Historial de salidas</h3>
        <ul className="flex flex-wrap gap-4">
          {gulagHistory.map(u => (
            <li key={u.id} className="bg-green-50 rounded-lg p-4 shadow flex flex-col items-center min-w-[140px]">
              <img src={u.avatar} alt={u.name} className="w-12 h-12 rounded-full border-2 border-green-400 mb-2" />
              <span className="font-semibold text-green-900">{u.name}</span>
              <span className="text-xs text-gray-700 mb-1">{u.reason}</span>
              <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full mb-1">{u.duration}</span>
              <span className="text-xs text-gray-500">Salió: {u.left}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Reglas y consecuencias */}
      <div className="mb-8 bg-white rounded-lg shadow p-6 animate-in fade-in duration-300">
        <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">📜 Reglas y consecuencias</h3>
        <ul className="flex flex-wrap gap-4">
          {gulagRules.map((r, i) => (
            <li key={i} className="flex items-center gap-2 bg-blue-50 rounded-lg p-3 min-w-[180px]">
              <span className="text-2xl">{r.icon}</span>
              <span className="text-gray-700 text-sm">{r.desc}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Testimonios */}
      <div className="mb-8 bg-white rounded-lg shadow p-6 animate-in fade-in duration-300">
        <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center gap-2">💬 Testimonios</h3>
        <ul className="flex flex-wrap gap-4">
          {gulagTestimonials.map(t => (
            <li key={t.id} className="flex flex-col items-center bg-green-50 rounded-lg p-3 min-w-[180px]">
              <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full border-2 border-green-400 mb-2" />
              <span className="font-semibold text-green-900 text-sm">{t.name}</span>
              <span className="text-xs text-gray-500 mb-1">{t.date}</span>
              <span className="text-gray-700 text-xs text-center">“{t.text}”</span>
            </li>
          ))}
        </ul>
      </div>
      {/* FAQ */}
      <div className="mb-8 bg-white rounded-lg shadow p-6 animate-in fade-in duration-300">
        <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">❓ Preguntas frecuentes</h3>
        <ul className="flex flex-col gap-3">
          {gulagFAQ.map((f, i) => (
            <li key={i} className="bg-blue-50 rounded-lg">
              <button
                className="w-full text-left px-3 py-3 font-semibold text-blue-900 focus:outline-none flex items-center justify-between"
                onClick={() => setFaqOpen(faqOpen === i ? null : i)}
              >
                {f.q}
                <span className="ml-2 text-blue-700">{faqOpen === i ? '▲' : '▼'}</span>
              </button>
              {faqOpen === i && (
                <div className="px-3 pb-3 text-gray-700 text-sm animate-in fade-in duration-200">{f.a}</div>
              )}
            </li>
          ))}
        </ul>
      </div>
      {/* Botón reportar abuso */}
      <div className="mb-10 flex justify-end">
        <button className="bg-red-600 text-white px-5 py-2 rounded shadow hover:bg-red-700 transition" onClick={() => setAbuseModal(true)}>Reportar abuso de sanción</button>
      </div>
      <Modal open={abuseModal} onClose={() => setAbuseModal(false)}>
        <div className="flex flex-col items-center gap-2 min-w-[220px]">
          <span className="text-3xl">⚠️</span>
          <p className="text-lg font-semibold text-center">Para apelar una sanción, contacta a un administrador o escribe a soporte@cyberhunters.dev</p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => setAbuseModal(false)}>Cerrar</button>
        </div>
      </Modal>
    </div>
  );
};

export default Gulag; 