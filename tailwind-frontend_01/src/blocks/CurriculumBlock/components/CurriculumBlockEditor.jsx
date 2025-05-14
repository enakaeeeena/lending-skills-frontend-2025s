import React, { useState, useCallback } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';

const CurriculumBlockEditor = ({ content = { images: [] }, setContent }) => {
  const [draggedItem, setDraggedItem] = useState(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 3 - (content.images?.length || 0));
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImage = {
          url: event.target.result,
          x: 50,
          y: 50
        };
        setContent({
          ...content,
          images: [...(content.images || []), newImage]
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDragStart = (index, e) => {
    setDraggedItem(index);
    e.dataTransfer.setDragImage(new Image(), 0, 0);
  };

  const handleDrag = useCallback((index, e) => {
    if (!content.images) return;
    
    const container = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - container.left) / container.width) * 100;
    const y = ((e.clientY - container.top) / container.height) * 100;

    const updatedImages = [...content.images];
    updatedImages[index] = { ...updatedImages[index], x, y };
    setContent({ ...content, images: updatedImages });
  }, [content, setContent]);

  return (
    <section className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/photos/plan_back.png)" }}>
      
      <div className="container mx-auto h-full flex">
    
        <div className="w-1/2 pr-4 py-16 pl-8">
          <h2 className="text-8xl font-bold mb-9">Учебный план</h2>

          <div className="space-y-8">
            <div className="p-6">
              <h3 className="text-3xl font-bold mb-4">Теоретические дисциплины</h3>
              <div className="space-y-2 text-xl">
                <textarea 
                  className="w-full p-2 mb-2"
                  defaultValue="· История дизайна\n· Теория композиции\n· Цветоведение и типографика"
                />
              </div>
            </div>

            <div className="bg-white/90 p-6">
              <h3 className="text-3xl font-bold mb-4">Практические модули</h3>
              <div className="space-y-2 text-xl">
                <textarea
                  className="w-full p-2 mb-2"
                  defaultValue="· Веб-дизайн\n· 3D-моделирование\n· Проектная работа"
                />
              </div>
            </div>
          </div>
        </div>

     
        <div className="w-1/2 bg-gray-100/80 p-8">
          <div className="relative h-full border-2 border-dashed">
            <label className="absolute top-4 left-4 z-10 p-4 flex items-center gap-2 cursor-pointer">
              <FiUpload />
              Загрузить фото (макс. 3)
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={(content.images?.length || 0) >= 3}
              />
            </label>


            {content.images?.map((img, index) => (
              <div
                key={index}
                className="absolute p-2 shadow-lg cursor-move"
                draggable
                onDragStart={(e) => handleDragStart(index, e)}
                onDrag={(e) => handleDrag(index, e)}
                style={{
                  left: `${img.x}%`,
                  top: `${img.y}%`,
                  width: '200px',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <img
                  src={img.url}
                  alt={`Дисциплина ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => {
                    const filtered = content.images.filter((_, i) => i !== index);
                    setContent({ ...content, images: filtered });
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <FiX size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default CurriculumBlockEditor