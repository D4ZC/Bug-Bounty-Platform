import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Simulación de datos gulagData (importar de un archivo real en producción)
const gulagData = [
  {
    id: 1,
    titulo: 'Desafío SQL Injection',
    descripcion: 'Encuentra y explota una vulnerabilidad de SQL Injection en la aplicación demo.',
    reglas: [
      'No ataques fuera del entorno proporcionado.',
      'No compartas soluciones públicamente.',
      'El reto debe completarse en el tiempo asignado.'
    ],
    archivos: [
      { nombre: 'database.sql', url: 'https://example.com/database.sql' },
      { nombre: 'app.js', url: 'https://example.com/app.js' }
    ],
    lenguaje: 'JavaScript',
    status: 'active',
    tiempo: 9000, // segundos
    puntos: 100,
    dificultad: 'medio',
    categorias: ['seguridad', 'backend'],
    intentos: 0,
    fecha: '2024-07-18',
    creador: 'Admin',
  },
  {
    id: 2,
    titulo: 'Desafío de Backend API',
    descripcion: 'Implementa una API REST que devuelva los usuarios activos. La API debe exponer un endpoint GET /users que retorne solo los usuarios con status "active".',
    reglas: [
      'No uses frameworks externos.',
      'La respuesta debe ser en formato JSON.',
      'Incluye pruebas unitarias.'
    ],
    archivos: [
      { nombre: 'users.json', url: 'https://example.com/users.json' }
    ],
    lenguaje: 'Python',
    status: 'active',
    tiempo: 7200,
    puntos: 80,
    dificultad: 'medio',
    categorias: ['backend', 'api'],
    intentos: 0,
    fecha: '2024-07-18',
    creador: 'Admin',
  },
  {
    id: 3,
    titulo: 'Desafío de Frontend',
    descripcion: 'Crea una interfaz web que consuma una API y muestre los resultados en una tabla responsiva. Debe permitir filtrar y buscar por nombre.',
    reglas: [
      'No uses librerías externas para tablas.',
      'El diseño debe ser responsivo.',
      'Incluye validaciones de entrada.'
    ],
    archivos: [
      { nombre: 'api_spec.pdf', url: 'https://example.com/api_spec.pdf' }
    ],
    lenguaje: 'JavaScript',
    status: 'active',
    tiempo: 5400,
    puntos: 60,
    dificultad: 'fácil',
    categorias: ['frontend', 'web'],
    intentos: 0,
    fecha: '2024-07-18',
    creador: 'Admin',
  },
  {
    id: 4,
    titulo: 'Desafío de Algoritmos',
    descripcion: 'Resuelve el problema de encontrar el camino más corto en un grafo dirigido usando Dijkstra. Debes retornar la distancia mínima entre dos nodos dados.',
    reglas: [
      'Solo puedes usar estructuras de datos básicas.',
      'El algoritmo debe ser eficiente.',
      'Incluye casos de prueba.'
    ],
    archivos: [
      { nombre: 'grafo.png', url: 'https://example.com/grafo.png' }
    ],
    lenguaje: 'Python',
    status: 'active',
    tiempo: 6000,
    puntos: 120,
    dificultad: 'difícil',
    categorias: ['algoritmos', 'grafos'],
    intentos: 0,
    fecha: '2024-07-18',
    creador: 'Admin',
  },
];

const getUserScore = () => parseInt(localStorage.getItem('userScore') || '0', 10);
const setUserScore = (score: number) => localStorage.setItem('userScore', String(score));

const GulagDesafio: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const desafio = gulagData.find(d => String(d.id) === String(id));
  const [tiempoRestante, setTiempoRestante] = useState(desafio ? desafio.tiempo : 0);
  const [solucion, setSolucion] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');
  const [bloqueado, setBloqueado] = useState(false);
  const [historial, setHistorial] = useState<string[]>(() => {
    const prev = localStorage.getItem(`historial_desafio_${id}`);
    return prev ? JSON.parse(prev) : [];
  });
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!desafio) return;
    if (desafio.status !== 'active') {
      setError('Este desafío no está disponible.');
      setBloqueado(true);
      return;
    }
    if (tiempoRestante <= 0) {
      setBloqueado(true);
      setError('Tiempo agotado. No puedes enviar más soluciones.');
      return;
    }
    timerRef.current = setInterval(() => {
      setTiempoRestante(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setBloqueado(true);
          setError('Tiempo agotado. No puedes enviar más soluciones.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [desafio]);

  const handleCopy = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
      document.execCommand('copy');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bloqueado) return;
    if (!solucion.trim()) {
      setError('Debes ingresar una solución.');
      return;
    }
    // Guardar solución en historial
    const nuevoHistorial = [solucion, ...historial];
    setHistorial(nuevoHistorial);
    localStorage.setItem(`historial_desafio_${id}`, JSON.stringify(nuevoHistorial));
    // Guardar última solución
    localStorage.setItem(`solucion_desafio_${id}`, solucion);
    // Actualizar puntos
    const prevScore = getUserScore();
    setUserScore(prevScore + (desafio?.puntos || 0));
    setEnviado(true);
    setError('');
    setSolucion('');
  };

  const handleLimpiarHistorial = () => {
    setHistorial([]);
    localStorage.removeItem(`historial_desafio_${id}`);
  };

  if (!desafio) {
    return <div className="p-8 text-center text-red-600 font-bold">Desafío no encontrado.</div>;
  }

  // Colores del sistema
  const cyan = '#00FFF7';
  const dark = '#181C23';
  const border = 'border-cyan-400';

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 rounded-2xl shadow-2xl bg-white border border-gray-200">
      <button onClick={() => navigate('/gulag')} className="mb-4 text-blue-600 hover:underline">&larr; Volver a GULAG</button>
      <h1 className="text-3xl font-bold mb-2 text-blue-700">{desafio.titulo}</h1>
      <div className="mb-2 text-gray-800">{desafio.descripcion}</div>
      <div className="mb-2">
        <span className="font-bold text-blue-600">Reglas:</span>
        <ul className="list-disc ml-6 text-gray-700">
          {desafio.reglas.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
      </div>
      <div className="mb-2">
        <span className="font-bold text-blue-600">Archivos:</span>
        <ul className="ml-6">
          {desafio.archivos.map((a, i) => (
            <li key={i}><a href={a.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{a.nombre}</a></li>
          ))}
        </ul>
      </div>
      <div className="mb-2">
        <span className="font-bold text-blue-600">Tiempo restante:</span> <span className="font-mono text-lg text-blue-700">{Math.floor(tiempoRestante/60)}m {(tiempoRestante%60).toString().padStart(2,'0')}s</span>
        <div className="w-full h-3 bg-blue-100 rounded-full mt-1 mb-2">
          <div style={{ width: `${(tiempoRestante/(desafio.tiempo))*100}%` }} className="h-3 rounded-full transition-all duration-300 bg-blue-400" />
        </div>
      </div>
      <div className="mb-2">
        <label className="font-bold text-blue-600">Lenguaje:</label>
        <select className="ml-2 bg-white border border-blue-300 text-blue-700 rounded px-2 py-1" value={desafio.lenguaje} disabled>
          <option>{desafio.lenguaje}</option>
        </select>
      </div>
      <div className="mb-2">
        <label className="font-bold text-blue-600">Editor de código:</label>
        <button type="button" onClick={handleCopy} className="ml-2 px-2 py-1 bg-blue-200 text-blue-800 rounded text-xs font-bold hover:bg-blue-300">Copiar código</button>
        <textarea
          ref={textareaRef}
          className="w-full min-h-[120px] border-2 border-blue-300 rounded p-2 mt-2 bg-white text-gray-800 font-mono"
          value={solucion}
          onChange={e => setSolucion(e.target.value)}
          disabled={bloqueado || enviado}
          placeholder="// Escribe tu payload aquí"
        />
      </div>
      <div className="mb-2">
        <span className="font-bold text-blue-600">Historial de envíos:</span>
        <button type="button" onClick={handleLimpiarHistorial} className="ml-2 px-2 py-1 bg-blue-200 text-blue-800 rounded text-xs font-bold hover:bg-blue-300">Limpiar historial</button>
        <div className="mt-1 text-blue-700 text-xs">
          {historial.length === 0 ? 'Aún no has enviado ninguna solución.' : (
            <ul className="list-decimal ml-6">
              {historial.map((h, i) => <li key={i}><pre className="whitespace-pre-wrap text-gray-800">{h}</pre></li>)}
            </ul>
          )}
        </div>
      </div>
      {error && <div className="mb-4 text-red-600 font-bold">{error}</div>}
      <form onSubmit={handleSubmit} className="mb-4">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-3 rounded font-bold text-lg hover:bg-blue-700 disabled:opacity-50 mt-2"
          disabled={bloqueado || enviado}
        >
          {enviado ? '¡Solución enviada!' : 'Enviar solución'}
        </button>
      </form>
      {enviado && (
        <div className="p-4 bg-green-100 text-green-800 rounded font-bold mb-2">
          ¡Solución enviada! Has ganado {desafio.puntos} puntos.<br />
          Tu puntaje total: {getUserScore()}
        </div>
      )}
    </div>
  );
};

export default GulagDesafio; 