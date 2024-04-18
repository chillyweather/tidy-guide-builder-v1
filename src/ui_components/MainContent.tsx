/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { DraggableCardList } from "./DraggableCardsList";
import HeaderCard from "./sectionCards/HeaderCard";

const MainContent = ({
  selectedSections,
  setSelectedSections,
}: {
  selectedSections: any;
  setSelectedSections: any;
}) => {
  return (
    <div className="mainContent">
      <HeaderCard />
      <DraggableCardList
        items={selectedSections}
        setItems={setSelectedSections}
      />
    </div>
  );
};

export default MainContent;
