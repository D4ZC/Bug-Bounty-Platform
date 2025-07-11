import React, { useState } from 'react';
import { UserAvatar, Trophy, Star } from '@carbon/icons-react';

const initialMembers = [
  { username: 'alice_smith', role: 'Team Leader', _id: 'USER001', avatar: undefined, achievements: ['first_vulnerability', 'top_10_ranking', 'mvp_winner'] },
  { username: 'cyberwarrior', role: 'Security Analyst', _id: 'USER002', avatar: undefined, achievements: ['first_vulnerability'] },
  { username: 'net_ninja', role: 'Penetration Tester', _id: 'USER003', avatar: undefined, achievements: ['first_vulnerability', 'top_10_ranking'] },
  { username: 'darksentinel', role: 'Engineer', _id: 'USER004', avatar: undefined, achievements: [] },
];

const mockUsers = [
  { username: 'hackerx', role: 'Reverse Engineer', _id: 'USER005', avatar: undefined, achievements: ['first_vulnerability'] },
  { username: 'firewall', role: 'SOC Analyst', _id: 'USER006', avatar: undefined, achievements: [] },
  { username: 'rootkit', role: 'Exploit Developer', _id: 'USER007', avatar: undefined, achievements: ['top_10_ranking'] },
  { username: 'packetqueen', role: 'Network Specialist', _id: 'USER008', avatar: undefined, achievements: [] },
  { username: 'cryptomaster', role: 'Cryptographer', _id: 'USER009', avatar: undefined, achievements: [] },
  { username: 'forensicfox', role: 'Forensic Analyst', _id: 'USER010', avatar: undefined, achievements: [] },
  { username: 'phishking', role: 'Social Engineer', _id: 'USER011', avatar: undefined, achievements: [] },
  { username: 'bughunter', role: 'Bug Bounty Hunter', _id: 'USER012', avatar: undefined, achievements: [] },
  { username: 'malwareman', role: 'Malware Analyst', _id: 'USER013', avatar: undefined, achievements: [] },
  { username: 'zeroday', role: 'Vulnerability Researcher', _id: 'USER014', avatar: undefined, achievements: [] },
];

const allAchievements = [
  { id: 'first_vulnerability', name: 'Primera Vulnerabilidad', icon: '🏅', description: 'Encontró su primera vulnerabilidad' },
  { id: 'top_10_ranking', name: 'Top 10', icon: '🥇', description: 'Llegó al top 10 del ranking' },
  { id: 'mvp_winner', name: 'MVP', icon: '🏆', description: 'Ganó el título de MVP' },
  { id: 'gulag_survivor', name: 'Sobreviviente del Gulag', icon: '⚔️', description: 'Sobrevivió al evento Gulag' },
  { id: 'team_captain', name: 'Capitán de Equipo', icon: '👑', description: 'Lideró un equipo exitoso' },
  { id: 'bug_hunter', name: 'Cazador de Bugs', icon: '🐛', description: 'Encontró 50 vulnerabilidades' },
];

const Team: React.FC = () => {
  const [members, setMembers] = useState(initialMembers);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<null | typeof initialMembers[0]>(null);
  
  const filteredUsers = mockUsers.filter(
    u =>
      !members.some(m => m.username === u.username) &&
      (u.username.toLowerCase().includes(search.toLowerCase()) || u.role.toLowerCase().includes(search.toLowerCase()))
  );

  const handleAddMember = (user: typeof initialMembers[0]) => {
    if (members.length < 10) {
      setMembers([...members, user]);
      setShowAddMenu(false);
      setSearch('');
    }
  };

  const handleRemoveMember = (username: string) => {
    if (members.length > 3) {
      setMembers(members.filter(m => m.username !== username));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-black text-cyan-300 font-mono p-8">
      {/* Modal de perfil */}
      {selectedProfile && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-gradient-to-br from-gray-800/50 via-blue-900/50 to-gray-900/50 border-2 border-green-500/30 rounded-xl shadow-2xl p-8 w-full max-w-lg backdrop-blur-sm animate-slide-up relative overflow-hidden"
            style={{ maxHeight: '90vh' }}
          >
            {/* Botón de cerrar (X) */}
            <button
              onClick={() => setSelectedProfile(null)}
              className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 text-white z-10 shadow-lg transition-all duration-200"
              title="Cerrar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col items-center overflow-y-auto w-full" style={{ maxHeight: '80vh' }}>
              {/* Avatar */}
              <div className="mb-6 relative group">
                <div className="relative">
                  {selectedProfile.avatar ? (
                    <img src={selectedProfile.avatar} alt="Avatar" className="w-32 h-32 rounded-full border-4 border-green-500 shadow-2xl animate-pulse" />
                  ) : (
                    <div className="w-32 h-32 rounded-full border-4 border-green-500 shadow-2xl bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center animate-pulse">
                      <UserAvatar size={64} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-green-400/20 to-transparent animate-pulse"></div>
              </div>
              {/* Nombre y ID */}
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-2 animate-pulse">
                  {selectedProfile.username}
                </h2>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-green-300 text-sm">ID:</span>
                  <span className="text-cyan-300 font-mono text-sm bg-gradient-to-r from-gray-800/50 to-blue-800/50 px-3 py-1 rounded-lg border border-green-500/50 backdrop-blur-sm">
                    {selectedProfile._id}
                  </span>
                </div>
              </div>
              {/* Logros */}
              <div className="w-full bg-gradient-to-br from-gray-800/50 via-green-900/50 to-blue-900/50 border-2 border-green-500/30 rounded-xl shadow-2xl p-6 mb-4 backdrop-blur-sm">
                <div className="flex items-center mb-6">
                  <Trophy size={32} className="text-green-400 mr-3 animate-bounce" />
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                    Logros Obtenidos
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {allAchievements.map((achievement, index) => {
                    const unlocked = selectedProfile.achievements.includes(achievement.id);
                    return (
                      <div
                        key={achievement.id}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                          unlocked
                            ? 'bg-gradient-to-br from-green-600/30 via-blue-600/30 to-cyan-600/30 border-green-400/50 hover:border-green-300 shadow-lg hover:shadow-green-500/25'
                            : 'bg-gradient-to-br from-gray-800/30 via-gray-700/30 to-gray-900/30 border-gray-600/50 opacity-50 hover:opacity-70'
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`text-2xl ${unlocked ? 'opacity-100 animate-pulse' : 'opacity-30'}`}>{achievement.icon}</div>
                          <div className="flex-1">
                            <h4 className={`font-bold text-sm ${unlocked ? 'text-green-200' : 'text-gray-400'}`}>{achievement.name}</h4>
                            <p className={`text-xs mt-1 ${unlocked ? 'text-green-100' : 'text-gray-500'}`}>{achievement.description}</p>
                          </div>
                          {unlocked && (
                            <div className="text-green-400 animate-pulse">
                              <Star size={16} />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Resumen de logros */}
                <div className="mt-6 p-4 bg-gradient-to-r from-green-800/30 to-blue-800/30 rounded-lg border-2 border-green-500/30 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-green-200">Progreso de Logros:</span>
                    <span className="text-green-100 font-bold">
                      {selectedProfile.achievements.length} / {allAchievements.length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 mt-2">
                    <div
                      className="bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-500 animate-pulse"
                      style={{ width: `${(selectedProfile.achievements.length / allAchievements.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal de agregar miembro */}
      {showAddMenu && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-zinc-900 border-2 border-cyan-700 rounded-xl p-8 shadow-2xl min-w-[350px] max-w-sm animate-slide-up">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">Agregar Miembro</h3>
            <input
              type="text"
              placeholder="Buscar usuario o rol..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full mb-4 px-4 py-2 rounded-lg border-2 border-cyan-700 bg-black text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <div className="max-h-48 overflow-y-auto flex flex-col gap-2">
              {filteredUsers.length === 0 && <div className="text-cyan-500 text-center">No hay usuarios disponibles</div>}
              {filteredUsers.map(user => (
                <button
                  key={user.username}
                  onClick={() => handleAddMember(user)}
                  className={`w-full text-left px-4 py-2 rounded-lg border-2 border-cyan-700 text-cyan-300 hover:bg-cyan-900/20 transition-all duration-200 ${members.length >= 10 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={members.length >= 10}
                >
                  <span className="font-bold">{user.username}</span> <span className="text-cyan-400 ml-2 text-xs">{user.role}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setShowAddMenu(false)} className="mt-6 w-full border-2 border-cyan-700 rounded-lg py-2 text-cyan-400 hover:bg-cyan-900/20 transition-all duration-200 font-bold">Cancelar</button>
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-3xl animate-fade-in">
        {/* Team Members Panel */}
        <div className="flex-1 bg-black/30 border-2 border-cyan-700 rounded-xl p-8 shadow-2xl animate-slide-up">
          <h2 className="text-3xl font-bold mb-8 tracking-widest text-cyan-400 text-left">TEAM MEMBERS</h2>
          <div className="flex flex-col gap-4">
            {members.map((member, idx) => (
              <div
                key={member.username}
                className={
                  'border-2 rounded-lg px-6 py-4 flex items-center justify-between group transition-all duration-200 hover:scale-[1.03] bg-black/20 border-cyan-700 hover:animate-float'
                }
              >
                <div className="flex items-center gap-4">
                  {/* Avatar en la casilla */}
                  {member.avatar ? (
                    <img src={member.avatar} alt="Avatar" className="w-12 h-12 rounded-full border-2 border-green-500 shadow-md" />
                  ) : (
                    <div className="w-12 h-12 rounded-full border-2 border-green-500 shadow-md bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center">
                      <UserAvatar size={28} className="text-white" />
                    </div>
                  )}
                  <div>
                    <div className="text-xl font-bold text-cyan-300 mb-1">{member.username}</div>
                    <div className="text-cyan-400 text-sm tracking-wide">{member.role}</div>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => setSelectedProfile(member)}
                    className="border-2 border-cyan-700 rounded-lg px-3 py-1 text-cyan-400 hover:bg-cyan-900/20 transition-all duration-200 text-xs font-bold"
                  >
                    Ver Perfil
                  </button>
                  {/* Solo mostrar eliminar si no es el líder (primer miembro) */}
                  {members.length > 3 && idx !== 0 && (
                    <button
                      onClick={() => handleRemoveMember(member.username)}
                      className="border-2 border-red-700 rounded-lg px-3 py-1 text-red-400 hover:bg-red-900/20 transition-all duration-200 text-xs font-bold"
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Actions Panel */}
        <div className="flex flex-col gap-8 justify-between bg-black/30 border-2 border-cyan-700 rounded-xl p-8 shadow-2xl min-w-[220px] animate-slide-up">
          <button
            className={`w-full border-2 border-cyan-700 rounded-lg py-6 text-xl font-bold text-cyan-400 hover:bg-cyan-900/20 transition-all duration-200 tracking-widest ${members.length >= 10 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => setShowAddMenu(true)}
            disabled={members.length >= 10}
          >
            ADD MEMBER
          </button>
        </div>
      </div>
      {/* Animaciones personalizadas */}
      <style>{`
        .animate-fade-in { animation: fadeIn 0.7s ease; }
        .animate-slide-up { animation: slideUp 0.7s cubic-bezier(.4,2,.6,1); }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes float { 0%,100%{transform:translateY(0px);} 50%{transform:translateY(-10px);} }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Team; 