import React from 'react';
import { Home } from '@carbon/icons-react';

const TEAM_NAME = 'TEAM';
const USER_NAME = 'user_1';

const Profile: React.FC = () => (
  <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-xl shadow-md flex flex-col items-center">
    <div className="w-24 h-24 rounded-full border-4 border-blue-500 overflow-hidden flex items-center justify-center bg-gray-900 mb-4">
      <Home size={48} className="text-white" />
    </div>
    <div className="text-center">
      <div className="font-bold text-xl text-gray-900 mb-1">{TEAM_NAME}</div>
      <div className="text-gray-700 text-lg">{USER_NAME}</div>
    </div>
  </div>
);

export default Profile; 