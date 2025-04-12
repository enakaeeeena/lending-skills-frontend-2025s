export const HeroEditor = ({ 
  title, 
  setTitle, 
  subtitle, 
  setSubtitle, 
  image, 
  setImage,
  tickerText,
  setTickerText
}) => (
  <div className="flex flex-col gap-4">
    <div className="border-2 border-gray-300 p-4">
      <h3 className="text-36px font-bold mb-2">{title}</h3>
      <input
        type="text"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
        className="w-full p-2 border-2 border-gray-300"
        placeholder="Подзаголовок"
      />
    </div>
    
    <div className="border-2 border-gray-300 p-4">
      <label className="block mb-2">Основное изображение:</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="w-full p-2 border-2 border-gray-300 mb-2"
        placeholder="URL изображения"
      />
      {image && (
        <img src={image} alt="Preview" className="mt-2 max-h-40" />
      )}
    </div>
    
    <div className="border-2 border-gray-300 p-4">
      <label className="block mb-2">Текст бегущей строки:</label>
      <textarea
        value={tickerText}
        onChange={(e) => setTickerText(e.target.value)}
        className="w-full p-2 border-2 border-gray-300 min-h-[100px]"
        placeholder="Введите текст для бегущей строки (разделите хэштеги пробелами)"
      />
    </div>
  </div>
);