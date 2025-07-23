import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      {/* Navbar superior */}
      <nav className="w-full bg-white border-b border-gray-200 shadow-sm h-16 flex items-center px-12">
        <span className="text-xl font-bold text-black">Bug Bounty Platform</span>
      </nav>
      <div className="flex items-center justify-center flex-1">
        <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-xl flex flex-col items-center mt-8">
          <h1 className="text-4xl font-bold mb-8 text-center text-black">Iniciar sesión en IBM</h1>
          <button
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded mb-6 text-lg transition-colors"
            onClick={() => navigate('/')}
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
    </div>
  );
};

export default Login; 