import { h } from "preact";
import { useContext } from "preact/hooks";
import BuilderContext from "../BuilderContext";

//content cards
import HeaderCard from "./sectionCards/HeaderCard";
import ImageCard from "./sectionCards/ImageCard";
import LinkCard from "./sectionCards/LinkCard";
import ListCard from "./sectionCards/ListCard";
import PropertyCard from "./sectionCards/PropertyCard";
import ReleaseNotesCard from "./sectionCards/ReleaseNotesCard";
import TextCard from "./sectionCards/TextCard";
import TwoColumnsCard from "./sectionCards/TwoColumnsCard";
import VariantsCard from "./sectionCards/VariantsCard";
import VideoCard from "./sectionCards/VideoCard";

export const ContentCard = (cardData: any) => {
  const selectedCard = useContext(BuilderContext)?.selectedCard;
  const setSelectedCard = useContext(BuilderContext)?.setSelectedCard;
  const cardType = cardData.content;

  const isSelected = selectedCard === cardData.id;

  switch (cardType) {
    case "header":
      return (
        <HeaderCard
          data={cardData}
          isSelected={isSelected}
          setSelectedCard={setSelectedCard}
        />
      );
    case "property":
      return (
        <PropertyCard
          data={cardData}
          isSelected={isSelected}
          setSelectedCard={setSelectedCard}
        />
      );
    case "variants":
      return (
        <VariantsCard
          data={cardData}
          isSelected={isSelected}
          setSelectedCard={setSelectedCard}
        />
      );
    case "release-notes":
      return (
        <ReleaseNotesCard
          data={cardData}
          isSelected={isSelected}
          setSelectedCard={setSelectedCard}
        />
      );
    case "text":
      return (
        <TextCard
          data={cardData}
          isSelected={isSelected}
          setSelectedCard={setSelectedCard}
        />
      );
    case "two-columns":
      return (
        <TwoColumnsCard
          data={cardData}
          isSelected={isSelected}
          setSelectedCard={setSelectedCard}
        />
      );
    case "list":
      return (
        <ListCard
          data={cardData}
          isSelected={isSelected}
          setSelectedCard={setSelectedCard}
        />
      );
    case "link":
      return (
        <LinkCard
          data={cardData}
          isSelected={isSelected}
          setSelectedCard={setSelectedCard}
        />
      );
    case "image":
      return (
        <ImageCard
          data={cardData}
          isSelected={isSelected}
          setSelectedCard={setSelectedCard}
        />
      );
    case "video":
      return (
        <VideoCard
          data={cardData}
          isSelected={isSelected}
          setSelectedCard={setSelectedCard}
        />
      );
    default:
      return null;
  }
};
