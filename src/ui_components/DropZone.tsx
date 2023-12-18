import { VerticalSpace } from "@create-figma-plugin/ui";
import { h } from "preact";
import { useContext, useState } from "preact/hooks";
import BuilderContext from "../BuilderContext";
import { uploadFileToServer } from "src/ui_components/ui_functions/fileManagementFunctions";
import { useEffect } from "react";
import {
  IconCloudUpload,
} from "@tabler/icons-react";

export function DropZone(
  setRemoteImageLink: Function,
  setIsImageLoading: Function,
  isImageLoading: boolean,
  remoteImageLink: string
) {
  const loggedInUser = useContext(BuilderContext)?.loggedInUser;
  async function handleDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/svg+xml")
    ) {
      setIsImageLoading(true);
      const path = await uploadFileToServer(file, loggedInUser!);
      setRemoteImageLink(path);
    } else {
      alert("Please upload a valid image file");
    }
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
  }

  useEffect(() => {
    if (remoteImageLink) {
      setIsImageLoading(false);
    }
  }, [remoteImageLink]);

  return (
    <div className={"drop-zone"}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {isImageLoading ? (
        <div className={"loader"}>
          <div className="rotatingBucket" style={{ fontSize: "80px" }}>
            🪣
          </div>
        </div>
      ) : (
        <div className={"drop-text"}>
          <div>
            <b>Drop image here or click to upload image </b>
            <br />
            Maximum resolution 4096 x 4096 pixels
          </div>
          <VerticalSpace space="small" />
          <label
            htmlFor="file-input"
            className={"drop-button second"}
          >
            <IconCloudUpload />
            Upload Image
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(event) => {
              // @ts-ignore
              const file = event.target?.files?.[0];
              if (file) {
                setIsImageLoading(true);
                uploadFileToServer(file, loggedInUser!).then((path) => {
                  setIsImageLoading(false);
                  setRemoteImageLink(path);
                });
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
