import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setTimeout(() => {
      navigate('/', { replace: true });
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10 border border-gray-200 flex flex-col items-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Iniciar sesión</h2>
        <p className="text-center text-gray-500 mb-8">Plataforma de Bug Bounty</p>
        <form className="w-full space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={isSubmitting}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={isSubmitting}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
              placeholder="Tu contraseña"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
              Crear cuenta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
