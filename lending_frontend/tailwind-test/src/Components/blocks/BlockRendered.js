// components/BlockRenderer.jsx
import HeroBlock from "../blocks/HeroBlock/HeroBlock";
import AboutBlock from "../blocks/AboutBlock/AboutBlock";
import TeachersBlock from "../blocks/TeachersBlock/TeachersBlock";
// Импортируйте остальные блоки

const BlockRenderer = ({ block }) => {
  switch (block.type) {
    case "hero":
      return <HeroBlock data={block.content} />;
    case "about":
      return <AboutBlock data={block.content} />;
    case "teachers":
      return <TeachersBlock data={block.content} />;
    // Добавьте case для других типов
    default:
      return <div>Неизвестный тип блока</div>;
  }
};

export default BlockRenderer;
