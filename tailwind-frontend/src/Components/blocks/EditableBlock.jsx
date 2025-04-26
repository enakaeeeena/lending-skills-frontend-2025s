import { useState, useEffect } from 'react';
import { HeroBlockView } from '../../blocks/HeroBlock/components/HeroBlockView';
import { HeroEditor } from '../../blocks/HeroBlock/components/HeroEditor';
import { AboutBlockView } from '../../blocks/AboutBlock/Components/AboutBlockView';
import { AboutEditor } from '../../blocks/AboutBlock/Components/AboutEditor';
import { ProfessorsEditor } from '../../blocks/Professors/components/ProfessorsBlockEditor';
import { ProfessorsBlockView } from '../../blocks/Professors/components/ProfessorsBlockView';
import CurriculumBlockView from '../../blocks/CurriculumBlock/components/CurriculumBlockView';
import CurriculumBlockEditor from '../../blocks/CurriculumBlock/components/CurriculumBlockEditor';
import { ReviewsEditor } from '../../blocks/ReviewsBlock/components/ReviewsBlockEditor';
import { ReviewsBlockView } from '../../blocks/ReviewsBlock/components/ReviewsBlockView';

const EditableBlock = ({ block, onSave, onDelete, onToggleVisibility, isAdminView = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(block.content);

  useEffect(() => {
    setContent(block.content);
  }, [block.content]);

  const handleSave = () => {
    const updatedBlock = {
      ...block,
      content: {
        ...block.content,
        ...content
      }
    };
    onSave(updatedBlock);
    setIsEditing(false);
  };

  if (!isAdminView && !block.visible) return null;

  return (
    <div className="w-full">
      {isAdminView && !block.visible ? (
        <button
          onClick={() => onToggleVisibility(block.id)}
          className="w-full text-left px-6 py-4 border-2 border-black bg-white hover:bg-gray-50 font-bold"
        >
          Развернуть блок: {block.title}
        </button>
      ) : (
        <>
          {isAdminView && (
            <div className="w-full border-2 border-black">
              <div className="flex justify-between items-center px-6 py-4">
                <h2 className="text-xl font-bold">{block.title}</h2>
                <div className="relative group">
                  <button className="p-2 border-2 border-black hover:bg-gray-50 font-bold">⚙</button>
                  <div className="absolute right-0 top-full mt-1 hidden group-hover:flex flex-col border-2 border-black bg-white z-10">
                    <button 
                      onClick={() => setIsEditing(!isEditing)}
                      className="px-4 py-2 hover:bg-gray-100 border-b-2 border-black text-left font-bold"
                    >
                      {isEditing ? 'Отмена' : 'Редактировать'}
                    </button>
                    {isEditing && (
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 hover:bg-green-100 text-green-600 border-b-2 border-black text-left font-bold"
                      >
                        Сохранить
                      </button>
                    )}
                    <button
                      onClick={onDelete}
                      className="px-4 py-2 hover:bg-red-100 text-red-600 text-left font-bold"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isEditing ? (
            <div className="p-6 bg-gray-50 border-x-2 border-black">
              {block.type === 'hero' && (
                <HeroEditor
                  title={content.title}
                  setTitle={(val) => setContent({...content, title: val})}
                  subtitle={content.subtitle}
                  setSubtitle={(val) => setContent({...content, subtitle: val})}
                  image={content.image}
                  setImage={(val) => setContent({...content, image: val})}
                  tickerText={content.tickerText}
                  setTickerText={(val) => setContent({...content, tickerText: val})}
                />
              )}
              {block.type === 'about' && (
                <AboutEditor
                  content={content}
                  setContent={setContent}
                />
              )}
              {block.type === 'professors' && (
                <ProfessorsEditor
                  content={content}
                  setContent={setContent}
                />
              )}
              {block.type === 'curriculum' && (
                <CurriculumBlockEditor
                  content={content}
                  setContent={setContent}
                />
              )}
              {block.type === 'reviews' && (
                <ReviewsEditor
                  content={content}
                  setContent={setContent}
                />
              )}
            </div>
          ) : (
            <div className={isAdminView ? "p-6 border-x-2 border-black" : ""}>
              {block.type === 'hero' && <HeroBlockView content={content} />}
              {block.type === 'about' && <AboutBlockView content={content} />}
              {block.type === 'professors' && <ProfessorsBlockView content={content} />}
              {block.type === 'curriculum' && <CurriculumBlockView content={content} />}
              {block.type === 'reviews' && <ReviewsBlockView content={content} />}
            </div>
          )}

          {isAdminView && (
            <button
              onClick={() => onToggleVisibility(block.id)}
              className="w-full text-left px-6 py-4 border-2 border-t-0 border-black bg-white hover:bg-gray-50 font-bold"
            >
              Скрыть блок: {block.title}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default EditableBlock;