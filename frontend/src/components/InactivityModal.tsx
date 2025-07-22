import React from 'react';

const InactivityModal: React.FC<{ open: boolean }> = ({ open }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-gray-900 text-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center border-2 border-blue-500/50">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">Sesión finalizada por inactividad</h2>
        <p className="text-gray-300 mb-2">Por tu seguridad, te hemos desconectado tras un periodo de inactividad.</p>
        <p className="text-gray-400 text-sm">Por favor, inicia sesión nuevamente para continuar.</p>
      </div>
    </div>
  );
};

export default InactivityModal; 