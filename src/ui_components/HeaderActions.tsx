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
  IconChevronDown,
  IconPlus,
} from "@tabler/icons-react";
import { emit } from "@create-figma-plugin/utilities";
import { sectionData, PDSectionData } from "src/resources/dataForElements";
import { generateUniqueId } from "./ui_functions/generateUniqueId";
import DefinedAnatomy from "./../images/icon_anatomy.png";
import DefinedAnatomyGif from "./../images/icon_anatomy.gif";
import DefinedSpacing from "./../images/icon_spacing.png";
import DefinedSpacingGif from "./../images/icon_spacing.gif";
import DefinedProperty from "./../images/icon_property.png";
import DefinedPropertyGif from "./../images/icon_property.gif";
import DefinedVariants from "./../images/icon_variant.png";
import DefinedVariantsGif from "./../images/icon_variant.gif";
import DefinedReleaseNotes from "./../images/icon_release_notes.png";
import DefinedReleaseNotesGif from "./../images/icon_release_notes.gif";

const cardsForPopup = sectionData;

function AddSectionPopupCard(card: any) {
  const [isHovering, setIsHovering] = useState(false);
  const selectedSections = useContext(BuilderContext)?.selectedSections;
  const setSelectedSections = useContext(BuilderContext)?.setSelectedSections;
  return (
    <div className={"addSection-outer"}>
      <div
        className={"addSectionCard"}
        id={card.title}
        onClick={() => {
          addSection();
        }}
        onMouseOut={() => {
          setIsHovering(false);
        }}
        onMouseOver={() => {
          setIsHovering(true);
        }}
      >
        <div className={"addSectionIcon"} type={card.title}>
          <img
            src={isHovering ? DefinedAnatomyGif : DefinedAnatomy}
            className={"anatomy"}
          />
          <img
            src={isHovering ? DefinedSpacingGif : DefinedSpacing}
            className={"spacing"}
          />
          <img
            src={isHovering ? DefinedPropertyGif : DefinedProperty}
            className={"property"}
          />
          <img
            src={isHovering ? DefinedVariantsGif : DefinedVariants}
            className={"variants"}
          />
          <img
            src={isHovering ? DefinedReleaseNotesGif : DefinedReleaseNotes}
            className={"releasenotes"}
          />
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

  function addSection() {
    const newCard = {
      ...card,
      id: generateUniqueId(), //! remove this later
      docId: generateUniqueId(),
    };
    if (selectedSections && selectedSections.length) {
      setSelectedSections((prevSections: any[]) => [...prevSections, newCard]);
    } else {
      setSelectedSections([newCard]);
    }
  }
}

function AddSectionPopup(pdcards: any[], cards: any[], cardElement: any) {
  const isPdSectionOpen = useContext(BuilderContext)?.isPdSectionOpen;
  const setIsPdSectionOpen = useContext(BuilderContext)?.setIsPdSectionOpen;
  console.log("isPdSectionOpen", isPdSectionOpen);
  return (
    <div class={"addSectionPopup"}>
      <div className="addSectionPupup-inner">
        <div className="cards predefined">
          <div
            class=""
            for={"elementsMenu"}
            className={"flex-label"}
            onClick={() => setIsPdSectionOpen(!isPdSectionOpen)}
            //@ts-ignore
            pd={!isPdSectionOpen}
          >
            <h2>Predefined Elements</h2>
            <IconChevronDown />
          </div>
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
