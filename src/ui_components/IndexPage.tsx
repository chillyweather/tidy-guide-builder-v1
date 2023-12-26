import { h } from "preact";
import { IconTrash } from "@tabler/icons-react";
import { useContext, useState } from "preact/hooks";
import BuilderContext from "../BuilderContext";
import { deleteDocumentation } from "./ui_functions/documentationHandlers";

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
  const token = useContext(BuilderContext)?.token;
  if (Object.keys(data).length === 0) return <div>{!!"no data"}</div>;
  const sortedData = data.sort((a: any, b: any) =>
    a.title.localeCompare(b.title)
  );

  return (
    <div className={"componentBTN-wrapper"}>
      {sortedData.map((element: any, index: number) => {
        const title = element.title;
        const wip = element.inProgress;
        return (
          <div className={"componentBTN"}>
            <div
            className={"inner-componentBTN"}
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
              onDblClick={async (e) => {
                e.stopPropagation();
                await deleteDocumentation(token!, element._id);
                setDataForUpdate((prevData: any) => {
                  const newData = prevData.filter(
                    (el: any) => el._id !== element._id
                  );
                  return newData;
                });
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default IndexPage;
