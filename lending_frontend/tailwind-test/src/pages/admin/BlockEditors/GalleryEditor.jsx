const GalleryEditor = ({ content, setContent }) => {
    return (
      <div>
        <input
          value={content.title || ''}
          onChange={(e) => setContent({ ...content, title: e.target.value })}
          className="w-full p-2 border-2 border-black mb-3"
          placeholder="Название галереи"
        />
        <div className="space-y-3">
          {content.items?.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                value={item.description || ''}
                onChange={(e) => {
                  const newItems = [...content.items];
                  newItems[index].description = e.target.value;
                  setContent({ ...content, items: newItems });
                }}
                className="flex-1 p-2 border-2 border-black"
                placeholder="Описание изображения"
              />
              <button
                onClick={() => {
                  setContent({
                    ...content,
                    items: content.items.filter((_, i) => i !== index)
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
                items: [...(content.items || []), { description: '' }]
              });
            }}
            className="bg-blue-500 text-white px-3 py-1 border-2 border-black mt-2"
          >
            + Добавить изображение
          </button>
        </div>
      </div>
    );
  };
  
  export default GalleryEditor;