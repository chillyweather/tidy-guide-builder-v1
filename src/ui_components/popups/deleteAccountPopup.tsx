import { h } from "preact";
import { IconX } from "@tabler/icons-react";
import { useState } from "preact/hooks";
import { useContext, useRef, useEffect } from "preact/hooks";
import BuilderContext from "../../BuilderContext";
import { deleteDocumentation } from "../ui_functions/documentationHandlers";
import Spinner from "../../images/loader-spinner-white.png";
import { deleteMultipleFilesFromServer } from "../ui_functions/fileManagementFunctions";
import { getMyAccountData } from "../ui_functions/authentication";

function DeleteAccountPopup({
  setShowDeleteAccountPopup,
}: {
  setShowDeleteAccountPopup: Function;
}) {
  const [spinner, setSpinner] = useState(false);
  const { token, loggedInUser } = useContext(BuilderContext) || {};
  return (
    <div
      className={"feedbackPopupBackground"}
      id={"deletePopup"}
      onClick={() => setShowDeleteAccountPopup(false)}
      tabIndex={0}
    >
      <div className={"feedbackPopup"} onClick={(e) => e.stopPropagation()}>
        <button
          className={"closePopupButton"}
          onClick={() => setShowDeleteAccountPopup(false)}
        >
          <IconX />
        </button>
        <h2 className={"dialogTitle"}>Delete account</h2>
        <p style={{ whiteSpace: "normal" }}>
          Are you sure you want to proceed?
          <br />
          Deleting your account is irreversible and will result in the loss of
          all your data and settings.
        </p>
        <div className="popupButtons footer">
          <button
            className={"button"}
            id={"cancel-button"}
            onClick={() => {
              setShowDeleteAccountPopup(false);
            }}
            // onKeyDown={(e) => {
            //   if (e.key === "Escape") setShowDeletePopup(false);
            // }}
          >
            Cancel
          </button>
          <button
            className={spinner ? "button primary spinner" : "button primary"}
            id={"delete-button"}
            onClick={async () => {
              if (!token) return;
              setSpinner(true);
              const result = await getMyAccountData(token);
              setSpinner(false);
              // handleDelete(
              //   token,
              //   elementToDelete,
              //   setDataForUpdate,
              //   setShowDeletePopup,
              //   dataForUpdate
              // );
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
export default DeleteAccountPopup;

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
