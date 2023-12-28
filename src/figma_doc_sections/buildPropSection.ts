import { buildSubtitle } from "./elementBuildingFunctions";
import {
  buildAutoLayoutFrame,
  getElementSizes,
  findAllBooleanProps,
  setVariantProps,
  setBooleanProps,
  turnAllBooleansOff,
} from "../figma_functions/utilityFunctions";

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
    const subtitle = buildSubtitle("Boolean properties");
    propertyFrame.appendChild(subtitle);
    booleanPropsKeys.forEach((key) => {
      const propName = key.split("#")[0];
      const currentNode = node.clone();
      const elementFrame = buildContentFrame(
        "booleanPropFrame",
        "VERTICAL",
        12
      );
      propertyFrame.appendChild(elementFrame);
      const booleanPropText = figma.createText();
      booleanPropText.characters = `${propName}`;
      booleanPropText.fontSize = 12;
      setBooleanProps(currentNode, propName, true);
      elementFrame.appendChild(booleanPropText);
      elementFrame.appendChild(currentNode);
      allElementsFrame.appendChild(elementFrame);
    });
    propertyFrame.appendChild(allElementsFrame);
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
