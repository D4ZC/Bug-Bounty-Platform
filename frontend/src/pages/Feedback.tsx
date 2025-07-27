import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layouts/MainLayout';
import { useNavigate } from 'react-router-dom';

const Feedback: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [isFormEnabled, setIsFormEnabled] = useState<boolean>(true);
  const [showThankYouModal, setShowThankYouModal] = useState<boolean>(false);
  const [modalCountdown, setModalCountdown] = useState<number>(5);
  const navigate = useNavigate();

  const handleStarClick = (starIndex: number) => {
    if (isFormEnabled) {
      setRating(starIndex + 1);
    }
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isFormEnabled) {
      const value = e.target.value;
      if (value.length <= 2000) {
        setFeedback(value);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormEnabled && rating > 0) {
      // Aquí se enviaría el feedback al servidor
      setShowThankYouModal(true);
      setRating(0);
      setFeedback('');
    }
  };

  const handleToggleForm = () => {
    setIsFormEnabled(!isFormEnabled);
    if (isFormEnabled) {
      // Si se está desactivando, resetear las estrellas
      setRating(0);
    }
  };

  // Contador para el modal de agradecimiento
  useEffect(() => {
    if (showThankYouModal) {
      const interval = setInterval(() => {
        setModalCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            navigate('/dashboard');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [showThankYouModal, navigate]);

  return (
    <MainLayout>
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            💬 FeedBack Trimestral
          </h1>
          <p className="text-lg text-gray-600">
            Tu opinión nos ayuda a mejorar la aplicación
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sistema de calificación con estrellas */}
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                ¿Cómo calificarías tu experiencia?
              </h2>
              <div className="flex justify-center items-center space-x-2 mb-4">
                {[0, 1, 2, 3, 4].map((starIndex) => (
                  <button
                    key={starIndex}
                    type="button"
                    onClick={() => handleStarClick(starIndex)}
                    disabled={!isFormEnabled}
                    className={`text-4xl transition-all duration-200 ${
                      starIndex < rating
                        ? 'text-yellow-400 hover:text-yellow-500'
                        : 'text-gray-300 hover:text-gray-400'
                    } ${!isFormEnabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <p className="text-sm text-black">
                {rating === 0 && 'Selecciona una opción'}
                {rating === 1 && 'Muy malo'}
                {rating === 2 && 'Malo'}
                {rating === 3 && 'Regular'}
                {rating === 4 && 'Bueno'}
                {rating === 5 && 'Excelente'}
              </p>
            </div>

            {/* Cuadro de texto para feedback */}
            <div>
              <label htmlFor="feedback" className="block text-lg font-semibold text-gray-800 mb-3">
                Comentarios y sugerencias
              </label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={handleFeedbackChange}
                disabled={!isFormEnabled}
                placeholder="¿Qué tal te pareció la aplicación?, ¿Necesita mejorar en algo?, ¿Qué nos recomiendas? Agrega todo lo que sea necesario."
                className={`w-full h-48 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black ${
                  !isFormEnabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                }`}
                maxLength={2000}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">
                  {feedback.length}/2000 caracteres
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round((feedback.length / 2000) * 100)}% usado
                </span>
              </div>
            </div>

            {/* Botón de envío */}
            <div className="text-center">
              <button
                type="submit"
                disabled={!isFormEnabled || rating === 0}
                className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  isFormEnabled && rating > 0
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Enviar Feedback
              </button>
            </div>
          </form>

          {/* Interruptor para activar/desactivar el formulario */}
          <div className="flex justify-end items-center mt-8 pt-6 border-t border-gray-200">
            <span className="text-sm text-gray-600 mr-3">
              {isFormEnabled ? 'Formulario activado' : 'Formulario desactivado'}
            </span>
            <button
              onClick={handleToggleForm}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                isFormEnabled ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  isFormEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Modal de agradecimiento */}
      {showThankYouModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Fondo semitransparente */}
          <div className="fixed inset-0 bg-black bg-opacity-50" />
          
          {/* Modal */}
          <div className="relative bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl">
            <div className="text-center">
              {/* Icono de agradecimiento */}
              <div className="mb-4">
                <span className="text-6xl">🙏</span>
              </div>
              
              {/* Mensaje */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                ¡¡Muchas Gracias!!
              </h3>
              
              <p className="text-gray-600 mb-6">
                Siempre tendremos en cuenta la opinión de nuestros usuarios.
              </p>
              
              {/* Contador */}
              <p className="text-sm text-gray-500">
                Redirigiendo a Inicio en {modalCountdown} segundos...
              </p>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default Feedback; 