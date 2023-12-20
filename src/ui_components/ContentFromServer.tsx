import { h } from "preact";
import { useState, useContext } from "preact/hooks";
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
  const foundData = data.find((item: any) => item._id === selectedMasterId);
  if (!foundData) {
    return <div>stuck...</div>;
  }
  console.log("data in CFS", data);
  console.log("foundData in CFS", foundData);
  return (
    <div className="mainContent">
      <p>{JSON.stringify(foundData, null, 2)}</p>
      {/* <HeaderCard data={{ title: "Documentation Title" }} />
      <DraggableCardList /> */}
    </div>
  );
};

export default ContentFromServer;
