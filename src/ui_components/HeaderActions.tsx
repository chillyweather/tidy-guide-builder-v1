import { h } from "preact";
import { useState, useContext } from "preact/hooks";
import BuilderContext from "../BuilderContext";
import { IconUnlink, IconMoodPuzzled } from "@tabler/icons-react";
import { emit } from "@create-figma-plugin/utilities";
import sectionData from "src/resources/sectionData";
import { generateUniqueId } from "../ui_functions/generateUniqueId";

const cardsForPopup = sectionData.slice(1);

function AddSectionPopupCard(card: any) {
  const selectedSections = useContext(BuilderContext)?.selectedSections;
  const setSelectedSections = useContext(BuilderContext)?.setSelectedSections;
  return (
    <div
      class={"addSectionCard"}
      onClick={() => {
        if (selectedSections && selectedSections.length) {
          card.id = generateUniqueId();
          setSelectedSections((prevSections: any[]) => [...prevSections, card]);
        } else {
          setSelectedSections([card]);
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

  const elementGroupStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  };
  const selectedElementName = useContext(BuilderContext)?.selectedElementName;
  const setSelectedElement = useContext(BuilderContext)?.setSelectedElement;
  return (
    <div class={"headerContent headerActions"}>
      <div style={elementGroupStyle}>
        <p style={{ color: "#9747FF", padding: 0, margin: 0 }}>
          {selectedElementName}
        </p>
        <IconUnlink
          style={{ color: "#9747FF", height: "14px", cursor: "pointer" }}
          onClick={() => {
            setSelectedElement(null);
            emit("CLEAR_SELECTION");
          }}
        />
      </div>
      <div style={elementGroupStyle}>
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
