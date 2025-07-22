import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-tomorrow.css';
import { Toaster, toast } from 'react-hot-toast';
import confetti from 'canvas-confetti';

const ACCENT = '#00f7fa';

// Mock de desafíos
const mockChallenges = [
  {
    id: '1',
    title: 'Desafío SQL Injection',
    description: 'Encuentra y explota una vulnerabilidad de SQL Injection en la aplicación demo.',
    rules: [
      'No ataques fuera del entorno proporcionado.',
      'No compartas soluciones públicamente.',
      'El reto debe completarse en el tiempo asignado.'
    ],
    files: [
      { name: 'database.sql', url: '#' },
      { name: 'app.js', url: '#' }
    ],
    timeLimit: 150, // minutos
    initialCode: '// Escribe tu payload aquí\n',
    status: 'EN_GULAG',
  },
  // ...otros desafíos
];

const LANGUAGES = [
  { label: 'JavaScript', value: 'javascript', prism: 'js' },
  { label: 'Python', value: 'python', prism: 'python' },
];

function formatTimeLeft(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s < 10 ? '0' : ''}${s}s`;
}

const GulagDetail: React.FC = () => {
  const { id } = useParams();
  const { isDark } = useTheme();
  const challenge = mockChallenges.find(c => c.id === id) || mockChallenges[0];
  const [code, setCode] = useState(challenge.initialCode);
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [timeLeft, setTimeLeft] = useState(challenge.timeLimit * 60); // en segundos
  const [error, setError] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<Array<{date: Date, language: string, code: string, status: 'success' | 'error'}>>([]);
  const editorRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Temporizador regresivo
  useEffect(() => {
    if (challenge.status !== 'EN_GULAG') return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setError('¡Tiempo agotado!');
          toast.error('¡Tiempo agotado!');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [challenge.status]);

  // Simular envío de solución
  const handleSubmit = () => {
    if (timeLeft <= 0) {
      setError('No puedes enviar la solución, el tiempo ha terminado.');
      toast.error('No puedes enviar la solución, el tiempo ha terminado.');
      return;
    }
    setError(null);
    toast.success('¡Solución enviada! (mock)');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: [ACCENT, '#fff', '#39ff14'],
    });
    setSubmissions(prev => [
      {
        date: new Date(),
        language: language.label,
        code,
        status: 'success',
      },
      ...prev
    ]);
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center py-10 px-2 transition-colors duration-500 bg-gradient-to-br from-[#0a183d] via-[#1a0033] to-[#2d003e] font-mono`}>
      <Toaster position="top-right" />
      <div className="w-full max-w-3xl bg-[#181a20]/90 rounded-2xl shadow-lg p-8 border-2 border-[#00f7fa] backdrop-blur-md animate-fade-in-up">
        <h1 className="text-3xl font-extrabold mb-2 text-[#00f7fa] drop-shadow-[0_0_8px_#00fff7] font-mono">{challenge.title}</h1>
        <div className="mb-4 text-white font-mono">{challenge.description}</div>
        <div className="mb-4">
          <span className="font-bold text-[#00f7fa]">Reglas:</span>
          <ul className="list-disc ml-6 text-white font-mono">
            {challenge.rules.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </div>
        <div className="mb-4">
          <span className="font-bold text-[#00f7fa]">Archivos:</span>
          <ul className="ml-4">
            {challenge.files.map((f, i) => <li key={i}><a href={f.url} className="underline text-[#00f7fa] font-mono">{f.name}</a></li>)}
          </ul>
        </div>
        <div className="mb-4 flex items-center gap-4">
          <span className="font-bold text-[#00f7fa]">Tiempo restante:</span>
          <span className="font-mono text-lg" style={{ color: timeLeft > 60 ? ACCENT : '#ff3b3b' }}>{formatTimeLeft(timeLeft)}</span>
        </div>
        {/* Barra de progreso visual */}
        <div className="w-full h-4 bg-gray-700 rounded mb-6 overflow-hidden">
          <div
            className="h-4 transition-all duration-500"
            style={{
              width: `${Math.max(0, (timeLeft / (challenge.timeLimit * 60)) * 100)}%`,
              background: ACCENT,
              transition: 'width 1s linear',
            }}
          ></div>
        </div>
        {error && <div className="mb-4 text-red-400 font-bold font-mono animate-fade-in-up">{error}</div>}
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2">
            <span className="font-bold text-[#00f7fa]">Lenguaje:</span>
            <select
              className="bg-[#101014] border-2 rounded px-2 py-1 text-white font-mono border-[#00f7fa] focus:outline-none focus:ring-2 focus:ring-[#00f7fa]"
              value={language.value}
              onChange={e => {
                const lang = LANGUAGES.find(l => l.value === e.target.value) || LANGUAGES[0];
                setLanguage(lang);
              }}
              disabled={timeLeft <= 0}
            >
              {LANGUAGES.map(l => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>
          </div>
          <span className="font-bold text-[#00f7fa]">Editor de código:</span>
          <div className="flex gap-2 mb-2">
            <button
              className="px-3 py-1 rounded bg-[#00f7fa] text-black font-bold text-xs hover:bg-cyan-400 transition font-mono animate-glow"
              onClick={() => {
                navigator.clipboard.writeText(code);
                toast.success('¡Código copiado!');
              }}
              disabled={timeLeft <= 0}
            >
              Copiar código
            </button>
          </div>
          <div
            className="mt-2 rounded-lg overflow-hidden border-2 resize-y min-h-[180px] max-h-[600px] border-[#00f7fa] backdrop-blur-md animate-fade-in-up"
            ref={editorRef}
          >
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={(code: string) => highlight(code, languages[language.prism], language.value)}
              padding={16}
              style={{
                fontFamily: 'monospace',
                fontSize: 16,
                background: isDark ? '#101014' : '#fff',
                color: '#fff',
                minHeight: 180,
                resize: 'none',
              }}
              textareaClassName="outline-none"
              preClassName="!bg-transparent"
              disabled={timeLeft <= 0}
            />
          </div>
        </div>
        {/* Historial de envíos */}
        <div className="mt-8">
          <span className="font-bold text-[#00f7fa]">Historial de envíos:</span>
          <button
            className="ml-4 px-3 py-1 rounded bg-[#00f7fa] text-black font-bold text-xs hover:bg-cyan-400 transition font-mono animate-glow"
            onClick={() => setSubmissions([])}
            disabled={submissions.length === 0}
          >
            Limpiar historial
          </button>
          {submissions.length === 0 ? (
            <div className="text-gray-400 mt-2 font-mono">Aún no has enviado ninguna solución.</div>
          ) : (
            <ul className="mt-2 space-y-2">
              {submissions.map((s, i) => (
                <li key={i} className="bg-[#232b36]/80 rounded p-3 border-l-4 font-mono animate-fade-in-up" style={{ borderColor: s.status === 'success' ? ACCENT : '#ff3b3b' }}>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                    <span>{s.date.toLocaleString()}</span>
                    <span className="ml-2">{s.language}</span>
                    <span className={`ml-2 font-bold ${s.status === 'success' ? 'text-green-400' : 'text-red-400'}`}>{s.status === 'success' ? 'Éxito' : 'Error'}</span>
                  </div>
                  <pre className="text-xs text-white bg-transparent whitespace-pre-wrap break-words max-h-24 overflow-auto font-mono">{s.code.length > 120 ? s.code.slice(0, 120) + '...' : s.code}</pre>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          className={`w-full py-3 rounded-lg font-bold text-lg transition mt-2 ${timeLeft > 0 ? 'bg-[#00f7fa] text-black hover:bg-cyan-400 animate-glow' : 'bg-gray-700 text-white cursor-not-allowed'}`}
          onClick={handleSubmit}
          disabled={timeLeft <= 0}
        >
          Enviar solución
        </button>
      </div>
    </div>
  );
};

export default GulagDetail; 