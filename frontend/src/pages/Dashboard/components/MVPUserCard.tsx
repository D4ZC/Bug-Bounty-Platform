import React from 'react';
import { Tile } from '@carbon/react';

interface MVPUser {
  name: string;
  img: string;
  stats: any;
}

const MVPUserCard: React.FC<{ user: MVPUser }> = ({ user }) => (
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col items-center justify-center min-h-[200px]">
    <h2 className="text-xl font-bold text-gray-700 text-center">GULAG</h2>
  </div>
);

export default MVPUserCard; 