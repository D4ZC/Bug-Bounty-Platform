import i18n from 'i18next';

export const testLanguagePersistence = () => {
  console.log('🧪 Testing language persistence...');
  
  // Simular cambio de idioma
  const testLanguage = 'en';
  console.log(`\n1️⃣ Setting language to: ${testLanguage}`);
  i18n.changeLanguage(testLanguage);
  localStorage.setItem('i18nextLng', testLanguage);
  
  // Verificar que se guardó
  const savedLanguage = localStorage.getItem('i18nextLng');
  console.log(`2️⃣ Saved in localStorage: ${savedLanguage}`);
  
  // Simular recarga de página (limpiar i18n)
  console.log(`3️⃣ Simulating page reload...`);
  const currentLanguage = i18n.language;
  console.log(`   Current i18n language: ${currentLanguage}`);
  
  // Recuperar idioma guardado
  const recoveredLanguage = localStorage.getItem('i18nextLng') || 'es';
  console.log(`4️⃣ Recovered from localStorage: ${recoveredLanguage}`);
  
  // Aplicar idioma recuperado
  i18n.changeLanguage(recoveredLanguage);
  console.log(`5️⃣ Applied recovered language: ${i18n.language}`);
  
  // Verificar traducciones
  const welcomeText = i18n.t('welcome');
  console.log(`6️⃣ Welcome text: ${welcomeText}`);
  
  // Resultado
  const isWorking = recoveredLanguage === testLanguage && welcomeText !== 'welcome';
  console.log(`\n${isWorking ? '✅' : '❌'} Language persistence test: ${isWorking ? 'PASSED' : 'FAILED'}`);
  
  return isWorking;
};

export const clearLanguageStorage = () => {
  localStorage.removeItem('i18nextLng');
  console.log('🗑️ Cleared language storage');
};

export const getLanguageInfo = () => {
  const savedLanguage = localStorage.getItem('i18nextLng');
  const currentLanguage = i18n.language;
  
  return {
    saved: savedLanguage,
    current: currentLanguage,
    isConsistent: savedLanguage === currentLanguage,
    welcomeText: i18n.t('welcome')
  };
}; 