import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Layouts
import MainLayout from '@/components/layouts/MainLayout';
import AuthLayout from '@/components/layouts/AuthLayout';

// Pages
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import Vulnerabilities from '@/pages/Vulnerabilities';
// import Challenges from '@/pages/Challenges';
import Shop from '@/pages/Shop';
// import Contributions from '@/pages/Contributions';
import Profile from '@/pages/Profile';
import Team from '@/pages/Team';
import Gulag from '@/pages/Gulag';
import MVP from '@/pages/MVP';
import NotFound from '@/pages/NotFound';
import MensualRanking from '@/pages/Mensual Ranking User';
import CuatrimestralRankingTeams from '@/pages/Cuatrimestral Ranking Teams';
import ProfileCustomization from '@/pages/ProfileCustomization';
import AvatarSelection from '@/pages/AvatarSelection';

// Components
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Hooks
import { useAuth } from '@/contexts/AuthContext';

function App() {
  return (
    <>
      <Helmet>
        <title>Bug Bounty Platform</title>
        <meta name="description" content="Plataforma de Bug Bounty - Encuentra vulnerabilidades, gana recompensas" />
      </Helmet>

      <Routes>
        <Route path="/" element={<MainLayout><Outlet /></MainLayout>}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="vulnerabilities" element={<Vulnerabilities />} />
          {/* <Route path="challenges" element={<Challenges />} /> */}
          <Route path="shop" element={<Shop />} />
          {/* <Route path="contributions" element={<Contributions />} /> */}
          <Route path="profile" element={<Profile />} />
          <Route path="team" element={<Team />} />
          <Route path="gulag" element={<Gulag />} />
          <Route path="mvp" element={<MVP />} />
          <Route path="mensual-ranking" element={<MensualRanking />} />
          <Route path="cuatrimestral-ranking-teams" element={<CuatrimestralRankingTeams />} />
          <Route path="profile-customization" element={<ProfileCustomization />} />
          <Route path="avatar-selection" element={<AvatarSelection />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App; 