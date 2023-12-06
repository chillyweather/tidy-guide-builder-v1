import { h } from "preact";
import { useState } from "preact/hooks";
import { DraggableCardList } from "./DraggableCardsList";

const MainContent = () => {
  const [currentElement, setCurrentElement] = useState<any>(null);
  const [documentationTitle, setDocumentationTitle] = useState("");
  return (
    <div className="mainContent">
      <DraggableCardList />
    </div>
  );
};

export default MainContent;
