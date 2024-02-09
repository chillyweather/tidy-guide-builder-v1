import { buildAnatomySection } from "src/figma_doc_sections/buildAnatomySection";
import { getNode } from "./getNode";
import { findMasterComponent } from "./utilityFunctions";
import { buildAutoLayoutFrame, getDefaultElement } from "./utilityFunctions";
import { emit } from "@create-figma-plugin/utilities";

const imageFromFigma = async (
  loadFonts: Function,
  type: string,
  nodeId: string
) => {
  await loadFonts();
  const resultFrame = buildAutoLayoutFrame(
    "resultFrame",
    "VERTICAL",
    50,
    60,
    40
  );

  const node = figma.getNodeById(nodeId);
  if (!(node && node.type === "INSTANCE")) return;

  const masterComponent = findMasterComponent(node);

  const bytes = await resultFrame.exportAsync({
    format: "SVG",
  });

  emit("IMAGE_ARRAY_FOR_UPLOAD", { bytes, type });

  resultFrame.remove();
  return;
};

export default imageFromFigma;
