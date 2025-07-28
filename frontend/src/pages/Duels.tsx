import React, { useState } from 'react';
import { Tile } from '@carbon/react';
import { User, UserMultiple } from '@carbon/icons-react';

interface Duel {
  id: string;
  type: 'individual' | 'team';
  betAmount: number;
  participants: string[];
  status: 'waiting' | 'active' | 'completed';
  createdAt: string;
  createdBy: string;
  maxParticipants: number;
}

const Duels: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'individual' | 'team'>('individual');
  const [selectedBet, setSelectedBet] = useState<number>(25);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedDuel, setSelectedDuel] = useState<Duel | null>(null);
  const [duels, setDuels] = useState<Duel[]>([
    {
      id: '1',
      type: 'individual',
      betAmount: 25,
      participants: ['Solaire of Astora'],
      status: 'waiting',
      createdAt: '2024-01-15T10:30:00Z',
      createdBy: 'Solaire of Astora',
      maxParticipants: 2
    },
    {
      id: '2',
      type: 'team',
      betAmount: 50,
      participants: ['Rosaria\'s Fingers', 'Quelaag\'s Sister'],
      status: 'waiting',
      createdAt: '2024-01-15T11:00:00Z',
      createdBy: 'Rosaria\'s Fingers',
      maxParticipants: 4
    },
    {
      id: '3',
      type: 'individual',
      betAmount: 75,
      participants: ['Artorias the Abysswalker'],
      status: 'active',
      createdAt: '2024-01-15T09:15:00Z',
      createdBy: 'Artorias the Abysswalker',
      maxParticipants: 2
    },
    {
      id: '4',
      type: 'team',
      betAmount: 100,
      participants: ['Darkwraiths', 'Sunlight Warriors'],
      status: 'completed',
      createdAt: '2024-01-14T16:45:00Z',
      createdBy: 'Darkwraiths',
      maxParticipants: 4
    }
  ]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const betOptions = [25, 50, 75, 100];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting':
        return 'bg-yellow-600 text-yellow-100';
      case 'active':
        return 'bg-green-600 text-green-100';
      case 'completed':
        return 'bg-gray-600 text-gray-100';
      default:
        return 'bg-gray-600 text-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'waiting':
        return 'Esperando';
      case 'active':
        return 'En Progreso';
      case 'completed':
        return 'Completado';
      default:
        return 'Desconocido';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'individual' ? <User size={20} /> : <UserMultiple size={20} />;
  };

  const getTypeText = (type: string) => {
    return type === 'individual' ? 'Individual' : 'Equipo';
  };

  const handleCreateDuel = () => {
    const newDuel: Duel = {
      id: Date.now().toString(),
      type: selectedType,
      betAmount: selectedBet,
      participants: ['Tu Usuario'], // El creador se une automáticamente
      status: 'waiting',
      createdAt: new Date().toISOString(),
      createdBy: 'Tu Usuario',
      maxParticipants: selectedType === 'individual' ? 2 : 4
    };

    setDuels(prevDuels => [newDuel, ...prevDuels]);
    setShowCreateModal(false);
    setSuccessMessage(`¡Duelo ${selectedType === 'individual' ? 'individual' : 'en equipo'} creado exitosamente con apuesta de ${selectedBet} puntos!`);
    setShowSuccessMessage(true);
    
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleJoinDuel = (duel: Duel) => {
    setSelectedDuel(duel);
    setShowJoinModal(true);
  };

  const confirmJoinDuel = () => {
    if (!selectedDuel) return;

    // Verificar si el duelo está lleno
    if (selectedDuel.participants.length >= selectedDuel.maxParticipants) {
      setSuccessMessage('❌ Este duelo ya está lleno');
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
      setShowJoinModal(false);
      setSelectedDuel(null);
      return;
    }

    // Unirse al duelo
    const updatedDuels = duels.map(duel => {
      if (duel.id === selectedDuel.id) {
        return {
          ...duel,
          participants: [...duel.participants, 'Tu Usuario']
        };
      }
      return duel;
    });

    setDuels(updatedDuels);
    setShowJoinModal(false);
    setSelectedDuel(null);
    setSuccessMessage(`✅ Te has unido exitosamente al duelo con apuesta de ${selectedDuel.betAmount} puntos!`);
    setShowSuccessMessage(true);
    
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const canJoinDuel = (duel: Duel) => {
    return duel.status === 'waiting' && 
           duel.participants.length < duel.maxParticipants &&
           !duel.participants.includes('Tu Usuario');
  };

  const getAvailableDuels = () => {
    return duels.filter(duel => duel.status === 'waiting');
  };

  const getMyDuels = () => {
    return duels.filter(duel => 
      duel.participants.includes('Tu Usuario') || duel.createdBy === 'Tu Usuario'
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">⚔️ Duelos</h1>
          <p className="text-gray-300 text-lg">Demuestra tu habilidad en batallas individuales o en equipo</p>
        </div>

        {/* Mensaje de éxito */}
        {showSuccessMessage && (
          <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg shadow-2xl animate-fade-in">
            {successMessage}
          </div>
        )}

        {/* Botones de acción */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Tile className="bg-gradient-to-br from-blue-900/80 to-purple-900/80 border-2 border-blue-500 rounded-2xl shadow-2xl p-8 text-center">
            <div className="text-6xl mb-4">⚔️</div>
            <h3 className="text-2xl font-bold text-white mb-4">Crear Duelo</h3>
            <p className="text-gray-300 mb-6">Organiza un nuevo duelo y espera a que otros se unan</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              Crear Duelo
            </button>
          </Tile>

          <Tile className="bg-gradient-to-br from-green-900/80 to-emerald-900/80 border-2 border-green-500 rounded-2xl shadow-2xl p-8 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold text-white mb-4">Mis Duelos</h3>
            <p className="text-gray-300 mb-6">Ve tus duelos activos y el historial de batallas</p>
            <div className="text-2xl font-bold text-white mb-2">{getMyDuels().length}</div>
            <div className="text-gray-300">Duelos Participando</div>
          </Tile>
        </div>

        {/* Lista de duelos disponibles */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Duelos Disponibles ({getAvailableDuels().length})
          </h2>
          {getAvailableDuels().length === 0 ? (
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-2 border-gray-600 rounded-2xl shadow-lg p-8 text-center">
              <div className="text-6xl mb-4">😴</div>
              <h3 className="text-xl font-bold text-white mb-2">No hay duelos disponibles</h3>
              <p className="text-gray-300">¡Sé el primero en crear un duelo!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getAvailableDuels().map((duel) => (
                <Tile key={duel.id} className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-2 border-gray-600 rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(duel.type)}
                      <span className="text-white font-semibold">{getTypeText(duel.type)}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(duel.status)}`}>
                      {getStatusText(duel.status)}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">{duel.betAmount} pts</div>
                    <div className="text-gray-300 text-sm">
                      Participantes: {duel.participants.length}/{duel.maxParticipants}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-gray-300 text-sm mb-2">Participantes:</div>
                    <div className="flex flex-wrap gap-2">
                      {duel.participants.map((participant, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-700 text-gray-200 text-xs rounded">
                          {participant}
                        </span>
                      ))}
                    </div>
                  </div>

                  {canJoinDuel(duel) ? (
                    <button
                      onClick={() => handleJoinDuel(duel)}
                      className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all"
                    >
                      Unirse
                    </button>
                  ) : (
                    <div className="w-full py-3 bg-gray-700 text-gray-400 font-semibold rounded-xl text-center">
                      {duel.participants.includes('Tu Usuario') ? 'Ya participas' : 'Lleno'}
                    </div>
                  )}
                </Tile>
              ))}
            </div>
          )}
        </div>

        {/* Mis Duelos */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Mis Duelos</h2>
          {getMyDuels().length === 0 ? (
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-2 border-gray-600 rounded-2xl shadow-lg p-8 text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-white mb-2">No tienes duelos activos</h3>
              <p className="text-gray-300">¡Crea un duelo o únete a uno para comenzar!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getMyDuels().map((duel) => (
                <Tile key={duel.id} className="bg-gradient-to-br from-purple-800/80 to-purple-900/80 border-2 border-purple-500 rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(duel.type)}
                      <span className="text-white font-semibold">{getTypeText(duel.type)}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(duel.status)}`}>
                      {getStatusText(duel.status)}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">{duel.betAmount} pts</div>
                    <div className="text-gray-300 text-sm">
                      Participantes: {duel.participants.length}/{duel.maxParticipants}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-gray-300 text-sm mb-2">Participantes:</div>
                    <div className="flex flex-wrap gap-2">
                      {duel.participants.map((participant, index) => (
                        <span key={index} className={`px-2 py-1 text-xs rounded ${
                          participant === 'Tu Usuario' 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-gray-700 text-gray-200'
                        }`}>
                          {participant}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="text-purple-300 text-sm">
                      {duel.createdBy === 'Tu Usuario' ? 'Creado por ti' : 'Participando'}
                    </span>
                  </div>
                </Tile>
              ))}
            </div>
          )}
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Tile className="bg-gradient-to-br from-red-900/80 to-red-800/80 border-2 border-red-500 rounded-2xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-2">🔥</div>
            <div className="text-2xl font-bold text-white">12</div>
            <div className="text-gray-300">Duelos Ganados</div>
          </Tile>
          
          <Tile className="bg-gradient-to-br from-blue-900/80 to-blue-800/80 border-2 border-blue-500 rounded-2xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-2">⚔️</div>
            <div className="text-2xl font-bold text-white">25</div>
            <div className="text-gray-300">Duelos Totales</div>
          </Tile>
          
          <Tile className="bg-gradient-to-br from-green-900/80 to-green-800/80 border-2 border-green-500 rounded-2xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-2">🏆</div>
            <div className="text-2xl font-bold text-white">1,250</div>
            <div className="text-gray-300">Puntos Ganados</div>
          </Tile>
          
          <Tile className="bg-gradient-to-br from-purple-900/80 to-purple-800/80 border-2 border-purple-500 rounded-2xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-white">48%</div>
            <div className="text-gray-300">Win Rate</div>
          </Tile>
        </div>
      </div>

      {/* Modal para crear duelo */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 animate-fade-in">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-blue-500 rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center">
            <div className="text-6xl mb-4">⚔️</div>
            <h3 className="text-xl font-bold mb-6 text-white">Crear Nuevo Duelo</h3>
            
            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-semibold mb-2">Tipo de Duelo</label>
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedType('individual')}
                  className={`flex-1 py-3 rounded-xl border-2 transition-all ${
                    selectedType === 'individual'
                      ? 'border-blue-500 bg-blue-600 text-white'
                      : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-blue-500'
                  }`}
                >
                  <User size={20} className="mx-auto mb-1" />
                  Individual
                </button>
                <button
                  onClick={() => setSelectedType('team')}
                  className={`flex-1 py-3 rounded-xl border-2 transition-all ${
                    selectedType === 'team'
                      ? 'border-blue-500 bg-blue-600 text-white'
                      : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-blue-500'
                  }`}
                >
                  <UserMultiple size={20} className="mx-auto mb-1" />
                  Equipo
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-semibold mb-2">Apuesta (Puntos)</label>
              <div className="grid grid-cols-2 gap-2">
                {betOptions.map((bet) => (
                  <button
                    key={bet}
                    onClick={() => setSelectedBet(bet)}
                    className={`py-3 rounded-xl border-2 transition-all ${
                      selectedBet === bet
                        ? 'border-yellow-500 bg-yellow-600 text-white'
                        : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-yellow-500'
                    }`}
                  >
                    {bet} pts
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-3 bg-gray-700 text-gray-200 rounded-xl hover:bg-gray-600 transition font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateDuel}
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition font-semibold"
              >
                Crear Duelo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para unirse a duelo */}
      {showJoinModal && selectedDuel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 animate-fade-in">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-green-500 rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-xl font-bold mb-6 text-white">Unirse al Duelo</h3>
            
            <div className="mb-6 text-left">
              <div className="mb-4">
                <span className="text-gray-300">Tipo: </span>
                <span className="text-white font-semibold">{getTypeText(selectedDuel.type)}</span>
              </div>
              <div className="mb-4">
                <span className="text-gray-300">Apuesta: </span>
                <span className="text-yellow-400 font-bold text-xl">{selectedDuel.betAmount} puntos</span>
              </div>
              <div className="mb-4">
                <span className="text-gray-300">Participantes: </span>
                <span className="text-white">{selectedDuel.participants.join(', ')}</span>
              </div>
              <div className="mb-4">
                <span className="text-gray-300">Espacios: </span>
                <span className="text-green-400 font-semibold">
                  {selectedDuel.maxParticipants - selectedDuel.participants.length} disponible(s)
                </span>
              </div>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-500 rounded-lg p-4 mb-6">
              <div className="text-yellow-400 font-semibold mb-2">⚠️ Confirmar Apuesta</div>
              <div className="text-gray-300 text-sm">
                Al unirte a este duelo, apostarás {selectedDuel.betAmount} puntos. 
                Si pierdes, perderás estos puntos. Si ganas, ganarás los puntos de tu oponente.
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowJoinModal(false)}
                className="flex-1 py-3 bg-gray-700 text-gray-200 rounded-xl hover:bg-gray-600 transition font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={confirmJoinDuel}
                className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition font-semibold"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Duels; 