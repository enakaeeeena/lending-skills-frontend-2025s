import { useState } from 'react';
import { BLOCK_TYPES } from '../../../constants/blockTypes';

const BlockTypeModal = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState(BLOCK_TYPES.HERO);

  const handleCreate = () => {
    const baseTemplates = {
      [BLOCK_TYPES.HERO]: {
        title: 'Главный баннер',
        subtitle: '',
        image: null,
        tickerText: '#информационныетехнологиивдизайне #итвдргпу #ргпу #герцен'
      },
      [BLOCK_TYPES.ABOUT]: {
        title: 'О программе',
        direction: '',
        department: '',
        goal: '',
        images: [],
        bgImage: ''
      },
      [BLOCK_TYPES.PROFESSORS]: {
        blockTitle: 'Преподаватели',
        buttonText: 'Показать всех',
        professors: []
      },
      [BLOCK_TYPES.CURRICULUM]: {
        bgImage: '/photos/plan_back.png',
        sections: [],
        images: []
      },
      [BLOCK_TYPES.REVIEWS]: {
        title: 'Отзывы',
        reviews: []
      
     
      },
    };
      

    const newBlock = {
      id: Date.now(),
      type,
      title: title || baseTemplates[type].title,
      content: baseTemplates[type],
      visible: true,
    };

    onCreate(newBlock);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Создать новый блок</h2>
        
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border-2 border-gray-300 mb-4"
        >
          <option value={BLOCK_TYPES.HERO}>Главный баннер</option>
          <option value={BLOCK_TYPES.ABOUT}>О программе</option>
          <option value={BLOCK_TYPES.PROFESSORS}>Преподаватели</option>
          <option value={BLOCK_TYPES.CURRICULUM}>Учебный план</option>
          <option value={BLOCK_TYPES.REVIEWS}>Отзывы</option>
        </select>

        <input
          type="text"
          placeholder="Название блока"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border-2 border-gray-300 mb-4"
        />

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200"
          >
            Отмена
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
          >
            Создать
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockTypeModal;