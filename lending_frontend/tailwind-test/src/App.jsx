import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './Components/Header';
import LandingPage from './pages/Main/LandingPage';
import TeachersBlock from './blocks/Professors/ProfessorsBlock';
import SkillsBlock from './blocks/SkillsPassport/SkillsBlock';
import LabBlock from './blocks/Lab/LabBlock';
import AdminPanel from './pages/admin/AdminPanel';
import AdminLogin from './pages/admin/AdminLogin';

function App() {
  const [headerLinks, setHeaderLinks] = useState(() => {
    const savedLinks = localStorage.getItem('headerLinks');
    return savedLinks 
      ? JSON.parse(savedLinks)
      : [
          { label: 'Преподаватели', path: '/teachers' },
          { label: 'Лаборатория', path: '/lab' },
          { label: 'Скиллз паспорт', path: '/skills' },
          { label: 'Галерея', path: '/gallery' }
        ];
  });

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header links={headerLinks} />
        <main className="flex-grow">
          <div className="main-container py-8">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/teachers" element={<TeachersBlock />} />
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
    </BrowserRouter>
  );
}

export default App;