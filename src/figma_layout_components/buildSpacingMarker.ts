import { setColorStyle } from "../figma_functions/utilityFunctions";

const TG_SPACING_MARKER = ".TG-spacing-marker";
const TG_SPACING_MARKER_HAND_LENGTH = 40;

const dsGray900 = setColorStyle("ds-admin/gray/gray-900", "292929");
const dsPink500 = setColorStyle("ds-admin/pink/pink-500", "EC2D79");
const dsWhite = setColorStyle("ds-admin/White", "FFFFFF");

const barColor: ReadonlyArray<Paint> = [
  {
    type: "SOLID",
    visible: true,
    opacity: 0.4000000059604645,
    blendMode: "NORMAL",
    color: {
      r: 0.9254902005195618,
      g: 0.1764705926179886,
      b: 0.4745098054409027,
    },
  },
];

function buildLine() {
  const line = figma.createVector();
  line.strokes = [
    {
      type: "SOLID",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      color: {
        r: 0.9833333492279053,
        g: 0.012291669845581055,
        b: 0.012291669845581055,
      },
    },
  ];

  line.strokeAlign = "CENTER";
  line.strokeCap = "ROUND";
  line.strokeJoin = "MITER";
  line.strokeMiterLimit = 4;
  line.dashPattern = [1, 2];
  line.strokeWeight = 0.5;
  line.vectorNetwork = {
    regions: [],
    segments: [
      {
        start: 0,
        end: 1,
        tangentStart: {
          x: 0,
          y: 0,
        },
        tangentEnd: {
          x: 0,
          y: 0,
        },
      },
    ],
    vertices: [
      {
        x: 40,
        y: 0,
        strokeCap: "ROUND",
        strokeJoin: "MITER",
        cornerRadius: 0,
        handleMirroring: "NONE",
      },
      {
        x: 0,
        y: 4.664075386320289e-13,
        strokeCap: "ROUND",
        strokeJoin: "MITER",
        cornerRadius: 0,
        handleMirroring: "NONE",
      },
    ],
  };
  return line;
}

function addTextProperty(component: ComponentNode, textNode: TextNode) {
  component.addComponentProperty("text", "TEXT", `16`);
  const objName = Object.keys(component.componentPropertyDefinitions)[0];
  textNode.componentPropertyReferences = { characters: `${objName}` };
}

function createAnatomySpacingsText(size: string) {
  const meterValue = figma.createText();
  meterValue.fontSize = 14;
  meterValue.fontName = {
    family: "Inter",
    style: "Regular",
  };
  meterValue.characters = `${size}`;
  meterValue.fillStyleId = dsGray900.id;
  meterValue.name = `${TG_SPACING_MARKER}-value`;
  meterValue.layoutAlign = "INHERIT";
  meterValue.textAlignHorizontal = "CENTER";
  return meterValue;
}

function createAnatomyBar(position: string) {
  const bar = figma.createFrame();
  bar.name = `${TG_SPACING_MARKER}-bar`;
  bar.resize(16, 88);
  bar.fills = barColor;
  bar.layoutPositioning = "AUTO";
  bar.layoutAlign = "STRETCH";
  bar.layoutMode = "VERTICAL";
  bar.layoutGrow = 1;
  if (position === "left" || position === "right") {
    bar.layoutMode = "HORIZONTAL";
  }
  return bar;
}

function createAnatomySpacings(size: string, position: string) {
  const spacingMarker = figma.createComponent();
  const value = createAnatomySpacingsText(size);
  const line = buildLine();
  line.resize(TG_SPACING_MARKER_HAND_LENGTH, line.height);
  line.strokeStyleId = dsPink500.id;
  line.name = `marker-hand`;

  //autolayout
  spacingMarker.layoutPositioning = "AUTO";
  spacingMarker.itemSpacing = 2;
  spacingMarker.layoutAlign = "STRETCH";

  // const meter = createAnatomySpacingsMeter(size, position);
  const bar = createAnatomyBar(position);
  if (position === "top") {
    spacingMarker.name = "position=top";
    spacingMarker.appendChild(value);
    spacingMarker.appendChild(line);
    line.rotation = 90;
    spacingMarker.appendChild(bar);
  }
  if (position === "bottom") {
    spacingMarker.name = "position=bottom";
    spacingMarker.appendChild(bar);
    spacingMarker.appendChild(line);
    line.rotation = 90;
    spacingMarker.appendChild(value);
  }
  if (position === "left") {
    spacingMarker.name = "position=left";
    spacingMarker.appendChild(value);
    spacingMarker.appendChild(line);
    spacingMarker.appendChild(bar);
  }
  if (position === "right") {
    spacingMarker.name = "position=right";
    spacingMarker.appendChild(bar);
    spacingMarker.appendChild(line);
    spacingMarker.appendChild(value);
  }

  spacingMarker.counterAxisAlignItems = "CENTER";

  if (position === "top" || position === "bottom") {
    spacingMarker.layoutMode = "VERTICAL";
    spacingMarker.resize(16, 160);
  }
  if (position === "left" || position === "right") {
    spacingMarker.layoutMode = "HORIZONTAL";
    spacingMarker.resize(160, 16);
  }
  // const valueText = meter.children.find((node) => node.type === "TEXT");
  addTextProperty(spacingMarker, value);
  return spacingMarker;
}

function buildSpacingMarkerComponentSet() {
  const toolsPage = figma.currentPage;

  const spacingTop = createAnatomySpacings("16", "top");
  const spacingBottom = createAnatomySpacings("16", "bottom");
  const spacingLeft = createAnatomySpacings("16", "left");
  const spacingRight = createAnatomySpacings("16", "right");

  const spacings = [spacingTop, spacingBottom, spacingLeft, spacingRight];
  spacings.forEach((node) => toolsPage.appendChild(node));
  const spacingComponentSet = figma.combineAsVariants(spacings, toolsPage);

  spacingComponentSet.name = TG_SPACING_MARKER;
  spacingComponentSet.layoutPositioning = "AUTO";
  spacingComponentSet.layoutMode = "HORIZONTAL";
  spacingComponentSet.itemSpacing = 20;
  spacingComponentSet.fillStyleId = dsWhite.id;
  spacingComponentSet.paddingBottom = 20;
  spacingComponentSet.paddingTop = 20;
  spacingComponentSet.paddingLeft = 20;
  spacingComponentSet.paddingRight = 20;
  spacingComponentSet.cornerRadius = 28;
  spacingLeft.resize(120, 16);
  spacingRight.resize(120, 16);
  return spacingComponentSet;
}

export default buildSpacingMarkerComponentSet;
