import React from 'react';
import { useTutorial } from '../contexts/TutorialContext';
import WelcomeModal from './WelcomeModal';
import TutorialModal from './TutorialModal';
import { useHeaderButtons } from '../hooks/useHeaderButtons';

const TutorialManager: React.FC = () => {
  const { 
    isWelcomeModalVisible, 
    isTutorialActive, 
    startTutorial, 
    skipTutorial 
  } = useTutorial();

  // Inyectar botones del tutorial en el header
  useHeaderButtons();

  console.log('TutorialManager render - welcomeModal:', isWelcomeModalVisible, 'tutorialActive:', isTutorialActive);

  const handleStartTutorial = () => {
    console.log('TutorialManager: handleStartTutorial called');
    startTutorial();
  };

  const handleSkipTutorial = () => {
    console.log('TutorialManager: handleSkipTutorial called');
    skipTutorial();
  };

  return (
    <>
      {isWelcomeModalVisible && (
        <WelcomeModal 
          isVisible={isWelcomeModalVisible}
          onStartTutorial={handleStartTutorial}
          onSkipTutorial={handleSkipTutorial}
        />
      )}
      {isTutorialActive && <TutorialModal />}
    </>
  );
};

export default TutorialManager; 