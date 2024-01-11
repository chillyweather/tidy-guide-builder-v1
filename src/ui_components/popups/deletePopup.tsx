import { h } from "preact";
import { IconX } from "@tabler/icons-react";
import { useState } from "preact/hooks";
import { useContext, useRef, useEffect } from "preact/hooks";
import BuilderContext from "../../BuilderContext";

function DeletePopup({
  setShowDeletePopup,
  elementToDelete,
}: {
  setShowDeletePopup: Function;
  elementToDelete: string;
}) {
  console.log("elementToDelete", elementToDelete);
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
            onClick={() => {
              alert("Dima, HELP !");
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePopup;
