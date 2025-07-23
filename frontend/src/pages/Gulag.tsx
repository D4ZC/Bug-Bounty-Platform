import React, { useEffect, useState } from 'react';
import GulagUserCard from '../components/gulag/GulagUserCard';
import GulagConsequences from '../components/gulag/GulagConsequences';
import { gulagUsers, gulagTeams, gulagTimer } from '../mocks/gulag';
import { FaLock, FaExclamationTriangle } from 'react-icons/fa';
import * as DiceBear from '@dicebear/avatars';
import * as Identicon from '@dicebear/avatars-identicon-sprites';

const initialTimer = { ...gulagTimer };

const Gulag: React.FC = () => {
  const [timer, setTimer] = useState(initialTimer);
  const [users] = useState(gulagUsers);
  const [teams] = useState(gulagTeams);

  // Simulación de temporizador en "tiempo real"
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        let { days, hours, minutes } = prev;
        if (minutes > 0) minutes--;
        else if (hours > 0) { hours--; minutes = 59; }
        else if (days > 0) { days--; hours = 23; minutes = 59; }
        return { days, hours, minutes };
      });
    }, 1000 * 60); // cada minuto
    return () => clearInterval(interval);
  }, []);

  // Generar avatares si faltan
  const usersWithAvatars = users.map((u) => ({
    ...u,
    avatar: u.avatar || `data:image/svg+xml;utf8,${encodeURIComponent(new DiceBear.default(Identicon.default).create(u.name))}`,
  }));
  const teamsWithAvatars = teams.map((t) => ({
    ...t,
    avatar: t.avatar || `data:image/svg+xml;utf8,${encodeURIComponent(new DiceBear.default(Identicon.default).create(t.name))}`,
  }));

  // Usuario actual
  const currentUser = usersWithAvatars.find((u) => u.isCurrentUser);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-900/40 p-6 flex flex-col gap-6">
      {/* Cabecera Superior */}
      <div className="flex justify-between items-center mb-4 border-b-2 border-red-700 pb-2">
        <h1 className="text-4xl font-extrabold text-red-600 tracking-widest drop-shadow-lg animate-pulse">GULAG</h1>
        <div className="flex items-center gap-3">
          <img src={currentUser?.avatar} alt="avatar" className="w-12 h-12 rounded-full border-4 border-red-600 shadow-lg animate-pulse" />
          <div className="flex flex-col">
            <span className="text-white font-bold">{currentUser?.name}</span>
            <span className="flex items-center gap-1 text-red-400 font-mono animate-pulse">
              <FaLock /> ESTADO: RECLUIDO
            </span>
          </div>
        </div>
      </div>
      {/* Panel Central: Informe de Sentencia */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold text-red-500 mb-2 border-b border-red-700">INFORME DE SENTENCIA</h2>
          <div className="flex items-center gap-2 mb-4">
            <FaExclamationTriangle className="text-red-400 text-2xl" />
            <span className="text-white font-semibold">MOTIVO: INCUMPLIMIENTO DE [REGLA X] - Bajo rendimiento en resolución de vulnerabilidades.</span>
          </div>
          <div className="bg-gray-900/80 border border-red-700 rounded-xl p-4 mb-4">
            <h3 className="text-lg font-bold text-red-400 mb-2">DESAFÍO OBLIGATORIO: PRUEBA DE REDENCIÓN</h3>
            <div className="text-2xl text-white font-bold mb-2">RESUELVE LA MAYOR CANTIDAD DE VULNERABILIDADES</div>
            {/* Ranking de usuarios */}
            <div className="mt-4">
              <h4 className="text-lg font-bold text-red-300 mb-2">Ranking de Usuarios</h4>
              <div className="flex flex-col gap-2">
                {usersWithAvatars.map((u, idx) => (
                  <GulagUserCard
                    key={u.id}
                    avatar={u.avatar}
                    name={u.name}
                    vulnerabilities={u.vulnerabilities}
                    isCurrentUser={u.isCurrentUser}
                    position={idx + 1}
                  />
                ))}
              </div>
            </div>
            {/* Ranking de equipos */}
            <div className="mt-8">
              <h4 className="text-lg font-bold text-red-300 mb-2">Ranking de Equipos</h4>
              <div className="flex flex-col gap-2">
                {teamsWithAvatars.map((t, idx) => (
                  <div key={t.id} className="flex items-center gap-3 p-3 rounded-lg border-2 border-red-400 bg-gray-800/40 mb-2 shadow-lg">
                    <span className="font-bold text-lg w-6 text-center text-red-400">{idx + 1}</span>
                    <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full border-2 border-red-500" />
                    <span className="font-semibold text-white">{t.name}</span>
                    <span className="ml-auto flex items-center gap-1 text-neon-green font-mono text-lg">
                      {t.vulnerabilities} <span className="text-xs">VULN</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <span className="text-white font-bold">TIEMPO RESTANTE:</span>
              <span className="text-2xl font-mono text-red-400 animate-pulse">
                {timer.days}D {timer.hours}H {timer.minutes}M
              </span>
            </div>
            <button className="mt-6 bg-red-700 text-white font-bold py-2 rounded-lg w-full transition-all hover:brightness-125 flex items-center justify-center gap-2 text-lg">
              <FaLock /> ACCEDER A VULNERABILIDADES
            </button>
          </div>
        </div>
        {/* Panel Lateral/Inferior: Consecuencias */}
        <div className="md:col-span-1">
          <GulagConsequences defeats={currentUser?.defeats || 0} />
        </div>
      </div>
    </div>
  );
};

export default Gulag; 