import { h } from "preact";
import { useState, useContext, useRef } from "preact/hooks";
import BuilderContext from "../BuilderContext";
import {
  IconX,
  IconLink,
  IconCalendarEvent,
  IconPilcrow,
  IconVideo,
  IconColumns,
  IconListDetails,
  IconPhoto,
  IconInfoCircle,
  IconPlayerPlayFilled,
  IconPlus,
} from "@tabler/icons-react";
import { emit } from "@create-figma-plugin/utilities";
// import sectionData from "src/resources/sectionData";
import { sectionData, PDSectionData } from "src/resources/dataForElements";
import { generateUniqueId } from "./ui_functions/generateUniqueId";

const cardsForPopup = sectionData;

function AddSectionPopupCard(card: any) {
  const selectedSections = useContext(BuilderContext)?.selectedSections;
  const setSelectedSections = useContext(BuilderContext)?.setSelectedSections;
  return (
    <div className={"addSection-outer"}>
      <div
        className={"addSectionCard"}
        onClick={() => {
          const newCard = {
            ...card,
            id: generateUniqueId(), //! remove this later
            docId: generateUniqueId(),
          };
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
        <div className={"addSectionIcon"} type={card.title}>
          <IconCalendarEvent className={"noIcon"} />
          <IconPilcrow className={"paragraph"} />
          <IconVideo className={"video"} />
          <IconColumns className={"twoColumns"} />
          <IconListDetails className={"list"} />
          <IconLink className={"link"} />
          <IconPhoto className={"image"} />
        </div>
        <div class={"addSectionCardInfo"}>
          <p class={"addSectionTitle"}>{card.title}</p>
          <p class={"addSectionDescription"}>{card.description}</p>
        </div>
        <div
          className={"tooltipIcon"}
          alt={"This element is already in use and can be selected only once."}
        >
          <IconInfoCircle />
        </div>
      </div>
    </div>
  );
}

async function closeMenu(event: Event) {
  console.log(event.target);
  //@ts-ignore
  event.target.parentElement.remove();
}

function AddSectionPopup(pdcards: any[], cards: any[], cardElement: any) {
  return (
    <div class={"addSectionPopup"}>
      <div className="addSectionPupup-inner">
        <div className="cards predefined">
          <h2>Predefined Elements</h2>
          {pdcards.map((card) => {
            return cardElement(card);
          })}
        </div>
        <div className="cards custom">
          <h2>Custom Elements</h2>
          {cards.map((card) => {
            return cardElement(card);
          })}
        </div>
      </div>
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
  const setSelectedElementKey =
    useContext(BuilderContext)?.setSelectedElementKey;
  const setIsMainContentOpen = useContext(BuilderContext)?.setIsMainContentOpen;
  const isFromSavedData = useContext(BuilderContext)?.isFromSavedData;
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
        {!!selectedElementName && (
          <p className={"selectedComp"}>{selectedElementName}</p>
        )}
        {!selectedElementName && (
          <p className={"noSelected"}>No selected compontent</p>
        )}

        {selectedElementName ? (
          <IconX
            onClick={() => {
              setSelectedElement(null);
              setSelectedElementName("");
              setSelectedElementKey("");
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
            setIsAddSectionPopupOpen(!isAddSectionPopupOpen);
          }}
        >
          <IconPlus />
        </button>
      </div>
      <div className={"menuDiv"}>
        <div
          className="modal-bg"
          onClick={() => {
            setIsAddSectionPopupOpen(!isAddSectionPopupOpen);
          }}
        ></div>
        {isAddSectionPopupOpen &&
          AddSectionPopup(PDSectionData, cardsForPopup, AddSectionPopupCard)}
      </div>
    </div>
  );
}

export default HeaderActions;
