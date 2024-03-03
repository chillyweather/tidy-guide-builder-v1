import { setColorStyle } from "../figma_functions/utilityFunctions";
import {
  addNewTextProperty,
  addNewBooleanProperty,
} from "../figma_functions/addNewProperty";

export function addText(letterText: string) {
  const letter = figma.createText();
  letter.fills = [
    {
      type: "SOLID",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      color: {
        r: 1,
        g: 1,
        b: 1,
      },
    },
  ];
  letter.fontSize = 14;
  letter.fontName = {
    family: "Inter",
    style: "Semi Bold",
  };
  letter.textCase = "UPPER";
  letter.characters = letterText;
  letter.textAlignHorizontal = "CENTER";
  letter.textAlignVertical = "CENTER";
  letter.lineHeight = {
    unit: "PERCENT",
    value: 2.9999999329447746,
  };
  return letter;
}

export async function createEllipse(textNode: TextNode) {
  const TGGray900 = await setColorStyle(".TG-admin/anatomy-primary", "292929");

  const ellipse = figma.createFrame();
  ellipse.bottomLeftRadius = 50;
  ellipse.bottomRightRadius = 50;
  ellipse.topRightRadius = 50;
  ellipse.topLeftRadius = 50;
  await ellipse.setFillStyleIdAsync(TGGray900.id);
  ellipse.appendChild(textNode);
  ellipse.layoutPositioning = "AUTO";
  ellipse.layoutMode = "VERTICAL";
  ellipse.resize(24, 24);
  ellipse.primaryAxisAlignItems = "CENTER";
  ellipse.counterAxisAlignItems = "CENTER";
  ellipse.name = "index";
  return ellipse;
}

async function buildLine() {
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
  line.strokeWeight = 1;
  await line.setVectorNetworkAsync({
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
  });
  return line;
}

export async function createLineBox() {
  const TGGray900 = await setColorStyle(".TG-admin/anatomy-primary", "292929");

  const rect = await buildLine();
  rect.resize(40, rect.height);
  const lineBox = figma.createFrame();
  // lineBox.appendChild(line);
  lineBox.appendChild(rect);
  lineBox.layoutPositioning = "AUTO";
  lineBox.layoutMode = "VERTICAL";
  lineBox.counterAxisAlignItems = "CENTER";
  lineBox.counterAxisSizingMode = "FIXED";
  lineBox.resize(24, 82);
  lineBox.layoutGrow = 1;
  lineBox.fills = [];
  rect.rotation = 90;
  rect.layoutGrow = 1;
  await rect.setStrokeStyleIdAsync(TGGray900.id);
  return lineBox;
}

export async function buildLabelText(label: string) {
  const anatomyLabelsColor = await setColorStyle(
    ".TG-admin/anatomy-labels",
    "292929"
  );
  const labelText = figma.createText();
  await labelText.setFillStyleIdAsync(anatomyLabelsColor.id);
  labelText.fontSize = 14;
  labelText.fontName = {
    family: "Inter",
    style: "Medium",
  };
  labelText.characters = label;
  return labelText;
}

export async function buildTag(
  letter: string,
  type: string,
  label?: string,
  isLink = true
) {
  const TGWhite = await setColorStyle(".TG-admin/anatomy-icon", "FFFFFF");
  const TGGray600 = await setColorStyle(
    ".TG-admin/anatomy-secondary",
    "707070"
  );
  const TGLightBlue500 = await setColorStyle(".TG-admin/links", "00B0FF");
  const TGGray900 = await setColorStyle(".TG-admin/anatomy-primary", "292929");

  const index = addText(`${letter}`);
  index.name = "elementIndex";
  const ellipse = await createEllipse(index);
  const tag = figma.createComponent();
  tag.layoutPositioning = "AUTO";
  if (type === "bottom") {
    const lineBox = await createLineBox();
    tag.counterAxisSizingMode = "AUTO";
    tag.layoutMode = "VERTICAL";
    tag.appendChild(ellipse);
    tag.appendChild(lineBox);
    tag.resize(24, 32);
    addNewTextProperty(tag, index, "index", "A");
    return tag;
  }
  if (type === "top") {
    const lineBox = await createLineBox();
    tag.counterAxisSizingMode = "AUTO";
    tag.layoutMode = "VERTICAL";
    tag.appendChild(lineBox);
    tag.appendChild(ellipse);
    tag.resize(24, 32);
    addNewTextProperty(tag, index, "index", "A");
    return tag;
  }
  if (type === "left") {
    const lineBox = await createLineBox();
    tag.counterAxisSizingMode = "AUTO";
    tag.layoutMode = "HORIZONTAL";
    tag.appendChild(lineBox);
    tag.appendChild(ellipse);
    lineBox.rotation = 90;
    lineBox.layoutAlign = "STRETCH";
    tag.resize(32, 24);
    addNewTextProperty(tag, index, "index", "A");
    return tag;
  }
  if (type === "right") {
    const lineBox = await createLineBox();
    tag.counterAxisSizingMode = "AUTO";
    tag.layoutMode = "HORIZONTAL";
    tag.appendChild(ellipse);
    tag.appendChild(lineBox);
    lineBox.rotation = 90;
    lineBox.layoutAlign = "STRETCH";
    tag.resize(32, 24);
    addNewTextProperty(tag, index, "index", "A");
    return tag;
  }
  if (type === "index") {
    tag.counterAxisSizingMode = "AUTO";
    tag.layoutMode = "HORIZONTAL";
    tag.appendChild(ellipse);
    tag.resize(24, 24);
    addNewTextProperty(tag, index, "index", "A");
    return tag;
  }

  if (
    type === "text" ||
    type === "important" ||
    type === "info" ||
    type === "size" ||
    type === "cornerRadius"
  ) {
    const text = await buildLabelText("text");
    tag.resize(24, 24);
    tag.counterAxisSizingMode = "AUTO";
    tag.counterAxisAlignItems = "CENTER";
    tag.itemSpacing = 8;
    tag.layoutMode = "HORIZONTAL";
    tag.appendChild(ellipse);
    tag.appendChild(text);

    if (isLink) {
      const linkText = await buildLabelText("link");
      await linkText.setFillStyleIdAsync(TGLightBlue500.id);
      linkText.textDecoration = "UNDERLINE";
      tag.appendChild(linkText);
      addNewTextProperty(tag, linkText, "link", "link");
      addNewBooleanProperty(tag, linkText, "Show link", true);
    }

    text.textCase = "ORIGINAL";
    if (type !== "text") {
      await ellipse.setFillStyleIdAsync(TGGray600.id);
    }
    if (type === "info") {
      ellipse.paddingLeft = 1;
      ellipse.paddingBottom = 1;
    }

    if (type === "size") {
      const icon = figma.createVector();
      await icon.setVectorNetworkAsync({
        regions: [
          {
            windingRule: "NONZERO",
            loops: [[0, 1, 2, 3, 4, 10, 5, 6, 7, 8, 9, 11]],
            fills: [
              {
                type: "SOLID",
                visible: true,
                opacity: 1,
                blendMode: "NORMAL",
                color: {
                  r: 1,
                  g: 1,
                  b: 1,
                },
              },
            ],
            fillStyleId: "",
          },
        ],
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
          {
            start: 2,
            end: 0,
            tangentStart: {
              x: 0,
              y: 0,
            },
            tangentEnd: {
              x: 0,
              y: 0,
            },
          },
          {
            start: 2,
            end: 3,
            tangentStart: {
              x: 0,
              y: 0,
            },
            tangentEnd: {
              x: 0,
              y: 0,
            },
          },
          {
            start: 4,
            end: 3,
            tangentStart: {
              x: 0,
              y: 0,
            },
            tangentEnd: {
              x: 0,
              y: 0,
            },
          },
          {
            start: 5,
            end: 4,
            tangentStart: {
              x: 0,
              y: 0,
            },
            tangentEnd: {
              x: 0,
              y: 0,
            },
          },
          {
            start: 7,
            end: 6,
            tangentStart: {
              x: 0,
              y: 0,
            },
            tangentEnd: {
              x: 0,
              y: 0,
            },
          },
          {
            start: 8,
            end: 7,
            tangentStart: {
              x: 0,
              y: 0,
            },
            tangentEnd: {
              x: 0,
              y: 0,
            },
          },
          {
            start: 8,
            end: 9,
            tangentStart: {
              x: 0,
              y: 0,
            },
            tangentEnd: {
              x: 0,
              y: 0,
            },
          },
          {
            start: 10,
            end: 9,
            tangentStart: {
              x: 0,
              y: 0,
            },
            tangentEnd: {
              x: 0,
              y: 0,
            },
          },
          {
            start: 11,
            end: 10,
            tangentStart: {
              x: 0,
              y: 0,
            },
            tangentEnd: {
              x: 0,
              y: 0,
            },
          },
          {
            start: 6,
            end: 5,
            tangentStart: {
              x: 0,
              y: 0,
            },
            tangentEnd: {
              x: 0,
              y: 0,
            },
          },
          {
            start: 1,
            end: 11,
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
            x: 0.998077392578125,
            y: 0,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 0,
            y: 0,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 0.998077392578125,
            y: 3,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 13.001922607421875,
            y: 3,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 13.001922607421875,
            y: 0,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 14,
            y: 0,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 14,
            y: 7,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 13.001922607421875,
            y: 7,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 13.001922607421875,
            y: 4,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 0.998077392578125,
            y: 4,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 0.998077392578125,
            y: 7,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 0,
            y: 7,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
        ],
      });
      if (TGWhite) {
        await icon.setFillStyleIdAsync(TGWhite.id);
      }
      icon.strokes = [];
      ellipse.appendChild(icon);
    }

    if (type === "cornerRadius") {
      const icon = figma.createVector();
      await icon.setVectorNetworkAsync({
        regions: [
          {
            windingRule: "EVENODD",
            loops: [[4, 0, 5, 1, 6, 2, 7, 3]],
            fills: [
              {
                type: "SOLID",
                visible: true,
                opacity: 1,
                blendMode: "NORMAL",
                color: {
                  r: 1,
                  g: 1,
                  b: 1,
                },
              },
            ],
            fillStyleId: "",
          },
        ],
        segments: [
          {
            start: 2,
            end: 1,
            tangentStart: {
              x: 0,
              y: -3.0373363494873047,
            },
            tangentEnd: {
              x: 3.0373363494873047,
              y: 0.0003250539302825928,
            },
          },
          {
            start: 4,
            end: 3,
            tangentStart: {
              x: 0,
              y: 0,
            },
            tangentEnd: {
              x: 0,
              y: 0,
            },
          },
          {
            start: 6,
            end: 5,
            tangentStart: {
              x: 2.485093116760254,
              y: 0.0002658963203430176,
            },
            tangentEnd: {
              x: 0,
              y: -2.485093593597412,
            },
          },
          {
            start: 0,
            end: 7,
            tangentStart: {
              x: 0,
              y: 0,
            },
            tangentEnd: {
              x: 0,
              y: 0,
            },
          },
          {
            start: 1,
            end: 0,
            tangentStart: {
              x: 0,
              y: 0,
            },
            tangentEnd: {
              x: 0,
              y: 0,
            },
          },
          {
            start: 3,
            end: 2,
            tangentStart: {
              x: 0,
              y: 0,
            },
            tangentEnd: {
              x: 0,
              y: 0,
            },
          },
          {
            start: 5,
            end: 4,
            tangentStart: {
              x: 0,
              y: 0,
            },
            tangentEnd: {
              x: 0,
              y: 0,
            },
          },
          {
            start: 7,
            end: 6,
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
            x: 0.00010704994201660156,
            y: 0,
            strokeCap: "SQUARE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 3.4851388931274414,
            y: 0.00037297606468200684,
            strokeCap: "SQUARE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 8.984550476074219,
            y: 5.500372886657715,
            strokeCap: "SQUARE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 8.984550476074219,
            y: 8.999931335449219,
            strokeCap: "SQUARE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 7.984550476074219,
            y: 8.999931335449219,
            strokeCap: "SQUARE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 7.984550476074219,
            y: 5.500372886657715,
            strokeCap: "SQUARE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 3.485032081604004,
            y: 1.0003730058670044,
            strokeCap: "SQUARE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 0,
            y: 1,
            strokeCap: "SQUARE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
        ],
      });
      if (TGWhite) {
        await icon.setFillStyleIdAsync(TGWhite.id);
      }
      icon.strokes = [];
      ellipse.appendChild(icon);
    }

    if (type === "text") {
      if (TGGray900) {
        await ellipse.setFillStyleIdAsync(TGGray900.id);
      }
      addNewTextProperty(tag, index, "index", "A");
    }
    //add text properties
    addNewTextProperty(tag, text, "label", "Text");

    return tag;
  }
}
