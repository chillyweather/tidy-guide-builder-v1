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
  handleDeleteSection,
  handleOpenSection,
  handleDuplicateSection,
} from "./sectionCards/cardActions";

//content cards
import HeaderCard from "./sectionCards/HeaderCard";
// import ImageCard from "./sectionCards/ImageCard";
// import LinkCard from "./sectionCards/LinkCard";
// import ListCard from "./sectionCards/ListCard";
// import PropertyCard from "./sectionCards/PropertyCard";
// import ReleaseNotesCard from "./sectionCards/ReleaseNotesCard";
import TextCard from "./sectionCards/TextCard";
// import TwoColumnsCard from "./sectionCards/TwoColumnsCard";
// import VariantsCard from "./sectionCards/VariantsCard";
// import VideoCard from "./sectionCards/VideoCard";

export const ContentCard = (cardData: any, index: number) => {
  // states, general use
  const [isDraft, setIsDraft] = useState(false);
  const [publish, setPublish] = useState<boolean>(false);
  // states, text card
  const [paragraphTextContent, setParagraphTextContent] = useState("");
  // from context
  const selectedCard = useContext(BuilderContext)?.selectedCard;
  const setSelectedCard = useContext(BuilderContext)?.setSelectedCard;
  const setSelectedSections = useContext(BuilderContext)?.setSelectedSections;
  const isSelected = selectedCard === cardData.id;
  const id = cardData.id;

  const cardType = cardData.content;

  const currentCardContent = (cardType: string) => {
    if (cardType === "header") {
      return <HeaderCard data={cardData} isSelected={isSelected} />;
    }
    // else if (cardType === "property") {
    //   return <PropertyCard data={cardData} isSelected={isSelected} />;
    // } else if (cardType === "variants") {
    //   return <VariantsCard data={cardData} isSelected={isSelected} />;
    // } else if (cardType === "release-notes") {
    //   return <ReleaseNotesCard data={cardData} isSelected={isSelected} />;
    // }
    else if (cardType === "text") {
      return (
        <TextCard
          textContent={paragraphTextContent}
          setTextContent={setParagraphTextContent}
        />
      );
    }
    // else if (cardType === "two-columns") {
    //   return <TwoColumnsCard data={cardData} isSelected={isSelected} />;
    // } else if (cardType === "list") {
    //   return <ListCard data={cardData} isSelected={isSelected} />;
    // } else if (cardType === "link") {
    //   return <LinkCard data={cardData} isSelected={isSelected} />;
    // } else if (cardType === "image") {
    //   return <ImageCard data={cardData} isSelected={isSelected} />;
    // } else if (cardType === "video") {
    //   return <VideoCard data={cardData} isSelected={isSelected} />;
    // }
    else {
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

  return (
    <div className={isDraft ? "sectionCard draft" : "sectionCard"}>
      <div className="cardHeader">
        <div className="leftContent">
          <IconGripVertical />
          <IconMoodPuzzled style={{ color: "burntorange" }} />
          <div className={"sectionTitle"} contentEditable>
            Paragraph
          </div>
        </div>
        <div className="rightContent">
          <button
            className={"cardAuxButton"}
            onClick={(e) => handleOpenSection(e, id)}
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
                onClick={(e) => handleDuplicateSection(e, index, cardData)}
              >
                <IconCopy />
              </button>
              <button
                className={"cardAuxButton"}
                onClick={(e) => handleDeleteSection(e, index)}
              >
                <IconTrash />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
