import { useEffect, useState } from 'react';
import { fetchData } from '../../api/fakeDb';
import ProfessorCard from './components/ProfessorCard';

const ProfessorsBlock = () => {
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData("professors").then(data => {
      setProfessors(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Преподаватели</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {professors.map(professor => (
          <ProfessorCard key={professor.professors_id} professor={professor} />
        ))}
      </div>
    </div>
  );
};

export default ProfessorsBlock;
