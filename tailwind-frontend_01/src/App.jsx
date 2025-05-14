import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './Components/Header';
import LandingPage from './pages/Main/LandingPage';
import ProfessorsPage from './pages/professorsPage/ProfessorsPages';

import LabBlock from './blocks/Lab/LabBlock';
import AdminPanel from './pages/admin/AdminPanel';
import AdminLogin from './pages/admin/AdminLogin';
import { AdminProvider } from './pages/admin/context/AdminContext';

import ProfileView from './pages/SkillsPassport/ProfileView.jsx';
import AuthPage from './pages/SkillsPassport/AuthPage.jsx'; // ← добавили новую страницу
import SkillsDashboard from './pages/SkillsPassport/SkillsDashboard';
import SkillsBlock from './pages/SkillsPassport/SkillsBlock'; // ← добавили новый компонент
import ConnectionTest from './components/ConnectionTest';

// Create router with future flags
const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

function App() {
  const [headerLinks, setHeaderLinks] = useState(() => {
    const savedLinks = localStorage.getItem('headerLinks');
    return savedLinks 
      ? JSON.parse(savedLinks)
      : [
          { label: 'Преподаватели', path: '/professors' },
          { label: 'Лаборатория', path: '/lab' },
          { label: 'Скиллз паспорт', path: '/skills' },
          { label: 'Галерея', path: '/gallery' }
        ];
  });

  return (
    <BrowserRouter {...router}>
      <AdminProvider>
        <div className="min-h-screen flex flex-col">
          <Header links={headerLinks} setHeaderLinks={setHeaderLinks} />
          <main className="flex-grow">
            <div className="main-container py-8">
              <Routes>
                <Route path="/skills" element={<AuthPage />} /> {/* ← теперь ведёт на AuthPage */}
                <Route path="/skills/profile" element={<ProfileView />} />
                <Route path="/skills/profile/:id" element={<ProfileView />} />
                <Route path="/skills/dashboard" element={<SkillsDashboard />} />
                <Route path="/skills/block" element={<SkillsBlock />} /> {/* ← новый маршрут для SkillsBlock */}


                <Route path="/" element={<LandingPage />} />
                <Route path="/professors" element={<ProfessorsPage />} />
                <Route path="/lab" element={<LabBlock />} />
                <Route path="/skills" element={<SkillsBlock />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route 
                  path="/admin" 
                  element={<AdminPanel headerLinks={headerLinks} setHeaderLinks={setHeaderLinks} />} 
                />
              </Routes>
            </div>
          </main>
        </div>

        <ConnectionTest />

      </AdminProvider>
    
    </BrowserRouter>
  );
}

export default App;