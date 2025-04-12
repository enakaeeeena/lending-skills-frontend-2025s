import { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useAdmin } from './context/AdminContext';
import BlockTypeModal from './components/BlockTypeModal';
import EditableBlock from '../../components/blocks/EditableBlock';

const AdminPanel = ({ headerLinks, setHeaderLinks }) => {
  const { isAdmin } = useAdmin();
  const [blocks, setBlocks] = useState([]);
  const [showBlockModal, setShowBlockModal] = useState(false);

  useEffect(() => {
    const savedBlocks = localStorage.getItem('pageBlocks');
    if (savedBlocks) setBlocks(JSON.parse(savedBlocks));
  }, []);

  const saveBlocks = (updatedBlocks) => {
    setBlocks(updatedBlocks);
    localStorage.setItem('pageBlocks', JSON.stringify(updatedBlocks));
  };

  const handleCreateBlock = (newBlock) => {
    saveBlocks([...blocks, newBlock]);
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
    return <div className="p-4 text-center">Нет доступа. Пожалуйста, войдите в систему.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Управление контентом</h1>

        <div>
          {blocks.map(block => (
            <div key={block.id}>
              <EditableBlock
                block={block}
                onSave={(content) => updateBlock(block.id, { content })}
                onDelete={() => removeBlock(block.id)}
                onToggleVisibility={toggleVisibility}
                isAdminView={true}
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowBlockModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 mt-8"
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