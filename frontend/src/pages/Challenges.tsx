import React from 'react';

const Challenges: React.FC = () => {
  const challenges = [
    { id: 1, name: 'Web Security Master', difficulty: 'Hard', points: 1000, participants: 45, status: 'Active' },
    { id: 2, name: 'CTF Beginner', difficulty: 'Easy', points: 300, participants: 120, status: 'Active' },
    { id: 3, name: 'Network Penetration', difficulty: 'Medium', points: 600, participants: 78, status: 'Active' },
    { id: 4, name: 'Mobile Security', difficulty: 'Hard', points: 800, participants: 32, status: 'Coming Soon' },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="w-full h-full">
      <h2 className="text-2xl font-semibold mb-6">Desafíos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">{challenge.name}</h3>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(challenge.difficulty)}`}>
                {challenge.difficulty}
              </span>
            </div>
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Puntos:</span> {challenge.points}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Participantes:</span> {challenge.participants}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Estado:</span> {challenge.status}
              </p>
            </div>
            <button 
              className={`w-full py-2 px-4 rounded font-medium transition ${
                challenge.status === 'Active' 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={challenge.status !== 'Active'}
            >
              {challenge.status === 'Active' ? 'Participar' : 'Próximamente'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Challenges; 