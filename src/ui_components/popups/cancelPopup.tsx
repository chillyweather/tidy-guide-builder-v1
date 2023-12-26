import { h } from "preact";
import { IconX } from "@tabler/icons-react";
import { useContext, useState } from "preact/hooks";
import BuilderContext from "../../BuilderContext";

function CancelPopup() {
  const showCancelPopup = useContext(BuilderContext)?.showCancelPopup;
  const setShowCancelPopup = useContext(BuilderContext)?.setShowCancelPopup;
  const setIsIndexOpen = useContext(BuilderContext)?.setIsIndexOpen;
  const setIsMainContentOpen = useContext(BuilderContext)?.setIsMainContentOpen;
  const setIsContenFromServerOpen =
    useContext(BuilderContext)?.setIsContenFromServerOpen;
  const setIsReset = useContext(BuilderContext)?.setIsReset;
  const setIsBuilding = useContext(BuilderContext)?.setIsBuilding;

  if (!showCancelPopup) {
    return null;
  }

  return (
    <div
      className={"feedbackPopupBackground"}
      onClick={() => setShowCancelPopup(false)}
    >
      <div className={"feedbackPopup"} onClick={(e) => e.stopPropagation()}>
        <button
          className={"closePopupButton"}
          onClick={() => setShowCancelPopup(false)}
        >
          <IconX />
        </button>
        <h2 className={"dialogTitle"}>You have unsaved changes</h2>
        <p>Save your information before leaving?</p>
        <div className="popupButtons">
          <button
            className={"button"}
            onClick={() => {
              setIsIndexOpen(true);
              setIsMainContentOpen(false);
              setIsContenFromServerOpen(false);
              setIsReset(true);
              setShowCancelPopup(false);
            }}
          >
            Exit without saving
          </button>
          <button
            className={"button"}
            onClick={() => {
              setIsBuilding(true);
              setShowCancelPopup(false);
            }}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default CancelPopup;
