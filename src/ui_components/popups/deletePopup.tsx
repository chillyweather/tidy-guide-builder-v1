import { h } from "preact";
import { IconX } from "@tabler/icons-react";
import { useState } from "preact/hooks";
import { useContext, useRef, useEffect } from "preact/hooks";
import BuilderContext from "../../BuilderContext";

function deletePopup() {
  return (
    <div
      className={"feedbackPopupBackground hidden"}
      id={"deletePopup"}
      onClick={() => setShowResetPopup(false)}
      tabIndex={0}
    >
      <div className={"feedbackPopup"} onClick={(e) => e.stopPropagation()}>
        <button
          className={"closePopupButton"}
          onClick={() => setShowResetPopup(false)}
        >
          <IconX />
        </button>
        <h2 className={"dialogTitle"}>Delete element?</h2>
        <p>Are you sure you want to delete this element?<br/>
          This action cannot be undone. </p>
        <div className="popupButtons footer">
          <button
            className={"button"}
            onClick={() => {
              setShowResetPopup(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") setShowResetPopup(false);
            }}
          >
            Cancel
          </button>
          <button
            className={"button primary"}
            onClick={() => {
              setIsReset(true);
              setShowResetPopup(false);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default deletePopup;
