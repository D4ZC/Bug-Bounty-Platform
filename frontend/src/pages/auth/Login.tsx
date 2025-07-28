import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showVerifyingModal, setShowVerifyingModal] = useState(false);
  const [dots, setDots] = useState('');

  // Animación de puntos suspensivos
  useEffect(() => {
    if (!showVerifyingModal) return;
    
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, [showVerifyingModal]);

  const handleLogin = () => {
    setShowVerifyingModal(true);
    
    // Simular verificación de credenciales por 3 segundos
    setTimeout(() => {
      setShowVerifyingModal(false);
      // Establecer bandera para mostrar modal de bienvenida en dashboard
      localStorage.setItem('fromLogin', 'true');
      // Redirigir al dashboard
      navigate('/dashboard');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      {/* Navbar superior */}
      <nav className="w-full bg-white h-16 flex items-center px-12 rounded-tl-2xl shadow-[0_4px_12px_0_rgba(0,0,0,0.06)] border-b-0">
        <span className="text-xl font-bold text-black">w3id on IBM Verify</span>
      </nav>
      <div className="flex items-center justify-center flex-1">
        <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-xl flex flex-col items-center mt-8">
          <h1 className="text-4xl font-bold mb-8 text-center text-black">Iniciar sesión en IBM</h1>
          <button
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded mb-6 text-lg transition-colors"
            onClick={handleLogin}
          >
            Iniciar sesión con w3id
          </button>
          <div className="flex items-center w-full mb-6"></div>
          <div className="text-center text-black text-base">
            Si no puedes Iniciar sesion Solicita ayuda <a href="#" className="text-blue-700 font-semibold hover:underline"> Aquí.</a>
          </div>
        </div>
      </div>
      {/* Barra inferior */}
      <footer className="w-full bg-white border-t border-gray-200 h-16 flex items-center justify-between px-12">
        <img src="https://pngimg.com/uploads/ibm/ibm_PNG19658.png" alt="IBM Logo" className="h-8 w-auto" />
        <a href="#" className="text-blue-700 font-semibold hover:underline">Privacy Policy</a>
      </footer>

      {/* Modal de verificación de credenciales */}
      {showVerifyingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <div className="mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Verificando Credenciales</h3>
            <p className="text-gray-600 text-lg">{dots}</p>
          </div>
        </div>
      )}


    </div>
  );
};

export default Login; 