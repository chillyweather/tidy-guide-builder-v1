import { h } from "preact";
import { IconX } from "@tabler/icons-react";
import { useState } from "preact/hooks";
import { useContext, useRef, useEffect } from "preact/hooks";
import BuilderContext from "../../BuilderContext";

function deletePopup(e: any) {
  return (
    <div
      className={"feedbackPopupBackground hidden"}
      id={"deletePopup"}
      onClick={() => document.getElementById("deletePopup")?.classList.add("hidden")}
      tabIndex={0}
    >
      <div className={"feedbackPopup"} onClick={(e) => e.stopPropagation()}>
        <button
          className={"closePopupButton"}
          onClick={() => document.getElementById("deletePopup")?.classList.add("hidden")}
        >
          <IconX />
        </button>
        <h2 className={"dialogTitle"}>Delete element?</h2>
        <p>Are you sure you want to delete this element?<br />
          This action cannot be undone. </p>
        <div className="popupButtons footer">
          <button
            className={"button"}
            onClick={() => {
              document.getElementById("deletePopup")?.classList.add("hidden");
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") document.getElementById("deletePopup")?.classList.add("hidden");
            }}
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

export default deletePopup;
