import { useEffect, useState } from 'react';
import EditableBlock from '../../components/blocks/EditableBlock';
const LandingPage = () => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const savedBlocks = localStorage.getItem('pageBlocks');
    if (savedBlocks) {
      setBlocks(JSON.parse(savedBlocks));
    }
  }, []);

  return (
    <div className="bg-background">
      <div className="container py-8">
        {blocks.map(block => (
          <section key={block.id} className="mb-12">
            <EditableBlock block={block} />
          </section>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;