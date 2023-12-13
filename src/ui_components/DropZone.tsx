import { VerticalSpace } from "@create-figma-plugin/ui";
import { h } from "preact";
import { useContext, useState } from "preact/hooks";
import BuilderContext from "../BuilderContext";
import { uploadFileToServer } from "src/ui_components/ui_functions/fileManagementFunctions";

export function DropZone(
  setLocalImageLink: (link: any) => void,
  setLocalFilePath: any
) {
  const loggedInUser = useContext(BuilderContext)?.loggedInUser;
  function handleDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      console.log("file", file);
      uploadFileToServer(file, loggedInUser!);
    }
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "480px",
        width: "100%",
        border: "2px dashed #ccc",
        borderRadius: "8px",
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div style={{ textAlign: "center" }}>
        Drop image here or click to select image
        <br />
        (Maximum resolution 4096 x 4096 pixels)
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
            setLocalImageLink(file);
          }
        }}
      />
    </div>
  );
}
