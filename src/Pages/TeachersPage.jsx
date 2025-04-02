import React from 'react';

function TeachersPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Преподаватели</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold">Иванова А.А.</h3>
          <p className="text-gray-600">Профессор</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold">Петров Б.В.</h3>
          <p className="text-gray-600">Доцент</p>
        </div>
      </div>
    </div>
  );
}

export default TeachersPage; 