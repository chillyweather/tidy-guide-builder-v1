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
  const setDocumentationTitle =
    useContext(BuilderContext)?.setDocumentationTitle;
  const setSelectedElementKey =
    useContext(BuilderContext)?.setSelectedElementKey;
  const setIsWip = useContext(BuilderContext)?.setIsWip;
  const setDocumentationData = useContext(BuilderContext)?.setDocumentationData;

  const foundData = data.find((item: any) => item._id === selectedMasterId);
  if (foundData) {
    setSelectedSections(foundData.docs);
    setDocumentationTitle(foundData.title);
    setSelectedElementKey(selectedMasterId);
    setIsWip(foundData.inProgress);
    // setDocumentationData((prevDocumentation: any) => {
    //   return {
    //     ...prevDocumentation,
    //     ["_id"]: key,
    //     ["docs"]: [],
    //     ["title"]: "",
    //     ["inProgress"]: isWip,
    //   };
    // });
  }

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

export default ContentFromServer;
