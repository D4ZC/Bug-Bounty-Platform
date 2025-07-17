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
import Challenges from '@/pages/Challenges';
import Shop from '@/pages/Shop';
import Contributions from '@/pages/Contributions';
import Profile from '@/pages/Profile';
import Team from '@/pages/Team';
import Gulag from '@/pages/Gulag';
import MVP from '@/pages/MVP';
import NotFound from '@/pages/NotFound';
import TeamsScorePage from '@/pages/TeamsScorePage';
import UsersScorePage from '@/pages/UsersScorePage';
import FormularioPage from '@/pages/formulario';
import CrearVulnerabilidad from '@/pages/formulario/crear';
import Ajustes from '@/pages/Ajustes';

// Components
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Contexts
import { ShopProvider } from '@/contexts/ShopContext';

// Hooks
import { useAuth } from '@/contexts/AuthContext';

function App() {
  return (
    <ShopProvider>
      <Helmet>
        <title>Bug Bounty Platform</title>
        <meta name="description" content="Plataforma de Bug Bounty - Encuentra vulnerabilidades, gana recompensas" />
      </Helmet>

      <Routes>
        <Route path="/" element={<MainLayout><Outlet /></MainLayout>}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="vulnerabilities" element={<Vulnerabilities />} />
          <Route path="challenges" element={<Challenges />} />
          <Route path="shop" element={<Shop />} />
          <Route path="contributions" element={<Contributions />} />
          <Route path="profile" element={<Profile />} />
          <Route path="team" element={<Team />} />
          <Route path="gulag" element={<Gulag />} />
          <Route path="mvp" element={<MVP />} />
          <Route path="teams-score" element={<TeamsScorePage />} />
          <Route path="users-score" element={<UsersScorePage />} />
          <Route path="formulario/crear" element={<CrearVulnerabilidad />} />
          <Route path="formulario" element={<FormularioPage />} />
          <Route path="ajustes" element={<Ajustes />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ShopProvider>
  );
}

export default App; 