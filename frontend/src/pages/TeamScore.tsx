import React from 'react';
import TeamScoreSection from '../components/TeamScoreSection';

const TeamScore: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gray-900 flex flex-col items-center justify-start">
      <TeamScoreSection />
    </div>
  );
};

export default TeamScore; 