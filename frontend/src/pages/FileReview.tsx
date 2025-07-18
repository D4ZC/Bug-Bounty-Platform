import React, { useState, useEffect } from 'react';

const FILES_KEY = 'files';
const REVIEW_KEY = 'files_review';
const MESSAGE_KEY = 'messages';
const PENALTY_REASONS = [
  'Unfounded information',
  'Misuse',
  'Other',
];

const MOCK_FILES = [
  {
    id: 1,
    title: 'SQL Injection Guide',
    types: ['SQL Injection'],
    difficulty: 'Critical',
    description: 'Learn how to exploit and mitigate SQL Injection in web applications.',
    likes: 2,
    dislikes: 6,
    preview: 'Content of the SQL Injection guide... (max 1 page)',
    link: '',
    fileType: 'pdf',
    creator: 'alice',
  },
  {
    id: 2,
    title: 'XSS Prevention',
    types: ['XSS'],
    difficulty: 'High',
    description: 'Best practices to prevent Cross-Site Scripting.',
    likes: 5,
    dislikes: 2,
    preview: 'Summary of XSS prevention... (max 1 page)',
    link: '',
    fileType: 'docx',
    creator: 'bob',
  },
  {
    id: 3,
    title: 'CSRF: Concepts and Examples',
    types: ['CSRF'],
    difficulty: 'Medium',
    description: 'Explanation of CSRF attacks and practical examples.',
    likes: 1,
    dislikes: 4,
    preview: 'Excerpt of CSRF... (max 1 page)',
    link: 'https://example.com/csrf',
    fileType: 'link',
    creator: 'charlie',
  },
];

const DIFFICULTY_COLORS: Record<string, string> = {
  Critical: 'bg-red-600 text-white',
  High: 'bg-orange-500 text-white',
  Medium: 'bg-yellow-400 text-gray-900',
  Low: 'bg-green-400 text-gray-900',
};

const USERS_KEY = 'users';

function getReviewFiles() {
  const stored = localStorage.getItem(REVIEW_KEY);
  if (stored) return JSON.parse(stored);
  // Inicializar con los que requieren revisión
  const review = MOCK_FILES.filter(f => f.dislikes - f.likes >= 3);
  localStorage.setItem(REVIEW_KEY, JSON.stringify(review));
  return review;
}

const FileReview: React.FC = () => {
  type FileType = typeof MOCK_FILES[0];
  const [files, setFiles] = useState<FileType[]>(getReviewFiles());
  const [selected, setSelected] = useState<typeof MOCK_FILES[0] | null>(null);
  const [penalty, setPenalty] = useState(0);
  const [successMsg, setSuccessMsg] = useState('');
  const [showPenaltyModal, setShowPenaltyModal] = useState(false);
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [otherReason, setOtherReason] = useState('');
  const [penaltyStep, setPenaltyStep] = useState<'none' | 'confirm' | 'reasons' | 'final'>('none');
  const [finalMsg, setFinalMsg] = useState('');

  // Sincronizar cambios con localStorage
  useEffect(() => {
    localStorage.setItem(REVIEW_KEY, JSON.stringify(files));
  }, [files]);

  // Escuchar cambios en localStorage para actualizar el estado de archivos
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === REVIEW_KEY) {
        const stored = localStorage.getItem(REVIEW_KEY);
        if (stored) setFiles(JSON.parse(stored));
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Penalize: mostrar modal de confirmación inicial
  const handlePenalize = () => {
    setPenaltyStep('confirm');
  };

  // Confirmar paso 1: mostrar razones
  const confirmPenaltyStep = () => {
    setPenaltyStep('reasons');
  };

  // Confirmar penalización (paso final)
  const confirmPenalize = () => {
    if (!selected) return;
    // Eliminar de ambos módulos
    setFiles((prev: FileType[]) => {
      const updated = prev.filter((f: FileType) => f.id !== selected.id);
      // Eliminar también de files
      const filesAll: FileType[] = JSON.parse(localStorage.getItem(FILES_KEY) || '[]');
      localStorage.setItem(FILES_KEY, JSON.stringify(filesAll.filter((f: FileType) => f.id !== selected.id)));
      return updated;
    });
    // Notificar al usuario penalizado
    const reasons = selectedReasons.join(', ') + (selectedReasons.includes('Other') && otherReason ? ` (${otherReason})` : '');
    const messages = JSON.parse(localStorage.getItem(MESSAGE_KEY) || '[]');
    messages.push({
      id: Date.now() + Math.random(),
      from: 'system',
      to: selected.creator,
      subject: `Penalty for documentation: ${selected.title}`,
      content: `Your documentation "${selected.title}" has been penalized for the following reason(s): ${reasons}.\nYou have been deducted ${penalty} points.`,
      type: 'penalty',
      read: false,
      trashed: false,
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
    });
    localStorage.setItem(MESSAGE_KEY, JSON.stringify(messages));
    // Reducir puntos al usuario penalizado (simulado)
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    if (!users[selected.creator]) users[selected.creator] = { points: 0 };
    users[selected.creator].points = (users[selected.creator].points || 0) - penalty;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    setPenaltyStep('final');
    setFinalMsg(`${selected.creator} has been penalized by ${penalty} points for: ${reasons}`);
    setSelectedReasons([]);
    setOtherReason('');
    setTimeout(() => {
      setFinalMsg('');
      setPenaltyStep('none');
      setSelected(null);
    }, 3500);
  };
  // Return: mover a files y eliminar de review
  const handleReturn = () => {
    setFiles((prev: FileType[]) => {
      const updated = prev.filter((f: FileType) => f.id !== selected?.id);
      // Agregar a files solo si no existe ya
      const filesAll: FileType[] = JSON.parse(localStorage.getItem(FILES_KEY) || '[]');
      if (selected) {
        const exists = filesAll.some((f: FileType) => f.id === selected.id);
        if (!exists) {
          localStorage.setItem(FILES_KEY, JSON.stringify([...filesAll, selected]));
        }
      }
      // Actualizar review
      const reviewAll: FileType[] = JSON.parse(localStorage.getItem(REVIEW_KEY) || '[]');
      localStorage.setItem(REVIEW_KEY, JSON.stringify(reviewAll.filter((f: FileType) => f.id !== selected?.id)));
      return updated;
    });
    setSelected(null);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">File Review</h2>
      {successMsg && <div className="mb-4 p-3 rounded bg-green-100 text-green-800 text-center font-semibold">{successMsg}</div>}
      {finalMsg && <div className="mb-4 p-3 rounded bg-green-200 text-green-900 text-center font-semibold">{finalMsg}</div>}
      {files.length === 0 ? (
        <div className="text-gray-600 dark:text-gray-300 text-center">No files require review at this time.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {files.map((file: FileType) => (
            <div key={file.id} className="rounded-xl shadow-lg p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex flex-col gap-2 cursor-pointer transition hover:shadow-xl" onClick={() => setSelected(file)}>
              <div className="flex items-center gap-2 mb-1">
                {file.types.map((type: string) => (
                  <span key={type} className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold">{type}</span>
                ))}
                <span className={`ml-auto px-2 py-1 rounded text-xs font-bold ${DIFFICULTY_COLORS[file.difficulty]}`}>{file.difficulty}</span>
              </div>
              <div className="font-bold text-lg text-gray-800 dark:text-gray-100 truncate">{file.title}</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{file.description}</div>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                <span>Likes: {file.likes}</span>
                <span>Dislikes: {file.dislikes}</span>
                <span className="ml-auto">Creator: {file.creator}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Modal de revisión */}
      {selected && penaltyStep === 'none' && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-3xl relative flex">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold" onClick={() => setSelected(null)}>&times;</button>
            <div className="flex-1 pr-6 border-r border-gray-200 dark:border-gray-700">
              <div className="font-bold text-xl mb-2 text-gray-800 dark:text-gray-100">{selected.title}</div>
              <div className="mb-2 text-gray-600 dark:text-gray-300 text-sm">{selected.description}</div>
              <div className="bg-gray-100 dark:bg-gray-900 rounded p-4 text-xs text-gray-700 dark:text-gray-200 max-h-96 overflow-y-auto">
                {selected.preview}
                {selected.link && (
                  <div className="mt-2"><a href={selected.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View external document</a></div>
                )}
              </div>
            </div>
            <div className="w-72 pl-6 flex flex-col justify-between">
              <div>
                <div className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Actions</div>
                <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200">Penalty points</label>
                <input type="number" min={1} max={200} value={penalty} onChange={e => setPenalty(Number(e.target.value))} className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 mb-2" />
                <button className="w-full px-4 py-2 rounded bg-red-600 text-white font-bold hover:bg-red-700 transition mb-2" onClick={handlePenalize} disabled={penalty <= 0}>Penalize</button>
                <button className="w-full px-4 py-2 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition" onClick={handleReturn}>Return</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal de confirmación inicial */}
      {penaltyStep === 'confirm' && selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-md relative">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold" onClick={() => setPenaltyStep('none')}>&times;</button>
            <div className="font-bold text-xl mb-4 text-gray-800 dark:text-gray-100">Confirm Penalty</div>
            <div className="mb-4 text-gray-700 dark:text-gray-200">Are you sure you want to penalize <span className="font-bold">{selected.creator}</span> for <span className="font-bold">{selected.title}</span> by <span className="font-bold">{penalty}</span> points?</div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold hover:bg-gray-400 dark:hover:bg-gray-600 transition" onClick={() => setPenaltyStep('none')}>Cancel</button>
              <button className="flex-1 px-4 py-2 rounded bg-red-600 text-white font-bold hover:bg-red-700 transition" onClick={confirmPenaltyStep}>Continue</button>
            </div>
          </div>
        </div>
      )}
      {/* Modal de selección de razones */}
      {penaltyStep === 'reasons' && selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-md relative">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold" onClick={() => setPenaltyStep('none')}>&times;</button>
            <div className="font-bold text-xl mb-4 text-gray-800 dark:text-gray-100">Penalty Reason</div>
            <div className="mb-3 text-gray-700 dark:text-gray-200">Select the reason(s) for penalizing <span className="font-bold">{selected.creator}</span> for <span className="font-bold">{selected.title}</span>:</div>
            <div className="mb-4 flex flex-col gap-2">
              {PENALTY_REASONS.map(reason => (
                <label key={reason} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedReasons.includes(reason)}
                    onChange={e => {
                      if (e.target.checked) setSelectedReasons(prev => [...prev, reason]);
                      else setSelectedReasons(prev => prev.filter(r => r !== reason));
                    }}
                  />
                  <span>{reason}</span>
                </label>
              ))}
              {selectedReasons.includes('Other') && (
                <input
                  type="text"
                  className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                  placeholder="Specify other reason..."
                  value={otherReason}
                  onChange={e => setOtherReason(e.target.value)}
                />
              )}
            </div>
            <button
              className="w-full px-4 py-2 rounded bg-red-600 text-white font-bold hover:bg-red-700 transition mt-2"
              onClick={confirmPenalize}
              disabled={selectedReasons.length === 0 || penalty <= 0}
            >
              Confirm Penalty
            </button>
          </div>
        </div>
      )}
      {/* Banner/modal de confirmación final */}
      {penaltyStep === 'final' && finalMsg && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-green-100 dark:bg-green-900 rounded-xl shadow-lg p-8 w-full max-w-md text-center">
            <div className="font-bold text-xl mb-2 text-green-900 dark:text-green-100">Penalty Applied</div>
            <div className="mb-2 text-green-800 dark:text-green-200">{finalMsg}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileReview; 