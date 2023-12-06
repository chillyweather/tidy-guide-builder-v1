import { h } from "preact";
import { useContext } from "preact/hooks";
import BuilderContext from "../BuilderContext";

export const ContentCard = (data: any) => {
  const cardType = data.content;
  console.log("cardType", cardType);

  const HeaderCard = (data: any) => {
    return (
      <div>
        <h1>{data.data.title}</h1>
        <p>{data.data.subtitle}</p>
      </div>
    );
  };

  switch (cardType) {
    case "header":
      return <div contentEditable>Text</div>;
    case "text":
      return <div>Text</div>;
    default:
      return <div>Unknown card type</div>;
  }
};
