const LabPage = () => {
    return (
      <div className="pt-20 container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-blue-800">Лаборатория визуализации</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Наши проекты</h2>
            <ul className="space-y-4">
              <li className="flex items-center">
                <div className="w-16 h-16 bg-gray-200 rounded-lg mr-4"/>
                <div>
                  <h3 className="font-semibold">3D-модель кампуса</h3>
                  <p className="text-gray-600">Интерактивная карта университета</p>
                </div>
              </li>
            </ul>
          </div>
  
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Технологический стек</h2>
            <div className="flex flex-wrap gap-3">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded">React</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded">Three.js</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded">Blender</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default LabPage;