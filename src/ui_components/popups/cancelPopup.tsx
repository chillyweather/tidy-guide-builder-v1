import { h } from "preact";
import { IconX } from "@tabler/icons-react";

function CancelPopup({ show, setShow }: { show: boolean; setShow: any }) {
  if (!show) {
    return null;
  }

  return (
    <div className={"feedbackPopupBackground"} onClick={() => setShow(false)}>
      <div className={"feedbackPopup"} onClick={(e) => e.stopPropagation()}>
        <button className={"closePopupButton"} onClick={() => setShow(false)}>
          <IconX />
        </button>
        <h2 className={"dialogTitle"}>You have unsaved changes</h2>
        <p>Save your information before leaving?</p>
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
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default CancelPopup;
