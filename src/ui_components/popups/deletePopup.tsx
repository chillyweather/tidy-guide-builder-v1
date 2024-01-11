import { h } from "preact";
import { IconX } from "@tabler/icons-react";
import { useState } from "preact/hooks";
import { useContext, useRef, useEffect } from "preact/hooks";
import BuilderContext from "../../BuilderContext";
import { deleteDocumentation } from "../ui_functions/documentationHandlers";
import Spinner from "../../images/loader-spinner-white.png";

function DeletePopup({
  setShowDeletePopup,
  elementToDelete,
}: {
  setShowDeletePopup: Function;
  elementToDelete: string;
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
            className={"button primary delete-button"}
            onClick={async () => {
              handleDelete(token, elementToDelete, setDataForUpdate);
              setShowDeletePopup(false);
            }}
          >
            <span>Delete</span>
            <img src={Spinner} />
          </button>
        </div>
      </div>
    </div>
  );
}

async function handleDelete(
  token: string | undefined,
  elementId: string,
  setDataForUpdate: Function
) {
  console.log("deleting element");
  const result = await deleteDocumentation(token!, elementId);

  if (result) {
    setDataForUpdate((prevData: any) => {
      const newData = prevData.filter((el: any) => el._id !== elementId);
      return newData;
    });
    console.log("deleted element");
  } else {
    alert("Something went wrong, please try again later.");
  }
}

export default DeletePopup;
