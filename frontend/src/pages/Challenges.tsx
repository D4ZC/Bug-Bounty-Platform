import React, { useState } from 'react';
import { FaGem, FaTrophy, FaUsers, FaSyncAlt, FaCheckCircle, FaTimesCircle, FaSearch, FaFire, FaExchangeAlt } from 'react-icons/fa';
import { GiCrossedSwords } from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion';

// Tabs de tipo de duelo
const duelTypes = [
  { key: '1v1', label: 'Duelos 1 vs 1', icon: <GiCrossedSwords /> },
  { key: 'equipos', label: 'Duelos de equipos', icon: <FaUsers /> },
];

// Categorías de duelo
const duelCategories = [
  { key: '50', label: '50 pts', points: 50 },
  { key: '100', label: '100 pts', points: 100 },
  { key: '500', label: '500 pts', points: 500 },
  { key: '1000', label: '1000 pts', points: 1000 },
];

// Mock de usuario
const mockUser = {
  id: 1,
  name: 'Juan Pérez',
  points: 1200,
  streak: 3, // Cambia a 3 para ver bonificación
  isTeamRep: false, // Cambia a true para probar como representante de equipo
  duels: [
    { id: 1, category: 100, type: 'usuario', status: 'ganado', date: '2024-06-10', userVulns: 3, rivalVulns: 2 },
    { id: 2, category: 500, type: 'equipo', status: 'perdido', date: '2024-06-08', userVulns: 1, rivalVulns: 2 },
    { id: 3, category: 50, type: 'usuario', status: 'ganado', date: '2024-06-05', userVulns: 2, rivalVulns: 1 },
    { id: 4, category: 1000, type: 'equipo', status: 'activo', date: '2024-06-12', userVulns: 0, rivalVulns: 0 },
    { id: 5, category: 100, type: 'usuario', status: 'ganado', date: '2024-06-03', userVulns: 4, rivalVulns: 2 },
  ],
};

const Challenges: React.FC = () => {
  const [user, setUser] = useState(mockUser);
  const [searching, setSearching] = useState<string | null>(null);
  const [matchFound, setMatchFound] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('50');
  const [duelType, setDuelType] = useState<'1v1' | 'equipos'>('1v1');
  const [selectedDuel, setSelectedDuel] = useState<any>(null);
  // Elimina isModalOpen

  // Buscar duelo (mock emparejamiento)
  const handleSearch = (cat: string) => {
    setSearching(cat);
    setTimeout(() => {
      setSearching(null);
      setMatchFound(cat);
      setTimeout(() => setMatchFound(null), 2000);
    }, 1800);
  };

  // Filtrar duelos por categoría y tipo
  const duelsByCategory = user.duels.filter(d => d.category.toString() === activeTab && (duelType === '1v1' ? d.type === 'usuario' : d.type === 'equipo'));

  // Bonificación por racha
  const hasStreak = user.streak >= 3;

  // Lógica de permisos para buscar duelo
  const canSearch = duelType === '1v1' || (duelType === 'equipos' && user.isTeamRep);
  const searchMsg = duelType === 'equipos' && !user.isTeamRep ? 'Solo representantes de equipo pueden buscar duelos de equipos.' : '';

  // Mock participantes con marcos
  const getParticipants = (duel: any) => {
    if (duel.type === 'usuario') {
      return [
        { name: user.name, avatar: '/avatars/prueba.png', vulns: duel.userVulns, frame: '/marcos/marco1.png' },
        { name: 'Anónimo', avatar: '/avatars/cat.gif', vulns: duel.rivalVulns, frame: '/marcos/marco2.png' },
      ];
    } else {
      return [
        { name: 'Equipo Alpha', avatar: '/avatars/poro_avatar.webp', vulns: duel.userVulns, frame: '/marcos/marco1.png' },
        { name: 'Equipo Beta', avatar: '/avatars/teemo.webp', vulns: duel.rivalVulns, frame: '/marcos/marco2.png' },
      ];
    }
  };

  // Al seleccionar duelo, abre modal
  const openDuelModal = (duel: any) => {
    setSelectedDuel(duel);
  };
  // Al cerrar, desmonta inmediatamente
  const closeDuelModal = () => setSelectedDuel(null);

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-10 px-2 relative bg-gradient-to-br from-[#181c24] via-[#23273a] to-[#181c24]">
      <div className="w-full max-w-4xl mx-auto bg-[#181c24]/90 rounded-2xl shadow-2xl border border-cyan-900/40 p-8 flex flex-col gap-8 relative">
        {/* Header y saldo */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <FaGem className="text-3xl text-cyan-400" />
            <h1 className="text-3xl font-extrabold text-cyan-300 tracking-wide drop-shadow-lg">Duelos</h1>
            {hasStreak && (
              <span className="ml-3 px-3 py-1 bg-orange-900 text-orange-200 rounded-full font-bold flex items-center gap-2 animate-flame-glow">
                <FaFire className="text-orange-400 animate-flame" /> Racha +20 pts
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 bg-gray-900/80 px-4 py-2 rounded-xl shadow border border-cyan-700">
            <FaGem className="text-cyan-400 text-xl" />
            <span className="text-lg font-bold text-cyan-200">{user.points} pts</span>
          </div>
        </div>
        {/* Tabs de tipo de duelo */}
        <div className="flex flex-row gap-2 mb-4">
          {duelTypes.map(tab => (
            <button
              key={tab.key}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all border-2 text-base
                ${duelType === tab.key ? 'bg-gradient-to-r from-cyan-400 to-fuchsia-600 text-white border-fuchsia-400' : 'bg-gray-800/80 text-cyan-300 border-gray-600 hover:bg-cyan-900/40'}`}
              onClick={() => setDuelType(tab.key as '1v1' | 'equipos')}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
        {/* Tabs de categorías */}
        <div className="flex flex-row gap-2 mb-8">
          {duelCategories.map(tab => (
            <button
              key={tab.key}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all border-2 text-base
                ${activeTab === tab.key ? 'bg-gradient-to-r from-cyan-400 to-fuchsia-600 text-white border-fuchsia-400' : 'bg-gray-800/80 text-cyan-300 border-gray-600 hover:bg-cyan-900/40'}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <FaGem /> {tab.label}
            </button>
          ))}
        </div>
        {/* Buscar duelo */}
        <div className="flex flex-col items-center mb-8">
          <motion.button
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold shadow-lg border-2 text-lg transition-all
              ${'bg-gradient-to-r from-cyan-400 to-fuchsia-600 text-white border-fuchsia-400 hover:scale-105'}`}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSearch(activeTab)}
            disabled={!!searching || !canSearch}
          >
            {searching === activeTab ? (
              <FaSyncAlt className="animate-spin" />
            ) : (
              <FaSearch />
            )}
            {searching === activeTab ? 'Buscando duelo...' : 'Buscar duelo'}
          </motion.button>
          {searchMsg && <div className="mt-2 text-yellow-300 font-bold text-sm">{searchMsg}</div>}
          <AnimatePresence>
            {matchFound === activeTab && (
              <motion.div
                className="mt-4 px-6 py-3 bg-green-700 text-white rounded-xl shadow-lg font-bold animate-fadeIn flex items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <FaCheckCircle className="text-green-300" /> ¡Emparejamiento encontrado!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Lista de duelos activos y pasados */}
        <div className="w-full">
          <h2 className="text-xl font-bold text-cyan-200 mb-4 flex items-center gap-2">
            <FaUsers className="text-cyan-400" /> {duelType === '1v1' ? 'Duelos 1 vs 1' : 'Duelos de equipos'} en categoría {activeTab} pts
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {duelsByCategory.length === 0 && (
              <div className="text-gray-400 text-center">No tienes duelos en esta categoría.</div>
            )}
            {duelsByCategory.map(duel => (
              <motion.div
                key={duel.id}
                className={`bg-[#23273a] rounded-xl border-2 border-cyan-800 shadow-lg p-4 flex flex-col md:flex-row items-center gap-4 animate-fadeIn cursor-pointer`}
                whileHover={{ scale: 1.02, boxShadow: '0 0 16px 2px #00bcd4cc' }}
                onClick={() => openDuelModal(duel)}
              >
                <div className="flex flex-col items-center md:items-start flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {duel.type === 'usuario' ? <GiCrossedSwords className="text-cyan-400" /> : <FaUsers className="text-yellow-400" />}
                    <span className="font-bold text-cyan-200">{duel.type === 'usuario' ? 'Duelo 1v1' : 'Duelo de equipos'}</span>
                  </div>
                  <div className="text-gray-400 text-sm mb-1">{duel.date}</div>
                  <div className="text-cyan-300 font-mono text-xs">Vulnerabilidades: <span className="font-bold">{duel.userVulns}</span> vs <span className="font-bold">{duel.rivalVulns}</span></div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-lg font-bold text-yellow-300">{duel.category} pts</span>
                  <span className={`text-base font-bold ${duel.status === 'ganado' ? 'text-green-400' : duel.status === 'perdido' ? 'text-red-400' : 'text-cyan-300'}`}>{duel.status === 'ganado' ? 'Ganado' : duel.status === 'perdido' ? 'Perdido' : 'Activo'}</span>
                  {duel.status === 'ganado' && <FaTrophy className="text-yellow-400 text-xl" />}
                  {duel.status === 'perdido' && <FaTimesCircle className="text-red-400 text-xl" />}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Modal de detalles de duelo */}
        <AnimatePresence>
          {selectedDuel && (
            <motion.div
              key={selectedDuel.id}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={e => {
                if (e.target === e.currentTarget) setSelectedDuel(null);
              }}
            >
              <motion.div
                className="bg-[#181c24] border-2 border-cyan-400 rounded-2xl p-8 min-w-[320px] max-w-lg flex flex-col items-center gap-4 relative animate-fadeIn"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={e => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold text-cyan-300 mb-2 flex items-center gap-2">
                  {selectedDuel.type === 'usuario' ? <GiCrossedSwords className="text-cyan-400" /> : <FaUsers className="text-yellow-400" />}
                  {selectedDuel.type === 'usuario' ? 'Duelo 1v1' : 'Duelo de equipos'}
                </h3>
                <div className="text-gray-400 text-sm mb-1">{selectedDuel.date}</div>
                <div className="flex flex-row gap-6 items-center mb-4">
                  {getParticipants(selectedDuel).map((p, i) => (
                    <div key={i} className="flex flex-col items-center relative">
                      <div className="relative w-24 h-24 flex items-center justify-center">
                        <img src={p.avatar} alt={p.name} className="w-18 h-18 rounded-full object-cover z-10" style={{ width: 72, height: 72 }} />
                        <img src={p.frame} alt="marco" className="absolute top-1/2 left-1/2 w-24 h-24 pointer-events-none select-none" style={{ zIndex: 20, objectFit: 'contain', transform: 'translate(-50%, -50%)' }} />
                      </div>
                      <span className="text-cyan-200 font-bold text-base text-center max-w-[100px] truncate mt-2">{p.name}</span>
                      <span className="text-cyan-400 text-sm">{p.vulns} vulns</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-row gap-8 mb-2">
                  <div className="flex flex-col items-center">
                    <span className="text-yellow-300 font-bold text-lg">{selectedDuel.category} pts</span>
                    <span className={`text-base font-bold ${selectedDuel.status === 'ganado' ? 'text-green-400' : selectedDuel.status === 'perdido' ? 'text-red-400' : 'text-cyan-300'}`}>{selectedDuel.status === 'ganado' ? 'Ganado' : selectedDuel.status === 'perdido' ? 'Perdido' : 'Activo'}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-cyan-300 font-mono text-xs">Vulnerabilidades</span>
                    <span className="text-cyan-200 font-bold text-lg">{selectedDuel.userVulns} vs {selectedDuel.rivalVulns}</span>
                  </div>
                </div>
                {selectedDuel.status === 'ganado' && (
                  <div className="bg-green-800/80 text-green-200 rounded-xl px-4 py-2 font-bold text-center flex flex-col items-center gap-1 mb-2">
                    ¡Felicidades! Has ganado este duelo.
                    {hasStreak && <span className="text-yellow-300 font-bold">Bonificación de racha: +20 pts</span>}
                  </div>
                )}
                <button className="mt-2 px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-bold shadow transition" onClick={() => setSelectedDuel(null)}>Cerrar</button>
                <button className="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700" onClick={() => setSelectedDuel(null)}>✕</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <style>{`
        @keyframes flame {
          0%, 100% { filter: drop-shadow(0 0 8px #ff9800cc) brightness(1.1); }
          50% { filter: drop-shadow(0 0 16px #ff9800) brightness(1.3); }
        }
        .animate-flame { animation: flame 1.2s infinite alternate; }
        @keyframes flameGlow {
          0%, 100% { box-shadow: 0 0 8px 2px #ff9800cc; }
          50% { box-shadow: 0 0 24px 8px #ff9800cc; }
        }
        .animate-flame-glow { animation: flameGlow 1.2s infinite alternate; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fadeIn { animation: fadeIn 0.5s cubic-bezier(.4,0,.2,1) both; }
      `}</style>
    </div>
  );
};

export default Challenges; 