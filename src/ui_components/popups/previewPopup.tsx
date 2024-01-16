import { h } from "preact";
import { IconX } from "@tabler/icons-react";
import { useState } from "preact/hooks";
import { useContext, useRef, useEffect } from "preact/hooks";
import BuilderContext from "../../BuilderContext";
import DetailsPage from "../previewElements/DetailsPage";

function PreviewPopup() {
  const {
    showPreviewPopup,
    setShowPreviewPopup,
    previewData,
    documentationData,
  } = useContext(BuilderContext) || {};

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
          onClick={() => setShowPreviewPopup(false)}
        >
          <IconX />
        </button>
        <div className="previewContent">
          <DetailsPage data={previewData} />
        </div>
      </div>
    </div>
  );
}

export default PreviewPopup;
