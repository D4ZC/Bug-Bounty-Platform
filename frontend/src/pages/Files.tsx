import React, { useState, useEffect } from 'react';
import { Edit, TrashCan, ThumbsUp, ThumbsDown, Undo } from '@carbon/icons-react';

const VULN_TYPES = [
  'SQL Injection',
  'XSS',
  'CSRF',
  'RCE',
  'Open Redirect',
  'IDOR',
];
const DIFFICULTIES = ['Critical', 'High', 'Medium', 'Low'];

const MOCK_FILES = [
  {
    id: 1,
    title: 'SQL Injection Guide',
    types: ['SQL Injection'],
    difficulty: 'Critical',
    description: 'Learn how to exploit and mitigate SQL Injection in web applications.',
    likes: 12,
    dislikes: 1,
    preview: 'Content of the SQL Injection guide... (max 1 page)',
    link: '',
    fileType: 'pdf',
    reviewed: false, // Opcional para tipado
  },
  {
    id: 2,
    title: 'XSS Prevention',
    types: ['XSS'],
    difficulty: 'High',
    description: 'Best practices to prevent Cross-Site Scripting.',
    likes: 8,
    dislikes: 0,
    preview: 'Summary of XSS prevention... (max 1 page)',
    link: '',
    fileType: 'docx',
  },
  {
    id: 3,
    title: 'CSRF: Concepts and Examples',
    types: ['CSRF'],
    difficulty: 'Medium',
    description: 'Explanation of CSRF attacks and practical examples.',
    likes: 5,
    dislikes: 2,
    preview: 'Excerpt of CSRF... (max 1 page)',
    link: 'https://example.com/csrf',
    fileType: 'link',
  },
  // Nuevas cards para pruebas
  {
    id: 4,
    title: 'Clickjacking Attack Demo',
    types: ['Clickjacking'],
    difficulty: 'High',
    description: 'Demo and prevention techniques for Clickjacking.',
    likes: 3,
    dislikes: 1,
    preview: 'Clickjacking demo content...',
    link: '',
    fileType: 'pdf',
  },
  {
    id: 5,
    title: 'TLS Best Practices',
    types: ['TLS'],
    difficulty: 'Regular',
    description: 'How to configure TLS securely.',
    likes: 7,
    dislikes: 0,
    preview: 'TLS configuration summary...',
    link: '',
    fileType: 'docx',
  },
  {
    id: 6,
    title: 'SSRF Exploitation',
    types: ['SSRF'],
    difficulty: 'Critical',
    description: 'Server Side Request Forgery explained with examples.',
    likes: 2,
    dislikes: 0,
    preview: 'SSRF attack details...',
    link: '',
    fileType: 'pdf',
  },
  {
    id: 7,
    title: 'IDOR in APIs',
    types: ['IDOR'],
    difficulty: 'Medium',
    description: 'Insecure Direct Object Reference in REST APIs.',
    likes: 4,
    dislikes: 1,
    preview: 'IDOR API case study...',
    link: '',
    fileType: 'docx',
  },
  {
    id: 8,
    title: 'Open Redirects: Real World Cases',
    types: ['Open Redirect'],
    difficulty: 'Low',
    description: 'Examples of open redirect vulnerabilities.',
    likes: 6,
    dislikes: 0,
    preview: 'Open redirect real world...',
    link: '',
    fileType: 'pdf',
  },
  {
    id: 9,
    title: 'RCE: Remote Code Execution',
    types: ['RCE'],
    difficulty: 'Critical',
    description: 'Understanding and preventing RCE.',
    likes: 1,
    dislikes: 0,
    preview: 'RCE prevention guide...',
    link: '',
    fileType: 'pdf',
  },
];

const FILES_KEY = 'files';
const REVIEW_KEY = 'files_review';

const DIFFICULTY_COLORS: Record<string, string> = {
  Critical: 'bg-red-600 text-white',
  High: 'bg-orange-500 text-white',
  Medium: 'bg-yellow-400 text-gray-900',
  Low: 'bg-green-400 text-gray-900',
};

const Files: React.FC = () => {
  const [search, setSearch] = useState('');
  // Inicializar archivos desde localStorage o MOCK_FILES
  const [files, setFiles] = useState<typeof MOCK_FILES>(() => {
    const stored = localStorage.getItem(FILES_KEY);
    if (stored) return JSON.parse(stored);
    localStorage.setItem(FILES_KEY, JSON.stringify(MOCK_FILES));
    return MOCK_FILES;
  });
  const [selected, setSelected] = useState<typeof MOCK_FILES[0] | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addTypes, setAddTypes] = useState<string[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFile, setEditFile] = useState<typeof MOCK_FILES[0] | null>(null);
  const [editTypes, setEditTypes] = useState<string[]>([]);

  const [addTitle, setAddTitle] = useState('');
  const [addDifficulty, setAddDifficulty] = useState(DIFFICULTIES[0]);
  const [addFile, setAddFile] = useState<File | null>(null);
  const [addLink, setAddLink] = useState('');
  const [addDesc, setAddDesc] = useState('');

  const [editTitle, setEditTitle] = useState('');
  const [editDifficulty, setEditDifficulty] = useState(DIFFICULTIES[0]);
  const [editFileInput, setEditFileInput] = useState<File | null>(null);
  const [editLink, setEditLink] = useState('');
  const [editDesc, setEditDesc] = useState('');

  const [voted, setVoted] = useState<{ [id: number]: 'like' | 'dislike' | undefined }>({});

  // Estado para controlar el pago de puntos por card
  const [paidFiles, setPaidFiles] = useState<{ [id: number]: boolean }>(() => {
    const stored = localStorage.getItem('paid_files');
    return stored ? JSON.parse(stored) : {};
  });

  // Guardar en localStorage cuando se paga
  const handlePay = (id: number) => {
    setPaidFiles(prev => {
      const updated = { ...prev, [id]: true };
      localStorage.setItem('paid_files', JSON.stringify(updated));
      return updated;
    });
  };

  // Sincronizar cambios con localStorage
  useEffect(() => {
    localStorage.setItem(FILES_KEY, JSON.stringify(files));
  }, [files]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === FILES_KEY) {
        const stored = localStorage.getItem(FILES_KEY);
        if (stored) setFiles(JSON.parse(stored));
      }
      if (e.key === REVIEW_KEY) {
        const stored = localStorage.getItem(FILES_KEY);
        if (stored) setFiles(JSON.parse(stored));
      }
    };
    const onFocus = () => {
      const stored = localStorage.getItem(FILES_KEY);
      if (stored) setFiles(JSON.parse(stored));
    };
    const onFilesUpdated = () => {
      const stored = localStorage.getItem(FILES_KEY);
      if (stored) setFiles(JSON.parse(stored));
    };
    window.addEventListener('storage', onStorage);
    window.addEventListener('focus', onFocus);
    window.addEventListener('files-updated', onFilesUpdated);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('files-updated', onFilesUpdated);
    };
  }, []);

  // Función para mover un archivo a revisión
  const moveToReview = (file: typeof MOCK_FILES[0]) => {
    const review = JSON.parse(localStorage.getItem(REVIEW_KEY) || '[]');
    review.push(file);
    localStorage.setItem(REVIEW_KEY, JSON.stringify(review));
    setFiles((prev: typeof MOCK_FILES) => prev.filter(f => f.id !== file.id));
  };

  // Hook para detectar dislikes > likes y mover a revisión automáticamente
  useEffect(() => {
    files.forEach(file => {
      if (file.dislikes > file.likes) {
        moveToReview(file);
      }
    });
    // eslint-disable-next-line
  }, [files]);

  // Obtener archivos en revisión para filtrar duplicados
  const getReviewIds = () => {
    const review = JSON.parse(localStorage.getItem(REVIEW_KEY) || '[]');
    return review.map((f: typeof MOCK_FILES[0]) => f.id);
  };

  // Filtros de búsqueda
  const filtered = files
    // Filtrar archivos que están en revisión para evitar duplicados
    .filter((f: typeof MOCK_FILES[0]) => !getReviewIds().includes(f.id))
    .filter((f: typeof MOCK_FILES[0]) =>
      f.title.toLowerCase().includes(search.toLowerCase()) ||
      f.types.some((t: string) => t.toLowerCase().includes(search.toLowerCase())) ||
      f.difficulty.toLowerCase().includes(search.toLowerCase())
    );

  // Add logic
  const handleAdd = () => {
    if (!addTitle.trim() || addTypes.length === 0 || (!addFile && !addLink.trim())) return;
    setFiles((prev: typeof MOCK_FILES) => [
      ...prev,
      {
        id: Date.now(),
        title: addTitle,
        types: addTypes,
        difficulty: addDifficulty,
        description: addDesc,
        likes: 0,
        dislikes: 0,
        preview: 'Preview not available.',
        link: addLink,
        fileType: addFile ? addFile.type : (addLink ? 'link' : ''),
      },
    ]);
    setShowAddModal(false);
    setAddTitle('');
    setAddTypes([]);
    setAddDifficulty(DIFFICULTIES[0]);
    setAddFile(null);
    setAddLink('');
    setAddDesc('');
  };

  // Edit logic
  const openEditModal = (file: typeof MOCK_FILES[0]) => {
    setEditFile(file);
    setEditTypes(file.types);
    setEditTitle(file.title);
    setEditDifficulty(file.difficulty);
    setEditLink(file.link);
    setEditDesc(file.description);
    setShowEditModal(true);
  };
  const handleEdit = () => {
    if (!editFile) return;
    setFiles((prev: typeof MOCK_FILES) => prev.map((f: typeof MOCK_FILES[0]) =>
      f.id === editFile.id
        ? {
            ...f,
            title: editTitle,
            types: editTypes,
            difficulty: editDifficulty,
            description: editDesc,
            link: editLink,
            fileType: editFileInput ? editFileInput.type : (editLink ? 'link' : f.fileType),
          }
        : f
    ));
    setShowEditModal(false);
    setEditFile(null);
    setEditTypes([]);
    setEditTitle('');
    setEditDifficulty(DIFFICULTIES[0]);
    setEditFileInput(null);
    setEditLink('');
    setEditDesc('');
  };

  // Delete logic
  const handleDelete = (id: number) => {
    setFiles((prev: typeof MOCK_FILES) => prev.filter((f: typeof MOCK_FILES[0]) => f.id !== id));
  };

  // Like/Dislike logic
  const handleLike = (id: number) => {
    setFiles((prev: typeof MOCK_FILES) => prev.map((f: typeof MOCK_FILES[0]) => f.id === id ? { ...f, likes: f.likes + 1 } : f));
    setVoted(prev => ({ ...prev, [id]: 'like' }));
  };
  const handleDislike = (id: number) => {
    setFiles((prev: typeof MOCK_FILES) => {
      const updated = prev.map((f: typeof MOCK_FILES[0]) => f.id === id ? { ...f, dislikes: f.dislikes + 1 } : f);
      const file = updated.find(f => f.id === id);
      // Verificar si ya está en revisión
      const review = JSON.parse(localStorage.getItem(REVIEW_KEY) || '[]');
      const alreadyInReview = review.some((r: typeof MOCK_FILES[0]) => r.id === id);
      if (file && file.dislikes - file.likes >= 3 && !alreadyInReview) {
        localStorage.setItem(REVIEW_KEY, JSON.stringify([...review, file]));
        const filtered = updated.filter(f => f.id !== id);
        localStorage.setItem(FILES_KEY, JSON.stringify(filtered));
        return filtered;
      } else {
        localStorage.setItem(FILES_KEY, JSON.stringify(updated));
        return updated;
      }
    });
    setVoted(prev => ({ ...prev, [id]: 'dislike' }));
  };
  const handleUndoVote = (id: number) => {
    setFiles((prev: typeof MOCK_FILES) => prev.map((f: typeof MOCK_FILES[0]) => {
      if (f.id !== id) return f;
      if (voted[id] === 'like') return { ...f, likes: Math.max(0, f.likes - 1) };
      if (voted[id] === 'dislike') return { ...f, dislikes: Math.max(0, f.dislikes - 1) };
      return f;
    }));
    setVoted(prev => ({ ...prev, [id]: undefined }));
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
        <input
          type="text"
          className="flex-1 px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          placeholder="Search documentation..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            No files found with more dislikes than likes.
          </div>
        ) : (
          filtered.map(file => (
            <div key={file.id} className="rounded-xl shadow-lg p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex flex-col gap-2 relative group cursor-pointer transition hover:shadow-xl" onClick={() => setSelected(file)}>
              <div className="flex items-center gap-2 mb-1">
                {file.types.map(type => (
                  <span key={type} className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold">{type}</span>
                ))}
                <span className={`ml-auto px-2 py-1 rounded text-xs font-bold ${DIFFICULTY_COLORS[file.difficulty]}`}>{file.difficulty}</span>
              </div>
              <div className="font-bold text-lg text-gray-800 dark:text-gray-100 truncate flex items-center justify-between">
                <span>{file.title}</span>
                {/* Badge Reviewed debajo del título, alineado a la derecha */}
              </div>
              {file.reviewed && (
                <div className="flex justify-end mt-1">
                  <span className="text-yellow-600 font-bold px-3 py-1 rounded-full text-xs shadow-none">Reviewed</span>
                </div>
              )}
              <div className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{file.description}</div>
              <div className="flex items-center gap-2 mt-2">
                <button className="text-blue-500 hover:text-blue-700" title="Edit" onClick={e => { e.stopPropagation(); openEditModal(file); }}>
                  <Edit size={20} />
                </button>
                <button className="text-red-500 hover:text-red-700" title="Delete" onClick={e => { e.stopPropagation(); handleDelete(file.id); }}>
                  <TrashCan size={20} />
                </button>
                {voted[file.id] ? (
                  <button
                    className="ml-auto flex items-center gap-1 text-gray-500 hover:text-blue-600 font-semibold"
                    title="Undo vote"
                    onClick={e => { e.stopPropagation(); handleUndoVote(file.id); }}
                  >
                    <Undo size={20} /> <span>Undo vote</span>
                  </button>
                ) : (
                  <>
                    <button
                      className="ml-auto flex items-center gap-1 text-green-600 hover:text-green-800 font-semibold"
                      title="Like"
                      onClick={e => { e.stopPropagation(); handleLike(file.id); }}
                    >
                      <ThumbsUp size={20} /> <span>{file.likes}</span>
                    </button>
                    <button
                      className="flex items-center gap-1 text-pink-600 hover:text-pink-800 font-semibold"
                      title="Dislike"
                      onClick={e => { e.stopPropagation(); handleDislike(file.id); }}
                    >
                      <ThumbsDown size={20} /> <span>{file.dislikes}</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {/* Preview Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-2xl relative flex">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold" onClick={() => setSelected(null)}>&times;</button>
            <div className="flex-1 pr-6 border-r border-gray-200 dark:border-gray-700">
              <div className="font-bold text-xl mb-2 text-gray-800 dark:text-gray-100">{selected.title}</div>
              <div className="mb-2 text-gray-600 dark:text-gray-300 text-sm">{selected.description}</div>
              <div className={`bg-gray-100 dark:bg-gray-900 rounded p-4 text-xs text-gray-700 dark:text-gray-200 max-h-60 overflow-y-auto ${!paidFiles[selected.id] ? 'blur-sm select-none pointer-events-none' : ''}`}>
                {selected.preview}
                {selected.link && (
                  <div className="mt-2"><a href={selected.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View external document</a></div>
                )}
              </div>
            </div>
            <div className="w-64 pl-6 flex flex-col justify-between">
              <div>
                {!paidFiles[selected.id] ? (
                  <>
                    <div className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Pay with points</div>
                    <input type="number" min={1} max={200} defaultValue={50} className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 mb-2" readOnly />
                    <button className="w-full px-4 py-2 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition" onClick={() => handlePay(selected.id)}>Pay</button>
                  </>
                ) : (
                  <div className="text-green-600 font-bold text-center">Access granted!</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Floating button to add documentation */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg text-3xl font-bold"
        title="Add documentation"
        onClick={() => setShowAddModal(true)}
      >
        +
      </button>
      {/* Modal to add documentation */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-lg relative">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold" onClick={() => setShowAddModal(false)}>&times;</button>
            <div className="font-bold text-xl mb-4 text-gray-800 dark:text-gray-100">Add Documentation</div>
            <div className="mb-3">
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200">Title</label>
              <input className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100" value={addTitle} onChange={e => setAddTitle(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200">Description</label>
              <textarea className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100" value={addDesc} onChange={e => setAddDesc(e.target.value)} rows={3} />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200">Difficulty</label>
              <select className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100" value={addDifficulty} onChange={e => setAddDifficulty(e.target.value)}>
                {DIFFICULTIES.map(dif => <option key={dif}>{dif}</option>)}
              </select>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200">Vulnerability type(s)</label>
              <div className="flex flex-wrap gap-2">
                {/* Selected filters on top */}
                {addTypes.map(type => (
                  <span key={type} className="flex items-center px-3 py-1 rounded-full bg-blue-600 text-white border-blue-700 border font-semibold text-sm">
                    {type}
                    <button type="button" className="ml-2 text-white hover:text-red-300 text-lg leading-none" onClick={() => setAddTypes(prev => prev.filter(t => t !== type))}>&times;</button>
                  </span>
                ))}
                {/* Unselected filters */}
                {VULN_TYPES.filter(type => !addTypes.includes(type)).map(type => (
                  <button
                    key={type}
                    type="button"
                    className="px-3 py-1 rounded-full border font-semibold text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-blue-800"
                    onClick={() => setAddTypes(prev => [...prev, type])}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200">File or Link</label>
              <label className="inline-flex items-center px-2 py-1 mb-2 bg-blue-600 text-white rounded cursor-pointer font-semibold hover:bg-blue-700 transition text-sm">
                <span>Choose file</span>
                <input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword" className="hidden" onChange={e => setAddFile(e.target.files?.[0] || null)} />
              </label>
              <input type="url" placeholder="Or paste an external link..." className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100" value={addLink} onChange={e => setAddLink(e.target.value)} />
            </div>
            <button className="w-full px-4 py-2 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition mt-2" onClick={handleAdd} disabled={!addTitle.trim() || addTypes.length === 0 || (!addFile && !addLink.trim())}>Add</button>
          </div>
        </div>
      )}
      {/* Modal to edit documentation */}
      {showEditModal && editFile && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-lg relative">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold" onClick={() => { setShowEditModal(false); setEditFile(null); setEditTypes([]); }}>&times;</button>
            <div className="font-bold text-xl mb-4 text-gray-800 dark:text-gray-100">Edit Documentation</div>
            <div className="mb-3">
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200">Title</label>
              <input className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100" value={editTitle} onChange={e => setEditTitle(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200">Difficulty</label>
              <select className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100" value={editDifficulty} onChange={e => setEditDifficulty(e.target.value)}>
                {DIFFICULTIES.map(dif => <option key={dif}>{dif}</option>)}
              </select>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200">Vulnerability type(s)</label>
              <div className="flex flex-wrap gap-2">
                {editTypes.map(type => (
                  <span key={type} className="flex items-center px-3 py-1 rounded-full bg-blue-600 text-white border-blue-700 border font-semibold text-sm">
                    {type}
                    <button type="button" className="ml-2 text-white hover:text-red-300 text-lg leading-none" onClick={() => setEditTypes(prev => prev.filter(t => t !== type))}>&times;</button>
                  </span>
                ))}
                {VULN_TYPES.filter(type => !editTypes.includes(type)).map(type => (
                  <button
                    key={type}
                    type="button"
                    className="px-3 py-1 rounded-full border font-semibold text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-blue-800"
                    onClick={() => setEditTypes(prev => [...prev, type])}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200">File or Link</label>
              <label className="inline-flex items-center px-2 py-1 mb-2 bg-blue-600 text-white rounded cursor-pointer font-semibold hover:bg-blue-700 transition text-sm">
                <span>Choose file</span>
                <input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword" className="hidden" onChange={e => setEditFileInput(e.target.files?.[0] || null)} />
              </label>
              <input type="url" placeholder="Or paste an external link..." className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100" value={editLink} onChange={e => setEditLink(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200">Description</label>
              <textarea className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100" value={editDesc} onChange={e => setEditDesc(e.target.value)} />
            </div>
            <button className="w-full px-4 py-2 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition mt-2" onClick={handleEdit} disabled={!editTitle.trim() || editTypes.length === 0 || (!editFileInput && !editLink.trim())}>Save changes</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Files; 