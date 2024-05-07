/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IconBoxAlignLeftFilled,
  IconBoxAlignRightFilled,
  IconBoxAlignTopFilled,
  IconBoxAlignBottomFilled,
} from "@tabler/icons-react";
import { h } from "preact";
import { useState } from "preact/hooks";
import { TextboxNumeric } from "@create-figma-plugin/ui";
import {
  IconSpaceVertical16,
  // IconSpaceHorizontal16,
} from "@create-figma-plugin/ui";

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
      {/* <SpacingInput /> */}
    </div>
  );
};

function SpacingInput() {
  const [value, setValue] = useState<string>("42");
  function handleInput(event: h.JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    console.log(newValue);
    setValue(newValue);
  }
  return (
    <TextboxNumeric
      icon={<IconSpaceVertical16 />}
      onInput={handleInput}
      value={value}
      variant="border"
      style={{ color: "black" }}
    />
  );
}

export default AnatomyCard;
