import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';

interface SubmissionSuccessProps {
  isVisible: boolean;
  onComplete: () => void;
}

const SubmissionSuccess: React.FC<SubmissionSuccessProps> = ({ isVisible, onComplete }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setStep(1);
        setTimeout(() => {
          setStep(2);
          setTimeout(() => {
            onComplete();
          }, 1000);
        }, 1000);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8 rounded-2xl shadow-2xl text-center max-w-md">
        <div className="text-6xl mb-4">
          {step === 0 && <FaCheckCircle className="animate-bounce" />}
          {step === 1 && <FaCheckCircle className="animate-pulse" />}
          {step === 2 && <FaArrowRight className="animate-pulse" />}
        </div>
        <h3 className="text-2xl font-bold mb-2">
          {step === 0 && 'Enviando...'}
          {step === 1 && '¡Explicación Enviada!'}
          {step === 2 && 'Redirigiendo...'}
        </h3>
        <p className="text-lg opacity-90">
          {step === 0 && 'Procesando tu explicación...'}
          {step === 1 && 'Tu explicación ha sido enviada para revisión.'}
          {step === 2 && 'Vamos a ver las solicitudes...'}
        </p>
      </div>
    </div>
  );
};

export default SubmissionSuccess; 