import React, { useState } from 'react';

const VULNERABILITIES = [
  {
    id: 1,
    title: 'SQL Injection',
    description: 'Permite ejecutar comandos SQL arbitrarios en la base de datos.',
    difficulty: 'Critical',
    duelType: 'Team Duel',
    points: 50,
  },
  {
    id: 2,
    title: 'Cross-Site Scripting (XSS)',
    description: 'Permite inyectar scripts maliciosos en páginas vistas por otros usuarios.',
    difficulty: 'High',
    duelType: 'User Duel',
    points: 40,
  },
  {
    id: 3,
    title: 'CSRF',
    description: 'Permite realizar acciones en nombre de otro usuario sin su consentimiento.',
    difficulty: 'Medium',
    duelType: 'User Duel',
    points: 25,
  },
  {
    id: 4,
    title: 'Remote Code Execution (RCE)',
    description: 'Permite ejecutar código arbitrario en el servidor.',
    difficulty: 'Critical',
    duelType: 'Team Duel',
    points: 50,
  },
  {
    id: 5,
    title: 'Open Redirect',
    description: 'Permite redirigir a los usuarios a sitios externos maliciosos.',
    difficulty: 'Low',
    duelType: 'User Duel',
    points: 10,
  },
];

const TEAM_USERS = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'Diana' },
  { id: 5, name: 'Eve' },
];

const DIFFICULTY_COLORS: Record<string, string> = {
  Critical: 'bg-red-600 text-white',
  High: 'bg-orange-500 text-white',
  Medium: 'bg-yellow-400 text-gray-900',
  Low: 'bg-green-400 text-gray-900',
};

const Duels: React.FC = () => {
  const [selected, setSelected] = useState<typeof VULNERABILITIES[0] | null>(null);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [successMsg, setSuccessMsg] = useState('');

  // Simular envío de invitaciones (guardar en localStorage)
  const sendInvitations = () => {
    if (!selected) return;
    const now = new Date();
    const messages = selectedUsers.map(uid => ({
      id: Date.now() + Math.random(),
      from: 'system',
      subject: `Invitación a Team Duel: ${selected.title}`,
      content: `Has sido invitado a un Team Duel para la vulnerabilidad ${selected.title}. ¿Aceptas el reto?`,
      type: 'duel',
      read: false,
      trashed: false,
      date: now.toISOString().slice(0, 16).replace('T', ' '),
      to: uid,
    }));
    // Guardar en localStorage (acumular)
    const prev = JSON.parse(localStorage.getItem('messages') || '[]');
    localStorage.setItem('messages', JSON.stringify([...prev, ...messages]));
    setShowTeamModal(false);
    setSelected(null);
    setSelectedUsers([]);
    setSuccessMsg('Invitaciones enviadas correctamente.');
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      {successMsg && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-800 text-center font-semibold">{successMsg}</div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {VULNERABILITIES.map((vuln) => (
          <div
            key={vuln.id}
            className={`rounded-xl shadow-lg p-6 cursor-pointer transition transform hover:scale-105 bg-white dark:bg-gray-800 border border-transparent hover:border-blue-500 flex flex-col gap-2`}
            onClick={() => setSelected(vuln)}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${DIFFICULTY_COLORS[vuln.difficulty]}`}>{vuln.difficulty}</span>
              <span className="ml-auto px-2 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold">{vuln.duelType}</span>
            </div>
            <div className="font-bold text-lg text-gray-800 dark:text-gray-100">{vuln.title}</div>
            <div className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{vuln.description}</div>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">Puntos: <span className="font-bold">{vuln.points}</span></div>
          </div>
        ))}
      </div>
      {/* Modal de selección de duelo */}
      {selected && !showTeamModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-md relative">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold" onClick={() => setSelected(null)}>&times;</button>
            <div className="mb-2 flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${DIFFICULTY_COLORS[selected.difficulty]}`}>{selected.difficulty}</span>
              <span className="ml-auto px-2 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold">{selected.duelType}</span>
            </div>
            <div className="font-bold text-2xl mb-2 text-gray-800 dark:text-gray-100">{selected.title}</div>
            <div className="mb-4 text-gray-700 dark:text-gray-200">{selected.description}</div>
            <div className="mb-6 text-sm text-gray-500 dark:text-gray-400">Puntos en juego: <span className="font-bold">{selected.points}</span></div>
            <div className="flex gap-4">
              <button className="flex-1 px-4 py-2 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition">User Duel</button>
              <button className="flex-1 px-4 py-2 rounded bg-green-600 text-white font-bold hover:bg-green-700 transition" onClick={() => setShowTeamModal(true)}>Team Duel</button>
            </div>
          </div>
        </div>
      )}
      {/* Modal de invitación Team Duel */}
      {selected && showTeamModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-md relative">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold" onClick={() => { setShowTeamModal(false); setSelected(null); setSelectedUsers([]); }}>&times;</button>
            <div className="font-bold text-xl mb-4 text-gray-800 dark:text-gray-100">Invitar a tu equipo</div>
            <div className="mb-4 text-gray-600 dark:text-gray-300 text-sm">Selecciona al menos 3 integrantes (incluyéndote) para iniciar el Team Duel.</div>
            <div className="flex flex-col gap-2 mb-6">
              {TEAM_USERS.map(user => (
                <label key={user.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={e => {
                      if (e.target.checked) setSelectedUsers(prev => [...prev, user.id]);
                      else setSelectedUsers(prev => prev.filter(id => id !== user.id));
                    }}
                  />
                  <span className="text-gray-800 dark:text-gray-100">{user.name}</span>
                </label>
              ))}
            </div>
            <button
              className="w-full px-4 py-2 rounded bg-green-600 text-white font-bold hover:bg-green-700 transition disabled:opacity-50"
              disabled={selectedUsers.length < 3}
              onClick={sendInvitations}
            >
              Enviar invitaciones
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Duels; 