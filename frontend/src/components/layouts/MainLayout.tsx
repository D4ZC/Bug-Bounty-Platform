import React from 'react';
import { Header, HeaderName, HeaderGlobalBar, HeaderGlobalAction, SideNav, SideNavItems, SideNavLink } from '@carbon/react';
import { Home, List, SettingsAdjust, Tablet, Add, Notification, UserAvatar, Book, Edit, UserFollow } from '@carbon/icons-react';
import { useTranslation } from '../../utils/useTranslation';
import { useNavigate } from 'react-router-dom';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [docMenuOpen, setDocMenuOpen] = React.useState(false);
  // Cierra el menú si se hace clic fuera
  React.useEffect(() => {
    if (!docMenuOpen) return;
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('#doc-menu-trigger')) {
        setDocMenuOpen(false);
      }
    };
    window.addEventListener('mousedown', handler);
    return () => window.removeEventListener('mousedown', handler);
  }, [docMenuOpen]);
  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] text-[#1F2937]">
      {/* Navbar superior */}
      <Header aria-label="Bug Bounty Platform" className="bg-[#E5E7EB] border-b border-blue-100">
        <HeaderName href="/" prefix="" className="text-[#1E3A8A]">
        </HeaderName>
        {/* HeaderGlobalBar eliminado: notificaciones y perfil solo en menú hamburguesa */}
      </Header>
      <div className="flex flex-1">
        {/* Sidebar lateral */}
        <SideNav aria-label="Menú lateral" className="bg-[#F3F4F6] shadow-lg min-h-full w-16 flex flex-col items-center py-4 border-r border-blue-100">
          <SideNavItems className="flex flex-col gap-2.5">
            <SideNavLink href="/" className="text-[#1E3A8A] hover:bg-blue-100 hover:text-blue-600">
              <Home size={24} />
            </SideNavLink>
            <SideNavLink href="/list" className="text-[#1E3A8A] hover:bg-blue-100 hover:text-blue-600">
              <List size={24} />
            </SideNavLink>
            <SideNavLink href="/settings" className="text-[#1E3A8A] hover:bg-blue-100 hover:text-blue-600">
              <SettingsAdjust size={24} />
            </SideNavLink>
            <SideNavLink href="/tablet" className="text-[#1E3A8A] hover:bg-blue-100 hover:text-blue-600">
              <Tablet size={24} />
            </SideNavLink>
            <SideNavLink href="/add" className="text-[#1E3A8A] hover:bg-blue-100 hover:text-blue-600">
              <Add size={24} />
            </SideNavLink>
            {/* Dropdown de documentación */}
            <div
              id="doc-menu-trigger"
              className="relative flex items-center justify-center"
            >
              <button
                className={`w-12 h-12 flex items-center justify-center rounded text-[#1E3A8A] hover:bg-blue-100 hover:text-blue-600 focus:outline-none transition-colors ${docMenuOpen ? 'bg-blue-100 text-blue-600' : ''}`}
                title={t('documentation')}
                onClick={() => setDocMenuOpen(v => !v)}
                type="button"
              >
                <Book size={24} />
              </button>
              {docMenuOpen && (
                <div className="absolute left-14 top-0 z-50 bg-[#F3F4F6] border border-blue-100 rounded shadow-lg min-w-[180px] py-2">
                  <button
                    className="flex items-center w-full px-4 py-2 hover:bg-blue-100 text-[#1E3A8A] hover:text-blue-600 text-left transition-colors"
                    onClick={() => { navigate('/documentation'); setDocMenuOpen(false); }}
                  >
                    <Book size={20} className="mr-2" /> {t('documentation')}
                  </button>
                  <button
                    className="flex items-center w-full px-4 py-2 hover:bg-blue-100 text-[#1E3A8A] hover:text-blue-600 text-left transition-colors"
                    onClick={() => { navigate('/submit-explanation'); setDocMenuOpen(false); }}
                  >
                    <Edit size={20} className="mr-2" /> {t('submitExplanation')}
                  </button>
                  <button
                    className="flex items-center w-full px-4 py-2 hover:bg-blue-100 text-[#1E3A8A] hover:text-blue-600 text-left transition-colors"
                    onClick={() => { navigate('/moderate-explanations'); setDocMenuOpen(false); }}
                  >
                    <UserFollow size={20} className="mr-2" /> {t('reviewPanel')}
                  </button>
                </div>
              )}
            </div>
            {/* Fin dropdown */}
            <SideNavLink href="/submit-explanation" title={t('submitExplanation')} style={{ display: 'none' }}>
              <Edit size={24} />
            </SideNavLink>
            <SideNavLink href="/moderate-explanations" title={t('reviewPanel')} style={{ display: 'none' }}>
              <UserFollow size={24} />
            </SideNavLink>
          </SideNavItems>
        </SideNav>
        {/* Contenido principal */}
        <main className="flex-1 p-6 bg-[#FFFFFF] min-h-screen text-[#1F2937]">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout; 