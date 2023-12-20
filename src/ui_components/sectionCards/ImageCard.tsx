import { h, JSX, FunctionComponent } from "preact";
import { textBoxElement } from "../textBoxElement";
import { DropZone } from "../DropZone";
import { useEffect, useState } from "preact/hooks";
import { IconX } from "@tabler/icons-react";
import { deleteFileFromServer } from "../ui_functions/fileManagementFunctions";

const ImageCard: FunctionComponent<{
  remoteImageLink: string;
  setRemoteImageLink: any;
}> = ({ remoteImageLink, setRemoteImageLink }) => {
  const [isImageLoading, setIsImageLoading] = useState(false);

  function setContent() {
    {
      return !remoteImageLink ? (
        <div className={"image-container"}>
          {DropZone(
            setRemoteImageLink,
            setIsImageLoading,
            isImageLoading,
            remoteImageLink
          )}
          <div className={"bold-me"}>Or add URL</div>
          {textBoxElement(remoteImageLink, setRemoteImageLink, "Add link")}
        </div>
      ) : (
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
          <div className="dropZoneHeader">
            <button
              onClick={async () => {
                setRemoteImageLink("");
                const result = await deleteFileFromServer(remoteImageLink);
                if (result) {
                  setIsImageLoading(false);
                }
              }}
            >
              <IconX size={16} />
            </button>
          </div>
          <img style={{ height: "200px" }} src={remoteImageLink} />
          {textBoxElement(remoteImageLink, setRemoteImageLink, "Link")}
        </div>
      );
    }
  }

  return <div style={{ width: "100%" }}>{setContent()}</div>;
};

export default ImageCard;
