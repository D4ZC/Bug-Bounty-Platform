import React, { useState } from 'react';
import { useTranslation } from '../utils/useTranslation';

const mockExplanations = [
  {
    id: 'e1',
    title: 'Mitigación de SQL Injection',
    vulnerability: 'SQL Injection',
    author: 'Juan Pérez',
    date: '2024-06-01',
    tags: ['sql', 'injection', 'database'],
    content: 'Para mitigar SQL Injection, utilicé consultas preparadas...',
    status: 'pending',
  },
  {
    id: 'e2',
    title: 'Prevención de XSS',
    vulnerability: 'XSS Reflected',
    author: 'Ana Gómez',
    date: '2024-06-02',
    tags: ['xss', 'javascript'],
    content: 'La clave fue sanitizar la entrada del usuario...',
    status: 'approved',
  },
  {
    id: 'e3',
    title: 'Protección CSRF',
    vulnerability: 'CSRF',
    author: 'Luis Ruiz',
    date: '2024-06-03',
    tags: ['csrf', 'token'],
    content: 'Implementé tokens CSRF en los formularios...',
    status: 'needsRevision',
  },
  {
    id: 'e4',
    title: 'Validación de entradas',
    vulnerability: 'Validación',
    author: 'María López',
    date: '2024-06-04',
    tags: ['input', 'validation'],
    content: 'Se agregó validación en el backend...',
    status: 'rejected',
  },
];

const ModerateExplanations: React.FC = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string | null>(null);
  const [moderatorComment, setModeratorComment] = useState('');
  // Estado para likes/dislikes y feedback
  const [likes, setLikes] = useState<{ [id: string]: number }>({});
  const [dislikes, setDislikes] = useState<{ [id: string]: number }>({});
  const [showFeedback, setShowFeedback] = useState<{ [id: string]: boolean }>({});
  const [feedback, setFeedback] = useState<{ [id: string]: string }>({});
  // Nuevo estado para controlar si el usuario ya votó en cada explicación
  const [userVote, setUserVote] = useState<{ [id: string]: 'like' | 'dislike' | undefined }>({});

  const explanations = mockExplanations.filter(e => e.status === 'pending');
  const selectedExplanation = explanations.find(e => e.id === selected);

  const handleLike = (id: string) => {
    if (userVote[id] === 'like') return; // Ya dio like
    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1 - (userVote[id] === 'dislike' ? 0 : 0),
    }));
    setDislikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) - (userVote[id] === 'dislike' ? 1 : 0),
    }));
    setUserVote(prev => ({ ...prev, [id]: 'like' }));
  };
  const handleDislike = (id: string) => {
    if (userVote[id] === 'dislike') return; // Ya dio dislike
    setDislikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1 - (userVote[id] === 'like' ? 0 : 0),
    }));
    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) - (userVote[id] === 'like' ? 1 : 0),
    }));
    setUserVote(prev => ({ ...prev, [id]: 'dislike' }));
  };
  const handleToggleFeedback = (id: string) => {
    setShowFeedback(prev => ({ ...prev, [id]: !prev[id] }));
  };
  const handleFeedbackChange = (id: string, value: string) => {
    setFeedback(prev => ({ ...prev, [id]: value }));
  };
  const handleSendFeedback = (id: string) => {
    // Aquí se podría enviar el feedback al backend
    setShowFeedback(prev => ({ ...prev, [id]: false }));
    setFeedback(prev => ({ ...prev, [id]: '' }));
    alert('¡Gracias por tu sugerencia!');
  };

  return (
    <div className="max-w-5xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Panel de Modificación</h2>
      <div className="mb-4 text-lg font-semibold">Pendientes</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {explanations.length === 0 && (
          <div className="col-span-2 text-gray-500">No hay explicaciones pendientes.</div>
        )}
        {explanations.map(e => (
          <div
            key={e.id}
            className={`border rounded p-4 cursor-pointer hover:shadow ${selected === e.id ? 'ring-2 ring-blue-400' : ''}`}
            onClick={() => setSelected(e.id)}
          >
            <div className="font-semibold text-lg">{e.title}</div>
            <div className="text-sm text-gray-600">Vulnerabilidad: {e.vulnerability}</div>
            <div className="text-sm text-gray-600">Autor: {e.author}</div>
            <div className="text-xs text-gray-400">Publicada: {e.date}</div>
            <div className="mt-2 flex flex-wrap gap-1">
              {e.tags.map(tag => (
                <span key={tag} className="bg-gray-200 text-xs px-2 py-0.5 rounded">#{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {selectedExplanation && (
        <div className="mt-8 bg-white p-6 rounded shadow">
          <h3 className="text-xl font-bold mb-2">{selectedExplanation.title}</h3>
          <div className="text-sm text-gray-600 mb-1">Vulnerabilidad: {selectedExplanation.vulnerability}</div>
          <div className="text-sm text-gray-600 mb-1">Autor: {selectedExplanation.author}</div>
          <div className="text-xs text-gray-400 mb-2">Publicada: {selectedExplanation.date}</div>
          <div className="prose max-w-none mb-2">{selectedExplanation.content}</div>
          <div className="flex flex-wrap gap-1 mb-4">
            {selectedExplanation.tags.map(tag => (
              <span key={tag} className="bg-gray-200 text-xs px-2 py-0.5 rounded">#{tag}</span>
            ))}
          </div>
          {/* Like/Dislike y Sugerir mejoras */}
          <div className="flex items-center gap-4 mb-4">
            <button
              className={`flex items-center gap-1 px-2 py-1 rounded hover:bg-green-100 border ${userVote[selectedExplanation.id] === 'like' ? 'bg-green-200' : ''}`}
              onClick={() => handleLike(selectedExplanation.id)}
              type="button"
            >
              <span role="img" aria-label="like">👍</span> {likes[selectedExplanation.id] || 0}
            </button>
            <button
              className={`flex items-center gap-1 px-2 py-1 rounded hover:bg-red-100 border ${userVote[selectedExplanation.id] === 'dislike' ? 'bg-red-200' : ''}`}
              onClick={() => handleDislike(selectedExplanation.id)}
              type="button"
            >
              <span role="img" aria-label="dislike">👎</span> {dislikes[selectedExplanation.id] || 0}
            </button>
            <button
              className="ml-4 px-3 py-1 rounded bg-yellow-200 hover:bg-yellow-300 border"
              onClick={() => handleToggleFeedback(selectedExplanation.id)}
              type="button"
            >
              Sugerir mejoras
            </button>
          </div>
          {showFeedback[selectedExplanation.id] && (
            <div className="mb-4">
              <textarea
                className="w-full border rounded px-3 py-2 mb-2"
                placeholder="Escribe tu sugerencia o duda..."
                value={feedback[selectedExplanation.id] || ''}
                onChange={e => handleFeedbackChange(selectedExplanation.id, e.target.value)}
              />
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => handleSendFeedback(selectedExplanation.id)}
                type="button"
              >
                Enviar sugerencia
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ModerateExplanations; 