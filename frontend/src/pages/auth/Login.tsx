import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { GiCrossedSwords } from 'react-icons/gi';
import { useAuth } from '../../contexts/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Limpiar error al escribir
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);

    if (result.success) {
      // Redirigir al dashboard o a la página anterior
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } else {
      setError(result.message || 'Error al iniciar sesión');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-mono" style={{ background: 'linear-gradient(to bottom right, #0a183d, #1a0033, #2d003e)' }}>
      <div className="bg-[#181c2bcc] border-2 border-[#00fff7] rounded-2xl p-8 shadow-[0_0_32px_#00fff7] backdrop-blur-md animate-fade-in-up w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <GiCrossedSwords size={48} color="#00fff7" />
          </div>
          <h1 className="text-3xl font-bold text-[#00fff7] mb-2">Iniciar Sesión</h1>
          <p className="text-[#6f7a8a] text-sm">Accede a tu cuenta de Bug Bounty</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-[#00fff7] text-sm font-bold mb-2">
              <FaEnvelope className="inline mr-2" />
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[#232b36] border-2 border-[#00fff7] rounded-xl text-white placeholder-[#6f7a8a] focus:outline-none focus:border-[#39ff14] focus:shadow-[0_0_12px_#39ff14] transition-all duration-300"
              placeholder="tu@email.com"
            />
          </div>

          {/* Contraseña */}
          <div>
            <label htmlFor="password" className="block text-[#00fff7] text-sm font-bold mb-2">
              <FaLock className="inline mr-2" />
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#232b36] border-2 border-[#00fff7] rounded-xl text-white placeholder-[#6f7a8a] focus:outline-none focus:border-[#39ff14] focus:shadow-[0_0_12px_#39ff14] transition-all duration-300 pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6f7a8a] hover:text-[#00fff7] transition-colors"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-[#ff4fa3] bg-opacity-20 border border-[#ff4fa3] text-[#ff4fa3] px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-[#00fff7] text-black font-bold rounded-xl shadow-[0_0_12px_#00fff7] transition-all duration-300 hover:bg-[#39ff14] hover:shadow-[0_0_20px_#39ff14] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#39ff14] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                Iniciando sesión...
              </div>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>

        {/* Enlaces adicionales */}
        <div className="mt-6 text-center">
          <p className="text-[#6f7a8a] text-sm">
            ¿No tienes cuenta?{' '}
            <Link 
              to="/register" 
              className="text-[#00fff7] hover:text-[#39ff14] font-bold transition-colors"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>

        {/* Información de prueba */}
        <div className="mt-6 p-4 bg-[#232b36] rounded-xl border border-[#00fff7]">
          <h3 className="text-[#39ff14] font-bold text-sm mb-2">💡 Datos de Prueba:</h3>
          <div className="text-[#6f7a8a] text-xs space-y-1">
            <p><strong>Email:</strong> ocampoale250806@gmail.com</p>
            <p><strong>Contraseña:</strong> 123456</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 