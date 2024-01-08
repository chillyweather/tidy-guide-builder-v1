import { buildAnatomySection } from "src/figma_doc_sections/buildAnatomySection";
import { getNode } from "./getNode";
import { buildAutoLayoutFrame, getDefaultElement } from "./utilityFunctions";

const imageFromFigma = async (
  loadFonts: Function,
  type: string,
  key: string,
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

  const node = await getNode(nodeId, key);
  if (!node) return;
  const defaultElement = getDefaultElement(node)?.createInstance();
  if (!defaultElement) return;
  const anatomySection = await buildAnatomySection(defaultElement, resultFrame);
  defaultElement.remove();

  return;
};

export default imageFromFigma;
