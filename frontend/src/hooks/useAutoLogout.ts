import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const INACTIVITY_LIMIT = 30 * 60 * 1000; // 30 minutos en ms

export function useAutoLogout(logoutCallback: () => void, onInactive?: () => void) {
  const navigate = useNavigate();
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const resetTimer = () => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        if (onInactive) onInactive();
        logoutCallback();
        navigate('/auth/login');
      }, INACTIVITY_LIMIT);
    };

    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    events.forEach(event => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      if (timer.current) clearTimeout(timer.current);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [logoutCallback, navigate, onInactive]);
} 