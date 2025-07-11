import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <nav className="w-full bg-[#181028] border-b-2 border-cyan-400 neon-shadow px-6 py-3 flex items-center gap-6">
        <Link to="/" className="text-2xl font-extrabold text-cyan-300 tracking-widest drop-shadow-cyber hover:text-pink-400 transition">BUGBOUNTY</Link>
        <Link to="/dashboard" className="text-cyan-200 font-bold hover:text-pink-400 transition">Dashboard</Link>
        <Link to="/shop" className="text-cyan-200 font-bold hover:text-pink-400 transition">Tienda</Link>
        <Link to="/leagues" className="text-cyan-200 font-bold hover:text-pink-400 transition">Ligas</Link>
        <Link to="/clans" className="text-cyan-200 font-bold hover:text-pink-400 transition">Clanes</Link>
        <Link to="/exercises" className="text-cyan-200 font-bold hover:text-pink-400 transition">Ejercicios</Link>
        <div className="ml-auto flex items-center gap-4">
          {isAuthenticated && user ? (
            <>
              <Link to="/profile" className="flex items-center gap-2 text-cyan-200 font-bold hover:text-pink-400 transition">
                {user.avatarUrl && <img src={user.avatarUrl} alt="avatar" className="w-8 h-8 rounded-full border-2 border-cyan-400" />}
                {user.username || 'Perfil'}
              </Link>
              <button onClick={handleLogout} className="bg-pink-600 text-white font-bold px-4 py-1 rounded-full hover:bg-pink-700 transition">Salir</button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-cyan-600 text-white font-bold px-4 py-1 rounded-full hover:bg-cyan-700 transition">Iniciar sesión</Link>
              <Link to="/register" className="bg-green-600 text-white font-bold px-4 py-1 rounded-full hover:bg-green-700 transition">Registrarse</Link>
            </>
          )}
        </div>
      </nav>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MainLayout;
