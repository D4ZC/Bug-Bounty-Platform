import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar';
import { BackgroundProvider, useBackground } from './contexts/BackgroundContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { PointsProvider } from './contexts/PointsContext';
import { InventoryProvider } from './contexts/InventoryContext';

// Layouts
import MainLayout from '@/components/layouts/MainLayout';

// Pages
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import Vulnerabilities from '@/pages/Vulnerabilities';
import Challenges from '@/pages/Challenges';
import Shop from '@/pages/Shop';
import Inventory from '@/pages/Inventory';
import Contributions from '@/pages/Contributions';
import Profile from '@/pages/Profile';
import Team from '@/pages/Team';
import Gulag from '@/pages/Gulag';
import MVP from '@/pages/MVP';
import NotFound from '@/pages/NotFound';
import Documentation from '@/pages/Documentation';
import SubmitExplanation from '@/pages/SubmitExplanation';
import ModerateExplanations from '@/pages/ModerateExplanations';
import ProfileTeam from '@/pages/ProfileTeam';
import GulagDetail from './pages/GulagDetail';
import TeamScore from '@/pages/TeamScore';
import MVPUser from '@/pages/MVPUser';
import Notifications from '@/pages/Notifications';
import Duels from '@/pages/Duels';
import Settings from '@/pages/Settings';
import Help from '@/pages/Help';
import Teams from '@/pages/Teams';

// Components
import LoadingSpinner from '@/components/ui/LoadingSpinner';


import { LanguageProvider } from './contexts/LanguageContext';

function AppContent() {
  const { backgroundEnabled, setBackgroundEnabled } = useBackground();
  const { isAuthenticated, isLoading } = useAuth();

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#F9FAFB] text-[#1F2937]">
        {isAuthenticated && (
          <Navbar 
            backgroundEnabled={backgroundEnabled}
            onBackgroundToggle={setBackgroundEnabled}
          />
        )}
        <Helmet>
          <title>Bug Bounty Platform</title>
          <meta name="description" content="Plataforma de Bug Bounty - Encuentra vulnerabilidades, gana recompensas" />
        </Helmet>

        <Routes>
          {/* Rutas públicas de autenticación */}
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
          } />
          <Route path="/register" element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />
          } />

          {/* Rutas protegidas */}
          <Route path="/" element={
            isAuthenticated ? <MainLayout><Outlet /></MainLayout> : <Navigate to="/login" replace />
          }>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="team-score" element={<TeamScore />} />
            <Route path="vulnerabilities" element={<Vulnerabilities />} />
            <Route path="challenges" element={<Challenges />} />
            <Route path="shop" element={<Shop />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="contributions" element={<Contributions />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/team" element={<ProfileTeam />} />
            <Route path="team" element={<Team />} />
            <Route path="teams" element={<Teams />} />
            <Route path="gulag" element={<Gulag />} />
            <Route path="gulag/:id" element={<GulagDetail />} />
            <Route path="duelos" element={<Duels />} />
            <Route path="mvp" element={<MVP />} />
            <Route path="mvp-user" element={<MVPUser />} />
            <Route path="documentation" element={<Documentation />} />
            <Route path="submit-explanation" element={<SubmitExplanation />} />
            <Route path="moderate-explanations" element={<ModerateExplanations />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
            <Route path="help" element={<Help />} />
            <Route path="*" element={<NotFound />} />
          </Route>


        </Routes>
      </div>
    </LanguageProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <PointsProvider>
          <InventoryProvider>
            <BackgroundProvider>
              <AppContent />
            </BackgroundProvider>
          </InventoryProvider>
        </PointsProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App; 