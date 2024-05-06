import {
  IconBoxAlignLeftFilled,
  IconBoxAlignRightFilled,
  IconBoxAlignTopFilled,
  IconBoxAlignBottomFilled,
} from "@tabler/icons-react";
import { h } from "preact";
import { useAtom } from "jotai";
import { anatomyIndexPositionAtom } from "../../state/atoms";
import { useEffect } from "react";

const AnatomyCard = () => {
  const [anatomyIndexPosition, setAnatomyIndexPosition] = useAtom(
    anatomyIndexPositionAtom
  );

  type AnatomyIndexPosition = "left" | "right" | "top" | "bottom";

  function handlePositionChange(position: AnatomyIndexPosition) {
    setAnatomyIndexPosition(position);
  }

  useEffect(() => {
    console.log(anatomyIndexPosition);
  }, [anatomyIndexPosition]);

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
