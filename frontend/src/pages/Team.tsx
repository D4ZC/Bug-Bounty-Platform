import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import Modal from '@/components/ui/Modal';

const TEAM_SECTIONS = {
  MEMBERS: 'members',
  ANALYTICS: 'analytics',
  COMPETITIONS: 'competitions',
};

const teamMembers = [
  { id: 1, name: 'Pedro Ramiro', role: 'Líder', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', badges: ['🏆', '🛡️'], bio: 'Especialista en ciberseguridad y líder del equipo.' },
  { id: 2, name: 'Ana Torres', role: 'Investigadora', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', badges: ['🔍', '💡'], bio: 'Experta en análisis de vulnerabilidades.' },
  { id: 3, name: 'Carlos Pérez', role: 'Analista', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', badges: ['📊'], bio: 'Analista de datos y métricas de seguridad.' },
  { id: 4, name: 'Lucía Gómez', role: 'Pentester', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', badges: ['🧑‍💻', '⚡'], bio: 'Pentester con experiencia en CTFs internacionales.' },
  { id: 5, name: 'Sofía Martínez', role: 'Desarrolladora', avatar: 'https://randomuser.me/api/portraits/women/12.jpg', badges: ['💻', '🚀'], bio: 'Desarrolladora fullstack y entusiasta de la seguridad.' },
  { id: 6, name: 'Miguel Ángel', role: 'DevOps', avatar: 'https://randomuser.me/api/portraits/men/21.jpg', badges: ['🔧', '☁️'], bio: 'DevOps y automatización de despliegues seguros.' },
  { id: 7, name: 'Valeria Soto', role: 'Red Team', avatar: 'https://randomuser.me/api/portraits/women/22.jpg', badges: ['🎯', '🕵️‍♀️'], bio: 'Especialista en Red Team y simulaciones de ataque.' },
  { id: 8, name: 'Luis Ortega', role: 'Blue Team', avatar: 'https://randomuser.me/api/portraits/men/56.jpg', badges: ['🔵', '🛡️'], bio: 'Defensa y monitoreo de incidentes.' },
];
const topPerformer = teamMembers[0];

const teamAnalytics = {
  totalPoints: 12450,
  reportsSubmitted: 87,
  bugsResolved: 65,
  competitionsWon: 3,
  avgResponseTime: '2.3 días',
};

const teamCompetitions = [
  { id: 1, name: 'CTF Primavera 2024', position: 1, date: '2024-04-15', achievement: '1er lugar' },
  { id: 2, name: 'Bug Bounty Fest', position: 2, date: '2024-03-10', achievement: '2do lugar' },
  { id: 3, name: 'Hackathon Invierno', position: 4, date: '2024-01-22', achievement: 'Top 5' },
];

const teamInfo = {
  name: 'Cyber Hunters',
  description: 'Equipo apasionado por la ciberseguridad, la colaboración y la mejora continua. Nuestra misión es proteger, aprender y compartir conocimiento en cada reto.',
  mission: 'Proteger sistemas y formar a la próxima generación de expertos.',
  vision: 'Ser referentes en la comunidad de seguridad hispana.',
  website: 'https://cyberhunters.dev',
  github: 'https://github.com/cyberhunters',
  discord: 'https://discord.gg/cyberhunters',
};
const teamRanking = {
  position: 3,
  totalTeams: 120,
  progress: 78, // % hacia el siguiente puesto
};
const teamProjects = [
  { id: 1, name: 'Plataforma de retos CTF', status: 'En curso', lead: 'Lucía Gómez' },
  { id: 2, name: 'Herramienta de escaneo OSINT', status: 'Finalizado', lead: 'Ana Torres' },
  { id: 3, name: 'Bot de notificaciones Discord', status: 'En curso', lead: 'Miguel Ángel' },
];
const teamAwards = [
  { id: 1, name: 'Top 3 Ranking Nacional', icon: '🥉', year: 2024 },
  { id: 2, name: 'Premio Innovación', icon: '💡', year: 2023 },
  { id: 3, name: 'Mejor equipo CTF', icon: '🏆', year: 2022 },
];
const teamActivity = [
  { id: 1, type: 'competencia', desc: 'Participó en CTF Primavera 2024', date: '2024-04-15' },
  { id: 2, type: 'reporte', desc: 'Nuevo reporte crítico enviado', date: '2024-04-10' },
  { id: 3, type: 'premio', desc: 'Ganó el premio Innovación', date: '2024-03-20' },
  { id: 4, type: 'miembro', desc: 'Se unió Valeria Soto al equipo', date: '2024-03-01' },
];

const Team: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [selected, setSelected] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [modalIdx, setModalIdx] = useState<number | null>(null);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteSuccess, setInviteSuccess] = useState(false);

  const renderMembers = () => (
    <div className="bg-white rounded-lg shadow-md p-8 mt-8">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">👥 Miembros del equipo</h2>
      {/* Top Performer */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg shadow flex items-center gap-4 animate-in fade-in duration-300">
        <img src={topPerformer.avatar} alt={topPerformer.name} className="w-14 h-14 rounded-full border-4 border-blue-300 shadow" />
        <div>
          <div className="font-bold text-lg text-blue-800 flex items-center gap-2">{topPerformer.name} <span className="text-xs bg-blue-200 text-blue-900 px-2 py-0.5 rounded-full ml-2">Top Performer</span></div>
          <div className="text-sm text-gray-700">{topPerformer.bio}</div>
        </div>
        <div className="ml-auto flex flex-col items-end">
          <span className="text-blue-700 font-bold">{topPerformer.role}</span>
          <span className="text-2xl">{topPerformer.badges.join(' ')}</span>
        </div>
      </div>
      <ul className="divide-y divide-gray-200">
        {teamMembers.map((member, idx) => (
          <li key={member.id} className={`flex flex-col md:flex-row md:items-center gap-4 py-3 transition-all ${expanded === idx ? 'bg-blue-50' : ''} cursor-pointer`} onClick={() => setExpanded(expanded === idx ? null : idx)}>
            <div className="flex items-center gap-4">
              <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full border-2 border-blue-200" />
              <div>
                <div className="font-semibold text-gray-900 flex items-center gap-2">{member.name} {member.badges && member.badges.map((b, i) => <span key={i} className="text-lg">{b}</span>)}</div>
                <div className="text-sm text-blue-600">{member.role}</div>
              </div>
            </div>
            {expanded === idx && (
              <div className="mt-2 ml-16 flex flex-col gap-2 animate-in fade-in duration-200">
                <div className="text-gray-700 text-sm mb-1">{member.bio}</div>
                <div className="flex gap-2">
                  <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-xs hover:bg-blue-200" onClick={e => { e.stopPropagation(); setModalIdx(idx); }}>Ver perfil</button>
                  <button className="bg-green-100 text-green-800 px-3 py-1 rounded text-xs hover:bg-green-200" onClick={e => { e.stopPropagation(); alert('Función de mensaje próximamente'); }}>Enviar mensaje</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <Modal open={modalIdx !== null} onClose={() => setModalIdx(null)}>
        {modalIdx !== null && (
          <div className="flex flex-col gap-3 min-w-[320px] max-w-[90vw]">
            <div className="flex items-center gap-3 mb-2">
              <img src={teamMembers[modalIdx].avatar} alt={teamMembers[modalIdx].name} className="w-16 h-16 rounded-full border-2 border-blue-200" />
              <div>
                <div className="font-bold text-blue-800 text-lg flex items-center gap-2">{teamMembers[modalIdx].name}</div>
                <div className="text-xs text-gray-500">{teamMembers[modalIdx].role}</div>
              </div>
              <span className="ml-auto text-2xl">{teamMembers[modalIdx].badges.join(' ')}</span>
            </div>
            <div className="text-base text-gray-900 mb-2">{teamMembers[modalIdx].bio}</div>
            <div className="flex items-center gap-2 mt-2">
              <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600" onClick={() => setModalIdx(null)}>Cerrar</button>
            </div>
          </div>
        )}
      </Modal>
      <button className="mt-6 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300" onClick={() => setSelected(null)}>Volver</button>
    </div>
  );

  const renderAnalytics = () => (
    <div className="bg-white rounded-lg shadow-md p-8 mt-8">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">📊 Métricas del equipo</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-blue-700 mb-1">{teamAnalytics.totalPoints}</span>
          <span className="text-gray-600 flex items-center gap-1">⭐ Puntos totales</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-green-700 mb-1">{teamAnalytics.reportsSubmitted}</span>
          <span className="text-gray-600 flex items-center gap-1">🐞 Reportes enviados</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-emerald-700 mb-1">{teamAnalytics.bugsResolved}</span>
          <span className="text-gray-600 flex items-center gap-1">🔧 Bugs resueltos</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-purple-700 mb-1">{teamAnalytics.competitionsWon}</span>
          <span className="text-gray-600 flex items-center gap-1">🏆 Competencias ganadas</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-orange-700 mb-1">{teamAnalytics.avgResponseTime}</span>
          <span className="text-gray-600 flex items-center gap-1">⏱️ Tiempo de respuesta promedio</span>
        </div>
      </div>
      <button className="mt-6 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300" onClick={() => setSelected(null)}>Volver</button>
    </div>
  );

  const renderCompetitions = () => (
    <div className="bg-white rounded-lg shadow-md p-8 mt-8">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">🏆 Competencias y logros</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Competencia</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Posición</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Logro</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {teamCompetitions.map(comp => (
            <tr key={comp.id} className={comp.position === 1 ? 'bg-yellow-50 font-bold' : comp.position === 2 ? 'bg-gray-50' : ''}>
              <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">{comp.name} {comp.position === 1 && <span className="text-yellow-500">🥇</span>} {comp.position === 2 && <span className="text-gray-400">🥈</span>} {comp.position === 3 && <span className="text-orange-400">🥉</span>}</td>
              <td className="px-6 py-4 whitespace-nowrap">{comp.position}</td>
              <td className="px-6 py-4 whitespace-nowrap">{comp.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">{comp.achievement}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-6 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300" onClick={() => setSelected(null)}>Volver</button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Equipo</h1>
      {/* Bloque descripción y enlaces */}
      <div className="mb-6 bg-white rounded-lg shadow p-6 flex flex-col md:flex-row md:items-center gap-6 animate-in fade-in duration-300">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-blue-800 mb-1">{teamInfo.name}</h2>
          <p className="text-gray-700 mb-2">{teamInfo.description}</p>
          <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
            <span><b>Misión:</b> {teamInfo.mission}</span>
            <span><b>Visión:</b> {teamInfo.vision}</span>
          </div>
          <div className="flex gap-3 mt-2">
            <a href={teamInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">🌐 Web</a>
            <a href={teamInfo.github} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:underline">🐙 GitHub</a>
            <a href={teamInfo.discord} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">💬 Discord</a>
          </div>
        </div>
        {/* Ranking visual */}
        <div className="flex flex-col items-center justify-center bg-blue-50 rounded-lg p-4 min-w-[180px]">
          <span className="text-4xl font-bold text-yellow-500 mb-1">#{teamRanking.position}</span>
          <span className="text-xs text-gray-600 mb-2">de {teamRanking.totalTeams} equipos</span>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${teamRanking.progress}%` }}></div>
          </div>
          <span className="text-xs text-gray-700">Progreso al siguiente puesto</span>
        </div>
      </div>
      {/* Proyectos activos */}
      <div className="mb-6 bg-white rounded-lg shadow p-6 animate-in fade-in duration-300">
        <h2 className="text-lg font-bold text-green-800 mb-3 flex items-center gap-2">🚀 Proyectos activos</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamProjects.map(p => (
            <li key={p.id} className="bg-green-50 rounded-lg p-4 shadow flex flex-col gap-2">
              <span className="font-semibold text-green-900 flex items-center gap-2">{p.name} {p.status === 'En curso' ? '🟢' : '✅'}</span>
              <span className="text-xs text-gray-600">Líder: {p.lead}</span>
              <span className={`text-xs rounded-full px-2 py-0.5 ${p.status === 'En curso' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-700'}`}>{p.status}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Reconocimientos */}
      <div className="mb-6 bg-white rounded-lg shadow p-6 animate-in fade-in duration-300">
        <h2 className="text-lg font-bold text-purple-800 mb-3 flex items-center gap-2">🏅 Reconocimientos</h2>
        <ul className="flex flex-wrap gap-4">
          {teamAwards.map(a => (
            <li key={a.id} className="flex flex-col items-center bg-purple-50 rounded-lg p-3 min-w-[120px]">
              <span className="text-3xl mb-1">{a.icon}</span>
              <span className="font-semibold text-purple-900 text-sm text-center">{a.name}</span>
              <span className="text-xs text-gray-500">{a.year}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Actividad reciente */}
      <div className="mb-8 bg-white rounded-lg shadow p-6 animate-in fade-in duration-300">
        <h2 className="text-lg font-bold text-indigo-800 mb-3 flex items-center gap-2">🕒 Actividad reciente</h2>
        <ul className="divide-y divide-gray-200">
          {teamActivity.map(a => (
            <li key={a.id} className="py-2 flex items-center gap-3 text-sm">
              <span className="text-xl">{a.type === 'competencia' ? '🏆' : a.type === 'reporte' ? '🐞' : a.type === 'premio' ? '🎖️' : '👤'}</span>
              <span className="text-gray-800">{a.desc}</span>
              <span className="ml-auto text-xs text-gray-500">{a.date}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Botón invitar */}
      <div className="mb-10 flex justify-end">
        <button className="bg-blue-600 text-white px-5 py-2 rounded shadow hover:bg-blue-700 transition" onClick={() => setInviteOpen(true)}>Invitar miembro</button>
      </div>
      <Modal open={inviteOpen} onClose={() => { setInviteOpen(false); setInviteSuccess(false); }}>
        {!inviteSuccess ? (
          <form className="flex flex-col gap-3 min-w-[260px] max-w-[90vw]" onSubmit={e => { e.preventDefault(); setInviteSuccess(true); setTimeout(() => { setInviteOpen(false); setInviteSuccess(false); setInviteName(''); setInviteEmail(''); }, 1500); }}>
            <h3 className="font-bold text-lg text-blue-800 mb-2">Invitar nuevo miembro</h3>
            <input className="border rounded px-3 py-2" placeholder="Nombre" value={inviteName} onChange={e => setInviteName(e.target.value)} required />
            <input className="border rounded px-3 py-2" placeholder="Correo electrónico" type="email" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} required />
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2" type="submit">Enviar invitación</button>
          </form>
        ) : (
          <div className="flex flex-col items-center gap-2 min-w-[200px]">
            <span className="text-3xl">✅</span>
            <p className="text-lg font-semibold text-center">¡Invitación enviada con éxito!</p>
          </div>
        )}
      </Modal>
      <p className="text-lg text-gray-600 mb-8">Gestión, métricas y logros del equipo</p>
      {!selected && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg border-2 border-blue-200 hover:border-blue-400 transition-all text-left"
            onClick={() => setSelected(TEAM_SECTIONS.MEMBERS)}
          >
            <h3 className="text-lg font-semibold text-blue-800 mb-2">👥 Miembros</h3>
            <p className="text-blue-700 text-sm">Gestión de miembros y roles</p>
          </button>
          <button
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg border-2 border-green-200 hover:border-green-400 transition-all text-left"
            onClick={() => setSelected(TEAM_SECTIONS.ANALYTICS)}
          >
            <h3 className="text-lg font-semibold text-green-800 mb-2">📊 Métricas</h3>
            <p className="text-green-700 text-sm">Estadísticas y métricas del equipo</p>
          </button>
          <button
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg border-2 border-purple-200 hover:border-purple-400 transition-all text-left"
            onClick={() => setSelected(TEAM_SECTIONS.COMPETITIONS)}
          >
            <h3 className="text-lg font-semibold text-purple-800 mb-2">🏆 Competencias</h3>
            <p className="text-purple-700 text-sm">Historial de competencias y logros</p>
          </button>
        </div>
      )}
      {selected === TEAM_SECTIONS.MEMBERS && renderMembers()}
      {selected === TEAM_SECTIONS.ANALYTICS && renderAnalytics()}
      {selected === TEAM_SECTIONS.COMPETITIONS && renderCompetitions()}
    </div>
  );
};

export default Team; 