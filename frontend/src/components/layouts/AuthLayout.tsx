import React from 'react';
import { Bell, User } from 'lucide-react';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-transparent flex flex-col items-center justify-center">
    <header className="w-full bg-softGray-dark flex items-center justify-between px-6 h-16">
      <div className="flex items-center gap-4">
        <button aria-label="Notificaciones" className="text-gray-700 hover:text-primaryBlue-dark transition-colors">
          <Bell size={24} />
        </button>
        <button aria-label="Perfil" className="text-gray-700 hover:text-primaryBlue-dark transition-colors">
          <User size={24} />
        </button>
      </div>
      <span className="ml-auto font-sans text-lg font-bold tracking-wide text-gray-800" style={{ fontFamily: 'Arial, sans-serif' }}>
        BUG BOUNTY PLATAFORM
      </span>
    </header>
    {children}
  </div>
);

export default AuthLayout; 