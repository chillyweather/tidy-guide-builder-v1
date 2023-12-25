import { h } from "preact";
import { IconTrash } from "@tabler/icons-react";

const IndexPage = ({
  data,
  setSelectedMasterId,
  setIsIndexOpen,
  setIsContenFromServerOpen,
  setIsFromSavedData,
}: {
  data: any;
  setSelectedMasterId: Function;
  setIsIndexOpen: Function;
  setIsContenFromServerOpen: Function;
  setIsFromSavedData: Function;
}) => {
  if (Object.keys(data).length === 0) return;
  return data.map((element: any, index: number) => {
    const title = element.title;
    const wip = element.inProgress;
    return (
      <button
        className={"componentBTN"}
        onClick={() => {
          setSelectedMasterId(element._id);
          setIsFromSavedData(true);
          setIsIndexOpen(false);
          setIsContenFromServerOpen(true);
        }}
      >
        {title}
        {wip && <div className={"wip"}>WIP</div>}
        <IconTrash
          className={"trashIcon"}
          onClick={(e) => {
            e.stopPropagation();
            console.log("delete");
          }}
        />
      </button>
    );
  });
};

export default IndexPage;
