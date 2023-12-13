import { h, JSX, FunctionComponent } from "preact";
import { textBoxElement } from "../textBoxElement";
import { DropZone } from "../DropZone";
import { useEffect, useState } from "preact/hooks";

const ImageCard: FunctionComponent<{
  remoteImageLink: string;
  setRemoteImageLink: any;
}> = ({ remoteImageLink, setRemoteImageLink }) => {
  const [localImageLink, setLocalImageLink]: any = useState(null);
  const [localFilePath, setLocalFilePath]: any = useState(null);
  const isRemoteLink = remoteImageLink !== "";
  const isLocalLink = localImageLink !== "";
  let imageSource = "";

  function setContent() {
    if (!isRemoteLink) {
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
          {DropZone(setLocalImageLink, setLocalFilePath)}
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

  useEffect(() => {
    if (localImageLink !== "") {
      setLocalFilePath(imageSource);
    }
  }, [localImageLink, remoteImageLink]);

  return <div>{setContent()}</div>;
};

export default ImageCard;
