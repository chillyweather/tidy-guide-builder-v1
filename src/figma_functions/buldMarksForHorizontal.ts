import { getMarkerComponent } from "./getMarkerComponent";
import { setMarkerSizeProps } from "./setMarkerSizeProps";
import { cloneFrame } from "./utilityFunctions";

export function buildMarksForHorizontal(
  frame: InstanceNode | FrameNode,
  elementsDimensions: any[],
  yPos: number,
  rootElementSize: number,
  units: any,
  sizeMarker: ComponentSetNode,
  spacingMarker: ComponentSetNode
) {
  const spacings: InstanceNode[] = [];
  console.log("elementsDimensions", elementsDimensions);
  elementsDimensions.forEach((element, index, array) => {
    if (index < array.length - 1) {
      const space = array[index + 1] - array[index];
      if (space > 0) {
        const marker = getMarkerComponent(sizeMarker, spacingMarker, "top");
        if (!marker) return;
        const markerHandLength = marker.children[1].width;

        marker.resize(space, frame.height + markerHandLength + 21);
        marker.x = array[index][1];
        marker.y = yPos - markerHandLength - 21;
        setMarkerSizeProps(
          rootElementSize,
          space,
          marker,
          units,
          "HORIZONTAL",
          frame
        );

        marker.name = `.spacing-marker-${index + 1}_horizontal`;
        spacings.push(marker);
      }
    }
  });
  if (spacings.length > 0 && frame.parent) {
    const spacingGroup = figma.group(spacings, frame.parent);
    spacingGroup.name = "spacings";
  }
  return spacings;
}
