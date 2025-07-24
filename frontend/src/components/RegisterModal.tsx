import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
  onRegisterSuccess?: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ open, onClose, onRegisterSuccess }) => {
  const { register, error } = useAuth();
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const emailTrim = email.trim();
    const passwordTrim = password.trim();
    if (!emailTrim || !passwordTrim || !confirmPassword.trim()) {
      setFormError(t('Completa todos los campos'));
      return;
    }
    if (passwordTrim !== confirmPassword.trim()) {
      setFormError(t('Las contraseñas no coinciden'));
      return;
    }
    try {
      await register({
        email: emailTrim,
        password: passwordTrim,
        username,
        firstName: '',
        lastName: '',
        confirmPassword: confirmPassword.trim(),
      });
      onClose();
      if (onRegisterSuccess) onRegisterSuccess();
    } catch (err: any) {
      setFormError(err.message || t('Error al registrarse'));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-[#101a10] border-4 border-neon-green rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-glow" style={{boxShadow:'0 0 32px #00ff6a, 0 0 64px #00ff6a'}}>
        <button className="absolute top-3 right-3 text-neon-green text-2xl font-bold" onClick={onClose}>&times;</button>
        <h2 className="text-3xl font-extrabold text-center mb-6 animate-glitch-text" style={{color:'#00ff6a', textShadow:'0 0 12px #00ff6a'}}>{t('Registrarse')}</h2>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={t('Nombre de usuario')}
            className="input bg-black/70 border-2 border-neon-green text-neon-green placeholder-neon-green font-mono rounded-xl px-4 py-3 focus:ring-2 focus:ring-neon-green focus:border-neon-green transition-all duration-200 shadow-neon"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{color:'#00ff6a', borderColor:'#00ff6a', background:'#0a1a0a', boxShadow:'0 0 8px #00ff6a'}}
          />
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
          <input
            type="password"
            placeholder={t('Confirmar contraseña')}
            className="input bg-black/70 border-2 border-neon-green text-neon-green placeholder-neon-green font-mono rounded-xl px-4 py-3 focus:ring-2 focus:ring-neon-green focus:border-neon-green transition-all duration-200 shadow-neon"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            style={{color:'#00ff6a', borderColor:'#00ff6a', background:'#0a1a0a', boxShadow:'0 0 8px #00ff6a'}}
          />
          {(formError || error) && <div className="text-red-400 font-mono text-sm text-center">{formError || error}</div>}
          <button
            type="submit"
            className="w-full py-3 text-xl font-extrabold rounded-xl bg-gradient-to-r from-neon-green via-green-400 to-neon-green text-black shadow-lg border-2 border-neon-green hover:from-green-400 hover:to-neon-green transition-all duration-200 animate-glow"
            style={{boxShadow:'0 0 16px #00ff6a, 0 0 32px #00ff6a', background:'linear-gradient(90deg,#00ff6a 0%,#39ff14 100%)', color:'#101a10', borderColor:'#00ff6a'}}>
            {t('Registrarse')}
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

export default RegisterModal; 