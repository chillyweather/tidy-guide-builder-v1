import { h } from "preact";
import { IconTrash } from "@tabler/icons-react";
import { useContext } from "preact/hooks";
import BuilderContext from "../BuilderContext";
import { useState } from "preact/hooks";
import { deleteDocumentation } from "./ui_functions/documentationHandlers";
import DeletePopup from "../ui_components/popups/deletePopup";

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
  const setDataForUpdate = useContext(BuilderContext)?.setDataForUpdate;
  const isDraft = useContext(BuilderContext)?.isDraft;
  const token = useContext(BuilderContext)?.token;
  const [primary, setPrimary] = useState("Reset");

  const{
    setShowResetPopup,
  } = useContext(BuilderContext) || {};
  if (Object.keys(data).length === 0) return <div>{!!"no data"}</div>;
  const sortedData = data.sort((a: any, b: any) =>
    a.title.localeCompare(b.title)
  );

  return (
    <div className={"componentBTN-wrapper"}>
      <DeletePopup />
      {sortedData.map((element: any, index: number) => {
        const title = element.title;
        const wip = element.inProgress;
        const draft = element.draft;
        return (
          <div className={"componentBTN"}>
            <div
              className={"inner-componentBTN"}
              // style={{ opacity: draft ? 0.5 : 1 }}
              onClick={() => {
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
              onClick={async (e) => {
                console.log('delete-me ' + element._id);
              }}
              // onDblClick={async (e) => {
              //   e.stopPropagation();
              //   await deleteDocumentation(token!, element._id);
              //   setDataForUpdate((prevData: any) => {
              //     const newData = prevData.filter(
              //       (el: any) => el._id !== element._id
              //     );
              //     return newData;
              //   });
              // }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default IndexPage;
