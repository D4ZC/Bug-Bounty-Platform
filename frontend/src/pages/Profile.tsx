import React, { useState } from 'react';
// import PointsStats from '../components/Points/PointsStats';
import { useToast } from '../contexts/ToastContext';

// Mock de usuario (mismo que en Dashboard y Shop)
const mockUser = {
  name: 'PlayerOne',
  level: 15,
  rank: 3,
  totalPoints: 1250,
  pointsThisWeek: 180,
  vulnerabilitiesFound: 47,
  criticalVulns: 8,
  highVulns: 12,
  mediumVulns: 18,
  lowVulns: 9,
  rewardsEarned: 12,
  streak: 7,
  accuracy: 94.2,
};

// Mock de puntos obtenidos
const mockPointsList = [
  {
    id: 1,
    cantidad: 100,
    motivo: 'Vulnerabilidad Crítica',
    fecha_obtencion: '2023-07-01',
    fecha_expiracion: '2024-07-01',
  },
  {
    id: 2,
    cantidad: 75,
    motivo: 'Vulnerabilidad Alta',
    fecha_obtencion: '2023-10-15',
    fecha_expiracion: '2024-10-15',
  },
  {
    id: 3,
    cantidad: 150,
    motivo: 'MVP',
    fecha_obtencion: '2024-01-10',
    fecha_expiracion: '2025-01-10',
  },
  {
    id: 4,
    cantidad: 50,
    motivo: 'Vulnerabilidad Media',
    fecha_obtencion: '2024-02-20',
    fecha_expiracion: '2025-02-20',
  },
];

// Mock de canjes realizados
const mockRedemptions = [
  {
    id: 1,
    recompensa: 'Camiseta Oficial',
    puntos_gastados: 200,
    fecha_canje: '2023-12-01',
  },
  {
    id: 2,
    recompensa: 'Sticker Pack',
    puntos_gastados: 50,
    fecha_canje: '2024-02-20',
  },
  {
    id: 3,
    recompensa: 'Skin Cyber Ninja',
    puntos_gastados: 400,
    fecha_canje: '2024-03-15',
  },
];

// Mock de avatares desbloqueados
const unlockedAvatars = [
  {
    id: 1,
    name: 'Avatar Default',
    url: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
  },
  {
    id: 2,
    name: 'Cyber Ninja',
    url: 'https://static.wikia.nocookie.net/fortnite_gamepedia/images/2/2e/Cyber_Ninja_Skin.png',
  },
  {
    id: 3,
    name: 'Ice King',
    url: 'https://static.wikia.nocookie.net/fortnite_gamepedia/images/7/7e/Ice_King_Skin.png',
  },
  {
    id: 4,
    name: 'Blaze',
    url: 'https://static.wikia.nocookie.net/fortnite_gamepedia/images/3/3d/Blaze_Skin.png',
  },
  {
    id: 5,
    name: 'Breakpoint',
    url: 'https://static.wikia.nocookie.net/fortnite_gamepedia/images/6/6e/Breakpoint_Skin.png',
  },
];

const Profile: React.FC = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(unlockedAvatars[0].url);
  const { showToast } = useToast();

  const handleAvatarChange = (avatarUrl: string, avatarName: string) => {
    setSelectedAvatar(avatarUrl);
    showToast(`Avatar cambiado a ${avatarName}!`, 'success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white">
      <div className="max-w-3xl mx-auto py-10 px-4">
        {/* Avatar Personalization */}
        <div className="mb-10">
          <h2 className="text-2xl font-extrabold mb-4 neon-text drop-shadow-cyber tracking-widest">Personaliza tu Avatar</h2>
          <div className="flex flex-wrap gap-6 items-center justify-center">
            {unlockedAvatars.map((avatar) => (
              <button
                key={avatar.id}
                onClick={() => handleAvatarChange(avatar.url, avatar.name)}
                className={`p-2 rounded-2xl border-4 neon-shadow transition-transform duration-200 ${selectedAvatar === avatar.url ? 'border-cyan-400 scale-110' : 'border-gray-700 opacity-60 hover:scale-105'}`}
              >
                <img src={avatar.url} alt={avatar.name} className="w-20 h-20 rounded-full" />
                <div className="text-xs text-center mt-2 text-cyan-200 font-bold">{avatar.name}</div>
              </button>
            ))}
          </div>
        </div>
        {/* Avatar Preview */}
        <div className="flex flex-col items-center mb-8">
          <img src={selectedAvatar} alt="Avatar seleccionado" className="w-32 h-32 rounded-full border-4 border-cyan-400 neon-shadow mb-2" />
          <span className="text-lg font-bold text-cyan-200">Avatar actual</span>
        </div>
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-lg mb-4">
            Perfil de Usuario
          </h1>
          <div className="bg-blue-800 rounded-lg px-6 py-3 inline-flex items-center gap-3 shadow-lg">
            <span className="font-bold text-lg">{mockUser.name}</span>
            <span className="bg-blue-400 text-blue-900 font-bold px-3 py-1 rounded-full">
              {mockUser.totalPoints} Blue Points
            </span>
            <span className="bg-yellow-600 text-white font-bold px-3 py-1 rounded-full">
              Nivel {mockUser.level}
            </span>
            <span className="bg-purple-600 text-white font-bold px-3 py-1 rounded-full">
              #{mockUser.rank} Global
            </span>
          </div>
        </header>

        {/* Estadísticas de puntos */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Total de puntos */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {mockUser.totalPoints}
              </div>
              <div className="text-blue-100 text-sm">Total Blue Points</div>
              <div className="w-full bg-blue-800 rounded-full h-2 mt-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{
                    width: `${Math.min((mockUser.totalPoints / 1000) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Puntos este mes */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {mockUser.pointsThisWeek}
              </div>
              <div className="text-purple-100 text-sm">Esta Semana</div>
              <div className="w-full bg-purple-800 rounded-full h-2 mt-2">
                <div
                  className="bg-pink-400 h-2 rounded-full"
                  style={{
                    width: `${Math.min((mockUser.pointsThisWeek / 200) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Vulnerabilidades encontradas */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {mockUser.vulnerabilitiesFound}
              </div>
              <div className="text-green-100 text-sm">Vulns Encontradas</div>
              <div className="w-full bg-green-800 rounded-full h-2 mt-2">
                <div
                  className="bg-green-300 h-2 rounded-full"
                  style={{
                    width: `${Math.min((mockUser.vulnerabilitiesFound / 50) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Ranking */}
            <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">
                #{mockUser.rank}
              </div>
              <div className="text-yellow-100 text-sm">Ranking Global</div>
              <div className="flex justify-center mt-2">
                {mockUser.rank <= 3 ? (
                  <span className="text-2xl">
                    {mockUser.rank === 1
                      ? '🥇'
                      : mockUser.rank === 2
                        ? '🥈'
                        : '🥉'}
                  </span>
                ) : (
                  <span className="text-yellow-300">⭐</span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Lista de puntos obtenidos */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Puntos Obtenidos</h2>
          <div className="bg-white bg-opacity-10 rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-800">
                  <tr>
                    <th className="py-3 px-4 text-left">Cantidad</th>
                    <th className="py-3 px-4 text-left">Motivo</th>
                    <th className="py-3 px-4 text-left">Fecha Obtención</th>
                    <th className="py-3 px-4 text-left">Expira</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPointsList.map((point) => (
                    <tr
                      key={point.id}
                      className="border-b border-blue-700 hover:bg-blue-800 hover:bg-opacity-30"
                    >
                      <td className="py-3 px-4 font-bold text-green-400">
                        {point.cantidad}
                      </td>
                      <td className="py-3 px-4">{point.motivo}</td>
                      <td className="py-3 px-4 text-blue-200">
                        {point.fecha_obtencion}
                      </td>
                      <td className="py-3 px-4 text-yellow-200">
                        {point.fecha_expiracion}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Enlace a tienda */}
        <section className="mb-8 text-center">
          <a
            href="/shop"
            className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            🛒 Ir a la Tienda Virtual
          </a>
        </section>

        {/* Historial de canjes */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Historial de Canjes</h2>
          <div className="bg-white bg-opacity-10 rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-purple-800">
                  <tr>
                    <th className="py-3 px-4 text-left">Recompensa</th>
                    <th className="py-3 px-4 text-left">Puntos Gastados</th>
                    <th className="py-3 px-4 text-left">Fecha de Canje</th>
                  </tr>
                </thead>
                <tbody>
                  {mockRedemptions.map((redemption) => (
                    <tr
                      key={redemption.id}
                      className="border-b border-purple-700 hover:bg-purple-800 hover:bg-opacity-30"
                    >
                      <td className="py-3 px-4 font-bold">
                        {redemption.recompensa}
                      </td>
                      <td className="py-3 px-4 text-red-400 font-bold">
                        {redemption.puntos_gastados}
                      </td>
                      <td className="py-3 px-4 text-purple-200">
                        {redemption.fecha_canje}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Back to Dashboard */}
        <div className="text-center mt-8">
          <a
            href="/"
            className="inline-block bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            ← Volver al Dashboard
          </a>
        </div>
      </div>
      {/* Estilos cyberpunk extra */}
      <style>{`
        .neon-text {
          color: #00fff7;
          text-shadow: 0 0 8px #00fff7, 0 0 16px #00fff7, 0 0 32px #00fff7;
        }
        .drop-shadow-cyber {
          filter: drop-shadow(0 0 8px #00fff7) drop-shadow(0 0 16px #a78bfa);
        }
        .shadow-cyber {
          box-shadow: 0 0 16px 2px #00fff7, 0 0 32px 4px #a78bfa;
        }
        .neon-shadow {
          box-shadow: 0 0 16px 2px #00fff7, 0 0 32px 4px #a78bfa, 0 0 8px #fff0;
        }
      `}</style>
    </div>
  );
};

export default Profile;
