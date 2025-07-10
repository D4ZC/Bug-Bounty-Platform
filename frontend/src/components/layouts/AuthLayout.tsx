import React from 'react';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-gray-100">
    {/* Barra superior negra */}
    <header className="w-full bg-black text-white py-3 px-6 flex items-center shadow">
      <span className="text-lg font-bold tracking-wide">Bug Bounty Platform</span>
    </header>
    <main className="flex-1 flex items-center justify-center">{children}</main>
  </div>
);

export default AuthLayout; 