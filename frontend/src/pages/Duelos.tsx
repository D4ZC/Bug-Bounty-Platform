import React, { useState } from 'react';
import { User, Group, UserMultiple } from '@carbon/icons-react';

const fontFamily = `'Share Tech Mono', 'Fira Mono', 'Consolas', monospace`;

const categorias = [
  { nombre: 'Críticas', costo: 200 },
  { nombre: 'Altas', costo: 100 },
  { nombre: 'Medias', costo: 50 },
  { nombre: 'Bajas', costo: 20 },
];
const retos1v1 = [
  'Captura la bandera (CTF) rápida',
  'Explotar una vulnerabilidad XSS',
  'Resolver un reto de reversing',
  'Bypassear un WAF',
  'Descubrir un subdominio oculto',
  'Crackear un hash',
  'Escalar privilegios en un entorno simulado',
];
const retosEquipos = [
  'Defender un servidor ante ataques',
  'Competencia de bug bounty por tiempo',
  'Resolver un reto de forense colaborativo',
  'Simulación de ataque/red team vs blue team',
  'Desafío de OSINT en grupo',
  'Pentest colaborativo a una app web',
];

function getUserPoints() {
  return parseInt(localStorage.getItem('bugcoins') || '1000', 10);
}
function setUserPoints(p: number) {
  localStorage.setItem('bugcoins', String(p));
}
function getTeamPoints() {
  return parseInt(localStorage.getItem('team_bugcoins') || '2000', 10);
}
function setTeamPoints(p: number) {
  localStorage.setItem('team_bugcoins', String(p));
}

const Duelos: React.FC = () => {
  const [tab, setTab] = useState<'1v1'|'equipos'|'reglas'>('1v1');
  // Estado para duelos 1v1
  const [cat1v1, setCat1v1] = useState(categorias[0]);
  const [enDuelo1v1, setEnDuelo1v1] = useState(false);
  const [anon1v1, setAnon1v1] = useState(true);
  const [resultado1v1, setResultado1v1] = useState<'ganaste'|'perdiste'|'empate'|null>(null);
  const [userPoints, setUserPointsState] = useState(getUserPoints());
  // Estado para duelos por equipos
  const [catEq, setCatEq] = useState(categorias[0]);
  const [vulnsEq, setVulnsEq] = useState(1);
  const [enDueloEq, setEnDueloEq] = useState(false);
  const [anonEq, setAnonEq] = useState(true);
  const [resultadoEq, setResultadoEq] = useState<'ganaron'|'perdieron'|'empate'|null>(null);
  const [teamPoints, setTeamPointsState] = useState(getTeamPoints());

  // Lógica de duelo 1v1
  const iniciarDuelo1v1 = () => {
    if (userPoints < cat1v1.costo) return;
    setUserPoints(userPoints - cat1v1.costo);
    setUserPointsState(userPoints - cat1v1.costo);
    setAnon1v1(true);
    setEnDuelo1v1(true);
    setResultado1v1(null);
  };
  const resolverDuelo1v1 = () => {
    // Simulación: 0=empate, 1=gana user, 2=gana rival
    const r = Math.floor(Math.random()*3);
    if (r === 0) {
      setResultado1v1('empate');
    } else if (r === 1) {
      setResultado1v1('ganaste');
      setUserPoints(userPoints + cat1v1.costo*2);
      setUserPointsState(userPoints + cat1v1.costo*2);
    } else {
      setResultado1v1('perdiste');
    }
    setAnon1v1(false);
  };
  // Lógica de duelo por equipos
  const costoEq = catEq.costo * vulnsEq;
  const iniciarDueloEq = () => {
    if (teamPoints < costoEq) return;
    setTeamPoints(teamPoints - costoEq);
    setTeamPointsState(teamPoints - costoEq);
    setAnonEq(true);
    setEnDueloEq(true);
    setResultadoEq(null);
  };
  const resolverDueloEq = () => {
    const r = Math.floor(Math.random()*3);
    if (r === 0) {
      setResultadoEq('empate');
    } else if (r === 1) {
      setResultadoEq('ganaron');
      setTeamPoints(teamPoints + costoEq*2);
      setTeamPointsState(teamPoints + costoEq*2);
    } else {
      setResultadoEq('perdieron');
    }
    setAnonEq(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 relative overflow-hidden" style={{fontFamily}}>
      {/* Fondo hacker */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 animate-wd2-bg-gradient" style={{background: 'linear-gradient(120deg, #00fff7 0%, #ff00cc 40%, #ffe600 80%, #00ff6a 100%)', opacity: 0.18}} />
        <svg className="absolute left-0 top-0 w-full h-full" style={{opacity:0.13}}>
          <g className="animate-glitch-move">
            <rect x="10%" y="8%" width="120" height="18" fill="#00fff7" opacity="0.18" transform="skewY(-12)" />
            <rect x="70%" y="18%" width="90" height="12" fill="#ff00cc" opacity="0.13" transform="skewX(-18)" />
            <polygon points="80,400 120,420 100,440" fill="#ffe600" opacity="0.10" />
            <polygon points="600,80 650,100 630,120" fill="#00ff6a" opacity="0.10" />
            <rect x="60%" y="80%" width="60" height="10" fill="#fff" opacity="0.07" transform="skewY(8)" />
          </g>
        </svg>
        <div className="absolute inset-0 bg-[url('/static/noise.png')] opacity-10 mix-blend-soft-light pointer-events-none" />
        <svg className="absolute w-full h-full" style={{opacity:0.10}}>
          <circle cx="20%" cy="20%" r="60" fill="#00fff7" />
          <circle cx="80%" cy="30%" r="40" fill="#ff00cc" />
        </svg>
      </div>
      <div className="w-full max-w-3xl mx-auto z-10">
        <h1 className="text-4xl font-extrabold text-center mb-10 tracking-widest text-pink-300 animate-glitch-text flex items-center justify-center gap-4">
          <UserMultiple size={36} className="text-yellow-300 animate-glow" /> Duelos de Ciberseguridad
        </h1>
        <div className="flex justify-center gap-4 mb-8">
          <button
            className={`px-8 py-3 rounded-xl font-bold text-lg border-2 transition-all duration-150 ${tab==='1v1' ? 'bg-cyan-800 text-cyan-100 border-cyan-400 shadow-lg' : 'bg-black/40 text-cyan-400 border-cyan-700 hover:bg-cyan-900/20'}`}
            onClick={()=>setTab('1v1')}
          >
            <User size={24} className="inline mr-2" /> 1 vs 1
          </button>
          <button
            className={`px-8 py-3 rounded-xl font-bold text-lg border-2 transition-all duration-150 ${tab==='equipos' ? 'bg-yellow-800 text-yellow-100 border-yellow-400 shadow-lg' : 'bg-black/40 text-yellow-400 border-yellow-700 hover:bg-yellow-900/20'}`}
            onClick={()=>setTab('equipos')}
          >
            <Group size={24} className="inline mr-2" /> Por Equipos
          </button>
          <button
            className={`px-8 py-3 rounded-xl font-bold text-lg border-2 transition-all duration-150 ${tab==='reglas' ? 'bg-pink-800 text-pink-100 border-pink-400 shadow-lg' : 'bg-black/40 text-pink-400 border-pink-700 hover:bg-pink-900/20'}`}
            onClick={()=>setTab('reglas')}
          >
            <span className="inline mr-2">📜</span> Reglas
          </button>
        </div>
        {/* Sección de duelos */}
        {tab==='1v1' && (
          <div className="bg-black/70 border-2 border-cyan-400 rounded-3xl p-8 shadow-2xl glassmorphism animate-fade-in">
            <h2 className="text-2xl font-bold text-cyan-300 mb-4 animate-glitch-text">Duelo 1 vs 1</h2>
            <div className="flex flex-col md:flex-row gap-6 mb-6 items-center">
              <div>
                <label className="block text-cyan-200 font-bold mb-2">Categoría:</label>
                <select className="px-4 py-2 rounded-lg border-2 border-cyan-400 bg-black text-cyan-200 font-mono" value={cat1v1.nombre} onChange={e=>setCat1v1(categorias.find(c=>c.nombre===e.target.value) || categorias[0])}>
                  {categorias.map(c=>(<option key={c.nombre} value={c.nombre}>{c.nombre} ({c.costo} pts)</option>))}
                </select>
              </div>
              <div className="text-cyan-300 font-bold text-lg">Tus puntos: <span className="text-cyan-100">{userPoints}</span></div>
            </div>
            {!enDuelo1v1 ? (
              <button
                className={`mt-4 px-6 py-3 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-cyan-100 font-bold border-2 border-cyan-400 shadow animate-glitch-btn transition-all duration-150 ${userPoints<cat1v1.costo?'opacity-50 cursor-not-allowed':''}`}
                onClick={iniciarDuelo1v1}
                disabled={userPoints<cat1v1.costo}
              >Iniciar Duelo 1v1</button>
            ) : (
              <div className="flex flex-col items-center gap-4 mt-4">
                <div className="flex gap-8 items-center mb-2">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-cyan-800 flex items-center justify-center text-2xl font-bold text-cyan-200 border-2 border-cyan-400">{anon1v1?'Jugador A':'Tú'}</div>
                  </div>
                  <span className="text-cyan-400 font-bold text-xl">VS</span>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-cyan-800 flex items-center justify-center text-2xl font-bold text-cyan-200 border-2 border-cyan-400">{anon1v1?'Jugador B':'Rival'}</div>
                  </div>
                </div>
                <div className="mb-2 text-cyan-200">Reto: <span className="font-bold text-cyan-100">{retos1v1[Math.floor(Math.random()*retos1v1.length)]}</span></div>
                {!resultado1v1 ? (
                  <button className="px-6 py-3 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-cyan-100 font-bold border-2 border-cyan-400 shadow animate-glitch-btn transition-all duration-150" onClick={resolverDuelo1v1}>Resolver vulnerabilidad</button>
                ) : (
                  <div className="text-center mt-2">
                    {resultado1v1==='ganaste' && <div className="text-green-400 font-bold text-xl">¡Ganaste el duelo! (+{cat1v1.costo*2} pts)</div>}
                    {resultado1v1==='perdiste' && <div className="text-red-400 font-bold text-xl">Perdiste el duelo. (Pierdes tus puntos)</div>}
                    {resultado1v1==='empate' && <div className="text-yellow-300 font-bold text-xl">Nadie resolvió la vulnerabilidad. Ambos pierden los puntos.</div>}
                    <button className="mt-4 px-6 py-2 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-cyan-100 font-bold border-2 border-cyan-400 shadow animate-glitch-btn transition-all duration-150" onClick={()=>{setEnDuelo1v1(false); setResultado1v1(null);}}>Nuevo duelo</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {tab==='equipos' && (
          <div className="bg-black/70 border-2 border-yellow-400 rounded-3xl p-8 shadow-2xl glassmorphism animate-fade-in">
            <h2 className="text-2xl font-bold text-yellow-300 mb-4 animate-glitch-text">Duelo por Equipos</h2>
            <div className="flex flex-col md:flex-row gap-6 mb-6 items-center">
              <div>
                <label className="block text-yellow-200 font-bold mb-2">Categoría:</label>
                <select className="px-4 py-2 rounded-lg border-2 border-yellow-400 bg-black text-yellow-200 font-mono" value={catEq.nombre} onChange={e=>setCatEq(categorias.find(c=>c.nombre===e.target.value) || categorias[0])}>
                  {categorias.map(c=>(<option key={c.nombre} value={c.nombre}>{c.nombre} ({c.costo} pts)</option>))}
                </select>
              </div>
              <div>
                <label className="block text-yellow-200 font-bold mb-2">Vulnerabilidades:</label>
                <input type="number" min={1} max={10} value={vulnsEq} onChange={e=>setVulnsEq(Math.max(1,Math.min(10,parseInt(e.target.value)||1)))} className="px-4 py-2 rounded-lg border-2 border-yellow-400 bg-black text-yellow-200 font-mono w-20" />
              </div>
              <div className="text-yellow-300 font-bold text-lg">Puntos del equipo: <span className="text-yellow-100">{teamPoints}</span></div>
            </div>
            {!enDueloEq ? (
              <button
                className={`mt-4 px-6 py-3 rounded-xl bg-yellow-700 hover:bg-yellow-800 text-yellow-100 font-bold border-2 border-yellow-400 shadow animate-glitch-btn transition-all duration-150 ${teamPoints<costoEq?'opacity-50 cursor-not-allowed':''}`}
                onClick={iniciarDueloEq}
                disabled={teamPoints<costoEq}
              >Iniciar Duelo por Equipos</button>
            ) : (
              <div className="flex flex-col items-center gap-4 mt-4">
                <div className="flex gap-8 items-center mb-2">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-yellow-800 flex items-center justify-center text-2xl font-bold text-yellow-200 border-2 border-yellow-400">{anonEq?'Equipo A':'Tu equipo'}</div>
                  </div>
                  <span className="text-yellow-400 font-bold text-xl">VS</span>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-yellow-800 flex items-center justify-center text-2xl font-bold text-yellow-200 border-2 border-yellow-400">{anonEq?'Equipo B':'Rival'}</div>
                  </div>
                </div>
                <div className="mb-2 text-yellow-200">Reto: <span className="font-bold text-yellow-100">{retosEquipos[Math.floor(Math.random()*retosEquipos.length)]}</span></div>
                {!resultadoEq ? (
                  <button className="px-6 py-3 rounded-xl bg-yellow-700 hover:bg-yellow-800 text-yellow-100 font-bold border-2 border-yellow-400 shadow animate-glitch-btn transition-all duration-150" onClick={resolverDueloEq}>Resolver vulnerabilidad</button>
                ) : (
                  <div className="text-center mt-2">
                    {resultadoEq==='ganaron' && <div className="text-green-400 font-bold text-xl">¡Tu equipo ganó el duelo! (+{costoEq*2} pts)</div>}
                    {resultadoEq==='perdieron' && <div className="text-red-400 font-bold text-xl">Tu equipo perdió el duelo. (Pierden sus puntos)</div>}
                    {resultadoEq==='empate' && <div className="text-yellow-300 font-bold text-xl">Nadie resolvió la vulnerabilidad. Ambos equipos pierden los puntos.</div>}
                    <button className="mt-4 px-6 py-2 rounded-xl bg-yellow-700 hover:bg-yellow-800 text-yellow-100 font-bold border-2 border-yellow-400 shadow animate-glitch-btn transition-all duration-150" onClick={()=>{setEnDueloEq(false); setResultadoEq(null);}}>Nuevo duelo</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {tab==='reglas' && (
          <div className="bg-black/80 border-2 border-pink-400 rounded-3xl p-8 shadow-2xl glassmorphism animate-fade-in text-pink-100">
            <h2 className="text-2xl font-bold text-pink-300 mb-4 animate-glitch-text">Reglas de los Duelos</h2>
            <ul className="list-disc pl-8 mb-4 text-lg">
              <li>Los usuarios o equipos pueden iniciar duelos apostando puntos.</li>
              <li>El costo de entrada depende de la categoría: Críticas, Altas, Medias o Bajas.</li>
              <li>En duelos de equipos, el costo incrementa según el número de vulnerabilidades.</li>
              <li>Si no tienes suficientes puntos, no puedes participar.</li>
              <li>Si nadie resuelve vulnerabilidades, ambos bandos pierden los puntos apostados.</li>
              <li>Durante el duelo, los participantes son anónimos. Solo se revelan los ganadores al finalizar.</li>
            </ul>
            <div className="text-pink-200 mt-4">¡Demuestra tus habilidades y sube en el ranking de ciberseguridad!</div>
          </div>
        )}
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
        .glassmorphism { backdrop-filter: blur(8px) saturate(1.2); background: rgba(30,40,60,0.25); }
        .animate-glow { box-shadow: 0 0 32px #ffe600, 0 0 64px #ffe600; animation: glow 2.5s infinite alternate; }
        @keyframes glow { 0%{box-shadow:0 0 32px #ffe600,0 0 64px #ffe600;} 100%{box-shadow:0 0 64px #ffe600,0 0 128px #ffe600;} }
        .animate-fade-in { animation: fadeIn 1.2s both; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(40px);} to { opacity: 1; transform: none;} }
        .animate-glitch-move { animation: glitchMove 7s infinite alternate linear; }
        @keyframes glitchMove { 0%{transform:translateY(0);} 100%{transform:translateY(10px) skewX(-2deg);} }
        .animate-glitch-btn { animation: glitchBtn 1.5s infinite steps(2, end); }
        @keyframes glitchBtn { 0%{filter:none;} 20%{filter:brightness(1.2) hue-rotate(20deg);} 40%{filter:contrast(1.2) blur(0.5px);} 60%{filter:none;} 100%{filter:none;} }
        .animate-glitch-text { animation: glitchText 1.2s infinite steps(2, end); }
        @keyframes glitchText { 0%{text-shadow:2px 0 #00fff7, -2px 0 #ff00cc;} 50%{text-shadow:-2px 0 #ffe600, 2px 0 #00ff6a;} 100%{text-shadow:2px 0 #00fff7, -2px 0 #ff00cc;} }
      `}</style>
    </div>
  );
};

export default Duelos; 