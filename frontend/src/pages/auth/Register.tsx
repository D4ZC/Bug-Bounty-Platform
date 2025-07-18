import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '@/components/layouts/AuthLayout';
import { FaArrowLeft } from 'react-icons/fa';

const Register: React.FC = () => {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    // Simulación: redirigir siempre a login
    navigate('/auth/login');
  };

  return (
    <AuthLayout>
      <div className="rgb-background" />
      <button
        className="neon-btn fixed top-20 left-6 z-30"
        onClick={() => navigate('/')}
      >
        <FaArrowLeft className="text-xl arrow-animate" /> <span>Volver al inicio</span>
      </button>
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Partículas animadas */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl top-[-10%] left-[-10%] animate-float-slow" />
          <div className="absolute w-80 h-80 bg-purple-500/20 rounded-full blur-2xl bottom-[-10%] right-[-10%] animate-float-fast" />
          <div className="absolute w-40 h-40 bg-pink-500/10 rounded-full blur-2xl top-1/2 left-1/3 animate-float-mid" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="form-animated bg-[#181c24]/95 border-2 border-blue-700 rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col gap-6 z-10 backdrop-blur-xl"
        >
          <h2 className="text-3xl font-extrabold text-blue-400 text-center mb-2 drop-shadow">Registro</h2>
          <input
            type="text"
            placeholder="Usuario"
            className="px-4 py-3 rounded-lg bg-[#23273a] text-white border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-3 rounded-lg bg-[#23273a] text-white border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="px-4 py-3 rounded-lg bg-[#23273a] text-white border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            className="px-4 py-3 rounded-lg bg-[#23273a] text-white border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          {formError && <div className="text-red-400 text-center font-bold">{formError}</div>}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg transition-all text-lg"
            disabled={isLoading}
          >
            {isLoading ? 'Registrando...' : 'Registrarse'}
          </button>
          <div className="text-center text-blue-300 mt-2">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="underline hover:text-blue-400">Inicia sesión</Link>
          </div>
        </form>
      </div>
      {/* Animaciones CSS */}
      <style>{`
@keyframes float-slow {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-30px) scale(1.1); }
}
.animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
@keyframes float-fast {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(40px) scale(1.05); }
}
.animate-float-fast { animation: float-fast 6s ease-in-out infinite; }
@keyframes float-mid {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.08); }
}
.animate-float-mid { animation: float-mid 8s ease-in-out infinite; }
`}</style>
    </AuthLayout>
  );
};

export default Register; 