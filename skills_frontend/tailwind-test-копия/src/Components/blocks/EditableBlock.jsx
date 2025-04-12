// src/components/Blocks/EditableBlock.jsx
import { useState } from 'react';
import TextEditor from '../../pages/admin/BlockEditors/TextEditor';
import TeachersEditor from '../../pages/admin/BlockEditors/TeachersEditor';
import GalleryEditor from '../../pages/admin/BlockEditors/GalleryEditor';

const EditableBlock = ({ block, isEditable, onSave, onDelete, onToggleVisibility }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(block.content);

  const handleSave = () => {
    onSave(content);
    setIsEditing(false);
  };

  const renderEditor = () => {
    switch (block.type) {
      case 'text':
        return <TextEditor content={content} setContent={setContent} />;
      case 'teachers':
        return <TeachersEditor content={content} setContent={setContent} />;
      case 'gallery':
        return <GalleryEditor content={content} setContent={setContent} />;
      default:
        return null;
    }
  };

  return (
    <div className={`relative ${!block.isVisible && 'opacity-50'}`}>
      {isEditable && (
        <div className="absolute -top-3 -right-3 flex gap-2 bg-white p-1 border-2 border-black">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-1 hover:text-blue-600"
            title="Редактировать"
          >
            ✏️
          </button>
          <button
            onClick={onDelete}
            className="p-1 hover:text-red-600"
            title="Удалить"
          >
            🗑️
          </button>
          <button
            onClick={onToggleVisibility}
            className="p-1 hover:text-green-600"
            title={block.isVisible ? 'Скрыть' : 'Показать'}
          >
            {block.isVisible ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
      )}

      {isEditing ? (
        <div className="bg-gray-50 p-4 border-4 border-blue-500">
          {renderEditor()}
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border-2 border-black hover:bg-gray-100"
            >
              Отмена
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white border-2 border-black hover:bg-blue-700"
            >
              Сохранить
            </button>
          </div>
        </div>
      ) : (
        // Рендер превью блока
        <div className="border-2 border-black p-4">
          {block.type === 'text' && (
            <>
              <h3 className="text-xl font-bold mb-2">{content.title}</h3>
              <p className="whitespace-pre-line">{content.text}</p>
            </>
          )}
          {/* Другие типы блоков */}
        </div>
      )}
    </div>
  );
};

export default EditableBlock;