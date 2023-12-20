import { h } from "preact";

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
      </button>
    );
  });
};

export default IndexPage;
