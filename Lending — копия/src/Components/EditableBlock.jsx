import { useState } from 'react';

const EditableBlock = ({ block, isEditable, onSave, onDelete, onToggleVisibility }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(block.content);

  const handleSave = () => {
    onSave(content);
    setIsEditing(false);
  };

  const renderContent = () => {
    switch (block.type) {
      case 'welcome':
        return (
          <div className="p-6 bg-blue-50 rounded-lg">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">{content.title}</h2>
            <p className="text-lg text-gray-700">{content.text}</p>
          </div>
        );
      case 'text':
        return (
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">{content.title}</h3>
            <p className="text-gray-700 whitespace-pre-line">{content.text}</p>
          </div>
        );
      case 'teachers':
        return (
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-2xl font-bold mb-4 text-center">{content.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {content.list?.map((teacher, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-3"/>
                  <p className="font-medium text-center">{teacher.name}</p>
                  <p className="text-sm text-gray-600 text-center">{teacher.position}</p>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <div className="bg-white p-4 rounded shadow">{JSON.stringify(content)}</div>;
    }
  };

  return (
    <div className={`relative mb-6 ${!block.isVisible && 'opacity-50'}`}>
      {isEditable && (
        <div className="absolute -top-3 -right-3 flex gap-2 bg-white p-1 rounded-full shadow-lg">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-1 text-gray-600 hover:text-blue-600"
            title="Редактировать"
          >
            ✏️
          </button>
          <button
            onClick={onDelete}
            className="p-1 text-gray-600 hover:text-red-600"
            title="Удалить"
          >
            🗑️
          </button>
          <button
            onClick={onToggleVisibility}
            className="p-1 text-gray-600 hover:text-green-600"
            title={block.isVisible ? 'Скрыть' : 'Показать'}
          >
            {block.isVisible ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
      )}

      {isEditing ? (
        <div className="bg-gray-50 p-6 rounded-lg border-2 border-blue-200">
          {block.type === 'text' || block.type === 'welcome' ? (
            <>
              <input
                value={content.title}
                onChange={(e) => setContent({ ...content, title: e.target.value })}
                className="w-full p-2 border rounded mb-3"
                placeholder="Заголовок"
              />
              <textarea
                value={content.text}
                onChange={(e) => setContent({ ...content, text: e.target.value })}
                className="w-full p-2 border rounded"
                rows="5"
                placeholder="Текст"
              />
            </>
          ) : null}

          {block.type === 'teachers' && (
            <div>
              <input
                value={content.title}
                onChange={(e) => setContent({ ...content, title: e.target.value })}
                className="w-full p-2 border rounded mb-3"
                placeholder="Название блока"
              />
              <div className="space-y-3">
                {content.list?.map((teacher, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      value={teacher.name}
                      onChange={(e) => {
                        const newList = [...content.list];
                        newList[index].name = e.target.value;
                        setContent({ ...content, list: newList });
                      }}
                      className="flex-1 p-2 border rounded"
                      placeholder="Имя преподавателя"
                    />
                    <input
                      value={teacher.position}
                      onChange={(e) => {
                        const newList = [...content.list];
                        newList[index].position = e.target.value;
                        setContent({ ...content, list: newList });
                      }}
                      className="flex-1 p-2 border rounded"
                      placeholder="Должность"
                    />
                    <button
                      onClick={() => {
                        setContent({
                          ...content,
                          list: content.list.filter((_, i) => i !== index)
                        });
                      }}
                      className="bg-red-500 text-white p-2 rounded"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    setContent({
                      ...content,
                      list: [...(content.list || []), { name: '', position: '' }]
                    });
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
                >
                  + Добавить преподавателя
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Отмена
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Сохранить
            </button>
          </div>
        </div>
      ) : (
        renderContent()
      )}
    </div>
  );
};

export default EditableBlock;