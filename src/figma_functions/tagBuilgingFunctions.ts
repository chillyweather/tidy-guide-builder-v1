/* eslint-disable @typescript-eslint/no-explicit-any */
import { findDocFrame } from "./utilityFunctions";

//^ here we collect all the info on instances
export const elementsCoordinatesAndDimensions = [];
//^ find style applied to text element
async function findFontStyleName(textNode: TextNode) {
  if (textNode.textStyleId === "") {
    return "style not determined";
  } else {
    const foundStyle = await figma.getStyleByIdAsync(
      textNode.textStyleId as string
    );
    if (foundStyle?.remote === false) {
      return foundStyle.name;
    } else {
      return "no style";
    }
  }
}

function isIcon(node: SceneNode) {
  return (
    node.type === "INSTANCE" &&
    node.children.length === 1 &&
    node.children[0].name === "ic" &&
    node.children[0].type === "VECTOR"
  );
}

async function addInstancesToArray(node: any, array: any[]) {
  const docFrame = await findDocFrame(node);

  array.push([
    node.absoluteBoundingBox.x,
    node.absoluteBoundingBox.y,
    node.absoluteRenderBounds.width,
    node.absoluteRenderBounds.height,
    isIcon(node) ? "Icon" : node.name,
    docFrame ? docFrame.id : node.mainComponent.id,
  ]);
}

export async function addTextNodesToArray(
  node: any,
  array: any[]
): Promise<void> {
  const styleName = await findFontStyleName(node);

  array.push([
    node.absoluteBoundingBox.x,
    node.absoluteBoundingBox.y,
    node.absoluteRenderBounds.width,
    node.height,
    node.name,
    null,
    styleName,
    node.fontName,
    node.fontSize,
  ]);
}

export async function findAllNodes(
  frame: FrameNode | GroupNode,
  instances: any,
  textElements: any
): Promise<void> {
  figma.skipInvisibleInstanceChildren = true;
  for (const node of frame.children) {
    if (node.absoluteBoundingBox && node.width > 0.01) {
      if (node.type === "INSTANCE" && instances && !node.name.startsWith("_")) {
        await addInstancesToArray(node, elementsCoordinatesAndDimensions);
      }
      if (node.type === "TEXT" && textElements && !node.name.startsWith("_")) {
        await addTextNodesToArray(node, elementsCoordinatesAndDimensions);
      } else if (
        (node.type === "FRAME" || node.type === "GROUP") &&
        node.children
      ) {
        findAllNodes(node, instances, textElements);
      }
    }
  }
}

//-> new string of indexes for tags accorging to user input
export function newABC(string: string, start: string) {
  const startIndex = string.indexOf(start.toLowerCase());
  const newString = string.slice(startIndex);
  return newString;
}

//-> setting tag direction according to user input
export function getTagInstance(tagDirection: string, tagComp: any) {
  if (tagDirection === "top") {
    const tag = tagComp
      .findOne((node: ComponentNode) => node.name === "type=bottom line")
      .createInstance();
    return tag;
  }
  if (tagDirection === "right") {
    const tag = tagComp
      .findOne((node: ComponentNode) => node.name === "type=left line")
      .createInstance();
    return tag;
  }
  if (tagDirection === "bottom") {
    const tag = tagComp
      .findOne((node: ComponentNode) => node.name === "type=top line")
      .createInstance();
    return tag;
  }
  if (tagDirection === "left") {
    const tag = tagComp
      .findOne((node: ComponentNode) => node.name === "type=right line")
      .createInstance();
    return tag;
  }
}
//-> add hyperlink to the index label text
export function addLink({
  component,
  link,
}: {
  component: ComponentNode;
  link: string;
}): void {
  const linkText = component.findOne(
    (node) => node.name === "link" && node.type === "TEXT"
  );
  if (!(linkText && linkText.type === "TEXT")) return;
  linkText.hyperlink = { type: "NODE", value: link };
}
