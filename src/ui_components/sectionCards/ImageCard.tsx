import { h, JSX, FunctionComponent } from "preact";
import { textBoxElement } from "../textBoxElement";
import { DropZone } from "../DropZone";
import { useEffect, useState } from "preact/hooks";

const ImageCard: FunctionComponent<{
  remoteImageLink: string;
  setRemoteImageLink: any;
}> = ({ remoteImageLink, setRemoteImageLink }) => {
  const isRemoteLink = remoteImageLink !== "";

  function setContent() {
    if (!remoteImageLink) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "8px",
            height: "100%",
            width: "100%",
          }}
        >
          {DropZone(setRemoteImageLink)}
          {textBoxElement(remoteImageLink, setRemoteImageLink, "Link")}
        </div>
      );
    } else {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
            height: "100%",
            width: "100%",
          }}
        >
          <img style={{ width: "80%" }} src={remoteImageLink} />
          {textBoxElement(remoteImageLink, setRemoteImageLink, "Link")}
        </div>
      );
    }
  }

  return <div>{setContent()}</div>;
};

export default ImageCard;
