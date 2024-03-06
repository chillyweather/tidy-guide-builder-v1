/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { useEffect } from "preact/hooks";
import { DraggableCardList } from "./DraggableCardsList";
import HeaderCard from "./sectionCards/HeaderCard";

const MainContent = (selectedSections: any, setSelectedSections: any) => {
  useEffect(() => {
    console.log("selectedSections in MainCard", selectedSections);
  }, [selectedSections]);

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
