import { h } from "preact";
import { useContext } from "preact/hooks";
import BuilderContext from "src/BuilderContext";

const ReleaseNotesCard = ({
  setReleaseNotesComment,
  setReleaseNotesDate,
  setReleaseNotesAuthor,
  setReleaseNotesLocation,
}: {
  setReleaseNotesComment: Function;
  setReleaseNotesDate: Function;
  setReleaseNotesAuthor: Function;
  setReleaseNotesLocation: Function;
}) => {
  const currentUserName = useContext(BuilderContext)?.currentUser.name;
  const currentDate = new Date().toISOString().slice(0, 10);
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
  });
  const currentDateTime = `${currentDate} ${currentTime}`;
  console.log("currentDateTime", currentDateTime);
  console.log("currentUserName", currentUserName);
  return (
    <div className="textCardBodyContent">
      <h2 style={{ padding: "20px 20px 6px 20px" }}>
        We have opinions about this' card content.
      </h2>
      <h2 style={{ padding: "6px 20px 20px 20px" }}>But we need a decision!</h2>
    </div>
  );
};

export default ReleaseNotesCard;
