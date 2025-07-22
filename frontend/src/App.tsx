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
import Reports from '@/pages/Reports';
import Rankings from '@/pages/Rankings';
import UserProfile from '@/pages/UserProfile';
import Landing from '@/pages/Landing';

// Components
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import TutorialAutoStart from '@/components/TutorialAutoStart';
import TutorialManager from '@/components/TutorialManager';

// Hooks
import { useAuth } from '@/contexts/AuthContext';

function App() {
  return (
    <>
      <Helmet>
        <title>Bug Bounty Platform</title>
        <meta name="description" content="Plataforma de Bug Bounty - Encuentra vulnerabilidades, gana recompensas" />
      </Helmet>

      <TutorialAutoStart />

      <Routes>
        {/* Rutas públicas de auth y landing */}
        <Route path="/" element={<Landing />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        {/* Rutas protegidas */}
        <Route element={
          <ProtectedRoute>
            <MainLayout>
              <Outlet />
            </MainLayout>
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="vulnerabilities" element={<Vulnerabilities />} />
          <Route path="challenges" element={<Challenges />} />
          <Route path="shop" element={<Shop />} />
          <Route path="contributions" element={<Contributions />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/:id" element={<UserProfile />} />
          <Route path="team/:id" element={<Team />} />
          <Route path="gulag" element={<Gulag />} />
          <Route path="reglas" element={<MVP />} />
          <Route path="reports" element={<Reports />} />
          <Route path="rankings" element={<Rankings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <TutorialManager />
    </>
  );
}

export default App; 