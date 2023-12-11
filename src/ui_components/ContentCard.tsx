import { h } from "preact";
import { useContext, useState } from "preact/hooks";
import BuilderContext from "../BuilderContext";

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
  // states, probably temp
  const [isDraft, setIsDraft] = useState(false);
  const [publish, setPublish] = useState<boolean>(false);
  // from context
  const selectedCard = useContext(BuilderContext)?.selectedCard;
  const setSelectedCard = useContext(BuilderContext)?.setSelectedCard;
  const isSelected = selectedCard === cardData.id;

  const cardType = cardData.content;
  switch (cardType) {
    case "header":
      return <HeaderCard data={cardData} isSelected={isSelected} />;
    // case "property":
    //   return <PropertyCard data={cardData} isSelected={isSelected} />;
    // case "variants":
    //   return <VariantsCard data={cardData} isSelected={isSelected} />;
    // case "release-notes":
    //   return <ReleaseNotesCard data={cardData} isSelected={isSelected} />;
    case "text":
      return (
        <TextCard
          data={cardData}
          isSelected={isSelected}
          isDraft={isDraft}
          setIsDraft={setIsDraft}
          publish={publish}
          setPublish={setPublish}
          index={index}
        />
      );
    // case "two-columns":
    //   return <TwoColumnsCard data={cardData} isSelected={isSelected} />;
    // case "list":
    //   return <ListCard data={cardData} isSelected={isSelected} />;
    // case "link":
    //   return <LinkCard data={cardData} isSelected={isSelected} />;
    // case "image":
    //   return <ImageCard data={cardData} isSelected={isSelected} />;
    // case "video":
    //   return <VideoCard data={cardData} isSelected={isSelected} />;
    default:
      return null;
  }
};
