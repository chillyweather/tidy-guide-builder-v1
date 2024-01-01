import { setColorStyle } from "../figma_functions/utilityFunctions";

const TG_SIZE_MARKER = ".TG-size-marker";

const dsGray900 = setColorStyle("ds-admin/gray/gray-900", "292929");
const dsPink500 = setColorStyle("ds-admin/pink/pink-500", "EC2D79");

const dsWhite = setColorStyle("ds-admin/White", "FFFFFF");
const dsSpacingMarker = setColorStyle("ds-admin/Spacings", "E0851D");
const emptyFill: ReadonlyArray<Paint> = [
  {
    type: "SOLID",
    visible: false,
    opacity: 1,
    blendMode: "NORMAL",
    color: {
      r: 1,
      g: 1,
      b: 1,
    },
  },
];

function addTextProperty(component: ComponentNode, textNode: TextNode) {
  component.addComponentProperty("text", "TEXT", `16`);
  const objName = Object.keys(component.componentPropertyDefinitions)[0];
  textNode.componentPropertyReferences = { characters: `${objName}` };
}

function createMarkerLines(position: string) {
  const frame = figma.createFrame();
  frame.fills = emptyFill;
  frame.strokeStyleId = dsSpacingMarker.id;
  const line = figma.createLine();
  frame.appendChild(line);
  line.strokeWeight = 1;
  line.strokeStyleId = dsSpacingMarker.id;
  if (position === "top" || position === "bottom") {
    frame.strokeLeftWeight = 1;
    frame.strokeRightWeight = 1;
    line.constraints = {
      horizontal: "STRETCH",
      vertical: "CENTER",
    };
    line.y = 50;
    frame.resize(16, 5);
  }
  if (position === "left" || position === "right") {
    frame.strokeTopWeight = 1;
    frame.strokeBottomWeight = 1;
    line.constraints = {
      horizontal: "CENTER",
      vertical: "STRETCH",
    };
    line.rotation = 90;
    frame.resize(5, 15);
    line.x = 3;
    line.y = 15;
  }
  frame.strokeStyleId = dsPink500.id;
  line.strokeStyleId = dsPink500.id;
  frame.name = `${TG_SIZE_MARKER}-marker`;
  frame.layoutAlign = "STRETCH";

  return frame;
}

function createAnatomySpacingsText(size: string) {
  const meterValue = figma.createText();
  meterValue.fontSize = 14;
  meterValue.fontName = {
    family: "Inter",
    style: "Regular",
  };
  meterValue.characters = `${size}`;
  meterValue.fillStyleId = dsSpacingMarker.id;
  meterValue.name = `${TG_SIZE_MARKER}-value`;
  meterValue.layoutAlign = "INHERIT";
  meterValue.textAlignHorizontal = "CENTER";
  meterValue.fillStyleId = dsGray900.id;
  return meterValue;
}

function createAnatomySpacingsMeter(size: string, position: string) {
  const meter = figma.createFrame();
  const marker = createMarkerLines(position);
  const value = createAnatomySpacingsText(size);
  // meter.resize(16, 32);
  meter.layoutPositioning = "AUTO";
  meter.itemSpacing = 0;
  meter.layoutAlign = "STRETCH";
  meter.layoutGrow = 0;
  meter.layoutMode = "VERTICAL";
  meter.counterAxisAlignItems = "CENTER";

  if (position === "top") {
    meter.appendChild(value);
    meter.appendChild(marker);
    meter.paddingBottom = 8;
  }
  if (position === "bottom") {
    meter.appendChild(marker);
    meter.appendChild(value);
    meter.paddingTop = 8;
  }
  if (position === "left") {
    meter.layoutMode = "HORIZONTAL";
    meter.appendChild(value);
    meter.appendChild(marker);
    meter.paddingRight = 8;
  }
  if (position === "right") {
    meter.layoutMode = "HORIZONTAL";
    meter.appendChild(marker);
    meter.appendChild(value);
    meter.paddingLeft = 8;
  }

  meter.itemSpacing = 4;

  meter.name = `${TG_SIZE_MARKER}-element`;
  meter.fills = emptyFill;
  meter.clipsContent = false;

  return meter;
}

function createAnatomySpacings(size: string, position: string) {
  const spacingMarker = figma.createComponent();

  //autolayout
  spacingMarker.layoutPositioning = "AUTO";
  spacingMarker.layoutAlign = "STRETCH";

  const meter = createAnatomySpacingsMeter(size, position);
  if (position === "top") {
    spacingMarker.name = "position=top";
    spacingMarker.appendChild(meter);
  }
  if (position === "bottom") {
    spacingMarker.name = "position=bottom";
    spacingMarker.appendChild(meter);
  }
  if (position === "left") {
    spacingMarker.name = "position=left";
    spacingMarker.appendChild(meter);
  }
  if (position === "right") {
    spacingMarker.name = "position=right";
    spacingMarker.appendChild(meter);
  }

  if (position === "top" || position === "bottom") {
    spacingMarker.layoutMode = "VERTICAL";
  }
  if (position === "left" || position === "right") {
    spacingMarker.layoutMode = "HORIZONTAL";
  }
  const valueText = meter.children.find((node) => node.type === "TEXT");
  if (!(valueText && valueText.type === "TEXT")) return;
  addTextProperty(spacingMarker, valueText);
  return spacingMarker;
}

function buildSizeMarkerComponentSet() {
  const toolsPage = figma.currentPage;

  const spacingTop = createAnatomySpacings("16", "top");
  const spacingBottom = createAnatomySpacings("16", "bottom");
  const spacingLeft = createAnatomySpacings("16", "left");
  const spacingRight = createAnatomySpacings("16", "right");

  const spacings = [spacingTop, spacingBottom, spacingLeft, spacingRight];
  if (!spacings) return;
  spacings.forEach((node) => {
    if (!node) return;
    toolsPage.appendChild(node);
  });
  const spacingComponentSet = figma.combineAsVariants(
    spacings as readonly ComponentNode[],
    toolsPage
  );

  spacingComponentSet.name = TG_SIZE_MARKER;
  spacingComponentSet.layoutPositioning = "AUTO";
  spacingComponentSet.layoutMode = "HORIZONTAL";
  spacingComponentSet.itemSpacing = 20;
  spacingComponentSet.fillStyleId = dsWhite.id;
  spacingComponentSet.paddingBottom = 20;
  spacingComponentSet.paddingTop = 20;
  spacingComponentSet.paddingLeft = 20;
  spacingComponentSet.paddingRight = 20;
  spacingComponentSet.cornerRadius = 28;
  return spacingComponentSet;
}

export default buildSizeMarkerComponentSet;
