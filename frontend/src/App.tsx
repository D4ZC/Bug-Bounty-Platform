import React from 'react';
import { Routes, Route, Navigate, Outlet, Link } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
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
import { FaHome, FaStore, FaUser } from 'react-icons/fa';
import { GiCrossedSwords } from 'react-icons/gi';
import DuelosPage from './pages/DuelosPage';

const App: React.FC = () => {
  return (
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
        <Route path="publisher" element={<Publisher />} />
        <Route path="documentacion" element={<DocumentacionPublica />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="equipos" element={<Team />} />
        <Route path="ranking-equipos" element={<RankingEquipos />} />
        <Route path="ranking-usuarios" element={<RankingUsuarios />} />
        <Route path="store" element={<Store />} />
        <Route path="duelos" element={<DuelosPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App; 