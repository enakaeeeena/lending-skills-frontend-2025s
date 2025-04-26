const ProfessorsCard = ({ professor, isAdmin = false, onEdit, onDelete }) => (
  <div className="bg-white p-6 border-3 border-black relative group">
    {isAdmin && (
      <div className="absolute top-2 right-2 flex gap-2">
        <button 
          onClick={() => onEdit(professor)}
          className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
          </svg>
        </button>
        <button 
          onClick={() => onDelete(professor.id)}
          className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </button>
      </div>
    )}
    
    <div className="flex flex-col items-center text-center">
      {professor.photo && (
        <img 
          src={professor.photo} 
          alt={professor.name} 
          className="w-48 h-48 object-cover border-3 border-black mb-4"
        />
      )}
      <h3 className="text-2xl font-bold mb-2">{professor.name}</h3>
      <p className="text-gray-600 mb-4 text-3x1 font-normal">{professor.position}</p>
      {professor.link && (
        <a
          href={professor.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 font-normal "
        >
          Подробнее →
        </a>
      )}
    </div>
  </div>
);

export default ProfessorsCard;