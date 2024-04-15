/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { DraggableCardList } from "./DraggableCardsList";
import HeaderCard from "./sectionCards/HeaderCard";
import Elements from "./../images/elements-min.png";
import { IconPlus } from "@tabler/icons-react";

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
      <div className="empty-flex">
        <img src={Elements} className={"empty-img"} />
        <p className={"empty-para"}>Start documenting and shaping your design system with ease.<br />
          We're excited to see what you create!</p>
        <button className={"blue-button"}>
          <IconPlus />
          Add elements
          </button>
      </div>
    </div>
  );
};

export default MainContent;
