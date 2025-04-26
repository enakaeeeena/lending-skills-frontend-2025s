import { useAdmin } from '../admin/context/AdminContext'; 
import { useEffect, useState } from 'react';
import EditableBlock from '../../components/blocks/EditableBlock';
import { FiPlus} from 'react-icons/fi';
import BlockTypeModal from '../admin/components/BlockTypeModal'
const AdminPanel = ({ headerLinks, setHeaderLinks }) => {
  const { isAdmin } = useAdmin();
  const [blocks, setBlocks] = useState([]);
  const [showBlockModal, setShowBlockModal] = useState(false);

  useEffect(() => {
    const savedBlocks = localStorage.getItem('pageBlocks');
    if (savedBlocks) {
      try {
        const parsed = JSON.parse(savedBlocks);
        setBlocks(parsed.filter(b => b && b.id && b.type));
      } catch (e) {
        console.error("Ошибка загрузки блоков:", e);
      }
    }
  }, []);

  const saveBlocks = (updatedBlocks) => {
    const validBlocks = updatedBlocks.filter(b => 
      b?.id && b?.type && b.content && b.visible !== undefined
    );
    setBlocks(validBlocks);
    localStorage.setItem('pageBlocks', JSON.stringify(validBlocks));
  };

  const handleCreateBlock = (newBlock) => {
    saveBlocks([...blocks, {
      ...newBlock,
      visible: true // Гарантируем видимость новых блоков
    }]);
    setShowBlockModal(false);
  };

  const updateBlock = (id, newData) => {
    const updated = blocks.map(block => 
      block.id === id ? { ...block, ...newData } : block
    );
    saveBlocks(updated);
  };

  const removeBlock = (id) => {
    saveBlocks(blocks.filter(block => block.id !== id));
  };

  const toggleVisibility = (id) => {
    const updated = blocks.map(block => 
      block.id === id ? { ...block, visible: !block.visible } : block
    );
    saveBlocks(updated);
  };

  if (!isAdmin) {
    return <div className="p-4 text-center font-bold">Нет доступа. Пожалуйста, войдите в систему.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Управление контентом</h1>

        <div className="space-y-4">
          {blocks.map(block => (
            <EditableBlock
              key={block.id}
              block={block}
              onSave={(content) => updateBlock(block.id, { content })}
              onDelete={() => removeBlock(block.id)}
              onToggleVisibility={toggleVisibility}
              isAdminView={true}
            />
          ))}
        </div>

        <button
          onClick={() => setShowBlockModal(true)}
          className="w-full text-left px-6 py-4 bg-[#0C3281] text-white hover:bg-[#0a2a6d] mt-8 font-bold flex items-center gap-2"
        >
          <FiPlus /> Добавить блок
        </button>
      </div>

      {showBlockModal && (
        <BlockTypeModal
          onClose={() => setShowBlockModal(false)}
          onCreate={handleCreateBlock}
        />
      )}
    </div>
  );
};

export default AdminPanel;