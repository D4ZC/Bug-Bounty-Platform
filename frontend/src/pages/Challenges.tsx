import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';

const CHALLENGE_CATEGORIES = {
  WEB: 'web',
  MOBILE: 'mobile',
  NETWORK: 'network',
};

const webChallenges = [
  { id: 1, name: 'SQL Injection', desc: 'Encuentra y explota una vulnerabilidad de inyección SQL.', difficulty: 'Alta', status: 'Abierto', reward: 500 },
  { id: 2, name: 'XSS Persistente', desc: 'Demuestra un XSS persistente en el foro.', difficulty: 'Media', status: 'Abierto', reward: 300 },
  { id: 3, name: 'CSRF en perfil', desc: 'Realiza un ataque CSRF exitoso en la edición de perfil.', difficulty: 'Baja', status: 'Cerrado', reward: 200 },
];

const mobileChallenges = [
  { id: 1, name: 'Reverse APK', desc: 'Analiza y revierte una APK para encontrar credenciales.', difficulty: 'Alta', status: 'Abierto', reward: 600 },
  { id: 2, name: 'Insecure Storage', desc: 'Detecta almacenamiento inseguro en la app.', difficulty: 'Media', status: 'Abierto', reward: 350 },
  { id: 3, name: 'Intercepción de tráfico', desc: 'Intercepta tráfico no cifrado.', difficulty: 'Baja', status: 'Cerrado', reward: 150 },
];

const networkChallenges = [
  { id: 1, name: 'Escaneo de puertos', desc: 'Identifica servicios expuestos en la red.', difficulty: 'Baja', status: 'Abierto', reward: 200 },
  { id: 2, name: 'MitM Attack', desc: 'Realiza un ataque Man-in-the-Middle.', difficulty: 'Alta', status: 'Abierto', reward: 700 },
  { id: 3, name: 'DNS Spoofing', desc: 'Demuestra un ataque de DNS spoofing.', difficulty: 'Media', status: 'Cerrado', reward: 300 },
];

const statusColors = {
  'Abierto': 'bg-green-100 text-green-800',
  'Cerrado': 'bg-red-100 text-red-800',
};

const difficultyColors = {
  'Alta': 'bg-red-200 text-red-900',
  'Media': 'bg-yellow-200 text-yellow-900',
  'Baja': 'bg-green-200 text-green-900',
};

const Challenges: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [selected, setSelected] = useState<string | null>(null);

  const renderChallenges = (challenges: any[], title: string) => (
    <div className="bg-white rounded-lg shadow-md p-8 mt-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map(ch => (
          <div key={ch.id} className="flex flex-col bg-gray-50 rounded-lg p-6 shadow hover:shadow-lg transition">
            <div className="font-semibold text-gray-900 mb-1">{ch.name}</div>
            <div className="text-xs text-gray-500 mb-2">{ch.desc}</div>
            <div className="flex gap-2 mb-2">
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${difficultyColors[ch.difficulty]}`}>{ch.difficulty}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[ch.status]}`}>{ch.status}</span>
            </div>
            <div className="font-bold text-blue-700 mb-2">Recompensa: {ch.reward} puntos</div>
            <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm" disabled={ch.status !== 'Abierto'}>
              {ch.status === 'Abierto' ? 'Participar' : 'Cerrado'}
            </button>
          </div>
        ))}
      </div>
      <button className="mt-6 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300" onClick={() => setSelected(null)}>Volver</button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Retos y Competencias</h1>
      <p className="text-lg text-gray-600 mb-8">Participa en retos de seguridad y gana recompensas</p>

      {/* Retos destacados */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-blue-800 mb-4">Retos destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex flex-col bg-white rounded-lg p-6 shadow hover:shadow-lg transition">
            <div className="font-semibold text-gray-900 mb-1">SQL Injection</div>
            <div className="text-xs text-gray-500 mb-1">Categoría: Web</div>
            <div className="flex gap-2 mb-2">
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${difficultyColors['Alta']}`}>Alta</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors['Abierto']}`}>Abierto</span>
            </div>
            <div className="font-bold text-blue-700 mb-2">Recompensa: 500 puntos</div>
            <div className="text-xs text-gray-500">Encuentra y explota una vulnerabilidad de inyección SQL.</div>
          </div>
          <div className="flex flex-col bg-white rounded-lg p-6 shadow hover:shadow-lg transition">
            <div className="font-semibold text-gray-900 mb-1">Reverse APK</div>
            <div className="text-xs text-gray-500 mb-1">Categoría: Mobile</div>
            <div className="flex gap-2 mb-2">
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${difficultyColors['Alta']}`}>Alta</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors['Abierto']}`}>Abierto</span>
            </div>
            <div className="font-bold text-blue-700 mb-2">Recompensa: 600 puntos</div>
            <div className="text-xs text-gray-500">Analiza y revierte una APK para encontrar credenciales.</div>
          </div>
          <div className="flex flex-col bg-white rounded-lg p-6 shadow hover:shadow-lg transition">
            <div className="font-semibold text-gray-900 mb-1">MitM Attack</div>
            <div className="text-xs text-gray-500 mb-1">Categoría: Network</div>
            <div className="flex gap-2 mb-2">
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${difficultyColors['Alta']}`}>Alta</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors['Abierto']}`}>Abierto</span>
            </div>
            <div className="font-bold text-blue-700 mb-2">Recompensa: 700 puntos</div>
            <div className="text-xs text-gray-500">Realiza un ataque Man-in-the-Middle exitoso.</div>
          </div>
          <div className="flex flex-col bg-white rounded-lg p-6 shadow hover:shadow-lg transition">
            <div className="font-semibold text-gray-900 mb-1">XSS Persistente</div>
            <div className="text-xs text-gray-500 mb-1">Categoría: Web</div>
            <div className="flex gap-2 mb-2">
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${difficultyColors['Media']}`}>Media</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors['Abierto']}`}>Abierto</span>
            </div>
            <div className="font-bold text-blue-700 mb-2">Recompensa: 300 puntos</div>
            <div className="text-xs text-gray-500">Demuestra un XSS persistente en el foro.</div>
          </div>
          <div className="flex flex-col bg-white rounded-lg p-6 shadow hover:shadow-lg transition">
            <div className="font-semibold text-gray-900 mb-1">Insecure Storage</div>
            <div className="text-xs text-gray-500 mb-1">Categoría: Mobile</div>
            <div className="flex gap-2 mb-2">
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${difficultyColors['Media']}`}>Media</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors['Abierto']}`}>Abierto</span>
            </div>
            <div className="font-bold text-blue-700 mb-2">Recompensa: 350 puntos</div>
            <div className="text-xs text-gray-500">Detecta almacenamiento inseguro en la app.</div>
          </div>
          <div className="flex flex-col bg-white rounded-lg p-6 shadow hover:shadow-lg transition">
            <div className="font-semibold text-gray-900 mb-1">CSRF en perfil</div>
            <div className="text-xs text-gray-500 mb-1">Categoría: Web</div>
            <div className="flex gap-2 mb-2">
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${difficultyColors['Baja']}`}>Baja</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors['Cerrado']}`}>Cerrado</span>
            </div>
            <div className="font-bold text-blue-700 mb-2">Recompensa: 200 puntos</div>
            <div className="text-xs text-gray-500">Realiza un ataque CSRF exitoso en la edición de perfil.</div>
          </div>
        </div>
      </div>
      {!selected && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg border-2 border-blue-200 hover:border-blue-400 transition-all text-left"
            onClick={() => setSelected(CHALLENGE_CATEGORIES.WEB)}
          >
            <h3 className="text-lg font-semibold text-blue-800 mb-2">🌐 Web</h3>
            <p className="text-blue-700 text-sm">Vulnerabilidades en aplicaciones web</p>
          </button>
          <button
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg border-2 border-green-200 hover:border-green-400 transition-all text-left"
            onClick={() => setSelected(CHALLENGE_CATEGORIES.MOBILE)}
          >
            <h3 className="text-lg font-semibold text-green-800 mb-2">📱 Mobile</h3>
            <p className="text-green-700 text-sm">Seguridad en aplicaciones móviles</p>
          </button>
          <button
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg border-2 border-purple-200 hover:border-purple-400 transition-all text-left"
            onClick={() => setSelected(CHALLENGE_CATEGORIES.NETWORK)}
          >
            <h3 className="text-lg font-semibold text-purple-800 mb-2">🌍 Network</h3>
            <p className="text-purple-700 text-sm">Redes e infraestructura</p>
          </button>
        </div>
      )}
      {selected === CHALLENGE_CATEGORIES.WEB && renderChallenges(webChallenges, 'Retos de Web')}
      {selected === CHALLENGE_CATEGORIES.MOBILE && renderChallenges(mobileChallenges, 'Retos de Mobile')}
      {selected === CHALLENGE_CATEGORIES.NETWORK && renderChallenges(networkChallenges, 'Retos de Network')}
    </div>
  );
};

export default Challenges; 