// import { setColorStyle } from "./utilityFunctions";
// const TGPaddingsMarker = setColorStyle("TG-admin/Paddings", "A0B802");

type FrameMeasurements = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

function getFrameMeasurements(frame: FrameNode) {
  const frameMeasurements: FrameMeasurements = {};
  frameMeasurements.x = frame.absoluteBoundingBox!.x;
  frameMeasurements.y = frame.absoluteBoundingBox!.y;
  frameMeasurements.width = frame.absoluteBoundingBox!.width;
  frameMeasurements.height = frame.absoluteBoundingBox!.height;
  return frameMeasurements;
}

function buildIndexesFrame(frame: FrameNode) {
  const frameMeasurements = getFrameMeasurements(frame);
  const indexes = figma.createFrame();
  indexes.y = frameMeasurements.y! + frameMeasurements.height! + 156;
  indexes.x = frameMeasurements.x!;
  indexes.layoutPositioning = "AUTO";
  indexes.layoutMode = "VERTICAL";
  indexes.itemSpacing = 16;
  figma.currentPage.appendChild(indexes);
  indexes.fills = [];
  indexes.counterAxisSizingMode = "AUTO";
  indexes.name = `${frame.name} - indexes`;
  return indexes;
}

function setMarkerProps(marker: any, space: number) {
  const rounded = Math.round(space);
  const propList = marker.componentProperties;
  for (const property in propList) {
    if (property.includes("text")) {
      const newProps: any = {};
      newProps[property] = `${rounded}`;
      marker.setProperties(newProps);
    }
  }
}

function getMarkerShift(marker: InstanceNode) {
  const markerHandWidth = marker.children[1].width;
  if (markerHandWidth) {
    const markerText = marker.findOne((node) => node.type === "TEXT");
    if (!markerText) return 0;
    const difference = 16 - markerText.width;
    return markerHandWidth + 20 - difference;
  } else {
    const markerText = marker.findOne((node) => node.type === "TEXT");
    if (!markerText) return 0;
    const difference = 16 - markerText.width;
    return 40 - difference;
  }
  return 0;
}

function buildPages(pages: string[]) {
  for (const page of pages) {
    const newPage = figma.createPage();
    newPage.name = page;
  }
  return figma.root.children;
}

function getFonts(textNode: TextNode) {
  const font = (textNode.fontName as FontName).family;
  const style = (textNode.fontName as FontName).style;
  return { family: `${font}`, style: `${style}` };
}

// function reColor(marker: InstanceNode) {
//   const num = marker.findOne(
//     (node) => node.name === ".DS anatomy spacing-meter-value"
//   );
//   const vector = marker.findOne(
//     (node) => node.name === ".DS anatomy spacing-meter-marker"
//   );
//   const line = marker.findOne((node) => node.name === "Line");
//   const barMarker = marker.findOne(
//     (node) => node.name === ".DS anatomy spacing-bar-marker"
//   );
//   const body = marker.findOne(
//     (node) => node.name === ".DS anatomy spacing-bar-body"
//   );
//
//   //@ts-ignore
//   (body).fills = [
//     {
//       type: "SOLID",
//       visible: true,
//       opacity: 0.5,
//       blendMode: "NORMAL",
//       color: {
//         r: 0.9041666984558105,
//         g: 0.9375,
//         b: 0.6875,
//       },
//     },
//   ];
//   num.fillStyleId = TGPaddingsMarker.id;
//   barMarker.fillStyleId = TGPaddingsMarker.id;
//   vector.strokeStyleId = TGPaddingsMarker.id;
//   line.strokeStyleId = TGPaddingsMarker.id;
// }

export {
  getFrameMeasurements,
  buildIndexesFrame,
  setMarkerProps,
  getMarkerShift,
  // reColor,
  getFonts,
  buildPages,
};
