import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(savedUsers);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Пользователи</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} className="border rounded p-4 shadow">
            <img src={user.photo} alt="user" className="w-24 h-24 object-cover rounded mx-auto" />
            <h2 className="text-xl font-semibold text-center mt-2">
              {user.lastName} {user.firstName}
            </h2>
            <p className="text-center text-gray-600">{user.skill}</p>
            <div className="flex flex-wrap gap-2 mt-2 justify-center">
              {user.projects.slice(0, 3).map((proj, i) => (
                proj.images[0] && (
                  <img key={i} src={proj.images[0]} alt="proj" className="w-14 h-14 object-cover rounded" />
                )
              ))}
            </div>
            <button
              onClick={() => navigate(`/skills/profile/${user.id}`)}
              className="mt-4 block mx-auto text-blue-600 underline"
            >
              Профиль
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
