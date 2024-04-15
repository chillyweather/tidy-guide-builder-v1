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
  console.log(
    "%c SelectedSections!!!!!!!!!!!!!",
    "color: lime",
    selectedSections
  );
  return (
    <div className="mainContent">
      <HeaderCard />
      <DraggableCardList
        items={selectedSections}
        setItems={setSelectedSections}
      />
      <button className={"blue-button"}>Add elements</button>
    </div>
  );
};

export default MainContent;
