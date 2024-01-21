import { h } from "preact";
import { useContext, useState } from "preact/hooks";
import BuilderContext from "../BuilderContext";
import {
  IconGripVertical,
  IconChevronDown,
  IconCalendarEvent,
  IconPilcrow,
  IconVideo,
  IconColumns,
  IconListDetails,
  IconLink,
  IconPhoto,
  IconCopy,
  IconTrash,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";
import { Toggle, Text } from "@create-figma-plugin/ui";
import AnatomyIcon from "./../images/anatomy.svg";
import SpacingIcon from "./../images/spacing.svg";
import PropertyIcon from "./../images/property.svg";
import VariantsIcon from "./../images/variants.svg";
import ReleaseNotesIcon from "./../images/release-notes.svg";

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
import AnatomyCard from "./sectionCards/AnatomyCard";
import VideoCard from "./sectionCards/VideoCard";
import SpacingsCard from "./sectionCards/SpacingsCard";
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
  const isFromSavedData = useContext(BuilderContext)?.isFromSavedData;

  //card title
  const [cardTitle, setCardTitle] = useState(cardData.title);
  // general use
  const [isHidden, setIsHidden] = useState(
    isFromSavedData ? cardData.hidden : false
  );
  const [publish, setPublish] = useState<boolean>(
    isFromSavedData ? cardData.publish : true
  );
  // text card
  const [paragraphTextContent, setParagraphTextContent] = useState(
    isFromSavedData && cardData.text ? cardData.text : ""
  );
  // two column card
  const [leftTitle, setLeftTitle] = useState(
    isFromSavedData ? cardData.content.subtitle1 : ""
  );
  const [leftTextContent, setLeftTextContent] = useState(
    isFromSavedData ? cardData.content.text1 : ""
  );
  const [rightTitle, setRightTitle] = useState(
    isFromSavedData ? cardData.content.subtitle2 : ""
  );
  const [rightTextContent, setRightTextContent] = useState(
    isFromSavedData ? cardData.content.text2 : ""
  );
  // list
  const [listItems, setListItems] = useState<string[]>(
    isFromSavedData ? cardData.content.inputs : [""]
  );
  // link
  const [sources, setSources]: any[] = useState(
    isFromSavedData ? cardData.content.sources : [{ source: "", link: "" }]
  );
  //video card data
  const [selectedVideo, setSelectedVideo] = useState(-1);
  const [selectedVideoContent, setSelectedVideoContent] = useState({});
  const [videoLink, setVideoLink] = useState("");
  const [foundVideoData, setFoundVideoData]: any = useState({});
  const [videoDataElements, setVideoDataElements]: any[] = useState(
    isFromSavedData ? cardData.content.videoDataElements : []
  );
  //image card data
  const [remoteImageLink, setRemoteImageLink] = useState(
    isFromSavedData ? cardData.content.remoteImageLink : ""
  );
  //release notes card data
  const [releaseNotesMessage, setReleaseNotesMessage] = useState("");
  const [releaseNotesDate, setReleaseNotesDate] = useState("");
  const currentAuthor = useContext(BuilderContext)?.currentUser.name;
  const currentPage = useContext(BuilderContext)?.currentPage;
  const currentDocument = useContext(BuilderContext)?.currentDocument;

  //tooltip
  const [showTooltip, setShowTooltip] = useState(false);

  const {
    selectedCard,
    setSelectedCard,
    setSelectedSections,
    isBuilding,
    setIsBuilding,
    setDocumentationData,
    documentationData,
    documentationTitle,
    anatomySectionImage,
    spacingSectionImage,
    propertySectionImage,
    variantsSectionImage,
    setPreviewData,
    isPreviewing,
    setIsPreviewing,
    previewData,
  } = useContext(BuilderContext) || {};

  //!-------------------------------------------------------------------------------//
  //!-------from here content changes depending on isFromSavedData state------------//
  //!-------------------------------------------------------------------------------//

  const id = cardData.docId;
  const isSelected = selectedCard === id;
  const cardType = cardData.datatype;

  //data for export
  interface CardDataProps {
    content: any;
    datatype: string;
    docId: string;
    index: number;
    hidden: boolean;
    publish: boolean;
    text: string;
    title: string;
  }

  const currentCardData: CardDataProps = {
    docId: id,
    index: index,
    title: cardTitle,
    datatype: cardType,
    publish: publish,
    text: paragraphTextContent,
    hidden: isHidden || false,
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
      anatomySectionImage: anatomySectionImage,
      spacingSectionImage: spacingSectionImage,
      propertySectionImage: propertySectionImage,
      variantsSectionImage: variantsSectionImage,
    },
  };

  const currentCardContent = (cardType: string) => {
    if (cardType === "header") {
      return <HeaderCard />;
    } else if (cardType === "property") {
      return <PropertyCard />;
    } else if (cardType === "variants") {
      return <VariantsCard />;
    } else if (cardType === "anatomy") {
      return <AnatomyCard />;
    } else if (cardType === "spacing") {
      return <SpacingsCard />;
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
      setPublish(newValue);
    }
    return (
      <Toggle
        onChange={handleChange}
        value={publish}
        style={{ border: "none", cursor: "pointer" }}
        disabled={isHidden}
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
        newDocs["title"] = documentationTitle;
        newDocs[index] = currentCardData;
        setIsBuilding(false);
        return newDocumentation;
      });
    }
  }, [isBuilding]);

  useEffect(() => {
    if (Object.keys(documentationData).length > 0)
      setPreviewData(JSON.parse(JSON.stringify(documentationData)));
  }, [documentationData]);

  //! test for preview
  useEffect(() => {
    const isPrevData = Object.keys(previewData).length > 0;
    if (isPreviewing && isPrevData) {
      setPreviewData((prevData: any) => {
        const newDocumentation = { ...prevData };
        const newDocs = newDocumentation.docs;
        newDocs["title"] = documentationTitle;
        newDocs[index] = currentCardData;
        setIsPreviewing(false);
        return newDocumentation;
      });
    }
  }, [isPreviewing]);
  //!-------------------

  return cardType === "header" ? (
    <div className={isHidden ? "sectionCard draft" : "sectionCard"}>
      <HeaderCard />
    </div>
  ) : (
    <div className={isHidden ? "sectionCard draft" : "sectionCard"}>
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
          <div className="addSectionIcon" type={cardType} alt={cardType}>
            <img src={AnatomyIcon} className={"anatomy"} />
            <img src={SpacingIcon} className={"spacing"} />
            <img src={PropertyIcon} className={"property"} />
            <img src={VariantsIcon} className={"variants"} />
            <img src={ReleaseNotesIcon} className={"releasenotes"} />
            <IconPilcrow className={"paragraph"} />
            <IconVideo className={"video"} />
            <IconColumns className={"twoColumns"} />
            <IconListDetails className={"list"} />
            <IconLink className={"link"} />
            <IconPhoto className={"image"} />
          </div>
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
              className={"cardAuxButton hoverButton noPredefined"}
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
            <div className="leftContent hidePredefined">
              {PublishToggle(publish, setPublish, "Publish to Tidy Viewer")}
            </div>
            <div className="rightContent">
              <button
                className={"cardAuxButton eyeIcon"}
                onClick={() => {
                  setIsHidden(!isHidden);
                }}
              >
                <IconEye />
                <IconEyeOff />
              </button>
              <button
                className={"cardAuxButton noPredefined"}
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
