import React, { useState } from 'react';

const mvpUsers = [
  { id: 1, name: 'Ana Torres', points: 3200, avatar: 'https://randomuser.me/api/portraits/women/44.jpg', rank: 'Oro', acceptedReports: 18, recentAchievement: 'Top Hunter de la semana', badges: ['🏆', '🐞'], bio: 'Especialista en vulnerabilidades web y CTFs.' },
  { id: 2, name: 'Carlos Pérez', points: 2950, avatar: 'https://randomuser.me/api/portraits/men/32.jpg', rank: 'Plata', acceptedReports: 15, recentAchievement: 'Mayor número de likes', badges: ['👍', '💡'], bio: 'Analista de seguridad y mentor de nuevos miembros.' },
  { id: 3, name: 'Lucía Gómez', points: 2780, avatar: 'https://randomuser.me/api/portraits/women/68.jpg', rank: 'Bronce', acceptedReports: 13, recentAchievement: 'Reporte crítico aceptado', badges: ['🔍'], bio: 'Pentester y entusiasta de la automatización.' },
  { id: 4, name: 'Pedro Ramiro', points: 2650, avatar: 'https://randomuser.me/api/portraits/men/45.jpg', rank: 'Oro', acceptedReports: 12, recentAchievement: 'Desafío mensual completado', badges: ['🚀', '🛡️'], bio: 'Líder de equipo y formador en ciberseguridad.' },
  { id: 5, name: 'Sofía Martínez', points: 2500, avatar: 'https://randomuser.me/api/portraits/women/12.jpg', rank: 'Plata', acceptedReports: 11, recentAchievement: 'Mejor reporte de bug', badges: ['💻'], bio: 'Desarrolladora segura y bug hunter.' },
  { id: 6, name: 'Miguel Ángel', points: 2400, avatar: 'https://randomuser.me/api/portraits/men/21.jpg', rank: 'Bronce', acceptedReports: 10, recentAchievement: 'Participación destacada', badges: ['🔧', '☁️'], bio: 'DevOps y automatización de despliegues.' },
  { id: 7, name: 'Valeria Soto', points: 2300, avatar: 'https://randomuser.me/api/portraits/women/22.jpg', rank: 'Bronce', acceptedReports: 9, recentAchievement: 'Reconocimiento a la colaboración', badges: ['🤝'], bio: 'Red Team y colaboradora activa.' },
  { id: 8, name: 'Luis Ortega', points: 2250, avatar: 'https://randomuser.me/api/portraits/men/56.jpg', rank: 'Plata', acceptedReports: 8, recentAchievement: 'Mejor mentor del mes', badges: ['👨‍🏫'], bio: 'Mentor y defensor de buenas prácticas.' },
];

const rankColors: Record<string, string> = {
  'Oro': 'bg-yellow-200 text-yellow-800',
  'Plata': 'bg-gray-200 text-gray-700',
  'Bronce': 'bg-orange-200 text-orange-800',
};

const mvpStats = {
  total: mvpUsers.length,
  topPoints: mvpUsers[0].points,
  totalReports: mvpUsers.reduce((acc, u) => acc + u.acceptedReports, 0),
};

const medalIcons = ['🥇', '🥈', '🥉'];
const maxPoints = mvpUsers[0].points;

const globalAchievements = [
  { icon: '🏅', label: '100+ MVPs históricos' },
  { icon: '💬', label: '500+ comentarios positivos' },
  { icon: '🛡️', label: '0 incidentes de seguridad graves' },
];
const rankDistribution = [
  { label: 'Oro', value: 2, color: 'bg-yellow-300' },
  { label: 'Plata', value: 3, color: 'bg-gray-300' },
  { label: 'Bronce', value: 3, color: 'bg-orange-300' },
];
const mvpComments = [
  { user: 'Admin', text: '¡Felicidades a todos los MVPs por su dedicación y esfuerzo!' },
  { user: 'Ana Torres', text: 'Ser MVP es un honor, ¡gracias equipo!' },
  { user: 'Carlos Pérez', text: 'Motivación para seguir aprendiendo y colaborando.' },
];

const historicMVP = {
  name: 'Gabriel Mendoza',
  avatar: 'https://randomuser.me/api/portraits/men/60.jpg',
  years: [2022, 2023],
  points: 9000,
  badges: ['🏆', '🥇', '💡'],
  bio: 'MVP histórico, mentor y referente de la comunidad.'
};
const pointsEvolution = [
  { month: 'Ene', Ana: 2500, Carlos: 2200, Lucía: 2100 },
  { month: 'Feb', Ana: 2700, Carlos: 2300, Lucía: 2200 },
  { month: 'Mar', Ana: 2900, Carlos: 2500, Lucía: 2400 },
  { month: 'Abr', Ana: 3100, Carlos: 2700, Lucía: 2600 },
  { month: 'May', Ana: 3200, Carlos: 2950, Lucía: 2780 },
];
const mvpChallenges = [
  { id: 1, name: 'CTF Primavera', winner: 'Ana Torres', date: '2024-04-10', icon: '🌸' },
  { id: 2, name: 'Bug Bounty Fest', winner: 'Carlos Pérez', date: '2024-03-15', icon: '🐞' },
  { id: 3, name: 'Hackathon Invierno', winner: 'Lucía Gómez', date: '2024-01-22', icon: '❄️' },
];
const upcomingAwards = [
  { id: 1, name: 'MVP del semestre', desc: 'Premio especial al MVP más constante.', icon: '🏅', date: '2024-07-01' },
  { id: 2, name: 'Reconocimiento a la innovación', desc: 'Para el MVP con la mejor idea.', icon: '💡', date: '2024-08-15' },
];
const mvpFeedback = [
  { id: 1, text: '¡Gracias por el reconocimiento, me motiva a seguir!', user: 'Anónimo' },
  { id: 2, text: 'Ser MVP me ayudó a crecer profesionalmente.', user: 'Anónimo' },
  { id: 3, text: '¡La comunidad es lo mejor!', user: 'Anónimo' },
];

const MVP: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Banner motivacional */}
      <div className="mb-8 bg-gradient-to-r from-blue-200 via-green-100 to-yellow-100 rounded-lg shadow p-6 flex flex-col items-center animate-in fade-in duration-300">
        <span className="text-3xl mb-2">🚀</span>
        <span className="font-bold text-blue-900 text-xl mb-1">¡Sigue esforzándote, el próximo MVP puedes ser tú!</span>
        <span className="text-gray-700 text-sm text-center">Participa, colabora y destaca en la comunidad para alcanzar el reconocimiento.</span>
      </div>
      {/* MVP histórico */}
      <div className="mb-8 flex flex-col md:flex-row items-center gap-6 bg-yellow-50 rounded-lg shadow p-6 animate-in fade-in duration-300">
        <img src={historicMVP.avatar} alt={historicMVP.name} className="w-20 h-20 rounded-full border-4 border-yellow-400 shadow" />
        <div className="flex-1">
          <div className="font-bold text-lg text-yellow-800 flex items-center gap-2">{historicMVP.name} <span className="text-xs bg-yellow-200 text-yellow-900 px-2 py-0.5 rounded-full ml-2">MVP Histórico</span></div>
          <div className="text-sm text-gray-700 mb-1">{historicMVP.bio}</div>
          <div className="flex gap-2 mb-1">{historicMVP.badges.map((b, i) => <span key={i} className="text-2xl" title="Logro destacado">{b}</span>)}</div>
          <div className="text-xs text-gray-600">Años: {historicMVP.years.join(', ')} | Puntos: {historicMVP.points}</div>
        </div>
      </div>
      {/* Tabla de evolución de puntos (simulada) */}
      <div className="mb-8 bg-white rounded-lg shadow p-6 animate-in fade-in duration-300 overflow-x-auto">
        <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">📈 Evolución de puntos</h3>
        <table className="min-w-full text-xs">
          <thead>
            <tr>
              <th className="px-2 py-1">Mes</th>
              <th className="px-2 py-1">Ana</th>
              <th className="px-2 py-1">Carlos</th>
              <th className="px-2 py-1">Lucía</th>
            </tr>
          </thead>
          <tbody>
            {pointsEvolution.map((row, i) => (
              <tr key={i} className="text-center">
                <td className="px-2 py-1 font-bold text-gray-700">{row.month}</td>
                <td className="px-2 py-1">{row.Ana}</td>
                <td className="px-2 py-1">{row.Carlos}</td>
                <td className="px-2 py-1">{row.Lucía}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Cards de retos ganados */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {mvpChallenges.map(c => (
          <div key={c.id} className="bg-purple-50 rounded-lg p-4 flex flex-col items-center shadow animate-in fade-in duration-300">
            <span className="text-3xl mb-2">{c.icon}</span>
            <span className="font-bold text-purple-800 text-lg mb-1">{c.name}</span>
            <span className="text-purple-700 text-sm mb-1">Ganador: {c.winner}</span>
            <span className="text-xs text-gray-500">{c.date}</span>
          </div>
        ))}
      </div>
      {/* Próximos premios */}
      <div className="mb-8 bg-white rounded-lg shadow p-6 animate-in fade-in duration-300">
        <h3 className="text-lg font-bold text-orange-800 mb-3 flex items-center gap-2">🎁 Próximos premios</h3>
        <ul className="flex flex-wrap gap-4">
          {upcomingAwards.map(a => (
            <li key={a.id} className="flex flex-col items-center bg-orange-50 rounded-lg p-3 min-w-[160px]">
              <span className="text-3xl mb-1">{a.icon}</span>
              <span className="font-semibold text-orange-900 text-sm text-center">{a.name}</span>
              <span className="text-xs text-gray-500 mb-1">{a.date}</span>
              <span className="text-gray-700 text-xs text-center">{a.desc}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Feedback anónimo */}
      <div className="mb-8 bg-white rounded-lg shadow p-6 animate-in fade-in duration-300">
        <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">📝 Feedback anónimo</h3>
        <ul className="flex flex-col gap-2">
          {mvpFeedback.map(f => (
            <li key={f.id} className="bg-blue-50 rounded px-3 py-2 text-sm text-blue-900 flex items-center gap-2">
              <span className="italic">“{f.text}”</span>
              <span className="ml-auto text-xs text-gray-500">{f.user}</span>
            </li>
          ))}
        </ul>
      </div>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">🌟 Usuarios Destacados (MVP)</h2>
      {/* Logros globales */}
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-center">
        {globalAchievements.map((a, i) => (
          <div key={i} className="flex items-center gap-2 bg-green-50 rounded-full px-4 py-2 shadow text-green-800 font-semibold text-sm">
            <span className="text-xl">{a.icon}</span> {a.label}
          </div>
        ))}
      </div>
      {/* Gráfico circular de rangos (simulado) */}
      <div className="mb-8 flex flex-col items-center">
        <h3 className="text-lg font-bold text-purple-800 mb-2 flex items-center gap-2">🎯 Distribución de rangos</h3>
        <div className="relative w-32 h-32 mb-2">
          {/* Pie chart simulado con divs */}
          <div className="absolute w-32 h-32 rounded-full border-8 border-yellow-300" style={{ clipPath: 'inset(0 0 50% 0)' }}></div>
          <div className="absolute w-32 h-32 rounded-full border-8 border-gray-300" style={{ clipPath: 'inset(50% 0 0 0)' }}></div>
          <div className="absolute w-32 h-32 rounded-full border-8 border-orange-300" style={{ clipPath: 'inset(0 50% 0 0)' }}></div>
          <div className="absolute w-32 h-32 rounded-full border-8 border-white"></div>
        </div>
        <div className="flex gap-4 mt-1">
          {rankDistribution.map((r, i) => (
            <span key={i} className={`flex items-center gap-1 text-xs font-semibold ${r.color} px-2 py-0.5 rounded-full`}>{r.label}: {r.value}</span>
          ))}
        </div>
      </div>
      {/* Estadísticas MVP */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-2xl font-bold text-blue-700">{mvpStats.total}</span>
          <span className="text-xs text-gray-600">MVPs activos</span>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-2xl font-bold text-yellow-700">{mvpStats.topPoints}</span>
          <span className="text-xs text-gray-600">Puntos del top</span>
        </div>
        <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-2xl font-bold text-green-700">{mvpStats.totalReports}</span>
          <span className="text-xs text-gray-600">Reportes aceptados</span>
        </div>
      </div>
      {/* Gráfico de barras de puntos (simulado) */}
      <div className="mb-8 bg-white rounded-lg shadow p-6 animate-in fade-in duration-300">
        <h3 className="text-lg font-bold text-indigo-800 mb-3 flex items-center gap-2">📊 Distribución de puntos</h3>
        <ul className="flex flex-col gap-2">
          {mvpUsers.map((user, idx) => (
            <li key={user.id} className="flex items-center gap-2">
              <span className="w-24 truncate text-xs font-semibold text-gray-700">{user.name}</span>
              <div className="flex-1 bg-gray-100 rounded h-3 relative">
                <div className="bg-blue-400 h-3 rounded transition-all duration-500" style={{ width: `${(user.points / maxPoints) * 100}%` }}></div>
              </div>
              <span className="text-xs font-bold text-blue-700 ml-2">{user.points}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Cards de felicitación */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-100 rounded-lg p-4 flex flex-col items-center shadow animate-in fade-in duration-300">
          <span className="text-3xl mb-2">🎉</span>
          <span className="font-bold text-blue-800 text-lg mb-1">¡Enhorabuena MVPs!</span>
          <span className="text-blue-700 text-sm text-center">Reconocemos su esfuerzo y compromiso con la comunidad.</span>
        </div>
        <div className="bg-yellow-100 rounded-lg p-4 flex flex-col items-center shadow animate-in fade-in duration-300">
          <span className="text-3xl mb-2">🏆</span>
          <span className="font-bold text-yellow-800 text-lg mb-1">Premio especial</span>
          <span className="text-yellow-700 text-sm text-center">Los MVPs del mes recibirán una insignia exclusiva.</span>
        </div>
      </div>
      {/* Comentarios destacados */}
      <div className="mb-8 bg-white rounded-lg shadow p-6 animate-in fade-in duration-300">
        <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center gap-2">💬 Comentarios destacados</h3>
        <ul className="flex flex-col gap-2">
          {mvpComments.map((c, i) => (
            <li key={i} className="bg-green-50 rounded px-3 py-2 text-sm text-green-900 flex items-center gap-2">
              <span className="font-bold">{c.user}:</span> <span>{c.text}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mvpUsers.map((user, idx) => (
          <div key={user.id} className={`bg-white rounded-lg shadow-md p-6 flex flex-col items-center transition-all duration-200 hover:scale-[1.01] ${expanded === idx ? 'ring-2 ring-blue-300' : ''}`}
            onClick={() => setExpanded(expanded === idx ? null : idx)}>
            {/* Medalla para top 3 */}
            {idx < 3 && <span className="mb-2 text-2xl animate-bounce-slow">{medalIcons[idx]}</span>}
            <span className="mb-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">#{idx + 1}</span>
            <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full mb-3 border-2 border-blue-200 shadow-md" />
            <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">{user.name} {user.badges && user.badges.map((b, i) => <span key={i} className="text-lg animate-pulse-slow">{b}</span>)}</h3>
            <span className={`mb-2 px-3 py-1 rounded-full text-xs font-semibold ${rankColors[user.rank]}`}>{user.rank}</span>
            {/* Barra de progreso de puntos */}
            <div className="w-full bg-gray-100 rounded h-2 mb-2">
              <div className="bg-yellow-400 h-2 rounded transition-all duration-500" style={{ width: `${(user.points / maxPoints) * 100}%` }}></div>
            </div>
            <p className="text-blue-600 font-bold mb-1">{user.points} puntos</p>
            <p className="text-green-700 text-sm mb-1">{user.acceptedReports} reportes aceptados</p>
            <p className="text-gray-500 text-xs italic mb-2">{user.recentAchievement}</p>
            {expanded === idx && (
              <div className="mt-2 w-full flex flex-col items-center gap-2 animate-in fade-in duration-200">
                <div className="text-gray-700 text-sm mb-1 text-center">{user.bio}</div>
                <div className="flex gap-2 flex-wrap justify-center">
                  {user.badges && user.badges.map((b, i) => (
                    <span key={i} className="text-2xl" title="Logro destacado">{b}</span>
                  ))}
                </div>
                <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-xs hover:bg-blue-200 mt-2">Ver perfil</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <style>{`
        .animate-bounce-slow { animation: bounce 2s infinite; }
        .animate-pulse-slow { animation: pulse 2.5s infinite; }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
      `}</style>
    </div>
  );
};

export default MVP; 