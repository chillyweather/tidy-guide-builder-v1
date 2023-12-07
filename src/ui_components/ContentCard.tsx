import { h } from "preact";
import { useContext } from "preact/hooks";
import BuilderContext from "../BuilderContext";

export const ContentCard = (cardData: any) => {
  const cardType = cardData.content;

  const HeaderCard = ({ data }: { data: any }) => {
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
      return <div contentEditable>{cardData.title}</div>;
    case "variants":
      return <div contentEditable>{cardData.title}</div>;
    case "release-notes":
      return <div contentEditable>{cardData.title}</div>;
    case "text":
      return <div contentEditable>{cardData.title}</div>;
    case "two-columns":
      return <div contentEditable>{cardData.title}</div>;
    case "list":
      return <div contentEditable>{cardData.title}</div>;
    case "link":
      return <div contentEditable>{cardData.title}</div>;
    case "image":
      return <div contentEditable>{cardData.title}</div>;
    case "video":
      return <div contentEditable>{cardData.title}</div>;
    default:
      return <div>Unknown card type</div>;
  }
};
