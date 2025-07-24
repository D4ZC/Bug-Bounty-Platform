import React, { useState, useEffect } from 'react';
import TeamsScoreCard from './components/TeamsScoreCard';
import MVPTeamCard from './components/MVPTeamCard';
import GulagCard from './components/GulagCard';
import UserScoreCard from './components/UserScoreCard';
import UserProfileCard from './components/UserProfileCard';
import { useNavigate } from 'react-router-dom';
import apiService from '@/services/api';
import { useTranslation } from 'react-i18next';

const fontFamily = `'Share Tech Mono', 'Fira Mono', 'Consolas', monospace`;

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const carouselImages = [
    { src: '/Eventos/Unete.png', alt: t('Únete al evento'), caption: t('¡Únete al evento de hacking más grande!') },
    { src: '/Eventos/Premios.png', alt: t('Premios'), caption: t('Descubre los premios y recompensas exclusivas.') },
    { src: '/Eventos/Evento.png', alt: t('Evento especial'), caption: t('Participa en el evento especial de este mes.') },
  ];
  const [showWelcome, setShowWelcome] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    // Solo mostrar el mensaje si se acaba de iniciar sesión (marcado en sessionStorage)
    if (sessionStorage.getItem('just_logged_in') === '1' && !localStorage.getItem('hide_welcome_message')) {
      setShowWelcome(true);
      sessionStorage.removeItem('just_logged_in');
    }
  }, []);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    if (dontShowAgain) {
      localStorage.setItem('hide_welcome_message', '1');
    }
  };

  // Datos mockeados para la lógica dinámica
  const [teams] = useState([
    { name: t('Piteritos I'), score: 2000 },
    { name: t('Piteritos II'), score: 1900 },
    { name: t('Piteritos III'), score: 1500 },
  ]);
  const [users] = useState([
    { name: t('Piteritos I'), score: 2000 },
    { name: t('Piteritos II'), score: 1900 },
    { name: t('Piteritos III'), score: 1500 },
  ]);
  const [gulag] = useState([
    { name: t('deivid'), score: 50 },
    { name: t('runrun'), score: 25 },
    { name: t('excel'), score: 20 },
    { name: t('kick ass'), score: 20 },
    { name: t('pedrito sola'), score: 10 },
  ]);
  const [mvpTeam] = useState(t('P-TECH'));
  const [mvpUser] = useState({ name: t('D4ZC'), img: '', stats: { criticas: 10, altas: 20, medianas: 30, bajas: 9, total: 69 } });
  const navigate = useNavigate();
  const [diamondPlayers, setDiamondPlayers] = useState<{ username: string; points: number; rank: number }[]>([]);
  const [teamRanking, setTeamRanking] = useState<{ name: string; points: number; rank: number; members: string[] }[]>([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const nextSlide = () => setCarouselIndex((prev) => (prev + 1) % carouselImages.length);
  const prevSlide = () => setCarouselIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  const [modalImage, setModalImage] = useState<string | null>(null);

  React.useEffect(() => {
    apiService.getUserRanking().then((res: any) => {
      if (res.success && Array.isArray(res.data)) {
        // Filtrar los 5 mejores (Diamante)
        const sorted = [...res.data].sort((a, b) => b.points - a.points).slice(0, 5);
        setDiamondPlayers(sorted);
      }
    });
    apiService.getTeamRanking().then((res: any) => {
      if (res.success && Array.isArray(res.data)) {
        // Filtrar equipos con entre 3 y 10 miembros (simulación cuatrimestral)
        const filtered = res.data.filter((team: any) => team.members && team.members.length >= 3 && team.members.length <= 10);
        // Ordenar por puntos y tomar los 5 mejores
        const sorted = [...filtered].sort((a, b) => b.points - a.points).slice(0, 5);
        setTeamRanking(sorted);
      }
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black/90 text-neon-green p-8 font-mono relative overflow-hidden" style={{fontFamily: `'Share Tech Mono', 'Fira Mono', 'Consolas', monospace`}}>
      {/* Imagen de fondo restaurada */}
      <img src="/Header/Header.png" alt="Fondo dashboard" className="absolute inset-0 w-full h-full object-cover object-center opacity-60 z-0 animate-bg-zoom" style={{pointerEvents:'none'}} />
      {showWelcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg mx-auto p-10 rounded-3xl border-4 border-neon-green shadow-2xl bg-black/90 relative animate-glow">
            <button
              className="absolute top-4 right-4 text-neon-green text-2xl font-bold hover:text-green-400 transition"
              onClick={handleCloseWelcome}
              title="Cerrar"
              aria-label="Cerrar mensaje de bienvenida"
            >
              &#10005;
            </button>
            <h1 className="text-4xl font-extrabold mb-8 animate-glitch-text text-center" style={{color:'#00ff6a', textShadow:'0 0 16px #00ff6a, 0 0 32px #00ff6a'}}>{t('¡Bienvenido al Dashboard!')}</h1>
            <p className="text-xl mb-6 text-green-300 text-center">{t('Ya puedes explorar la plataforma Bug Bounty.')}</p>
            <div className="w-full bg-black/70 border-2 border-neon-green rounded-2xl p-8 shadow-xl flex flex-col gap-4 animate-glow">
              <h2 className="text-2xl font-bold text-neon-green mb-2 text-center">{t('¿Qué puedes hacer aquí?')}</h2>
              <ul className="list-disc pl-6 text-green-200 text-lg">
                <li>{t('Explora vulnerabilidades y desafíos.')}</li>
                <li>{t('Personaliza tu perfil y equipo.')}</li>
                <li>{t('Compra en la tienda y gana bugcoins.')}</li>
                <li>{t('¡Compite por el ranking y conviértete en MVP!')}</li>
              </ul>
              <label className="flex items-center gap-2 mt-6 cursor-pointer select-none text-green-300">
                <input
                  type="checkbox"
                  checked={dontShowAgain}
                  onChange={e => setDontShowAgain(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-neon-green border-neon-green rounded focus:ring-0"
                />
                {t('No volver a mostrar este mensaje')}
              </label>
            </div>
          </div>
        </div>
      )}
      <div className="w-full max-w-7xl mx-auto">
        {/* Carrusel hacker de anuncios */}
        <div className="mb-10 flex flex-col items-center relative z-10">
          <div className="relative w-full max-w-2xl mx-auto rounded-3xl border-4 border-cyan-400 shadow-2xl glassmorphism overflow-hidden" style={{clipPath:'polygon(0 0, 100% 0, 98% 100%, 2% 100%)'}}>
            {/* SVG decorativo glitch/graffiti */}
            <svg className="absolute left-0 top-0 w-full h-full pointer-events-none" style={{opacity:0.10, zIndex:0}}>
              <g className="animate-glitch-move">
                <rect x="10%" y="8%" width="120" height="18" fill="#00fff7" opacity="0.18" transform="skewY(-12)" />
                <rect x="70%" y="18%" width="90" height="12" fill="#ff00cc" opacity="0.13" transform="skewX(-18)" />
                <polygon points="80,120 120,140 100,160" fill="#ffe600" opacity="0.10" />
              </g>
            </svg>
            <img
              src={carouselImages[carouselIndex].src}
              alt={carouselImages[carouselIndex].alt}
              className="w-full h-64 object-cover rounded-2xl border-2 border-cyan-400 cursor-zoom-in"
              onClick={() => setModalImage(carouselImages[carouselIndex].src)}
            />
            <div className="absolute bottom-0 left-0 w-full bg-black/60 text-cyan-200 text-lg font-mono px-6 py-3 animate-glitch-text">{carouselImages[carouselIndex].caption}</div>
            {/* Controles */}
            <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-cyan-700/80 hover:bg-cyan-800 text-white rounded-full w-10 h-10 flex items-center justify-center border-2 border-cyan-400 shadow animate-glitch-btn z-10">&#8592;</button>
            <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-cyan-700/80 hover:bg-cyan-800 text-white rounded-full w-10 h-10 flex items-center justify-center border-2 border-cyan-400 shadow animate-glitch-btn z-10">&#8594;</button>
            {/* Indicadores */}
            <div className="absolute bottom-3 right-6 flex gap-2 z-10">
              {carouselImages.map((_, idx) => (
                <span key={idx} className={`w-3 h-3 rounded-full border-2 ${carouselIndex === idx ? 'bg-cyan-400 border-cyan-200' : 'bg-cyan-900 border-cyan-700'} transition-all`}></span>
              ))}
            </div>
          </div>
          {/* Modal de imagen grande */}
          {modalImage && (
            <div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in"
              onClick={() => setModalImage(null)}
              style={{backdropFilter:'blur(2px)'}}
            >
              <img
                src={modalImage}
                alt="Imagen grande"
                className="max-w-3xl max-h-[90vh] rounded-2xl border-4 border-cyan-400 shadow-2xl animate-pop-in"
                onClick={e => e.stopPropagation()}
              />
              <button
                className="absolute top-8 right-8 text-cyan-200 bg-black/60 rounded-full p-3 border-2 border-cyan-400 shadow-lg text-2xl font-bold hover:bg-cyan-800 transition z-50"
                onClick={() => setModalImage(null)}
                aria-label="Cerrar"
              >
                &times;
              </button>
            </div>
          )}
        </div>
        {/* Tarjetas del dashboard (resto igual) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Primera fila */}
          <div
            className="cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => navigate('/gulag')}
          >
            <GulagCard gulag={gulag} />
          </div>
          <TeamsScoreCard teams={teams} />
          <MVPTeamCard team={mvpTeam} />
          {/* Segunda fila: UserScoreCard, MVPUserCard, UserProfileCard */}
          <UserScoreCard users={users} />
          <UserProfileCard user={mvpUser} />
          {/* Card Ranking Mensual */}
          <div
            className="cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => navigate('/mensual-ranking')}
          >
            {/* Copia el contenido de la card original aquí */}
            <div className="relative rounded-3xl border-4 border-cyan-400 shadow-2xl glassmorphism flex flex-col justify-between overflow-hidden p-6"
              style={{ fontFamily, clipPath: 'polygon(0 0, 100% 0, 98% 100%, 2% 100%)' }}>
              {/* SVG decorativo glitch/graffiti */}
              <svg className="absolute left-0 top-0 w-full h-full pointer-events-none" style={{ opacity: 0.10, zIndex: 0 }}>
                <g className="animate-glitch-move">
                  <rect x="10%" y="8%" width="120" height="18" fill="#00fff7" opacity="0.18" transform="skewY(-12)" />
                  <rect x="70%" y="18%" width="90" height="12" fill="#ff00cc" opacity="0.13" transform="skewX(-18)" />
                  <polygon points="80,120 120,140 100,160" fill="#ffe600" opacity="0.10" />
                </g>
              </svg>
              <h3 className="text-2xl font-bold text-cyan-300 mb-2 text-center animate-glitch-text">{t('Ranking del Mes')}</h3>
              <p className="text-cyan-100 text-center mb-1">{t('¡Conoce a los 5 mejores jugadores!')} <span className='text-cyan-400 font-bold'>{t('Jugador del mes')}</span>!</p>
              <div className="flex justify-center mb-4">
                <span className="inline-block bg-cyan-700/60 text-cyan-200 px-4 py-2 rounded-lg font-mono text-lg font-semibold">{t('TOP 5 - Jugador del mes')}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-cyan-100 text-sm">
                  <thead>
                    <tr>
                      <th className="py-1 px-2 text-cyan-400 font-semibold">#</th>
                      <th className="py-1 px-2 text-cyan-400 font-semibold">{t('Jugador')}</th>
                      <th className="py-1 px-2 text-cyan-400 font-semibold">{t('Puntaje')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {diamondPlayers.map((player, i) => (
                      <tr key={player.username} className="border-b border-cyan-700/50 last:border-none">
                        <td className="py-1 px-2 font-bold text-cyan-300">{i + 1}</td>
                        <td className="py-1 px-2 font-bold">{player.username}</td>
                        <td className="py-1 px-2">{player.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Card Ranking Cuatrimestral */}
          <div
            className="cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => navigate('/cuatrimestral-ranking-teams')}
          >
            {/* Copia el contenido de la card original aquí */}
            <div className="relative rounded-3xl border-4 border-yellow-400 shadow-2xl glassmorphism flex flex-col justify-between overflow-hidden p-6"
              style={{ fontFamily, clipPath: 'polygon(0 0, 100% 0, 98% 100%, 2% 100%)' }}>
              {/* SVG decorativo glitch/graffiti */}
              <svg className="absolute left-0 top-0 w-full h-full pointer-events-none" style={{ opacity: 0.10, zIndex: 0 }}>
                <g className="animate-glitch-move">
                  <rect x="10%" y="8%" width="120" height="18" fill="#00fff7" opacity="0.18" transform="skewY(-12)" />
                  <rect x="70%" y="18%" width="90" height="12" fill="#ff00cc" opacity="0.13" transform="skewX(-18)" />
                  <polygon points="80,120 120,140 100,160" fill="#ffe600" opacity="0.10" />
                </g>
              </svg>
              <h3 className="text-2xl font-bold text-yellow-300 mb-2 text-center animate-glitch-text">{t('Ranking de Equipos (Cuatrimestral)')}</h3>
              <p className="text-yellow-100 text-center mb-1">{t('¡Top equipos de 3 a 10 miembros del cuatrimestre!')}</p>
              <div className="flex justify-center mb-4">
                <span className="inline-block bg-yellow-700/60 text-yellow-200 px-4 py-2 rounded-lg font-mono text-lg font-semibold">{t('TOP 5 - Equipo del Cuatrimestre')}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-yellow-100 text-sm">
                  <thead>
                    <tr>
                      <th className="py-1 px-2 text-yellow-400 font-semibold">#</th>
                      <th className="py-1 px-2 text-yellow-400 font-semibold">{t('Equipo')}</th>
                      <th className="py-1 px-2 text-yellow-400 font-semibold">{t('Puntaje')}</th>
                      <th className="py-1 px-2 text-yellow-400 font-semibold">{t('Miembros')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamRanking.map((team, i) => (
                      <tr key={team.name} className="border-b border-yellow-700/50 last:border-none">
                        <td className="py-1 px-2 font-bold text-yellow-300">{i + 1}</td>
                        <td className="py-1 px-2 font-bold">{team.name}</td>
                        <td className="py-1 px-2">{team.points}</td>
                        <td className="py-1 px-2">{team.members.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
        .glassmorphism { backdrop-filter: blur(8px) saturate(1.2); background: rgba(30,40,60,0.25); }
        .animate-glitch-move { animation: glitchMove 7s infinite alternate linear; }
        @keyframes glitchMove { 0%{transform:translateY(0);} 100%{transform:translateY(10px) skewX(-2deg);} }
        .animate-glitch-btn { animation: glitchBtn 1.5s infinite steps(2, end); }
        @keyframes glitchBtn { 0%{filter:none;} 20%{filter:brightness(1.2) hue-rotate(20deg);} 40%{filter:contrast(1.2) blur(0.5px);} 60%{filter:none;} 100%{filter:none;} }
        .animate-glitch-text { animation: glitchText 1.2s infinite steps(2, end); }
        @keyframes glitchText { 0%{text-shadow:2px 0 #00fff7, -2px 0 #ff00cc;} 50%{text-shadow:-2px 0 #ffe600, 2px 0 #00ff6a;} 100%{text-shadow:2px 0 #00fff7, -2px 0 #ff00cc;} }
        .animate-fade-in { animation: fadeIn 0.3s both; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-pop-in { animation: popIn 0.4s both; }
        @keyframes popIn { from { opacity: 0; transform: scale(0.7);} to { opacity: 1; transform: scale(1);} }
      `}</style>
    </div>
  );
};

export default Dashboard; 