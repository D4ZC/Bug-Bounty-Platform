import React from 'react';
import Toast, { ToastProps } from './Toast';
import { useNotification } from '@/hooks/useNotification';

const ToastContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  const handleClose = (id: string) => {
    removeNotification(id);
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          className="pointer-events-auto"
          style={{
            transform: `translateY(${index * 8}px)`,
            zIndex: 1000 - index,
          }}
        >
          <Toast
            id={notification.id}
            type={notification.type}
            title={notification.title}
            message={notification.message}
            duration={notification.duration}
            onClose={handleClose}
            action={notification.action}
          />
        </div>
      ))}
    </div>
  );
};

export default ToastContainer; 