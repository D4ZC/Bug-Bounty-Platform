import React, { useState } from 'react';

const gulagUsers = [
  { name: 'deivid', score: 50, rank: 1 },
  { name: 'runrun', score: 25, rank: 2 },
  { name: 'excel', score: 20, rank: 3 },
  { name: 'kick ass', score: 20, rank: 4 },
  { name: 'pedrito sola', score: 10, rank: 5 },
];

const Gulag: React.FC = () => (
  <div className="flex flex-col w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 mt-8">
    <h2 className="text-2xl font-bold mb-6 text-red-600">Gulag</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {gulagUsers.map((user, idx) => (
        <div key={user.name} className="bg-red-50 rounded-lg p-6 border border-red-200">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <span className="text-2xl font-bold text-red-600">{user.score} pts</span>
          </div>
          <div className="text-sm text-gray-600">
            <div>Rank: #{user.rank}</div>
            <div className="text-red-500">En el Gulag</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Gulag; 