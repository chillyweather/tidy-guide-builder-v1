import { h } from "preact";
import { IconX } from "@tabler/icons-react";
import { useState } from "preact/hooks";
import { useContext, useRef, useEffect } from "preact/hooks";
import BuilderContext from "../../BuilderContext";
import { deleteDocumentation } from "../ui_functions/documentationHandlers";
import Spinner from "../../images/loader-spinner-white.png";
import { deleteMultipleFilesFromServer } from "../ui_functions/fileManagementFunctions";

function DeletePopup({
  setShowDeletePopup,
  elementToDelete,
  dataForUpdate,
}: {
  setShowDeletePopup: Function;
  elementToDelete: string;
  dataForUpdate: any;
}) {
  const { token, setDataForUpdate } = useContext(BuilderContext) || {};
  return (
    <div
      className={"feedbackPopupBackground"}
      id={"deletePopup"}
      onClick={() => setShowDeletePopup(false)}
      tabIndex={0}
    >
      <div className={"feedbackPopup"} onClick={(e) => e.stopPropagation()}>
        <button
          className={"closePopupButton"}
          onClick={() => setShowDeletePopup(false)}
        >
          <IconX />
        </button>
        <h2 className={"dialogTitle"}>Delete element?</h2>
        <p>
          Are you sure you want to delete this element?
          <br />
          This action cannot be undone.{" "}
        </p>
        <div className="popupButtons footer">
          <button
            className={"button"}
            onClick={() => {
              setShowDeletePopup(false);
            }}
            // onKeyDown={(e) => {
            //   if (e.key === "Escape") setShowDeletePopup(false);
            // }}
          >
            Cancel
          </button>
          <button
            className={"button primary"}
            id={"delete-button"}
            onClick={async () => {
              document
                .getElementById("delete-button")
                ?.classList.add("spinner");
              handleDelete(
                token,
                elementToDelete,
                setDataForUpdate,
                setShowDeletePopup,
                dataForUpdate
              );
            }}
          >
            <img src={Spinner} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

async function handleDelete(
  token: string | undefined,
  elementId: string,
  setDataForUpdate: Function,
  setShowDeletePopup: Function,
  dataForUpdate: any
) {
  const result = await deleteDocumentation(token!, elementId);

  if (result) {
    await handleDeletePictures(elementId, dataForUpdate);
    setDataForUpdate((prevData: any) => {
      const newData = prevData.filter((el: any) => el._id !== elementId);
      return newData;
    });
    setShowDeletePopup(false);
  } else {
    alert("Something went wrong, please try again later.");
  }
}

async function handleDeletePictures(elementId: string, dataForUpdate: any) {
  const documentationToDelete = dataForUpdate.find(
    (el: any) => el._id === elementId
  );
  const links = findImageUrls(documentationToDelete);
  if (links.length === 0) return;
  const result = await deleteMultipleFilesFromServer(links);
}
export default DeletePopup;

export function findImageUrls(data: any) {
  const links = [];
  const docs = data.docs;
  for (const doc of docs) {
    const link = doc.content.remoteImageLink;
    if (!(link && link.startsWith("https://tidy-guide-resources"))) continue;
    links.push(link);
  }
  console.log("links", links);
  return links;
}
