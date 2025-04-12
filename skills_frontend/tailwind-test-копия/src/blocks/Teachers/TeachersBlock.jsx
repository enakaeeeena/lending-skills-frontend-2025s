import { useEffect, useState } from 'react';
import { fetchTeachers } from '../../api/fakeApi';
import TeacherCard from './Components/TeacherCard';

const TeachersBlock = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeachers().then(data => {
      setTeachers(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Преподаватели</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teachers.map(teacher => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>
    </div>
  );
};

export default TeachersBlock;