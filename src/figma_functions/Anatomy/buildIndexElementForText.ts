/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildAutoLayoutFrame, setTextContent } from "../utilityFunctions";

export function buildIndexElementForText(
  parent: FrameNode,
  indexWithLabel: InstanceNode,
  element: any
) {
  setTextContent(indexWithLabel, "Text", `🆃 ${element.elementName}`);

  const testColorSection = buildAutoLayoutFrame(
    "text-color",
    "VERTICAL",
    0,
    0,
    4
  );

  const textStyleSection = buildAutoLayoutFrame(
    "text-style",
    "HORIZONTAL",
    8,
    4,
    4
  );

  const textDataSection = buildAutoLayoutFrame(
    "text-data",
    "VERTICAL",
    8,
    12,
    4
  );

  const textStyleFrame = buildTextStyleData(element, textStyleSection);
  const textDataFrame = buildTextData(element, textDataSection);
  const textColorFrame = buildTextColorSection(element, testColorSection);

  const data = buildAutoLayoutFrame("index-data", "VERTICAL", 0, 0, 12);
  data.appendChild(textStyleFrame);
  data.appendChild(textDataFrame);
  data.appendChild(textColorFrame);
  data.paddingLeft = 50;

  parent.appendChild(data);
}

function buildTextColorSection(element: any, frame: FrameNode): FrameNode {
  const colorSample = figma.createRectangle();
  colorSample.resize(14, 14);
  colorSample.cornerRadius = 2.8;
  colorSample.fills = [figma.util.solidPaint(element.elementFill)];
  colorSample.strokes = [
    {
      type: "SOLID",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      color: {
        r: 0.7019608020782471,
        g: 0.7019608020782471,
        b: 0.7019608020782471,
      },
      boundVariables: {},
    },
  ];

  const hex = figma.createText();
  hex.characters = element.elementFill;

  const colorWithHex = buildAutoLayoutFrame(
    "color-with-hex",
    "HORIZONTAL",
    0,
    0,
    4
  );

  colorWithHex.appendChild(colorSample);
  colorWithHex.appendChild(hex);
  frame.appendChild(colorWithHex);

  if (element.elementVariable) {
    const colorStyleFrame = buildAutoLayoutFrame(
      "color-style",
      "HORIZONTAL",
      8,
      4,
      4
    );
    const colorStyle = figma.createText();
    colorStyle.characters = `✿ ${element.elementVariable}`;
    colorStyleFrame.appendChild(colorStyle);
    colorStyleFrame.cornerRadius = 4;
    colorStyleFrame.fills = [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 0.9098039269447327,
          g: 0.929411768913269,
          b: 0.9882352948188782,
        },
        boundVariables: {},
      },
    ];
    frame.appendChild(colorStyleFrame);
  }

  return frame;
}

function buildTextStyleData(element: any, frame: FrameNode): FrameNode {
  const styleData = `¶ ${element.elementStyleName}`;
  const text = figma.createText();
  text.characters = styleData;
  frame.appendChild(text);

  frame.cornerRadius = 4;
  frame.fills = [
    {
      type: "SOLID",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      color: {
        r: 0.9330241084098816,
        g: 0.9330241084098816,
        b: 0.9330241084098816,
      },
      boundVariables: {},
    },
  ];

  return frame;
}

function buildTextData(element: any, frame: FrameNode): FrameNode {
  const textData = `Font family: ${element.elementFontName.family}
Font size: ${element.elementFontSize}px
Font style: ${element.elementFontName.style}
Font weight: ${element.elementFontWeight}
Line height: ${element.elementLineHeight}
Letter spacing: ${element.elementLetterSpacing}
Text decoration: ${element.elementTextDecoration}
Text case: ${element.elementTextCase}`;

  const text = figma.createText();
  text.fontName = { family: "IBM Plex Mono", style: "Medium" };
  text.characters = textData;
  frame.appendChild(text);

  frame.strokeLeftWeight = 1;
  frame.paddingLeft = 19;
  frame.strokes = [
    {
      type: "SOLID",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      color: {
        r: 0.8299999833106995,
        g: 0.8299999833106995,
        b: 0.8299999833106995,
      },
      boundVariables: {},
    },
  ];

  frame.fills = [
    {
      type: "SOLID",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      color: {
        r: 0.9803921580314636,
        g: 0.9803921580314636,
        b: 0.9803921580314636,
      },
      boundVariables: {},
    },
  ];

  return frame;
}
