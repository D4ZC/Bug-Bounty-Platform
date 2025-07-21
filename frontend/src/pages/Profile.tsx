import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { IoMdClose } from 'react-icons/io';
import { FaCrown, FaMedal, FaUserEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { users } from '@/data/usersData';
import { teams } from '@/data/usersData';

// Usuario global extendido para perfil
const user = {
  ...users[0],
  frame: '',
  role: 'Admin',
  topIndividual: 9,
  topTeam: 9,
  badges: [
    { id: 1, name: 'Top 1', icon: <FaCrown size={24} color="#facc15" /> },
    { id: 2, name: 'Hacker', icon: <FaMedal size={24} color="#a78bfa" /> },
    { id: 3, name: 'Veterano', icon: <FaMedal size={24} color="#60a5fa" /> },
  ],
  stats: {
    reports: 51,
    vulns: 55,
    points: 305,
    duels: 40,
    effectiveness: 30,
  },
  radar: [
    { subject: 'Vulns', A: 55, fullMark: 100 },
    { subject: 'Docs', A: 20, fullMark: 100 },
    { subject: 'Reportes', A: 51, fullMark: 100 },
    { subject: 'Puntos', A: 305, fullMark: 400 },
    { subject: 'Bugs', A: 30, fullMark: 100 },
    { subject: 'Duelos', A: 40, fullMark: 100 },
  ],
  history: [
    { id: 1, name: 'Vuln simulada #1', date: '2024-06-03', points: 96 },
    { id: 2, name: 'Vuln simulada #2', date: '2024-06-02', points: 117 },
    { id: 3, name: 'Vuln real #1', date: '2024-05-30', points: 200 },
    { id: 4, name: 'Vuln real #2', date: '2024-05-29', points: 150 },
    { id: 5, name: 'Vuln real #3', date: '2024-05-28', points: 180 },
    { id: 6, name: 'Vuln real #4', date: '2024-05-27', points: 90 },
    { id: 7, name: 'Vuln real #5', date: '2024-05-26', points: 110 },
  ],
  duels: [
    { id: 1, name: 'Duel vs. NightOwls', date: '2024-06-01', result: 'Ganado' },
    { id: 2, name: 'Duel vs. CyberTeam', date: '2024-05-15', result: 'Ganado' },
    { id: 3, name: 'Duel vs. Alpha', date: '2024-05-01', result: 'Ganado' },
    { id: 4, name: 'Duel vs. Beta', date: '2024-04-20', result: 'Ganado' },
    { id: 5, name: 'Duel vs. Gamma', date: '2024-04-10', result: 'Ganado' },
    { id: 6, name: 'Duel vs. Delta', date: '2024-04-01', result: 'Ganado' },
  ],
  reports: [
    { id: 1, name: 'Reporte SQLi', date: '2024-06-01' },
    { id: 2, name: 'Reporte XSS', date: '2024-05-20' },
    { id: 3, name: 'Reporte CSRF', date: '2024-05-10' },
    { id: 4, name: 'Reporte LFI', date: '2024-05-05' },
    { id: 5, name: 'Reporte RCE', date: '2024-05-01' },
    { id: 6, name: 'Reporte SSRF', date: '2024-04-25' },
  ],
};

const defaultBg = '';

function groupByMonth(items) {
  return items.reduce((acc, item) => {
    const month = item.date.slice(0, 7); // YYYY-MM
    if (!acc[month]) acc[month] = [];
    acc[month].push(item);
    return acc;
  }, {});
}

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'perfil' | 'team'>('perfil');
  const profileUser = {
    ...users[0],
    frame: users[0].frame || '',
    role: 'Team Leader', // Cambiado de 'Admin' a 'Team Leader'
    topIndividual: 9,
    topTeam: 9,
    badges: [
      { id: 1, name: 'Top 1', icon: <FaCrown size={24} color="#facc15" /> },
      { id: 2, name: 'Hacker', icon: <FaMedal size={24} color="#a78bfa" /> },
      { id: 3, name: 'Veterano', icon: <FaMedal size={24} color="#60a5fa" /> },
    ],
    stats: {
      reports: 51,
      vulns: 55,
      points: 305,
      duels: 40,
      effectiveness: 0, // Se calculará dinámicamente
    },
    radar: [
      { subject: 'Vulns', A: 55, fullMark: 100 },
      { subject: 'Docs', A: 20, fullMark: 100 },
      { subject: 'Reportes', A: 51, fullMark: 100 },
      { subject: 'Puntos', A: 305, fullMark: 400 },
      { subject: 'Bugs', A: 30, fullMark: 100 },
      { subject: 'Duelos', A: 40, fullMark: 100 },
    ],
    history: [
      { id: 1, name: 'Vuln simulada #1', date: '2024-06-03', points: 96 },
      { id: 2, name: 'Vuln simulada #2', date: '2024-06-02', points: 117 },
      { id: 3, name: 'Vuln real #1', date: '2024-05-30', points: 200 },
      { id: 4, name: 'Vuln real #2', date: '2024-05-29', points: 150 },
      { id: 5, name: 'Vuln real #3', date: '2024-05-28', points: 180 },
      { id: 6, name: 'Vuln real #4', date: '2024-05-27', points: 90 },
      { id: 7, name: 'Vuln real #5', date: '2024-05-26', points: 110 },
    ],
    duels: [
      { id: 1, name: 'Duel vs. NightOwls', date: '2024-06-01', result: 'Ganado' },
      { id: 2, name: 'Duel vs. CyberTeam', date: '2024-05-15', result: 'Ganado' },
      { id: 3, name: 'Duel vs. Alpha', date: '2024-05-01', result: 'Ganado' },
      { id: 4, name: 'Duel vs. Beta', date: '2024-04-20', result: 'Ganado' },
      { id: 5, name: 'Duel vs. Gamma', date: '2024-04-10', result: 'Ganado' },
      { id: 6, name: 'Duel vs. Delta', date: '2024-04-01', result: 'Ganado' },
    ],
    reports: [
      { id: 1, name: 'Reporte SQLi', date: '2024-06-01' },
      { id: 2, name: 'Reporte XSS', date: '2024-05-20' },
      { id: 3, name: 'Reporte CSRF', date: '2024-05-10' },
      { id: 4, name: 'Reporte LFI', date: '2024-05-05' },
      { id: 5, name: 'Reporte RCE', date: '2024-05-01' },
      { id: 6, name: 'Reporte SSRF', date: '2024-04-25' },
    ],
  };
  // Obtener el equipo relacional
  const teamInfo = teams.find(t => t.name === profileUser.team);
  const teamMembers = users.filter(u => u.team === profileUser.team);
  const [banner, setBanner] = useState<string>(defaultBg);
  const [containerBanner, setContainerBanner] = useState<string>(defaultBg);
  const [avatar, setAvatar] = useState<string>(profileUser.avatar || '');
  const [avatarPreview, setAvatarPreview] = useState<string>(avatar);
  const [showBannerEdit, setShowBannerEdit] = useState(false);
  const [modal, setModal] = useState<null | 'duels' | 'vulns' | 'reports'>(null);
  const [modalMonth, setModalMonth] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showAvatarEdit, setShowAvatarEdit] = useState(false);
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(null);
  const [version, setVersion] = useState(0);
  const navigate = useNavigate();
  const [showFrameEdit, setShowFrameEdit] = useState(false);
  const [framePreview, setFramePreview] = useState<string>(profileUser.frame || '');
  const [selectedFrameFile, setSelectedFrameFile] = useState<File | null>(null);

  // Estados para edición de equipo
  const [showTeamBannerEdit, setShowTeamBannerEdit] = useState(false);
  const [showTeamAvatarEdit, setShowTeamAvatarEdit] = useState(false);
  const [showTeamFrameEdit, setShowTeamFrameEdit] = useState(false);

  // Estado para avatar del equipo
  const [teamAvatar, setTeamAvatar] = useState<string>('');
  const [teamAvatarPreview, setTeamAvatarPreview] = useState<string>('');
  const [selectedTeamAvatarFile, setSelectedTeamAvatarFile] = useState<File | null>(null);

  // Estado para marco y banner del equipo
  const [teamFrame, setTeamFrame] = useState<string>('');
  const [teamFramePreview, setTeamFramePreview] = useState<string>('');
  const [selectedTeamFrameFile, setSelectedTeamFrameFile] = useState<File | null>(null);
  const [teamBanner, setTeamBanner] = useState<string>('');
  const [teamBannerPreview, setTeamBannerPreview] = useState<string>('');
  const [selectedTeamBannerFile, setSelectedTeamBannerFile] = useState<File | null>(null);

  // Ruta absoluta base del proyecto (ajusta si es necesario)
  const projectBase = '/Users/rembrandtmauricio/Desktop/Bug-Bounty-Platform/frontend/public';

  // Función para manejar la selección de archivos
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const fileUrl = URL.createObjectURL(file);
      setContainerBanner(fileUrl);
    }
  };

  // Función para limpiar el archivo seleccionado
  const clearSelectedFile = () => {
    setSelectedFile(null);
  };

  // Función para manejar la selección de avatar
  const handleAvatarFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedAvatarFile(file);
      const fileUrl = URL.createObjectURL(file);
      setAvatarPreview(fileUrl);
    }
  };

  // Función para limpiar el avatar seleccionado
  const clearSelectedAvatarFile = () => {
    setSelectedAvatarFile(null);
    setAvatarPreview(avatar);
  };

  // Función para manejar la selección de marco
  const handleFrameFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFrameFile(file);
      const fileUrl = URL.createObjectURL(file);
      setFramePreview(fileUrl);
    }
  };

  // Función para limpiar el marco seleccionado
  const clearSelectedFrameFile = () => {
    setSelectedFrameFile(null);
    setFramePreview(profileUser.frame || '');
  };

  // Handler para seleccionar avatar de equipo
  const handleTeamAvatarFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedTeamAvatarFile(file);
      const fileUrl = URL.createObjectURL(file);
      setTeamAvatarPreview(fileUrl);
    }
  };
  const clearSelectedTeamAvatarFile = () => {
    setSelectedTeamAvatarFile(null);
    setTeamAvatarPreview(teamAvatar);
  };

  // Handler para seleccionar marco de equipo
  const handleTeamFrameFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedTeamFrameFile(file);
      const fileUrl = URL.createObjectURL(file);
      setTeamFramePreview(fileUrl);
    }
  };
  const clearSelectedTeamFrameFile = () => {
    setSelectedTeamFrameFile(null);
    setTeamFramePreview(teamFrame);
  };
  // Handler para seleccionar banner de equipo
  const handleTeamBannerFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedTeamBannerFile(file);
      const fileUrl = URL.createObjectURL(file);
      setTeamBannerPreview(fileUrl);
    }
  };
  const clearSelectedTeamBannerFile = () => {
    setSelectedTeamBannerFile(null);
    setTeamBannerPreview(teamBanner);
  };

  // Handler para limpiar avatar de equipo
  const resetTeamAvatar = () => {
    setTeamAvatar('');
    setTeamAvatarPreview('');
    setSelectedTeamAvatarFile(null);
  };
  // Handler para limpiar marco de equipo
  const resetTeamFrame = () => {
    setTeamFrame('');
    setTeamFramePreview('');
    setSelectedTeamFrameFile(null);
  };

  // Handler para limpiar solo la previsualización de avatar de equipo
  const clearTeamAvatarPreview = () => {
    setTeamAvatarPreview('');
    setSelectedTeamAvatarFile(null);
  };
  // Handler para limpiar solo la previsualización de marco de equipo
  const clearTeamFramePreview = () => {
    setTeamFramePreview('');
    setSelectedTeamFrameFile(null);
  };

  // Agrupaciones por mes
  const duelsByMonth = groupByMonth(profileUser.duels);
  const vulnsByMonth = groupByMonth(profileUser.history);
  const reportsByMonth = groupByMonth(profileUser.reports);

  // Modal content helpers
  const renderModalContent = () => {
    let data = [];
    let title = '';
    let byMonth = {};
    if (modal === 'duels') {
      data = profileUser.duels;
      title = 'Duelos Ganados';
      byMonth = duelsByMonth;
    } else if (modal === 'vulns') {
      data = profileUser.history;
      title = 'Vulnerabilidades Resueltas';
      byMonth = vulnsByMonth;
    } else if (modal === 'reports') {
      data = profileUser.reports;
      title = 'Reportes Subidos';
      byMonth = reportsByMonth;
    }
    const months = Object.keys(byMonth).sort((a, b) => b.localeCompare(a));
    const filtered = modalMonth ? byMonth[modalMonth] : data;
    return (
      <div className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div className="text-xl font-bold">{title}</div>
          <select
            className="input w-48"
            value={modalMonth}
            onChange={e => setModalMonth(e.target.value)}
          >
            <option value="">Todos los meses</option>
            {months.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        {/* Limita la altura a 5 elementos (aprox 52px x 5 = 260px) */}
        <div className="divide-y divide-gray-200 max-h-[260px] overflow-y-auto">
          {filtered && filtered.length > 0 ? filtered.map(item => (
            <div
              key={item.id}
              className={`flex items-center justify-between py-3 ${modal === 'reports' || modal === 'duels' ? 'cursor-pointer hover:bg-gray-100 transition' : ''}`}
              onClick={() => {
                if (modal === 'reports') navigate('/reports');
                if (modal === 'duels') navigate('/duels');
              }}
            >
              <div>{item.name}</div>
              <div className="text-gray-500">{item.date}</div>
              {modal === 'duels' && <div className="text-green-600 font-bold">{item.result}</div>}
              {modal === 'vulns' && <div className="text-green-600 font-bold">+{item.points} pts</div>}
            </div>
          )) : <div className="text-center text-gray-400 py-8">No hay datos para este mes.</div>}
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [modal]);

  // Para liberar la URL temporal del avatar
  useEffect(() => {
    return () => {
      if (selectedAvatarFile && avatarPreview.startsWith('blob:')) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [showAvatarEdit]);

  // Si el avatar es una URL de imgur inválida, bórralo
  useEffect(() => {
    if (avatar && avatar.includes('imgur.com') && avatar.includes('not exist')) {
      setAvatar('');
      const idx = users.findIndex(u => u.name === profileUser.name);
      if (idx !== -1) users[idx].avatar = '';
    }
  }, [avatar, profileUser.name]);

  // Calcular efectividad dinámica
  const maxVulns = 100;
  const maxDuels = 100;
  const maxBugs = 100;
  const maxDocs = 100;
  // Duelos ganados
  const duelsWon = Array.isArray(profileUser.duels)
    ? profileUser.duels.filter((d: any) => d.result === 'Ganado').length
    : 0;
  // Bugs reportados
  const bugs = profileUser.radar?.find((r: any) => r.subject === 'Bugs')?.A || 0;
  // Documentación subida
  const docs = profileUser.radar?.find((r: any) => r.subject === 'Docs')?.A || 0;
  // Vulnerabilidades resueltas
  const vulns = profileUser.radar?.find((r: any) => r.subject === 'Vulns')?.A || 0;
  // Fórmula de efectividad
  const effectiveness = Math.round(((vulns / maxVulns) + (duelsWon / maxDuels) + (bugs / maxBugs) + (docs / maxDocs)) / 4 * 100);

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-start bg-cover bg-center relative"
      style={{ backgroundImage: `url(${banner})` }}
    >
      {/* Tabs Perfil | Team */}
      <div className="w-full max-w-6xl flex items-center gap-4 mt-6 mb-4">
        <button
          className={`text-2xl font-bold px-4 py-2 rounded-t-lg border-b-4 transition-all duration-150 ${activeTab === 'perfil' ? 'border-blue-600 text-blue-700 bg-white' : 'border-transparent text-gray-400 bg-gray-100 hover:text-blue-600'}`}
          onClick={() => setActiveTab('perfil')}
        >
          Perfil
        </button>
        <button
          className={`text-2xl font-bold px-4 py-2 rounded-t-lg border-b-4 transition-all duration-150 ${activeTab === 'team' ? 'border-blue-600 text-blue-700 bg-white' : 'border-transparent text-gray-400 bg-gray-100 hover:text-blue-600'}`}
          onClick={() => setActiveTab('team')}
        >
          Team
        </button>
      </div>
      {/* Renderizado condicional */}
      {activeTab === 'perfil' ? (
        <div className="w-full max-w-6xl mt-2 relative">
          {/* Banner container */}
          <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-white/30 bg-gray-800/90 backdrop-blur-md relative min-h-[384px] flex items-center justify-center">
            {containerBanner ? (
              <img
                src={containerBanner}
                alt="banner"
                className="absolute inset-0 w-full h-full object-cover object-center z-0"
              />
            ) : (
              <div className="absolute inset-0 w-full h-full bg-gray-300 z-0" />
            )}
            <div className="relative z-10 w-full max-w-4xl mx-auto p-4 rounded-xl bg-white/80 shadow-lg min-h-[200px] flex flex-row items-center gap-6">
              <div className="grid grid-cols-2 gap-6 w-full items-start mt-0">
                {/* Columna izquierda: avatar + insignias */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    {avatar ? (
                      <img
                        src={avatar}
                        className="w-24 h-24 rounded-full border-2 border-blue-400 object-cover z-10 bg-gray-200"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full border-2 border-blue-400 bg-gray-300 flex items-center justify-center z-10">
                        <FaUserEdit size={40} />
                      </div>
                    )}
                    {profileUser.frame && (
                      <img
                        src={profileUser.frame}
                        alt="marco"
                        className="absolute top-1/2 left-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
                      />
                    )}
                  </div>
                  <div className="flex gap-2 items-center mt-2">
                    {profileUser.badges.map(badge => (
                      <div key={badge.id} className="flex flex-col items-center">
                        <span className="text-2xl">{badge.icon}</span>
                        <span className="text-xs text-gray-500 mt-1">{badge.name}</span>
                      </div>
                    ))}
                  </div>
                  <button className="text-blue-600 text-xs hover:underline mt-0">Editar insignias</button>
                  <div className="flex flex-col gap-1 items-center mt-0 mb-2">
                    <button
                      className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded shadow w-56 justify-center text-sm"
                      onClick={() => setShowAvatarEdit(true)}
                    >
                      <FaUserEdit /> Editar foto de perfil
                    </button>
                    <button
                      className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded shadow w-56 justify-center text-sm"
                      onClick={() => setShowFrameEdit(true)}
                    >
                      <FaUserEdit /> Agregar marco
                    </button>
                    <button
                      className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded shadow w-56 justify-center text-sm"
                      onClick={() => setShowBannerEdit(true)}
                    >
                      <FaUserEdit /> Editar banner
                    </button>
                  </div>
                </div>
                {/* Columna derecha: info + radar */}
                <div className="flex flex-col items-center gap-2 w-full self-start">
                  <div className="text-2xl font-bold text-gray-900 text-center">{profileUser.name}</div>
                  <div className="text-base text-gray-600 font-medium flex items-center gap-2 justify-center">
                    {profileUser.role} <span className="mx-1">|</span> <span className="font-semibold text-blue-700">{profileUser.team}</span>
                  </div>
                  <div className="flex gap-2 justify-center">
                    {/* Ranking real del usuario */}
                    <span className="bg-yellow-300 text-yellow-900 px-2 py-1 rounded text-xs font-bold">
                      Top #{users.findIndex(u => u.name === profileUser.name) + 1} Individual
                    </span>
                    {/* Ranking real del equipo */}
                    <span className="bg-blue-300 text-blue-900 px-2 py-1 rounded text-xs font-bold">
                      Top #{teams.findIndex(t => t.name === profileUser.team) + 1} Equipo
                    </span>
                  </div>
                  {/* Radar chart */}
                  <div className="w-full max-w-sm">
                    <ResponsiveContainer width="100%" height={150}>
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={profileUser.radar}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <Radar name="Stats" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.5} />
                        <Tooltip content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-white border border-gray-300 rounded px-3 py-2 text-xs shadow">
                                <div><b>{payload[0].payload.subject}</b></div>
                                <div>Resueltos: {payload[0].payload.A}</div>
                              </div>
                            );
                          }
                          return null;
                        }} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Modal para editar banner */}
          {showBannerEdit && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowBannerEdit(false)}>
              <div className="bg-white rounded-2xl p-8 shadow-2xl relative w-full max-w-md flex flex-col items-center" onClick={e => e.stopPropagation()}>
                <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setShowBannerEdit(false)}>
                  <IoMdClose />
                </button>
                <div className="flex flex-col items-center mb-4">
                  <div className="mb-2 text-gray-500"><FaUserEdit size={32} /></div>
                  <div className="text-xl font-bold mb-1">Cambiar banner del container</div>
                  <div className="text-xs text-gray-500 mb-2">Selecciona una imagen para el banner de fondo</div>
                </div>
                <label className="block w-full text-sm font-medium text-gray-700 mb-2 text-center cursor-pointer">
                  <span className="inline-block bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 transition">Seleccionar imagen</span>
                  <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
                </label>
                {/* Vista previa */}
                <div className="mt-4 flex flex-col items-center">
                  {containerBanner ? (
                    <img src={containerBanner} alt="preview-banner" className="w-40 h-24 object-cover rounded shadow" />
                  ) : (
                    <div className="w-40 h-24 rounded bg-gray-200 flex items-center justify-center text-lg text-gray-500">Sin banner</div>
                  )}
                  {selectedFile && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm text-gray-600">{selectedFile.name}</span>
                      <button onClick={clearSelectedFile} className="text-red-500 hover:text-red-700 text-xs border border-red-200 rounded px-2 py-1">Limpiar</button>
                    </div>
                  )}
                </div>
                <button className="btn-primary w-full mt-6 bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setShowBannerEdit(false)}>Guardar</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* Layout de team, duplicando el formato del perfil pero con info de teamInfo y teamMembers */}
          <div className="w-full max-w-6xl mt-2 relative">
            {/* Banner container para el equipo */}
            <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-white/30 bg-gray-800/90 backdrop-blur-md relative min-h-[384px] flex items-center justify-center">
              {teamBannerPreview || teamBanner ? (
                <img
                  src={teamBannerPreview || teamBanner}
                  alt="banner-team"
                  className="absolute inset-0 w-full h-full object-cover object-center z-0"
                />
              ) : (
                <div className="absolute inset-0 w-full h-full bg-gray-300 z-0" />
              )}
              <div className="relative z-10 w-full max-w-4xl mx-auto p-4 rounded-xl bg-white/80 shadow-lg min-h-[200px] flex flex-row items-center gap-6">
                <div className="grid grid-cols-2 gap-6 w-full items-start mt-0">
                  {/* Columna izquierda: avatar de equipo + insignias */}
                  <div className="flex flex-col items-center gap-4">
                    {/* Avatar de equipo en el container */}
                    <div className="relative w-40 h-40 flex items-center justify-center">
                      {teamAvatar ? (
                        <img src={teamAvatar} alt="avatar-equipo" className="w-24 h-24 rounded-full border-2 border-blue-400 object-cover z-10 bg-gray-300" />
                      ) : (
                        <div className="w-24 h-24 rounded-full border-2 border-blue-400 bg-gray-300 flex items-center justify-center z-10 text-5xl font-bold text-blue-700">
                          {teamInfo?.name ? teamInfo.name[0] : '?'}
                        </div>
                      )}
                      {/* Marco del equipo */}
                      {teamFrame ? (
                        <img src={teamFrame} alt="marco-equipo" className="absolute top-1/2 left-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />
                      ) : null}
                    </div>
                    <div className="flex gap-2 items-center mt-2">
                      <span className="text-2xl">🏆</span>
                      <span className="text-2xl">💎</span>
                      <span className="text-2xl">⭐</span>
                    </div>
                    <div className="flex flex-col gap-1 items-center mt-0 mb-2">
                      <span className="text-blue-600 text-xs">Miembros:</span>
                      <span className="text-lg font-bold text-blue-900">{teamInfo?.members || 0}</span>
                    </div>
                    {/* Botones de edición para el equipo */}
                    <div className="flex flex-col gap-1 items-center mt-0 mb-2">
                      <button
                        className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded shadow w-56 justify-center text-sm"
                        onClick={() => setShowTeamAvatarEdit(true)}
                      >
                        <FaUserEdit /> Editar foto de perfil
                      </button>
                      <button
                        className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded shadow w-56 justify-center text-sm"
                        onClick={() => setShowTeamFrameEdit(true)}
                      >
                        <FaUserEdit /> Agregar marco
                      </button>
                      <button
                        className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded shadow w-56 justify-center text-sm"
                        onClick={() => setShowTeamBannerEdit(true)}
                      >
                        <FaUserEdit /> Editar banner
                      </button>
                    </div>
                  </div>
                  {/* Columna derecha: info de equipo */}
                  <div className="flex flex-col items-center gap-2 w-full self-start">
                    <div className="text-2xl font-bold text-gray-900 text-center">{teamInfo?.name}</div>
                    <div className="text-base text-gray-600 font-medium flex items-center gap-2 justify-center">
                      Ranking: <span className="font-semibold text-blue-700">#{teamInfo?.rank || 1}</span>
                    </div>
                    <div className="flex gap-2 justify-center">
                      <span className="bg-yellow-300 text-yellow-900 px-2 py-1 rounded text-xs font-bold">
                        Top #{teamInfo ? teams.findIndex(t => t.name === teamInfo.name) + 1 : '?'} Equipo
                      </span>
                    </div>
                    {/* Radar chart o bloque equivalente */}
                    <div className="w-full max-w-sm">
                      {/* Aquí puedes poner el radar chart de equipo si existe, o cualquier otro bloque */}
                    </div>
                    {/* Miembros del equipo con scroll si no caben todos */}
                    <div className="w-full mt-4">
                      <div className="text-lg font-bold mb-2 text-blue-700">Miembros del equipo</div>
                      <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-2">
                        {teamMembers.map(member => (
                          <div key={member.id} className="flex items-center gap-2 bg-white/80 rounded-lg px-3 py-2 shadow text-sm font-medium">
                            <div className="relative w-8 h-8">
                              <span className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-700">
                                {member.avatar && typeof member.avatar === 'string' && (member.avatar.startsWith('http') || member.avatar.startsWith('blob:')) ? (
                                  <img src={member.avatar} alt="avatar" className="w-full h-full object-cover rounded-full" />
                                ) : (
                                  String(member.avatar ? member.avatar : member.name).charAt(0)
                                )}
                              </span>
                              {/* Si el miembro tiene frame, mostrarlo */}
                              {typeof (member as any).frame === 'string' && (member as any).frame && (
                                <img src={(member as any).frame} alt="marco" className="absolute left-1/2 top-1/2 w-10 h-10 object-cover pointer-events-none z-30 -translate-x-1/2 -translate-y-1/2" />
                              )}
                            </div>
                            <span>{member.name}</span>
                            <span className="text-xs text-gray-500">{typeof (member as any).role === 'string' ? (member as any).role : 'Miembro'}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Estadísticas rápidas (con animación y modal) */}
      <div className="w-full max-w-3xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-2 mb-6">
        {/* Reportes */}
        <div
          className="bg-black/80 text-white rounded-xl p-4 flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-105 hover:bg-black/90 group"
          onClick={() => { setModal('reports'); setModalMonth(''); }}
        >
          <div className="text-2xl font-bold group-hover:scale-110 transition-transform">{profileUser.stats.reports}</div>
          <div className="text-xs uppercase tracking-wider group-hover:scale-105 transition-transform">Reportes</div>
        </div>
        {/* Vulnerabilidades (ahora antes que puntos) */}
        <div
          className="bg-black/80 text-white rounded-xl p-4 flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-105 hover:bg-black/90 group"
          onClick={() => { setModal('vulns'); setModalMonth(''); }}
        >
          <div className="text-2xl font-bold group-hover:scale-110 transition-transform">{profileUser.stats.vulns}</div>
          <div className="text-xs uppercase tracking-wider group-hover:scale-105 transition-transform">Vulnerabilidades</div>
        </div>
        {/* Puntos (ahora después de vulnerabilidades) */}
        <div className="bg-black/80 text-white rounded-xl p-4 flex flex-col items-center">
          <div className="text-2xl font-bold">{profileUser.stats.points}</div>
          <div className="text-xs uppercase tracking-wider">Puntos</div>
        </div>
        {/* Duelos ganados */}
        <div
          className="bg-black/80 text-white rounded-xl p-4 flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-105 hover:bg-black/90 group"
          onClick={() => { setModal('duels'); setModalMonth(''); }}
        >
          <div className="text-2xl font-bold group-hover:scale-110 transition-transform">{profileUser.stats.duels}</div>
          <div className="text-xs uppercase tracking-wider group-hover:scale-105 transition-transform">Duelos</div>
        </div>
        {/* Efectividad */}
        <div className="bg-black/80 text-white rounded-xl p-4 flex flex-col items-center">
          <div className="text-2xl font-bold">{effectiveness}%</div>
          <div className="text-xs uppercase tracking-wider">Efectividad</div>
        </div>
      </div>
      {/* Historial de Vulnerabilidades Resueltas (NO CAMBIAR) */}
      <div
        className="w-full max-w-3xl bg-black/80 rounded-xl shadow-lg p-6 mt-2 mb-10 cursor-pointer transition-transform duration-200 hover:scale-105 group"
        onClick={() => { setModal('vulns'); setModalMonth(''); }}
      >
        <div className="text-lg font-bold text-white mb-4 group-hover:scale-105 transition-transform">Historial de Vulnerabilidades Resueltas</div>
        <div className="divide-y divide-gray-700">
          {profileUser.history.map(item => (
            <div key={item.id} className="flex items-center justify-between py-3 text-white group-hover:scale-105 transition-transform">
              <div className="flex-1">{item.name}</div>
              <div className="w-32 text-center text-gray-300">{item.date}</div>
              <div className="w-24 text-right font-bold text-green-400">+{item.points} pts</div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal grande para historial, reportes y duelos */}
      {modal && (
        <div 
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => { setModal(null); setModalMonth(''); }}
        >
          <div 
            className="bg-white rounded-xl p-8 shadow-2xl w-full max-w-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={() => { setModal(null); setModalMonth(''); }}
            >
              <IoMdClose />
            </button>
            {renderModalContent()}
          </div>
        </div>
      )}
      {/* Modal para editar avatar */}
      {showAvatarEdit && (
        <div 
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => {
            setAvatarPreview(avatar);
            setShowAvatarEdit(false);
          }}
        >
          <div 
            className="bg-white rounded-2xl p-8 shadow-2xl relative w-full max-w-md flex flex-col items-center"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={() => {
                setAvatarPreview(avatar);
                setShowAvatarEdit(false);
              }}
            >
              <IoMdClose />
            </button>
            <div className="flex flex-col items-center mb-4">
              <div className="mb-2 text-gray-500">
                <FaUserEdit size={40} />
              </div>
              <div className="text-xl font-bold mb-1">Cambiar foto de perfil</div>
              <div className="text-xs text-gray-500 mb-2">Sugerencia: abre la carpeta <span className="font-semibold">{`${projectBase}/img`}</span> para seleccionar tu foto</div>
            </div>
            <label className="block w-full text-sm font-medium text-gray-700 mb-2 text-center cursor-pointer">
              <span className="inline-block bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 transition">Seleccionar imagen</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarFileSelect}
                className="hidden"
              />
            </label>
            {/* Vista previa */}
            <div className="mt-4 flex flex-col items-center">
              <img
                src={selectedAvatarFile ? avatarPreview : avatar}

                
                className="w-24 h-24 rounded-full border-2 border-blue-400 object-cover bg-gray-200 shadow"
              />
              {selectedAvatarFile && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-gray-600">{selectedAvatarFile.name}</span>
                  <button
                    onClick={clearSelectedAvatarFile}
                    className="text-red-500 hover:text-red-700 text-xs border border-red-200 rounded px-2 py-1"
                  >
                    Limpiar
                  </button>
                </div>
              )}
            </div>
            <button
              className="btn-primary w-full mt-6"
              onClick={() => {
                // Actualiza el usuario global (mock) para que el Home lo vea
                const idx = users.findIndex(u => u.name === profileUser.name);
                if (idx !== -1) {
                  users[idx].avatar = avatarPreview;
                  setAvatar(avatarPreview);
                  setVersion(v => v + 1); // Fuerza re-render
                }
                setShowAvatarEdit(false);
              }}
            >Guardar</button>
          </div>
        </div>
      )}
      {/* Modal para editar marco */}
      {showFrameEdit && (
        <div 
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => {
            setFramePreview(profileUser.frame || '');
            setShowFrameEdit(false);
          }}
        >
          <div 
            className="bg-white rounded-2xl p-8 shadow-2xl relative w-full max-w-md flex flex-col items-center"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={() => {
                setFramePreview(profileUser.frame || '');
                setShowFrameEdit(false);
              }}
            >
              <IoMdClose />
            </button>
            <div className="flex flex-col items-center mb-4">
              <div className="mb-2 text-gray-500">
                <FaUserEdit size={32} />
              </div>
              <div className="text-xl font-bold mb-1">Agregar marco a la foto de perfil</div>
              <div className="text-xs text-gray-500 mb-2">Sugerencia: abre la carpeta <span className="font-semibold">{`${projectBase}/marco`}</span> para seleccionar tu marco</div>
            </div>
            <label className="block w-full text-sm font-medium text-gray-700 mb-2 text-center cursor-pointer">
              <span className="inline-block bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 transition">Seleccionar imagen</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFrameFileSelect}
                className="hidden"
              />
            </label>
            {/* Vista previa */}
            <div className="mt-4 flex flex-col items-center">
              {framePreview ? (
                <img
                  src={framePreview}
                  alt="preview-frame"
                  className="w-24 h-24 rounded-full object-cover border-2 border-blue-400"
                />
              ) : (
                <div className="w-24 h-24 rounded-full border-2 border-blue-400 bg-gray-200 flex items-center justify-center text-4xl text-gray-500">
                  
                </div>
              )}
              {selectedFrameFile && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-gray-600">{selectedFrameFile.name}</span>
                  <button
                    onClick={clearSelectedFrameFile}
                    className="text-red-500 hover:text-red-700 text-xs border border-red-200 rounded px-2 py-1"
                  >
                    Limpiar
                  </button>
                </div>
              )}
            </div>
            <button
              className="btn-primary w-full mt-6"
              onClick={() => {
                // Actualiza el usuario global (mock) para que el Home lo vea
                const idx = users.findIndex(u => u.name === profileUser.name);
                if (idx !== -1) {
                  users[idx].frame = framePreview;
                }
                setShowFrameEdit(false);
              }}
            >Guardar</button>
          </div>
        </div>
      )}
      {/* Modales para edición de equipo */}
      {showTeamAvatarEdit && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowTeamAvatarEdit(false)}>
          <div className="bg-white rounded-2xl p-8 shadow-2xl relative w-full max-w-md flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setShowTeamAvatarEdit(false)}>
              <IoMdClose />
            </button>
            <div className="flex flex-col items-center mb-4">
              <div className="mb-2 text-gray-500"><FaUserEdit size={32} /></div>
              <div className="text-xl font-bold mb-1">Cambiar foto de perfil del equipo</div>
              <div className="text-xs text-gray-500 mb-2">Selecciona una imagen para el avatar del equipo</div>
            </div>
            <label className="block w-full text-sm font-medium text-gray-700 mb-2 text-center cursor-pointer">
              <span className="inline-block bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 transition">Seleccionar imagen</span>
              <input type="file" accept="image/*" onChange={handleTeamAvatarFileSelect} className="hidden" />
            </label>
            <div className="mt-4 flex flex-col items-center">
              {teamAvatarPreview ? (
                <img src={teamAvatarPreview} alt="preview-team-avatar" className="w-24 h-24 rounded-full object-cover border-4 border-blue-400" />
              ) : teamAvatar ? (
                <img src={teamAvatar} alt="avatar-equipo" className="w-24 h-24 rounded-full object-cover border-4 border-blue-400" />
              ) : (
                <div className="w-24 h-24 rounded-full border-4 border-blue-400 bg-gray-200 flex items-center justify-center text-4xl text-gray-500">
                  {teamInfo?.name ? teamInfo.name[0] : '?'}
                </div>
              )}
              {teamAvatarPreview && (
                <button onClick={clearTeamAvatarPreview} className="mt-2 text-red-500 hover:text-red-700 text-xs border border-red-200 rounded px-2 py-1">Limpiar</button>
              )}
              {selectedTeamAvatarFile && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-gray-600">{selectedTeamAvatarFile.name}</span>
                </div>
              )}
            </div>
            <button className="btn-primary w-full mt-6 bg-blue-600 text-white px-4 py-2 rounded" onClick={() => {
              setTeamAvatar(teamAvatarPreview);
              setShowTeamAvatarEdit(false);
            }}>Guardar</button>
          </div>
        </div>
      )}
      {showTeamFrameEdit && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowTeamFrameEdit(false)}>
          <div className="bg-white rounded-2xl p-8 shadow-2xl relative w-full max-w-md flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setShowTeamFrameEdit(false)}>
              <IoMdClose />
            </button>
            <div className="flex flex-col items-center mb-4">
              <div className="mb-2 text-gray-500"><FaUserEdit size={32} /></div>
              <div className="text-xl font-bold mb-1">Agregar marco al equipo</div>
              <div className="text-xs text-gray-500 mb-2">Selecciona una imagen para el marco del equipo</div>
            </div>
            <label className="block w-full text-sm font-medium text-gray-700 mb-2 text-center cursor-pointer">
              <span className="inline-block bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 transition">Seleccionar imagen</span>
              <input type="file" accept="image/*" onChange={handleTeamFrameFileSelect} className="hidden" />
            </label>
            <div className="mt-4 flex flex-col items-center">
              {teamFramePreview ? (
                <img src={teamFramePreview} alt="preview-team-frame" className="w-24 h-24 rounded-full object-cover border-4 border-blue-400" />
              ) : teamFrame ? (
                <img src={teamFrame} alt="marco-equipo" className="w-24 h-24 rounded-full object-cover border-4 border-blue-400" />
              ) : (
                <div className="w-24 h-24 rounded-full border-4 border-blue-400 bg-gray-200 flex items-center justify-center text-4xl text-gray-500">
                  {teamInfo?.name ? teamInfo.name[0] : '?'}
                </div>
              )}
              {teamFramePreview && (
                <button onClick={clearTeamFramePreview} className="mt-2 text-red-500 hover:text-red-700 text-xs border border-red-200 rounded px-2 py-1">Limpiar</button>
              )}
              {selectedTeamFrameFile && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-gray-600">{selectedTeamFrameFile.name}</span>
                </div>
              )}
            </div>
            <button className="btn-primary w-full mt-6 bg-blue-600 text-white px-4 py-2 rounded" onClick={() => {
              setTeamFrame(teamFramePreview);
              setShowTeamFrameEdit(false);
            }}>Guardar</button>
          </div>
        </div>
      )}
      {showTeamBannerEdit && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowTeamBannerEdit(false)}>
          <div className="bg-white rounded-2xl p-8 shadow-2xl relative w-full max-w-md flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setShowTeamBannerEdit(false)}>
              <IoMdClose />
            </button>
            <div className="flex flex-col items-center mb-4">
              <div className="mb-2 text-gray-500"><FaUserEdit size={32} /></div>
              <div className="text-xl font-bold mb-1">Cambiar banner del equipo</div>
              <div className="text-xs text-gray-500 mb-2">Selecciona una imagen para el banner del equipo</div>
            </div>
            <label className="block w-full text-sm font-medium text-gray-700 mb-2 text-center cursor-pointer">
              <span className="inline-block bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 transition">Seleccionar imagen</span>
              <input type="file" accept="image/*" onChange={handleTeamBannerFileSelect} className="hidden" />
            </label>
            <div className="mt-4 flex flex-col items-center">
              {teamBannerPreview ? (
                <img src={teamBannerPreview} alt="preview-team-banner" className="w-40 h-24 object-cover rounded shadow" />
              ) : (
                <div className="w-40 h-24 rounded bg-gray-200 flex items-center justify-center text-lg text-gray-500">Sin banner</div>
              )}
              {selectedTeamBannerFile && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-gray-600">{selectedTeamBannerFile.name}</span>
                  <button onClick={clearSelectedTeamBannerFile} className="text-red-500 hover:text-red-700 text-xs border border-red-200 rounded px-2 py-1">Limpiar</button>
                </div>
              )}
            </div>
            <button className="btn-primary w-full mt-6 bg-blue-600 text-white px-4 py-2 rounded" onClick={() => {
              setTeamBanner(teamBannerPreview);
              setShowTeamBannerEdit(false);
            }}>Guardar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile; 