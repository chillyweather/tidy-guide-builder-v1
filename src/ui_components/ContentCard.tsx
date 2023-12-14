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

export const ContentCard = (cardData: any, index: number) => {
  //! states
  // general use
  const [isDraft, setIsDraft] = useState(false);
  const [publish, setPublish] = useState<boolean>(false);
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

  //! from context
  const selectedCard = useContext(BuilderContext)?.selectedCard;
  const setSelectedCard = useContext(BuilderContext)?.setSelectedCard;
  const setSelectedSections = useContext(BuilderContext)?.setSelectedSections;
  const isSelected = selectedCard === cardData.id;
  const id = cardData.id;

  const cardType = cardData.content;

  const currentCardContent = (cardType: string) => {
    if (cardType === "header") {
      return <HeaderCard data={cardData} />;
    } else if (cardType === "property") {
      return <PropertyCard />;
    } else if (cardType === "variants") {
      return <VariantsCard />;
    } else if (cardType === "release-notes") {
      return <ReleaseNotesCard />;
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

  return cardType === "header" ? (
    <div className={isDraft ? "sectionCard draft" : "sectionCard"}>
      <HeaderCard data={cardData} />
    </div>
  ) : (
    <div className={isDraft ? "sectionCard draft" : "sectionCard"}>
      <div className="cardHeader">
        <div className="leftContent">
          <IconGripVertical className={"dragIcon"} />
          <IconMoodPuzzled style={{ color: "burntorange" }} />
          <input
            className={"sectionTitle"}
            type={"text"}
            value={cardData.title}
          />
        </div>
        <div className="rightContent">
          <button className={"cardAuxButton"} onClick={handleOpenSection}>
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
              <button className={"cardAuxButton"} onClick={handleDeleteSection}>
                <IconTrash />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
