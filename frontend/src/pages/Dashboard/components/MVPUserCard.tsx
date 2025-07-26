import React from 'react';
import { Tile } from '@carbon/react';
import { useNavigate } from 'react-router-dom';

interface MVPUser {
  name: string;
  img: string;
  stats: any;
}

const MVPUserCard: React.FC<{ user: MVPUser }> = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="col-span-1 flex flex-col items-center justify-center min-h-[160px] bg-white p-6 rounded-lg border-2 border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200" onClick={() => navigate('/users')}>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">MVP User</h2>
      <div className="text-2xl font-bold text-primary-700">{user.name}</div>
    </div>
  );
};

export default MVPUserCard; 