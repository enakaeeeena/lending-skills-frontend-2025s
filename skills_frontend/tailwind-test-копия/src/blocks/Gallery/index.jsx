// src/pages/GalleryPage/index.jsx
import { fetchGallery } from '../../api/fakeApi';
import GalleryGrid from './components/GalleryGrid';

const GalleryPage = () => {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    fetchGallery().then(setGallery);
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Галерея работ</h1>
      <GalleryGrid items={gallery} />
    </div>
  );
};