import React from 'react';
import { Achievement } from '@/types';
import AchievementCard from './AchievementCard';

interface AchievementsGalleryProps {
  achievements: Achievement[];
}

const AchievementsGallery: React.FC<AchievementsGalleryProps> = ({ achievements }) => {
  if (!achievements || achievements.length === 0) {
    return <div className="text-center text-cyan-200">Aún no tienes logros desbloqueados.</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
      {achievements.map((ach) => (
        <AchievementCard key={ach.id} achievement={ach} />
      ))}
    </div>
  );
};

export default AchievementsGallery; 