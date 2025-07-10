import React, { useState } from 'react';
import { useTranslation } from '../utils/useTranslation';

// Simulación de explicaciones aprobadas
const mockExplanations = [
  {
    id: 'e1',
    title: 'Mitigación de SQL Injection',
    vulnerability: 'SQL Injection',
    author: 'Juan Pérez',
    date: '2024-06-01',
    tags: ['sql', 'injection', 'database'],
    content: 'Para mitigar SQL Injection, utilicé consultas preparadas...'
  },
  {
    id: 'e2',
    title: 'Prevención de XSS',
    vulnerability: 'XSS Reflected',
    author: 'Ana Gómez',
    date: '2024-06-02',
    tags: ['xss', 'javascript'],
    content: 'La clave fue sanitizar la entrada del usuario...'
  },
];

const Documentation: React.FC = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  // Filtros simulados (solo búsqueda por palabra clave)
  const filtered = mockExplanations.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.vulnerability.toLowerCase().includes(search.toLowerCase()) ||
    e.author.toLowerCase().includes(search.toLowerCase()) ||
    e.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  const selectedExplanation = filtered.find(e => e.id === selected);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">{t('documentation')}</h2>
      <div className="mb-4 flex gap-2">
        <input
          className="border rounded px-3 py-2 w-full"
          placeholder={t('search') + '...'}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 && (
          <div className="col-span-2 text-gray-500">{t('noExplanations')}</div>
        )}
        {filtered.map(e => (
          <div
            key={e.id}
            className={`border rounded p-4 cursor-pointer hover:shadow ${selected === e.id ? 'ring-2 ring-blue-400' : ''}`}
            onClick={() => setSelected(e.id)}
          >
            <div className="font-semibold text-lg">{e.title}</div>
            <div className="text-sm text-gray-600">{t('vulnerability')}: {e.vulnerability}</div>
            <div className="text-sm text-gray-600">{t('author')}: {e.author}</div>
            <div className="text-xs text-gray-400">{t('publishedOn')}: {e.date}</div>
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
          <div className="text-sm text-gray-600 mb-1">{t('vulnerability')}: {selectedExplanation.vulnerability}</div>
          <div className="text-sm text-gray-600 mb-1">{t('author')}: {selectedExplanation.author}</div>
          <div className="text-xs text-gray-400 mb-2">{t('publishedOn')}: {selectedExplanation.date}</div>
          <div className="prose max-w-none mb-2">{selectedExplanation.content}</div>
          <div className="flex flex-wrap gap-1">
            {selectedExplanation.tags.map(tag => (
              <span key={tag} className="bg-gray-200 text-xs px-2 py-0.5 rounded">#{tag}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Documentation; 