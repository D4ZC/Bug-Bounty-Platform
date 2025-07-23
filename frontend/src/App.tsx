import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar';

// Layouts
import MainLayout from '@/components/layouts/MainLayout';
import AuthLayout from '@/components/layouts/AuthLayout';

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

// Components
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Hooks
import { useAuth } from '@/contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import LanguageSelector from './components/LanguageSelector';
import { useTranslation } from './utils/useTranslation';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#F9FAFB] text-[#1F2937]">
        <Navbar />
        <Helmet>
          <title>Bug Bounty Platform</title>
          <meta name="description" content="Plataforma de Bug Bounty - Encuentra vulnerabilidades, gana recompensas" />
        </Helmet>

        <Routes>
          <Route path="/" element={<MainLayout><Outlet /></MainLayout>}>
            <Route index element={<Dashboard />} />
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
            <Route path="gulag" element={<Gulag />} />
            <Route path="gulag/:id" element={<GulagDetail />} />
            <Route path="duelos" element={<Duels />} />
            <Route path="mvp" element={<MVP />} />
            <Route path="mvp-user" element={<MVPUser />} />
            <Route path="documentation" element={<Documentation />} />
            <Route path="submit-explanation" element={<SubmitExplanation />} />
            <Route path="moderate-explanations" element={<ModerateExplanations />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </LanguageProvider>
  );
}

export default App; 