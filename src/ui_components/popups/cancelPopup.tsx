import { h } from "preact";

function CancelPopup({ show, setShow }: { show: boolean; setShow: any }) {
  if (!show) {
    return null;
  }

  return (
    <div className={"feedbackPopupBackground"} onClick={() => setShow(false)}>
      <div className={"feedbackPopup"} onClick={(e) => e.stopPropagation()}>
        <h2 className={"dialogTitle"}>You have unsaved changes</h2>
        <p>Save your information before leaving?</p>
        <div className="popupButtons">
          <button
            className={"button"}
            onClick={() => {
              console.log("cancel");
            }}
          >
            Don't save
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
