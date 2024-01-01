import { h } from "preact";
import { IconX } from "@tabler/icons-react";
import { useContext } from "preact/hooks";
import BuilderContext from "../../BuilderContext";

function ResetPopup() {
  const setIsReset = useContext(BuilderContext)?.setIsReset;
  const showResetPopup = useContext(BuilderContext)?.showResetPopup;
  const setShowResetPopup = useContext(BuilderContext)?.setShowResetPopup;
  if (!showResetPopup) {
    return null;
  }

  return (
    <div
      className={"feedbackPopupBackground"}
      onClick={() => setShowResetPopup(false)}
    >
      <div className={"feedbackPopup"} onClick={(e) => e.stopPropagation()}>
        <button
          className={"closePopupButton"}
          onClick={() => setShowResetPopup(false)}
        >
          <IconX />
        </button>
        <h2 className={"dialogTitle"}>Reset all Elements</h2>
        <p>This will reset all selected elements. </p>
        <div className="popupButtons footer">
          <button
            className={"button"}
            onClick={() => {
              setShowResetPopup(false);
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
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPopup;
