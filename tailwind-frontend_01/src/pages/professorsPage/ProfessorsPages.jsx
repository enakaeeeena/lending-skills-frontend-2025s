import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProfessorsCard from '../../blocks/Professors/components/ProfessorsCard';
import { fetchData } from '../../api/fakeDb';

const ProfessorsPage = () => {
  const [professors, setProfessors] = useState([]);
  const [blockTitle, setBlockTitle] = useState('Преподаватели');
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const pageBlocks = JSON.parse(localStorage.getItem('pageBlocks') || []);
    const professorsBlock = pageBlocks.find(b => b.type === 'professors');
    
    if (professorsBlock) {
      setProfessors(professorsBlock.content.professors || []);
      setBlockTitle(professorsBlock.content.blockTitle || 'Преподаватели');
      setLoading(false);
    } else {
      fetchData("professors").then(data => {
        setProfessors(data);
        setLoading(false);
      });
    }
  }, []);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="relative mb-8">
        <h2 className="text-90px font-bold text-right relative pr-8">
          <div className="relative inline-block">
            <span className="relative z-10 bg-white pl-8">
              {blockTitle} {/* Используем сохраненное значение */}
            </span>
            <span 
              className="absolute right-full top-1/2 w-screen h-1 bg-black transform -translate-y-1/2"
              style={{ left: '-50vw' }}
            ></span>
          </div>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {professors.map(professor => (
          <ProfessorsCard 
            key={professor.id} 
            professor={professor} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProfessorsPage;