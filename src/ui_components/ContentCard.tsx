import { h } from "preact";
import { useContext } from "preact/hooks";
import BuilderContext from "../BuilderContext";

export const ContentCard = (cardData: any) => {
  const cardType = cardData.content;

  const HeaderCard = ({ data }: { data: any }) => {
    return (
      <div id={"headerCard"}>
        <h1>{data.title}</h1>
      </div>
    );
  };

  const PropertyCard = ({ data }: { data: any }) => {
    return (
      <div>
        <h1>{data.title}</h1>
      </div>
    );
  };

  const VariantsCard = ({ data }: { data: any }) => {
    return (
      <div>
        <h1>{data.title}</h1>
      </div>
    );
  };

  const ReleaseNotesCard = ({ data }: { data: any }) => {
    return (
      <div>
        <h1>{data.title}</h1>
      </div>
    );
  };

  const TextCard = ({ data }: { data: any }) => {
    return (
      <div>
        <h1>{data.title}</h1>
      </div>
    );
  };

  const TwoColumnsCard = ({ data }: { data: any }) => {
    return (
      <div>
        <h1>{data.title}</h1>
      </div>
    );
  };

  const ListCard = ({ data }: { data: any }) => {
    return (
      <div>
        <h1>{data.title}</h1>
      </div>
    );
  };

  const LinkCard = ({ data }: { data: any }) => {
    return (
      <div>
        <h1>{data.title}</h1>
      </div>
    );
  };

  const ImageCard = ({ data }: { data: any }) => {
    return (
      <div>
        <h1>{data.title}</h1>
      </div>
    );
  };

  const VideoCard = ({ data }: { data: any }) => {
    return (
      <div>
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
      return <div>Unknown card type</div>;
  }
};
