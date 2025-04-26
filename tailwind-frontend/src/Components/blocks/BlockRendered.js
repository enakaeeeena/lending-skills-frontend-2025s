import HeroBlock from "../blocks/HeroBlock/HeroBlock";
import AboutBlock from "../blocks/AboutBlock/AboutBlock";
import ProfessorsBlock from "../../blocks/Professors/ProfessorsBlock";

const BlockRenderer = ({ block }) => {
  switch (block.type) {
    case "hero":
      return <HeroBlock data={block.content} />;
    case "about":
      return <AboutBlock data={block.content} />;
    case "professors":
      return <ProfessorsBlock data={block.content} />;

    default:
      return <div>Неизвестный тип блока</div>;
  }
};

export default BlockRenderer;
