import { h } from "preact";
import { IconX } from "@tabler/icons-react";

function ResetPopup({ show, setShow }: { show: boolean; setShow: any }) {
  if (!show) {
    return null;
  }

  return (
    <div className={"feedbackPopupBackground"} onClick={() => setShow(false)}>
      <div className={"feedbackPopup"} onClick={(e) => e.stopPropagation()}>
        <button className={"closePopupButton"} onClick={() => setShow(false)}>
          <IconX />
        </button>
        <h2 className={"dialogTitle"}>Reset all Elements</h2>
        <p>This will reset all selected elements. </p>
        <div className="popupButtons">
          <button
            className={"button"}
            onClick={() => {
              console.log("cancel");
            }}
          >
            Cancel
          </button>
          <button
            className={"button"}
            onClick={() => {
              console.log("save");
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
