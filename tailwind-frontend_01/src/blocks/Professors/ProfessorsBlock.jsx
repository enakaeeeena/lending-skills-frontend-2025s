import { useEffect, useState } from 'react';
import { fetchData } from '../../api/fakeDb';
import { Link } from 'react-router-dom';
import ProfessorsCard from './components/ProfessorsCard';

const ProfessorsBlock = ({ data }) => {
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData("professors").then(data => {
      setProfessors(data.slice(0, 3));
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="container mx-auto py-16 px-4">
      <h2 className="text-90px font-bold mb-8 text-right">Преподаватели</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {professors.map(professor => (
          <ProfessorsCard key={professor.professors_id} professor={professor} />
        ))}
      </div>

      <div className="text-center">
        <Link 
          to="/professors"
          className="inline-block w-full max-w-2xl bg-black text-white py-4 px-8 
                     text-2xl font-bold hover:bg-gray-800 transition-colors"
        >
          Показать всех
        </Link>
      </div>
    </div>
  );
};

export default ProfessorsBlock;