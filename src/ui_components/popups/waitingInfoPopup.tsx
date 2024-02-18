import { h } from "preact";
import { IconX } from "@tabler/icons-react";

function WaitingInfoPopup({
  setShowWaitingInfoPopup,
}: {
  setShowWaitingInfoPopup: Function;
}) {
  return (
    <div
      className={"feedbackPopupBackground"}
      onClick={() => setShowWaitingInfoPopup(false)}
    >
      <div className={"feedbackPopup"} onClick={(e) => e.stopPropagation()}>
        <button
          className={"closePopupButton"}
          onClick={() => setShowWaitingInfoPopup(false)}
        >
          <IconX />
        </button>
        <h2 className={"dialogTitle"}>Your account is set up!</h2>
        <p style={{ whiteSpace: "normal" }}>
          We just need a couple more days to activate it. We'll send you an
          email once it's good to go.
        </p>
        <div className="popupButtons">
          <button
            className={"button primary"}
            onClick={() => {
              setShowWaitingInfoPopup(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default WaitingInfoPopup;
