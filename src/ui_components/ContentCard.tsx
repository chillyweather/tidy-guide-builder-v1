import { h } from "preact";
import { useContext } from "preact/hooks";
import BuilderContext from "../BuilderContext";

export const ContentCard = (cardData: any) => {
  const selectedCard = useContext(BuilderContext)?.selectedCard;
  const setSelectedCard = useContext(BuilderContext)?.setSelectedCard;
  const cardType = cardData.content;

  const isSelected = selectedCard === cardData.id;
  console.log("selectedCard", selectedCard);

  const HeaderCard = ({ data }: { data: any }) => {
    return (
      <div
        className={isSelected ? "sectionCard selected" : "sectionCard"}
        onClick={() => setSelectedCard(data.id)}
        id={"headerCard"}
      >
        <h1>{data.title}</h1>
      </div>
    );
  };

  const PropertyCard = ({ data }: { data: any }) => {
    return (
      <div
        className={isSelected ? "sectionCard selected" : "sectionCard"}
        onClick={() => setSelectedCard(data.id)}
      >
        <h1>{data.title}</h1>
      </div>
    );
  };

  const VariantsCard = ({ data }: { data: any }) => {
    return (
      <div
        className={isSelected ? "sectionCard selected" : "sectionCard"}
        onClick={() => setSelectedCard(data.id)}
      >
        <h1>{data.title}</h1>
      </div>
    );
  };

  const ReleaseNotesCard = ({ data }: { data: any }) => {
    return (
      <div
        className={isSelected ? "sectionCard selected" : "sectionCard"}
        onClick={() => setSelectedCard(data.id)}
      >
        <h1>{data.title}</h1>
      </div>
    );
  };

  const TextCard = ({ data }: { data: any }) => {
    return (
      <div
        className={isSelected ? "sectionCard selected" : "sectionCard"}
        onClick={() => setSelectedCard(data.id)}
      >
        <h1>{data.title}</h1>
      </div>
    );
  };

  const TwoColumnsCard = ({ data }: { data: any }) => {
    return (
      <div
        className={isSelected ? "sectionCard selected" : "sectionCard"}
        onClick={() => setSelectedCard(data.id)}
      >
        <h1>{data.title}</h1>
      </div>
    );
  };

  const ListCard = ({ data }: { data: any }) => {
    return (
      <div
        className={isSelected ? "sectionCard selected" : "sectionCard"}
        onClick={() => setSelectedCard(data.id)}
      >
        <h1>{data.title}</h1>
      </div>
    );
  };

  const LinkCard = ({ data }: { data: any }) => {
    return (
      <div
        className={isSelected ? "sectionCard selected" : "sectionCard"}
        onClick={() => setSelectedCard(data.id)}
      >
        <h1>{data.title}</h1>
      </div>
    );
  };

  const ImageCard = ({ data }: { data: any }) => {
    return (
      <div
        className={isSelected ? "sectionCard selected" : "sectionCard"}
        onClick={() => setSelectedCard(data.id)}
      >
        <h1>{data.title}</h1>
      </div>
    );
  };

  const VideoCard = ({ data }: { data: any }) => {
    return (
      <div
        className={isSelected ? "sectionCard selected" : "sectionCard"}
        onClick={() => setSelectedCard(data.id)}
      >
        <h1>{data.title}</h1>
      </div>
    );
  };

  switch (cardType) {
    case "header":
      return <HeaderCard data={cardData} />;
    case "property":
      return <PropertyCard data={cardData} />;
    case "variants":
      return <VariantsCard data={cardData} />;
    case "release-notes":
      return <ReleaseNotesCard data={cardData} />;
    case "text":
      return <TextCard data={cardData} />;
    case "two-columns":
      return <TwoColumnsCard data={cardData} />;
    case "list":
      return <ListCard data={cardData} />;
    case "link":
      return <LinkCard data={cardData} />;
    case "image":
      return <ImageCard data={cardData} />;
    case "video":
      return <VideoCard data={cardData} />;
    default:
      return null;
  }
};
