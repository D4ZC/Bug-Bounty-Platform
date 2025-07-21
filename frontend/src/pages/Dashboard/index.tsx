import React, { useState } from 'react';

// Tipos para los mocks
interface VulnerabilityItem {
  name: string;
  description: string;
  problem: string;
  howDetected: string;
  images: string[];
}

interface Vulnerability {
  type: string;
  generalDescription: string;
  discoveredBy: string;
  difficulties: {
    [key: string]: VulnerabilityItem[];
  };
}

interface Project {
  id: string;
  name: string;
  vulnerabilities: Vulnerability[];
}

// Mock de datos de proyectos con vulnerabilidades
const PROJECTS: Project[] = [
  {
    id: 'project-1',
    name: 'Acme Web Platform',
    vulnerabilities: [
      {
        type: 'SQL Injection',
        generalDescription: 'Permite inyectar código SQL en los formularios de login.',
        discoveredBy: 'Pentest automatizado OWASP Zap',
        difficulties: {
          Low: [
            {
              name: 'SQLi básica',
              description: 'La función debería sanitizar los inputs, pero no lo hace.',
              problem: 'No se usa ningún método de escape en los parámetros.',
              howDetected: 'Se detectó al ingresar comillas simples en el campo usuario.',
              images: [],
            },
          ],
          High: [
            {
              name: 'SQLi avanzada',
              description: 'La función debería validar roles, pero permite acceso a datos sensibles.',
              problem: 'No hay separación de privilegios en las consultas.',
              howDetected: 'Se detectó usando payloads avanzados.',
              images: [],
            },
          ],
        },
      },
      {
        type: 'XSS',
        generalDescription: 'Permite inyectar scripts en los comentarios.',
        discoveredBy: 'Revisión manual de código',
        difficulties: {
          Medium: [
            {
              name: 'XSS reflejado',
              description: 'La función debería escapar el HTML, pero lo renderiza directamente.',
              problem: 'No se usa escape en los comentarios.',
              howDetected: 'Se detectó al ingresar <script>alert(1)</script>.',
              images: [],
            },
          ],
        },
      },
      {
        type: 'CSRF',
        generalDescription: 'Permite realizar acciones sin el consentimiento del usuario.',
        discoveredBy: 'Herramienta Burp Suite',
        difficulties: {
          Critical: [
            {
              name: 'CSRF en transferencias',
              description: 'La función debería requerir token CSRF, pero no lo valida.',
              problem: 'No hay protección CSRF en endpoints críticos.',
              howDetected: 'Se detectó enviando peticiones desde otro dominio.',
              images: [],
            },
          ],
        },
      },
    ],
  },
];

const DIFFICULTY_LABELS = ['Low', 'Medium', 'High', 'Critical'];

// Datos base para equipos y usuarios
const TEAM_NAMES = [
  'Data',
  'Apps',
  'Storage',
  'NLP Services',
  'Image Recognition Services',
];

// Generar datos de ejemplo para equipos y usuarios
function generateTeamsAndUsers() {
  const teams = TEAM_NAMES.map((name, idx) => {
    // Cada equipo tendrá 10 usuarios
    const users = Array.from({ length: 10 }, (_, i) => {
      const points = Math.floor(Math.random() * 200) + 50;
      const resolutions = Math.floor(Math.random() * 40) + 10;
      return {
        id: `${name}-user${i + 1}`,
        username: `${name}_user${i + 1}`,
        avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${name}_user${i + 1}`,
        team: name,
        points,
        resolutions,
      };
    });
    // Sumar puntos y resoluciones del equipo
    const totalPoints = users.reduce((acc, u) => acc + u.points, 0);
    const totalResolutions = users.reduce((acc, u) => acc + u.resolutions, 0);
    return {
      id: `team-${idx}`,
      name,
      avatar: `https://api.dicebear.com/7.x/shapes/svg?seed=${name}`,
      users,
      points: totalPoints,
      resolutions: totalResolutions,
    };
  });
  // Unir todos los usuarios en un solo array
  const allUsers = teams.flatMap(t => t.users);
  return { teams, allUsers };
}

// Icono de calavera (SVG)
const SkullIcon = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" fill="#fff"/>
    <ellipse cx="12" cy="15" rx="6" ry="4" fill="#e11d48"/>
    <circle cx="9" cy="12" r="1.2" fill="#222"/>
    <circle cx="15" cy="12" r="1.2" fill="#222"/>
    <rect x="10.5" y="16" width="3" height="1.2" rx="0.6" fill="#222"/>
  </svg>
);

const { teams, allUsers } = generateTeamsAndUsers();

// MVP Team: equipo con más resoluciones
const mvpTeam = teams.reduce((max, t) => t.resolutions > max.resolutions ? t : max, teams[0]);

// MVP User por equipo: usuario con más resoluciones de cada equipo
const mvpUsers = teams.map(team => {
  const user = team.users.reduce((max, u) => u.resolutions > max.resolutions ? u : max, team.users[0]);
  return { ...user, team: team.name };
});

// Rankings ordenados por puntos
const sortedTeams = [...teams].sort((a, b) => b.points - a.points);
const sortedUsers = [...allUsers].sort((a, b) => b.points - a.points);
// Peores 5 usuarios para el Gulag, ordenados de mayor a menor dentro de los 5 con menos puntos
const gulagUsers = [...allUsers]
  .sort((a, b) => a.points - b.points)
  .slice(0, 5)
  .sort((a, b) => b.points - a.points);

const Dashboard: React.FC = () => {
  // Estado para la pestaña activa
  const [activeTab, setActiveTab] = useState<'team' | 'score_team' | 'score_user' | 'gulag'>('team');
  // Estado para activar/desactivar Gulag
  const [isGulagActive, setIsGulagActive] = useState(false);

  // Estado para modal de vulnerabilidades
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [modalDifficulty, setModalDifficulty] = useState<string | null>(null);
  const [modalVulnType, setModalVulnType] = useState<string | null>(null);

  // Función para abrir el modal
  const openVulnModal = (project: Project, difficulty: string) => {
    setModalProject(project);
    setModalDifficulty(difficulty);
    setModalVulnType(null);
  };
  // Función para cerrar el modal
  const closeVulnModal = () => {
    setModalProject(null);
    setModalDifficulty(null);
    setModalVulnType(null);
  };

  return (
    <div className="dashboard-container w-full max-w-7xl mx-auto px-2 md:px-6 py-6">
      {/* MVPs arriba */}
      <div className="mvps-section flex flex-col md:flex-row gap-4 mb-8">
        {/* MVP Team */}
        <div className="mvp-team-card flex-1 p-6 border-4 border-yellow-600 rounded-2xl bg-gray-800 dark:bg-gray-900 dark:border-yellow-600 shadow-lg flex flex-col items-center justify-center min-h-[260px] max-w-xs mx-auto md:mx-0 mvp-gold-card">
          <div className="font-bold text-2xl text-yellow-600 dark:text-yellow-400 mb-2">🏆 MVP Team</div>
          <img src={mvpTeam.avatar} alt={mvpTeam.name} className="w-20 h-20 rounded-full my-2 border-2 border-yellow-300 dark:border-yellow-500" />
          <div className="font-extrabold text-2xl mb-1 text-gray-900 dark:text-white uppercase tracking-wide gold-text">{mvpTeam.name}</div>
          <div className="text-base text-gray-600 dark:text-gray-300">Resolutions: <span className="font-bold">{mvpTeam.resolutions}</span></div>
        </div>
        {/* MVP Users */}
        <div className="mvp-users-cards flex-[2] grid grid-cols-2 md:grid-cols-5 gap-4">
          {mvpUsers.map(user => (
            <div key={user.id} className="mvp-user-card flex flex-col items-center justify-center p-3 border border-yellow-600 dark:border-yellow-600 rounded-xl bg-gray-800 dark:bg-gray-900 shadow min-h-[140px] max-w-[140px] transition-colors duration-300 mvp-gold-card">
              <div className="font-bold text-yellow-600 dark:text-yellow-400 mb-1">MVP User</div>
              <img src={user.avatar} alt={user.username} className="w-12 h-12 rounded-full my-1 border border-yellow-200 dark:border-yellow-700" />
              <div className="text-sm font-semibold text-gray-800 dark:text-gray-100 gold-text">{user.username}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{user.team}</div>
              <div className="text-xs text-gray-700 dark:text-gray-300">Resolutions: <span className="font-bold">{user.resolutions}</span></div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs de ranking */}
      <div className="ranking-tabs">
        <div className="tabs-header flex gap-2 mb-4">
          <button
            className={`tab px-4 py-2 rounded-t-lg font-semibold transition-colors duration-150 ${
              activeTab === 'team'
                ? 'bg-blue-200 dark:bg-blue-700 text-blue-900 dark:text-blue-100 shadow'
                : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800'
            }`}
            onClick={() => setActiveTab('team')}
          >
            Team
          </button>
          <button
            className={`tab px-4 py-2 rounded-t-lg font-semibold transition-colors duration-150 ${
              activeTab === 'score_team'
                ? 'bg-gray-200 dark:bg-gray-700 text-blue-700 dark:text-blue-300 shadow'
                : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
            onClick={() => setActiveTab('score_team')}
          >
            Score Team
          </button>
          <button
            className={`tab px-4 py-2 rounded-t-lg font-semibold transition-colors duration-150 ${
              activeTab === 'score_user'
                ? 'bg-gray-200 dark:bg-gray-700 text-blue-700 dark:text-blue-300 shadow'
                : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
            onClick={() => setActiveTab('score_user')}
          >
            Score User
          </button>
          <button
            className={`tab px-4 py-2 rounded-t-lg font-semibold transition-colors duration-150 ${
              isGulagActive
                ? activeTab === 'gulag'
                  ? 'bg-red-200 dark:bg-red-700 text-red-800 dark:text-red-200 shadow'
                  : 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800'
                : 'bg-gray-50 dark:bg-gray-900 text-gray-400 cursor-not-allowed opacity-60'
            }`}
            onClick={() => isGulagActive && setActiveTab('gulag')}
            disabled={!isGulagActive}
          >
            Gulag
          </button>
        </div>
        <div className="tabs-content bg-gray-100 dark:bg-gray-800 rounded-b-xl shadow p-4 min-h-[320px] transition-colors duration-300">
          {/* Team Tab */}
          {activeTab === 'team' && (
            <div className="tab-panel grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROJECTS.map((project) => {
                // Mock para deployment
                const lastDeployment = '26 days ago';
                const deploymentName = 'nodejs-v20-npm-container-image - v1';
                // Total de vulnerabilidades
                const totalVulns = project.vulnerabilities.reduce((acc, v) => {
                  return acc + DIFFICULTY_LABELS.reduce((sum, diff) => sum + ((v.difficulties[diff] || []).length), 0);
                }, 0);
                // Conteo por dificultad
                const difficultyCounts = DIFFICULTY_LABELS.map(diff =>
                  project.vulnerabilities.reduce((acc, v) => acc + ((v.difficulties[diff] || []).length), 0)
                );
                return (
                  <div key={project.id} className="project-card bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col gap-4 min-w-[320px]">
                    {/* Nombre del proyecto */}
                    <div className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">{project.name}</div>
                    {/* Fila de dificultades */}
                    <div className="flex w-full justify-between mb-2">
                      {DIFFICULTY_LABELS.map((diff, idx) => (
                        <div key={diff} className="flex flex-col items-center flex-1">
                          <span className="text-xs text-gray-500 mb-1">{diff}</span>
                          <button
                            className="text-lg font-semibold text-gray-900 dark:text-gray-100 focus:outline-none"
                            onClick={() => openVulnModal(project, diff)}
                            disabled={difficultyCounts[idx] === 0}
                            style={{ cursor: difficultyCounts[idx] === 0 ? 'not-allowed' : 'pointer', opacity: difficultyCounts[idx] === 0 ? 0.5 : 1 }}
                          >
                            {difficultyCounts[idx]}
                          </button>
                        </div>
                      ))}
                    </div>
                    {/* Fila de totales y deployment */}
                    <div className="flex w-full justify-between text-sm text-gray-700 dark:text-gray-300 mb-1">
                      <div>Total vulnerabilities</div>
                      <div className="font-semibold">{totalVulns}</div>
                    </div>
                    <div className="flex w-full justify-between text-sm text-gray-700 dark:text-gray-300 mb-1">
                      <div>Last deployment</div>
                      <div>{lastDeployment}</div>
                    </div>
                    {/* Nombre de la imagen/deployment */}
                    <div className="text-xs text-gray-500 mt-2">{deploymentName}</div>
                  </div>
                );
              })}
            </div>
          )}
          {/* Score Team */}
          {activeTab === 'score_team' && (
            <div className="tab-panel">
              <ol className="space-y-3">
                {sortedTeams.map((team, idx) => (
                  <li
                    key={team.id}
                    className={`flex items-center gap-4 p-3 rounded-lg border transition-all ${
                      team.id === mvpTeam.id
                        ? 'border-yellow-400 bg-gray-100 dark:bg-yellow-900/30 shadow-md'
                        : 'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900'
                    }`}
                  >
                    {/* Medalla (placeholder) */}
                    <div className="w-8 h-8 flex items-center justify-center">
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : null}
                    </div>
                    <img src={team.avatar} alt={team.name} className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                    <div className="flex-1">
                      <div className="font-bold text-lg text-gray-800 dark:text-gray-100 flex items-center gap-2">
                        {team.name}
                        {team.id === mvpTeam.id && (
                          <span className="ml-1 text-yellow-500" title="MVP Team">🏆</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Puntos: <span className="font-semibold">{team.points}</span></div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
          {/* Score User */}
          {activeTab === 'score_user' && (
            <div className="tab-panel">
              <ol className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {sortedUsers.slice(0, 50).map((user, idx) => (
                  <li
                    key={user.id}
                    className={`flex items-center gap-4 p-3 rounded-lg border transition-all
                      ${mvpUsers.some(mvp => mvp.id === user.id)
                        ? 'border-yellow-400 bg-gray-100 dark:bg-yellow-900/30 shadow-md'
                        : 'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900'}
                      ${idx < 10 ? 'opacity-100' : 'opacity-50'}
                    `}
                  >
                    {/* Medalla (placeholder) */}
                    <div className="w-8 h-8 flex items-center justify-center">
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : null}
                    </div>
                    <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                    <div className="flex-1">
                      <div className="font-bold text-base text-gray-800 dark:text-gray-100 flex items-center gap-2">
                        {user.username}
                        {mvpUsers.some(mvp => mvp.id === user.id) && (
                          <span className="ml-1 text-yellow-500" title="MVP User">⭐</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Equipo: {user.team}</div>
                      <div className="text-sm text-gray-700 dark:text-gray-300">Puntos: <span className="font-semibold">{user.points}</span></div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
          {/* Gulag */}
          {activeTab === 'gulag' && (
            <div className="tab-panel">
              {/* Banner de alarma rojo (mockup) */}
              <div className="gulag-banner flex items-center gap-2 bg-red-600 text-white font-bold px-4 py-2 rounded mb-4 shadow animate-pulse">
                <span>🚨</span> The Gulag is Active: Bottom 5 users this week!
              </div>
              <ol className="space-y-3">
                {gulagUsers.map((user, idx) => (
                  <li
                    key={user.id}
                    className="flex items-center gap-4 p-3 rounded-lg border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/40 text-red-900 dark:text-red-100 shadow"
                  >
                    <div className="w-8 h-8 flex items-center justify-center">{idx + 1}</div>
                    <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full border-2 border-red-200 dark:border-red-700" />
                    <div className="flex-1">
                      <div className="font-bold text-base">{user.username}</div>
                      <div className="text-xs">Equipo: {user.team}</div>
                      <div className="text-sm">Puntos: {user.points}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>

      {/* Modal de vulnerabilidades */}
      {modalProject && modalDifficulty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex relative">
            {/* Sidebar de tipos de vulnerabilidad */}
            <div className="w-64 bg-gray-100 dark:bg-gray-800 rounded-l-2xl p-4 overflow-y-auto">
              <div className="font-bold mb-4">Vulnerability Types</div>
              <ul className="space-y-2">
                {modalProject.vulnerabilities.filter((v: Vulnerability) => (v.difficulties[modalDifficulty] || []).length > 0).map((v: Vulnerability) => (
                  <li key={v.type}>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-lg font-semibold transition ${modalVulnType === v.type ? 'bg-blue-200 dark:bg-blue-700' : 'hover:bg-blue-100 dark:hover:bg-blue-700'}`}
                      onClick={() => setModalVulnType(v.type)}
                    >
                      {v.type}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Panel de detalles */}
            <div className="flex-1 p-0 overflow-y-auto relative flex flex-col">
              {/* Header del modal con botón de cerrar */}
              <div className="flex items-center justify-end px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <button
                  className="rounded-full bg-gray-100 dark:bg-gray-800 text-2xl font-bold text-gray-500 hover:text-red-600 hover:bg-gray-200 dark:hover:bg-gray-700 w-10 h-10 flex items-center justify-center focus:outline-none"
                  onClick={closeVulnModal}
                  aria-label="Close modal"
                >
                  &times;
                </button>
              </div>
              <div className="flex-1 p-6 overflow-y-auto">
                {!modalVulnType && (
                  <div className="text-gray-500 dark:text-gray-400 flex items-center justify-center h-full">Select a vulnerability type from the sidebar.</div>
                )}
                {modalVulnType && (() => {
                  const vuln = modalProject.vulnerabilities.find((v) => v.type === modalVulnType);
                  const vulnList = vuln ? (vuln.difficulties[modalDifficulty] || []) : [];
                  return (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xl font-bold">{vuln?.type}</div>
                        {/* Contador de vulnerabilidades por dificultad */}
                        <div className="flex gap-2">
                          {DIFFICULTY_LABELS.map((diff) => (
                            <span key={diff} className={`px-2 py-1 rounded text-xs font-semibold ${diff === modalDifficulty ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}>
                              {diff}: {vuln ? (vuln.difficulties[diff] || []).length : 0}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mb-2 text-gray-700 dark:text-gray-200">{vuln?.generalDescription}</div>
                      <div className="mb-2 text-gray-500 dark:text-gray-400 text-sm">Discovered by: {vuln?.discoveredBy}</div>
                      <div className="mb-4">
                        <div className="font-semibold mb-1">Vulnerabilities ({modalDifficulty}):</div>
                        <ul className="space-y-3">
                          {vulnList.length === 0 && <li className="text-gray-400">No vulnerabilities of this difficulty.</li>}
                          {vulnList.map((vulnItem: VulnerabilityItem, idx: number) => (
                            <li key={idx} className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
                              <div className="font-bold text-base mb-1">{vulnItem.name}</div>
                              <div className="mb-1"><span className="font-semibold">Description:</span> {vulnItem.description}</div>
                              <div className="mb-1"><span className="font-semibold">Problem:</span> {vulnItem.problem}</div>
                              <div className="mb-1"><span className="font-semibold">How detected:</span> {vulnItem.howDetected}</div>
                              {vulnItem.images && vulnItem.images.length > 0 && (
                                <div className="mt-2 flex gap-2 flex-wrap">
                                  {vulnItem.images.map((img, i) => (
                                    <img key={i} src={img} alt="evidence" className="w-24 h-24 object-cover rounded border" />
                                  ))}
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botón flotante para activar/desactivar Gulag */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-red-600 hover:bg-red-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-red-300"
        title={isGulagActive ? 'Desactivar Gulag' : 'Activar Gulag'}
        onClick={() => setIsGulagActive((prev) => !prev)}
      >
        <span className="sr-only">Activar/Desactivar Gulag</span>
        <SkullIcon />
      </button>
    </div>
  );
};

export default Dashboard; 
