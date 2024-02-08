import { h } from "preact";
import emptyImage from "../../images/empty.svg";
import { useContext } from "preact/hooks";
import BuilderContext from "../../BuilderContext";
import { useEffect } from "react";

const AnatomyCard = ({}: {}) => {
  const { selectedElement, selectedElementKey, selectedElementNodeId } =
    useContext(BuilderContext) || {};
  useEffect(() => {
    console.log("selectedElement>>>", selectedElement);
    console.log("selectedElementKey>>>", selectedElementKey);
    console.log("selectedElementNodeId>>>", selectedElementNodeId);
  }, [selectedElement, selectedElementKey, selectedElementNodeId]);
  return (
    <div className="nothingCards">
      <p>This element will only be visible on canvas</p>
    </div>
  );
};

export default AnatomyCard;
