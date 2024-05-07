/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildAnatomySection } from "src/figma_doc_sections/buildAnatomySection";
import { buildAutoLayoutFrame, getDefaultElement } from "./utilityFunctions";
import { buildTitle } from "src/figma_doc_sections/elementBuildingFunctions";
import { getNode } from "./getNode";

export async function buildOneSection(
  loadFonts: () => Promise<void>,
  nodeId: any,
  nodeKey: any,
  type: string,
  indexPosition?: string
) {
  await loadFonts();
  const foundNode = await getNodeAndDefaultElement(nodeId, nodeKey);
  const instance = foundNode.createInstance();

  if (!foundNode || foundNode.type !== "COMPONENT") return;

  const result = await buildSectionContent(type, instance, indexPosition);

  instance.remove();
  return result;
}

async function buildSectionContent(
  type: string,
  node: InstanceNode,
  indexPosition?: string
) {
  const frame = buildResultFrame();

  if (type === "anatomy") {
    const title = buildTitle("Anatomy");
    frame.appendChild(title);
    await buildAnatomySection(node, frame, indexPosition);
  }
  return frame;
}

function buildResultFrame() {
  const resultFrame = buildAutoLayoutFrame(
    "resultFrame",
    "VERTICAL",
    40,
    40,
    40
  );

  const radiusValue = 8;

  resultFrame.topLeftRadius = radiusValue;
  resultFrame.topRightRadius = radiusValue;
  resultFrame.bottomLeftRadius = radiusValue;
  resultFrame.bottomRightRadius = radiusValue;

  return resultFrame;
}

async function getNodeAndDefaultElement(
  nodeId: string,
  nodeKey: string
): Promise<any> {
  const node = await getNode(nodeId, nodeKey);
  if (!node) return;

  const defaultElement = await getDefaultElement(node);
  if (defaultElement) return defaultElement;
}
