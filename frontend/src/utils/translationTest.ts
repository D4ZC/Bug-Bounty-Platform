import i18n from 'i18next';

export const testTranslations = () => {
  const languages = ['es', 'en', 'ja', 'fr', 'it', 'pt'];
  
  console.log('🧪 Testing translations...');
  
  languages.forEach(lang => {
    i18n.changeLanguage(lang);
    console.log(`\n🌍 Language: ${lang}`);
    console.log(`   Welcome: ${i18n.t('welcome')}`);
    console.log(`   Settings: ${i18n.t('settings')}`);
    console.log(`   Dashboard: ${i18n.t('dashboard')}`);
    console.log(`   Save: ${i18n.t('save')}`);
  });
  
  // Reset to Spanish
  i18n.changeLanguage('es');
  console.log('\n✅ Translation test completed. Reset to Spanish.');
};

export const getCurrentLanguage = () => {
  return i18n.language;
};

export const isTranslationWorking = () => {
  try {
    const testKey = 'welcome';
    const translation = i18n.t(testKey);
    return translation !== testKey; // If translation works, it should return the actual text, not the key
  } catch (error) {
    console.error('Translation test failed:', error);
    return false;
  }
}; 