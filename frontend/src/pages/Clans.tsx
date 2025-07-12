import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import {
  getAllClans,
  saveClanGlobal,
  updateClanGlobal,
  findClanById,
  newId as newClanId,
  findUserByUsername,
  getAchievementsByUser,
} from '../localDb';

function getLeague(points: number) {
  if (points >= 2000) return 'Diamante';
  if (points >= 1500) return 'Platino';
  if (points >= 1000) return 'Oro';
  if (points >= 500) return 'Plata';
  return 'Bronce';
}

const Clans: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [clans, setClans] = useState<any[]>(getAllClans());
  const [selectedClan, setSelectedClan] = useState<any | null>(null);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newClan, setNewClan] = useState({ name: '', description: '', logo: '' });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Actualizar clanes globales
  React.useEffect(() => {
    setClans(getAllClans());
  }, []);

  // Feedback timeout
  React.useEffect(() => {
    if (feedback) {
      const t = setTimeout(() => setFeedback(null), 3000);
      return () => clearTimeout(t);
    }
  }, [feedback]);

  // Crear clan global
  const handleCreateClan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.username) {
      setFeedback('Debes iniciar sesión para crear un clan');
      showToast('Debes iniciar sesión para crear un clan', 'error');
      return;
    }
    if (!newClan.name.trim()) {
      setFeedback('El nombre del clan es obligatorio');
      showToast('El nombre del clan es obligatorio', 'error');
      return;
    }
    setLoading(true);
    // Crear clan global
    const clan = {
      id: newClanId(),
      name: newClan.name,
      description: newClan.description,
      logo: newClan.logo || `https://api.dicebear.com/7.x/avataaars/svg?seed=${newClan.name}`,
      leader: user.username,
      members: [user.username],
      createdBy: user.username,
      createdAt: new Date().toISOString(),
    };
    saveClanGlobal(clan);
    setClans(getAllClans());
    setShowCreate(false);
    setNewClan({ name: '', description: '', logo: '' });
    setFeedback('¡Clan creado exitosamente!');
    showToast('¡Clan creado exitosamente!', 'success');
    setLoading(false);
  };

  // Unirse a clan global
  const handleJoinClan = (clanId: string) => {
    if (!user?.username) {
      setFeedback('Debes iniciar sesión para unirte a un clan');
      showToast('Debes iniciar sesión para unirte a un clan', 'error');
      return;
    }
    setLoading(true);
    const clan = findClanById(clanId);
    if (clan && !clan.members.includes(user.username)) {
      const updatedClan = { ...clan, members: [...clan.members, user.username] };
      updateClanGlobal(updatedClan);
      setClans(getAllClans());
      setSelectedClan(updatedClan);
      setFeedback('¡Te has unido al clan!');
      showToast('¡Te has unido al clan!', 'success');
    }
    setLoading(false);
  };

  // Salir de clan global
  const handleLeaveClan = (clanId: string) => {
    if (!user?.username) {
      setFeedback('Debes iniciar sesión para salir de un clan');
      showToast('Debes iniciar sesión para salir de un clan', 'error');
      return;
    }
    setLoading(true);
    const clan = findClanById(clanId);
    if (clan && clan.members.includes(user.username)) {
      const updatedClan = { ...clan, members: clan.members.filter((m: string) => m !== user.username) };
      updateClanGlobal(updatedClan);
      setClans(getAllClans());
      setSelectedClan(updatedClan);
      setFeedback('Has salido del clan');
      showToast('Has salido del clan', 'info');
    }
    setLoading(false);
  };

  const handleSelectClan = (clan: any) => {
    setSelectedClan(clan);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0026] via-[#1a0033] to-[#0f0026] text-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-10 text-center neon-text drop-shadow-cyber tracking-widest">CLANES</h1>
        <div className="flex justify-end mb-6">
          <button onClick={() => setShowCreate((v) => !v)} className="bg-gradient-to-r from-green-500 to-cyan-500 text-white font-bold px-6 py-2 rounded-full shadow-cyber hover:scale-105 transition-transform">
            {showCreate ? 'Cancelar' : 'Crear Clan'}
          </button>
        </div>
        {showCreate && (
          <form onSubmit={handleCreateClan} className="bg-black/70 border-2 border-green-400 neon-shadow rounded-2xl p-6 mb-8 flex flex-col gap-4 max-w-lg mx-auto animate-pop-in">
            <input type="text" placeholder="Nombre del clan" className="p-2 rounded bg-gray-900 text-white border border-cyan-400" value={newClan.name} onChange={e => setNewClan({ ...newClan, name: e.target.value })} required disabled={loading} />
            <input type="text" placeholder="Descripción" className="p-2 rounded bg-gray-900 text-white border border-cyan-400" value={newClan.description} onChange={e => setNewClan({ ...newClan, description: e.target.value })} disabled={loading} />
            <input type="text" placeholder="URL del logo (opcional)" className="p-2 rounded bg-gray-900 text-white border border-cyan-400" value={newClan.logo} onChange={e => setNewClan({ ...newClan, logo: e.target.value })} disabled={loading} />
            <button type="submit" className="bg-gradient-to-r from-green-500 to-cyan-500 text-white font-bold px-6 py-2 rounded-full shadow-cyber hover:scale-105 transition-transform" disabled={loading}>{loading ? 'Creando...' : 'Crear'}</button>
          </form>
        )}
        {feedback && <div className="text-center text-cyan-200 mb-4">{feedback}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {clans.map((clan) => (
            <div key={clan.id} className="bg-black/70 border-2 border-green-400 neon-shadow rounded-2xl p-6 flex flex-col items-center cursor-pointer hover:scale-105 transition" onClick={() => handleSelectClan(clan)}>
              <img src={clan.logo} alt={clan.name} className="w-20 h-20 rounded-full border-2 border-green-400 mb-4 neon-shadow" />
              <div className="text-xl font-bold text-green-200 mb-2 drop-shadow-cyber">{clan.name}</div>
              <div className="text-sm text-green-100 mb-1">Miembros: <span className="font-bold">{clan.members.length}</span></div>
            </div>
          ))}
        </div>
        {/* Modal de clan */}
        {selectedClan && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center animate-fade-in">
            <div className="bg-[#181028] border-2 border-green-400 neon-shadow rounded-2xl p-8 max-w-2xl w-full relative">
              <button onClick={() => setSelectedClan(null)} className="absolute top-4 right-4 text-green-400 text-2xl font-bold hover:text-pink-400">×</button>
              <div className="flex flex-col items-center mb-6">
                <img src={selectedClan.logo} alt={selectedClan.name} className="w-24 h-24 rounded-full border-2 border-green-400 mb-2 neon-shadow" />
                <div className="text-3xl font-bold text-green-200 drop-shadow-cyber mb-1">{selectedClan.name}</div>
                <div className="text-base text-green-100 font-mono mb-2">Miembros: {selectedClan.members.length}</div>
                {user && !selectedClan.members.includes(user.username) && (
                  <button onClick={() => handleJoinClan(selectedClan.id)} className="mt-2 px-4 py-2 bg-green-700/80 border border-green-400 rounded-lg text-green-100 font-bold hover:bg-green-600 transition" disabled={loading}>
                    {loading ? 'Uniendo...' : 'Unirse al Clan'}
                  </button>
                )}
                {user && selectedClan.members.includes(user.username) && (
                  <button onClick={() => handleLeaveClan(selectedClan.id)} className="mt-2 px-4 py-2 bg-pink-700/80 border border-pink-400 rounded-lg text-pink-100 font-bold hover:bg-pink-600 transition" disabled={loading}>
                    {loading ? 'Saliendo...' : 'Salir del Clan'}
                  </button>
                )}
              </div>
              <h3 className="text-xl font-bold text-center mb-4 text-pink-200">Integrantes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {selectedClan.members.map((member: any, idx: number) => (
                  <div key={member + idx} className="flex flex-col items-center bg-black/70 border-2 border-cyan-400 neon-shadow rounded-xl p-4 cursor-pointer hover:scale-105 transition" onClick={() => setSelectedUser({ username: member })}>
                    <img src={`https://robohash.org/${member}?set=set2`} alt={member} className="w-16 h-16 rounded-full border-2 border-cyan-400 mb-2 neon-shadow" />
                    <div className="font-bold text-lg mb-1 text-cyan-200 drop-shadow-cyber">{member}</div>
                    <span className="text-xs text-cyan-100">Miembro</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* Modal de perfil de usuario */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center animate-fade-in">
            <div className="bg-gradient-to-br from-[#181028] via-[#1a0033] to-[#0f0026] border-2 border-cyan-400 neon-shadow rounded-2xl p-8 max-w-md w-full relative animate-pop-in">
              <button onClick={() => setSelectedUser(null)} className="absolute top-4 right-4 text-cyan-400 text-2xl font-bold hover:text-pink-400">×</button>
              {(() => {
                const userData = findUserByUsername(selectedUser.username);
                const achievements = userData ? getAchievementsByUser(userData.id) : [];
                const league = userData ? getLeague(userData.points) : 'Bronce';
                const leagueColors = {
                  'Bronce': 'bg-yellow-700 text-yellow-200 border-yellow-400',
                  'Plata': 'bg-gray-400 text-gray-900 border-gray-300',
                  'Oro': 'bg-yellow-400 text-yellow-900 border-yellow-300',
                  'Platino': 'bg-blue-300 text-blue-900 border-blue-400',
                  'Diamante': 'bg-blue-500 text-blue-100 border-blue-400',
                  'Maestro': 'bg-purple-700 text-purple-100 border-purple-400',
                };
                return userData ? (
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative mb-2">
                      <img src={`https://robohash.org/${userData.username}?set=set2`} alt={userData.username} className="w-28 h-28 rounded-full border-4 border-cyan-400 neon-shadow animate-bounce" />
                      <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full border-2 text-xs font-bold shadow-cyber ${leagueColors[league] || 'bg-gray-700 text-gray-200 border-gray-400'}`}>{league}</span>
                    </div>
                    <div className="text-3xl font-extrabold text-cyan-200 drop-shadow-cyber mb-1 tracking-widest animate-pop-in">{userData.username}</div>
                    <div className="flex gap-3 mb-3 mt-2 flex-wrap justify-center">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-900/60 border border-blue-400 rounded-full text-xs font-bold text-blue-200 shadow-cyber"><span>💎</span> {userData.points} pts</span>
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-900/60 border border-green-400 rounded-full text-xs font-bold text-green-200 shadow-cyber"><span>🎯</span> Precisión: {userData.accuracy || 0}%</span>
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-900/60 border border-yellow-400 rounded-full text-xs font-bold text-yellow-200 shadow-cyber"><span>🔥</span> Racha: {userData.streak || 0} días</span>
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-pink-900/60 border border-pink-400 rounded-full text-xs font-bold text-pink-200 shadow-cyber"><span>📅</span> Desde: {new Date(userData.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h4 className="text-lg font-bold text-cyan-100 mt-2 mb-1">Insignias y Logros</h4>
                    <div className="flex flex-wrap gap-2 justify-center mb-2">
                      {achievements.length > 0 ? achievements.map((ach) => (
                        <span key={ach.id} title={ach.description} className="inline-block px-2 py-1 bg-cyan-700 text-cyan-100 rounded-full text-xs font-bold shadow-cyber animate-pop-in cursor-help">🏅 {ach.name}</span>
                      )) : <span className="text-xs text-cyan-300 italic">Aún no ha desbloqueado logros. ¡Motívalo a participar!</span>}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center mb-6">
                    <div className="text-2xl font-bold text-cyan-200 drop-shadow-cyber mb-1">Usuario no encontrado</div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>
      <style>{`
        .neon-text {
          color: #00fff7;
          text-shadow: 0 0 8px #00fff7, 0 0 16px #00fff7, 0 0 32px #00fff7;
        }
        .drop-shadow-cyber {
          filter: drop-shadow(0 0 8px #00fff7) drop-shadow(0 0 16px #a78bfa);
        }
        .shadow-cyber {
          box-shadow: 0 0 16px 2px #00fff7, 0 0 32px 4px #a78bfa;
        }
        .neon-shadow {
          box-shadow: 0 0 16px 2px #00fff7, 0 0 32px 4px #a78bfa, 0 0 8px #fff0;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease;
        }
        .animate-pop-in {
          animation: pop-in 0.7s cubic-bezier(.4,0,.2,1);
        }
        @keyframes pop-in {
          0% { transform: scale(0.7); opacity: 0; }
          80% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Clans; 