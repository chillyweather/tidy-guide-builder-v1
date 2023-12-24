import { h } from "preact";
import { useState, useContext, useRef } from "preact/hooks";
import BuilderContext from "../BuilderContext";
import {
  IconX,
  IconLink,
  IconMoodPuzzled,
  IconPlayerPlayFilled,
  IconPlus,
} from "@tabler/icons-react";
import { emit } from "@create-figma-plugin/utilities";
import sectionData from "src/resources/sectionData";
import { generateUniqueId } from "./ui_functions/generateUniqueId";

const cardsForPopup = sectionData;

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
  const setSelectedElementName =
    useContext(BuilderContext)?.setSelectedElementName;
  const setSelectedElement = useContext(BuilderContext)?.setSelectedElement;
  const documentationTitle = useContext(BuilderContext)?.documentationTitle;
  const isScroll = useContext(BuilderContext)?.isScroll;
  const setIsMainContentOpen = useContext(BuilderContext)?.setIsMainContentOpen;
  return (
    <div
      class={"headerContent headerActions"}
      onKeyDown={(e) => {
        if (e.key === "Escape") setIsAddSectionPopupOpen(false);
      }}
    >
      <div id={"selectedName"} className={"selectedComponentGroup hidden"}>
        {isScroll && selectedElementName && (
          <div
            onClick={() => {
              document.body.scrollTo(0, 0);
            }}
          >
            {documentationTitle}
          </div>
        )}
        {console.log("selectedElementName", selectedElementName)}
        {!!selectedElementName && (
          <p className={"selectedComp"}>{selectedElementName}</p>
        )}
        {!selectedElementName && <p className={"noSelected"}>No selected compontent</p>}

        {selectedElementName ? (
          <IconX
            onClick={() => {
              setSelectedElement(null);
              setSelectedElementName("");
              emit("CLEAR_SELECTION");
              // setIsMainContentOpen(false);
            }}
          />
        ) : (
          <button
            className="connect-element-button"
            onClick={() => {
              emit("GET_SELECTION");
            }}
          >
            <IconLink
              style={{ color: "#9747FF", height: "14px", cursor: "pointer" }}
            />
            Get component
          </button>
        )}
      </div>
      <div className={"selectedComponentActions"}>
        <button
          onClick={() => {
            console.log("we are here");
            setIsAddSectionPopupOpen(!isAddSectionPopupOpen);
          }}
        >
          <IconPlus />
        </button>
        {/* <button className={"secondary"}>
          <IconPlayerPlayFilled />
        </button> */}
      </div>
      {isAddSectionPopupOpen &&
        AddSectionPopup(cardsForPopup, AddSectionPopupCard)}
    </div>
  );
}

export default HeaderActions;
