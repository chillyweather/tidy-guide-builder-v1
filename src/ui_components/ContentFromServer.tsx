import { h } from "preact";
import { useState, useContext, useEffect } from "preact/hooks";
import BuilderContext from "../BuilderContext";
import { DraggableCardList } from "./DraggableCardsList";
//content cards
import HeaderCard from "./sectionCards/HeaderCard";
import { emit } from "@create-figma-plugin/utilities";

const ContentFromServer = ({
  data,
  selectedMasterId,
}: {
  data: any;
  selectedMasterId: string;
}) => {
  const [thisCardIsDraft, setThisCardIsDraft] = useState(false);
  const currentElementId = data.find(
    (item: any) => item._id === selectedMasterId
  ).nodeId;

  const {
    isDraft,
    setIsDraft,
    selectedSections,
    setSelectedSections,
    setDocumentationTitle,
    setSelectedElementKey,
    selectedElementKey,
    setIsWip,
    setDocumentationData,
  } = useContext(BuilderContext) || {};

  const foundData = data.find((item: any) => item._id === selectedMasterId);

  useEffect(() => {
    setIsDraft(thisCardIsDraft);
  }, [thisCardIsDraft]);

  useEffect(() => {
    setThisCardIsDraft(foundData.draft);
  }, [foundData.draft]);

  useEffect(() => {
    if (currentElementId) {
      emit("GET_NEW_SELECTION", selectedElementKey, currentElementId);
    }
  }, [selectedMasterId, currentElementId]);

  useEffect(() => {
    if (foundData && foundData._id) {
      setSelectedSections(foundData.docs);
      setDocumentationTitle(foundData.title);
      setSelectedElementKey(foundData.componentKey);
      setIsWip(foundData.inProgress);
      setDocumentationData((prevDocumentation: any) => {
        return {
          ...prevDocumentation,
          _id: foundData._id,
        };
      });
    }
  }, [foundData._id]);

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
