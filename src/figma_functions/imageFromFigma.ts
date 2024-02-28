/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildAnatomySection } from "src/figma_doc_sections/buildAnatomySection";
import { buildSpacingSection } from "src/figma_doc_sections/buildSpacingSection";
import { buildVarSection } from "src/figma_doc_sections/buildVarSection";
import { buildPropSection } from "src/figma_doc_sections/buildPropSection";
import { getNode } from "./getNode";
import { buildAutoLayoutFrame } from "./utilityFunctions";
import { emit } from "@create-figma-plugin/utilities";

const imageFromFigma = async (
  loadFonts: () => Promise<void>,
  type: string,
  nodeId: string,
  key: string
) => {
  const pdTypes = ["anatomy", "spacing", "property", "variants"];
  if (!key || !pdTypes.includes(type)) return;

  await loadFonts();

  const resultFrame = buildAutoLayoutFrame(
    "resultFrame",
    "VERTICAL",
    50,
    60,
    40
  );

  const node = await getNode(nodeId, key, "imageFromFigma");
  if (!node) return;

  let tempNode;

  if (node.type === "COMPONENT") {
    tempNode = node.createInstance();
  } else {
    tempNode = node.defaultVariant.createInstance();
  }
  let builtGraphics;

  const buildFunctions: any = {
    anatomy: buildAnatomySection,
    spacing: buildSpacingSection,
    property: buildPropSection,
    variants: buildVarSection,
  };

  if (buildFunctions[type]) {
    builtGraphics = await buildFunctions[type](tempNode, resultFrame);
    if (!builtGraphics) {
      resultFrame.remove();
      tempNode.remove();
      throw Error(`Error in building graphics of ${type}`);
    }

    if (type === "spacing" || type === "property") {
      const maxWidth = findWidestElement(builtGraphics);
      builtGraphics.resize(maxWidth + 520, builtGraphics.height);
      detachAllInstances(builtGraphics);
    }
  } else {
    throw Error(`Invalid type: ${type}`);
  }

  const bytes = await resultFrame.exportAsync({
    format: "SVG",
  });
  emit("IMAGE_ARRAY_FOR_UPLOAD", { bytes, type });

  tempNode.remove();
  resultFrame.remove();
  return;
};

export default imageFromFigma;

function findWidestElement(node: any) {
  let maxWidth = node.width;

  if ("children" in node) {
    for (const child of node.children) {
      const childWidth = findWidestElement(child);
      if (childWidth > maxWidth) {
        maxWidth = childWidth;
      }
    }
  }
  return maxWidth;
}

function detachAllInstances(node: any) {
  if (node.type === "INSTANCE") {
    node = node.detachInstance();
  }

  if ("children" in node) {
    for (const child of node.children) {
      detachAllInstances(child);
    }
  }
  return node;
}
