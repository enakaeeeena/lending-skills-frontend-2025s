import { useState } from 'react';

const blockTypes = [
  { type: 'text', label: 'Текстовый блок' },
  { type: 'teachers', label: 'Блок преподавателей' },
  { type: 'gallery', label: 'Галерея работ' },
  { type: 'form', label: 'Форма обратной связи' },
];

const BlockSelector = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
      >
        <span>Добавить блок</span>
        <svg 
          className={`ml-2 w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 border border-gray-200">
          {blockTypes.map((item) => (
            <button
              key={item.type}
              onClick={() => {
                onSelect(item.type);
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-0"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlockSelector;