import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';

const contributions = [
  { id: 1, user: 'Ana Torres', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', type: 'Bug report', date: '2024-06-01', description: 'Reporte de XSS en login.', likes: 5, status: 'Aceptado', comments: ['¡Buen hallazgo!', 'Reproducido con éxito.'] },
  { id: 2, user: 'Carlos Pérez', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', type: 'Feature', date: '2024-06-02', description: 'Sugerencia de nueva funcionalidad de notificaciones.', likes: 2, status: 'Pendiente', comments: ['Buena idea.', '¿Cómo lo implementarías?'] },
  { id: 3, user: 'Lucía Gómez', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', type: 'Bug fix', date: '2024-06-03', description: 'Corrección de error en el dashboard.', likes: 4, status: 'Aceptado', comments: ['Gracias por el fix.', 'Ya está en producción.'] },
  { id: 4, user: 'Pedro Ramiro', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', type: 'Bug report', date: '2024-06-04', description: 'Reporte de CSRF en perfil.', likes: 1, status: 'Rechazado', comments: ['No se pudo reproducir.'] },
  { id: 5, user: 'Sofía Martínez', avatar: 'https://randomuser.me/api/portraits/women/12.jpg', type: 'Feature', date: '2024-06-05', description: 'Propuesta de dashboard personalizable.', likes: 3, status: 'Pendiente', comments: ['Interesante propuesta.'] },
  { id: 6, user: 'Miguel Ángel', avatar: 'https://randomuser.me/api/portraits/men/21.jpg', type: 'Bug fix', date: '2024-06-06', description: 'Solución a bug de notificaciones duplicadas.', likes: 2, status: 'Aceptado', comments: ['¡Funciona perfecto!'] },
  // Más variedad
  { id: 7, user: 'Elena Ruiz', avatar: 'https://randomuser.me/api/portraits/women/65.jpg', type: 'Article', date: '2024-06-07', description: 'Artículo: "Cómo proteger tus APIs REST"', likes: 8, status: 'Aceptado', comments: ['Excelente explicación.', 'Muy útil.'] },
  { id: 8, user: 'Tomás Silva', avatar: 'https://randomuser.me/api/portraits/men/34.jpg', type: 'Tool', date: '2024-06-08', description: 'Herramienta: Script para escaneo de puertos.', likes: 6, status: 'Aceptado', comments: ['¡Ya la probé!', 'Muy práctica.'] },
  { id: 9, user: 'Valeria Soto', avatar: 'https://randomuser.me/api/portraits/women/22.jpg', type: 'Tutorial', date: '2024-06-09', description: 'Tutorial: "Automatiza tus pruebas de seguridad"', likes: 7, status: 'Aceptado', comments: ['¡Genial!', 'Muy claro.'] },
  { id: 10, user: 'Luis Ortega', avatar: 'https://randomuser.me/api/portraits/men/56.jpg', type: 'Recognition', date: '2024-06-10', description: 'Reconocimiento: MVP del mes.', likes: 10, status: 'Aceptado', comments: ['¡Felicidades!', 'Bien merecido.'] },
];

const typeColors: Record<string, string> = {
  'Bug report': 'bg-red-100 text-red-800',
  'Feature': 'bg-blue-100 text-blue-800',
  'Bug fix': 'bg-green-100 text-green-800',
  'Article': 'bg-yellow-100 text-yellow-800',
  'Tool': 'bg-purple-100 text-purple-800',
  'Tutorial': 'bg-pink-100 text-pink-800',
  'Recognition': 'bg-indigo-100 text-indigo-800',
};
const typeIcons: Record<string, string> = {
  'Bug report': '🐞',
  'Feature': '✨',
  'Bug fix': '🔧',
  'Article': '📄',
  'Tool': '🛠️',
  'Tutorial': '🎓',
  'Recognition': '🏆',
};
const statusColors: Record<string, string> = {
  'Aceptado': 'bg-green-200 text-green-900',
  'Pendiente': 'bg-yellow-200 text-yellow-900',
  'Rechazado': 'bg-red-200 text-red-900',
};

const topContributor = contributions.reduce((max, c) => c.likes > max.likes ? c : max, contributions[0]);

const Contributions: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [likes, setLikes] = useState(contributions.map(c => c.likes));
  const [modalIdx, setModalIdx] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const handleCopy = (id: number) => {
    navigator.clipboard.writeText(window.location.href + '#contrib-' + id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  const handleShare = (id: number, description: string) => {
    const url = window.location.href + '#contrib-' + id;
    if (navigator.share) {
      navigator.share({
        title: 'Contribución destacada',
        text: description,
        url
      }).then(() => setCopied(true)).catch(() => {});
      setTimeout(() => setCopied(false), 1200);
    } else {
      handleCopy(id);
    }
  };
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <span>🌟</span> Contribuciones Recientes
      </h2>
      {/* Top contributor destacado */}
      <div className="mb-8 p-4 bg-gradient-to-r from-yellow-100 to-yellow-50 rounded-lg shadow flex items-center gap-4 animate-in fade-in duration-300">
        <img src={topContributor.avatar} alt={topContributor.user} className="w-14 h-14 rounded-full border-4 border-yellow-300 shadow" />
        <div>
          <div className="font-bold text-lg text-yellow-800 flex items-center gap-2">🏆 {topContributor.user} <span className="text-xs bg-yellow-200 text-yellow-900 px-2 py-0.5 rounded-full ml-2">Top Contributor</span></div>
          <div className="text-sm text-gray-700">{topContributor.description}</div>
        </div>
        <div className="ml-auto flex flex-col items-end">
          <span className="text-yellow-700 font-bold">👍 {topContributor.likes} likes</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold mt-1 ${statusColors[topContributor.status]}`}>{topContributor.status}</span>
        </div>
      </div>
      <ul className="space-y-4">
        {contributions.map((contrib, idx) => (
          <li key={contrib.id} id={`contrib-${contrib.id}`} className={`bg-white rounded-lg shadow-md p-4 transition-all duration-200 hover:scale-[1.01] ${expanded === idx ? 'ring-2 ring-blue-300' : ''}`}
            onClick={() => setExpanded(expanded === idx ? null : idx)}>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-3">
                <img src={contrib.avatar} alt={contrib.user} className="w-8 h-8 rounded-full border-2 border-gray-200" />
                <span className="font-semibold text-blue-700 flex items-center gap-1">{contrib.user}
                  {topContributor.id === contrib.id && <span className="ml-1 text-xs bg-yellow-200 text-yellow-900 px-2 py-0.5 rounded-full">Top</span>}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ml-2 flex items-center gap-1 ${typeColors[contrib.type]}`}>{typeIcons[contrib.type]} {contrib.type}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ml-2 ${statusColors[contrib.status]}`}>{contrib.status}</span>
              </div>
              <span className="text-xs text-gray-500">{contrib.date}</span>
            </div>
            <div className="text-sm text-gray-800 mb-2 flex items-center gap-2">
              {expanded === idx && <span className="text-lg">🔎</span>}
              {contrib.description}
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500 mb-1">
              <button
                className={`flex items-center gap-1 px-2 py-0.5 rounded hover:bg-blue-100 transition ${likes[idx] > contrib.likes ? 'text-blue-700 font-bold' : ''}`}
                onClick={e => { e.stopPropagation(); setLikes(l => l.map((v, i) => i === idx ? v + 1 : v)); }}
              >👍 {likes[idx]} Like{likes[idx] !== 1 ? 's' : ''}</button>
              {contrib.comments && contrib.comments.length > 0 && (
                <span>💬 {contrib.comments.length} comentario{contrib.comments.length > 1 ? 's' : ''}</span>
              )}
              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{contrib.type}</span>
            </div>
            {expanded === idx && contrib.comments && contrib.comments.length > 0 && (
              <ul className="ml-4 mt-2 text-xs text-gray-600 list-disc animate-in fade-in duration-200">
                {contrib.comments.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            )}
            {expanded === idx && (
              <div className="mt-3 flex gap-2">
                <button className="bg-green-100 text-green-800 px-3 py-1 rounded text-xs hover:bg-green-200" onClick={e => { e.stopPropagation(); handleShare(contrib.id, contrib.description); }}>{copied ? '¡Compartido!' : 'Compartir'}</button>
                <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-xs hover:bg-blue-200" onClick={e => { e.stopPropagation(); setModalIdx(idx); }}>Ver más</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {/* Modal de detalles */}
      <Modal open={modalIdx !== null} onClose={() => setModalIdx(null)}>
        {modalIdx !== null && (
          <div className="flex flex-col gap-3 min-w-[320px] max-w-[90vw]">
            <div className="flex items-center gap-3 mb-2">
              <img src={contributions[modalIdx].avatar} alt={contributions[modalIdx].user} className="w-12 h-12 rounded-full border-2 border-blue-200" />
              <div>
                <div className="font-bold text-blue-800 text-lg flex items-center gap-2">{contributions[modalIdx].user}
                  {topContributor.id === contributions[modalIdx].id && <span className="ml-1 text-xs bg-yellow-200 text-yellow-900 px-2 py-0.5 rounded-full">Top</span>}
                </div>
                <div className="text-xs text-gray-500">{contributions[modalIdx].date}</div>
              </div>
              <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-semibold ${typeColors[contributions[modalIdx].type]}`}>{typeIcons[contributions[modalIdx].type]} {contributions[modalIdx].type}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ml-2 ${statusColors[contributions[modalIdx].status]}`}>{contributions[modalIdx].status}</span>
            </div>
            <div className="text-base text-gray-900 mb-2">{contributions[modalIdx].description}</div>
            <div className="flex items-center gap-4 text-xs text-gray-500 mb-1">
              <span>👍 {likes[modalIdx]} Likes</span>
              <span>💬 {contributions[modalIdx].comments.length} comentario{contributions[modalIdx].comments.length > 1 ? 's' : ''}</span>
              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{contributions[modalIdx].type}</span>
            </div>
            <div className="mb-2">
              <h4 className="font-semibold text-sm text-gray-700 mb-1">Comentarios:</h4>
              <ul className="ml-4 text-xs text-gray-600 list-disc">
                {contributions[modalIdx].comments.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input
                className="border rounded px-2 py-1 text-xs w-full"
                value={window.location.href + '#contrib-' + contributions[modalIdx].id}
                readOnly
              />
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
                onClick={() => handleCopy(contributions[modalIdx].id)}
              >{copied ? '¡Copiado!' : 'Copiar enlace'}</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Contributions; 