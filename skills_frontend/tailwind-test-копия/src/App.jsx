import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useState } from 'react';
import Header from './components/Header';
import LandingPage from './pages/Main/LandingPage';
import TeachersBlock from './blocks/Teachers/TeachersBlock';
import SkillsBlock from './blocks/SkillsPassport/SkillsBlock';
import ProfileView from './blocks/SkillsPassport/ProfileView';
import HomePage from './blocks/SkillsPassport/HomePage';
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
          { label: 'Лаборатория', path: '/laboratory' },
          { label: 'Скиллз паспорт', path: '/skills' },
          { label: 'Галерея', path: '/gallery' }
        ];
  });

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header links={headerLinks} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/teachers" element={<TeachersBlock />} />
            <Route path="/laboratory" element={<LabBlock />} />
            <Route path="/skills/profile" element={<ProfileView />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/skills" element={<SkillsBlock />} />
            <Route path="/skills/profile/:id" element={<ProfileView />} />
            <Route path="/skills/:id?" element={<SkillsBlock />} />
            <Route path="/skills" element={<SkillsBlock />} />
            <Route path="/skills/:id" element={<SkillsBlock />} /> {/* редактирование */}
            <Route path="/skills/profile/:id" element={<ProfileView />} />
            <Route path="*" element={<HomePage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin" 
              element={<AdminPanel headerLinks={headerLinks} setHeaderLinks={setHeaderLinks} />} 
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;