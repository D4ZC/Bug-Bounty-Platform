import React, { useState } from 'react';
import { useTranslation } from '../utils/useTranslation';

// Simulación de vulnerabilidades resueltas
const mockVulnerabilities = [
  { id: '1', title: 'SQL Injection (Alta)' },
  { id: '2', title: 'XSS Reflected (Media)' },
  { id: '3', title: 'CSRF (Baja)' },
];

const SubmitExplanation: React.FC = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [vulnId, setVulnId] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  // Placeholder para el editor enriquecido
  // Aquí se integrará React Quill o similar

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">{t('submitExplanation')}</h2>
      <form className="space-y-4">
        <div>
          <label className="block font-medium mb-1">{t('explanationTitle')}</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder={t('explanationTitle')}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">{t('selectVulnerability')}</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={vulnId}
            onChange={e => setVulnId(e.target.value)}
          >
            <option value="">--</option>
            {mockVulnerabilities.map(v => (
              <option key={v.id} value={v.id}>{v.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">{t('explanationContent')}</label>
          <textarea
            className="w-full border rounded px-3 py-2 min-h-[120px]"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder={t('explanationContent') + '...'}
          />
          <div className="text-xs text-gray-500 mt-1">[Editor enriquecido aquí]</div>
        </div>
        <div>
          <label className="block font-medium mb-1">{t('tags')}</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="bug, sql, xss"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {t('submit')}
        </button>
      </form>
    </div>
  );
};

export default SubmitExplanation; 