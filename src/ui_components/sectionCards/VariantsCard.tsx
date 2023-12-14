import { h } from "preact";
import emptyImage from "../../images/empty.svg";

const VariantsCard = ({}: {}) => {
  return (
    <div className="textCardBodyContent">
      <img
        src={emptyImage}
        alt="Please select a component in Figma."
        className={"empty-image"}
      />
      <p>Some useful stuff in the next version</p>
    </div>
  );
};

export default VariantsCard;
