import { FiX } from 'react-icons/fi';

const HeaderEditor = ({ headerLinks, setHeaderLinks, onClose }) => {
  const [tempLinks, setTempLinks] = useState([...headerLinks]);

  const handleSave = () => {
    const filteredLinks = tempLinks
      .filter(link => link.label.trim() && link.path.trim())
      .map(link => ({
        ...link,
        label: link.label.trim(),
        path: link.path.trim()
      }));
    
    setHeaderLinks(filteredLinks);
    localStorage.setItem('headerLinks', JSON.stringify(filteredLinks));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white border-4 border-black w-full max-w-2xl">
        <div className="flex justify-between items-center border-b-4 border-black p-4">
          <h2 className="text-2xl font-bold">Редактирование шапки</h2>
          <button onClick={onClose} className="hover:text-red-600">
            <FiX size={24} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {tempLinks.map((link, index) => (
            <div key={index} className="flex gap-4">
              <input
                value={link.label}
                onChange={(e) => {
                  const newLinks = [...tempLinks];
                  newLinks[index].label = e.target.value;
                  setTempLinks(newLinks);
                }}
                className="border-2 border-black p-2 flex-1"
              />
              <select
                value={link.path}
                onChange={(e) => {
                  const newLinks = [...tempLinks];
                  newLinks[index].path = e.target.value;
                  setTempLinks(newLinks);
                }}
                className="border-2 border-black p-2 flex-1"
              >
                <option value="/teachers">Преподаватели</option>
                <option value="/laboratory">Лаборатория</option>
                <option value="/skills">Навыки</option>
              </select>
              <button
                onClick={() => setTempLinks(tempLinks.filter((_, i) => i !== index))}
                className="bg-red-500 text-white p-2 border-2 border-black hover:bg-red-600"
              >
                Удалить
              </button>
            </div>
          ))}
          <button
            onClick={() => setTempLinks([...tempLinks, { label: '', path: '/' }])}
            className="w-full border-2 border-black p-2 hover:bg-gray-100"
          >
            + Добавить пункт
          </button>
        </div>

        <div className="flex justify-end gap-4 p-4 border-t-4 border-black">
          <button
            onClick={onClose}
            className="border-2 border-black px-6 py-2 hover:bg-gray-100"
          >
            Отмена
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2 border-2 border-black hover:bg-blue-700"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderEditor;