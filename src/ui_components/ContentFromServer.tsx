import { h } from "preact";
import { useState, useContext, useEffect } from "preact/hooks";
import BuilderContext from "../BuilderContext";
import { DraggableCardList } from "./DraggableCardsList";
//content cards
import HeaderCard from "./sectionCards/HeaderCard";

const ContentFromServer = ({
  data,
  selectedMasterId,
}: {
  data: any;
  selectedMasterId: string;
}) => {
  const selectedSections = useContext(BuilderContext)?.selectedSections;
  const setSelectedSections = useContext(BuilderContext)?.setSelectedSections;
  const foundData = data.find((item: any) => item._id === selectedMasterId);
  if (foundData) setSelectedSections(foundData.docs);

  return (
    <div className="mainContent">
      <HeaderCard data={foundData.title} />
      <DraggableCardList
        items={selectedSections}
        setItems={setSelectedSections}
      />
    </div>
  );
};

export default ContentFromServer;
