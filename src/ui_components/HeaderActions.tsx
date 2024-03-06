/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { useState, useContext } from "preact/hooks";
import BuilderContext from "../BuilderContext";
import {
  IconX,
  IconLink,
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
import DefinedTokens from "./../images/icon_tokens.png";
import DefinedTokensGif from "./../images/icon_tokens.png";

import { useAtom } from "jotai";
import {
  selectedNodeIdAtom,
  selectedNodeKeyAtom,
  selectedComponentPicAtom,
} from "src/state/atoms";
import { deleteFileFromServer } from "./ui_functions/fileManagementFunctions";
import { useEffect } from "react";

const cardsForPopup = sectionData;

function AddSectionPopupCard(card: any) {
  const [selectedNodeId] = useAtom(selectedNodeIdAtom);
  const [selectedNodeKey] = useAtom(selectedNodeKeyAtom);

  const [isHovering, setIsHovering] = useState(false);
  const { setSelectedSections, selectedSections } =
    useContext(BuilderContext) || {};

  return (
    <div className={"addSection-outer"}>
      <div
        className={"addSectionCard"}
        id={card.title}
        type={card.datatype}
        disabled={card.dataType === "tokens"}
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
        <div className={"addSectionIcon"} type={card.datatype}>
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
          <img
            src={isHovering ? DefinedTokensGif : DefinedTokens}
            className={"tokens"}
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

  async function addSection() {
    const type = card.datatype;
    const pdTypes = ["anatomy", "spacing", "property", "variants"];
    if (pdTypes.includes(card.datatype)) {
      emit("PIC_FROM_FIGMA", {
        type,
        nodeId: selectedNodeId,
        key: selectedNodeKey,
      });
    }
    const newCard = {
      ...card,
      id: generateUniqueId(),
      docId: generateUniqueId(),
      published: true,
    };
    if (selectedSections && selectedSections.length) {
      setSelectedSections((prevSections: any[]) => [...prevSections, newCard]);
    } else {
      setSelectedSections([newCard]);
    }
  }
}

function AddSectionPopup(pdcards: any[], cards: any[], cardElement: any) {
  const { isPdSectionOpen, setIsPdSectionOpen } =
    useContext(BuilderContext) || {};

  return (
    <div class={"addSectionPopup"}>
      <div className="addSectionPupup-inner">
        {/* {selectedElementName && ( */}
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
        {/* )} */}
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
  const [selectedNodeId, setSelectedNodeId] = useAtom(selectedNodeIdAtom);
  const [selectedNodeKey, setSelectedNodeKey] = useAtom(selectedNodeKeyAtom);
  const [selectedComponentPic, setSelectedComponentPic] = useAtom(
    selectedComponentPicAtom
  );
  const [isAddSectionPopupOpen, setIsAddSectionPopupOpen] = useState(false);

  const {
    selectedElementName,
    setSelectedElementName,
    setSelectedElement,
    documentationTitle,
    isScroll,
    setShowPreviewPopup,
    setIsPreviewing,
    selectedSections,
  } = useContext(BuilderContext) || {};

  const isEmpty = selectedSections && selectedSections.length === 0;

  useEffect(() => {
    if (selectedNodeId && selectedNodeKey && !selectedComponentPic) {
      emit("GET_COMPONENT_PIC", selectedNodeKey, selectedNodeId);
    }
  }, [selectedNodeId, selectedNodeKey, selectedComponentPic]);

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
            onClick={async () => {
              setSelectedElement(null);
              setSelectedElementName("");
              setSelectedNodeKey("");
              setSelectedNodeId("");
              setSelectedComponentPic("");
              await deleteFileFromServer(selectedComponentPic);
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
        <button
          disabled={isEmpty}
          onClick={() => {
            setIsPreviewing(true);
            setShowPreviewPopup(true);
            setTimeout(function () {
              document.getElementById("close-popup")?.focus();
            }, 300);
          }}
          className={"secondary"}
        >
          <IconPlayerPlayFilled />
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
