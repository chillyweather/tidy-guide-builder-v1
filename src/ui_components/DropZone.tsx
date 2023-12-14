import { VerticalSpace } from "@create-figma-plugin/ui";
import { h } from "preact";
import { useContext, useState } from "preact/hooks";
import BuilderContext from "../BuilderContext";
import { uploadFileToServer } from "src/ui_components/ui_functions/fileManagementFunctions";
import { useEffect } from "react";

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
    if (file) {
      setIsImageLoading(true);
      const path = await uploadFileToServer(file, loggedInUser!);
      setRemoteImageLink(path);
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "240px",
        width: "100%",
        border: "2px dashed #ccc",
        borderRadius: "8px",
      }}
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
        <div>
          <div style={{ textAlign: "center" }}>
            Drop image here or click to select image
            <br />
            (Maximum resolution 4096 x 4096 pixels) di
          </div>
          <VerticalSpace space="small" />
          <label
            htmlFor="file-input"
            style={{
              display: "inline-block",
              padding: "8px 16px",
              backgroundColor: "#ccc",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Select Image
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