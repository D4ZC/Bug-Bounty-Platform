import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

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

// Lista completa de idiomas disponibles para agregar
const ALL_LANGUAGES = [
  { label: 'English', value: 'en' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Albanian - shqip', value: 'sq' },
  { label: 'Amharic - አማርኛ', value: 'am' },
  { label: 'Arabic - لعربية', value: 'ar' },
  { label: 'Aragonese - aragonés', value: 'an' },
  { label: 'Armenian - huبرتر', value: 'hy' },
  { label: 'Assamese - অসমীয়া', value: 'as' },
  { label: 'Asturian - asturianu', value: 'ast' },
  { label: 'Azerbaijani - azərbaycan', value: 'az' },
  { label: 'Bangla - বাংলা', value: 'bn' },
  { label: 'Bangla (India) - বাংলা (ভারত)', value: 'bn-IN' },
  { label: 'Basque - euskara', value: 'eu' },
  { label: 'Belarusian - беларуская', value: 'be' },
  { label: 'Bosnian - bosanski', value: 'bs' },
  { label: 'Breton - brezhoneg', value: 'br' },
  { label: 'Bulgarian - български', value: 'bg' },
  { label: 'Burmese', value: 'my' },
  { label: 'Catalan - català', value: 'ca' },
  { label: 'Catalan (Spain, VALENCIA) - català (Espanya, VALENCIA)', value: 'ca-ES-valencia' },
  { label: 'Cebuano - Cebuano', value: 'ceb' },
  { label: 'کوردیی ناوه ندی - Central Kurdish', value: 'ckb' },
  { label: 'Cherokee - CWY', value: 'chr' },
  { label: 'Chinese - 中文', value: 'zh' },
  { label: 'Chinese (Hong Kong SAR) - 中文(香港特別行政', value: 'zh-HK' },
  { label: 'Chinese (Simplified) - 中文(简体)', value: 'zh-CN' },
  { label: 'Chinese (Traditional) - 中文(繁體)', value: 'zh-TW' },
  { label: 'Corsican - Corsican', value: 'co' },
  { label: 'Croatian - hrvatski', value: 'hr' },
  { label: 'Czech - čeština', value: 'cs' },
  { label: 'Danish - dansk', value: 'da' },
  { label: 'Dutch - Nederlands', value: 'nl' },
  { label: 'Dutch (Belgium) - Nederlands (België)', value: 'nl-BE' },
  { label: 'English (Australia) - English (Australia)', value: 'en-AU' },
  { label: 'English (Canada) - English (Canada)', value: 'en-CA' },
  { label: 'English (India) - English (India)', value: 'en-IN' },
  { label: 'English (Ireland) - English (Ireland)', value: 'en-IE' },
  { label: 'English (New Zealand) - English (New Zealand)', value: 'en-NZ' },
  { label: 'English (South Africa) - English (South Africa)', value: 'en-ZA' },
  { label: 'English (United Kingdom, Oxford English Dictionary spelling) - English (United Kingdom, Oxford English Dictionary spelling)', value: 'en-GB' },
  { label: 'Esperanto - Esperanto', value: 'eo' },
  { label: 'Estonian - eesti', value: 'et' },
  { label: 'Faroese - føroyskt', value: 'fo' },
  { label: 'Filipino - Filipino', value: 'fil' },
  { label: 'Finnish - suomi', value: 'fi' },
  { label: 'French - français', value: 'fr' },
  { label: 'French (Belgium) - français (Belgique)', value: 'fr-BE' },
  { label: 'French (Canada) - français (Canada)', value: 'fr-CA' },
  { label: 'French (France) - français (France)', value: 'fr-FR' },
  { label: 'French (Switzerland) - français (Suisse)', value: 'fr-CH' },
  { label: 'Galician - galego', value: 'gl' },
  { label: 'Georgian - ქართული', value: 'ka' },
  { label: 'German - Deutsch', value: 'de' },
  { label: 'German (Austria) - Deutsch (Österreich)', value: 'de-AT' },
  { label: 'German (Germany) - Deutsch (Deutschland)', value: 'de-DE' },
  { label: 'German (Liechtenstein) - Deutsch (Liechtenstein)', value: 'de-LI' },
  { label: 'German (Switzerland) - Deutsch (Schweiz)', value: 'de-CH' },
  { label: 'Greek - Ελληνικά', value: 'el' },
  { label: 'Guarani - Guarani', value: 'gn' },
  { label: 'Gujarati - ગુજરાતી', value: 'gu' },
  { label: 'Haitian Creole - créole haïtien', value: 'ht' },
  { label: 'Hausa - Hausa', value: 'ha' },
  { label: "Hawaiian - 'Ölelo Hawai'i", value: 'haw' },
  { label: 'Hebrew - עברית', value: 'he' },
  { label: 'Hindi - हिन्दी', value: 'hi' },
  { label: 'Hmong - Hmong', value: 'hmn' },
  { label: 'Hungarian - magyar', value: 'hu' },
  { label: 'Icelandic - íslenska', value: 'is' },
  { label: 'Igbo - Igbo', value: 'ig' },
  { label: 'Indonesian - Indonesia', value: 'id' },
  { label: 'Interlingua - interlingua', value: 'ia' },
  { label: 'Inuktitut - Inuktitut', value: 'iu' },
  { label: 'Irish - Gaeilge', value: 'ga' },
  { label: 'isiXhosa - IsiXhosa', value: 'xh' },
  { label: 'isiZulu - isiZulu', value: 'zu' },
  { label: 'Italian - italiano', value: 'it' },
  { label: 'Italian (Italy) - italiano (Italia)', value: 'it-IT' },
  // ... puedes agregar más si es necesario
];

const getUserId = () => localStorage.getItem('userId') || 'default';
const getSettingsKey = () => `settings_${getUserId()}`;

const getInitialSettings = () => {
  const stored = localStorage.getItem(getSettingsKey());
  if (stored) {
    const parsed = JSON.parse(stored);
    // Forzar sidebarFontSize a número
    parsed.sidebarFontSize = Number(parsed.sidebarFontSize) || 100;
    return parsed;
  }
  return {
    sidebarFontSize: 100,
    appColor: 'white',
    greyVariant: 'grey-darkbar',
  };
};

// Utilidad para obtener los idiomas seleccionados iniciales (máx 7)
const getInitialLanguages = () => {
  const stored = localStorage.getItem(getSettingsKey() + '_languages');
  if (stored) return JSON.parse(stored);
  // Por defecto: English, Spanish, Portuguese
  return [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'Portuguese', value: 'pt' },
  ];
};

const Settings: React.FC = () => {
  const { t } = useTranslation();
  const [showSidebarSize, setShowSidebarSize] = useState(false);
  const [showColor, setShowColor] = useState(false);
  const [showGreyVariant, setShowGreyVariant] = useState(false);
  const [settings, setSettings] = useState(getInitialSettings());
  const [pending, setPending] = useState(getInitialSettings());
  const [showFade, setShowFade] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const [languages, setLanguages] = useState(getInitialLanguages()); // [{label, value}]
  const [pendingLanguages, setPendingLanguages] = useState(getInitialLanguages());
  // El idioma guardado actualmente
  const savedLanguage = localStorage.getItem(getSettingsKey() + '_language') || (languages[0]?.value || 'en');
  const [selectedLanguage, setSelectedLanguage] = useState(savedLanguage);
  const [showAddLanguageModal, setShowAddLanguageModal] = useState(false);
  const [addSearch, setAddSearch] = useState('');
  const [addSelected, setAddSelected] = useState<string[]>([]);
  const [addError, setAddError] = useState('');

  // Detectar cambios
  const hasChanges =
    JSON.stringify(settings) !== JSON.stringify(pending) ||
    JSON.stringify(languages) !== JSON.stringify(pendingLanguages) ||
    selectedLanguage !== savedLanguage;

  // Guardar settings en localStorage
  const saveSettings = () => {
    setShowFade(true);
    setTimeout(() => {
      setSettings(pending);
      localStorage.setItem(getSettingsKey(), JSON.stringify(pending));
      setLanguages(pendingLanguages);
      setSelectedLanguage(selectedLanguage);
      localStorage.setItem(getSettingsKey() + '_languages', JSON.stringify(pendingLanguages));
      localStorage.setItem(getSettingsKey() + '_language', selectedLanguage);
      setShowFade(false);
      window.dispatchEvent(new Event('settings-updated'));
      window.dispatchEvent(new Event('language-changed'));
    }, 500); // Duración del fade
  };

  // Mostrar switch de grey solo si corresponde
  useEffect(() => {
    setShowGreyVariant(pending.appColor === 'grey');
  }, [pending.appColor]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg relative overflow-hidden">
      <div className="text-2xl font-bold mb-6">{t('settings.title')}</div>
      {/* Fade crossfade overlay */}
      {showFade && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 animate-fade-out pointer-events-none transition-opacity duration-500" style={{animation: 'fadeOut 0.5s'}} />
      )}
      {/* Sidebar Size Module */}
      <div className="mb-6">
        <button
          className="w-full text-left font-semibold text-lg py-2 px-4 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          onClick={() => {
            setShowSidebarSize((v) => !v);
            setShowColor(false);
            setShowLanguage(false);
          }}
        >
          {t('settings.letterSize')}
        </button>
        {showSidebarSize && (
          <div className="mt-2 pl-4">
            <div
              className="p-4 bg-gray-200 dark:bg-gray-900 rounded mb-4"
              style={{ fontSize: `${Number(pending.sidebarFontSize) || 100}%` }}
            >
              Lorem ipsum dolor sit amet consectetur adipiscing, elit diam inceptos natoque dictumst, malesuada commodo est porttitor rhoncus.
            </div>
            <div className="flex items-center gap-2 relative max-w-xs mx-auto">
              <input
                type="range"
                min={100}
                max={200}
                value={Number(pending.sidebarFontSize) || 100}
                onChange={e => setPending((p: typeof pending) => ({ ...p, sidebarFontSize: Number(e.target.value) }))}
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
          onClick={() => {
            setShowColor((v) => !v);
            setShowSidebarSize(false);
            setShowLanguage(false);
          }}
        >
          {t('settings.color')}
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
      {/* Language Module */}
      <div className="mb-6">
        <div>
          <button
            className="w-full text-left font-semibold text-lg py-2 px-4 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            onClick={() => {
              setShowLanguage((v) => !v);
              setShowSidebarSize(false);
              setShowColor(false);
            }}
          >
            {t('settings.language')}
          </button>
          {showLanguage && (
            <div className="mt-2 pl-4">
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold text-lg">{t('settings.language')}</div>
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded font-bold text-sm hover:bg-blue-600 transition"
                  onClick={() => {
                    setAddSearch('');
                    setAddSelected([]);
                    setAddError('');
                    setShowAddLanguageModal(true);
                  }}
                >
                  {t('settings.addLanguage')}
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {pendingLanguages.map((opt: {label: string, value: string}) => (
                  <div key={opt.value} className="flex items-center cursor-pointer w-full">
                    <input
                      type="radio"
                      name="language"
                      value={opt.value}
                      checked={selectedLanguage === opt.value}
                      onChange={() => setSelectedLanguage(opt.value)}
                    />
                    <span className="flex-1 ml-2">{opt.label}</span>
                    <button
                      className="text-gray-400 hover:text-gray-600 ml-2 px-2 text-xl font-bold focus:outline-none"
                      style={{marginLeft: 'auto'}}
                      onClick={() => {
                        setPendingLanguages(pendingLanguages.filter((l: {label: string, value: string}) => l.value !== opt.value));
                        if (selectedLanguage === opt.value) {
                          setSelectedLanguage(pendingLanguages.filter((l: {label: string, value: string}) => l.value !== opt.value)[0]?.value || 'en');
                        }
                      }}
                      tabIndex={-1}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Add Language Modal */}
        {showAddLanguageModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center" style={{background: 'rgba(0,0,0,0.25)', padding: '32px'}}>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg p-4 md:p-6 relative flex flex-col" style={{boxShadow: '0 0 0 16px rgba(0,0,0,0.10)'}}>
              <button onClick={() => setShowAddLanguageModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl font-bold">&times;</button>
              {addError && (
                <div className="mb-2 text-red-600 bg-red-100 rounded p-2 text-center font-semibold">
                  {addError}
                </div>
              )}
              <input
                type="text"
                placeholder="Search language..."
                value={addSearch}
                onChange={e => setAddSearch(e.target.value)}
                className="w-full mb-3 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="flex-1 overflow-y-auto max-h-64 border rounded bg-gray-50 dark:bg-gray-800 p-2 mb-4">
                {ALL_LANGUAGES.filter((lang: {label: string, value: string}) =>
                  !pendingLanguages.some((l: {label: string, value: string}) => l.value === lang.value) &&
                  lang.label.toLowerCase().includes(addSearch.toLowerCase())
                ).map((lang: {label: string, value: string}) => (
                  <label key={lang.value} className="flex items-center gap-2 py-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addSelected.includes(lang.value)}
                      onChange={e => {
                        if (e.target.checked) {
                          setAddSelected([...addSelected, lang.value]);
                        } else {
                          setAddSelected(addSelected.filter((v: string) => v !== lang.value));
                        }
                      }}
                    />
                    {lang.label}
                  </label>
                ))}
              </div>
              <div className="flex justify-end gap-3 mt-2">
                <button
                  className="px-2 py-1 rounded bg-gray-300 text-gray-700 font-bold text-xs hover:bg-gray-400"
                  style={{minWidth: 60}}
                  onClick={() => {
                    setShowAddLanguageModal(false);
                    setAddSelected([]);
                    setAddError('');
                  }}
                >
                  {t('settings.cancel')}
                </button>
                <button
                  className="px-2 py-1 rounded bg-blue-600 text-white font-bold text-xs hover:bg-blue-700"
                  style={{minWidth: 60}}
                  onClick={() => {
                    const max = 7;
                    const b = pendingLanguages.length;
                    const c = max - b;
                    if (addSelected.length > c) {
                      setAddError(`You can only add ${c} language${c === 1 ? '' : 's'}`);
                      return;
                    }
                    // Agregar los seleccionados
                    const toAdd = ALL_LANGUAGES.filter((l: {label: string, value: string}) => addSelected.includes(l.value));
                    const newList = [...pendingLanguages, ...toAdd].slice(0, 7);
                    setPendingLanguages(newList);
                    setShowAddLanguageModal(false);
                    setAddSelected([]);
                    setAddError('');
                  }}
                >
                  {t('settings.add')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <button
        className={`w-full py-2 rounded font-bold text-lg transition mt-4 ${hasChanges ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        onClick={saveSettings}
        disabled={!hasChanges}
      >
        {t('settings.save')}
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