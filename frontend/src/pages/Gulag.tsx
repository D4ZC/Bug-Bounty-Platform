import React from 'react';
import { users } from '@/data/usersData';

const tableHeight = 'max-h-[500px]';

const Gulag: React.FC = () => {
  // Obtener los últimos 5 usuarios (menor puntaje) ordenados de mayor a menor
  const gulagUsers = [...users].sort((a, b) => b.score - a.score).slice(-5).reverse();

  return (
    <div className="gulag-page w-full h-full">
      <h2 className="text-2xl font-semibold mb-6">Gulag</h2>
      <div className="w-full flex justify-center">
        <div className="overflow-x-auto w-full max-w-7xl mx-auto rounded-xl bg-white shadow">
          <table className="w-full rounded-xl">
            <thead className="bg-black sticky top-0 z-10">
              <tr>
                <th className="py-2 px-4 text-left text-white">Posición</th>
                <th className="py-2 px-4 text-left text-white">Usuario</th>
                <th className="py-2 px-4 text-right text-white">Puntuación</th>
              </tr>
            </thead>
          </table>
          <div className={`overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 rounded-b-xl ${tableHeight}`}>
            <table className="w-full">
              <tbody>
                {gulagUsers.map((user, idx) => (
                  <tr key={user.name} className="border-t">
                    <td className="py-2 px-4">{idx + 1}</td>
                    <td className="py-2 px-4">{user.name}</td>
                    <td className="py-2 px-4 text-right font-bold">{user.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gulag; 