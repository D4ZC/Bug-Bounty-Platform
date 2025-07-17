import React, { Suspense, lazy, useEffect } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { initializeShopProducts, initializeGlobalClans } from './localDb';

// Layouts
import MainLayout from '@/components/layouts/MainLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AdminRoute from '@/components/auth/AdminRoute';
import AdminPanel from '@/pages/AdminPanel';

// Lazy load de páginas
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Challenges = lazy(() => import('@/pages/Challenges'));
const Shop = lazy(() => import('@/pages/Shop'));
const Contributions = lazy(() => import('@/pages/Contributions'));
const Profile = lazy(() => import('@/pages/Profile'));
const Team = lazy(() => import('@/pages/Team'));
const Gulag = lazy(() => import('@/pages/Gulag'));
const MVP = lazy(() => import('@/pages/MVP'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Login = lazy(() => import('@/pages/auth/Login'));
const Register = lazy(() => import('@/pages/auth/Register'));
// Si tienes Leagues, Exercises, Clans:
const Leagues = lazy(() => import('@/pages/Leagues'));
const Exercises = lazy(() => import('@/pages/Exercises'));
const Clans = lazy(() => import('@/pages/Clans'));

function App() {
  // Inicializar datos al cargar la aplicación
  useEffect(() => {
    initializeShopProducts();
    initializeGlobalClans();
  }, []);

  return (
    <>
      <Helmet>
        <title>Bug Bounty Platform</title>
        <meta
          name="description"
          content="Plataforma de Bug Bounty - Encuentra vulnerabilidades, gana recompensas"
        />
      </Helmet>

      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><LoadingSpinner size={48} /></div>}>
        <Routes>
          {/* Rutas de autenticación (sin layout) */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          
          {/* Rutas principales (con layout y protección) */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Outlet />
                </MainLayout>
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="challenges" element={<Challenges />} />
            <Route path="shop" element={<Shop />} />
            <Route path="contributions" element={<Contributions />} />
            <Route path="profile" element={<Profile />} />
            <Route path="team" element={<Team />} />
            <Route path="gulag" element={<Gulag />} />
            <Route path="mvp" element={<MVP />} />
            <Route path="leagues" element={<Leagues />} />
            <Route path="exercises" element={<Exercises />} />
            <Route path="clans" element={<Clans />} />
            {/* Ruta de administración solo para admins */}
            <Route
              path="admin"
              element={
                <AdminRoute>
                  <AdminPanel />
                </AdminRoute>
              }
            />
          </Route>
          
          {/* Ruta 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
