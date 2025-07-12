import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '@/contexts/ToastContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

function sanitizeInput(str: string) {
  return str.replace(/[<>"'`]/g, '').trim();
}
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const Login: React.FC = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Validación en tiempo real
    if (e.target.name === 'email') {
      if (!isValidEmail(e.target.value)) {
        setFieldErrors((prev) => ({ ...prev, email: 'Correo electrónico inválido.' }));
      } else {
        setFieldErrors((prev) => ({ ...prev, email: undefined }));
      }
    }
    if (e.target.name === 'password') {
      if (e.target.value.length < 6) {
        setFieldErrors((prev) => ({ ...prev, password: 'La contraseña debe tener al menos 6 caracteres.' }));
      } else {
        setFieldErrors((prev) => ({ ...prev, password: undefined }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    // Sanitizar y validar
    const email = sanitizeInput(form.email);
    const password = form.password.trim();
    if (!isValidEmail(email)) {
      setFieldErrors((prev) => ({ ...prev, email: 'Correo electrónico inválido.' }));
      return;
    }
    if (password.length < 6) {
      setFieldErrors((prev) => ({ ...prev, password: 'La contraseña debe tener al menos 6 caracteres.' }));
      return;
    }
    setLoading(true);
    try {
      await login({ email, password });
      showToast('¡Bienvenido de nuevo!', 'success');
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Error al iniciar sesión');
      showToast(err.response?.data?.message || 'Error al iniciar sesión', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0026] via-[#1a0033] to-[#0f0026] animate-fade-in">
      <form onSubmit={handleSubmit} className="bg-black/80 border-2 border-cyan-400 neon-shadow rounded-2xl p-8 w-full max-w-md flex flex-col gap-4 animate-pop-in">
        <h2 className="text-3xl font-extrabold text-cyan-200 mb-4 text-center drop-shadow-cyber">Iniciar Sesión</h2>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          className="p-3 rounded bg-gray-900 text-white border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 focus:scale-105"
          value={form.email}
          onChange={handleChange}
          required
          disabled={loading}
        />
        {fieldErrors.email && <div className="text-pink-400 text-xs font-bold animate-shake-x -mt-2 mb-1">{fieldErrors.email}</div>}
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="p-3 rounded bg-gray-900 text-white border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 focus:scale-105"
          value={form.password}
          onChange={handleChange}
          required
          disabled={loading}
        />
        {fieldErrors.password && <div className="text-pink-400 text-xs font-bold animate-shake-x -mt-2 mb-1">{fieldErrors.password}</div>}
        {error && <div className="text-pink-400 text-center font-bold animate-shake-x mt-2">{error}</div>}
        <button
          type="submit"
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold px-6 py-3 rounded-full shadow-cyber hover:scale-105 transition-transform focus:scale-105 focus:outline-none flex items-center justify-center gap-2"
          disabled={loading || !!fieldErrors.email || !!fieldErrors.password}
        >
          {loading ? <LoadingSpinner size={22} /> : 'Ingresar'}
        </button>
        <div className="text-center text-cyan-200 mt-2">
          ¿No tienes cuenta?{' '}
          <Link to="/auth/register" className="text-green-400 font-bold hover:underline">Regístrate</Link>
        </div>
      </form>
      <style>{`
        .animate-fade-in { animation: fade-in 0.7s cubic-bezier(.4,0,.2,1); }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-pop-in { animation: pop-in 0.7s cubic-bezier(.4,0,.2,1); }
        @keyframes pop-in { 0% { transform: scale(0.7); opacity: 0; } 80% { transform: scale(1.05); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
        .animate-shake-x { animation: shake-x 0.4s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes shake-x { 10%, 90% { transform: translateX(-2px); } 20%, 80% { transform: translateX(4px); } 30%, 50%, 70% { transform: translateX(-8px); } 40%, 60% { transform: translateX(8px); } }
      `}</style>
    </div>
  );
};

export default Login;
