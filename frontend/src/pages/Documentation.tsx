import React, { useState } from 'react';
import { useTranslation } from '../utils/useTranslation';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import lowlight from 'lowlight/lib/core';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import dayjs from 'dayjs';

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

// Umbral configurable para aprobación de explicaciones
const APPROVAL_THRESHOLD = 5; // Cambia este valor según lo necesario

const mockVulnerabilities = [
  { id: 'v1', name: 'SQL Injection' },
  { id: 'v2', name: 'XSS Reflected' },
  { id: 'v3', name: 'CSRF' },
];

// Simulación de explicaciones pendientes
const mockPendingExplanations = [
  {
    id: 'p1',
    title: 'Mitigación de CSRF',
    vulnerability: 'CSRF',
    author: 'Carlos Ruiz',
    date: '2024-06-03',
    content: 'Para mitigar CSRF, implementé tokens únicos por sesión...',
    likes: 2,
    dislikes: 1,
    feedback: [
      { user: 'Ana', text: 'Podrías agregar ejemplos de código.' },
    ],
  },
];

const getUserVote = (votes: Record<string, 'like' | 'dislike'>, userId: string) => votes[userId] || null;

const INITIAL_USER_POINTS = 100;
const POINTS_PER_APPROVAL = 20;

const showToast = (msg: string, setToast: React.Dispatch<React.SetStateAction<string>>) => {
  setToast(msg);
  setTimeout(() => setToast(''), 3000);
};

const ACCENT_PURPLE = '#a259f7';
const DARK_BG = '#181A1A';
const PANEL_BG = '#23263a';

const VULN_TYPES = [
  'SQL Injection', 'XSS', 'CSRF', 'RCE', 'IDOR', 'LFI', 'RFI', 'SSRF', 'Open Redirect', 'Other'
];

const Documentation: React.FC = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [tab, setTab] = useState<'documentation' | 'redaccion' | 'solicitudes'>('documentation');

  // Estado para redacción
  const [title, setTitle] = useState('');
  const [vulnId, setVulnId] = useState('');
  const [submitMsg, setSubmitMsg] = useState('');
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: '',
  });

  // Estado para solicitudes
  const [pending, setPending] = useState(mockPendingExplanations);
  const [votes, setVotes] = useState<Record<string, Record<string, 'like' | 'dislike'>>>({}); // {expId: {userId: 'like'|'dislike'}}
  const [feedbackInput, setFeedbackInput] = useState<Record<string, string>>({}); // {expId: feedbackText}
  const [showFeedback, setShowFeedback] = useState<Record<string, boolean>>({}); // {expId: bool}
  const userId = 'usuario-demo'; // Simulación de usuario actual
  const [expandedPending, setExpandedPending] = useState<string | null>(null);

  // Filtros simulados (solo búsqueda por palabra clave)
  const filtered = mockExplanations.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.vulnerability.toLowerCase().includes(search.toLowerCase()) ||
    e.author.toLowerCase().includes(search.toLowerCase()) ||
    e.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  const selectedExplanation = filtered.find(e => e.id === selected);

  const [userPoints, setUserPoints] = useState(INITIAL_USER_POINTS);
  const [approvalMsg, setApprovalMsg] = useState('');
  const [explanations, setExplanations] = useState(mockExplanations);
  const [toast, setToast] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [author, setAuthor] = useState('');
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [vulnType, setVulnType] = useState('');
  const [vulnSpecific, setVulnSpecific] = useState('');
  const [brief, setBrief] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [refs, setRefs] = useState<string[]>([]);
  const [refInput, setRefInput] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !vulnId || !editor?.getHTML()) {
      setSubmitMsg('Completa todos los campos.');
      return;
    }
    // Aquí iría la lógica real de envío
    setSubmitMsg('¡Explicación enviada para revisión!');
    showToast('¡Explicación enviada exitosamente!', setToast);
    setTitle('');
    setVulnId('');
    editor?.commands.setContent('');
  };

  // Lógica de voto
  const handleVote = (expId: string, type: 'like' | 'dislike') => {
    setVotes(prev => {
      const prevVotes = prev[expId] || {};
      return {
        ...prev,
        [expId]: { ...prevVotes, [userId]: type },
      };
    });
    setPending(prev => prev
      .map(e => {
        if (e.id !== expId) return e;
        let likes = e.likes;
        let dislikes = e.dislikes;
        const prevVote = votes[expId]?.[userId];
        if (prevVote === type) return e; // No cambio
        if (type === 'like') {
          likes += 1;
          if (prevVote === 'dislike') dislikes -= 1;
        } else {
          dislikes += 1;
          if (prevVote === 'like') likes -= 1;
        }
        // Si alcanza el umbral, mover a Documentación y otorgar puntos
        if (likes >= APPROVAL_THRESHOLD) {
          setApprovalMsg(`¡Explicación aprobada! Se otorgaron ${POINTS_PER_APPROVAL} puntos a ${e.author}.`);
          setUserPoints(points => points + POINTS_PER_APPROVAL);
          setExplanations(prevExps => [
            ...prevExps,
            {
              id: e.id,
              title: e.title,
              vulnerability: e.vulnerability,
              author: e.author,
              date: e.date,
              tags: [],
              content: e.content,
            },
          ]);
          // Eliminar de pendientes
          setTimeout(() => setApprovalMsg(''), 4000);
          return null; // Marcar para filtrar
        }
        return { ...e, likes, dislikes };
      })
      .filter((e): e is typeof prev[0] => e !== null)
    );
  };

  // Lógica de feedback
  const handleFeedback = (expId: string) => {
    const text = feedbackInput[expId]?.trim();
    if (!text) return;
    setPending(prev => prev.map(e =>
      e.id === expId ? { ...e, feedback: [...e.feedback, { user: userId, text }] } : e
    ));
    setFeedbackInput(prev => ({ ...prev, [expId]: '' }));
    setShowFeedback(prev => ({ ...prev, [expId]: false }));
    showToast('¡Sugerencia enviada exitosamente!', setToast);
  };

  const handleTagAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  const handleTagRemove = (tag: string) => setTags(tags.filter(t => t !== tag));
  const handleRefAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && refInput.trim()) {
      e.preventDefault();
      if (!refs.includes(refInput.trim())) setRefs([...refs, refInput.trim()]);
      setRefInput('');
    }
  };
  const handleRefRemove = (ref: string) => setRefs(refs.filter(r => r !== ref));
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles([...files, ...Array.from(e.target.files)]);
  };
  const handleFileRemove = (idx: number) => setFiles(files.filter((_, i) => i !== idx));

  return (
    <div className="min-h-screen w-full" style={{ background: DARK_BG }}>
      {toast && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-6 py-3 rounded shadow-lg z-50 font-bold text-lg animate-fade-in border-2 border-purple-400">
          {toast}
        </div>
      )}
      {/* Tabs Header */}
      <div className="flex gap-2 mb-6 border-b-2 border-[#23263a] sticky top-0 z-10 bg-[#181A1A] px-2 pt-6">
        <button
          className={`px-6 py-2 font-semibold rounded-t-lg transition-all duration-150 ${tab === 'documentation' ? 'bg-[#23263a] text-white border-b-4 border-[#a259f7] shadow' : 'text-gray-400 hover:text-white hover:bg-[#23263a]'}`}
          onClick={() => setTab('documentation')}
        >
          Documentación
        </button>
        <button
          className={`px-6 py-2 font-semibold rounded-t-lg transition-all duration-150 ${tab === 'redaccion' ? 'bg-[#23263a] text-white border-b-4 border-[#a259f7] shadow' : 'text-gray-400 hover:text-white hover:bg-[#23263a]'}`}
          onClick={() => setTab('redaccion')}
        >
          Redacción
        </button>
        <button
          className={`px-6 py-2 font-semibold rounded-t-lg transition-all duration-150 ${tab === 'solicitudes' ? 'bg-[#23263a] text-white border-b-4 border-[#a259f7] shadow' : 'text-gray-400 hover:text-white hover:bg-[#23263a]'}`}
          onClick={() => setTab('solicitudes')}
        >
          Solicitudes
        </button>
      </div>

      {/* Tab Content */}
      <div className="max-w-5xl mx-auto px-2">
      {tab === 'documentation' && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">Documentación</h2>
          <div className="mb-2 text-green-400 font-semibold">Puntos: {userPoints}</div>
          {approvalMsg && <div className="mb-2 text-green-400 font-bold">{approvalMsg}</div>}
          <div className="mb-4 flex gap-2">
            <input
              className="border-2 border-[#a259f7] rounded-lg px-3 py-2 w-full bg-[#181A1A] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a259f7]"
              placeholder={t('search') + '...'}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.length === 0 && (
              <div className="col-span-2 text-gray-500">{t('noExplanations')}</div>
            )}
            {filtered.map(e => (
              <div
                key={e.id}
                className={`rounded-2xl p-5 cursor-pointer transition-all border-2 ${selected === e.id ? 'border-[#a259f7] shadow-lg' : 'border-[#23263a]'} bg-[#23263a] hover:shadow-xl hover:border-[#a259f7]`}
                onClick={() => { setSelected(e.id); setShowModal(true); }}
              >
                <div className="font-bold text-lg text-white mb-1">{e.title}</div>
                <div className="text-sm text-gray-300">{t('vulnerability')}: <span className="text-purple-300">{e.vulnerability}</span></div>
                <div className="text-sm text-gray-400">{t('author')}: {e.author}</div>
                <div className="text-xs text-gray-500">{t('publishedOn')}: {e.date}</div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {e.tags.map(tag => (
                    <span key={tag} className="bg-purple-100 text-[#a259f7] text-xs px-2 py-0.5 rounded font-semibold">#{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* Modal de explicación */}
          {showModal && selectedExplanation && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
              <div className="bg-[#23263a] rounded-2xl shadow-2xl border-2 border-[#a259f7] max-w-2xl w-full p-8 relative flex flex-col">
                <button
                  className="absolute top-4 right-4 text-purple-300 hover:text-white text-2xl font-bold focus:outline-none"
                  onClick={() => setShowModal(false)}
                  aria-label="Cerrar"
                >×</button>
                <h3 className="text-3xl font-extrabold text-white mb-2">{selectedExplanation.title}</h3>
                <div className="mb-2 text-sm text-gray-300">Vulnerabilidad: <span className="text-purple-300">{selectedExplanation.vulnerability}</span></div>
                <div className="mb-2 text-sm text-gray-400">Autor: {selectedExplanation.author}</div>
                <div className="mb-2 text-xs text-gray-500">Publicado el: {selectedExplanation.date}</div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedExplanation.tags.map(tag => (
                    <span key={tag} className="bg-purple-100 text-[#a259f7] text-xs px-2 py-0.5 rounded font-semibold">#{tag}</span>
                  ))}
                </div>
                <div className="text-gray-200 text-base whitespace-pre-line">
                  {selectedExplanation.content}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {tab === 'redaccion' && (
        <div className="bg-[#23263a] rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-white">Redacción de Explicación</h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="border-2 border-[#a259f7] rounded-lg px-3 py-2 bg-[#181A1A] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a259f7]"
                placeholder="Nombre del autor"
                value={author}
                onChange={e => setAuthor(e.target.value)}
              />
              <input
                type="date"
                className="border-2 border-[#a259f7] rounded-lg px-3 py-2 bg-[#181A1A] text-white focus:outline-none focus:ring-2 focus:ring-[#a259f7]"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </div>
            <input
              className="border-2 border-[#a259f7] rounded-lg px-3 py-2 bg-[#181A1A] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a259f7]"
              placeholder="Título de la explicación"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                className="border-2 border-[#a259f7] rounded-lg px-3 py-2 bg-[#181A1A] text-white focus:outline-none focus:ring-2 focus:ring-[#a259f7]"
                value={vulnType}
                onChange={e => setVulnType(e.target.value)}
              >
                <option value="">Tipo de vulnerabilidad</option>
                {VULN_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <input
                className="border-2 border-[#a259f7] rounded-lg px-3 py-2 bg-[#181A1A] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a259f7]"
                placeholder="Vulnerabilidad específica (ej. endpoint, parámetro, etc.)"
                value={vulnSpecific}
                onChange={e => setVulnSpecific(e.target.value)}
              />
            </div>
            <input
              className="border-2 border-[#a259f7] rounded-lg px-3 py-2 bg-[#181A1A] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a259f7]"
              placeholder="Descripción breve (1-2 líneas)"
              value={brief}
              onChange={e => setBrief(e.target.value)}
            />
            <div className="bg-[#181A1A] border-2 border-[#a259f7] rounded-lg p-2">
              <EditorContent editor={editor} />
            </div>
            {/* Tags */}
            <div>
              <label className="block text-white font-semibold mb-1">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map(tag => (
                  <span key={tag} className="bg-purple-100 text-[#a259f7] text-xs px-2 py-0.5 rounded font-semibold flex items-center gap-1">#{tag} <button type="button" className="text-purple-400 hover:text-red-500" onClick={() => handleTagRemove(tag)}>×</button></span>
                ))}
              </div>
              <input
                className="border-2 border-[#a259f7] rounded-lg px-3 py-2 bg-[#181A1A] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a259f7]"
                placeholder="Agregar tag y presiona Enter"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={handleTagAdd}
              />
            </div>
            {/* Referencias externas */}
            <div>
              <label className="block text-white font-semibold mb-1">Referencias externas</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {refs.map(ref => (
                  <span key={ref} className="bg-purple-100 text-[#a259f7] text-xs px-2 py-0.5 rounded font-semibold flex items-center gap-1">{ref} <button type="button" className="text-purple-400 hover:text-red-500" onClick={() => handleRefRemove(ref)}>×</button></span>
                ))}
              </div>
              <input
                className="border-2 border-[#a259f7] rounded-lg px-3 py-2 bg-[#181A1A] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a259f7]"
                placeholder="Agregar referencia y presiona Enter"
                value={refInput}
                onChange={e => setRefInput(e.target.value)}
                onKeyDown={handleRefAdd}
              />
            </div>
            {/* Archivos adjuntos (simulado) */}
            <div>
              <label className="block text-white font-semibold mb-1">Archivos adjuntos</label>
              <input
                type="file"
                multiple
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                onChange={handleFileChange}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {files.map((file, idx) => (
                  <span key={file.name + idx} className="bg-purple-100 text-[#a259f7] text-xs px-2 py-0.5 rounded font-semibold flex items-center gap-1">{file.name} <button type="button" className="text-purple-400 hover:text-red-500" onClick={() => handleFileRemove(idx)}>×</button></span>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-lg font-bold text-white bg-purple-600 hover:bg-purple-700 transition-all text-lg mt-2"
            >Enviar Explicación</button>
            {submitMsg && <div className="text-yellow-400 font-semibold mt-2">{submitMsg}</div>}
          </form>
        </div>
      )}
      {tab === 'solicitudes' && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">Solicitudes de Explicaciones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pending.length === 0 && (
              <div className="col-span-2 text-gray-500">No hay solicitudes pendientes.</div>
            )}
            {pending.map(e => (
              <div key={e.id} className="rounded-2xl p-5 bg-[#23263a] border-2 border-[#23263a] hover:border-[#a259f7] transition-all shadow-lg flex flex-col gap-2">
                <div className="font-bold text-lg text-white mb-1">{e.title}</div>
                <div className="text-sm text-gray-300">Vulnerabilidad: <span className="text-purple-300">{e.vulnerability}</span></div>
                <div className="text-sm text-gray-400">Autor: {e.author}</div>
                <div className="text-xs text-gray-500">Publicado el: {e.date}</div>
                <div className="text-gray-200 mt-2">{e.content}</div>
                <div className="flex gap-3 mt-2">
                  <button onClick={() => handleVote(e.id, 'like')} className={`flex items-center gap-1 px-3 py-1 rounded-lg font-bold text-white ${votes[e.id]?.[userId] === 'like' ? 'bg-green-600' : 'bg-gray-700 hover:bg-green-700'} transition`}>
                    <FaThumbsUp /> {e.likes}
                  </button>
                  <button onClick={() => handleVote(e.id, 'dislike')} className={`flex items-center gap-1 px-3 py-1 rounded-lg font-bold text-white ${votes[e.id]?.[userId] === 'dislike' ? 'bg-red-600' : 'bg-gray-700 hover:bg-red-700'} transition`}>
                    <FaThumbsDown /> {e.dislikes}
                  </button>
                </div>
                {/* Feedback */}
                <div className="mt-2">
                  <button onClick={() => setShowFeedback(prev => ({ ...prev, [e.id]: !prev[e.id] }))} className="text-purple-400 hover:underline font-semibold text-sm">{showFeedback[e.id] ? 'Ocultar' : 'Agregar sugerencia'}</button>
                  {showFeedback[e.id] && (
                    <div className="mt-2 flex flex-col gap-2">
                      <textarea
                        className="w-full h-16 rounded-lg border-2 border-[#a259f7] bg-[#181A1A] text-white p-2"
                        placeholder="Escribe tu sugerencia..."
                        value={feedbackInput[e.id] || ''}
                        onChange={e2 => setFeedbackInput(prev => ({ ...prev, [e.id]: e2.target.value }))}
                      />
                      <button onClick={() => handleFeedback(e.id)} className="w-full py-1.5 rounded-lg font-bold text-white bg-purple-600 hover:bg-purple-700 transition-all">Enviar sugerencia</button>
                    </div>
                  )}
                  {/* Mostrar feedback existente */}
                  {e.feedback && e.feedback.length > 0 && (
                    <div className="mt-2">
                      <div className="text-xs text-gray-400 mb-1">Sugerencias previas:</div>
                      <ul className="list-disc pl-5 text-gray-300 text-sm">
                        {e.feedback.map((f, idx) => (
                          <li key={idx}><span className="text-purple-300 font-semibold">{f.user}:</span> {f.text}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Documentation; 