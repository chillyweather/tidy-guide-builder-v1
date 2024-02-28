import { h } from "preact";
import { IconTrash, IconCopy } from "@tabler/icons-react";
import { emit } from "@create-figma-plugin/utilities";
import {
  getDocumentation,
  getDocumentations,
  createDocumentation,
} from "./ui_functions/documentationHandlers";

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
  setDataForUpdate: Function;
  setSelectedMasterId: Function;
  setIsIndexOpen: Function;
  setIsContenFromServerOpen: Function;
  setIsFromSavedData: Function;
  setShowDeletePopup: Function;
  setElementToDelete: Function;
  token: string;
}) => {
  if (Object.keys(data).length === 0) return <div>{!!"no data"}</div>;
  const sortedData = data.sort((a: any, b: any) =>
    a.title.localeCompare(b.title)
  );

  return (
    <div className={"componentBTN-wrapper"}>
      {sortedData.map((element: any, index: number) => {
        const title = element.title;
        const wip = element.inProgress;
        const draft = element.draft;

        return (
          <div className={"componentBTN"}>
            <div
              className={
                draft
                  ? "inner-componentBTN draftComponent"
                  : "inner-componentBTN"
              }
              // style={{ opacity: draft ? 0.5 : 1 }}
              onClick={() => {
                emit("GET_NEW_SELECTION", element.componentKey, element.nodeId);
                setSelectedMasterId(element._id);
                setIsFromSavedData(true);
                setIsIndexOpen(false);
                setIsContenFromServerOpen(true);
              }}
            >
              <div className="inner-div">{title}</div>
              {wip && <div className={"wip"}>WIP</div>}
            </div>
            <button
              className={"cardAuxButton noPredefined"}
              onClick={() =>
                handleDocClone(token, element._id, setDataForUpdate)
              }
            >
              <IconCopy />
            </button>
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
          </div>
        );
      })}
    </div>
  );
};

export default IndexPage;

async function handleDocClone(token: string, id: string, setData: Function) {
  const docFromServer = await getDocumentation(token, id);

  delete docFromServer._id;
  docFromServer.title = docFromServer.title + " copy";

  const clonedDoc = await createDocumentation(token, docFromServer);
  if (!clonedDoc._id) return;

  const newDocs = await getDocumentations(token);
  if (!newDocs) return;

  setData(newDocs);
}
