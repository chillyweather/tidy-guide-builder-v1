import { h } from "preact";
import { useState } from "preact/hooks";
import { DraggableCardList } from "./DraggableCardsList";
import HeaderCard from "./sectionCards/HeaderCard";

const MainContent = () => {
  const [currentElement, setCurrentElement] = useState<any>(null);
  const [documentationTitle, setDocumentationTitle] = useState("");
  return (
    <div className="mainContent">
      <HeaderCard data={{ title: "Documentation Title" }} />
      <DraggableCardList />
    </div>
  );
};

export default MainContent;
