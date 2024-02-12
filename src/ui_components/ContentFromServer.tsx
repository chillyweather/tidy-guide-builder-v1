import { h } from "preact";
import { useState, useContext, useEffect } from "preact/hooks";
import BuilderContext from "../BuilderContext";
import { DraggableCardList } from "./DraggableCardsList";
//content cards
import HeaderCard from "./sectionCards/HeaderCard";
import { emit } from "@create-figma-plugin/utilities";
import { useAtom } from "jotai";
import { selectedNodeKeyAtom, selectedNodeIdAtom } from "src/state/atoms";

const ContentFromServer = ({
  data,
  selectedMasterId,
}: {
  data: any;
  selectedMasterId: string;
}) => {
  const [selectedNodeKey, setSelectedNodeKey] = useAtom(selectedNodeKeyAtom);
  const [selectedNodeId, setSelectedNodeId] = useAtom(selectedNodeIdAtom);
  const [thisCardIsDraft, setThisCardIsDraft] = useState(false);

  const {
    setIsDraft,
    selectedSections,
    setSelectedSections,
    setDocumentationTitle,
    setIsWip,
    setDocumentationData,
    setDocumentationId,
  } = useContext(BuilderContext) || {};

  const foundData = data.find((item: any) => item._id === selectedMasterId);

  console.log("foundData", foundData);

  useEffect(() => {
    setIsDraft(thisCardIsDraft);
  }, [thisCardIsDraft]);

  useEffect(() => {
    setThisCardIsDraft(foundData.draft);
  }, [foundData.draft]);

  useEffect(() => {
    if (selectedNodeId && selectedNodeKey) {
      emit("GET_NEW_SELECTION", selectedNodeKey, selectedNodeId);
    }
  }, [selectedMasterId, selectedNodeId]);

  useEffect(() => {
    if (foundData && foundData._id) {
      setSelectedSections(foundData.docs);
      setDocumentationTitle(foundData.title);
      setDocumentationId(foundData._id);
      setSelectedNodeKey(foundData.componentKey);
      setSelectedNodeId(foundData.nodeId);
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
