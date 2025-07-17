import React, { useState } from 'react';

// Datos ficticios del GULAG
const gulagData = [
  { name: 'deivid', score: 50, status: 'active', timeLeft: '2h30' },
  { name: 'runrun', score: 25, status: 'active', timeLeft: '1h45' },
  { name: 'excel', score: 20, status: 'active', timeLeft: '3h15' },
  { name: 'kick ass', score: 20, status: 'completed', timeLeft: '0h 0' },
  { name: 'pedrito sola', score: 10, status: 'waiting', timeLeft: '5h20' },
];

const Gulag: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'completed' | 'waiting'>('all');

  const filteredData = gulagData.filter(item => {
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
                  <span className="text-sm font-bold text-gray-800">{participant.timeLeft}</span>
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
              <button className={`w-full mt-4 py-2 rounded-lg font-semibold transition-colors ${
                participant.status === 'active' 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : participant.status === 'completed'
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-yellow-500 text-white hover:bg-yellow-600'
              }`}>
                {participant.status === 'active' ? 'VER DESAFÍO' :
                 participant.status === 'completed' ? 'VER RESULTADO' :
                 'ESPERAR'}
              </button>
            </div>
          ))}
        </div>

        {/* Estadísticas */}
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
      </div>
    </div>
  );
};

export default Gulag; 