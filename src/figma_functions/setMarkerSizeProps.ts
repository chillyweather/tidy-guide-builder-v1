import { setTextProps } from "./utilityFunctions";

// type direction = "VERTICAL" | "HORIZONTAL";

export function setMarkerSizeProps(
  rootSize: number,
  markerSize: number,
  marker: InstanceNode,
  units: string
  // direction: direction,
  // frame: SceneNode
) {
  if (units === "rem") {
    const remSize = (+markerSize / rootSize).toFixed(2);
    setTextProps(marker, "text", `${remSize}`);
  } else if (units === "px") {
    setTextProps(marker, "text", `${markerSize}`);
  }
}
