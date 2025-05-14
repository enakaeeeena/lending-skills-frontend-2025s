import { useAdmin } from '../admin/context/AdminContext'; 
import { useEffect, useState } from 'react';
import EditableBlock from '../../components/blocks/EditableBlock';
import { FiPlus} from 'react-icons/fi';
import BlockTypeModal from '../admin/components/BlockTypeModal';
import { useApi } from '../../hooks/useApi';

const AdminPanel = ({ headerLinks, setHeaderLinks }) => {
  const { isAdmin } = useAdmin();
  const [blocks, setBlocks] = useState([]);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const { get, post, put, del } = useApi();

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const response = await get('/api/blocks');
        if (response.ok) {
          const data = await response.json();
          setBlocks(
            data
              .filter(b => b && b.id && b.type)
              .map(b => ({
                ...b,
                content: typeof b.content === 'string' ? safeParse(b.content) : b.content
              }))
          );
        }
      } catch (e) {
        console.error("Ошибка загрузки блоков:", e);
      }
    };
    fetchBlocks();
  }, [get]);

  // Безопасный парсер JSON
  function safeParse(str) {
    try {
      return str && str !== '{}' ? JSON.parse(str) : {};
    } catch {
      return {};
    }
  }

  const saveBlocks = async (updatedBlocks) => {
    const validBlocks = updatedBlocks.filter(b => 
      b?.id && b?.type && b.content && b.visible !== undefined
    );
    setBlocks(validBlocks);
    
    try {
      const response = await put('/api/blocks', validBlocks);
      if (!response.ok) {
        throw new Error('Failed to save blocks');
      }
    } catch (e) {
      console.error("Ошибка сохранения блоков:", e);
      // Можно добавить уведомление пользователю об ошибке
    }
  };

  const handleCreateBlock = async (newBlock) => {
    try {
      console.log('Creating new block:', newBlock); // Debug log
      
      // Подготавливаем данные блока
      const blockData = {
        Type: (newBlock.type || '').toLowerCase(),
        Title: newBlock.title || '',
        Content: typeof newBlock.content === 'object' ? JSON.stringify(newBlock.content) : newBlock.content,
        Visible: typeof newBlock.visible === 'boolean' ? newBlock.visible : true,
        Date: newBlock.date || new Date().toISOString().split('T')[0],
        IsExample: newBlock.isExample || false
      };

      console.log('Sending to server:', blockData); // Debug log

      const response = await post('/api/blocks', blockData);
      
      if (response.ok) {
        const createdBlock = await response.json();
        console.log('Block created successfully:', createdBlock); // Debug log
        setBlocks(prev => [
          ...prev,
          {
            ...createdBlock,
            content: typeof createdBlock.content === 'string' ? safeParse(createdBlock.content) : createdBlock.content
          }
        ]);
        setShowBlockModal(false);
      } else {
        const errorData = await response.json();
        console.error("Ошибка создания блока:", errorData);
        
        // Формируем понятное сообщение об ошибке
        const errorMessages = [];
        if (errorData.errors) {
          Object.entries(errorData.errors).forEach(([field, messages]) => {
            errorMessages.push(`${field}: ${messages.join(', ')}`);
          });
        }
        const errorMessage = errorMessages.join('; ') || errorData.message || 'Неизвестная ошибка';
        throw new Error(errorMessage);
      }
    } catch (e) {
      console.error("Ошибка создания блока:", e.message || 'Неизвестная ошибка');
      throw e;
    }
  };

  const updateBlock = async (id, newData) => {
    try {
        console.log('Updating block with data:', newData);
        
        // Форматируем данные для сервера
        const requestData = {
            Id: id,
            Type: (newData.type || '').toLowerCase(),
            Title: newData.title || '',
            Content: typeof newData.content === 'object' ? JSON.stringify(newData.content) : newData.content,
            Visible: typeof newData.visible === 'boolean' ? newData.visible : true,
            Date: newData.date || new Date().toISOString().split('T')[0],
            IsExample: newData.isExample || false
        };

        console.log('Sending to server:', requestData);
        
        const response = await put(`/api/blocks/${id}`, requestData);
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server error response:', errorData);
            throw new Error(errorData.message || 'Ошибка при обновлении блока');
        }

        const updatedBlock = await response.json();
        console.log('Server response:', updatedBlock);
        
        if (updatedBlock) {
            // Обновляем блок в локальном состоянии
            setBlocks(prevBlocks => 
                prevBlocks.map(block => 
                    block.id === id ? {
                        ...block,
                        ...updatedBlock,
                        type: updatedBlock.Type.toLowerCase(),
                        title: updatedBlock.Title,
                        content: typeof updatedBlock.Content === 'string' ? JSON.parse(updatedBlock.Content) : updatedBlock.Content,
                        visible: updatedBlock.Visible,
                        date: updatedBlock.Date,
                        isExample: updatedBlock.IsExample
                    } : block
                )
            );
            return true;
        }
        return false;
    } catch (error) {
        console.error('Ошибка обновления блока:', error);
        if (error.response) {
            console.error('Ответ сервера:', error.response.data);
        }
        throw error; // Пробрасываем ошибку для обработки в EditableBlock
    }
  };

  const removeBlock = async (id) => {
    try {
      const response = await del(`/api/blocks/${id}`);
      if (response.ok) {
        setBlocks(blocks.filter(block => block.id !== id));
      }
    } catch (e) {
      console.error("Ошибка удаления блока:", e);
    }
  };

  const toggleVisibility = async (id) => {
    const block = blocks.find(b => b.id === id);
    if (block) {
      await updateBlock(id, { ...block, visible: !block.visible });
    }
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
              onSave={(updatedBlock) => updateBlock(block.id, updatedBlock)}
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