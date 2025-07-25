import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Layouts
import MainLayout from '@/components/layouts/MainLayout';

// Pages
import Dashboard from '@/pages/Dashboard';
import Vulnerabilities from '@/pages/Vulnerabilities';
import Challenges from '@/pages/Challenges';
import Shop from '@/pages/Shop';
import Contributions from '@/pages/Contributions';
import Profile from '@/pages/Profile';
import Team from '@/pages/Team';
import Gulag from '@/pages/Gulag';
import MVP from '@/pages/MVP';
import NotFound from '@/pages/NotFound';
import UsersScorePage from '@/pages/UsersScorePage';
import FormularioPage from '@/pages/formulario';
import CrearVulnerabilidad from '@/pages/formulario/crear';
import Ajustes from '@/pages/Ajustes';
import GulagDesafio from '@/pages/GulagDesafio';
import Duelos from '@/pages/Duelos';
import Equipos from '@/pages/Equipos';
import Reglas from '@/pages/Reglas';

// Contexts
import { ShopProvider } from '@/contexts/ShopContext';

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
          <Route path="gulag/desafio/:id" element={<GulagDesafio />} />
          <Route path="mvp" element={<MVP />} />
          <Route path="users-score" element={<UsersScorePage />} />
          <Route path="formulario/crear" element={<CrearVulnerabilidad />} />
          <Route path="formulario" element={<FormularioPage />} />
          <Route path="ajustes" element={<Ajustes />} />
          <Route path="duelos" element={<Duelos />} />
          <Route path="equipos" element={<Equipos />} />
          <Route path="reglas" element={<Reglas />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ShopProvider>
  );
}

export default App; 