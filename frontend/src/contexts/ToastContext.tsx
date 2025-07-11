import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import Toast from '../components/ui/Toast';

type ToastType = 'success' | 'error' | 'info';

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<ToastType>('info');

  const showToast = useCallback((msg: string, t: ToastType = 'info') => {
    setMessage(msg);
    setType(t);
    setOpen(true);
    setTimeout(() => setOpen(false), 3500);
  }, []);

  const handleClose = () => setOpen(false);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast open={open} message={message} type={type} onClose={handleClose} />
    </ToastContext.Provider>
  );
}; 