import React, { useState, useEffect } from 'react';
import { UserAvatar, Trophy, Star } from '@carbon/icons-react';
import { useTranslation } from 'react-i18next';
import TeamChat from '../components/TeamChat';

interface TeamMember {
  username: string;
  role: string;
  _id: string;
  avatar?: string;
  achievements: string[];
}

const avatarList = [
  '/avatars/Analista.png',
  '/avatars/Ciberseguridad.png',
  '/avatars/Cyber_God.png',
  '/avatars/Cyber_Ninja.png',
  '/avatars/Digital_Overlord.png',
  '/avatars/Digital_Phantom.png',
  '/avatars/Ghost_Hacker.png',
  '/avatars/Hacker_Básico.png',
  '/avatars/Legendary_Hacker.png',
  '/avatars/Pantester.png',
  '/avatars/Programador.png',
  '/avatars/Stealth_Master.png',
  '/avatars/ninja.png',
];
function getRandomAvatar() {
  return avatarList[Math.floor(Math.random() * avatarList.length)];
}

// Mapeo fijo de avatares para cada usuario simulado
const avatarMap: Record<string, string> = {
  'alice_smith': '/avatars/Analista.png',
  'cyberwarrior': '/avatars/Ciberseguridad.png',
  'net_ninja': '/avatars/Cyber_Ninja.png',
  'darksentinel': '/avatars/Stealth_Master.png',
  'hackerx': '/avatars/Ghost_Hacker.png',
  'firewall': '/avatars/Ciberseguridad.png',
  'rootkit': '/avatars/Digital_Phantom.png',
  'packetqueen': '/avatars/Pantester.png',
  'cryptomaster': '/avatars/Digital_Overlord.png',
  'forensicfox': '/avatars/Analista.png',
  'phishking': '/avatars/Legendary_Hacker.png',
  'bughunter': '/avatars/Hacker_Básico.png',
  'malwareman': '/avatars/Programador.png',
  'zeroday': '/avatars/Cyber_God.png',
};

const initialMembers = [
  { username: 'alice_smith', role: 'Team Leader', _id: 'USER001', avatar: avatarMap['alice_smith'], achievements: ['first_vulnerability', 'top_10_ranking', 'mvp_winner'] },
  { username: 'cyberwarrior', role: 'Security Analyst', _id: 'USER002', avatar: avatarMap['cyberwarrior'], achievements: ['first_vulnerability'] },
  { username: 'net_ninja', role: 'Penetration Tester', _id: 'USER003', avatar: avatarMap['net_ninja'], achievements: ['first_vulnerability', 'top_10_ranking'] },
  { username: 'darksentinel', role: 'Engineer', _id: 'USER004', avatar: avatarMap['darksentinel'], achievements: [] },
];

const mockUsers = [
  { username: 'hackerx', role: 'Reverse Engineer', _id: 'USER005', avatar: avatarMap['hackerx'], achievements: ['first_vulnerability'] },
  { username: 'firewall', role: 'SOC Analyst', _id: 'USER006', avatar: avatarMap['firewall'], achievements: [] },
  { username: 'rootkit', role: 'Exploit Developer', _id: 'USER007', avatar: avatarMap['rootkit'], achievements: ['top_10_ranking'] },
  { username: 'packetqueen', role: 'Network Specialist', _id: 'USER008', avatar: avatarMap['packetqueen'], achievements: [] },
  { username: 'cryptomaster', role: 'Cryptographer', _id: 'USER009', avatar: avatarMap['cryptomaster'], achievements: [] },
  { username: 'forensicfox', role: 'Forensic Analyst', _id: 'USER010', avatar: avatarMap['forensicfox'], achievements: [] },
  { username: 'phishking', role: 'Social Engineer', _id: 'USER011', avatar: avatarMap['phishking'], achievements: [] },
  { username: 'bughunter', role: 'Bug Bounty Hunter', _id: 'USER012', avatar: avatarMap['bughunter'], achievements: [] },
  { username: 'malwareman', role: 'Malware Analyst', _id: 'USER013', avatar: avatarMap['malwareman'], achievements: [] },
  { username: 'zeroday', role: 'Vulnerability Researcher', _id: 'USER014', avatar: avatarMap['zeroday'], achievements: [] },
];

const allAchievements = [
  { id: 'first_vulnerability', name: 'Primera Vulnerabilidad', icon: '🏅', description: 'Encontró su primera vulnerabilidad' },
  { id: 'top_10_ranking', name: 'Top 10', icon: '🥇', description: 'Llegó al top 10 del ranking' },
  { id: 'mvp_winner', name: 'MVP', icon: '🏆', description: 'Ganó el título de MVP' },
  { id: 'gulag_survivor', name: 'Sobreviviente del Gulag', icon: '⚔️', description: 'Sobrevivió al evento Gulag' },
  { id: 'team_captain', name: 'Capitán de Equipo', icon: '👑', description: 'Lideró un equipo exitoso' },
  { id: 'bug_hunter', name: 'Cazador de Bugs', icon: '🐛', description: 'Encontró 50 vulnerabilidades' },
];

const mockTeams = [
  { name: 'CyberGuardians', members: 5 },
  { name: 'Piteritos', members: 8 },
  { name: 'RedHackers', members: 4 },
  { name: 'BlueTeam', members: 7 },
];

const TEAM_STORAGE_KEY = 'bugbounty_team_members';
const TEAM_NAME_STORAGE_KEY = 'bugbounty_team_name';

// Add random names and titles for mock members
const Team: React.FC = () => {
  const { t } = useTranslation();
  function getCurrentUserProfile() {
    return {
      username: localStorage.getItem('profile_custom_username') || 'D4ZC',
      title: localStorage.getItem('profile_custom_title') || 'Sin título',
      avatar: localStorage.getItem('profile_custom_avatar') || '/avatars/Analista.png',
    };
  }
  function isCurrentUserLeader(members: TeamMember[]) {
    const user = getCurrentUserProfile();
    return members.length > 0 && members[0].username === user.username;
  }
  const randomNames = [
    t('cyberfox'), t('shadowbyte'), t('netstorm'), t('fireblade'), t('cryptoninja'), t('bugzilla'), t('packetghost'), t('rootwave'), t('malwaremind'), t('phishstar'), t('forensicwolf'), t('exploitron'), t('zeronight'), t('dataduke'), t('hacktitan'), t('bitviper'), t('codeowl'), t('shellshock'), t('sniffqueen'), t('darklynx')
  ];
  const randomTitles = [
    t('Security Analyst'), t('Network Specialist'), t('Exploit Developer'), t('Forensic Analyst'), t('Cryptographer'), t('Bug Bounty Hunter'), t('Penetration Tester'), t('Engineer'), t('Vulnerability Researcher'), t('SOC Analyst'), t('Engineer'), t('Security Analyst'), t('Security Analyst'), t('Social Engineer'), t('Engineer')
  ];

  // Limpia localStorage para forzar recarga de datos simulados (solo para desarrollo)
  useEffect(() => {
    localStorage.removeItem('bugbounty_team_members');
    localStorage.removeItem('bugbounty_team_name');
  }, []);
  
  // Eliminar la función translateRole y su uso.
  
  const [members, setMembers] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem(TEAM_STORAGE_KEY);
    let loaded = saved ? JSON.parse(saved) : initialMembers;
    // Intenta cargar los avatares fijos de miembros desde localStorage
    let memberAvatars: Record<string, string> = {};
    try {
      memberAvatars = JSON.parse(localStorage.getItem('team_member_avatars') || '{}');
    } catch {}
    loaded = loaded.map((m: TeamMember) => {
      if (m.username === getCurrentUserProfile().username) {
        return { ...m, avatar: getCurrentUserProfile().avatar };
      } else {
        // Si ya tiene avatar fijo, úsalo; si no, asigna uno random y guárdalo
        if (memberAvatars[m.username]) {
          return { ...m, avatar: memberAvatars[m.username] };
        } else {
          const randomAvatar = getRandomAvatar();
          memberAvatars[m.username] = randomAvatar;
          localStorage.setItem('team_member_avatars', JSON.stringify(memberAvatars));
          return { ...m, avatar: randomAvatar };
        }
      }
    });
    return loaded;
  });
  const [teamName, setTeamName] = useState<string>(() => {
    return localStorage.getItem(TEAM_NAME_STORAGE_KEY) || '';
  });
  const [isLeader, setIsLeader] = useState<boolean>(() => {
    const saved = localStorage.getItem(TEAM_STORAGE_KEY);
    if (saved) {
      const savedMembers = JSON.parse(saved);
      // Check if current user is the leader (first member)
      return savedMembers.length > 0 && savedMembers[0].username === 'alice_smith';
    }
    return true; // Default to leader for initial state
  });
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<TeamMember | null>(null);
  const [showTeamMenu, setShowTeamMenu] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [searchTeam, setSearchTeam] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // NEW
  const [teamDeleted, setTeamDeleted] = useState(false); // NEW
  const [showTeamChat, setShowTeamChat] = useState(false);
  
  // Guardar en localStorage cada vez que cambian los miembros
  useEffect(() => {
    localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(members));
    if (teamName) localStorage.setItem(TEAM_NAME_STORAGE_KEY, teamName);
    setIsLeader(isCurrentUserLeader(members));
  }, [members, teamName]);

  const filteredUsers = mockUsers.filter(
    (u: TeamMember) =>
      !members.some((m: TeamMember) => m.username === u.username) &&
      (u.username.toLowerCase().includes(search.toLowerCase()) || u.role.toLowerCase().includes(search.toLowerCase()))
  );

  const handleAddMember = (user: TeamMember) => {
    if (members.length < 10) {
      setMembers([...members, user]);
      setShowAddMenu(false);
      setSearch('');
    }
  };

  const handleRemoveMember = (username: string) => {
    if (members.length > 3) {
      setMembers(members.filter((m: TeamMember) => m.username !== username));
    }
  };

  // Crear nuevo equipo
  const handleCreateTeam = () => {
    const user = getCurrentUserProfile();
    setMembers([
      { username: user.username, role: user.title, _id: 'USER_NEW', avatar: user.avatar, achievements: [] }
    ]);
    setTeamName(newTeamName || 'Nuevo Equipo');
    setShowTeamMenu(false);
    setNewTeamName('');
    setTeamDeleted(false); // Reset deleted state
    setIsLeader(true); // User is leader when creating a team
    localStorage.setItem(TEAM_NAME_STORAGE_KEY, newTeamName || 'Nuevo Equipo');
    localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify([
      { username: user.username, role: user.title, _id: 'USER_NEW', avatar: user.avatar, achievements: [] }
    ]));
  };

  // Al unirse a un equipo, fuerza el avatar personalizado para el usuario actual
  const handleJoinTeam = (teamName: string) => {
    const user = getCurrentUserProfile();
    // Find the selected team in mockTeams
    const team = mockTeams.find(t => t.name === teamName);
    const memberCount = team ? team.members : 2;
    // Limpiar avatares fijos previos al unirse a un nuevo equipo
    localStorage.removeItem('team_member_avatars');
    let memberAvatars: Record<string, string> = {};
    const usedNames = new Set<string>();
    // Generate members: first is leader, rest are random, insert current user as a member (no líder)
    const newMembers: TeamMember[] = [
      { username: `${teamName}_leader`, role: 'Team Leader', _id: 'USER_JOIN', avatar: getRandomAvatar(), achievements: [] },
    ];
    for (let i = 1; i < memberCount; i++) {
      let name = randomNames[Math.floor(Math.random() * randomNames.length)];
      while (usedNames.has(name) || name === user.username) {
        name = randomNames[Math.floor(Math.random() * randomNames.length)];
      }
      usedNames.add(name);
      const title = randomTitles[Math.floor(Math.random() * randomTitles.length)];
      const randomAvatar = getRandomAvatar();
      memberAvatars[name] = randomAvatar;
      newMembers.push({
        username: name,
        role: title,
        _id: `USER_JOIN${i + 1}`,
        avatar: randomAvatar,
        achievements: []
      });
    }
    // Insert current user en una posición random (no líder)
    const insertAt = Math.floor(Math.random() * (newMembers.length - 1)) + 1;
    newMembers.splice(insertAt, 0, {
      username: user.username,
      role: user.title,
      _id: 'USER_SELF',
      avatar: user.avatar,
      achievements: []
    });
    // Guarda los avatares fijos de los miembros (excepto el usuario actual)
    localStorage.setItem('team_member_avatars', JSON.stringify(memberAvatars));
    setMembers(newMembers);
    setTeamName(teamName);
    setShowTeamMenu(false);
    setSearchTeam('');
    setTeamDeleted(false); // Reset deleted state
    setIsLeader(isCurrentUserLeader(newMembers));
    localStorage.setItem(TEAM_NAME_STORAGE_KEY, teamName);
    localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(newMembers));
  };

  // Team name edit logic
  const [editingTeamName, setEditingTeamName] = useState(false);
  const [editedTeamName, setEditedTeamName] = useState(teamName);
  const handleSaveTeamName = () => {
    setTeamName(editedTeamName);
    setEditingTeamName(false);
    localStorage.setItem(TEAM_NAME_STORAGE_KEY, editedTeamName);
  };

  // Transfer leadership logic
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferTarget, setTransferTarget] = useState<TeamMember | null>(null);
  // Al transferir liderazgo, asegúrate de mantener los avatares
  const handleTransferLeadership = () => {
    if (transferTarget) {
      // Move selected member to index 0 (leader)
      const idx = members.findIndex(m => m.username === transferTarget.username);
      if (idx > 0) {
        const newMembers = [...members];
        const [newLeader] = newMembers.splice(idx, 1);
        newMembers.unshift(newLeader);
        // Reasigna avatares fijos a los simulados y el personalizado al usuario actual
        for (let m of newMembers) {
          if (m.username === getCurrentUserProfile().username) {
            m.avatar = getCurrentUserProfile().avatar;
          } else if (avatarMap[m.username]) {
            m.avatar = avatarMap[m.username];
          }
        }
        setMembers(newMembers);
        setIsLeader(isCurrentUserLeader(newMembers));
        setShowTransferModal(false);
      }
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center py-12 overflow-hidden" style={{fontFamily: `'Share Tech Mono', 'Fira Mono', 'Consolas', monospace`}}>
      {/* Fondo Watch Dogs 2: gradiente neón, glitch, partículas, ruido digital */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Gradiente animado */}
        <div className="absolute inset-0 animate-wd2-bg-gradient" style={{background: 'linear-gradient(120deg, #00fff7 0%, #ff00cc 40%, #ffe600 80%, #00ff6a 100%)', opacity: 0.22}} />
        {/* SVG glitch/graffiti decorativo */}
        <svg className="absolute left-0 top-0 w-full h-full" style={{opacity:0.18}}>
          <g className="animate-glitch-move">
            <rect x="10%" y="8%" width="120" height="18" fill="#00fff7" opacity="0.18" transform="skewY(-12)" />
            <rect x="70%" y="18%" width="90" height="12" fill="#ff00cc" opacity="0.13" transform="skewX(-18)" />
            <polygon points="80,400 120,420 100,440" fill="#ffe600" opacity="0.10" />
            <polygon points="600,80 650,100 630,120" fill="#00ff6a" opacity="0.10" />
            <rect x="60%" y="80%" width="60" height="10" fill="#fff" opacity="0.07" transform="skewY(8)" />
          </g>
        </svg>
        {/* Stickers y graffiti extra */}
        <svg className="absolute right-10 bottom-10 w-32 h-32 pointer-events-none" style={{opacity:0.22}}>
          <text x="0" y="30" fontSize="32" fill="#ff00cc" fontFamily="monospace" transform="rotate(-18)">#TEAM</text>
          <text x="10" y="80" fontSize="24" fill="#00fff7" fontFamily="monospace" transform="rotate(8)">WD2</text>
          <circle cx="90" cy="90" r="18" fill="#ffe600" opacity="0.18" />
        </svg>
        {/* Ruido digital sutil */}
        <div className="absolute inset-0 bg-[url('/static/noise.png')] opacity-10 mix-blend-soft-light pointer-events-none" />
        {/* Partículas flotantes */}
        <svg className="absolute w-full h-full" style={{opacity:0.13}}>
          <circle cx="20%" cy="20%" r="60" fill="#00fff7" />
          <circle cx="80%" cy="30%" r="40" fill="#ff00cc" />
        </svg>
      </div>
      <div className="w-full max-w-6xl mx-auto relative z-10">
        {/* Modal de confirmación de eliminación de equipo o salir del equipo */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-zinc-900 border-2 border-red-700 rounded-xl p-8 shadow-2xl min-w-[350px] max-w-sm animate-slide-up flex flex-col gap-6 items-center glassmorphism">
              <h3 className="text-2xl font-bold text-red-400 mb-2 text-center">{t('¿Seguro que quieres eliminar tu equipo?')}</h3>
              <div className="flex gap-6 mt-4">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setMembers([]);
                    setTeamName('');
                    setTeamDeleted(false);
                    localStorage.removeItem(TEAM_STORAGE_KEY);
                    localStorage.removeItem(TEAM_NAME_STORAGE_KEY);
                    localStorage.removeItem('team_chat_' + teamName); // <-- Resetea el chat
                  }}
                  className="border-2 border-red-700 rounded-lg px-6 py-2 text-lg font-bold text-red-400 hover:bg-red-900/20 transition-all duration-200 glassmorphism-btn"
                >
                  {t('Sí')}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="border-2 border-cyan-700 rounded-lg px-6 py-2 text-lg font-bold text-cyan-400 hover:bg-cyan-900/20 transition-all duration-200 glassmorphism-btn"
                >
                  {t('No')}
                </button>
              </div>
            </div>
          </div>
        )}
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
                    <span className="text-green-300 text-sm">{t('ID:')}</span>
                    <span className="text-cyan-300 font-mono text-sm bg-gradient-to-r from-gray-800/50 to-blue-800/50 px-3 py-1 rounded-lg border border-green-500/50 backdrop-blur-sm">
                      {selectedProfile._id}
                    </span>
                  </div>
                </div>
                {/* Radar chart estilo FIFA */}
                <div className="w-full flex flex-col items-center mb-6">
                  <h3 className="text-lg font-bold text-cyan-300 mb-2 animate-glitch-text">Stats de Ciberseguridad</h3>
                  <svg width="260" height="260" viewBox="0 0 260 260" className="mb-2">
                    {/* Ejes y labels */}
                    <g fontFamily="'Share Tech Mono', monospace" fontSize="13" fill="#00fff7" textAnchor="middle">
                      <text x="130" y="22">Pentesting</text>
                      <text x="225" y="60">OSINT</text>
                      <text x="245" y="150">Defensa</text>
                      <text x="200" y="230">Criptografía</text>
                      <text x="130" y="255">Reportes</text>
                      <text x="60" y="230">Exploiting</text>
                      <text x="15" y="150">Forense</text>
                      <text x="35" y="60">Ing. Social</text>
                    </g>
                    {/* Polígonos de fondo */}
                    <polygon points="130,40 220,75 235,150 200,225 130,240 60,225 25,150 40,75" fill="#00fff7" opacity="0.08" />
                    <polygon points="130,70 200,95 215,150 190,210 130,220 70,210 45,150 60,95" fill="#00fff7" opacity="0.13" />
                    <polygon points="130,100 180,115 195,150 180,195 130,200 80,195 65,150 80,115" fill="#00fff7" opacity="0.18" />
                    {/* Polígono de stats personalizados */}
                    {(() => {
                      // Stats personalizados por username (determinista)
                      const baseStats = [85, 78, 60, 72, 90, 88, 65, 82];
                      const uname = selectedProfile.username;
                      const seed = uname.split('').reduce((a,c,i)=>a+c.charCodeAt(0)*((i%7)+1),0);
                      const stats = baseStats.map((_,i) => 60 + ((seed + i*13) % 40));
                      const angles = stats.map((_,i)=>((Math.PI*2)/8)*i-Math.PI/2);
                      const rMin = 40, rMax = 100;
                      const points = stats.map((val, i) => {
                        const r = rMin + (rMax-rMin)*(val/100);
                        const x = 130 + r * Math.cos(angles[i]);
                        const y = 130 + r * Math.sin(angles[i]);
                        return `${x},${y}`;
                      }).join(' ');
                      return <polygon points={points} fill="#00fff7" opacity="0.45" stroke="#00fff7" strokeWidth="2" style={{filter:'drop-shadow(0 0 12px #00fff7)'}} />;
                    })()}
                    {/* Puntos de stats */}
                    {(() => {
                      const baseStats = [85, 78, 60, 72, 90, 88, 65, 82];
                      const uname = selectedProfile.username;
                      const seed = uname.split('').reduce((a,c,i)=>a+c.charCodeAt(0)*((i%7)+1),0);
                      const stats = baseStats.map((_,i) => 60 + ((seed + i*13) % 40));
                      const angles = stats.map((_,i)=>((Math.PI*2)/8)*i-Math.PI/2);
                      const rMin = 40, rMax = 100;
                      return stats.map((val, i) => {
                        const r = rMin + (rMax-rMin)*(val/100);
                        const x = 130 + r * Math.cos(angles[i]);
                        const y = 130 + r * Math.sin(angles[i]);
                        return <circle key={i} cx={x} cy={y} r="6" fill="#00fff7" opacity="0.85" stroke="#fff" strokeWidth="2" />;
                      });
                    })()}
                  </svg>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-cyan-200 text-sm font-mono">
                    {(() => {
                      const baseStats = [85, 78, 60, 72, 90, 88, 65, 82];
                      const uname = selectedProfile.username;
                      const seed = uname.split('').reduce((a,c,i)=>a+c.charCodeAt(0)*((i%7)+1),0);
                      const stats = baseStats.map((_,i) => 60 + ((seed + i*13) % 40));
                      const labels = ['Pentesting','OSINT','Defensa','Criptografía','Reportes','Exploiting','Forense','Ing. Social'];
                      return stats.map((val,i)=>(
                        <span key={labels[i]}>{labels[i]}: <span className="text-cyan-100 font-bold">{val}</span></span>
                      ));
                    })()}
                  </div>
                </div>
                {/* Logros */}
                <div className="w-full bg-gradient-to-br from-gray-800/50 via-green-900/50 to-blue-900/50 border-2 border-green-500/30 rounded-xl shadow-2xl p-6 mb-4 backdrop-blur-sm">
                  <div className="flex items-center mb-6">
                    <Trophy size={32} className="text-green-400 mr-3 animate-bounce" />
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                      {t('Logros Obtenidos')}
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
                      <span className="text-green-200">{t('Progreso de Logros')}</span>
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
            <div className="bg-zinc-900 border-2 border-cyan-700 rounded-xl p-8 shadow-2xl min-w-[350px] max-w-sm animate-slide-up glassmorphism">
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">{t('Agregar miembro')}</h3>
              <input
                type="text"
                placeholder={t('Buscar usuarios...')}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full mb-4 px-4 py-2 rounded-lg border-2 border-cyan-700 bg-black text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <div className="max-h-48 overflow-y-auto flex flex-col gap-2">
                {filteredUsers.length === 0 && <div className="text-cyan-500 text-center">{t('No hay usuarios disponibles')}</div>}
                {filteredUsers.map(user => {
                  // Previsualiza el avatar random que le tocaría
                  let memberAvatars: Record<string, string> = {};
                  try {
                    memberAvatars = JSON.parse(localStorage.getItem('team_member_avatars') || '{}');
                  } catch {}
                  const previewAvatar = memberAvatars[user.username] || getRandomAvatar();
                  return (
                    <button
                      key={user.username}
                      onClick={() => handleAddMember(user)}
                      className={`w-full text-left px-4 py-2 rounded-lg border-2 border-cyan-700 text-cyan-300 hover:bg-cyan-900/20 transition-all duration-200 flex items-center gap-3 ${members.length >= 10 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={members.length >= 10}
                    >
                      <img src={previewAvatar} alt="avatar" className="w-8 h-8 rounded-full border-2 border-green-500 shadow-sm mr-2" />
                      <span className="font-bold">{user.username}</span> <span className="text-cyan-400 ml-2 text-xs">{user.role}</span>
                    </button>
                  );
                })}
              </div>
              <button onClick={() => setShowAddMenu(false)} className="mt-6 w-full border-2 border-cyan-700 rounded-lg py-2 text-cyan-400 hover:bg-cyan-900/20 transition-all duration-200 font-bold">{t('Cancelar')}</button>
            </div>
          </div>
        )}
        {/* Menú de eliminar/crear/unirse equipo */}
        {showTeamMenu && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-zinc-900 border-2 border-cyan-700 rounded-xl p-8 shadow-2xl min-w-[350px] max-w-sm animate-slide-up flex flex-col gap-6 glassmorphism">
              <h3 className="text-2xl font-bold text-cyan-400 mb-2 text-center">{t('Gestionar equipo')}</h3>
              <div className="flex flex-col gap-4">
                <div className="border-2 border-cyan-700 rounded-lg p-4">
                  <div className="font-bold mb-2 text-cyan-300">{t('Crear nuevo equipo')}</div>
                  <input
                    type="text"
                    placeholder={t('Nombre del equipo')}
                    value={newTeamName}
                    onChange={e => setNewTeamName(e.target.value)}
                    className="w-full mb-2 px-3 py-2 rounded-lg border-2 border-cyan-700 bg-black text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <button
                    onClick={handleCreateTeam}
                    className="w-full border-2 border-green-700 rounded-lg py-2 text-green-400 hover:bg-green-900/20 transition-all duration-200 font-bold mt-2"
                  >
                    {t('Crear Equipo')}
                  </button>
                </div>
                <div className="border-2 border-cyan-700 rounded-lg p-4">
                  <div className="font-bold mb-2 text-cyan-300">{t('Unirse a equipo existente')}</div>
                  <input
                    type="text"
                    placeholder={t('Buscar equipo...')}
                    value={searchTeam}
                    onChange={e => setSearchTeam(e.target.value)}
                    className="w-full mb-2 px-3 py-2 rounded-lg border-2 border-cyan-700 bg-black text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <div className="max-h-32 overflow-y-auto flex flex-col gap-2">
                    {mockTeams.filter(t => t.name.toLowerCase().includes(searchTeam.toLowerCase())).map(team => (
                      <button
                        key={team.name}
                        onClick={() => handleJoinTeam(team.name)}
                        className="w-full border-2 border-cyan-700 rounded-lg py-2 text-cyan-400 hover:bg-cyan-900/20 transition-all duration-200 font-bold"
                      >
                        {team.name} <span className="text-xs text-cyan-200">({team.members} miembros)</span>
                      </button>
                    ))}
                    {mockTeams.filter(t => t.name.toLowerCase().includes(searchTeam.toLowerCase())).length === 0 && (
                      <div className="text-cyan-500 text-center">{t('No hay equipos encontrados')}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Renderizar panel de miembros solo si el equipo no ha sido eliminado y hay miembros */}
        {!teamDeleted && (members.length > 0 ? (
          <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
            {/* Panel de miembros */}
            <div className="flex-1 bg-black/30 border-2 border-cyan-700 rounded-xl p-8 shadow-2xl animate-slide-up mb-8 md:mb-0 glassmorphism">
              <h2 className="text-3xl font-bold mb-2 tracking-widest text-cyan-400 text-left flex items-center gap-2">
                {editingTeamName ? (
                  <>
                    <input
                      className="bg-black border-2 border-cyan-700 rounded-lg px-2 py-1 text-cyan-300 text-2xl font-bold w-48 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      value={editedTeamName}
                      onChange={e => setEditedTeamName(e.target.value)}
                      autoFocus
                    />
                    <button onClick={handleSaveTeamName} className="ml-2 px-2 py-1 border-2 border-green-700 rounded-lg text-green-400 hover:bg-green-900/20 font-bold">{t('Guardar')}</button>
                    <button onClick={() => { setEditingTeamName(false); setEditedTeamName(teamName); }} className="ml-1 px-2 py-1 border-2 border-red-700 rounded-lg text-red-400 hover:bg-red-900/20 font-bold">{t('Cancelar')}</button>
                  </>
                ) : (
                  <>
                    {teamName || t('Sin equipo')}
                    {isLeader && (
                      <button onClick={() => setEditingTeamName(true)} className="ml-2 px-2 py-1 border-2 border-cyan-700 rounded-lg text-cyan-400 hover:bg-cyan-900/20 font-bold text-base">{t('Editar')}</button>
                    )}
                  </>
                )}
              </h2>
              <div className="text-cyan-300 text-sm mb-6">{t('Miembros del equipo')}</div>
              <div className="flex flex-col gap-4">
                {members.map((member: TeamMember, idx: number) => (
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
                        {t('Ver perfil')}
                      </button>
                      {/* Mostrar eliminar si soy líder y no es el primer miembro (líder) ni yo mismo */}
                      {isLeader && idx !== 0 && member.username !== getCurrentUserProfile().username && (
                        <button
                          onClick={() => handleRemoveMember(member.username)}
                          className="border-2 border-red-700 rounded-lg px-3 py-1 text-red-400 hover:bg-red-900/20 transition-all duration-200 text-xs font-bold"
                        >
                          {t('Eliminar')}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Panel de acciones */}
            <div className="flex flex-col gap-6 bg-black/30 border-2 border-cyan-700 rounded-xl p-8 shadow-2xl min-w-[220px] animate-slide-up glassmorphism">
              {/* Botón para abrir/cerrar chat grupal */}
              {isLeader && (
                <button
                  className={`w-full border-2 border-cyan-700 rounded-lg py-6 text-xl font-bold text-cyan-400 hover:bg-cyan-900/20 transition-all duration-200 tracking-widest ${members.length >= 10 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => setShowAddMenu(true)}
                  disabled={members.length >= 10}
                >
                  {t('Agregar miembro')}
                </button>
              )}
              <button
                className="w-full border-2 border-red-700 rounded-lg py-6 text-xl font-bold text-red-400 hover:bg-red-900/20 transition-all duration-200 tracking-widest"
                onClick={() => setShowDeleteConfirm(true)}
              >
                {isLeader ? t('Eliminar equipo') : t('Salir del equipo')}
              </button>
              {isLeader && members.length > 1 && (
                <button
                  className="w-full border-2 border-yellow-500 rounded-lg py-2 text-lg font-bold text-yellow-300 hover:bg-yellow-900/20 transition-all duration-200 tracking-widest mb-4"
                  onClick={() => setShowTransferModal(true)}
                >
                  {t('Transferir liderazgo')}
                </button>
              )}
            </div>
          </div>
        ) : (
          showTeamMenu || (
            <div className="flex items-center justify-center w-full animate-fade-in relative z-10">
              <div className="bg-zinc-900 border-2 border-cyan-700 rounded-xl p-8 shadow-2xl min-w-[350px] max-w-sm animate-slide-up flex flex-col gap-6 glassmorphism">
                <h3 className="text-2xl font-bold text-cyan-400 mb-2 text-center">{t('Gestión de equipo')}</h3>
                <div className="flex flex-col gap-4">
                  <div className="border-2 border-cyan-700 rounded-lg p-4">
                    <div className="font-bold mb-2 text-cyan-300">{t('Crear nuevo equipo')}</div>
                    <input
                      type="text"
                      placeholder={t('Nombre del nuevo equipo (opcional)')}
                      value={newTeamName}
                      onChange={e => setNewTeamName(e.target.value)}
                      className="w-full mb-2 px-3 py-2 rounded-lg border-2 border-cyan-700 bg-black text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    <button
                      onClick={handleCreateTeam}
                      className="w-full border-2 border-green-700 rounded-lg py-2 text-green-400 hover:bg-green-900/20 transition-all duration-200 font-bold mt-2"
                    >
                      {t('Crear equipo')}
                    </button>
                  </div>
                  <div className="border-2 border-cyan-700 rounded-lg p-4">
                    <div className="font-bold mb-2 text-cyan-300">{t('Buscar equipo para unirte')}</div>
                    <input
                      type="text"
                      placeholder={t('Buscar equipo...')}
                      value={searchTeam}
                      onChange={e => setSearchTeam(e.target.value)}
                      className="w-full mb-2 px-3 py-2 rounded-lg border-2 border-cyan-700 bg-black text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    <div className="max-h-32 overflow-y-auto flex flex-col gap-2">
                      {mockTeams.filter(t => t.name.toLowerCase().includes(searchTeam.toLowerCase())).map(team => (
                        <button
                          key={team.name}
                          onClick={() => handleJoinTeam(team.name)}
                          className="w-full border-2 border-cyan-700 rounded-lg py-2 text-cyan-400 hover:bg-cyan-900/20 transition-all duration-200 font-bold"
                        >
                          {team.name} <span className="text-xs text-cyan-200">({team.members} Miembros)</span>
                        </button>
                      ))}
                      {mockTeams.filter(t => t.name.toLowerCase().includes(searchTeam.toLowerCase())).length === 0 && (
                        <div className="text-cyan-500 text-center">{t('No hay equipos encontrados')}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        ))}
        {/* Modal para transferir liderazgo */}
        {showTransferModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-zinc-900 border-2 border-yellow-500 rounded-xl p-8 shadow-2xl min-w-[350px] max-w-sm animate-slide-up flex flex-col gap-6 items-center glassmorphism">
              <h3 className="text-2xl font-bold text-yellow-300 mb-2 text-center">{t('Transferir liderazgo')}</h3>
              <div className="flex flex-col gap-2 w-full">
                {members.slice(1).map(member => (
                  <button
                    key={member.username}
                    onClick={() => setTransferTarget(member)}
                    className={`w-full border-2 rounded-lg py-2 text-yellow-200 hover:bg-yellow-900/20 transition-all duration-200 font-bold ${transferTarget && transferTarget.username === member.username ? 'border-yellow-400' : 'border-yellow-700'}`}
                  >
                    {member.username} <span className="text-cyan-400 ml-2 text-xs">{member.role}</span>
                  </button>
                ))}
              </div>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleTransferLeadership}
                  disabled={!transferTarget}
                  className="border-2 border-green-700 rounded-lg px-6 py-2 text-lg font-bold text-green-400 hover:bg-green-900/20 transition-all duration-200 disabled:opacity-50 glassmorphism-btn"
                >
                  {t('Transferir')}
                </button>
                <button
                  onClick={() => { setShowTransferModal(false); setTransferTarget(null); }}
                  className="border-2 border-red-700 rounded-lg px-6 py-2 text-lg font-bold text-red-400 hover:bg-red-900/20 transition-all duration-200 glassmorphism-btn"
                >
                  {t('Cancelar')}
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Elimina el renderizado del chat grupal debajo del contenido principal.
            Agrega un widget flotante en la esquina inferior derecha: */}
        {!teamDeleted && members.length > 0 && teamName && (
          <>
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
              <button
                className={`rounded-full shadow-lg border-2 border-cyan-400 bg-gradient-to-br from-cyan-700 to-purple-700 text-white font-bold px-6 py-3 text-lg hover:scale-105 transition-all duration-200 ${showTeamChat ? 'ring-4 ring-cyan-400/40' : ''}`}
                onClick={() => setShowTeamChat((prev) => !prev)}
                style={{ minWidth: '56px' }}
              >
                {showTeamChat ? t('Cerrar chat') : t('Chat de equipo')}
              </button>
              {showTeamChat && (
                <div className="w-[350px] max-w-[90vw] h-[480px] bg-transparent">
                  <TeamChat teamName={teamName} username={getCurrentUserProfile().username} members={members} />
                </div>
              )}
            </div>
          </>
        )}
        {/* Animaciones personalizadas */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
          .glassmorphism { backdrop-filter: blur(8px) saturate(1.2); background: rgba(30,40,60,0.25); }
          .animate-glitch-move { animation: glitchMove 7s infinite alternate linear; }
          @keyframes glitchMove { 0%{transform:translateY(0);} 100%{transform:translateY(10px) skewX(-2deg);} }
          .animate-glitch-btn { animation: glitchBtn 1.5s infinite steps(2, end); }
          @keyframes glitchBtn { 0%{filter:none;} 20%{filter:brightness(1.2) hue-rotate(20deg);} 40%{filter:contrast(1.2) blur(0.5px);} 60%{filter:none;} 100%{filter:none;} }
          .animate-glitch-text { animation: glitchText 1.2s infinite steps(2, end); }
          @keyframes glitchText { 0%{text-shadow:2px 0 #00fff7, -2px 0 #ff00cc;} 50%{text-shadow:-2px 0 #ffe600, 2px 0 #00ff6a;} 100%{text-shadow:2px 0 #00fff7, -2px 0 #ff00cc;} }
          .neon-text { text-shadow: 0 0 8px #00fff7, 0 0 16px #00fff7, 0 0 32px #00fff7; }
        `}</style>
      </div>
    </div>
  );
};

export default Team; 