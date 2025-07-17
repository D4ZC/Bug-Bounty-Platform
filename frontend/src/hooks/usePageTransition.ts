import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageTransition = () => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname !== currentPath) {
      setIsTransitioning(true);
      
      // Simular transición suave
      const timer = setTimeout(() => {
        setCurrentPath(location.pathname);
        setIsTransitioning(false);
      }, 150); // Duración de la transición

      return () => clearTimeout(timer);
    }
  }, [location.pathname, currentPath]);

  return {
    isTransitioning,
    currentPath,
  };
};

export default usePageTransition; 