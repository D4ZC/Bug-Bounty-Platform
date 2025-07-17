import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Datos ficticios del GULAG
const gulagData = [
  {
    id: 1,
    titulo: 'Desafío de lógica',
    descripcion: 'Resuelve este problema de lógica básica. Debes encontrar el número que falta en la secuencia.',
    reglas: 'No uses librerías externas. Solo puedes enviar una solución por intento.',
    archivos: [
      { nombre: 'instrucciones.pdf', url: 'https://example.com/instrucciones.pdf' }
    ],
    lenguaje: 'javascript',
    status: 'active',
    tiempo: 300, // segundos
    puntos: 50,
    dificultad: 'fácil',
    categorias: ['lógica', 'secuencias'],
    intentos: 0,
    fecha: '2024-07-18',
    creador: 'Admin',
    score: 50,
    timeLeft: '2h30',
    name: 'deivid',
  },
  {
    id: 2,
    titulo: 'Desafío de backend',
    descripcion: 'Implementa una API REST que devuelva los usuarios activos.',
    reglas: 'No uses frameworks externos.',
    archivos: [
      { nombre: 'api_spec.pdf', url: 'https://example.com/api_spec.pdf' }
    ],
    lenguaje: 'python',
    status: 'active',
    tiempo: 600,
    puntos: 80,
    dificultad: 'medio',
    categorias: ['backend', 'api'],
    intentos: 0,
    fecha: '2024-07-18',
    creador: 'Admin',
    score: 25,
    timeLeft: '1h45',
    name: 'runrun',
  },
  {
    id: 3,
    titulo: 'Desafío de frontend',
    descripcion: 'Crea una interfaz que consuma una API y muestre los resultados.',
    reglas: 'No uses librerías externas.',
    archivos: [],
    lenguaje: 'javascript',
    status: 'waiting',
    tiempo: 400,
    puntos: 60,
    dificultad: 'fácil',
    categorias: ['frontend'],
    intentos: 0,
    fecha: '2024-07-18',
    creador: 'Admin',
    score: 20,
    timeLeft: '5h20',
    name: 'pedrito sola',
  },
  {
    id: 4,
    titulo: 'Desafío de algoritmos',
    descripcion: 'Resuelve el problema de encontrar el camino más corto en un grafo.',
    reglas: 'Solo puedes usar estructuras de datos básicas.',
    archivos: [
      { nombre: 'grafo.png', url: 'https://example.com/grafo.png' }
    ],
    lenguaje: 'javascript',
    status: 'completed',
    tiempo: 900,
    puntos: 100,
    dificultad: 'difícil',
    categorias: ['algoritmos', 'grafos'],
    intentos: 1,
    fecha: '2024-07-18',
    creador: 'Admin',
    score: 20,
    timeLeft: '0h 0',
    name: 'kick ass',
  },
];

const getStartTime = (id: number, tiempo: number) => {
  const key = `gulag_start_${id}`;
  let start = localStorage.getItem(key);
  if (!start) {
    const now = Date.now();
    localStorage.setItem(key, String(now));
    return now;
  }
  return parseInt(start, 10);
};

const getTiempoRestante = (id: number, tiempo: number) => {
  const start = getStartTime(id, tiempo);
  const now = Date.now();
  const diff = Math.max(0, tiempo - Math.floor((now - start) / 1000));
  return diff;
};

const Timer: React.FC<{ id: number; tiempoTotal: number; status: string; onExpire?: () => void }> = ({ id, tiempoTotal, status, onExpire }) => {
  const [tiempo, setTiempo] = useState(() => getTiempoRestante(id, tiempoTotal));
  useEffect(() => {
    if (status !== 'active') return;
    if (tiempo <= 0) {
      onExpire && onExpire();
      return;
    }
    const interval = setInterval(() => {
      setTiempo(getTiempoRestante(id, tiempoTotal));
    }, 1000);
    return () => clearInterval(interval);
  }, [tiempo, status, onExpire, id, tiempoTotal]);
  return (
    <span className="font-mono text-blue-700 font-bold">{Math.floor(tiempo/60)}m {(tiempo%60).toString().padStart(2,'0')}s</span>
  );
};

const Gulag: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'completed' | 'waiting'>('all');
  const navigate = useNavigate();
  const [cardsState, setCardsState] = useState(gulagData.map(d => ({ ...d })));

  // Actualizar estado de cards cuando el temporizador expira
  const handleExpire = (id: number) => {
    setCardsState(prev => prev.map(card => card.id === id ? { ...card, status: 'completed' } : card));
  };

  const filteredData = cardsState.filter(item => {
    if (selectedFilter === 'all') return true;
    return item.status === selectedFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-500';
      case 'completed': return 'bg-green-500';
      case 'waiting': return 'bg-yellow-500';
      default: return 'bg-gray-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'EN GULAG';
      case 'completed': return 'COMPLETADO';
      case 'waiting': return 'ESPERANDO';
      default: return 'DESCONOCIDO';
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">GULAG</h1>
          <p className="text-gray-600">Zona de desafíos y pruebas especiales</p>
        </div>

        {/* Filtros */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 bg-white rounded-lg p-2 shadow-sm">
            {[
              { key: 'all', label: 'TODOS' },
              { key: 'active', label: 'ACTIVOS' },
              { key: 'completed', label: 'COMPLETADOS' },
              { key: 'waiting', label: 'ESPERANDO' }
            ].map(filter => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key as any)}
                className={`px-4 py-2 rounded-md font-semibold transition-colors ${
                  selectedFilter === filter.key
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de participantes */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredData.map((participant, index) => (
            <div
              key={participant.name}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 shadow-md transition-shadow"
            >
              {/* Header del participante */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold">
                    {participant.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{participant.name}</h3>
                    <p className="text-sm text-gray-500">Puntuación: {participant.score}</p>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${getStatusColor(participant.status)}`} />
              </div>

              {/* Estado y tiempo */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-600">Estado:</span>
                  <span className={`text-sm font-bold px-2 rounded ${
                    participant.status === 'active' ? 'bg-red-100 text-red-700' :
                    participant.status === 'completed' ? 'bg-green-100 text-green-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {getStatusText(participant.status)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-600">Tiempo restante:</span>
                  <Timer id={participant.id} tiempoTotal={participant.tiempo} status={participant.status} onExpire={() => handleExpire(participant.id)} />
                </div>

                {/* Barra de progreso */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      participant.status === 'active' ? 'bg-red-500' :
                      participant.status === 'completed' ? 'bg-green-500' :
                      'bg-yellow-500'
                    }`}
                    style={{ 
                      width: `${participant.status === 'completed' ? 100 : 
                             participant.status === 'active' ? 60 : 20}%` 
                    }}
                  />
                </div>
              </div>

              {/* Botón de acción */}
              {participant.status === 'active' ? (
                <button
                  className="w-full mt-4 py-2 rounded-lg font-semibold transition-colors bg-red-500 text-white hover:bg-red-600"
                  onClick={() => navigate(`/gulag/desafio/${participant.id}`)}
                >
                  VER DESAFÍO
                </button>
              ) : (
                <button
                  className={`w-full mt-4 py-2 rounded-lg font-semibold transition-colors ${
                    participant.status === 'completed'
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-yellow-500 text-white hover:bg-yellow-600'
                  }`}
                  disabled
                >
                  {participant.status === 'completed' ? 'VER RESULTADO' : 'ESPERAR'}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Estadísticas */}
        {/*
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Participantes Activos</h3>
            <p className="text-3xl font-bold text-red-500">
              {gulagData.filter(p => p.status === 'active').length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Completados</h3>
            <p className="text-3xl font-bold text-green-500">
              {gulagData.filter(p => p.status === 'completed').length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Esperando</h3>
            <p className="text-3xl font-bold text-yellow-500">
              {gulagData.filter(p => p.status === 'waiting').length}
            </p>
          </div>
        </div>
        */}
      </div>
    </div>
  );
};

export default Gulag; 