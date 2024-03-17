import { h } from "preact";
import { IconX } from "@tabler/icons-react";
// import { useState } from "preact/hooks";
import { useContext } from "preact/hooks";
import BuilderContext from "../../BuilderContext";
import DetailsPage from "../previewElements/DetailsPage";

function PreviewPopup() {
  const {
    // showPreviewPopup,
    setShowPreviewPopup,
    previewData,
    // documentationData,
  } = useContext(BuilderContext) || {};

  console.log("previewData", previewData);

  return (
    <div
      className={"feedbackPopupBackground"}
      onClick={() => setShowPreviewPopup(false)}
      tabIndex={0}
    >
      <div
        className={"feedbackPopup previewPopup"}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={"closePopupButton"}
          id={"close-popup"}
          onClick={() => setShowPreviewPopup(false)}
        >
          <IconX />
        </button>
        {console.log("previewData", previewData)}
        <div className="previewContent">
          <DetailsPage data={previewData} />
        </div>
      </div>
    </div>
  );
}

export default PreviewPopup;
