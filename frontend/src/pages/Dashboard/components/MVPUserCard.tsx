import React from 'react';
import { Tile } from '@carbon/react';

interface MVPUser {
  name: string;
  img: string;
  stats: any;
}

const MVPUserCard: React.FC<{ user: MVPUser }> = ({ user }) => (
  <Tile className="dashboard-card col-span-1 flex flex-col items-center justify-center min-h-[200px] bg-white border border-gray-200 rounded-xl shadow-sm p-5">
    <h2 className="text-2xl font-bold text-primary-700 mb-2 text-center">MVP User</h2>
    <div className="mb-2 text-primary-500 text-center">Top 3 Teams</div>
    {/* Placeholder de imagen de usuario */}
    <div className="w-16 h-16 bg-gray-300 rounded-full mb-2 flex items-center justify-center">
      {/* Aquí iría la imagen: <img src={user.img} ... /> */}
    </div>
    {/* Placeholder de pedestal */}
    <div className="w-24 h-12 bg-yellow-300 rounded-b-full shadow-inner" />
  </Tile>
);

export default MVPUserCard; 