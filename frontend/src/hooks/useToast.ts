import { useState, useCallback, useRef } from 'react';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center';
}

interface ToastOptions {
  duration?: number;
  position?: Toast['position'];
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idCounter = useRef(0);

  const generateId = useCallback(() => {
    idCounter.current += 1;
    return `toast-${idCounter.current}-${Date.now()}`;
  }, []);

  const addToast = useCallback((
    type: Toast['type'],
    message: string,
    options: ToastOptions = {}
  ) => {
    const { duration = 5000, position = 'top-right' } = options;
    const id = generateId();
    
    const newToast: Toast = {
      id,
      type,
      message,
      duration,
      position,
    };

    setToasts(prev => [...prev, newToast]);
    return id;
  }, [generateId]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Métodos específicos para cada tipo
  const showSuccess = useCallback((message: string, options?: ToastOptions) => {
    return addToast('success', message, options);
  }, [addToast]);

  const showError = useCallback((message: string, options?: ToastOptions) => {
    return addToast('error', message, options);
  }, [addToast]);

  const showWarning = useCallback((message: string, options?: ToastOptions) => {
    return addToast('warning', message, options);
  }, [addToast]);

  const showInfo = useCallback((message: string, options?: ToastOptions) => {
    return addToast('info', message, options);
  }, [addToast]);

  // Métodos para mostrar múltiples toasts
  const showMultiple = useCallback((toastConfigs: Array<{ type: Toast['type']; message: string; options?: ToastOptions }>) => {
    const ids: string[] = [];
    toastConfigs.forEach(({ type, message, options }) => {
      const id = addToast(type, message, options);
      ids.push(id);
    });
    return ids;
  }, [addToast]);

  // Método para mostrar progreso
  const showProgress = useCallback((
    steps: Array<{ type: Toast['type']; message: string; delay?: number }>,
    options?: ToastOptions
  ) => {
    const ids: string[] = [];
    steps.forEach((step, index) => {
      setTimeout(() => {
        const id = addToast(step.type, step.message, options);
        ids.push(id);
      }, step.delay || index * 1000);
    });
    return ids;
  }, [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showMultiple,
    showProgress,
  };
};

export default useToast; 