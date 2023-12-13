import { h } from "preact";
import { useState, useContext } from "preact/hooks";
import BuilderContext from "../BuilderContext";
import { IconX, IconMoodPuzzled } from "@tabler/icons-react";
import { emit } from "@create-figma-plugin/utilities";
import sectionData from "src/resources/sectionData";
import { generateUniqueId } from "./ui_functions/generateUniqueId";

const cardsForPopup = sectionData.slice(1);

function AddSectionPopupCard(card: any) {
  const selectedSections = useContext(BuilderContext)?.selectedSections;
  const setSelectedSections = useContext(BuilderContext)?.setSelectedSections;
  return (
    <div
      className={"addSectionCard"}
      onClick={() => {
        const newCard = { ...card, id: generateUniqueId() };
        if (selectedSections && selectedSections.length) {
          setSelectedSections((prevSections: any[]) => [
            ...prevSections,
            newCard,
          ]);
        } else {
          setSelectedSections([newCard]);
        }
      }}
    >
      <IconMoodPuzzled class={"addSectionIcon"} />
      <div class={"addSectionCardInfo"}>
        <p class={"addSectionTitle"}>{card.title}</p>
        {/* <p class={"addSectionDescription"}>{card.description}</p> */}
      </div>
    </div>
  );
}

function AddSectionPopup(cards: any[], cardElement: any) {
  return (
    <div class={"addSectionPopup"}>
      {cards.map((card) => {
        return cardElement(card);
      })}
    </div>
  );
}

function HeaderActions() {
  const [isAddSectionPopupOpen, setIsAddSectionPopupOpen] = useState(false);

  const selectedElementName = useContext(BuilderContext)?.selectedElementName;
  const setSelectedElement = useContext(BuilderContext)?.setSelectedElement;
  return (
    <div class={"headerContent headerActions"}>
      <div className={"selectedComponentGroup"}>
        <p style={{ color: "#9747FF", padding: 0, margin: 0 }}>
          {selectedElementName}
        </p>
        <IconX
          style={{ color: "#9747FF", height: "14px", cursor: "pointer" }}
          onClick={() => {
            setSelectedElement(null);
            emit("CLEAR_SELECTION");
          }}
        />
      </div>
      <div className={"selectedComponentGroup"}>
        <button
          onClick={() => {
            console.log("we are here");
            setIsAddSectionPopupOpen(!isAddSectionPopupOpen);
          }}
        >
          Add component
        </button>
        <button>Preview</button>
      </div>
      {isAddSectionPopupOpen &&
        AddSectionPopup(cardsForPopup, AddSectionPopupCard)}
    </div>
  );
}

export default HeaderActions;
