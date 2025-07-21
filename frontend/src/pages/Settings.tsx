import React, { useState, useEffect } from 'react';

const SIDEBAR_FONT_SIZES = [
  { label: 'Small', value: 'text-xs' },
  { label: 'Medium', value: 'text-base' },
  { label: 'Large', value: 'text-lg' },
];

const APP_COLORS = [
  { label: 'White', value: 'white' },
  { label: 'Black', value: 'black' },
  { label: 'Grey', value: 'grey' },
];

const GREY_VARIANTS = [
  { label: 'Sidebar/Topbar Dark, Content Light', value: 'grey-darkbar' },
  { label: 'Sidebar/Topbar Light, Content Dark', value: 'grey-lightbar' },
];

const getUserId = () => localStorage.getItem('userId') || 'default';
const getSettingsKey = () => `settings_${getUserId()}`;

const getInitialSettings = () => {
  const stored = localStorage.getItem(getSettingsKey());
  if (stored) return JSON.parse(stored);
  return {
    sidebarFontSize: 'text-base',
    appColor: 'white',
    greyVariant: 'grey-darkbar',
  };
};

const Settings: React.FC = () => {
  const [showSidebarSize, setShowSidebarSize] = useState(false);
  const [showColor, setShowColor] = useState(false);
  const [showGreyVariant, setShowGreyVariant] = useState(false);
  const [settings, setSettings] = useState(getInitialSettings());
  const [pending, setPending] = useState(getInitialSettings());
  const [showFade, setShowFade] = useState(false);

  // Detectar cambios
  const hasChanges = JSON.stringify(settings) !== JSON.stringify(pending);

  // Guardar settings en localStorage
  const saveSettings = () => {
    setShowFade(true);
    setTimeout(() => {
      setSettings(pending);
      localStorage.setItem(getSettingsKey(), JSON.stringify(pending));
      setShowFade(false);
      window.dispatchEvent(new Event('settings-updated'));
    }, 500); // Duración del fade
  };

  // Mostrar switch de grey solo si corresponde
  useEffect(() => {
    setShowGreyVariant(pending.appColor === 'grey');
  }, [pending.appColor]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg relative overflow-hidden">
      {/* Fade crossfade overlay */}
      {showFade && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 animate-fade-out pointer-events-none transition-opacity duration-500" style={{animation: 'fadeOut 0.5s'}} />
      )}
      {/* Sidebar Size Module */}
      <div className="mb-6">
        <button
          className="w-full text-left font-semibold text-lg py-2 px-4 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          onClick={() => setShowSidebarSize((v) => !v)}
        >
          Letter Size
        </button>
        {showSidebarSize && (
          <div className="mt-2 pl-4">
            <div
              className="p-4 bg-gray-200 dark:bg-gray-900 rounded mb-4"
              style={{ fontSize: `${pending.sidebarFontSize}%` }}
            >
              Lorem ipsum dolor sit amet consectetur adipiscing, elit diam inceptos natoque dictumst, malesuada commodo est porttitor rhoncus.
            </div>
            <div className="flex items-center gap-2 relative max-w-xs mx-auto">
              <input
                type="range"
                min="100"
                max="200"
                value={pending.sidebarFontSize}
                onChange={e => setPending((p: typeof pending) => ({ ...p, sidebarFontSize: e.target.value }))}
                className="w-full"
              />
              <div
                className="absolute bg-gray-600 text-white text-xs font-bold px-2 py-1 rounded shadow-lg"
                style={{
                  left: `calc(${(pending.sidebarFontSize - 100)}% * 0.9 + 10px)`, // Ajuste para alineación
                  bottom: '2.5rem',
                }}
              >
                {pending.sidebarFontSize}%
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Color Module */}
      <div className="mb-6">
        <button
          className="w-full text-left font-semibold text-lg py-2 px-4 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          onClick={() => setShowColor((v) => !v)}
        >
          Color
        </button>
        {showColor && (
          <div className="mt-2 pl-4 relative">
            <div className="bg-gray-200 dark:bg-gray-900 rounded shadow-lg p-2 flex flex-col gap-1">
              {APP_COLORS.map(opt => (
                <button
                  key={opt.value}
                  className={`w-full text-left px-4 py-2 rounded flex items-center gap-2 ${pending.appColor === opt.value ? 'bg-blue-500 text-white' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}
                  onClick={() => setPending((p: typeof pending) => ({ ...p, appColor: opt.value }))}
                >
                  <span className={`w-1 h-4 rounded-full ${pending.appColor === opt.value ? 'bg-white' : 'bg-transparent'}`}></span>
                  {opt.label}
                </button>
              ))}
            </div>
            {showGreyVariant && (
              <div className="mt-2 flex items-center gap-4">
                <span className="font-semibold">Grey Variant:</span>
                <div className="flex gap-2">
                  {GREY_VARIANTS.map(variant => (
                    <label key={variant.value} className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="grey-variant"
                        value={variant.value}
                        checked={pending.greyVariant === variant.value}
                        onChange={() => setPending((p: typeof pending) => ({ ...p, greyVariant: variant.value }))}
                      />
                      {variant.value === 'grey-darkbar' ? (
                        <img src="/sidebar-darkbar-demo.jpg" alt="Sidebar/Topbar Dark, Content Light" className="w-16 h-10 object-cover rounded shadow" />
                      ) : variant.value === 'grey-lightbar' ? (
                        <img src="/sidebar-lightbar-demo.jpg" alt="Sidebar/Topbar Light, Content Dark" className="w-16 h-10 object-cover rounded shadow" />
                      ) : null}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <button
        className={`w-full py-2 rounded font-bold text-lg transition mt-4 ${hasChanges ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        onClick={saveSettings}
        disabled={!hasChanges}
      >
        Save Changes
      </button>
      <style>{`
        @keyframes fadeOut {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Settings; 