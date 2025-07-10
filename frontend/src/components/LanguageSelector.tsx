import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { FiMenu } from 'react-icons/fi';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col items-end gap-2 relative">
      <div className="flex items-center gap-2">
        <button
          className={`px-3 py-1 rounded-md transition-colors ${
            language === 'es' 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
          }`}
          onClick={() => setLanguage('es')}
        >
          Español
        </button>
        <button
          className={`px-3 py-1 rounded-md transition-colors ${
            language === 'en' 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
          }`}
          onClick={() => setLanguage('en')}
        >
          English
        </button>
      </div>
      {/* Menú hamburguesa */}
      <button
        className="mt-1 p-2 rounded-md bg-blue-700 hover:bg-blue-800 text-white flex items-center justify-center"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Abrir menú"
      >
        <FiMenu size={22} />
      </button>
      {/* Dropdown del menú hamburguesa */}
      {menuOpen && (
        <div className="absolute right-0 top-16 bg-[#1E293B] border border-blue-900 rounded-lg shadow-lg min-w-[180px] py-2 z-50 animate-fade-in">
          {/* Aquí se renderizarán notificaciones y perfil desde el header */}
          <div className="flex flex-col gap-2 px-4 py-2">
            <button className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors" onClick={() => setMenuOpen(false)}>
              <span className="material-icons"></span> Notificaciones
            </button>
            <button className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors" onClick={() => setMenuOpen(false)}>
              <span className="material-icons"></span> Perfil
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector; 