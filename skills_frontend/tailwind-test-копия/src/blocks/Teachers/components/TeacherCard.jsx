const TeacherCard = ({ teacher }) => (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center gap-4">
        <img 
          src={teacher.avatar} 
          alt={teacher.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-xl font-semibold">{teacher.name}</h3>
          <p className="text-gray-600">{teacher.position}</p>
        </div>
      </div>
      <p className="mt-3 text-sm">{teacher.bio}</p>
    </div>
  );
  
  export default TeacherCard;