import { useEffect, useState } from 'react';
import EditableBlock from '../Components/EditableBlock';

const LandingPage = () => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('landingData'));
    if (savedData?.blocks) {
      setBlocks(savedData.blocks.filter(block => block.isVisible !== false));
    }
  }, []);

  return (
    <div className="pt-16 pb-12"> {/* pt-16 для фиксированного хедера */}
      <div className="container mx-auto px-6">
        {blocks.length > 0 ? (
          blocks.map((block) => (
            <EditableBlock
              key={block.id}
              block={block}
              isEditable={false}
              onSave={() => {}}
              onDelete={() => {}}
              onToggleVisibility={() => {}}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl text-gray-500">Контент будет добавлен в админ-панели</h2>
            <p className="mt-4">
              <a href="/admin/login" className="text-blue-600 hover:underline">
                Войти в админ-панель
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;