import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  showClose?: boolean;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 40 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: -40 },
};

const Modal: React.FC<ModalProps> = ({ open, onClose, children, title, showClose = true }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Cerrar con escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  // Cerrar con click fuera
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === ref.current) onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onMouseDown={handleBackdropClick}
        >
          <motion.div
            className="relative bg-gradient-to-br from-[#181028] via-[#1a0033] to-[#0f0026] rounded-2xl shadow-2xl p-8 max-w-lg w-full border-2 border-cyan-400 neon-shadow animate-pop-in"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.32, ease: 'easeInOut' }}
            role="dialog"
            aria-modal="true"
          >
            {showClose && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-cyan-300 hover:text-pink-400 text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                aria-label="Cerrar modal"
              >
                &times;
              </button>
            )}
            {title && <h2 className="text-2xl font-extrabold mb-4 text-cyan-200 drop-shadow-cyber text-center">{title}</h2>}
            <div>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal; 