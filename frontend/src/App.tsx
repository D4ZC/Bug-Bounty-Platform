import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from '@/components/layouts/AuthLayout';
import Login from '@/pages/auth/Login';
import NotFound from '@/pages/NotFound';
import Register from '@/pages/auth/Register';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import MainLayout from '@/components/layouts/MainLayout';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import Vulnerabilities from '@/pages/Vulnerabilities';
import Challenges from '@/pages/Challenges';
import Rankings from '@/pages/Rankings';
import Shop from '@/pages/Shop';
import Team from '@/pages/Team';
import Chat from '@/pages/Chat';
import List from '@/pages/List';
import MVP from '@/pages/MVP';
import Gulag from '@/pages/Gulag';
import Contributions from '@/pages/Contributions';
import Notifications from '@/pages/Notifications';
import Settings from '@/pages/Settings';
import Demo from '@/pages/Demo';
import ReportForm from '@/pages/ReportForm';
import Search from '@/pages/Search';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<AuthLayout />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="/register" element={<AuthLayout />}>
          <Route index element={<Register />} />
        </Route>

        {/* Rutas protegidas: todo lo demás va bajo MainLayout */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="vulnerabilities" element={<Vulnerabilities />} />
          <Route path="challenges" element={<Challenges />} />
          <Route path="rankings" element={<Rankings />} />
          <Route path="shop" element={<Shop />} />
          <Route path="team" element={<Team />} />
          <Route path="chat" element={<Chat />} />
          <Route path="list" element={<List />} />
          <Route path="mvp" element={<MVP />} />
          <Route path="gulag" element={<Gulag />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
          <Route path="contributions" element={<Contributions />} />
          <Route path="report" element={<ReportForm />} />
          <Route path="search" element={<Search />} />
          <Route path="demo" element={<Demo />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App; 