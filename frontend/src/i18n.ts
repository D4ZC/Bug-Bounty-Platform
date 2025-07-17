import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  es: {
    translation: {
      'dashboard.title': 'Panel Principal',
      'profile.title': 'Perfil',
      'teams.title': 'Equipos',
      'shop.title': 'Tienda',
      'settings.title': 'Ajustes',
      'logout': 'Cerrar sesión',
      'efficiency': 'EFICIENCIA',
      // ...otros textos base
    }
  },
  en: {
    translation: {
      'dashboard.title': 'Dashboard',
      'profile.title': 'Profile',
      'teams.title': 'Teams',
      'shop.title': 'Shop',
      'settings.title': 'Settings',
      'logout': 'Log Out',
      'efficiency': 'EFFICIENCY',
      // ...other base texts
    }
  },
  zh: {
    translation: {
      'dashboard.title': '仪表板',
      'profile.title': '个人资料',
      'teams.title': '团队',
      'shop.title': '商店',
      'settings.title': '设置',
      'logout': '登出',
      'efficiency': '效率',
    }
  },
  de: {
    translation: {
      'dashboard.title': 'Übersicht',
      'profile.title': 'Profil',
      'teams.title': 'Teams',
      'shop.title': 'Shop',
      'settings.title': 'Einstellungen',
      'logout': 'Abmelden',
      'efficiency': 'EFFIZIENZ',
    }
  },
  ru: {
    translation: {
      'dashboard.title': 'Панель',
      'profile.title': 'Профиль',
      'teams.title': 'Команды',
      'shop.title': 'Магазин',
      'settings.title': 'Настройки',
      'logout': 'Выйти',
      'efficiency': 'ЭФФЕКТИВНОСТЬ',
    }
  },
  fr: {
    translation: {
      'dashboard.title': 'Tableau de bord',
      'profile.title': 'Profil',
      'teams.title': 'Équipes',
      'shop.title': 'Boutique',
      'settings.title': 'Paramètres',
      'logout': 'Déconnexion',
      'efficiency': 'EFFICACITÉ',
    }
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    lng: localStorage.getItem('lang') || 'es',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'lang',
    },
  });

export default i18n; 