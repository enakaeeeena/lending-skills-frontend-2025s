import { useState } from 'react';
import { FiX } from 'react-icons/fi';

const HeaderEditor = ({ headerLinks, onSave, onClose }) => {
  const [links, setLinks] = useState([...headerLinks]);
  const [newLink, setNewLink] = useState({ path: '', label: '' });

  const handleAddLink = () => {
    if (newLink.path && newLink.label) {
      setLinks([...links, newLink]);
      setNewLink({ path: '', label: '' });
    }
  };

  const handleRemoveLink = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave(links);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
      <div className="bg-white p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Редактирование шапки</h2>
          <button onClick={onClose} className="text-2xl">
            <FiX />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          {links.map((link, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                value={link.path}
                onChange={(e) => {
                  const updated = [...links];
                  updated[index].path = e.target.value;
                  setLinks(updated);
                }}
                className="border p-2 flex-1"
                placeholder="Путь (/about)"
              />
              <input
                type="text"
                value={link.label}
                onChange={(e) => {
                  const updated = [...links];
                  updated[index].label = e.target.value;
                  setLinks(updated);
                }}
                className="border p-2 flex-1"
                placeholder="Текст ссылки"
              />
              <button
                onClick={() => handleRemoveLink(index)}
                className="bg-red-500 text-white p-2"
              >
                Удалить
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={newLink.path}
            onChange={(e) => setNewLink({ ...newLink, path: e.target.value })}
            className="border p-2 flex-1"
            placeholder="Новый путь"
          />
          <input
            type="text"
            value={newLink.label}
            onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
            className="border p-2 flex-1"
            placeholder="Новый текст"
          />
          <button
            onClick={handleAddLink}
            className="bg-blue-500 text-white px-4 py-2"
          >
            Добавить
          </button>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border hover:bg-gray-100"
          >
            Отмена
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white hover:bg-green-600"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderEditor;