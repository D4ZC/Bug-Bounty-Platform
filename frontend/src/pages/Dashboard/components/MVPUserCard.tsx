import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MVPUserCard: React.FC<{ user: any }> = ({ user }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full bg-[#181c24] rounded-xl shadow-lg border border-[#23273a] p-6 relative overflow-hidden cursor-pointer"
      initial={{ boxShadow: '0 0 40px 0 #38bdf844' }}
      animate={{ boxShadow: [
        '0 0 40px 0 #38bdf844',
        '0 0 80px 10px #38bdf888',
        '0 0 40px 0 #38bdf844',
      ] }}
      transition={{ repeat: Infinity, duration: 2 }}
      onClick={() => navigate(`/profile/${encodeURIComponent(user.name)}`)}
    >
      <h2 className="text-2xl font-extrabold text-[#4fc3f7] mb-2 drop-shadow-lg">MVP USER</h2>
      <div className="flex flex-col items-center mb-4">
        <div className="relative w-32 h-32 mb-2 flex items-center justify-center">
          {/* Marco PNG si existe */}
          {user.selectedFrame && user.selectedFrame.startsWith('marco') && (
            <img src={`/marcos/${user.selectedFrame}.png`} alt="marco" className="absolute top-1/2 left-1/2 w-32 h-32 pointer-events-none select-none z-20" style={{ transform: 'translate(-50%, -50%)', objectFit: 'contain' }} />
          )}
          <img src={user.avatar} alt={user.name} className="w-28 h-28 rounded-full shadow-lg z-10 absolute top-1/2 left-1/2" style={{ transform: 'translate(-50%, -50%)' }} />
        </div>
        <motion.div
          className="text-2xl font-extrabold text-blue-200 drop-shadow-lg mt-2"
          animate={{ scale: [1, 1.1, 1], textShadow: [
            '0 0 0px #38bdf8',
            '0 0 24px #38bdf8',
            '0 0 0px #38bdf8',
          ] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {user.name}
        </motion.div>
        <div className="text-xl text-blue-300 font-bold mt-1">{user.points} pts</div>
      </div>
    </motion.div>
  );
};

export default MVPUserCard; 