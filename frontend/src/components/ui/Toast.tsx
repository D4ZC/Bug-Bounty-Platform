import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  CheckmarkFilled, 
  ErrorFilled, 
  WarningFilled, 
  InformationFilled,
  Close
} from '@carbon/icons-react';

export interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
  action
}) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animar entrada
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Configurar auto-close
    if (duration > 0) {
      timeoutRef.current = setTimeout(() => {
        handleClose();
      }, duration);
    }

    // Animar barra de progreso
    if (progressRef.current && duration > 0) {
      progressRef.current.style.transition = `width ${duration}ms linear`;
      setTimeout(() => {
        if (progressRef.current) {
          progressRef.current.style.width = '0%';
        }
      }, 100);
    }

    return () => {
      clearTimeout(timer);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };

  const handleAction = () => {
    if (action) {
      action.onClick();
      handleClose();
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckmarkFilled size={20} className="text-green-500" />;
      case 'error':
        return <ErrorFilled size={20} className="text-red-500" />;
      case 'warning':
        return <WarningFilled size={20} className="text-yellow-500" />;
      case 'info':
        return <InformationFilled size={20} className="text-blue-500" />;
      default:
        return <InformationFilled size={20} className="text-blue-500" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-800';
      case 'error':
        return 'text-red-800';
      case 'warning':
        return 'text-yellow-800';
      case 'info':
        return 'text-blue-800';
      default:
        return 'text-blue-800';
    }
  };

  const getProgressColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'info':
        return 'bg-blue-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 w-96 max-w-sm transform transition-all duration-300 ease-out ${
        isVisible && !isLeaving
          ? 'translate-x-0 opacity-100 scale-100'
          : 'translate-x-full opacity-0 scale-95'
      }`}
    >
      <div className={`relative rounded-lg border shadow-lg overflow-hidden ${getBackgroundColor()}`}>
        {/* Barra de progreso */}
        {duration > 0 && (
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-200">
            <div
              ref={progressRef}
              className={`h-full w-full ${getProgressColor()}`}
            />
          </div>
        )}
        
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-3 mt-0.5">
              {getIcon()}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className={`text-sm font-medium ${getTextColor()}`}>
                {title}
              </h4>
              {message && (
                <p className="mt-1 text-sm text-gray-600">
                  {message}
                </p>
              )}
              {action && (
                <button
                  onClick={handleAction}
                  className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                >
                  {action.label}
                </button>
              )}
            </div>
            
            <div className="flex-shrink-0 ml-3">
              <button
                onClick={handleClose}
                className="inline-flex text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              >
                <Close size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast; 