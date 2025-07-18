import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MVPTeamCard: React.FC<{ team: any }> = ({ team }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full bg-[#181c24] rounded-xl shadow-lg border border-[#23273a] p-6 relative overflow-hidden cursor-pointer"
      initial={{ boxShadow: '0 0 40px 0 #FFD70044' }}
      animate={{ boxShadow: [
        '0 0 40px 0 #FFD70044',
        '0 0 80px 10px #FFD70088',
        '0 0 40px 0 #FFD70044',
      ] }}
      transition={{ repeat: Infinity, duration: 2 }}
      onClick={() => navigate(`/team/${encodeURIComponent(team.name)}`)}
    >
      <h2 className="text-2xl font-extrabold text-[#4fc3f7] mb-2 drop-shadow-lg">MVP TEAM</h2>
      <div className="flex flex-col items-center mb-4">
        <div className="relative w-32 h-32 mb-2 flex items-center justify-center">
          {/* Marco PNG si existe */}
          {team.selectedFrame && team.selectedFrame.startsWith('marco') && (
            <img src={`/marcos/${team.selectedFrame}.png`} alt="marco" className="absolute top-1/2 left-1/2 w-32 h-32 pointer-events-none select-none z-20" style={{ transform: 'translate(-50%, -50%)', objectFit: 'contain' }} />
          )}
          <img src={team.avatar} alt={team.name} className="w-28 h-28 rounded-full border-4 border-yellow-400 shadow-lg z-10 absolute top-1/2 left-1/2" style={{ transform: 'translate(-50%, -50%)' }} />
        </div>
        <motion.div
          className="text-3xl font-extrabold text-yellow-300 drop-shadow-lg mt-2"
          animate={{ scale: [1, 1.1, 1], textShadow: [
            '0 0 0px #FFD700',
            '0 0 24px #FFD700',
            '0 0 0px #FFD700',
          ] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {team.name}
        </motion.div>
        <div className="text-xl text-yellow-200 font-bold mt-1">{team.points} pts</div>
      </div>
    </motion.div>
  );
};

export default MVPTeamCard; 