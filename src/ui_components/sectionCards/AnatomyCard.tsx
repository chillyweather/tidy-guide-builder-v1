/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IconBoxAlignLeftFilled,
  IconBoxAlignRightFilled,
  IconBoxAlignTopFilled,
  IconBoxAlignBottomFilled,
} from "@tabler/icons-react";
import { h } from "preact";
import NumericInput from "../NumericCheckbox";
import {
  IconSpacingVertical,
  IconSpacingHorizontal,
} from "@tabler/icons-react";

const AnatomyCard = ({
  anatomyIndexPosition,
  setAnatomyIndexPosition,
  anatomyIndexSpacing,
  setAnatomyIndexSpacing,
}: {
  anatomyIndexPosition: string;
  setAnatomyIndexPosition: (position: string) => void;
  anatomyIndexSpacing: string;
  setAnatomyIndexSpacing: (spacing: string) => void;
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
      <div className="spacing-input-wrapper">
        {anatomyIndexPosition === "left" || anatomyIndexPosition === "right" ? (
          <IconSpacingHorizontal
            style={{ color: "lightGray", height: "16px" }}
          />
        ) : (
          <IconSpacingVertical style={{ color: "lightGray", height: "16px" }} />
        )}
        <NumericInput
          value={parseInt(anatomyIndexSpacing)}
          onChange={(value) => setAnatomyIndexSpacing(value.toString())}
        />
      </div>
    </div>
  );
};

export default AnatomyCard;
