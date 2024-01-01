import { setTextProps } from "./utilityFunctions";

export function setSizingMarkerValue(
  node: InstanceNode,
  position = `${node.componentProperties.position.value}`
) {
  //! find position property
  if (position === "left" || position === "right") {
    setTextProps(node, "text", `${Math.round(node.height)}`);
    const markerText = node.findOne((node) => node.type === "TEXT");
    if (markerText) {
      const diff = 16 - markerText.width;
      const newWidth = node.width - diff;
      node.resize(newWidth, node.height);
    }
  } else {
    setTextProps(node, "text", `${Math.round(node.width)}`);
  }
}
