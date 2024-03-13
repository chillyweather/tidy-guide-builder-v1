/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { IconTrash, IconCopy } from "@tabler/icons-react";
import { emit } from "@create-figma-plugin/utilities";
import {
  getDocumentation,
  getDocumentations,
  createDocumentation,
} from "./ui_functions/documentationHandlers";
import { useAtom } from "jotai";
import { isViewModeOpenAtom } from "src/state/atoms";

const IndexPage = ({
  data,
  setDataForUpdate,
  setSelectedMasterId,
  setIsIndexOpen,
  setIsContenFromServerOpen,
  setIsFromSavedData,
  setShowDeletePopup,
  setElementToDelete,
  token,
}: {
  data: any;
  setDataForUpdate: (data: any) => void;
  setSelectedMasterId: (id: any) => void;
  setIsIndexOpen: (isOpen: boolean) => void;
  setIsContenFromServerOpen: (isOpen: boolean) => void;
  setIsFromSavedData: (isFromSavedData: boolean) => void;
  setShowDeletePopup: (showPopup: boolean) => void;
  setElementToDelete: (element: any) => void;
  token: string;
}) => {
  const [isViewModeOpen] = useAtom(isViewModeOpenAtom);
  if (Object.keys(data).length === 0) return <div>{!!"no data"}</div>;
  const sortedData = data.sort((a: any, b: any) =>
    a.title.localeCompare(b.title)
  );

  return (
    <div className={"componentBTN-wrapper"}>
      {sortedData.map((element: any) => {
        const title = element.title;
        const wip = element.inProgress;
        const draft = element.draft;
        if (draft === true && isViewModeOpen === true) {
          return null;
        }

        return (
          <div className={"componentBTN"}>
            <div
              className={
                draft
                  ? "inner-componentBTN draftComponent"
                  : "inner-componentBTN"
              }
              // style={{ opacity: draft ? 0.5 : 1 }}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey) {
                  //
                  emit(
                    "GET_NEW_SELECTION",
                    element.componentKey,
                    element.nodeId
                  );
                  // setSelectedMasterId(element._id);
                } else {
                  emit(
                    "GET_NEW_SELECTION",
                    element.componentKey,
                    element.nodeId
                  );
                  setSelectedMasterId(element._id);
                  setIsFromSavedData(true);
                  setIsIndexOpen(false);
                  setIsContenFromServerOpen(true);
                }
              }}
            >
              <div className="inner-div">{title}</div>
              {wip && <div className={"wip"}>WIP</div>}
            </div>
            {!isViewModeOpen && (
              <button
                className={"cardAuxButton noPredefined"}
                onClick={() =>
                  handleDocClone(token, element._id, setDataForUpdate)
                }
              >
                <IconCopy />
              </button>
            )}
            {!isViewModeOpen && (
              <button
                className={"cardAuxButton noPredefined"}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeletePopup(true);
                  setElementToDelete(element._id);
                  setTimeout(function () {
                    document.getElementById("cancel-button")?.focus();
                  }, 300);
                }}
              >
                <IconTrash className={"trashIcon"} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default IndexPage;

async function handleDocClone(
  token: string,
  id: string,
  setData: (value: any) => void
) {
  const docFromServer = await getDocumentation(token, id);

  delete docFromServer._id;
  docFromServer.title = docFromServer.title + " copy";

  const clonedDoc = await createDocumentation(token, docFromServer);
  if (!clonedDoc._id) return;

  const newDocs = await getDocumentations(token);
  if (!newDocs) return;

  setData(newDocs);
}
