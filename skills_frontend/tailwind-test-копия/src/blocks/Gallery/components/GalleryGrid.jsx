// src/pages/GalleryPage/components/GalleryGrid.jsx
const GalleryGrid = ({ items }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(item => (
        <div key={item.id} className="border rounded-lg overflow-hidden">
          <img 
            src={item.image} 
            alt={item.description}
            className="w-full h-48 object-cover"
          />
          <p className="p-3 text-sm">{item.description}</p>
        </div>
      ))}
    </div>
  );