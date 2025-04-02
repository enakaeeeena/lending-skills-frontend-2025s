import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import LandingPage from './Pages/LandingPage';
import TeachersPage from './Pages/TeachersPage';
import LabPage from './Pages/LabPage';
import SkillsPage from './Pages/SkillsPage';
import AdminLogin from './Admin/AdminLogin';
import AdminPanel from './Admin/AdminPanel';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/laboratory" element={<LabPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
