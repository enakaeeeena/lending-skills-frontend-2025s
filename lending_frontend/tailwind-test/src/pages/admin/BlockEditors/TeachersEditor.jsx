const TeachersEditor = ({ content, setContent }) => {
    return (
      <div>
        <input
          value={content.title || ''}
          onChange={(e) => setContent({ ...content, title: e.target.value })}
          className="w-full p-2 border-2 border-black mb-3"
          placeholder="Название блока"
        />
        <div className="space-y-3">
          {content.list?.map((teacher, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                value={teacher.name || ''}
                onChange={(e) => {
                  const newList = [...content.list];
                  newList[index].name = e.target.value;
                  setContent({ ...content, list: newList });
                }}
                className="flex-1 p-2 border-2 border-black"
                placeholder="Имя преподавателя"
              />
              <input
                value={teacher.position || ''}
                onChange={(e) => {
                  const newList = [...content.list];
                  newList[index].position = e.target.value;
                  setContent({ ...content, list: newList });
                }}
                className="flex-1 p-2 border-2 border-black"
                placeholder="Должность"
              />
              <button
                onClick={() => {
                  setContent({
                    ...content,
                    list: content.list.filter((_, i) => i !== index)
                  });
                }}
                className="bg-red-500 text-white p-2 border-2 border-black"
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              setContent({
                ...content,
                list: [...(content.list || []), { name: '', position: '' }]
              });
            }}
            className="bg-blue-500 text-white px-3 py-1 border-2 border-black mt-2"
          >
            + Добавить преподавателя
          </button>
        </div>
      </div>
    );
  };
  
  export default TeachersEditor;