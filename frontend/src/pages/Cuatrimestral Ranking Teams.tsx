import React, { useEffect, useState } from 'react';
import apiService from '@/services/api';
import { useTranslation } from 'react-i18next';

type Team = { name: string; points: number; rank: number; members: string[] };
type TeamRankingResponse = { success: boolean; data: Team[] };

const CuatrimestralRankingTeams: React.FC = () => {
  const { t } = useTranslation();
  const [teamRanking, setTeamRanking] = useState<Team[]>([]);

  useEffect(() => {
    apiService.getTeamRanking().then((res) => {
      const response = res as TeamRankingResponse;
      if (response.success && Array.isArray(response.data)) {
        // Filtrar equipos con entre 3 y 10 miembros (simulación cuatrimestral)
        const filtered = response.data.filter((team) => team.members && team.members.length >= 3 && team.members.length <= 10);
        // Ordenar por puntos y tomar los 5 mejores
        const sorted = [...filtered].sort((a, b) => b.points - a.points).slice(0, 5);
        setTeamRanking(sorted);
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-app text-app p-8 font-mono flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-10 text-yellow-300 text-center tracking-widest">{t('Ranking Cuatrimestral de Equipos')}</h1>
      <div className="w-full max-w-2xl mt-4 border border-yellow-700 rounded-xl p-6 bg-card">
        <h2 className="text-yellow-300 text-lg font-bold mb-4 tracking-wide">{t('TOP 5 EQUIPOS DEL CUATRIMESTRE')}</h2>
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
                <tr key={team.name} className="border-b border-yellow-800 last:border-none">
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
  );
};

export default CuatrimestralRankingTeams;
