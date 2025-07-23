import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import es from './locales/es.json';
import pt from './locales/pt.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
  pt: { translation: pt },
};

// Obtener idioma inicial del usuario
const userId = localStorage.getItem('userId') || 'default';
const initialLang = localStorage.getItem(`settings_${userId}_language`) || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

// Listener para cambiar idioma al evento language-changed
window.addEventListener('language-changed', () => {
  const userId = localStorage.getItem('userId') || 'default';
  const lang = localStorage.getItem(`settings_${userId}_language`) || 'en';
  i18n.changeLanguage(lang);
});

export default i18n; 