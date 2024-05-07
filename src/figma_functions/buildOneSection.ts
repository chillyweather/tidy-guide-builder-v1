/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildAnatomySection } from "src/figma_doc_sections/buildAnatomySection";
import { buildAutoLayoutFrame } from "./utilityFunctions";

export async function buildOneSection(
  node: any,
  type: string,
  indexPosition?: string
) {
  const foundNode = await figma.getNodeByIdAsync(node.id);
  const resultFrame = buildAutoLayoutFrame(
    "resultFrame",
    "VERTICAL",
    40,
    40,
    40
  );
  console.log("foundNode.type", foundNode?.type);
  if (!foundNode || foundNode.type !== "COMPONENT") return;

  const instance = foundNode.createInstance();

  console.log("type", type);
  if (type === "anatomy") {
    const anatomySection = await buildAnatomySection(
      instance,
      resultFrame,
      indexPosition
    );
    console.log("anatomySection", anatomySection);
    resultFrame.appendChild(anatomySection);
  }

  return resultFrame;
}
