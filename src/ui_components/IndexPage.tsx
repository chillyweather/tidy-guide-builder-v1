import { h } from "preact";
import { IconTrash } from "@tabler/icons-react";
import { emit } from "@create-figma-plugin/utilities";

const IndexPage = ({
  data,
  setSelectedMasterId,
  setIsIndexOpen,
  setIsContenFromServerOpen,
  setIsFromSavedData,
  setShowDeletePopup,
  setElementToDelete,
}: {
  data: any;
  setSelectedMasterId: Function;
  setIsIndexOpen: Function;
  setIsContenFromServerOpen: Function;
  setIsFromSavedData: Function;
  setShowDeletePopup: Function;
  setElementToDelete: Function;
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
              {title}
              {wip && <div className={"wip"}>WIP</div>}
            </div>
            <IconTrash
              className={"trashIcon"}
              onClick={(e) => {
                e.stopPropagation();
                setShowDeletePopup(true);
                setElementToDelete(element._id);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default IndexPage;
