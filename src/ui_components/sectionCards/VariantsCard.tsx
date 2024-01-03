import { h } from "preact";
import emptyImage from "../../images/empty.svg";

const VariantsCard = ({}: {}) => {
  return (
    <div className="nothingCards">
      {/* <img
        src={emptyImage}
        alt="Please select a component in Figma."
        className={"empty-image"}
      /> */}
      <p>This element will only be visible on canvas</p>
    </div>
  );
};

export default VariantsCard;
