export default function LandingPage() {
    return (
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          {/* Герой-секция */}
          <section className="flex flex-col md:flex-row gap-8 mb-16 border-4 border-black p-8">
            <div className="md:w-1/2">
              <h1 className="text-4xl font-bold mb-6">Информационные технологии в дизайне</h1>
              <p className="text-xl mb-8">Современное образование на стыке технологий и творчества</p>
              <button className="border-2 border-black px-6 py-2 text-xl hover:bg-black hover:text-white transition">
                Подать заявку
              </button>
            </div>
            <div className="md:w-1/2 bg-gray-200 border-2 border-black min-h-64">
              {/* Плейсхолдер для изображения */}
            </div>
          </section>
  
          {/* Блок направлений */}
          <section className="border-4 border-black p-8">
            <h2 className="text-3xl font-bold mb-8">Направления подготовки</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-black p-6">
                <h3 className="text-xl font-bold mb-2">Компьютерная графика</h3>
                <p>3D-моделирование и визуализация</p>
              </div>
              <div className="border-2 border-black p-6">
                <h3 className="text-xl font-bold mb-2">Веб-дизайн</h3>
                <p>Создание современных интерфейсов</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }