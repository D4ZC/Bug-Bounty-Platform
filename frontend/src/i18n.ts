import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'Settings': 'Settings',
      'Language': 'Language',
      'Theme': 'Theme',
      'Light': 'Light',
      'Dark': 'Dark',
      'System': 'System',
      'Close': 'Close',
    },
  },
  es: {
    translation: {
      'Settings': 'Configuración',
      'Language': 'Idioma',
      'Theme': 'Tema',
      'Light': 'Claro',
      'Dark': 'Oscuro',
      'System': 'Sistema',
      'Close': 'Cerrar',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es',
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 