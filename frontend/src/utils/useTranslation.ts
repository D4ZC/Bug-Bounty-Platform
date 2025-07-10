import { useLanguage } from '../contexts/LanguageContext';
import { translations, TranslationKey } from '../i18n';

export function useTranslation() {
  const { language } = useLanguage();
  function t(key: TranslationKey): string {
    return translations[language][key] || key;
  }
  return { t, language };
} 