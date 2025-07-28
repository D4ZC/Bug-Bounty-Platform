import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Vulnerabilities from './pages/Vulnerabilities';
import Challenges from './pages/Challenges';
import Shop from './pages/Shop';
import Contributions from './pages/Contributions';
import Profile from './pages/Profile';
import Team from './pages/Team';
import Gulag from './pages/Gulag';
import MVP from './pages/MVP';
import NotFound from './pages/NotFound';
import Publisher from './pages/Publisher';
import DocumentacionPublica from './pages/DocumentacionPublica';
import Feedback from './pages/Feedback';
import RankingEquipos from './pages/RankingEquipos';
import RankingUsuarios from './pages/RankingUsuarios';
import Store from './pages/Store';
import DuelosPage from './pages/DuelosPage';
import ArenaDuelos from './pages/ArenaDuelos';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

const App: React.FC = () => {
  return (
    <Routes>
      {/* Rutas públicas de autenticación */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Rutas protegidas */}
      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout><Outlet /></MainLayout>
        </ProtectedRoute>
      }>
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
        <Route path="publisher" element={<Publisher />} />
        <Route path="documentacion" element={<DocumentacionPublica />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="equipos" element={<Team />} />
        <Route path="ranking-equipos" element={<RankingEquipos />} />
        <Route path="ranking-usuarios" element={<RankingUsuarios />} />
        <Route path="store" element={<Store />} />
        <Route path="duelos" element={<DuelosPage />} />
        <Route path="arena-duelos" element={<ArenaDuelos />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App; 