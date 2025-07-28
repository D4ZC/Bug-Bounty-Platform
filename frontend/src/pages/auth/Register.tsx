import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaEnvelope, FaIdCard } from 'react-icons/fa';
import { GiCrossedSwords } from 'react-icons/gi';
import { useAuth } from '../../contexts/AuthContext';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Limpiar error al escribir
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      setError('La contraseña debe contener al menos una letra minúscula, una mayúscula y un número');
      return false;
    }
    if (formData.username.length < 3) {
      setError('El nombre de usuario debe tener al menos 3 caracteres');
      return false;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      setError('El nombre de usuario solo puede contener letras, números y guiones bajos');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    const result = await register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      username: formData.username,
      password: formData.password
    });

    if (result.success) {
      // Redirigir al dashboard
      navigate('/dashboard', { replace: true });
    } else {
      setError(result.message || 'Error al registrar usuario');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-mono py-8" style={{ background: 'linear-gradient(to bottom right, #0a183d, #1a0033, #2d003e)' }}>
      <div className="bg-[#181c2bcc] border-2 border-[#00fff7] rounded-2xl p-8 shadow-[0_0_32px_#00fff7] backdrop-blur-md animate-fade-in-up w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <GiCrossedSwords size={48} color="#00fff7" />
          </div>
          <h1 className="text-3xl font-bold text-[#00fff7] mb-2">Crear Cuenta</h1>
          <p className="text-[#6f7a8a] text-sm">Únete a la comunidad Bug Bounty</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre y Apellido */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-[#00fff7] text-sm font-bold mb-2">
                <FaIdCard className="inline mr-2" />
                Nombre
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#232b36] border-2 border-[#00fff7] rounded-xl text-white placeholder-[#6f7a8a] focus:outline-none focus:border-[#39ff14] focus:shadow-[0_0_12px_#39ff14] transition-all duration-300"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-[#00fff7] text-sm font-bold mb-2">
                <FaIdCard className="inline mr-2" />
                Apellido
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#232b36] border-2 border-[#00fff7] rounded-xl text-white placeholder-[#6f7a8a] focus:outline-none focus:border-[#39ff14] focus:shadow-[0_0_12px_#39ff14] transition-all duration-300"
                placeholder="Tu apellido"
              />
            </div>
          </div>

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

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-[#00fff7] text-sm font-bold mb-2">
              <FaUser className="inline mr-2" />
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[#232b36] border-2 border-[#00fff7] rounded-xl text-white placeholder-[#6f7a8a] focus:outline-none focus:border-[#39ff14] focus:shadow-[0_0_12px_#39ff14] transition-all duration-300"
              placeholder="usuario123"
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

          {/* Confirmar Contraseña */}
          <div>
            <label htmlFor="confirmPassword" className="block text-[#00fff7] text-sm font-bold mb-2">
              <FaLock className="inline mr-2" />
              Confirmar Contraseña
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#232b36] border-2 border-[#00fff7] rounded-xl text-white placeholder-[#6f7a8a] focus:outline-none focus:border-[#39ff14] focus:shadow-[0_0_12px_#39ff14] transition-all duration-300 pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6f7a8a] hover:text-[#00fff7] transition-colors"
              >
                {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
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
                Creando cuenta...
              </div>
            ) : (
              'Crear Cuenta'
            )}
          </button>
        </form>

        {/* Enlaces adicionales */}
        <div className="mt-6 text-center">
          <p className="text-[#6f7a8a] text-sm">
            ¿Ya tienes cuenta?{' '}
            <Link 
              to="/login" 
              className="text-[#00fff7] hover:text-[#39ff14] font-bold transition-colors"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </div>

        {/* Requisitos de contraseña */}
        <div className="mt-6 p-4 bg-[#232b36] rounded-xl border border-[#00fff7]">
          <h3 className="text-[#39ff14] font-bold text-sm mb-2">🔒 Requisitos de Contraseña:</h3>
          <ul className="text-[#6f7a8a] text-xs space-y-1">
            <li>• Mínimo 6 caracteres</li>
            <li>• Al menos una letra minúscula</li>
            <li>• Al menos una letra mayúscula</li>
            <li>• Al menos un número</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Register; 