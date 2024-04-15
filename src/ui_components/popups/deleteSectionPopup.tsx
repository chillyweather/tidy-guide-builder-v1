/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { IconX } from "@tabler/icons-react";
import { useContext, useEffect } from "preact/hooks";
import BuilderContext from "../../BuilderContext";
import { useAtom } from "jotai";
import {
  showDeleteSectionPopupAtom,
  sectionToDeleteIndexAtom,
  sectionToDeleteAtom,
} from "src/state/atoms";
import { deleteDocumentation } from "../ui_functions/documentationHandlers";
import Spinner from "../../images/loader-spinner-white.png";
import { handleDeletePictures } from "../ui_functions/deleteHandlers";
import { deleteSection } from "../ui_functions/cardActions";
import { deleteFileFromServer } from "../ui_functions/fileManagementFunctions";

function DeleteSectionPopup({
  elementToDelete,
  dataForUpdate,
}: {
  elementToDelete: string;
  dataForUpdate: (value: any) => void;
}) {
  const { setSelectedSections } = useContext(BuilderContext) || {};
  const [sectionToDeleteIndex] = useAtom(sectionToDeleteIndexAtom);
  const [sectionToDelete]: any = useAtom(sectionToDeleteAtom);
  const [, setShowDeleteSectionPopup] = useAtom(showDeleteSectionPopupAtom);

  const handleDeleteSection = async (e: MouseEvent) => {
    deleteSection(sectionToDeleteIndex, setSelectedSections);
    //     const remoteImageLink = sectionToDelete?.content.remoteImageLink;
    //     if (
    //       !remoteImageLink ||
    //       !remoteImageLink.startsWith("https://nyc3.digitaloceanspaces.com")
    //     )
    //       return;
    //
    //     const deletion = await deleteFileFromServer(remoteImageLink);
    //     if (deletion) {
    //       console.log(deletion);
    //     }
  };

  return (
    <div
      className={"feedbackPopupBackground"}
      id={"deletePopup"}
      onClick={() => setShowDeleteSectionPopup(false)}
      tabIndex={0}
    >
      <div className={"feedbackPopup"} onClick={(e) => e.stopPropagation()}>
        <button
          className={"closePopupButton"}
          onClick={() => setShowDeleteSectionPopup(false)}
        >
          <IconX />
        </button>
        <h2 className={"dialogTitle"}>Delete element</h2>
        <p>
          Are you sure you want to delete this element?
          <br />
          This action will only take effect after Publish.
        </p>
        <div className="popupButtons footer">
          <button
            className={"button"}
            id={"cancel-button"}
            onClick={() => {
              setShowDeleteSectionPopup(false);
            }}
          // onKeyDown={(e) => {
          //   if (e.key === "Escape") setShowDeletePopup(false);
          // }}
          >
            <img src=""
              style={{ display: 'none' }}
              onError={(event) => {
                //@ts-ignore
                event.target.parentElement.focus();
              }}
            />
            Cancel
          </button>
          <button
            className={"button primary"}
            id={"delete-button"}
            onClick={async (e) => {
              handleDeleteSection(e);
              setShowDeleteSectionPopup(false);
              // document
              //   .getElementById("delete-button")
              //   ?.classList.add("spinner");
              // handleDelete(
              //   token,
              //   elementToDelete,
              //   setDataForUpdate,
              //   setShowDeletePopup,
              //   dataForUpdate
              // );
            }}
          >
            <img src={Spinner} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div >
  );
}

export default DeleteSectionPopup;
