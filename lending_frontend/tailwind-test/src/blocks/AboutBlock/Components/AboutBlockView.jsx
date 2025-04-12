export const AboutBlockView = ({ content }) => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-90px font-bold mb-6 pb-2">
        {content.title || 'О программе'}
      </h2>
      
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 md:pr-8"> 
          <h3 className="text-30px font-bold mb-3">Направление:</h3>
          <p className="mb-4">{content.direction || 'Текст направления'}</p>
          
          <h3 className="text-30px font-bold mb-3">Учебное подразделение:</h3>
          <p className="mb-4">{content.department || 'Текст подразделения'}</p>
          
          <h3 className="text-30px font-bold mb-3">Цель:</h3>
          <p>{content.goal || 'Текст цели'}</p>
        </div>
        
        <div className="md:w-1/2 md:pl-8"> 
          {content.image && (
            <img 
              src={content.image} 
              alt="About program" 
              className="w-full h-auto border-4 border-black"
            />
          )}
        </div>
      </div>
    </div>
  );
};