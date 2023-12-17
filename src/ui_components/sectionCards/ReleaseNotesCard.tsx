import { h } from "preact";

const ReleaseNotesCard = ({
  setReleaseNotesComment,
  releaseNotesComment,
  setReleaseNotesDate,
}: {
  setReleaseNotesComment: Function;
  releaseNotesComment: string;
  setReleaseNotesDate: Function;
}) => {
  const currentDate = new Date().toISOString().slice(0, 10);
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
  });
  const currentDateTime = `${currentDate} ${currentTime}`;
  setReleaseNotesDate(currentDateTime);

  return (
    <div className="textCardBodyContent">
      <input
        className={"listInputStyle"}
        type={"text"}
        rows={2}
        maxLength={240}
        placeholder="Description (optional)"
        value={releaseNotesComment}
        onInput={(e) => setReleaseNotesComment(e.currentTarget.value)}
      />
      <div className="textSymbolsCounterRow"></div>
    </div>
  );
};

export default ReleaseNotesCard;
