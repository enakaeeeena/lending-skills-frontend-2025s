import { useState } from 'react';
import { HeroBlockView } from '../../blocks/HeroBlock/components/HeroBlockView';
import { AboutBlockView } from '../../blocks/AboutBlock/Components/AboutBlockView';

const EditableBlock = ({ block, onSave, onDelete, onToggleVisibility, isAdminView = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(block.content);

  if (!isAdminView && !block.visible) return null;

  return (
    <div className="w-full">
      {!block.visible ? (
        <button
          onClick={() => onToggleVisibility(block.id)}
          className="w-full text-left px-6 py-4 border-t border-b border-black bg-white hover:bg-gray-50"
        >
          Развернуть блок: {block.title}
        </button>
      ) : (
        <>
          <div className="w-full border-t border-b border-black">
            <div className="flex justify-between items-center px-6 py-4">
              <h2 className="text-xl font-semibold">{block.title}</h2>
              {isAdminView && (
                <div className="relative group">
                  <button className="p-2 border border-black hover:bg-gray-50">⚙</button>
                  <div className="absolute right-0 top-full mt-1 hidden group-hover:flex flex-col border border-black bg-white z-10">
                    <button
                      onClick={() => onToggleVisibility(block.id)}
                      className="px-4 py-2 hover:bg-gray-100 border-b border-black text-left"
                    >
                      Скрыть
                    </button>
                    <button 
                      onClick={() => setIsEditing(!isEditing)}
                      className="px-4 py-2 hover:bg-gray-100 border-b border-black text-left"
                    >
                      {isEditing ? 'Отмена' : 'Редактировать'}
                    </button>
                    <button
                      onClick={onDelete}
                      className="px-4 py-2 hover:bg-red-100 text-red-600 text-left"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              )}
            </div>

            {isEditing ? (
              <div className="p-6 bg-gray-50">
              </div>
            ) : (
              <div className="p-6">
                {block.type === 'hero' && <HeroBlockView content={content} />}
                {block.type === 'about' && <AboutBlockView content={content} />}
              </div>
            )}

            {isAdminView && (
              <button
                onClick={() => onToggleVisibility(block.id)}
                className="w-full text-left px-6 py-4 border-t border-black bg-white hover:bg-gray-50"
              >
                Скрыть блок: {block.title}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default EditableBlock;