import { h } from "preact";
import { useContext } from "preact/hooks";
import BuilderContext from "../BuilderContext";

export const ContentCard = (cardData: any) => {
  const selectedCard = useContext(BuilderContext)?.selectedCard;
  const setSelectedCard = useContext(BuilderContext)?.setSelectedCard;
  const cardType = cardData.content;

  const isSelected = selectedCard === cardData.id;

  const HeaderCard = ({
    data,
    isSelected,
  }: {
    data: any;
    isSelected: boolean;
  }) => {
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

  const PropertyCard = ({
    data,
    isSelected,
  }: {
    data: any;
    isSelected: boolean;
  }) => {
    return (
      <div
        className={isSelected ? "sectionCard selected" : "sectionCard"}
        onClick={() => setSelectedCard(data.id)}
      >
        <h1>{data.title}</h1>
      </div>
    );
  };

  const VariantsCard = ({
    data,
    isSelected,
  }: {
    data: any;
    isSelected: boolean;
  }) => {
    return (
      <div
        className={isSelected ? "sectionCard selected" : "sectionCard"}
        onClick={() => setSelectedCard(data.id)}
      >
        <h1>{data.title}</h1>
      </div>
    );
  };

  const ReleaseNotesCard = ({
    data,
    isSelected,
  }: {
    data: any;
    isSelected: boolean;
  }) => {
    return (
      <div
        className={isSelected ? "sectionCard selected" : "sectionCard"}
        onClick={() => setSelectedCard(data.id)}
      >
        <h1>{data.title}</h1>
      </div>
    );
  };

  const TextCard = ({
    data,
    isSelected,
  }: {
    data: any;
    isSelected: boolean;
  }) => {
    return (
      <div
        className={isSelected ? "sectionCard selected" : "sectionCard"}
        onClick={() => setSelectedCard(data.id)}
      >
        <h1>{data.title}</h1>
      </div>
    );
  };

  const TwoColumnsCard = ({
    data,
    isSelected,
  }: {
    data: any;
    isSelected: boolean;
  }) => {
    return (
      <div
        className={isSelected ? "sectionCard selected" : "sectionCard"}
        onClick={() => setSelectedCard(data.id)}
      >
        <h1>{data.title}</h1>
      </div>
    );
  };

  const ListCard = ({
    data,
    isSelected,
  }: {
    data: any;
    isSelected: boolean;
  }) => {
    return (
      <div
        className={isSelected ? "sectionCard selected" : "sectionCard"}
        onClick={() => setSelectedCard(data.id)}
      >
        <h1>{data.title}</h1>
      </div>
    );
  };

  const LinkCard = ({
    data,
    isSelected,
  }: {
    data: any;
    isSelected: boolean;
  }) => {
    return (
      <div
        className={isSelected ? "sectionCard selected" : "sectionCard"}
        onClick={() => setSelectedCard(data.id)}
      >
        <h1>{data.title}</h1>
      </div>
    );
  };

  const ImageCard = ({
    data,
    isSelected,
  }: {
    data: any;
    isSelected: boolean;
  }) => {
    return (
      <div
        className={isSelected ? "sectionCard selected" : "sectionCard"}
        onClick={() => setSelectedCard(data.id)}
      >
        <h1>{data.title}</h1>
      </div>
    );
  };

  const VideoCard = ({
    data,
    isSelected,
  }: {
    data: any;
    isSelected: boolean;
  }) => {
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
      return <HeaderCard data={cardData} isSelected={isSelected} />;
    case "property":
      return <PropertyCard data={cardData} isSelected={isSelected} />;
    case "variants":
      return <VariantsCard data={cardData} isSelected={isSelected} />;
    case "release-notes":
      return <ReleaseNotesCard data={cardData} isSelected={isSelected} />;
    case "text":
      return <TextCard data={cardData} isSelected={isSelected} />;
    case "two-columns":
      return <TwoColumnsCard data={cardData} isSelected={isSelected} />;
    case "list":
      return <ListCard data={cardData} isSelected={isSelected} />;
    case "link":
      return <LinkCard data={cardData} isSelected={isSelected} />;
    case "image":
      return <ImageCard data={cardData} isSelected={isSelected} />;
    case "video":
      return <VideoCard data={cardData} isSelected={isSelected} />;
    default:
      return null;
  }
};
