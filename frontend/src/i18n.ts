import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      navbar: {
        title: 'BugBounty',
      },
      settings: {
        title: 'Settings',
        save: 'Save Changes',
        letterSize: 'Letter Size',
        color: 'Color',
        language: 'Language',
        addLanguage: 'Add Language',
        cancel: 'Cancel',
        add: 'Add',
      },
    },
  },
  es: {
    translation: {
      navbar: {
        title: 'BugBounty',
      },
      settings: {
        title: 'Configuración',
        save: 'Guardar Cambios',
        letterSize: 'Tamaño de letra',
        color: 'Color',
        language: 'Idioma',
        addLanguage: 'Agregar idioma',
        cancel: 'Cancelar',
        add: 'Agregar',
      },
    },
  },
  pt: {
    translation: {
      navbar: {
        title: 'BugBounty',
      },
      settings: {
        title: 'Configurações',
        save: 'Salvar Alterações',
        letterSize: 'Tamanho da letra',
        color: 'Cor',
        language: 'Idioma',
        addLanguage: 'Adicionar idioma',
        cancel: 'Cancelar',
        add: 'Adicionar',
      },
    },
  },
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