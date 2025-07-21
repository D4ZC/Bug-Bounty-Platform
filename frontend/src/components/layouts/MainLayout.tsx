import React, { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Dashboard, 
  User, 
  ShoppingCart, 
  UserMultiple, 
  Notification, 
  List, 
  Report, 
  Settings,
  Menu,
  Close,
  Home,
  Search as SearchIcon
} from '@carbon/icons-react';
import { useAuth } from '@/contexts/AuthContext';
// import ToastContainer from '@/components/ui/ToastContainer';

const MainLayout: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  // Estado de expansión para múltiples cards
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const handleExpand = (idx: number) => {
    setExpandedCards((prev) =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const navigationItems = [
    { path: '/search', icon: SearchIcon, label: t('search.title') },
    { path: '/', icon: Home, label: t('dashboard') },
    { path: '/vulnerabilities', icon: Dashboard, label: t('Vulnerabilities') },
    { path: '/challenges', icon: Dashboard, label: t('Challenges') },
    { path: '/rankings', icon: List, label: t('rankings.title') },
    { path: '/chat', icon: UserMultiple, label: t('chat.title') },
    { path: '/shop', icon: ShoppingCart, label: t('Shop') },
    { path: '/contributions', icon: Report, label: t('Contributions') },
    { path: '/team', icon: UserMultiple, label: t('Team') },
    { path: '/gulag', icon: Dashboard, label: 'Gulag' },
    { path: '/mvp', icon: Dashboard, label: 'MVP' },
    { path: '/list', icon: List, label: t('List') },
    { path: '/report', icon: Report, label: t('Report') },
    { path: '/notifications', icon: Notification, label: t('Notifications') },
    { path: '/profile', icon: User, label: t('Profile') },
    { path: '/settings', icon: Settings, label: t('Settings') },
  ];

  // Add admin links only for admin users
  const adminNavigationItems = user?.role === 'admin' 
    ? [...navigationItems, { path: '/admin', icon: Settings, label: 'Admin' }, { path: '/logs', icon: List, label: 'Logs' }]
    : navigationItems;

  const isActive = useCallback((path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  }, [location.pathname]);

  // Cerrar menú de usuario al hacer click fuera
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userMenuOpen]);

  // Cerrar sidebar al cambiar de ruta en móvil
  React.useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = useCallback(() => {
    setUserMenuOpen(false);
    logout();
    navigate('/login', { replace: true });
  }, [logout, navigate]);

  const handleProfileClick = useCallback(() => {
    setUserMenuOpen(false);
    navigate('/profile');
  }, [navigate]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">{t('Bug Bounty Platform')}</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors duration-200"
          >
            <Close size={20} />
          </button>
        </div>
        
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {adminNavigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-500 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon size={20} className="mr-3" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors duration-200"
              >
                <Menu size={20} />
              </button>
              <h2 className="ml-4 lg:ml-0 text-lg font-semibold text-gray-900">
                {adminNavigationItems.find(item => isActive(item.path))?.label || t('dashboard')}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4 relative">
              <div className="text-sm text-gray-500">
                {t('lenguaje')}: {language.toUpperCase()}
              </div>
              {/* Menú de usuario */}
              <div className="relative" ref={userMenuRef}>
                <button
                  className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 hover:bg-blue-600"
                  onClick={() => setUserMenuOpen((open) => !open)}
                  aria-label="User menu"
                >
                  <img src="https://i.pinimg.com/736x/23/8d/ad/238dad5a2186e67d9c11d47a50f5100d.jpg" alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                </button>
                {userMenuOpen && user && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center gap-3 mb-3">
                      {user.avatar ? (
                        <img src={user.avatar} alt="avatar" className="w-12 h-12 rounded-full object-cover border-2 border-blue-300" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl text-blue-600 font-bold">
                          {user.nickname?.[0]?.toUpperCase() || 'U'}
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-gray-900 text-base">{user.nickname}</div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <span>{user.rangoIcon}</span>
                          <span>{user.rango}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        className="w-full text-left px-4 py-2 rounded-md hover:bg-blue-50 text-blue-700 font-medium transition-colors duration-200"
                        onClick={handleProfileClick}
                      >
                        Administrar cuenta
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 rounded-md hover:bg-red-50 text-red-600 font-medium transition-colors duration-200"
                        onClick={handleLogout}
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <div className="animate-in fade-in duration-1500">
            {/* Panel general visual */}
            {location.pathname === '/' && (
              <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 pt-8">
                {/* Puntos del usuario */}
                <div className="flex flex-col bg-white rounded-lg p-6 shadow hover:shadow-lg transition items-center relative cursor-pointer" onClick={() => handleExpand(0)}>
                  <span className="text-3xl font-bold text-blue-700 mb-1">2450</span>
                  <span className="text-gray-600">Puntos acumulados</span>
                  <div className={`transition-all duration-300 overflow-hidden w-full ${expandedCards.includes(0) ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                    <div className="text-xs text-gray-500 mt-2 text-center">
                      <div>Historial de puntos:</div>
                      <ul className="list-disc ml-6 text-left">
                        <li>+1200 por retos completados</li>
                        <li>+800 por reportes aceptados</li>
                        <li>+450 por logros especiales</li>
                      </ul>
                      <div className="mt-2">Última actualización: 2024-07-18</div>
                    </div>
                  </div>
                </div>
                {/* Notificaciones recientes */}
                <div className="flex flex-col bg-white rounded-lg p-6 shadow hover:shadow-lg transition items-center relative cursor-pointer" onClick={() => handleExpand(1)}>
                  <span className="text-2xl text-orange-500 mb-1"><Notification size={28} /></span>
                  <span className="text-gray-900 font-semibold mb-1">Notificaciones</span>
                  <span className="text-xs text-gray-500">2 reportes aceptados, 1 reto nuevo</span>
                  <div className={`transition-all duration-300 overflow-hidden w-full ${expandedCards.includes(1) ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                    <div className="text-xs text-gray-500 mt-2 text-center">
                      <div>Últimas notificaciones:</div>
                      <ul className="list-disc ml-6 text-left">
                        <li>Reporte #123 aceptado</li>
                        <li>Nuevo reto: SQL Injection</li>
                        <li>Tu equipo subió de ranking</li>
                      </ul>
                      <div className="mt-2">Ver todas en la sección de notificaciones</div>
                    </div>
                  </div>
                </div>
                {/* Actividad semanal (mock) */}
                <div className="flex flex-col bg-white rounded-lg p-6 shadow hover:shadow-lg transition items-center relative cursor-pointer" onClick={() => handleExpand(2)}>
                  <span className="text-2xl text-green-500 mb-1"><Dashboard size={28} /></span>
                  <span className="text-gray-900 font-semibold mb-1">Actividad semanal</span>
                  <span className="text-xs text-gray-500">5 reportes, 3 retos completados</span>
                  <div className={`transition-all duration-300 overflow-hidden w-full ${expandedCards.includes(2) ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                    <div className="text-xs text-gray-500 mt-2 text-center">
                      <div>Detalle de actividad:</div>
                      <ul className="list-disc ml-6 text-left">
                        <li>Lunes: 2 reportes enviados</li>
                        <li>Miércoles: 1 reto completado</li>
                        <li>Viernes: 3 reportes aceptados</li>
                      </ul>
                      <div className="mt-2">Ver historial completo en actividad</div>
                    </div>
                  </div>
                </div>
                {/* Ranking actual */}
                <div className="flex flex-col bg-white rounded-lg p-6 shadow hover:shadow-lg transition items-center relative cursor-pointer" onClick={() => handleExpand(3)}>
                  <span className="text-2xl text-purple-500 mb-1"><List size={28} /></span>
                  <span className="text-gray-900 font-semibold mb-1">Ranking</span>
                  <span className="text-xs text-gray-500">Top 12% global</span>
                  <div className={`transition-all duration-300 overflow-hidden w-full ${expandedCards.includes(3) ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                    <div className="text-xs text-gray-500 mt-2 text-center">
                      <div>Ranking detallado:</div>
                      <ul className="list-disc ml-6 text-left">
                        <li>Global: Top 12%</li>
                        <li>Equipos: Top 5%</li>
                        <li>Histórico personal: Top 8%</li>
                      </ul>
                      <div className="mt-2">Ver ranking completo</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <Outlet />
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden animate-in fade-in duration-200"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* <ToastContainer /> */}
    </div>
  );
};

export default MainLayout; 