import {
  IconBoxAlignLeftFilled,
  IconBoxAlignRightFilled,
  IconBoxAlignTopFilled,
  IconBoxAlignBottomFilled,
} from "@tabler/icons-react";
import { h } from "preact";

const AnatomyCard = ({
  anatomyIndexPosition,
  setAnatomyIndexPosition,
}: {
  anatomyIndexPosition: string;
  setAnatomyIndexPosition: (position: string) => void;
}) => {
  type AnatomyIndexPosition = "left" | "right" | "top" | "bottom";

  function handlePositionChange(position: AnatomyIndexPosition) {
    setAnatomyIndexPosition(position);
  }

  return (
    <div className="anatomy-buttons-wrapper">
      <button
        className={
          anatomyIndexPosition === "left" ? "selected-index-layout" : ""
        }
        onClick={() => handlePositionChange("left")}
      >
        <IconBoxAlignRightFilled />
      </button>
      <button
        className={
          anatomyIndexPosition === "right" ? "selected-index-layout" : ""
        }
        onClick={() => handlePositionChange("right")}
      >
        <IconBoxAlignLeftFilled />
      </button>
      <button
        className={
          anatomyIndexPosition === "top" ? "selected-index-layout" : ""
        }
        onClick={() => handlePositionChange("top")}
      >
        <IconBoxAlignBottomFilled />
      </button>
      <button
        className={
          anatomyIndexPosition === "bottom" ? "selected-index-layout" : ""
        }
        onClick={() => handlePositionChange("bottom")}
      >
        <IconBoxAlignTopFilled />
      </button>
    </div>
  );
};

export default AnatomyCard;
