/* eslint-disable @typescript-eslint/no-explicit-any */
// import { buildAnatomySection } from "src/figma_doc_sections/buildAnatomySection";
import { buildAutoLayoutFrame } from "./utilityFunctions";

export function buildOneSection(
  node: any,
  type: string,
  indexPosition?: string
) {
  const resultFrame = buildAutoLayoutFrame(
    "resultFrame",
    "VERTICAL",
    40,
    40,
    40
  );
  console.log("resultFrame", resultFrame);
  console.log("node", node);
  console.log("type", type);
  console.log("indexPosition", indexPosition);

  // return resultFrame;
}
