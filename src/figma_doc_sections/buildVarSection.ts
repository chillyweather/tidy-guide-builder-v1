import { getVariantsArray } from "./getVariantsArray";
import {
  buildAutoLayoutFrame,
  findAllVariantProps,
} from "../figma_functions/utilityFunctions";
import { buildVariantFrames } from "./buildVariantFrames";
import { buildBasicGridLabels } from "./buildBasicGridLabels";
import { buildTopLevelLabels } from "./buildTopLevelLabels";

const missedItemsArray: InstanceNode[] = [];
const allElements: InstanceNode[] = [];
const allBasicFrames: FrameNode[] = [];

export function buildVarSection(node: InstanceNode, parentFrame: FrameNode) {
  const variantProps = findAllVariantProps(node);
  if (Object.keys(variantProps).length === 0) return;
  const variantKeys = Object.keys(variantProps).filter(
    (key) => key.toLocaleLowerCase() !== "size"
  );
  const variantsArray = getVariantsArray(variantProps, variantKeys);

  const variantFrames = buildVariantFrames(
    variantsArray,
    node,
    allElements,
    allBasicFrames,
    variantKeys,
    missedItemsArray
  );

  if (variantFrames.type !== "FRAME") return;
  const labels = buildBasicGridLabels(variantFrames, variantProps);
  if (!labels) return;
  // buildTopLevelLabels(variantFrames, labels, node);
  const varsWithLabels = figma.group(
    [variantFrames, ...(labels as GroupNode[])],
    parentFrame
  );
  const resultFrame = buildAutoLayoutFrame(
    "variantsFrame",
    "VERTICAL",
    160,
    40,
    10
  );
  resultFrame.fills = [
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
  resultFrame.appendChild(varsWithLabels);

  parentFrame.appendChild(resultFrame);
  resultFrame.layoutSizingHorizontal = "FILL";
  resultFrame.counterAxisAlignItems = "CENTER";
  return parentFrame;
}
