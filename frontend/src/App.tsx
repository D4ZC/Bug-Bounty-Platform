import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Layouts
import MainLayout from '@/components/layouts/MainLayout';

// Pages
import Dashboard from '@/pages/Dashboard';
import Challenges from '@/pages/Challenges';
import Shop from '@/pages/Shop';
import Contributions from '@/pages/Contributions';
import Profile from '@/pages/Profile';
import Team from '@/pages/Team';
import Gulag from '@/pages/Gulag';
import MVP from '@/pages/MVP';
import NotFound from '@/pages/NotFound';
import Leagues from '@/pages/Leagues';
import Exercises from '@/pages/Exercises';

function App() {
  return (
    <>
      <Helmet>
        <title>Bug Bounty Platform</title>
        <meta
          name="description"
          content="Plataforma de Bug Bounty - Encuentra vulnerabilidades, gana recompensas"
        />
      </Helmet>

      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Outlet />
            </MainLayout>
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
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
