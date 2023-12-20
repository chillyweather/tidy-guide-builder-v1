import { h } from "preact";
import { useState } from "preact/hooks";
import { DraggableCardList } from "./DraggableCardsList";
//content cards
import HeaderCard from "./sectionCards/HeaderCard";

const ContentFromServer = ({ data }: { data: any }) => {
  return (
    <div className="mainContent">
      {/* <HeaderCard data={{ title: "Documentation Title" }} />
      <DraggableCardList /> */}
    </div>
  );
};

export default ContentFromServer;
