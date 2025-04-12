const ProfessorCard = ({ professor }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <div className="flex items-center gap-4">
      <img 
        src={professor.photo} 
        alt={`${professor.first_name} ${professor.last_name}`} 
        className="w-16 h-16 rounded-full object-cover"
      />
      <div>
        <h3 className="text-xl font-semibold">
          {professor.last_name} {professor.first_name} {professor.patronymic}
        </h3>
        <p className="text-gray-600">{professor.position}</p>
      </div>
    </div>
    {professor.link && (
      <p className="mt-3 text-sm text-blue-600">
        <a href={professor.link} target="_blank" rel="noopener noreferrer">
          Ссылка на профиль
        </a>
      </p>
    )}
  </div>
);

export default ProfessorCard;
