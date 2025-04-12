// src/api/hooks.js
import { fetchTeachers, fetchGallery } from "./fakeApi";

export const useTeachers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeachers().then((data) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  return { data, loading };
};
