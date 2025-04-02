import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditableBlock from '../Components/EditableBlock';
import BlockSelector from '../Components/BlockSelector';

const AdminPanel = () => {
  const [blocks, setBlocks] = useState([]);
  const [headerLinks, setHeaderLinks] = useState([]);
  const [isEditingHeader, setIsEditingHeader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('landingData')) || {
      blocks: [{
        id: 1,
        type: 'welcome',
        content: {
          title: 'Добро пожаловать!',
          text: 'Информационные технологии в дизайне #ИТВДРГПУ'
        },
        isVisible: true
      }],
      headerLinks: [
        { path: '/', label: 'Главная' },
        { path: '/teachers', label: 'Преподаватели' }
      ]
    };
    setBlocks(savedData.blocks);
    setHeaderLinks(savedData.headerLinks);
  }, []);

  const handleAddBlock = (type) => {
    const newBlock = {
      id: Date.now(),
      type,
      content: getDefaultContent(type),
      isVisible: true
    };
    setBlocks([...blocks, newBlock]);
  };

  const getDefaultContent = (type) => {
    const defaults = {
      text: { title: 'Новый блок', text: 'Текст здесь...' },
      teachers: { title: 'Преподаватели', list: [] },
      gallery: { title: 'Галерея', items: [] }
    };
    return defaults[type] || { title: 'Новый блок', content: '' };
  };

  const handleSaveAll = () => {
    localStorage.setItem('landingData', JSON.stringify({ blocks, headerLinks }));
    alert('Изменения сохранены!');
    navigate('/');
  };

  return (
    <div className="pt-16 bg-gray-50 min-h-screen p-6">
      <div className="container mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between mb-8">
          <h1 className="text-2xl font-bold">Админ-панель</h1>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Вернуться на сайт
          </button>
        </div>

        {/* Редактирование шапки */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Меню сайта</h2>
            <button 
              onClick={() => setIsEditingHeader(!isEditingHeader)}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              {isEditingHeader ? 'Закрыть' : 'Редактировать'}
            </button>
          </div>

          {isEditingHeader && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              {headerLinks.map((link, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => {
                      const newLinks = [...headerLinks];
                      newLinks[index].label = e.target.value;
                      setHeaderLinks(newLinks);
                    }}
                    className="border p-2 mr-2 flex-1 rounded"
                    placeholder="Текст ссылки"
                  />
                  <input
                    type="text"
                    value={link.path}
                    onChange={(e) => {
                      const newLinks = [...headerLinks];
                      newLinks[index].path = e.target.value;
                      setHeaderLinks(newLinks);
                    }}
                    className="border p-2 mr-2 flex-1 rounded"
                    placeholder="/путь"
                  />
                  <button
                    onClick={() => setHeaderLinks(headerLinks.filter((_, i) => i !== index))}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    Удалить
                  </button>
                </div>
              ))}
              <button
                onClick={() => setHeaderLinks([...headerLinks, { label: '', path: '' }])}
                className="bg-green-500 text-white px-3 py-1 rounded mt-2"
              >
                + Добавить ссылку
              </button>
            </div>
          )}
        </section>

        {/* Редактирование блоков */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Блоки лендинга</h2>
            <BlockSelector onSelect={handleAddBlock} />
          </div>

          <div className="space-y-6">
            {blocks.map((block) => (
              <EditableBlock
                key={block.id}
                block={block}
                isEditable={true}
                onSave={(updatedContent) => {
                  setBlocks(blocks.map(b => 
                    b.id === block.id ? { ...b, content: updatedContent } : b
                  ));
                }}
                onDelete={() => {
                  setBlocks(blocks.filter(b => b.id !== block.id));
                }}
                onToggleVisibility={() => {
                  setBlocks(blocks.map(b => 
                    b.id === block.id ? { ...b, isVisible: !b.isVisible } : b
                  ));
                }}
              />
            ))}
          </div>
        </section>

        <div className="mt-8">
          <button
            onClick={handleSaveAll}
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
          >
            Сохранить все изменения
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;