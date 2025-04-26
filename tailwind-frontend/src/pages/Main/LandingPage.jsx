import { useEffect, useState } from 'react';
import EditableBlock from '../../components/blocks/EditableBlock';

const LandingPage = () => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const loadBlocks = () => {
      try {
        const savedBlocks = localStorage.getItem('pageBlocks');
        if (savedBlocks) {
          const parsedBlocks = JSON.parse(savedBlocks);
          const validBlocks = parsedBlocks.filter(block => 
            block?.id && block?.type && block?.visible !== undefined
          );
          setBlocks(validBlocks.filter(block => block.visible));
        }
      } catch (error) {
        console.error('Ошибка загрузки блоков:', error);
        localStorage.removeItem('pageBlocks');
      }
    };

    loadBlocks();
    
    const handleStorage = (e) => {
      if (e.key === 'pageBlocks') loadBlocks();
    };
    
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <div className="bg-background min-h-screen">
      {blocks.map(block => {
        const isFullWidth = block.type === 'curriculum';

        const BlockContent = (
          <EditableBlock 
            key={block.id}
            block={block} 
            isAdminView={false} 
            onError={(error) => (
              <div className="bg-red-100 p-4 border-2 border-red-500">
                Ошибка отображения блока: {error.message}
              </div>
            )}
          />
        );

        return (
          <section 
            key={block.id} 
            className={isFullWidth ? 'full-width-section' : 'container mx-auto py-8 px-4'}
          >
            <EditableBlock 
              block={block} 
              isAdminView={false} 
            />
          </section>
        );
      })}
      
      {blocks.length === 0 && (
        <div className="container mx-auto text-center text-gray-500 py-16">
          Нет доступных блоков. Добавьте первый блок через админ-панель.
        </div>
      )}
    </div>
  );
};

export default LandingPage;