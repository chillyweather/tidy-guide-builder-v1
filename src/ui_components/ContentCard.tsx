import { h } from "preact";
import { useContext, useState } from "preact/hooks";
import BuilderContext from "../BuilderContext";
import {
  IconGripVertical,
  IconChevronDown,
  IconMoodPuzzled,
  IconCopy,
  IconTrash,
  IconEye,
} from "@tabler/icons-react";
import { Toggle, Text } from "@create-figma-plugin/ui";

import {
  deleteSection,
  duplicateSection,
  openSection,
} from "./ui_functions/cardActions";

//content cards
import HeaderCard from "./sectionCards/HeaderCard";
import ImageCard from "./sectionCards/ImageCard";
import LinkCard from "./sectionCards/LinkCard";
import ListCard from "./sectionCards/ListCard";
import PropertyCard from "./sectionCards/PropertyCard";
import ReleaseNotesCard from "./sectionCards/ReleaseNotesCard";
import TextCard from "./sectionCards/TextCard";
import TwoColumnCard from "./sectionCards/TwoColumnCard";
import VariantsCard from "./sectionCards/VariantsCard";
import VideoCard from "./sectionCards/VideoCard";
import { useEffect } from "react";

function makeDraggable(event: any) {
  event.target.parentElement.parentElement.parentElement.parentElement.setAttribute(
    "draggable",
    true
  );
}
function removeDraggable(event: any) {
  event.target.parentElement.parentElement.parentElement.parentElement.setAttribute(
    "draggable",
    false
  );
}

export const ContentCard = (cardData: any, index: number) => {
  //card title
  const [cardTitle, setCardTitle] = useState(cardData.title);
  // general use
  const [isDraft, setIsDraft] = useState(false);
  const [publish, setPublish] = useState<boolean>(true);
  // text card
  const [paragraphTextContent, setParagraphTextContent] = useState("");
  // two column card
  const [leftTitle, setLeftTitle] = useState("");
  const [leftTextContent, setLeftTextContent] = useState("");
  const [rightTitle, setRightTitle] = useState("");
  const [rightTextContent, setRightTextContent] = useState("");
  // list
  const [listItems, setListItems] = useState<string[]>([""]);
  // link
  const [sources, setSources]: any[] = useState([{ source: "", link: "" }]);
  //video card data
  const [selectedVideo, setSelectedVideo] = useState(-1);
  const [selectedVideoContent, setSelectedVideoContent] = useState({});
  const [videoLink, setVideoLink] = useState("");
  const [foundVideoData, setFoundVideoData]: any = useState({});
  const [videoDataElements, setVideoDataElements]: any[] = useState([]);
  //image card data
  const [remoteImageLink, setRemoteImageLink] = useState("");
  //release notes card data
  const [releaseNotesMessage, setReleaseNotesMessage] = useState("");
  const [releaseNotesDate, setReleaseNotesDate] = useState("");
  const currentAuthor = useContext(BuilderContext)?.currentUser.name;
  const currentPage = useContext(BuilderContext)?.currentPage;
  const currentDocument = useContext(BuilderContext)?.currentDocument;

  //tooltip
  const [showTooltip, setShowTooltip] = useState(false);

  //! from context
  const selectedCard = useContext(BuilderContext)?.selectedCard;
  const setSelectedCard = useContext(BuilderContext)?.setSelectedCard;
  const setSelectedSections = useContext(BuilderContext)?.setSelectedSections;
  const isBuilding = useContext(BuilderContext)?.isBuilding;
  const setIsBuilding = useContext(BuilderContext)?.setIsBuilding;
  //! documentation data
  const documentationData = useContext(BuilderContext)?.documentationData;
  const setDocumentationData = useContext(BuilderContext)?.setDocumentationData;
  const isFromSavedData = useContext(BuilderContext)?.isFromSavedData;

  if (isFromSavedData) {
    console.log("from saved data", cardData);
  } else {
    console.log("not from saved data", cardData);
  }

  const id = cardData.id;
  const isSelected = selectedCard === id;
  const cardType = cardData.content;

  //!-------------------//
  interface CardDataProps {
    title: string;
    index: number;
    docId: string;
    datatype: string;
    publish: boolean;
    text: string;
    content: any;
  }

  const currentCardData: CardDataProps = {
    docId: id,
    index: index,
    title: cardTitle,
    datatype: cardType,
    publish: publish,
    text: paragraphTextContent,
    content: {
      //two column content
      subtitle1: leftTitle,
      subtitle2: rightTitle,
      text1: leftTextContent,
      text2: rightTextContent,
      //link content
      sources: sources,
      //list content
      inputs: listItems,
      //image content
      remoteImageLink: remoteImageLink,
      //video content
      videoDataElements: videoDataElements,
      //release notes content
      releaseNotesMessage: releaseNotesMessage,
      releaseNotesDate: releaseNotesDate,
      currentAuthor: currentAuthor,
      currentDocument: currentDocument,
      currentPage: currentPage,
    },
  };
  //!-------------------//

  const currentCardContent = (cardType: string) => {
    if (cardType === "header") {
      return <HeaderCard data={cardData} />;
    } else if (cardType === "property") {
      return <PropertyCard />;
    } else if (cardType === "variants") {
      return <VariantsCard />;
    } else if (cardType === "release-notes") {
      return (
        <ReleaseNotesCard
          setReleaseNotesComment={setReleaseNotesMessage}
          releaseNotesComment={releaseNotesMessage}
          setReleaseNotesDate={setReleaseNotesDate}
        />
      );
    } else if (cardType === "text") {
      return (
        <TextCard
          textContent={paragraphTextContent}
          setTextContent={setParagraphTextContent}
        />
      );
    } else if (cardType === "two-columns") {
      return (
        <TwoColumnCard
          data={cardData}
          leftTitle={leftTitle}
          setLeftTitle={setLeftTitle}
          leftTextContent={leftTextContent}
          setLeftTextContent={setLeftTextContent}
          rightTitle={rightTitle}
          setRightTitle={setRightTitle}
          rightTextContent={rightTextContent}
          setRightTextContent={setRightTextContent}
        />
      );
    } else if (cardType === "list") {
      return <ListCard listItems={listItems} setListItems={setListItems} />;
    } else if (cardType === "link") {
      return <LinkCard sources={sources} setSources={setSources} />;
    } else if (cardType === "image") {
      return (
        <ImageCard
          remoteImageLink={remoteImageLink}
          setRemoteImageLink={setRemoteImageLink}
        />
      );
    } else if (cardType === "video") {
      {
        return VideoCard(
          foundVideoData,
          selectedVideo,
          setFoundVideoData,
          setSelectedVideo,
          setSelectedVideoContent,
          setVideoDataElements,
          setVideoLink,
          videoDataElements,
          videoLink
        );
      }
    } else {
      return null;
    }
  };

  function PublishToggle(
    publish: boolean,
    setPublish: Function,
    label: string
  ) {
    function handleChange(event: any) {
      const newValue = event.currentTarget.checked;
      console.log(newValue);
      setPublish(newValue);
    }
    return (
      <Toggle
        onChange={handleChange}
        value={publish}
        style={{ border: "none", cursor: "pointer" }}
        disabled={isDraft}
      >
        <Text>{label}</Text>
      </Toggle>
    );
  }

  const handleOpenSection = (e: MouseEvent) => {
    openSection(e, id, selectedCard!, setSelectedCard);
  };

  const handleDeleteSection = (e: MouseEvent) => {
    deleteSection(e, index, setSelectedSections);
  };

  const handleDuplicateSection = (e: MouseEvent) => {
    duplicateSection(e, index, cardData, setSelectedSections);
  };

  useEffect(() => {
    if (isBuilding) {
      setDocumentationData((prevDocumentation: any) => {
        const newDocumentation = { ...prevDocumentation };
        const newDocs = newDocumentation.docs;
        newDocs[index] = currentCardData;
        setIsBuilding(false);
        return newDocumentation;
      });
    }
  }, [isBuilding]);

  return cardType === "header" ? (
    <div className={isDraft ? "sectionCard draft" : "sectionCard"}>
      <HeaderCard data={cardData} />
    </div>
  ) : (
    <div className={isDraft ? "sectionCard draft" : "sectionCard"}>
      <div className="cardHeader">
        <div className="leftContent">
          <IconGripVertical
            className={"dragIcon"}
            onMouseOver={(event) => {
              makeDraggable(event);
            }}
            onMouseOut={(event) => {
              removeDraggable(event);
            }}
          />
          <IconMoodPuzzled style={{ color: "burntorange" }} />
          <input
            className={"sectionTitle"}
            type={"text"}
            value={cardTitle}
            placeholder={"Untitled"}
            onInput={(e) => setCardTitle(e.currentTarget.value)}
          />
        </div>
        <div className="rightContent">
          {!isSelected && (
            <button
              className={"cardAuxButton hoverButton"}
              onClick={handleDuplicateSection}
            >
              <IconCopy />
            </button>
          )}
          {!isSelected && DeleteButtonWithTooltip()}
          <button
            className={"cardAuxButton chevIcon"}
            onClick={handleOpenSection}
          >
            <IconChevronDown />
          </button>
        </div>
      </div>
      {isSelected && (
        <div className="cardBody">
          {/*//!all card content here */}
          {currentCardContent(cardType)}
          {/*//!all card content here */}
          <div className="cardFooter">
            <div className="leftContent">
              {PublishToggle(publish, setPublish, "Publish to Tidy Viewer")}
            </div>
            <div className="rightContent">
              <button
                className={"cardAuxButton"}
                onClick={() => setIsDraft(!isDraft)}
              >
                <IconEye />
              </button>
              <button
                className={"cardAuxButton"}
                onClick={handleDuplicateSection}
              >
                <IconCopy />
              </button>
              {DeleteButtonWithTooltip()}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  function DeleteButtonWithTooltip() {
    return (
      <div className="tooltip hoverButton">
        <button
          className="cardAuxButton"
          onDblClick={handleDeleteSection}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <IconTrash />
        </button>
        <span className={`tooltiptext ${showTooltip ? "show" : ""}`}>
          Double click to delete section
        </span>
      </div>
    );
  }
};
