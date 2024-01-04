import { buildSubtitle } from "./elementBuildingFunctions";
import {
  buildAutoLayoutFrame,
  getElementSizes,
  findAllBooleanProps,
  setVariantProps,
  setBooleanProps,
  turnAllBooleansOff,
} from "../figma_functions/utilityFunctions";
import { all } from "axios";

type Direction = "VERTICAL" | "HORIZONTAL";

function buildContentFrame(
  name: string,
  direction: Direction,
  spacing?: number
) {
  const elementsFrame = buildAutoLayoutFrame(
    name,
    direction,
    0,
    0,
    (spacing = 16)
  );
  return elementsFrame;
}

export function buildPropSection(node: InstanceNode, parentFrame: FrameNode) {
  const booleanProps = findAllBooleanProps(node);
  turnAllBooleansOff(node, booleanProps);

  //! build size property (if size)
  const sizes = getElementSizes(node);
  if (sizes) {
    const propertyFrame = buildContentFrame("frameForSizes", "VERTICAL");
    const subtitle = buildSubtitle("Size property");
    const allElementsFrame = buildContentFrame(
      "allElementsFrame",
      "HORIZONTAL"
    );
    propertyFrame.appendChild(subtitle);
    propertyFrame.appendChild(allElementsFrame);
    parentFrame.appendChild(propertyFrame);
    for (const size of sizes!) {
      buildVarProperytyElement(node, size, allElementsFrame, "size");
    }
  }

  //! buld boolean properties
  const booleanPropsKeys = Object.keys(booleanProps);
  if (booleanPropsKeys.length) {
    const propertyFrame = buildContentFrame("frameForBooleanProps", "VERTICAL");
    const allElementsFrame = buildContentFrame("allElementsFrame", "VERTICAL");

    parentFrame.appendChild(propertyFrame);
    propertyFrame.layoutSizingHorizontal = "FILL";
    const subtitle = buildSubtitle("Boolean properties");
    propertyFrame.appendChild(subtitle);
    booleanPropsKeys.forEach((key) => {
      const propName = key.split("#")[0];
      const currentNode = node.clone();
      const elementFrame = buildAutoLayoutFrame(
        "booleanPropFrame",
        "VERTICAL",
        160,
        40,
        10
      );
      elementFrame.fills = [
        {
          type: "SOLID",
          visible: true,
          opacity: 1,
          blendMode: "NORMAL",
          color: {
            r: 0.9607843160629272,
            g: 0.9607843160629272,
            b: 0.9607843160629272,
          },
          boundVariables: {},
        },
      ];
      propertyFrame.appendChild(elementFrame);
      const booleanPropText = figma.createText();
      booleanPropText.characters = `${propName}`;
      booleanPropText.fontSize = 14;
      booleanPropText.fontName = { family: "Inter", style: "Bold" };
      setBooleanProps(currentNode, propName, true);
      elementFrame.appendChild(booleanPropText);
      booleanPropText.layoutPositioning = "ABSOLUTE";
      booleanPropText.x = 16;
      booleanPropText.y = 8;
      elementFrame.appendChild(currentNode);
      allElementsFrame.appendChild(elementFrame);
      elementFrame.layoutSizingHorizontal = "FILL";
      elementFrame.counterAxisAlignItems = "CENTER";
    });
    propertyFrame.appendChild(allElementsFrame);
    allElementsFrame.layoutSizingHorizontal = "FILL";
  }
}

function buildVarProperytyElement(
  node: InstanceNode,
  text: string,
  parentFrame: FrameNode,
  propertyName: string
) {
  const elementFrame = buildContentFrame("sizeElementFrame", "VERTICAL", 12);
  const currentNode = node.clone();
  const elementText = figma.createText();
  elementText.characters = `Size: ${text}`;
  elementText.fontSize = 12;
  elementFrame.appendChild(elementText);
  elementFrame.appendChild(currentNode);
  parentFrame.appendChild(elementFrame);
  setVariantProps(currentNode, propertyName, text);
}

function buildBoolProperytyElement(
  node: InstanceNode,
  text: string,
  parentFrame: FrameNode,
  propertyName: string
) {
  const elementFrame = buildContentFrame("sizeElementFrame", "VERTICAL", 12);
  const currentNode = node.clone();
  const elementText = figma.createText();
  elementText.characters = text;
  elementText.fontSize = 12;
  elementFrame.appendChild(elementText);
  elementFrame.appendChild(currentNode);
  parentFrame.appendChild(elementFrame);
  setVariantProps(currentNode, propertyName, text);
}
