import { VerticalSpace } from "@create-figma-plugin/ui";
import { h } from "preact";
import { useContext, useState } from "preact/hooks";
import BuilderContext from "../BuilderContext";
import { uploadFileToServer } from "src/ui_components/ui_functions/fileManagementFunctions";
import { useEffect } from "react";
import imageLoader from "../images/loader-spinner.png";
import { IconCloudUpload } from "@tabler/icons-react";

export function DropZone(
  setRemoteImageLink: Function,
  setIsImageLoading: Function,
  isImageLoading: boolean,
  remoteImageLink: string
) {
  const loggedInUser = useContext(BuilderContext)?.loggedInUser;
  async function handleDrop(event: DragEvent) {
    event.preventDefault();
    console.log("event.dataTransfer.files[0]", event.dataTransfer!.files[0]);
    const file = event.dataTransfer?.files[0];
    console.log("file", file);

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
    <div
      className={"drop-zone"}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {isImageLoading ? (
        <div className={"loader image-loader"}>
          <div className={"rotatingBucket"}>
            <img src={imageLoader} />
          </div>
        </div>
      ) : (
        <div className={"drop-text"}>
          <div>
            <b>Drop a file here or click to upload image </b>
            <br />
            Maximum resolution 4096 x 4096 pixels
            <br />
            <u>Up to 1MB in size</u>
          </div>
          <VerticalSpace space="small" />
          <label htmlFor="file-input" className={"drop-button second"}>
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
              const reader = new FileReader();
              const { width, height, sizeInBytes } = handleFileDrop(
                file,
                reader
              );
              if (
                file &&
                (file.type === "image/jpeg" ||
                  file.type === "image/png" ||
                  file.type === "image/svg+xml") &&
                sizeInBytes < 1024000 &&
                width < 4096 &&
                height < 4096
              ) {
                console.log("file", file);
                setIsImageLoading(true);
                uploadFileToServer(file, loggedInUser!).then((path) => {
                  setIsImageLoading(false);
                  setRemoteImageLink(path);
                });
              } else {
                alert("Please upload a valid image file");
              }

              function handleFileDrop(file: File, reader: FileReader) {
                let width = 0;
                let height = 0;
                let sizeInBytes = 0;
                reader.onload = function (e) {
                  const image = new Image();
                  image.onload = function () {
                    width = image.width;
                    height = image.height;
                    sizeInBytes = file.size;
                  };
                  image.src = e.target!.result as string;
                };
                reader.readAsDataURL(file);
                return { width, height, sizeInBytes };
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
