import { useState, useEffect } from 'react';
import { FiSettings, FiX, FiPlus, FiEye, FiEyeOff } from 'react-icons/fi'; // Добавлен импорт иконок

const AdminPanel = ({ headerLinks, setHeaderLinks }) => {
  const [blocks, setBlocks] = useState(() => {
    const savedBlocks = localStorage.getItem('pageBlocks');
    return savedBlocks ? JSON.parse(savedBlocks) : [];
  });
  const [showHeaderEditor, setShowHeaderEditor] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);

  // Загрузка блоков при монтировании
  useEffect(() => {
    const savedBlocks = localStorage.getItem('pageBlocks');
    if (savedBlocks) {
      setBlocks(JSON.parse(savedBlocks));
    }
  }, []);

  // Сохранение блоков при изменении
  useEffect(() => {
    localStorage.setItem('pageBlocks', JSON.stringify(blocks));
  }, [blocks]);

  const toggleBlockVisibility = (id) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, isVisible: !block.isVisible } : block
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Панель управления шапкой */}
      <div className="bg-white border-b-4 border-black py-4">
        <div className="container flex justify-end">
          <button
            onClick={() => setShowHeaderEditor(true)}
            className="border-2 border-black p-2 hover:bg-black hover:text-white transition"
          >
            <FiSettings className="text-xl" />
          </button>
        </div>
      </div>

      {/* Основное содержимое админки */}
      <div className="container py-8">
        <div className="bg-white border-4 border-black p-6">
          <div className="flex justify-between items-center border-b-4 border-black pb-4 mb-6">
            <h1 className="text-3xl font-bold">Управление контентом</h1>
            <button
              onClick={() => setShowBlockModal(true)}
              className="bg-blue-600 text-white px-4 py-2 border-2 border-black hover:bg-blue-700 flex items-center gap-2"
            >
              <FiPlus /> Добавить блок
            </button>
          </div>

          {/* Список блоков */}
          <div className="space-y-6">
            {blocks.map(block => (
              <div key={block.id} className="border-4 border-black p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">{block.title || `Блок ${block.id}`}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleBlockVisibility(block.id)}
                      className="p-2 border-2 border-black hover:bg-gray-100"
                      title={block.isVisible ? 'Скрыть' : 'Показать'}
                    >
                      {block.isVisible ? <FiEye /> : <FiEyeOff />}
                    </button>
                    <button
                      onClick={() => {
                        setBlocks(blocks.filter(b => b.id !== block.id));
                      }}
                      className="p-2 border-2 border-black bg-red-500 text-white hover:bg-red-600"
                      title="Удалить"
                    >
                      ×
                    </button>
                  </div>
                </div>
                <div className="border-2 border-black p-4">
                  {block.type === 'text' && (
                    <div>
                      <h4 className="font-bold mb-2">{block.content?.title}</h4>
                      <p>{block.content?.text}</p>
                    </div>
                  )}
                  {block.type === 'teachers' && (
                    <div>
                      <h4 className="font-bold mb-2">{block.content?.title}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {block.content?.list?.map((teacher, i) => (
                          <div key={i} className="border-2 border-black p-2">
                            <p><strong>{teacher.name}</strong></p>
                            <p>{teacher.position}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Модальное окно редактирования шапки */}
      {showHeaderEditor && (
        <HeaderEditor
          headerLinks={headerLinks}
          setHeaderLinks={setHeaderLinks}
          onClose={() => setShowHeaderEditor(false)}
        />
      )}

      {/* Модальное окно добавления блока */}
      {showBlockModal && (
        <BlockTypeModal
          onClose={() => setShowBlockModal(false)}
          onCreate={(newBlock) => {
            setBlocks([...blocks, newBlock]);
          }}
        />
      )}
    </div>
  );
};

const HeaderEditor = ({ headerLinks, setHeaderLinks, onClose }) => {
  const [tempLinks, setTempLinks] = useState([...headerLinks]);

  const handleSave = () => {
    const filteredLinks = tempLinks
      .filter(link => link.label.trim() && link.path.trim())
      .map(link => ({
        ...link,
        label: link.label.trim(),
        path: link.path.trim()
      }));
    
    setHeaderLinks(filteredLinks);
    localStorage.setItem('headerLinks', JSON.stringify(filteredLinks));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white border-4 border-black w-full max-w-2xl">
        <div className="flex justify-between items-center border-b-4 border-black p-4">
          <h2 className="text-2xl font-bold">Редактирование шапки</h2>
          <button onClick={onClose} className="hover:text-red-600">
            <FiX size={24} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {tempLinks.map((link, index) => (
            <div key={index} className="flex gap-4">
              <input
                value={link.label}
                onChange={(e) => {
                  const newLinks = [...tempLinks];
                  newLinks[index].label = e.target.value;
                  setTempLinks(newLinks);
                }}
                className="border-2 border-black p-2 flex-1"
                placeholder="Название пункта"
              />
              <select
                value={link.path}
                onChange={(e) => {
                  const newLinks = [...tempLinks];
                  newLinks[index].path = e.target.value;
                  setTempLinks(newLinks);
                }}
                className="border-2 border-black p-2 flex-1"
              >
                <option value="/teachers">Преподаватели</option>
                <option value="/laboratory">Лаборатория</option>
                <option value="/skills">Скиллз-паспорт</option>
                <option value="/gallery">Галерея</option>
              </select>
              <button
                onClick={() => setTempLinks(tempLinks.filter((_, i) => i !== index))}
                className="bg-red-500 text-white p-2 border-2 border-black hover:bg-red-600"
              >
                Удалить
              </button>
            </div>
          ))}
          <button
            onClick={() => setTempLinks([...tempLinks, { label: '', path: '/' }])}
            className="w-full border-2 border-black p-2 hover:bg-gray-100"
          >
            + Добавить пункт
          </button>
        </div>

        <div className="flex justify-end gap-4 p-4 border-t-4 border-black">
          <button
            onClick={onClose}
            className="border-2 border-black px-6 py-2 hover:bg-gray-100"
          >
            Отмена
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2 border-2 border-black hover:bg-blue-700"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};

const BlockTypeModal = ({ onClose, onCreate }) => {
  const [type, setType] = useState('text');
  const [title, setTitle] = useState('');

  const handleCreate = () => {
    const defaultContent = {
      text: { title: '', text: '' },
      teachers: { title: 'Преподаватели', list: [] },
      gallery: { title: 'Галерея', items: [] }
    };

    onCreate({
      id: Date.now(),
      type,
      title,
      content: defaultContent[type] || '',
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
            <option value="teachers">Блок преподавателей</option>
            <option value="gallery">Галерея</option>
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

export default AdminPanel;