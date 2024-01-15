import { h } from "preact";
import { Button } from "@create-figma-plugin/ui";

function hideImg(event: any) {
  event.target.classList.add("broken");
}

export const Image = ({
  element,
  setCurrentImage,
  setIsImageOpen,
  index,
}: any) => {
  return (
    <div className={"section imageSection"}>
      <div className={"anchorLink"} id={element.title + index}></div>
      {element.title && (
        <div className={"title-row"}>
          <h3 className={"title"}>{element.title}</h3>
          <a href={"#top"} className={"back-link"}>
            ⬆︎
          </a>
        </div>
      )}
      {element.content.remoteImageLink.length && (
        <Button
          onClick={() => {
            setCurrentImage(element.content.remoteImageLink);
            setIsImageOpen(true);
          }}
          style={{
            cursor: "pointer",
            height: "100%",
            backgroundColor: "transparent",
            padding: 0,
          }}
        >
          <div className={"image-wrapper"}>
            <img
              className={"image"}
              src={element.content.remoteImageLink}
              onError={(event) => {
                hideImg(event);
              }}
            />
          </div>
        </Button>
      )}
    </div>
  );
};
