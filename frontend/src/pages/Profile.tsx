import React from 'react';
import { FaMedal, FaTrophy, FaBug, FaFlagCheckered } from 'react-icons/fa';

const user = {
  avatar: 'https://i.pinimg.com/736x/23/8d/ad/238dad5a2186e67d9c11d47a50f5100d.jpg',
  nombre: 'Pedro Ramiro',
  nickname: 'bughunter',
  id: '157207692',
  guilda: 'AKA-SUKI',
  rango: 'Oro',
  puntos: 52450,
  ranking: 'Top 37%',
  porcentaje: 37,
  miembroDesde: '2023-01-15',
  insignias: [
    { icon: <FaMedal className="text-yellow-500" />, label: 'Oro' },
    { icon: <FaTrophy className="text-gray-400" />, label: 'Competidor' },
  ],
  marcasRecientes: [
    { icon: <FaBug className="text-green-600" />, label: '3 vulnerabilidades resueltas (últimos 7 días)' },
    { icon: <FaFlagCheckered className="text-blue-600" />, label: '2 desafíos completados (última semana)' },
    { icon: <FaTrophy className="text-yellow-600" />, label: 'Logro: "Primer Hallazgo"' },
  ],
};

const userStats = {
  bugs: 27,
  challenges: 12,
  likes: 54,
  rank: 37,
};

const activityBars = [
  { label: 'Reportes', value: 27, color: 'bg-blue-400' },
  { label: 'Desafíos', value: 12, color: 'bg-green-400' },
  { label: 'Likes', value: 54, color: 'bg-yellow-400' },
];

const specialAchievements = [
  { icon: <FaTrophy className="text-yellow-500" />, label: 'MVP del mes', desc: 'Reconocido por la comunidad en mayo 2024.' },
  { icon: <FaFlagCheckered className="text-blue-600" />, label: 'CTF Winner', desc: 'Ganador del CTF Primavera.' },
];

const profileFeedback = [
  { id: 1, text: '¡Gran colaborador y siempre dispuesto a ayudar!', user: 'Admin' },
  { id: 2, text: 'Sus reportes son claros y útiles.', user: 'Ana Torres' },
];

const socialLinks = [
  { icon: '🐦', label: 'Twitter', url: 'https://twitter.com/bughunter' },
  { icon: '💼', label: 'LinkedIn', url: 'https://linkedin.com/in/bughunter' },
  { icon: '💬', label: 'Discord', url: 'https://discord.gg/bughunter' },
];

const globalAchievements = [
  { icon: '🏅', label: '50+ bugs resueltos' },
  { icon: '💬', label: '100+ comentarios positivos' },
  { icon: '🛡️', label: '0 incidentes graves' },
];
const activityPie = [
  { label: 'Reportes', value: 27, color: 'bg-blue-400' },
  { label: 'Desafíos', value: 12, color: 'bg-green-400' },
  { label: 'Likes', value: 54, color: 'bg-yellow-400' },
];
const userChallenges = [
  { id: 1, name: 'CTF Primavera', result: 'Ganado', date: '2024-04-10', icon: '🌸' },
  { id: 2, name: 'Bug Bounty Fest', result: 'Finalista', date: '2024-03-15', icon: '🐞' },
];
const upcomingGoals = [
  { id: 1, name: 'Top 10%', desc: 'Alcanza el top 10% del ranking global.', icon: '🏆' },
  { id: 2, name: '20 bugs resueltos', desc: 'Resuelve 20 bugs en total.', icon: '🐞' },
];
const profileTestimonials = [
  { id: 1, text: 'Pedro es un ejemplo de constancia y calidad.', user: 'Carlos Pérez' },
  { id: 2, text: 'Siempre aporta soluciones creativas.', user: 'Lucía Gómez' },
];

const Profile: React.FC = () => {
  const maxActivity = Math.max(...activityBars.map(a => a.value));
  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Banner motivacional */}
      <div className="mb-8 bg-gradient-to-r from-blue-200 via-green-100 to-yellow-100 rounded-lg shadow p-6 flex flex-col items-center animate-in fade-in duration-300">
        <span className="text-3xl mb-2">🚀</span>
        <span className="font-bold text-blue-900 text-xl mb-1">¡Sigue participando y sube en el ranking!</span>
        <span className="text-gray-700 text-sm text-center">Tu actividad y colaboración hacen crecer la comunidad.</span>
      </div>
      <div className="bg-white rounded-lg shadow-md p-8 flex flex-col gap-6">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b pb-4">
          <div className="flex items-center gap-4">
            <img src={user.avatar} alt="avatar" className="w-16 h-16 rounded-full border-4 border-blue-200" />
            <div>
              <h2 className="text-2xl font-bold mb-1">{user.nombre}</h2>
              <span className="text-blue-600 font-semibold">{user.nickname}</span>
            </div>
          </div>
          <div className="flex flex-col md:items-end">
            <span className="text-gray-500 text-sm">ID: {user.id}</span>
            <span className="text-gray-500 text-sm">Nickname: {user.guilda}</span>
          </div>
        </div>

        {/* Rango y puntos */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">
              <FaMedal className="text-yellow-500 mr-1" />
              {user.rango}
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">{user.puntos} puntos</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">{user.ranking}</span>
            <span className="text-xs text-gray-400">({user.porcentaje} porciento)</span>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center shadow">
            <span className="text-2xl font-bold text-blue-700">{userStats.bugs}</span>
            <span className="text-xs text-gray-600">Reportes</span>
          </div>
          <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center shadow">
            <span className="text-2xl font-bold text-green-700">{userStats.challenges}</span>
            <span className="text-xs text-gray-600">Desafíos</span>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 flex flex-col items-center shadow">
            <span className="text-2xl font-bold text-yellow-700">{userStats.likes}</span>
            <span className="text-xs text-gray-600">Likes</span>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 flex flex-col items-center shadow">
            <span className="text-2xl font-bold text-purple-700">Top {userStats.rank}%</span>
            <span className="text-xs text-gray-600">Ranking global</span>
          </div>
        </div>

        {/* Gráfico de barras de actividad */}
        <div className="mb-6 bg-white rounded-lg shadow p-6 animate-in fade-in duration-300">
          <h3 className="text-lg font-bold text-indigo-800 mb-3 flex items-center gap-2">📊 Actividad reciente</h3>
          <ul className="flex flex-col gap-2">
            {activityBars.map((a, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-20 truncate text-xs font-semibold text-gray-700">{a.label}</span>
                <div className="flex-1 bg-gray-100 rounded h-3 relative">
                  <div className={`${a.color} h-3 rounded transition-all duration-500`} style={{ width: `${maxActivity ? (a.value / maxActivity) * 100 : 0}%` }}></div>
                </div>
                <span className="text-xs font-bold text-blue-700 ml-2">{a.value}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Logros especiales */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {specialAchievements.map((a, i) => (
            <div key={i} className="bg-yellow-50 rounded-lg p-4 flex flex-col items-center shadow animate-in fade-in duration-300">
              <span className="text-3xl mb-2">{a.icon}</span>
              <span className="font-bold text-yellow-800 text-lg mb-1">{a.label}</span>
              <span className="text-yellow-700 text-sm text-center">{a.desc}</span>
            </div>
          ))}
        </div>

        {/* Feedback */}
        <div className="mb-6 bg-white rounded-lg shadow p-6 animate-in fade-in duration-300">
          <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center gap-2">💬 Feedback de la comunidad</h3>
          <ul className="flex flex-col gap-2">
            {profileFeedback.map(f => (
              <li key={f.id} className="bg-green-50 rounded px-3 py-2 text-sm text-green-900 flex items-center gap-2">
                <span className="italic">“{f.text}”</span>
                <span className="ml-auto text-xs text-gray-500">{f.user}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Redes sociales */}
        <div className="mb-6 flex flex-wrap gap-4 items-center justify-center">
          {socialLinks.map((s, i) => (
            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-blue-50 rounded-full px-4 py-2 shadow text-blue-800 font-semibold text-sm hover:bg-blue-100">
              <span className="text-xl">{s.icon}</span> {s.label}
            </a>
          ))}
        </div>

        {/* Insignias */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Insignias</h3>
          <div className="flex gap-4">
            {user.insignias.map((insignia, idx) => (
              <div key={idx} className="flex flex-col items-center">
                {insignia.icon}
                <span className="text-xs text-gray-500 mt-1">{insignia.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Marcas recientes */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Logros recientes</h3>
          <div className="flex flex-col gap-2">
            {user.marcasRecientes.map((marca, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-gray-50 rounded px-3 py-2">
                {marca.icon}
                <span className="text-sm text-gray-700">{marca.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Miembro desde */}
        <div className="text-sm text-gray-400 text-right">Miembro desde: {user.miembroDesde}</div>
      </div>
      {/* Logros globales */}
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-center">
        {globalAchievements.map((a, i) => (
          <div key={i} className="flex items-center gap-2 bg-green-50 rounded-full px-4 py-2 shadow text-green-800 font-semibold text-sm">
            <span className="text-xl">{a.icon}</span> {a.label}
          </div>
        ))}
      </div>
      {/* Gráfico circular de actividad (simulado) */}
      <div className="mb-8 flex flex-col items-center">
        <h3 className="text-lg font-bold text-purple-800 mb-2 flex items-center gap-2">🎯 Distribución de actividad</h3>
        <div className="relative w-32 h-32 mb-2 flex items-center justify-center">
          {/* Pie chart simulado con divs */}
          <div className="absolute w-32 h-32 rounded-full border-8 border-blue-400" style={{ clipPath: 'inset(0 0 50% 0)' }}></div>
          <div className="absolute w-32 h-32 rounded-full border-8 border-green-400" style={{ clipPath: 'inset(50% 0 0 0)' }}></div>
          <div className="absolute w-32 h-32 rounded-full border-8 border-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }}></div>
          <div className="absolute w-32 h-32 rounded-full border-8 border-white"></div>
          {/* Imagen centrada */}
          <img src={user.avatar} alt="avatar" className="absolute w-16 h-16 rounded-full object-cover border-4 border-white shadow" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
        </div>
        <div className="flex gap-4 mt-1">
          {activityPie.map((r, i) => (
            <span key={i} className={`flex items-center gap-1 text-xs font-semibold ${r.color} px-2 py-0.5 rounded-full`}>{r.label}: {r.value}</span>
          ))}
        </div>
      </div>
      {/* Cards de retos ganados */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {userChallenges.map(c => (
          <div key={c.id} className="bg-purple-50 rounded-lg p-4 flex flex-col items-center shadow animate-in fade-in duration-300">
            <span className="text-3xl mb-2">{c.icon}</span>
            <span className="font-bold text-purple-800 text-lg mb-1">{c.name}</span>
            <span className="text-purple-700 text-sm mb-1">{c.result}</span>
            <span className="text-xs text-gray-500">{c.date}</span>
          </div>
        ))}
      </div>
      {/* Próximos objetivos */}
      <div className="mb-8 bg-white rounded-lg shadow p-6 animate-in fade-in duration-300">
        <h3 className="text-lg font-bold text-orange-800 mb-3 flex items-center gap-2">🎯 Próximos objetivos</h3>
        <ul className="flex flex-wrap gap-4">
          {upcomingGoals.map(a => (
            <li key={a.id} className="flex flex-col items-center bg-orange-50 rounded-lg p-3 min-w-[160px]">
              <span className="text-3xl mb-1">{a.icon}</span>
              <span className="font-semibold text-orange-900 text-sm text-center">{a.name}</span>
              <span className="text-gray-700 text-xs text-center">{a.desc}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Testimonios */}
      <div className="mb-8 bg-white rounded-lg shadow p-6 animate-in fade-in duration-300">
        <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">💬 Testimonios</h3>
        <ul className="flex flex-col gap-2">
          {profileTestimonials.map(f => (
            <li key={f.id} className="bg-blue-50 rounded px-3 py-2 text-sm text-blue-900 flex items-center gap-2">
              <span className="italic">“{f.text}”</span>
              <span className="ml-auto text-xs text-gray-500">{f.user}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Cards de felicitación */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-100 rounded-lg p-4 flex flex-col items-center shadow animate-in fade-in duration-300">
          <span className="text-3xl mb-2">🎉</span>
          <span className="font-bold text-blue-800 text-lg mb-1">¡Sigue así!</span>
          <span className="text-blue-700 text-sm text-center">Tu progreso es motivo de orgullo para la comunidad.</span>
        </div>
        <div className="bg-yellow-100 rounded-lg p-4 flex flex-col items-center shadow animate-in fade-in duration-300">
          <span className="text-3xl mb-2">🏆</span>
          <span className="font-bold text-yellow-800 text-lg mb-1">Reconocimiento</span>
          <span className="text-yellow-700 text-sm text-center">¡Estás cerca de tu próximo logro!</span>
        </div>
      </div>
    </div>
  );
};

export default Profile; 