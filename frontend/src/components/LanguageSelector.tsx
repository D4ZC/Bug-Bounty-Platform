import React, { useState, useRef, useEffect } from 'react';

const LANGUAGES = [
  { code: 'ESP', label: 'Español' },
  { code: 'US', label: 'Inglés' },
];

const LanguageSelector: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(LANGUAGES[0]);
  const ref = useRef<HTMLDivElement>(null);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // Animación: fade y slide
  return (
    <div className="relative" ref={ref}>
      <button
        className="flex items-center gap-2 focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 text-white text-sm font-bold border border-gray-600 shadow-md transition-all select-none">
          {selected.code}
        </span>
        <svg
          className={`w-4 h-4 text-white transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {/* Menú desplegable */}
      <div
        className={`absolute left-0 mt-2 w-28 rounded-lg bg-black shadow-lg z-50 overflow-hidden transition-all duration-200
          ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}
        `}
        style={{ border: '1px solid #444' }}
        role="listbox"
      >
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            className={`w-full px-4 py-2 text-left text-white text-sm hover:bg-gray-700 transition-colors font-semibold ${selected.code === lang.code ? 'bg-gray-700' : ''}`}
            onClick={() => {
              setSelected(lang);
              setOpen(false);
            }}
            role="option"
            aria-selected={selected.code === lang.code}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector; 