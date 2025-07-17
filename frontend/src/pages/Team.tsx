import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Team } from '../types';
import apiService from '../services/api';

const TeamPage: React.FC = () => {
  const { isDark } = useTheme();
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiService.get<Team[]>('/teams')
      .then(res => {
        setTeams(res.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar los equipos');
        setLoading(false);
      });
  }, []);

  return (
    <div className={`min-h-screen w-full flex flex-col items-center py-10 px-2 transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold font-mono mb-8 text-center text-[#00fff7] drop-shadow">Ranking de Equipos</h1>
        {loading ? (
          <div className="text-center text-lg text-[#00fff7]">Cargando equipos...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gradient-to-br from-black to-[#0ff0fc] border-2 border-[#00fff7] rounded-2xl font-mono text-[#00fff7] shadow-lg">
              <thead>
                <tr className="text-left text-xl">
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Equipo</th>
                  <th className="py-3 px-4">Puntos</th>
                  <th className="py-3 px-4">Líder</th>
                  <th className="py-3 px-4">Miembros</th>
                </tr>
              </thead>
              <tbody>
                {teams.sort((a, b) => b.points - a.points).map((team, idx) => (
                  <tr key={team._id} className="border-t border-[#00fff7] hover:bg-[#112233]/40 transition">
                    <td className="py-2 px-4 font-bold">{idx + 1}</td>
                    <td className="py-2 px-4 font-bold text-lg">{team.name}</td>
                    <td className="py-2 px-4">{team.points}</td>
                    <td className="py-2 px-4">{team.leader}</td>
                    <td className="py-2 px-4">{team.members.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamPage; 