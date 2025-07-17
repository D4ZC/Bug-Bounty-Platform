import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ACCENT_PURPLE = '#a259f7';
const DARK_BG = '#181A1A';
const PANEL_BG = '#23263a';

const dummyChallenge = {
  id: '1',
  title: 'Desafío SQL Injection',
  description: 'Encuentra y explota la vulnerabilidad de SQL Injection en la aplicación de ejemplo.',
  rules: [
    'No ataques servicios externos.',
    'Solo se permite un intento por usuario.',
    'El reto termina cuando se envía una solución válida o se acaba el tiempo.',
  ],
  files: [
    { name: 'app-demo.zip', url: '#' },
  ],
  timeLeft: '2h 30m',
  points: 50,
};

const parseTime = (str: string) => {
  // Formato esperado: '2h 30m' o '1h 45m'
  const match = str.match(/(\d+)h\s*(\d+)m/);
  if (!match) return 0;
  return parseInt(match[1], 10) * 60 * 60 + parseInt(match[2], 10) * 60;
};

const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
};

const Modal: React.FC<{ open: boolean; onClose: () => void; title: string; message: string }> = ({ open, onClose, title, message }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-[#23263a] rounded-2xl shadow-lg p-8 max-w-md w-full flex flex-col items-center border-2 border-purple-500">
        <h2 className="text-2xl font-bold text-red-400 mb-2 text-center">{title}</h2>
        <p className="text-gray-200 mb-6 text-center">{message}</p>
        <button
          className="px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold shadow"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

const getUserPoints = () => {
  const points = localStorage.getItem('userPoints');
  return points ? parseInt(points, 10) : 0;
};
const setUserPoints = (pts: number) => {
  localStorage.setItem('userPoints', pts.toString());
};

const GulagDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Aquí se podría hacer fetch de los datos reales usando el id
  const challenge = dummyChallenge; // Simulación

  // Temporizador en tiempo real
  const [secondsLeft, setSecondsLeft] = useState(parseTime(challenge.timeLeft));
  const [modal, setModal] = useState<{ open: boolean; title: string; message: string }>({ open: false, title: '', message: '' });
  const [completed, setCompleted] = useState(false);
  const [userPoints, setUserPointsState] = useState(getUserPoints());

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  useEffect(() => {
    if (secondsLeft === 0) {
      setModal({
        open: true,
        title: 'Tiempo agotado',
        message: 'El tiempo para resolver este desafío ha finalizado. Ya no puedes enviar una solución.',
      });
    }
  }, [secondsLeft]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (completed || secondsLeft === 0) return;
    // Simular envío exitoso
    const newPoints = userPoints + challenge.points;
    setUserPoints(newPoints);
    setUserPointsState(newPoints);
    setCompleted(true);
    setModal({
      open: true,
      title: '¡Desafío completado!',
      message: `¡Felicidades! Has ganado ${challenge.points} puntos. Tu nuevo total es ${newPoints} puntos.`,
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center px-2 py-8" style={{ background: DARK_BG }}>
      <Modal open={modal.open} onClose={() => setModal({ ...modal, open: false })} title={modal.title} message={modal.message} />
      <div className="w-full max-w-3xl bg-[#23263a] rounded-2xl shadow-lg p-8 flex flex-col gap-6">
        {/* Título y puntos */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <h1 className="text-3xl font-extrabold text-white">{challenge.title}</h1>
          <span className="text-lg font-bold text-purple-300">Puntos: {challenge.points}</span>
        </div>
        {/* Puntos del usuario */}
        <div className="flex items-center gap-3 mb-2">
          <span className="text-gray-300 font-semibold">Tus puntos:</span>
          <span className="font-bold text-white text-lg bg-[#181A1A] px-4 py-1 rounded-lg border border-purple-400" style={{ color: ACCENT_PURPLE }}>{userPoints}</span>
        </div>
        {/* Temporizador */}
        <div className="flex items-center gap-3">
          <span className="text-gray-300 font-semibold">Tiempo restante:</span>
          <span className="font-bold text-white text-lg bg-[#181A1A] px-4 py-1 rounded-lg border border-purple-400" style={{ color: ACCENT_PURPLE }}>{formatTime(secondsLeft)}</span>
        </div>
        {/* Descripción */}
        <div>
          <h2 className="text-xl font-bold text-purple-300 mb-2">Descripción</h2>
          <p className="text-gray-200 text-base">{challenge.description}</p>
        </div>
        {/* Reglas */}
        <div>
          <h2 className="text-xl font-bold text-purple-300 mb-2">Reglas</h2>
          <ul className="list-disc pl-6 text-gray-300">
            {challenge.rules.map((rule, idx) => (
              <li key={idx}>{rule}</li>
            ))}
          </ul>
        </div>
        {/* Archivos descargables */}
        <div>
          <h2 className="text-xl font-bold text-purple-300 mb-2">Archivos</h2>
          <ul className="pl-2">
            {challenge.files.map((file, idx) => (
              <li key={idx}>
                <a href={file.url} className="text-purple-400 underline hover:text-purple-200 font-bold" download>{file.name}</a>
              </li>
            ))}
          </ul>
        </div>
        {/* Editor de código (placeholder) */}
        <div>
          <h2 className="text-xl font-bold text-purple-300 mb-2">Editor de Código</h2>
          <div className="w-full h-40 bg-[#181A1A] rounded-lg border border-gray-700 flex items-center justify-center text-gray-500 italic">
            [Editor de código aquí]
          </div>
        </div>
        {/* Área para someter solución */}
        <div>
          <h2 className="text-xl font-bold text-purple-300 mb-2">Someter Solución</h2>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <textarea className="w-full h-24 rounded-lg border border-gray-700 bg-[#181A1A] text-white p-2" placeholder="Explica tu solución o pega el payload..." disabled={secondsLeft === 0 || completed}></textarea>
            <button type="submit" className="w-full py-2 rounded-lg font-bold text-white bg-purple-600 hover:bg-purple-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed" disabled={secondsLeft === 0 || completed}>{completed ? 'Completado' : 'Enviar Solución'}</button>
          </form>
        </div>
        {/* Botón volver */}
        <button onClick={() => navigate(-1)} className="mt-4 text-purple-400 hover:underline">&larr; Volver al Gulag</button>
      </div>
    </div>
  );
};

export default GulagDetail; 