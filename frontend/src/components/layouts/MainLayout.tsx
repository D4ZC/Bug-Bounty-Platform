import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Security, Code, ShoppingCart, UserMultiple, User, Group, Trophy } from '@carbon/icons-react';

const navigationItems = [
  { icon: Home, label: 'Menú', path: '/dashboard', color: 'from-green-500 to-green-600' },
  { icon: Security, label: 'Vulnerabilidades', path: '/vulnerabilities', color: 'from-blue-500 to-blue-600' },
  { icon: Code, label: 'Desafíos', path: '/challenges', color: 'from-purple-500 to-purple-600' },
  { icon: ShoppingCart, label: 'Tienda', path: '/shop', color: 'from-yellow-500 to-yellow-600' },
  { icon: UserMultiple, label: 'Contribuciones', path: '/contributions', color: 'from-red-500 to-red-600' },
  { icon: User, label: 'Perfil', path: '/profile-customization', color: 'from-cyan-500 to-cyan-600' },
  { icon: Group, label: 'Equipo', path: '/team', color: 'from-orange-500 to-orange-600' },
  { icon: Trophy, label: 'MVP', path: '/mvp', color: 'from-pink-500 to-pink-600' }
];

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950">
      <div className="flex flex-1">
        {/* Sidebar lateral con navbar de iconos */}
        <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-600 shadow-lg min-h-full w-20 flex flex-col items-center py-8 gap-4">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`group relative p-3 rounded-xl bg-gradient-to-r ${item.color} hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-transparent hover:border-white/20 flex flex-col items-center`}
                title={item.label}
              >
                <IconComponent size={28} className="text-white" />
                <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
        {/* Contenido principal */}
        <main className="flex-1 bg-zinc-950 min-h-screen">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout; 