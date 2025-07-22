import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTutorial } from '@/contexts/TutorialContext';

const TutorialAutoStart: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { showWelcomeModal, hasCompletedTutorial, hasSeenWelcomeModal } = useTutorial();

  console.log('TutorialAutoStart render:', {
    isAuthenticated,
    hasCompletedTutorial,
    hasSeenWelcomeModal
  });

  useEffect(() => {
    console.log('TutorialAutoStart useEffect triggered:', {
      isAuthenticated,
      hasCompletedTutorial,
      hasSeenWelcomeModal
    });

    if (isAuthenticated && !hasCompletedTutorial && !hasSeenWelcomeModal) {
      console.log('TutorialAutoStart: Showing welcome modal in 1.5 seconds');
      // Esperar un poco para que la interfaz se cargue completamente
      const timer = setTimeout(() => {
        console.log('TutorialAutoStart: Calling showWelcomeModal');
        showWelcomeModal();
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      console.log('TutorialAutoStart: Conditions not met for showing modal');
    }
  }, [isAuthenticated, hasCompletedTutorial, hasSeenWelcomeModal, showWelcomeModal]);

  return null; // Este componente no renderiza nada
};

export default TutorialAutoStart; 