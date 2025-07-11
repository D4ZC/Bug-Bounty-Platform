import React, { useState } from 'react';
import TeamsScoreCard from './components/TeamsScoreCard';
import MVPTeamCard from './components/MVPTeamCard';
import GulagCard from './components/GulagCard';
import UserScoreCard from './components/UserScoreCard';
import MVPUserCard from './components/MVPUserCard';
import UserProfileCard from './components/UserProfileCard';
import { Button } from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import { Home, Security, Code, ShoppingCart, UserMultiple, User, Group, Trophy, UserAvatar } from '@carbon/icons-react';
import apiService from '@/services/api';
import { useTranslation } from 'react-i18next';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  // Datos mockeados para la lógica dinámica
  const [teams] = useState([
    { name: 'Piteritos I', score: 2000 },
    { name: 'Piteritos II', score: 1900 },
    { name: 'Piteritos III', score: 1500 },
  ]);
  const [users] = useState([
    { name: 'Piteritos I', score: 2000 },
    { name: 'Piteritos II', score: 1900 },
    { name: 'Piteritos III', score: 1500 },
  ]);
  const [gulag] = useState([
    { name: 'deivid', score: 50 },
    { name: 'runrun', score: 25 },
    { name: 'excel', score: 20 },
    { name: 'kick ass', score: 20 },
    { name: 'pedrito sola', score: 10 },
  ]);
  const [mvpTeam] = useState('P-TECH');
  const [mvpUser] = useState({ name: 'D4ZC', img: '', stats: { criticas: 10, altas: 20, medianas: 30, bajas: 9, total: 69 } });
  const navigate = useNavigate();
  const [diamondPlayers, setDiamondPlayers] = useState<{ username: string; points: number; rank: number }[]>([]);
  const [teamRanking, setTeamRanking] = useState<{ name: string; points: number; rank: number; members: string[] }[]>([]);

  const navigationItems = [
    { icon: Home, label: 'Menú', path: '/dashboard', color: 'from-green-500 to-green-600' },
    { icon: Security, label: 'Vulnerabilidades', path: '/vulnerabilities', color: 'from-blue-500 to-blue-600' },
    { icon: Code, label: 'Desafíos', path: '/challenges', color: 'from-purple-500 to-purple-600' },
    { icon: ShoppingCart, label: 'Tienda', path: '/shop', color: 'from-yellow-500 to-yellow-600' },
    { icon: UserMultiple, label: 'Contribuciones', path: '/contributions', color: 'from-red-500 to-red-600' },
    { icon: User, label: 'Perfil', path: '/profile-customization', color: 'from-cyan-500 to-cyan-600' },
    { icon: Group, label: 'Equipo', path: '/team', color: 'from-orange-500 to-orange-600' },
    { icon: Trophy, label: 'MVP', path: '/mvp', color: 'from-pink-500 to-pink-600' }
  ];

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
    <div className="min-h-screen bg-app text-app p-8 font-mono">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Primera fila */}
          <TeamsScoreCard teams={teams} />
          <MVPTeamCard team={mvpTeam} />
          <GulagCard gulag={gulag} />
          {/* Segunda fila: UserScoreCard, MVPUserCard, UserProfileCard */}
          <UserScoreCard users={users} />
          <UserProfileCard user={mvpUser} />
          {/* Card Ranking Diamante */}
          <div
            className="bg-gradient-to-br from-cyan-900/80 to-cyan-800/60 text-cyan-100 border border-cyan-500/50 rounded-xl shadow-lg p-6 flex flex-col justify-between cursor-pointer hover:scale-105 transition-transform duration-200 backdrop-blur-sm"
            onClick={() => navigate('/mensual-ranking')}
          >
            <h3 className="text-2xl font-bold text-cyan-300 mb-2 text-center">{t('Ranking del Mes')}</h3>
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
          {/* Segunda fila */}
          <div
            className="bg-gradient-to-br from-yellow-900/80 to-yellow-800/60 text-yellow-100 border border-yellow-500/50 rounded-xl shadow-lg p-6 flex flex-col justify-between cursor-pointer hover:scale-105 transition-transform duration-200 backdrop-blur-sm"
            onClick={() => navigate('/cuatrimestral-ranking-teams')}
          >
            <h3 className="text-2xl font-bold text-yellow-300 mb-2 text-center">{t('Ranking de Equipos (Cuatrimestral)')}</h3>
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
  );
};

export default Dashboard; 