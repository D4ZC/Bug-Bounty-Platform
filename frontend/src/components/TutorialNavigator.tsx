import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTutorial } from '../contexts/TutorialContext';

const TutorialNavigator: React.FC = () => {
  const navigate = useNavigate();
  const { shouldNavigate, targetRoute, resetNavigation } = useTutorial();

  useEffect(() => {
    if (shouldNavigate && targetRoute) {
      console.log('TutorialNavigator: Navigating to', targetRoute);
      // Pequeño delay para que el usuario vea la transición
      const timer = setTimeout(() => {
        navigate(targetRoute);
        // Resetear los flags después de la navegación
        resetNavigation();
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [shouldNavigate, targetRoute, navigate, resetNavigation]);

  return null; // Este componente no renderiza nada
};

export default TutorialNavigator; 