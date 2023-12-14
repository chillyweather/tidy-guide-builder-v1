import { h } from "preact";
import emptyImage from "../../images/empty.svg";

const ReleaseNotesCard = ({}: {}) => {
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
