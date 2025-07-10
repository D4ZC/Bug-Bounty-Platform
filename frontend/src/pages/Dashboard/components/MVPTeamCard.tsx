import React from 'react';
import { motion } from 'framer-motion';

const MVPTeamCard: React.FC<{ team: string }> = ({ team }) => (
  <motion.div
    className="flex flex-col items-center justify-center h-full bg-[#181c24] rounded-xl shadow-lg border border-[#23273a] p-6 relative overflow-hidden"
    initial={{ boxShadow: '0 0 40px 0 #FFD70044' }}
    animate={{ boxShadow: [
      '0 0 40px 0 #FFD70044',
      '0 0 80px 10px #FFD70088',
      '0 0 40px 0 #FFD70044',
    ] }}
    transition={{ repeat: Infinity, duration: 2 }}
  >
    <h2 className="text-2xl font-extrabold text-[#4fc3f7] mb-2 drop-shadow-lg">MVP TEAM</h2>
    <motion.div
      className="text-4xl font-extrabold text-yellow-300 mb-4 drop-shadow-lg"
      animate={{ scale: [1, 1.1, 1], textShadow: [
        '0 0 0px #FFD700',
        '0 0 24px #FFD700',
        '0 0 0px #FFD700',
      ] }}
      transition={{ repeat: Infinity, duration: 2 }}
    >
      {team}
    </motion.div>
    <motion.div
      className="w-24 h-12 bg-yellow-300 rounded-b-full shadow-inner"
      animate={{ scale: [1, 1.1, 1], boxShadow: [
        '0 0 0px #FFD700',
        '0 0 32px #FFD700',
        '0 0 0px #FFD700',
      ] }}
      transition={{ repeat: Infinity, duration: 2 }}
    />
  </motion.div>
);

export default MVPTeamCard; 