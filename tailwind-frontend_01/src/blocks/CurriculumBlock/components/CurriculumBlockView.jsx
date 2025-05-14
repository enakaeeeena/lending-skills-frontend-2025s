import React from 'react';

const CurriculumBlockView = ({ content = {} }) => {
  return (
    <section className="relative min-h-screen w-full isolate overflow-hidden">
  
      <img 
        src="/photos/plan_back.png"
        alt="Фон"
        className="absolute top-0 left-0 w-screen h-f object-contain -z-10 pointer-events-none"
      />

      <div className="container mx-auto h-full relative">
        <h2 className="text-8xl font-bold mb-6">Учебный план</h2>
        <div className="flex h-full min-h-screen bg-transparent">
    
          <div className="w-1/2 pr-4 py-16 pl-8 backdrop-blur-sm">
            <div className="space-y-8">
              <div className="p-6">
                <h3 className="text-3xl font-bold mb-4">Теоретические дисциплины</h3>
                <div className="space-y-2 text-3xl font-normal">
                  <p>· История дизайна</p>
                  <p>· Теория композиции</p>
                  <p>· Цветоведение и типографика</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-3xl font-bold mb-4">Практические модули</h3>
                <div className="space-y-2 text-3xl font-normal">
                  <p>· Веб-дизайн</p>
                  <p>· 3D-моделирование</p>
                  <p>· Проектная работа</p>
                </div>
              </div>
            </div>
          </div>

    
          <div className="w-1/2 p-8">
            <div className="relative h-full">
              {content.images?.map((img, index) => (
                <div
                  key={index}
                  className="absolute p-2 shadow-lg"
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
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurriculumBlockView;
