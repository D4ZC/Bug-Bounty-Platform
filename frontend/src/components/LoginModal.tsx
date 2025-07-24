import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, onLoginSuccess }) => {
  // const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation();
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!email || !password) {
      setFormError(t('Completa todos los campos'));
      return;
    }
    // Simula login exitoso: oculta el header y navega a la página principal
    sessionStorage.setItem('just_logged_in', '1'); // Marca que se acaba de iniciar sesión
    navigate('/dashboard');
    if (onLoginSuccess) onLoginSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-[#101a10] border-4 border-neon-green rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-glow" style={{boxShadow:'0 0 32px #00ff6a, 0 0 64px #00ff6a'}}>
        <button className="absolute top-3 right-3 text-neon-green text-2xl font-bold" onClick={onClose}>&times;</button>
        <h2 className="text-3xl font-extrabold text-center mb-6 animate-glitch-text" style={{color:'#00ff6a', textShadow:'0 0 12px #00ff6a'}}>{t('Iniciar sesión')}</h2>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder={t('Correo electrónico')}
            className="input bg-black/70 border-2 border-neon-green text-neon-green placeholder-neon-green font-mono rounded-xl px-4 py-3 focus:ring-2 focus:ring-neon-green focus:border-neon-green transition-all duration-200 shadow-neon"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{color:'#00ff6a', borderColor:'#00ff6a', background:'#0a1a0a', boxShadow:'0 0 8px #00ff6a'}}
          />
          <input
            type="password"
            placeholder={t('Contraseña')}
            className="input bg-black/70 border-2 border-neon-green text-neon-green placeholder-neon-green font-mono rounded-xl px-4 py-3 focus:ring-2 focus:ring-neon-green focus:border-neon-green transition-all duration-200 shadow-neon"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{color:'#00ff6a', borderColor:'#00ff6a', background:'#0a1a0a', boxShadow:'0 0 8px #00ff6a'}}
          />
          {formError && <div className="text-red-400 font-mono text-sm text-center">{formError}</div>}
          <button
            type="submit"
            className="w-full py-3 text-xl font-extrabold rounded-xl bg-gradient-to-r from-neon-green via-green-400 to-neon-green text-black shadow-lg border-2 border-neon-green hover:from-green-400 hover:to-neon-green transition-all duration-200 animate-glow"
            style={{boxShadow:'0 0 16px #00ff6a, 0 0 32px #00ff6a', background:'linear-gradient(90deg,#00ff6a 0%,#39ff14 100%)', color:'#101a10', borderColor:'#00ff6a'}}
          >
            {t('Entrar')}
          </button>
        </form>
        <style>{`
          .animate-glow { animation: glow 2.5s infinite alternate; }
          @keyframes glow { 0%{box-shadow:0 0 16px #00ff6a,0 0 32px #00ff6a;} 100%{box-shadow:0 0 32px #00ff6a,0 0 64px #00ff6a;} }
          .animate-glitch-text { animation: glitchText 1.2s infinite steps(2, end); }
          @keyframes glitchText { 0%{text-shadow:2px 0 #00ff6a, -2px 0 #00fff7;} 50%{text-shadow:-2px 0 #39ff14, 2px 0 #00ff6a;} 100%{text-shadow:2px 0 #00ff6a, -2px 0 #00fff7;} }
          .text-neon-green { color: #00ff6a; }
          .border-neon-green { border-color: #00ff6a; }
          .placeholder-neon-green::placeholder { color: #39ff14; opacity: 1; }
          .shadow-neon { box-shadow: 0 0 8px #00ff6a; }
        `}</style>
      </div>
    </div>
  );
};

export default LoginModal; 