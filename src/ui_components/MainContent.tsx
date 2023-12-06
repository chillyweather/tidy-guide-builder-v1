import { h } from "preact";
import { DraggableCardList } from "./DraggableCardsList";

const MainContent = () => {
  return (
    <div className="mainContent">
      <DraggableCardList />
    </div>
  );
};

export default MainContent;
