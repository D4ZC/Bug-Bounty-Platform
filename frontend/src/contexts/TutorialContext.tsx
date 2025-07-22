import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  targetElement?: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  route: string;
  tip: string;
}

interface TutorialContextType {
  isTutorialActive: boolean;
  isWelcomeModalVisible: boolean;
  currentStep: number;
  steps: TutorialStep[];
  startTutorial: () => void;
  showWelcomeModal: () => void;
  hideWelcomeModal: () => void;
  nextStep: () => void;
  previousStep: () => void;
  skipTutorial: () => void;
  completeTutorial: () => void;
  hasCompletedTutorial: boolean;
  hasSeenWelcomeModal: boolean;
  shouldNavigate: boolean;
  targetRoute: string | null;
  resetNavigation: () => void;
  resetTutorial: () => void;
  handleTutorialButton: () => void;
  handleResetButton: () => void;
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error('useTutorial must be used within a TutorialProvider');
  }
  return context;
};

const tutorialSteps: TutorialStep[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'Aquí puedes ver un resumen completo de lo que esta pasando en los rankings de usuarios y de equipos, que ¡guay!',
    position: 'top-right',
    route: '/dashboard',
    tip: 'Aqui puedes ver de manera rapida como van las cosas.'
  },
  {
    id: 'reportes',
    title: 'Reportes',
    description: 'En esta sección puedes crear y gestionar todos tus reportes de vulnerabilidades. Organiza y revisa tus hallazgos.',
    position: 'top-right',
    route: '/reports',
    tip: 'Recuerda ser claro y detallado en tus reportes para obtener mejores recompensas y ayudar a los revisores.'
  },
  {
    id: 'rankings',
    title: 'Rankings',
    description: 'Consulta los Rankings y compite por el primer lugar. Ve cómo te posicionas entre otros usuarios.',
    position: 'top-right',
    route: '/rankings',
    tip: '¡Sube en el ranking participando activamente y reportando vulnerabilidades de calidad!'
  },
  {
    id: 'usuario',
    title: 'Perfil de Usuario',
    description: 'Personaliza tu perfil, cambia tu avatar, marcos y configura tus preferencias.',
    position: 'top-right',
    route: '/profile',
    tip: 'Personaliza tu perfil para destacar en la comunidad y mostrar tus logros.'
  },
  {
    id: 'reglas',
    title: 'Reglas',
    description: 'Consulta las reglas y políticas de la plataforma para mantener un ambiente seguro.',
    position: 'top-right',
    route: '/reglas',
    tip: 'Lee las reglas para evitar sanciones y contribuir a una comunidad segura y colaborativa.'
  },
  {
    id: 'gulag',
    title: 'Gulag',
    description: 'El Gulag es donde van los usuarios que necesitan mejorar. ¡Evita estar aquí!',
    position: 'top-right',
    route: '/gulag',
    tip: 'Evita el Gulag siguiendo las reglas y participando de manera ética en la plataforma.'
  },
  {
    id: 'duelos',
    title: 'Duelos',
    description: 'Participa en desafíos y duelos contra otros equipos. Demuestra tus habilidades.',
    position: 'top-right',
    route: '/challenges',
    tip: 'Los duelos son una excelente forma de mejorar tus habilidades y ganar reconocimiento.'
  },
  {
    id: 'tienda',
    title: 'Tienda',
    description: 'Compra avatares, marcos, banners y otros elementos para personalizar tu perfil.',
    position: 'top-right',
    route: '/shop',
    tip: 'Visita la tienda para personalizar tu experiencia y mostrar tu estilo único.'
  }
];

export const TutorialProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isTutorialActive, setIsTutorialActive] = useState(false);
  const [isWelcomeModalVisible, setIsWelcomeModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasCompletedTutorial, setHasCompletedTutorial] = useState(false);
  const [hasSeenWelcomeModal, setHasSeenWelcomeModal] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [targetRoute, setTargetRoute] = useState<string | null>(null);

  // Verificar si el usuario ya completó el tutorial
  useEffect(() => {
    const completed = localStorage.getItem('tutorialCompleted');
    const seenWelcome = localStorage.getItem('hasSeenWelcomeModal');
    if (completed === 'true') {
      setHasCompletedTutorial(true);
    }
    if (seenWelcome === 'true') {
      setHasSeenWelcomeModal(true);
    }
  }, []);

  const showWelcomeModal = () => {
    setIsWelcomeModalVisible(true);
  };

  const hideWelcomeModal = () => {
    setIsWelcomeModalVisible(false);
  };

  const startTutorial = () => {
    console.log('startTutorial called - hiding welcome modal and starting tutorial');
    setIsWelcomeModalVisible(false);
    setIsTutorialActive(true);
    setCurrentStep(0);
    setHasSeenWelcomeModal(true);
    localStorage.setItem('hasSeenWelcomeModal', 'true');
    // Indicar que debe navegar al dashboard
    setTargetRoute('/dashboard');
    setShouldNavigate(true);
    console.log('Tutorial state updated - welcomeModal:', false, 'tutorialActive:', true);
  };

  const nextStep = () => {
    console.log('nextStep called, currentStep:', currentStep, 'steps.length:', tutorialSteps.length);
    if (currentStep < tutorialSteps.length - 1) {
      const nextStepIndex = currentStep + 1;
      setCurrentStep(nextStepIndex);
      const nextStepData = tutorialSteps[nextStepIndex];
      console.log('Moving to step:', nextStepIndex, 'route:', nextStepData.route);
      // Indicar que debe navegar a la siguiente página
      setTargetRoute(nextStepData.route);
      setShouldNavigate(true);
    } else {
      console.log('Completing tutorial');
      completeTutorial();
    }
  };

  const previousStep = () => {
    console.log('previousStep called, currentStep:', currentStep);
    if (currentStep > 0) {
      const prevStepIndex = currentStep - 1;
      setCurrentStep(prevStepIndex);
      const prevStepData = tutorialSteps[prevStepIndex];
      console.log('Moving to step:', prevStepIndex, 'route:', prevStepData.route);
      // Indicar que debe navegar a la página anterior
      setTargetRoute(prevStepData.route);
      setShouldNavigate(true);
    }
  };

  const skipTutorial = () => {
    hideWelcomeModal();
    setIsTutorialActive(false);
    setCurrentStep(0);
    setHasCompletedTutorial(true);
    setHasSeenWelcomeModal(true);
    localStorage.setItem('tutorialCompleted', 'true');
    localStorage.setItem('hasSeenWelcomeModal', 'true');
  };

  const completeTutorial = () => {
    setIsTutorialActive(false);
    setCurrentStep(0);
    setHasCompletedTutorial(true);
    setHasSeenWelcomeModal(true);
    localStorage.setItem('tutorialCompleted', 'true');
    localStorage.setItem('hasSeenWelcomeModal', 'true');
  };

  const resetNavigation = () => {
    setShouldNavigate(false);
    setTargetRoute(null);
  };

  const resetTutorial = () => {
    setHasCompletedTutorial(false);
    setHasSeenWelcomeModal(false);
    localStorage.removeItem('tutorialCompleted');
    localStorage.removeItem('hasSeenWelcomeModal');
    showWelcomeModal(); // Ensure welcome modal is visible
    console.log('Tutorial reset. Welcome modal visible:', true);
  };

  const handleTutorialButton = () => {
    console.log('Tutorial button clicked - starting tutorial');
    if (hasCompletedTutorial) {
      // Si ya completó el tutorial, resetear y mostrar modal de bienvenida
      resetTutorial();
    } else {
      // Si no ha completado, iniciar tutorial directamente
      startTutorial();
    }
  };

  const handleResetButton = () => {
    console.log('Reset button clicked - resetting tutorial');
    resetTutorial();
  };

  const value: TutorialContextType = {
    isTutorialActive,
    isWelcomeModalVisible,
    currentStep,
    steps: tutorialSteps,
    startTutorial,
    showWelcomeModal,
    hideWelcomeModal,
    nextStep,
    previousStep,
    skipTutorial,
    completeTutorial,
    hasCompletedTutorial,
    hasSeenWelcomeModal,
    shouldNavigate,
    targetRoute,
    resetNavigation,
    resetTutorial,
    handleTutorialButton,
    handleResetButton
  };

  return (
    <TutorialContext.Provider value={value}>
      {children}
    </TutorialContext.Provider>
  );
}; 