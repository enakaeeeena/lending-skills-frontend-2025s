import { useState } from 'react';
import { FiPlus, FiEye, FiEyeOff } from 'react-icons/fi';

const BlockEditor = () => {
  const [blocks, setBlocks] = useState(
    JSON.parse(localStorage.getItem('pageBlocks')) || []
  );
  const [showBlockModal, setShowBlockModal] = useState(false);

  const toggleBlockVisibility = (id) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, isVisible: !block.isVisible } : block
    ));
  };

  const saveBlocks = () => {
    localStorage.setItem('pageBlocks', JSON.stringify(blocks));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b-4 border-black pb-4">
        <h2 className="text-2xl font-bold">Управление контентом</h2>
        <button
          onClick={() => setShowBlockModal(true)}
          className="bg-blue-600 text-white px-4 py-2 border-2 border-black hover:bg-blue-700 flex items-center gap-2"
        >
          <FiPlus /> Добавить блок
        </button>
      </div>

      {blocks.map(block => (
        <div key={block.id} className="border-4 border-black p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">{block.title}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => toggleBlockVisibility(block.id)}
                className="p-2 border-2 border-black hover:bg-gray-100"
              >
                {block.isVisible ? <FiEye /> : <FiEyeOff />}
              </button>
              <button className="p-2 border-2 border-black hover:bg-gray-100">
                Редактировать
              </button>
              <button
                onClick={() => setBlocks(blocks.filter(b => b.id !== block.id))}
                className="p-2 border-2 border-black bg-red-500 text-white hover:bg-red-600"
              >
                Удалить
              </button>
            </div>
          </div>
          {/* Контент блока */}
          <div className="border-2 border-black p-4">
            {block.type === 'text' && <p>{block.content}</p>}
            {block.type === 'image' && (
              <img src={block.url} alt={block.alt} className="w-full h-48 object-cover" />
            )}
          </div>
        </div>
      ))}

      {showBlockModal && (
        <BlockTypeModal 
          onClose={() => setShowBlockModal(false)}
          onCreate={(newBlock) => {
            setBlocks([...blocks, newBlock]);
            saveBlocks();
          }}
        />
      )}
    </div>
  );
};

const BlockTypeModal = ({ onClose, onCreate }) => {
  const [type, setType] = useState('text');
  const [title, setTitle] = useState('');

  const handleCreate = () => {
    onCreate({
      id: Date.now(),
      type,
      title,
      content: '',
      isVisible: true
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white border-4 border-black w-full max-w-xl p-6">
        <h3 className="text-2xl font-bold mb-4">Создание нового блока</h3>
        <div className="space-y-4">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border-2 border-black p-2"
          >
            <option value="text">Текстовый блок</option>
            <option value="image">Блок с изображением</option>
          </select>
          <input
            type="text"
            placeholder="Название блока"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-2 border-black p-2"
          />
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="border-2 border-black px-4 py-2 hover:bg-gray-100"
            >
              Отмена
            </button>
            <button
              onClick={handleCreate}
              className="bg-blue-600 text-white px-4 py-2 border-2 border-black hover:bg-blue-700"
            >
              Создать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockEditor;