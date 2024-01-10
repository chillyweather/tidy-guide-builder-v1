import { h } from "preact";
import { IconX } from "@tabler/icons-react";

import { useContext, useRef, useEffect } from "preact/hooks";
import BuilderContext from "../../BuilderContext";

function deletePopup() {
  const setIsReset = useContext(BuilderContext)?.setIsReset;
  const showdeletePopup = useContext(BuilderContext)?.showdeletePopup;
  const setShowdeletePopup = useContext(BuilderContext)?.setShowdeletePopup;
  if (!showdeletePopup) {
    return null;
  }

  return (
    <div
      className={"feedbackPopupBackground"}
      onClick={() => setShowdeletePopup(false)}
      tabIndex={0}
    >
      <div className={"feedbackPopup"} onClick={(e) => e.stopPropagation()}>
        <button
          className={"closePopupButton"}
          onClick={() => setShowdeletePopup(false)}
        >
          <IconX />
        </button>
        <h2 className={"dialogTitle"}>Delete Element?</h2>
        <p>This will reset all selected elements. </p>
        <div className="popupButtons footer">
          <button
            className={"button"}
            onClick={() => {
              setShowdeletePopup(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") setShowdeletePopup(false);
            }}
          >
            Cancel
          </button>
          <button
            className={"button primary"}
            onClick={() => {
              setIsReset(true);
              setShowdeletePopup(false);
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default deletePopup;
