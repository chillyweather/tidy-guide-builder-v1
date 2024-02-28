import { setTextProps } from "./utilityFunctions";

export function setSizingMarkerValue(
  node: InstanceNode,
  position = `${node.componentProperties.position.value}`
) {
  const markerText = node.findOne((node) => node.type === "TEXT");
  if (!markerText) return;
  //! find position property
  if (position === "left" || position === "right") {
    setTextProps(node, "text", `${Math.round(node.height)}`);
    if (markerText) {
      const diff = 16 - markerText.width;
      const newWidth = node.width - diff;
      node.resize(newWidth, node.height);
    }
  } else {
    if (markerText.type === "TEXT") {
      markerText.characters = `${Math.round(node.width)}`;
    }
  }
}
