import React from 'react';
import { motion } from 'framer-motion';

interface MVPUser {
  name: string;
  img: string;
  stats: any;
}

const MVPUserCard: React.FC<{ user: MVPUser }> = ({ user }) => (
  <motion.div
    className="flex flex-col items-center justify-center h-full bg-[#181c24] rounded-xl shadow-lg border border-[#23273a] p-6 relative overflow-hidden"
    initial={{ boxShadow: '0 0 40px 0 #38bdf844' }}
    animate={{ boxShadow: [
      '0 0 40px 0 #38bdf844',
      '0 0 80px 10px #38bdf888',
      '0 0 40px 0 #38bdf844',
    ] }}
    transition={{ repeat: Infinity, duration: 2 }}
  >
    <h2 className="text-2xl font-extrabold text-[#4fc3f7] mb-2 drop-shadow-lg">MVP USER</h2>
    <div className="mb-2 text-[#bfcfff]">Top 3 Teams</div>
    <motion.div
      className="w-16 h-16 bg-blue-400 rounded-full mb-2 flex items-center justify-center drop-shadow-lg"
      animate={{ scale: [1, 1.1, 1], boxShadow: [
        '0 0 0px #38bdf8',
        '0 0 32px #38bdf8',
        '0 0 0px #38bdf8',
      ] }}
      transition={{ repeat: Infinity, duration: 2 }}
    >
      {/* Aquí iría la imagen: <img src={user.img} ... /> */}
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

export default MVPUserCard; 