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
import Feedback from '@/pages/Feedback';
import Store from '@/pages/Store';
import Documentacion from '@/pages/Publisher';
import DocumentacionPublica from '@/pages/DocumentacionPublica';
import MisDocumentaciones from '@/pages/MisDocumentaciones';
import Moderation from '@/pages/Moderation';
import RankingEquipos from '@/pages/RankingEquipos';
import RankingEquiposGulag from './pages/RankingEquiposGulag';
import RankingUsuarios from './pages/RankingUsuarios';
import GulagDetail from '@/pages/GulagDetail';
import Equipos from '@/pages/Equipos';

// Components
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
          <Route path="challenges" element={<Challenges />} />
          <Route path="shop" element={<Shop />} />
          <Route path="contributions" element={<Contributions />} />
          <Route path="profile" element={<Profile />} />
          <Route path="team" element={<Team />} />
          <Route path="equipos" element={<Equipos />} />
          <Route path="gulag" element={<Gulag />} />
          <Route path="gulag/:id" element={<GulagDetail />} />
          <Route path="mvp" element={<MVP />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="store" element={<Store />} />
          <Route path="publisher" element={<Documentacion />} />
          <Route path="documentacion" element={<DocumentacionPublica />} />
          <Route path="mis-documentaciones" element={<MisDocumentaciones />} />
          <Route path="moderacion" element={<Moderation />} />
          <Route path="ranking-equipos" element={<RankingEquipos />} />
          <Route path="ranking-equipos-gulag" element={<RankingEquiposGulag />} />
          <Route path="ranking-usuarios" element={<RankingUsuarios />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App; 