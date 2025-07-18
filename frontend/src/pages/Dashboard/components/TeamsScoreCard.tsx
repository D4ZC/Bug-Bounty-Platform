import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface Team {
  name: string;
  score: number;
  members?: string[];
  cosmetics?: {
    bannerId?: string;
    frameId?: string;
    animatedName?: boolean;
  };
}

const mockTeams: Team[] = [
  {
    name: 'Piteritos I',
    score: 2000,
    members: ['Juan Pérez', 'Ana Torres', 'Carlos Ruiz'],
    cosmetics: {
      bannerId: 'lol-banner-1',
      frameId: 'frame-gold',
      animatedName: true,
    },
  },
  {
    name: 'Piteritos II',
    score: 1900,
    members: ['Luis Gómez', 'María López'],
  },
  {
    name: 'Piteritos III',
    score: 1500,
    members: ['Pedro Sánchez', 'Lucía Díaz'],
  },
];

const TeamsScoreCard: React.FC<{ teams?: Team[] }> = ({ teams = mockTeams }) => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col gap-2 bg-[#181c24] rounded-xl shadow-lg border border-[#23273a] p-4">
      <h2 className="text-2xl font-extrabold text-[#4fc3f7] tracking-wide mb-1">TEAMS SCORE</h2>
      <div className="font-bold text-[#bfcfff] text-base mb-2">Top 3 Teams</div>
      <ol className="flex-1 flex flex-col gap-1">
        {teams.map((team, idx) => (
          <li
            key={team.name}
            className={`flex justify-between items-center px-2 py-1 rounded-lg cursor-pointer group transition-all duration-200 ${idx === 0 ? 'bg-gradient-to-r from-yellow-400/20 via-yellow-100/10 to-yellow-400/20 shadow-lg border-l-4 border-yellow-400' : 'hover:bg-[#23273a]/60'}`}
            onClick={() => navigate(`/team/${encodeURIComponent(team.name)}`)}
          >
            {idx === 0 ? (
              <motion.span
                initial={{ scale: 1 }}
                animate={{
                  scale: [1, 1.1, 1],
                  textShadow: [
                    '0 0 0px #FFD700',
                    '0 0 16px #FFD700',
                    '0 0 0px #FFD700',
                  ],
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="font-extrabold text-lg text-yellow-300 flex items-center gap-2 drop-shadow-lg"
              >
                <span className="animate-pulse">{idx + 1}. {team.name}</span>
                {team.cosmetics?.bannerId && (
                  <span className="ml-2 px-2 py-1 rounded bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 animate-gradient-x text-xs font-bold shadow-lg border border-yellow-300">Banner</span>
                )}
                {team.cosmetics?.animatedName && (
                  <motion.span
                    animate={{ rotate: [0, 2, -2, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="ml-1 text-blue-400 font-extrabold"
                  >
                    ★
                  </motion.span>
                )}
              </motion.span>
            ) : (
              <span className="font-semibold text-[#bfcfff] text-base">{idx + 1}. {team.name}</span>
            )}
            <span className={`font-bold text-lg ${idx === 0 ? 'text-yellow-200' : 'text-[#bfcfff]'}`}>{team.points} pts</span>
          </li>
        ))}
      </ol>
      <AnimatePresence>
        {selectedTeam && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
          >
            <div className="bg-[#181c24] rounded-xl p-6 w-full max-w-md shadow-2xl border-2 border-[#23273a] relative">
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-2 text-[#4fc3f7]">
                {selectedTeam.name}
                {selectedTeam.cosmetics?.frameId && (
                  <span className="ml-2 px-2 py-1 rounded border-2 border-yellow-400 bg-yellow-100 animate-pulse text-xs font-bold">Marco especial</span>
                )}
              </h3>
              <div className="mb-2 text-[#bfcfff] font-semibold">Miembros:</div>
              <ul className="mb-4">
                {selectedTeam.members?.map((m, i) => (
                  <li key={i} className="text-[#e3eaff]">{m}</li>
                ))}
              </ul>
              <button
                className="mt-2 px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700"
                onClick={() => setSelectedTeam(null)}
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeamsScoreCard; 